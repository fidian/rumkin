#!/bin/sh
rm *.gif
for L in A B C D E F G H I J K L M N O P Q R S T U V W X Y Z; do {
   wget http://rumkin.com/tools/cipher/image.php/pigpen/$L -O ${L}.gif
}; done