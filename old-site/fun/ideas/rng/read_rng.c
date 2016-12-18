/************************************************************************
   Program to read stuff from a hardware random number generator on a
   serial port and ioctl it to /dev/random entropy pool or a disk file.
   Aaron Logue May 2004
************************************************************************/
#include <sys/types.h>
#include <sys/stat.h>
#include <sys/ioctl.h>
#include <fcntl.h>
#include <termios.h>
#include <stdio.h>
#include <syslog.h>
#include <unistd.h>
#include <linux/types.h>
#include <linux/random.h>
#include <errno.h>

#define BAUDRATE B9600

#define CMD_USAGE       1
#define CMD_BINARY      2
#define CMD_HEX         4
#define CMD_BASE64      8
#define CMD_BYTE        16
#define CMD_FILE        32

#define BUFSIZ	256
#define DEVRANDOM "/dev/random"
#define DEFAULTSERIAL "/dev/ttyS0"

/* WARNING - this struct must match random.h's struct rand_pool_info */
typedef struct {
   int bit_count;               /* number of bits of entropy in data */
   int byte_count;              /* number of bytes of data in array */
   unsigned char buf[BUFSIZ];
} entropy_t;

/* Global Data */
int commandlineparms;

char serialdevice[257];         /* name of serial device */
char randomfile[257];           /* name of output random data file */
int fdser;                      /* serial device fd */
struct termios oldtio, newtio;	/* serial device configuration */
int char_valid;                 /* true if read_next_char was successful */
char serialbuffer[BUFSIZ+1];    /* read 'em to here */
int char_remaining;             /* number of characters left in serialbuffer */
int char_index;                 /* current character in serialbuffer */
int byte_count;                 /* number of bytes to read */


/* Return next character from serial stream, if any */
char read_next_char(int fdser) {
   if (char_remaining == 0) {
      char_remaining = read(fdser, serialbuffer, BUFSIZ);
      char_index = 0;
      if (char_remaining < 0) {
         char_remaining = 0;
      }
   }
   if (char_remaining) {
      char_remaining--;
      char_valid = 1;
      return(serialbuffer[char_index++]);
   }
   char_valid = 0;
   return(0);
}


/* Read a predetermined number of characters from serial stream.
   Returns -1 if error or not enough characters read
*/
int read_block(int fd, int size, char * dest) {
   while (size--) {
      *dest++ = read_next_char(fd);
      if (!char_valid) {
         return -1;
      }
   }
   return(0);
}


/*
   Read command line parameters
*/
void get_parms(int argc, char *argv[]) {
   extern char *optarg;
   extern int optind, opterr, optopt;

   int errflg = 0;
   int c;
   const char *env;
 
   while ((c = getopt(argc, argv, "hd:f:q:1468")) != EOF) {
      switch (c) {
         case 'd':
            /* Copy specified serial device name from optarg */
            strcpy(serialdevice, optarg);
            break;
         case 'f':
            /* File to receive random data */
            strcpy(randomfile, optarg);
            commandlineparms |= CMD_FILE;
            break;
         case 'q':
            byte_count = atoi(optarg);
            if (byte_count > 1048576) {
               byte_count = 1048576;	/* cap it at a meg */
            }
            break;
         case '1':
            commandlineparms =
               commandlineparms & ~(CMD_HEX | CMD_BASE64 | CMD_BYTE);
            commandlineparms |= CMD_BINARY;
            break;
         case '4':
            commandlineparms =
               commandlineparms & ~(CMD_BINARY | CMD_BASE64 | CMD_BYTE);
            commandlineparms |= CMD_HEX;
            break;
         case '6':
            commandlineparms =
               commandlineparms & ~(CMD_BINARY | CMD_HEX | CMD_BYTE);
            commandlineparms |= CMD_BASE64;
            break;
         case '8':
            commandlineparms =
               commandlineparms & ~(CMD_BINARY | CMD_HEX | CMD_BASE64);
            commandlineparms |= CMD_BYTE;
            break;
         case '?': /* user entered unknown option */
         case ':': /* user entered option without required value */
         case 'h': /* User wants Usage message */
         default:
            commandlineparms |= CMD_USAGE;
            break;
      }
   }
}


int main(int argc, char *argv[]) {
   int c, result;
   int done = 0;
   char buf[BUFSIZ+1];
   int buf_index = 0;
   int fdout;
   int using_devrandom;
   entropy_t ent;

   byte_count = 64;             /* default to stocking 512 bits of entropy */
   commandlineparms = CMD_BASE64;
   strcpy(serialdevice, DEFAULTSERIAL);
   strcpy(randomfile, DEVRANDOM);
   get_parms(argc, argv);

   if (commandlineparms & CMD_USAGE) {
      printf("Usage: %s [-d device] [-q count] [-f filename] [1|4|6|8]\n\n",
         argv[0]);
      printf("  -d device   : Specify serial device name (eg: /dev/ttyS1)\n");
      printf("  -q count    : Write <count> bytes of data to file (<= 1M)\n");
      printf("  -f filename : Specify output random data file\n");
      printf("  -1          : Produce ASCII 0/1 binary random data\n");
      printf("  -4          : Produce ASCII hexadecimal random data\n");
      printf("  -6          : Produce Base64 random data\n");
      printf("  -8          : Produce 8-bit random data\n");
      printf("\n");
      printf("Example: %s -d /dev/ttyS1\n\n");
      exit(2);
   }

   using_devrandom = 0;
   if (!strcmp(randomfile, DEVRANDOM)) {
      using_devrandom = 1;
   }

   fdser = open(serialdevice, O_RDWR | O_NOCTTY );
   if (fdser <= 0) {
      perror("rng: Problem opening serial device; check device name.");
      exit(1);
   }

   tcgetattr(fdser, &oldtio);	/* save previous port settings */

   bzero(&newtio, sizeof(newtio));
   newtio.c_cflag = BAUDRATE | CS8 | CLOCAL | CREAD;
   newtio.c_iflag = IGNPAR;
   newtio.c_oflag = 0;
   /* set serial device input mode (non-canonical, no echo,...) */
   newtio.c_lflag = 0;
   newtio.c_cc[VTIME]    = 30;	/* 3 second timeout */
   newtio.c_cc[VMIN]     = 0;	/* block until char or timeout */
   tcsetattr(fdser, TCSANOW, &newtio);
 
   char_remaining = 0;		/* Init serial buffer */
   char_index = 0;

   ent.buf[0] = 0x13;		/* ^S */
   write(fdser, ent.buf, 1);	/* Tell RNG to shut up */
   tcdrain(fdser);
   tcflush(fdser, TCIFLUSH);
   ent.buf[0] = '8';		/* Assume binary */
   if (!using_devrandom) {      /* Force binary if writing to /dev/random */
      if (commandlineparms & CMD_BINARY) {
         ent.buf[0] = '1';
      } else if (commandlineparms & CMD_HEX) {
         ent.buf[0] = '4';
      } else if (commandlineparms & CMD_BASE64) {
         ent.buf[0] = '6';
      }
   }
   write(fdser, ent.buf, 1);	/* Select output data type */
   tcdrain(fdser);
   write(fdser, ent.buf, 1);	/* Send it again, because we can */
   tcdrain(fdser);
   ent.buf[0] = 0x11;		/* ^Q */
   write(fdser, ent.buf, 1);	/* Select data type and turn on stream */
   tcdrain(fdser);
   tcflush(fdser, TCIFLUSH);

   if (using_devrandom) {
      fdout = open(DEVRANDOM, O_WRONLY); /* octal constants begin w/ 0 */
   } else {
      fdout = open(randomfile, O_CREAT | O_WRONLY | O_APPEND, 0644);
   }
   if (fdout > 0) {
      while (byte_count > 0) {
         c = read_next_char(fdser);
         if (char_valid) {
            ent.buf[buf_index++] = c;
            // printf("%c", c);
         }
         byte_count--;

         /* if buffer is full or we've read the last byte, write it */
         if (buf_index == BUFSIZ || byte_count == 0) {
            if (using_devrandom) {
               /*
                * We could just write() to /dev/random, but that would not
                * credit the entropy pool, which in turn would not unblock
                * applications that were waiting in a /dev/random read.
                * To credit the entropy pool, we must use ioctl() and the
                * RNDADDENTROPY command.  See linux/drivers/char/random.c
                */
               ent.byte_count = buf_index;
               ent.bit_count = ent.byte_count << 3;
               ioctl(fdout, RNDADDENTROPY, &ent);
            } else {
               write(fdout, ent.buf, buf_index);
            }
            buf_index = 0;
         }
      }
      close(fdout);
   } else {
      printf("Error %d: could not open %s\n", errno, randomfile);
   }

   ent.buf[0] = 0x13;		/* ^S */
   write(fdser, ent.buf, 1);	/* Tell RNG not to hammer on serial port */
   tcdrain(fdser);
   tcflush(fdser, TCIFLUSH);
   tcsetattr(fdser, TCSANOW, &oldtio); /* restore previous port settings */
   exit(0);
}
