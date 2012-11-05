/* Router reset program
 * 
 * Copyright (C) 2003 - Tyler Akins
 * Licensed under the GNU GPL software license
 * 
 * This software is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the
 * Free Software Foundation; either version 2 of the License, or (at your
 * option) any later version.
 * 
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILIT
 * or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * for more details
 * 
 * To view a copy of the GNU General Public License, you can go to
 * http://www.gnu.org/licenses/gpl.htm or you can write to
 *    Free Software Foundation, Inc.
 *    59 Temple Place, Suite 330
 *    Boston, MA  02111-1307  USA
 * 
 * 
 * The circuit connects to the parallel port.  I forget which wire I used,
 * but there are tons of schematics out there that will help you determine
 * which wires to use.  I think I used wire 1 and a ground wire (18-25), but
 * I'm not 100% sure.
 * 
 * Anyway, I soldered on a relay that defaults to open, so when I send the
 * high bit to the parallel port, it will close the relay.  On the other side
 * of the relay, I soldered a 9v battery and a bigger relay that defaults to
 * on.  So, the router plugs into my box, and will be granted power by
 * default.  When I send the high bit to the parallel port, it will close the
 * first circuit, causing the 9v battery to open the second relay.  Don't
 * leave this circuit in that position for long!  I didn't put any resistors
 * in, so you could have issues with the battery dying and whatnot.
 * 
 *         relay 1          relay 2
 * 
 * pin 1        +-------------}    +-------
 * -----------} |  .          }   *|
 *            }   /           }   |       AC
 * pin 18     }  /            }   |       Power
 * -----------} /   | | | |   }   |
 *              +--||||||||---}   |
 *                  | | | |       +--------
 * Computer          9v battery
 * Side
 * 
 * relay 1 is a dinky relay, triggers on about 5v.
 * relay 2 is a bigger relay for handling larger loads, defaults to on, and
 * when power is applied (by closing relay 1), the relay will open.
 */

#include <stdio.h>
#include <unistd.h>
#include <asm/io.h>
#include <syslog.h>

#define LPT1 0x378

#define BASEPORT LPT1

#define POWER_OFF_TIME 3

#define CMD "ping -c 1 visi.com > /dev/null 2>&1"

#define NORMAL_SLEEP_TIME 300
#define FAILED_SLEEP_TIME 60
#define IN_A_ROW 5

// #define DEBUG

void reset(void);

int main(void)
{
   int i, j;
   
   if (ioperm(BASEPORT, 3, 1))
     {
	perror("ioperm");
	exit(1);
     }
   
#ifdef DEBUG
   reset();
#else
   
   openlog("router reset", LOG_CONS | LOG_PID, LOG_USER);
   syslog(LOG_INFO, "Monitoring network connection");
   closelog();
   
   i = 0;
   while (1)
     {
	j = system(CMD);
	if (j)
	  {
	     i ++;
	     if (i == IN_A_ROW)
	       {
		  openlog("router reset", LOG_CONS | LOG_PID, LOG_USER);
		  syslog(LOG_NOTICE, "Resetting router");
		  closelog();
		  reset();
		  i = 0;
		  sleep(NORMAL_SLEEP_TIME);
	       }
	     else
	       {
		  sleep(FAILED_SLEEP_TIME);
	       }
	  }
	else
	  {
	     i = 0;
	     sleep(NORMAL_SLEEP_TIME);
	  }
     }
#endif
}


void reset(void)
{
   outb(0x01, BASEPORT);
   sleep(POWER_OFF_TIME);
   outb(0x00, BASEPORT);
}
