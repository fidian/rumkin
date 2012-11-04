;---------------------------------------------------------------------------
; Hardware Random Number Generator with RS-232 interface for the SX18AC
; Aaron Logue, May 2002     http://www.cryogenius.com/hardware/rng/
;
; Commands:
;	?  display currently set output format
;	^Q start transmission
;	^S stop transmission
;	1  set output format to ASCII binary (eg: "10010110001011...")
;	4  set output format to ASCII hex    (eg: "692DD3A5981C75...")
;	6  set output format to ASCII base64 (eg: "qE6y8vMSkig7CT...")
;	8  set output format to raw 8-bit binary
;
; mpasm /x- /l+ /e+ /w0 /p16C58A /aINHX8M /c- rng.asm
;---------------------------------------------------------------------------
	radix		dec
	include		mydefs.inc

;DEVICE	EQU	TURBO | SYNC | IRC | RC4MHZ | MORETRIM | TRIM9	; Internal RC clock
DEVICE	EQU	TURBO | SYNC | FOSCHI | FOSC2		; External oscillator

MHZ	EQU	50		; Clock rate in Mhz (4, 16, 20, or 50 is best)
JIF	EQU	4		; How many microseconds is one jiffy
PSCALE	EQU	8		; Prescaler ratio (1 if unused)

JIFTIKS	EQU	(MHZ * JIF / PSCALE)	; How many RTCC counts per jiffy
 IF (JIFTIKS == 0)
 ERROR Prescaler may be too high for jiffy granularity.
 ENDIF

JBITS	EQU	(104 / JIF)	; How many jiffies per 9600 baud bit
JBITST	EQU	JBITS / 2	; How many jifs to wait after leading edge
                                ; of start bit to sample middle of bit
JMILLI	EQU	(1000 / JIF)	; How many jiffies per millisecond

 IF (PSCALE == 1)		; Pick a value for OPTION register
OPTREG	EQU	0xC8
 ENDIF
 IF (PSCALE == 2)
OPTREG	EQU	0xC0
 ENDIF
 IF (PSCALE == 4)
OPTREG	EQU	0xC1
 ENDIF
 IF (PSCALE == 8)
OPTREG	EQU	0xC2
 ENDIF
 IF (PSCALE == 16)
OPTREG	EQU	0xC3
 ENDIF

; I/O ports and pin configuration constants
PortA	EQU	05h
PortB	EQU	06h

RX_PORT		EQU	PortB
TX_PORT		EQU	PortB
RNG_PORT	EQU	PortB
DEBUG_PORT	EQU	PortB

RX_BIT		EQU	3	; RS-232 serial input bit
TX_BIT		EQU	2	; RS-232 serial output bit
DEBUG_BIT	EQU	1	; Which bit is our debug output bit
RNG_BIT		EQU	0	; RNG input bit

TrisA	EQU	11110000b	; PortA I/O pin configuration
TrisB	EQU	00001001b	; PortB I/O pin configuration

; Global registers
ELAPSEDJIF 	EQU	8	; Global, elapsed number of jiffies
LASTRTCC 	EQU	9	; Global, last value of RTCC
ELAPSEDRTCC	EQU	10	; Global, elapsed number of RTCC ticks
TEMP		EQU	11	; Global, general purpose

CMD_BYTE	EQU	12
XMIT_STATE	EQU	13	; Are we transmitting or not?
XMIT_FORMAT	EQU	14	; What format should we send in?

; Banked registers
RX_JIFS		EQU	16
RX_STATE	EQU	17
RX_COUNT	EQU	18
RX_CHAR		EQU	19

TX_JIFS		EQU	20
TX_STATE	EQU	21
TX_COUNT	EQU	22
TX_CHAR		EQU	23

RNG_JIFS	EQU	24
RNG_SAMPLE	EQU	25	; Stores bit samples
RNG_BYTE	EQU	26	; Stores accumulated random bits
RNG_COUNT	EQU	27	; Counts accumulated bits until we're done
RNG_FINAL	EQU	28	; When done, random bits are stuffed here

B_BITS		EQU	31	; Output for oscilloscope debugging

; Process equates
RX_STARTBIT	EQU	0
RX_DATABITS	EQU	1
RX_STOPBIT	EQU	2

TX_STARTBIT	EQU	0
TX_DATABITS	EQU	1
TX_STOPBIT	EQU	2

CHAR_XON	EQU	0x11	; ^Q
CHAR_XOFF	EQU	0x13	; ^S

	org	0		; Generate code here
	movlw	OPTREG		; Initialize OPTION register
	option

	mode	0xf
  	movlw	TrisA		; Move 0x00 to W to set direction
        tris	PortA		; W --> PortA direction bits

  	movlw	TrisB		; Move 0x00 to W to set direction
        tris	PortB		; W --> PortB direction bits

	; Clear all banked registers
	clrf	FSR
zero_it
	bsf	FSR, 4
	clrf	IND
	incfsz	FSR, f
	goto	zero_it

	clrf	PortA
	clrf	PortB

	clrf	XMIT_STATE	; Default to not transmitting and no data
	movlw	4
	movwf	XMIT_FORMAT	; 1, 4, or 8 for ASCII binary, hex, or raw
	movwf	RNG_COUNT	; Let RNG_COUNT = XMIT_FORMAT

	clrf	LASTRTCC
	clrf	ELAPSEDRTCC
	clrf	RNG_SAMPLE
	bsf	RNG_SAMPLE, 0	; Set sentinel bit

main_loop
	; -------------------------------------------------------------------
	; Compute elapsed RTCC ticks.  This needs to be called often
	; enough to avoid losing time by wrapping.  1 jiffy costs 20 ticks
	; of detection overhead here.  The prescaler should be set high
	; enough that there's no chance of ever missing a jiffy.
	;
	movf	rtcc, w		; Load current RTCC counter
	movwf	TEMP		; Save an unchanging copy of it
	movf	LASTRTCC, w	; Load previous RTCC counter value
	subwf	TEMP, w		; Compute difference
	addwf	ELAPSEDRTCC, f	; Add difference to elapsed RTCC ticks
	movf	TEMP, w		; Save new previous RTCC counter value
	movwf	LASTRTCC	;  for next elapsed computation
	;
	; Compute elapsed jiffies.  Our clock speed should be high enough
	; and our jiffy period long enough that we don't have very many
	; elapsed jiffies each time through here.  That means that repeated
	; subtraction of the number of RTCC ticks per jiffy (JIFTIKS) from
	; elapsed RTCC ticks (ELAPSEDRTCC) should be more efficient than
	; dividing ELAPSEDRTCC by JIFTIKS.  The more instructions per jiffy,
	; the better, as long as jiffies are still granular enough to be
	; useful.  4 or 8 microseconds per jiffy at 50 Mhz is probably good.
	;
	clrf	ELAPSEDJIF	; Assume no jiffies have elapsed
	movlw	JIFTIKS		; Load number of ELAPSEDRTCC ticks per jiffy
ej_10
	subwf	ELAPSEDRTCC, f	; Subtract JIFTIKS from ELAPSEDRTCC
				; C is 1 if result is positive or zero
	btfss	STATUS, C	; Did we have enough ELAPSEDRTCC for a jiffy?
	goto	ej_20		;   sadly, no
	incf	ELAPSEDJIF, f	;   joyously, yes - we have a jiffy!
	goto	ej_10		; Go see if there's enough for another one
ej_20
	addwf	ELAPSEDRTCC, f	; Restore incomplete-jiffy elapsed RTCC count
	;
	; ELAPSEDJIF is now the number of elapsed jiffies since processes
	; were last called.
	; -------------------------------------------------------------------

	call	rx_serial_process
	call	tx_serial_process
	call	rng_sample_process
	call	xmit_random
	goto	main_loop


;---------------------------------------------------------------------------
; Asynchronous RS-232 Receiver
;
;	States: 0 polling for start bit
;		1 verify center of start bit
;		2 sample center of data bit (8 times)
;		4 verify center of stop bit; parse command
;---------------------------------------------------------------------------
rx_serial_process
	clrf	FSR		; Set bank 0
	movf	RX_JIFS, w	; sleep time remaining -> W
	btfsc	STATUS, Z	; skip if we're asleep
	goto	rx_running	; process is awake and running

	movf	ELAPSEDJIF, w	; elapsed jiffies -> W
	btfsc	STATUS, Z	; skip if jiffies have elapsed
	retlw	0		; no jiffies elapsed - keep sleeping

	subwf	RX_JIFS, f	; Subtract elapsed from remaining sleep time
				; C is 1 if result is positive or zero
	btfss	STATUS, C	; Was result negative?
	goto	rx_overslept	;   yes, time to wake up (also, we overslept)
	btfsc	STATUS, Z	; Was result zero?
	goto	rx_running	;   yes, time to wake up
	retlw	0		; keep sleeping
rx_overslept
	; RX_JIFS now contains a negative value; the amount that we overslept.
	; The next sleeper can add its desired sleep time to this value rather
	; than sleeping for a hardcoded value and get reduced sleep.  In this
	; way, we "catch up" and our wakeup times will be closer to the center
	; of received bits.  Oversleeping should not be an issue at higher
	; clock speeds.
	;	clrf	RX_JIFS		; Zero remaining sleep time
rx_running
	btfsc	RX_STATE, RX_STOPBIT
	goto	rx_verify_stop
	btfsc	RX_STATE, RX_DATABITS
	goto	rx_read_data
	btfsc	RX_STATE, RX_STARTBIT
	goto	rx_verify_start
; Poll for beginning of a start bit
rx_poll
	btfss	RX_PORT, RX_BIT	; Do we have a start bit?
	retlw	0		;   no, keep polling
	movlw	JBITST		;   yes
	movwf	RX_JIFS		; Sleep until center of start bit
	bsf	RX_STATE, RX_STARTBIT ; Advance to start bit verify state
	retlw	0
; Verify center of start bit
rx_verify_start
	btfss	RX_PORT, RX_BIT	; Is the start bit still there?
	goto	rx_reset	;   no, keep polling
	movlw	JBITS		;   yes - sleep until center of first data bit
	addwf	RX_JIFS, f	; Reduce by any time that we overslept
	movlw	8
	movwf	RX_COUNT	; Set data bit count to 8
	rlf	RX_STATE, f	; Advance to read data state
	retlw	0
; Gather data bits
rx_read_data
	bcf	STATUS, C	; Assume data bit is 0
	btfss	RX_PORT, RX_BIT	; If RS-232 voltage level is high, data is 0
	bsf	STATUS, C	; Data bit is 1
	rrf	RX_CHAR, f	; Shift carry into character register
	movlw	JBITS		; Sleep until center of next bit
	addwf	RX_JIFS, f	; Reduce by any time that we overslept
	decfsz	RX_COUNT, f	; Have we gathered 8 bits yet?
	retlw	0		;   no, keep gathering
	rlf	RX_STATE, f	; Advance to verify stop bit state
	retlw	0
; Verify stop bit
rx_verify_stop
	btfsc	RX_PORT, RX_BIT	; Is the stop bit clear?
	goto	rx_reset	;   no, throw data away
	movf	RX_CHAR, w	; Received character -> W
	call	cmd_parse	; Do something with received character
; Return to polling
rx_reset
	clrf	RX_STATE
	retlw	0

;---------------------------------------------------------------------------
; Asynchronous RS-232 Transmitter
;
;	States: 0 waiting for a character to transmit
;		1 sending start bit
;		2 sending data bits
;		4 sending stop bit
;---------------------------------------------------------------------------
tx_serial_process
	clrf	FSR		; Set bank 0
	movf	TX_JIFS, w	; sleep time remaining -> W
	btfsc	STATUS, Z	; skip if we're asleep
	goto	tx_running	; process is awake and running

	movf	ELAPSEDJIF, w	; elapsed jiffies -> W
	btfsc	STATUS, Z	; skip if jiffies have elapsed
	retlw	0		; no jiffies elapsed - keep sleeping

	subwf	TX_JIFS, f	; Subtract elapsed from remaining sleep time
				; C is 1 if result is positive or zero
	btfss	STATUS, C	; Was result negative?
	goto	tx_running	;   yes, time to wake up (also, we overslept)
	btfsc	STATUS, Z	; Was result zero?
	goto	tx_running	;   yes, time to wake up
	retlw	0		; keep sleeping
tx_running
	btfsc	TX_STATE, TX_STOPBIT
	goto	tx_send_stop
	btfsc	TX_STATE, TX_DATABITS
	goto	tx_send_data
	btfss	TX_STATE, TX_STARTBIT
	retlw	0		; Nothing to transmit
; Begin transmission
	bsf	TX_PORT, TX_BIT	; Output the start bit
	movlw	JBITS		; Sleep for one bit interval
	movwf	TX_JIFS
	movlw	8
	movwf	TX_COUNT	; Set data bit count to 8
	rlf	TX_STATE, f	; Advance to transmit data state
	retlw	0
tx_send_data
	rrf	TX_CHAR, f	; Rotate LSB into carry
	btfsc	STATUS, C	; Raise or lower the line depending on carry
	bcf	TX_PORT, TX_BIT
	btfss	STATUS, C
	bsf	TX_PORT, TX_BIT
	movlw	JBITS		; Leave it there for one bit interval
	addwf	TX_JIFS, f	; Reduce by any time that we overslept
	decfsz	TX_COUNT, f	; Have we transmitted 8 bits?
	retlw	0
	rlf	TX_STATE, f	; Advance to stop bit state
	retlw	0
tx_send_stop
	bcf	TX_PORT, TX_BIT	; Output the stop bit
	movlw	JBITS		; Leave it there for one bit interval
	addwf	TX_JIFS, f	; Reduce by any time that we overslept
	clrf	TX_STATE
	retlw	0

;---------------------------------------------------------------------------
; parse_command
;---------------------------------------------------------------------------
cmd_parse
	movwf	CMD_BYTE	; Store received character in CMD_BYTE
	movlw	CHAR_XOFF
	subwf	CMD_BYTE, w
	btfsc	STATUS, Z
	goto	cmd_xoff
	movlw	CHAR_XON
	subwf	CMD_BYTE, w
	btfsc	STATUS, Z
	goto	cmd_xon
	movlw	'1'
	subwf	CMD_BYTE, w
	btfsc	STATUS, Z
	goto	cmd_binary
	movlw	'4'
	subwf	CMD_BYTE, w
	btfsc	STATUS, Z
	goto	cmd_hex
	movlw	'6'
	subwf	CMD_BYTE, w
	btfsc	STATUS, Z
	goto	cmd_base64
	movlw	'8'
	subwf	CMD_BYTE, w
	btfsc	STATUS, Z
	goto	cmd_raw
	movlw	'?'
	subwf	CMD_BYTE, w
	btfsc	STATUS, Z
	goto	cmd_query_format
	retlw	0
cmd_xoff
	bcf	XMIT_STATE, 0
	retlw	0
cmd_xon
	bsf	XMIT_STATE, 0
	retlw	0
cmd_binary
	movlw	1
	goto	cmd_format
cmd_hex
	movlw	4
	goto	cmd_format
cmd_base64
	movlw	6
	goto	cmd_format
cmd_raw
	movlw	8
cmd_format
	movwf	XMIT_FORMAT
cmd_reset_format
	movwf	RNG_COUNT	; Let RNG_COUNT = 1, 4, 6, or 8 for next value
	clrf	RNG_BYTE
	retlw	0
cmd_query_format
	movlw	'0'
	addwf	XMIT_FORMAT, w
	movwf	TX_CHAR
	bsf	TX_STATE, TX_STARTBIT	; Start the async xmitter
	retlw	0

;---------------------------------------------------------------------------
; xmit_random
;
;---------------------------------------------------------------------------
xmit_random
	;
	; Do nothing if transmitter is currently busy
	;
	movf	TX_STATE, w	; transmitter state -> W
	btfss	STATUS, Z	; skip if transmitter idle
	retlw	0		; transmitter is currently busy - do nothing
	;
	; Do nothing if we're currently x'doff
	;
	btfss	XMIT_STATE, 0	; skip if we're not x'doff
	retlw	0		; we're currently x'doff - do nothing
	;
	; Do nothing if there's no accumulated data to transmit
	;
	btfss	XMIT_STATE, 1	; Is there data ready?
	retlw	0		; no, keep waiting
	;
	; At last we get to transmit something!
	;
	bcf	XMIT_STATE, 1	; Clear data ready flag so we don't re-send
	movf	RNG_FINAL, w	; Load the data
	movwf	TX_CHAR
	bsf	TX_STATE, TX_STARTBIT	; Start the async xmitter
	retlw	0

;---------------------------------------------------------------------------
; rng_sample_process
;
;	The goal of this routine is to sample bits from the hardware
;	RNG and output a stream of unbiased random bits.
;	Each time this function is called, a single sample is taken.
;	When we have accumulated two samples, we compare them, and
;	if they are the same, we throw them away and return.
;	If they are different, we output the value of one sample.
;	Method from Schneier Applied Cryptography 2nd Ed. Page 425.
;	After 8 bits have been accumulated, do something with them.
;---------------------------------------------------------------------------
rng_sample_process
	clrf	FSR		; Set bank 0
	movf	RNG_JIFS, w	; sleep time remaining -> W
	btfsc	STATUS, Z	; skip if we're asleep
	goto	rng_running	; process is awake and running
	movf	ELAPSEDJIF, w	; elapsed jiffies -> W
	btfsc	STATUS, Z	; skip if jiffies have elapsed
	retlw	0		; no jiffies elapsed - keep sleeping
	subwf	RNG_JIFS, f	; Subtract elapsed from remaining sleep time
				; C is 1 if result is positive or zero
	btfss	STATUS, C	; Was result negative?
	goto	rng_running	;   yes, time to wake up (also, we overslept)
	btfsc	STATUS, Z	; Was result zero?
	goto	rng_running	;   yes, time to wake up
	retlw	0		; keep sleeping

rng_running
	clrf	RNG_JIFS
	incf	RNG_JIFS, f	; Delay a little between bitstream samples

	bcf	STATUS, C	; Assume sample bit is 0
	btfss	RNG_PORT, RNG_BIT ; If sample level is high, data is 0
	bsf	STATUS, C	; Sample bit is 1
	rlf	RNG_SAMPLE, f	; Shift sample bit into bit register
	btfss	RNG_SAMPLE, 2	; Have we taken two samples?
	retlw	0		;   no, keep sampling
	;
	; Evaluate most recent sample pair and use only if bits differ
	;
	movf	RNG_SAMPLE, w	; Load samples
	clrf	RNG_SAMPLE
	bsf	RNG_SAMPLE, 0	; Set sentinel bit for next pair
	movwf	TEMP		; Leave second sample in W,0
	rrf	TEMP, f		; Shift first sample to TEMP,0
	xorwf	TEMP, f		; first bit XOR second bit -> TEMP,0
	btfss	TEMP, 0		; Were bits different?
	retlw	0		;   no, keep sampling
	;
	; TEMP,1 is now (1 XOR first sample) so let's use it
	;
	bcf	STATUS, C	; Assume random bit is 0
	btfsc	TEMP, 1		; 
	bsf	STATUS, C	; Random bit is 1
	rlf	RNG_BYTE, f	; Accumulate random bit
	decfsz	RNG_COUNT, f	; Have we accumulated enough bits?
	retlw	0		;   No, keep sampling
	;
	; Do something with accumulated random bits in RNG_BYTE
	;
	movf	XMIT_FORMAT, w
	movwf	RNG_COUNT	; number of bits to gather for next value
	andlw	7		; Is format binary or hex or base64?
	btfsc   STATUS, Z
	goto	rng_raw		;   No, format is raw
	andlw	2		; Is format base64?
	btfss	STATUS, Z
	goto	rng_base64
	movlw	'0'		; Load an ASCII '0'
	addwf	RNG_BYTE, f	; Convert to ASCII if in range 0-9
	movlw	':'
	subwf	RNG_BYTE, w	; Does result need to be in range A-F?
	btfss	STATUS, C	; C is 1 if result positive or zero
	goto	rng_raw
	movlw	7		; Bump it up to A-F
rng_offset
	addwf	RNG_BYTE, f
rng_raw
	movf	RNG_BYTE, w
rng_done
	movwf	RNG_FINAL
	bsf	XMIT_STATE, 1	; Queue data for transmission by xmit_random
	clrf	RNG_BYTE
	retlw	0
	;
	; Convert 6 bits in RNG_BYTE to base64 encoding:
	; ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/
	;
rng_base64
	movlw	26
	subwf	RNG_BYTE, w	; Is value in the range 0-25?
	btfsc	STATUS, C	; C is 0 if result negative
	goto	rng_b64_2
	movlw	'A'		; Load an ASCII 'A'
	goto	rng_offset	; Convert 0-25 value to character A-Z
rng_b64_2
	movlw	52
	subwf	RNG_BYTE, w	; Is value in the range 26-51?
	btfsc	STATUS, C	; C is 0 if result negative
	goto	rng_b64_3
	movlw	71		; Load difference between 26 and 97 (ASCII 'a')
	goto	rng_offset	; Convert 26-51 value to character a-z
rng_b64_3
	movlw	62
	subwf	RNG_BYTE, w	; Is value in the range 52-61?
	btfsc	STATUS, C	; C is 0 if result negative
	goto	rng_b64_4
	movlw	-4		; Load difference between 52 and 48 (ASCII '0')
	goto	rng_offset	; Convert 52-61 value to character 0-9
rng_b64_4
	movlw	'+'		; Assume RNG_BYTE is 62
	btfsc	RNG_BYTE, 0	; Distinguish between 62 and 63
	movlw	'/'		; Oops, it was 63
	goto	rng_done


;	call	toggle_debug	; toggle debug bit to see when we trigger

;---------------------------------------------------------------------------
; toggle output debug bit
;---------------------------------------------------------------------------
toggle_debug
	btfss	B_BITS, DEBUG_BIT
	goto	tog10
	bcf	B_BITS, DEBUG_BIT
	bcf	DEBUG_PORT, DEBUG_BIT
	retlw	0
tog10
	bsf	B_BITS, DEBUG_BIT
	bsf	DEBUG_PORT, DEBUG_BIT
	retlw	0

	end
