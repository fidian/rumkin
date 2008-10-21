#!/bin/sh
rm *.gif
for L in A B C D E F G H I J K L M N O P Q R S T U V W X Y Z 0 1 2 3 4 5 6 7 8 9; do {
   wget http://rumkin.com/tools/cipher/image.php/dancingmen/$L -O ${L}.gif
   wget http://rumkin.com/tools/cipher/image.php/dancingmen/${L}_ -O ${L}_.gif
}; done