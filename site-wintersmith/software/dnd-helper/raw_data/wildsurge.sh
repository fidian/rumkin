#!/bin/bash

links -source http://www.miniworld.com/adnd/data/wildsurge.dat > wildsurge.dat
cat wildsurge.dat | grep -e "^[12]:" | cut -d ':' -f 3- > wildsurge.txt
cat wildsurge.dat | grep -e "^[3]:" | cut -d ':' -f 3- > wildsurgefumble.txt
rm wildsurge.dat