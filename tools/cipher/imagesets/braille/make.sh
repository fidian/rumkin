#!/bin/sh
rm *.gif
for A in ' ' 4 5 45 6 46 56 456; do {
   for B in ' ' 1 2 12 3 13 23 123; do {
      C=`echo $B $A | tr -d " "`
      if [ -z "$C" ]; then {
         C=_
      }; fi
      wget http://rumkin.com/tools/cipher/image.php/braille/${C}.gif
   }; done
}; done