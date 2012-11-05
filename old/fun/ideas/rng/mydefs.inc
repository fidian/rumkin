        NOLIST
;==============================================================================
;                                                                             :
;        This program is available from:                                      :
;                                                                             :
;               Rho Enterprises                                               :
;               4100 W. Colfax Ave.                                           :
;               Box 33                                                        :
;               Denver, CO    80204                                           :
;                                                                             :
;        Phone: 720-359-1467                   Email: info@rhoent.com         :
;                                                                             :
;                          http://www.rhoent.com/                             :
;                                                                             :
;==============================================================================

;
;SXDEFS.INC        by Loren Blaney and Richard Ottosen        14-FEB-2000
;

;
;Scenix SX Definitions for Microchip MPASM.
;
;REVISIONS:
;FEB-23-98, Released.
;MAR-21-98, Added ID label. Corrected XT & HS defs by swapping them.
; Removed ASCII defs. New STATUS defs.
;MAR-27-98, Added PAGEA, BANKA, FCALL, FGOTO, SKIP.
;APR-13-98, Added CSA, CSBE (etc.) macros. Enclose all arguments in parentheses.
;  Indent macros.
;APR-23-98, Changed some comments.
;OCT-4-98, Removed "RADIX DEC", added processor type based on SX FUSEX bits,
;  added Trim bits to FUSEX and other cleanup.   R.O.
;OCT-14-98 BOSC defaults to a "1".
;NOV-4-98, Revised Pins, Trim bits and BOSC in DEVICE equates, removed some
;   inversions.  R.O.
;SEP-11-99, Added warnings and messages to BANK and PAGE macros.  R.O.
;9-JAN-2000, Changed ID bytes to leave unused bits as ones.  R.O.
;12-JAN-2000, Made variables in macros local.  R.O.
;14-FEB-2000, Cleanup.  R.O.
;21-APR-2002, FUSE and FUSEX definitions for newer rev SX.  A.L.

;Define special function registers:
IND     EQU     00h             ;used for indirects thru fsr
RTCC    EQU     01h             ;real time clock/counter
PC      EQU     02h             ;low 8 bits of PC
STATUS  EQU     03h             ;status bits
FSR     EQU     04h             ;file select register
RA      EQU     05h             ;I/O ports
RB      EQU     06h             ;supports multi-input wake-up (MIWU)
RC      EQU     07h

;Define STATUS register bits:
C       EQU     0               ;carry
DC      EQU     1               ;digit carry
Z       EQU     2               ;zero
PD      EQU     3               ;sleep power down (true low)
TO      EQU     4               ;watchdog time out (true low)
PA0     EQU     5               ;page select (LSB)
PA1     EQU     6               ;page select
PA2     EQU     7               ;page select (MSB)

;Define port control registers:
TRISX   EQU     0Fh             ;tristate (1=input, 0=output)
PLP     EQU     0Eh             ;pullup (1=none, 0=20k)
LVL     EQU     0Dh             ;level (1=TTL, 0=CMOS)
ST      EQU     0Ch             ;Schmitt trigger (1=disabled, 0=enabled)
WKEN    EQU     0Bh             ;wake up (1=disabled, 0=enabled)
WKED    EQU     0Ah             ;wake up edge (1=falling, 0=rising)
WKPND   EQU     09h             ;wake up pending (1=pending, 0=none)
CMP     EQU     08h             ;comparator bit: 0=result, 6=output, 7=enabled


 IFDEF OLD_FUSE
;Old style FUSE and FUSEX bits, for SX chips with yywwxx date codes

OSCRC           EQU     b'00'           ;external RC network (default, inverted)
OSCHS           EQU     b'01'           ;high speed external crystal/resonator
OSCXT           EQU     b'10'           ;normal external crystal/resonator
OSCLP           EQU     b'11'           ;low power external crystal/resonator

WATCHDOG        EQU     1 << 2          ;watchdog timer enabled
                                        ; default to disabled
PROTECT         EQU     1 << 3          ;code protect enabled (inverted)
                                        ; default is to disable code protect

OSC4MHZ         EQU     b'1000' << 4    ;internal 4MHz
OSC2MHZ         EQU     b'1001' << 4    ;internal 2MHz
OSC1MHZ         EQU     b'1010' << 4    ;internal 1MHz
OSC500KHZ       EQU     b'1011' << 4    ;internal 500KHz
OSC250KHZ       EQU     b'1100' << 4    ;internal 250KHz
OSC125KHZ       EQU     b'1101' << 4    ;internal 125KHz
OSC62KHZ        EQU     b'1110' << 4    ;internal 62.5KHz
OSC31KHZ        EQU     b'1111' << 4    ;internal 31.25KHz

STACKX          EQU     1 << d'8'       ;stack is extended to 8 levels (inverted)
                                        ; default to 2 levels
OPTIONX         EQU     1 << d'9'       ;extend option register to 8 bits (inverted)
                                        ; default to 6 bits
SYNC            EQU     1 << d'10'      ;input syncing enabled (inverted)
                                        ; default to disabled
TURBO           EQU     1 << d'11'      ;turbo mode enabled (inverted)
                                        ; default to disabled

PAGES1          EQU     b'00' << d'12'  ;default
PAGES2          EQU     b'01' << d'12'
PAGES4          EQU     b'10' << d'12'
PAGES8          EQU     b'11' << d'12'

BANKS1          EQU     b'00' << d'14'  ;default
BANKS2          EQU     b'01' << d'14'
BANKS4          EQU     b'10' << d'14'
BANKS8          EQU     b'11' << d'14'

BOR40           EQU     b'11' << d'16'  ;4.0V brownout reset
BOR25           EQU     b'10' << d'16'  ;2.5
BOR13           EQU     b'01' << d'16'  ;1.3
;BOR00          EQU     b'00' << d'16'  ;disabled (default, inverted)

CARRYX          EQU     1 << d'18'      ;ADDWF & SUBWF use carry input (inverted)
                                        ; default is to ignore carry in

PRE7            EQU     1 << d'19'      ;for changing the preset FUSEX bit 7 (inverted)
                                        ; default is no change

;for modifying factory IRC calibration
TRIM0           EQU     b'0000' << d'20'  ;highest frequency
TRIM3           EQU     b'0001' << d'20'  ;
TRIM6           EQU     b'0010' << d'20'  ;
TRIM9           EQU     b'0011' << d'20'  ; about 3% per step
TRIM12          EQU     b'1000' << d'20'  ;
TRIM15          EQU     b'1001' << d'20'  ;
TRIM18          EQU     b'1010' << d'20'  ;
TRIM21          EQU     b'1011' << d'20'  ;lowest frequency (default)

PINS18          EQU     b'0' << d'22'        ;default to 18 pin
PINS28          EQU     b'1' << d'22'

_INVERT         EQU     0F0F8Bh                ;the default looks like a PIC16C54

 ELSE
;New style FUSE and FUSEX bits, for SX chips with Axyywwxx date codes

FOSC0           EQU     b'00'           ; This is horrible
FOSC1           EQU     b'01'
FOSC2           EQU     b'10'
FOSC3           EQU     b'11'

WATCHDOG        EQU     1 << 2          ;watchdog timer enabled
                                        ; default to disabled
PROTECT         EQU     1 << 3          ;code protect enabled (inverted)
                                        ; default is to disable code protect

RC4MHZ          EQU     b'00' << d'5'   ;use only if IRC is enabled
RC1MHZ          EQU     b'01' << d'5'
RC128KHZ        EQU     b'10' << d'5'
RC32KHZ         EQU     b'11' << d'5'

FOSCHI          EQU     1 << d'5'       ;use only if IRC is disabled

IFBD            EQU     1 << d'6'       ;internal feedback resistor on OSC2
                                        ;use only if IRC is disabled

IRC             EQU     1 << d'7'       ;internal RC oscillator enable (inverted)

SYNC            EQU     1 << d'10'      ;input syncing enabled (inverted)
                                        ; default to disabled
TURBO           EQU     1 << d'11'      ;turbo mode enabled (inverted)
                                        ; default to disabled

PAGE1BANK1      EQU     b'11' << d'12'  ; 1 page, 1 bank
PAGE2BANK1      EQU     b'10' << d'12'  ; 2 pages, 1 bank
PAGE4BANK4      EQU     b'01' << d'12'  ; 4 pages, 4 banks
PAGE4BANK8      EQU     b'00' << d'12'  ; 4 pages, 8 banks (default, inverted)

BORTRIM0        EQU     b'00' << d'14'  ;I don't know what these mean
BORTRIM1		EQU     b'01' << d'14'
BORTRIM2		EQU     b'10' << d'14'
BORTRIM3		EQU     b'11' << d'14'

BOR40           EQU     b'11' << d'16'  ;4.0V brownout reset
BOR25           EQU     b'10' << d'16'  ;2.5
BOR13           EQU     b'01' << d'16'  ;1.3
;BOR00          EQU     b'00' << d'16'  ;disabled (default, inverted)

CARRYX          EQU     1 << d'18'      ;ADDWF & SUBWF use carry input (inverted)
                                        ; default is to ignore carry in

OPTIONX         EQU     1 << d'19'      ;extend option register to 8 bits and
                                        ;extend stack to 8 levels (inverted)
                                        ; default to 6 bits and 2 levels

TRIM0           EQU     b'00' << d'20'  ;minimum frequency
TRIM3           EQU     b'01' << d'20'  ;
TRIM6           EQU     b'10' << d'20'  ;
TRIM9           EQU     b'11' << d'20'  ; about 3% per step

PINS18          EQU     0 << d'22'      ;default to 18 pin
PINS28          EQU     1 << d'22'

MORETRIM        EQU     1 << d'23'

_INVERT         EQU     0F3C88h         ;make default look like a PIC16C54

 ENDIF


_DEVICE         SET     DEVICE ^ _INVERT
_FUSE           SET     _DEVICE & 0FFFh
_FUSEX          SET     _DEVICE >> d'12'

;Select a Microchip processor enough like the Scenix processor to satisfy the
; assembler

        PROCESSOR       16C57        ;select a default Microchip processor
_PINS   SET             (_FUSEX & 0400h) >> d'10'
_ROM    SET             _FUSEX & 003h
        ERRORLEVEL        -223        ;processor type change is OK
        IF        (_PINS == 00h) && (_ROM == 00h)        ;18 pin, 512 words
        LIST
        PROCESSOR        16C54        ; "SX18AA"
        NOLIST
        ENDIF
        IF        (_PINS == 01h) && (_ROM == 00h)        ;28 pin, 512 words
        LIST
        PROCESSOR        16C55        ; "SX28AA"
        NOLIST
        ENDIF
        IF        (_PINS == 00h) && (_ROM == 01h)        ;18 pin, 1K words
        LIST
        PROCESSOR        16C56        ; "SX18AB"
        NOLIST
        ENDIF
        IF        (_PINS == 01h) && (_ROM == 02h)        ;28 pin, 2K words
        LIST
        PROCESSOR        16C57        ; "SX28AC"
        NOLIST
        ENDIF
        IF        (_PINS == 00h) && (_ROM == 02h)        ;18 pin, 2K words
        LIST
        PROCESSOR        16C58A        ; "SX18AC"
        NOLIST
        ENDIF
        ERRORLEVEL        +223        ;flag the processor type being changed

;Define macros for new Scenix instructions:

__NowBank       SET     0       ;Default to bank 0 for both past and present
__LastBank      SET     0       ; bank (like the H/W should but doesn't)
__NowPage       SET     7       ;Default to top page for both
__LastPage      SET     7       ; past and present page (like the H/W does)


IREAD   MACRO
          DATA        41h        ;IREAD        ;move instruction at (MODE:W) to MODE:W
        ENDM

MOVMW   MACRO
          DATA        42h        ;MOVMW        ;move MODE register to W register
        ENDM

MOVWM   MACRO
          DATA        43h        ;MOVWM        ;move W register to MODE register
        ENDM

RET     MACRO
          DATA        0Ch        ;RET        ;return without destroying W register
        ENDM

RETP    MACRO
__NowPage SET        __LastPage        ;This does not work for routines called
                                ; from the same page and more than one page ???
          DATA        0Dh        ;RETP        ;RET & write return addr bits 10:9 into PA1:PA0
        ENDM

RETI    MACRO
          DATA        0Eh        ;RETI        ;return from interrupt (pull W, STATUS, FSR, PC)
        ENDM

RETIW   MACRO
          DATA        0Fh        ;RETIW        ;return from interrupt and add W to RTCC
        ENDM

PAGEX   MACRO        X                ;(MPASM already uses "PAGE")
          NOLIST
          LOCAL        _X
_X        SET        X
          IF        (_X)&0FFFFFFF8h
          ERROR        "page > 7"
          ENDIF
;***          IF        _X == __NowPage
;***          MESSG        "Page was not changed"
;***          ENDIF
;***          IF        _X != __LastPage
;***          MESSG        "Page was not restored"
;***          ENDIF
__LastPage SET        __NowPage
__NowPage  SET        _X
          LIST
          DATA        10h | (_X)        ;PAGE--write N into bits PA2:PA0 (N = 0-7)
        ENDM

PAGEA   MACRO        A                ;(MPASM already uses "PAGE")
        NOLIST
        LOCAL        _A
_A        SET        A
;***          IF        ((_A)>>9) == __NowPage
;***          MESSG        "Page was not changed"
;***          ENDIF
;***          IF        ((_A)>>9) != __LastPage
;***          MESSG        "Page was not restored"
;***          ENDIF
__LastPage SET        __NowPage
__NowPage  SET        ((_A)>>9)
          LIST
          DATA        10h|((_A)>>d'9')  ;PAGE--write bits A12:A10 into PA2:PA0
        ENDM

BANKX   MACRO        X                ;(MPASM already uses "BANK")
          NOLIST
          LOCAL        _X
_X        SET        X
          IF        (_X)&0FFFFFFF8h
          ERROR        "bank > 7"
          ENDIF
          IF        _X == __NowBank
          MESSG        "Bank was not changed"
          ENDIF
          IF        _X != __LastBank
          MESSG        "Bank was not restored"
          ENDIF
__LastBank SET        __NowBank
__NowBank  SET        _X
          LIST
          DATA        18h|(_X)  ;BANK        ;write N into bits FSR7:FSR5 (N = 0-7)
        ENDM

BANKA   MACRO        A                ;(MPASM already uses "BANK")
          NOLIST
          LOCAL        _A
_A        SET        A
          IF        ((_A)>>5) == __NowBank
          MESSG        "Bank was not changed"
          ENDIF
          IF        ((_A)>>5) != __LastBank
          MESSG        "Bank was not restored"
          ENDIF
__LastBank SET        __NowBank
__NowBank  SET        ((_A)>>5)
          LIST
          DATA        18h|((_A)>>5)        ;BANK--write bits A7:A5 into FSR7:FSR5
        ENDM

MODE    MACRO        N
          NOLIST
          LOCAL        _N
_N        SET        N
          IF        (_N)&0FFFFFFF0h
          ERROR        "mode > 0Fh"
          ENDIF
          LIST
          DATA        50h|(_N)  ;MODE        ;write N into MODE register (N = 0-F)
        ENDM


;Define macros for SxSim simulator instructions:

PRINTX  MACRO
          DATA        01h        ;PRINT        ;simulator instruction: print byte in W
        ENDM

INPUTX  MACRO
          DATA        0Ah        ;INPUT        ;simulator instruction: W gets ASCII keystroke
        ENDM

OUTPUTX MACRO
          DATA        0Bh        ;OUTPUT        ;simulator instruction: display ASCII char in W
        ENDM


;Define some basic macros:

FGOTO   MACRO        A                ;(MPASM already uses "LGOTO")
        NOLIST
        LOCAL        _A
_A        SET        A
          ERRORLEVEL        -306        ;don't display "crossing page boundary" message
        LIST
          DATA        10h|((_A)>>d'9')  ;PAGE--write bits A12:A10 into PA2:PA0
          GOTO        (_A)&1FFh
          ERRORLEVEL        +306        ;restore "crossing page boundary" message
        ENDM

FCALL   MACRO        A                ;(MPASM already uses "LCALL")
        NOLIST
        LOCAL        _A
_A        SET        A
          ERRORLEVEL        -306        ;don't display "crossing page boundary" message
        LIST
          DATA        10h|((_A)>>d'9')  ;PAGE--write bits A12:A10 into PA2:PA0
          CALL        (_A)&1FFh
          ERRORLEVEL        +306        ;restore "crossing page boundary" message
        ENDM                        ;(don't replace 1FFh with 0FFh)

SKIP    MACRO                        ;in turbo mode this saves one cycle over a GOTO
          NOLIST
          IF        $&1                ;odd location
          LIST
          BTFSC        PC,0                ;always skips
          NOLIST
          ELSE                        ;even location
          LIST
          BTFSS        PC,0                ;always skips
          NOLIST
          ENDIF
          LIST
        ENDM

CSA     MACRO        X,Y
          NOLIST
          LOCAL        _X,_Y
_X        SET        X
_Y        SET        Y
          LIST
          MOVF        _X,W                ;compare arg1 to arg2 and skip if above
          SUBWF        _Y,W
          BTFSC        STATUS,C
        ENDM

CSA#    MACRO        X,Y
          NOLIST
          LOCAL        _X,_Y
_X        SET        X
_Y        SET        Y
          LIST
          MOVLW        (_Y)^0FFh        ;compare arg1 to literal and skip if above
          ADDWF        _X,W
          BTFSS        STATUS,C
        ENDM

CSAE    MACRO        X,Y
          NOLIST
          LOCAL        _X,_Y
_X        SET        X
_Y        SET        Y
          LIST
          MOVF        _Y,W                ;compare arg1 to arg2 and skip if above or equal
          SUBWF        _X,W
          BTFSS        STATUS,C
        ENDM

CSAE#   MACRO        X,Y
          NOLIST
          LOCAL        _X,_Y
_X        SET        X
_Y        SET        Y
          LIST
          MOVLW        _Y                ;compare arg1 to lit. and skip if above or equal
          SUBWF        _X,W
          BTFSS        STATUS,C
        ENDM

CSB     MACRO        X,Y
          NOLIST
          LOCAL        _X,_Y
_X        SET        X
_Y        SET        Y
          LIST
          MOVF        _Y,W                ;compare arg1 to arg2 and skip if below
          SUBWF        _X,W
          BTFSC        STATUS,C
        ENDM

CSB#    MACRO        X,Y
          NOLIST
          LOCAL        _X,_Y
_X        SET        X
_Y        SET        Y
          LIST
          MOVLW        _Y                ;compare arg1 to literal and skip if below
          SUBWF        _X,W
          BTFSC        STATUS,C
        ENDM

CSBE    MACRO        X,Y
          NOLIST
          LOCAL        _X,_Y
_X        SET        X
_Y        SET        Y
          LIST
          MOVF        _X,W                ;compare arg1 to arg2 and skip if below or equal
          SUBWF        _Y,W
          BTFSS        STATUS,C
        ENDM

CSBE#   MACRO        X,Y
          NOLIST
          LOCAL        _X,_Y
_X        SET        X
_Y        SET        Y
          LIST
          MOVLW        (_Y)^0FFh        ;compare arg1 to lit. and skip if below or equal
          ADDWF        _X,W
          BTFSC        STATUS,C
        ENDM


;Define macro for ID label. Example:
;        ID        'S', 'X', '-', 'D', 'e', 'm', 'o', ' '

ID      MACRO        A,B,C,D,E,F,G,H                ;set up ID label
          NOLIST
          LOCAL        _A,_B,_C,_D,_E,_F,_G,_H
_A        SET        A
_B        SET        B
_C        SET        C
_D        SET        D
_E        SET        E
_F        SET        F
_G        SET        G
_H        SET        H
          ERRORLEVEL        -220        ;don't display "address exceeds range" warning
          ORG        1000h
;***          DATA        (_A>>4)&0Fh, A&0Fh        ;Unused bits are cleared
;          DATA        (_B>>4)&0Fh, B&0Fh
;          DATA        (_C>>4)&0Fh, C&0Fh
;          DATA        (_D>>4)&0Fh, D&0Fh
;          DATA        (_E>>4)&0Fh, E&0Fh
;          DATA        (_F>>4)&0Fh, F&0Fh
;          DATA        (_G>>4)&0Fh, G&0Fh
;***          DATA        (_H>>4)&0Fh, H&0Fh
          DATA        (_A>>4)|0FF0h, A|0FF0h        ;Unused bits are set
          DATA        (_B>>4)|0FF0h, B|0FF0h
          DATA        (_C>>4)|0FF0h, C|0FF0h
          DATA        (_D>>4)|0FF0h, D|0FF0h
          DATA        (_E>>4)|0FF0h, E|0FF0h
          DATA        (_F>>4)|0FF0h, F|0FF0h
          DATA        (_G>>4)|0FF0h, G|0FF0h
          DATA        (_H>>4)|0FF0h, H|0FF0h
          ERRORLEVEL        +220        ;restore warning message
          ORG        0
          LIST
        ENDM

        ERRORLEVEL        -220        ;don't display "address exceeds range" warning
        ORG        1010h
        LIST
        DATA        _FUSE                ;configuration bits (TURBO, SYNC, OPTIONX, etc.)
        DATA        _FUSEX                ; (PINS, CARRYX, BOR40, BANKS, PAGES)
        NOLIST
        ERRORLEVEL        +220        ;restore warning message
        ORG        0
        LIST
