#
# Set up tmda
#
fidian@sage:~$ mkdir ~/.tmda
fidian@sage:~$ tmda-keygen | head -n 3 | tail -n 1 > ~/.tmda/crypt_key
fidian@sage:~$ chmod 600 ~/.tmda/crypt_key

