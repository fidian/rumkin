CC=gcc
CCOPTS=-Os -Wall

all: comp wordlist.js


comp: comp.c
	$(CC) $(CCOPTS) comp.c -o comp
	strip comp
	

wordlist.js: comp beale.wordlist.asc diceware.wordlist.asc
	echo -n "var Diceware_List=\"" > wordlist.js
	cat diceware.wordlist.asc | tr A-Z a-z | sort | cut -f 2 | \
	./comp >> wordlist.js
	echo "\"" >> wordlist.js
	echo -n "var Beale_List=\"" >> wordlist.js
	cat beale.wordlist.asc | tr A-Z a-z | sort | cut -f 2 | \
	./comp >> wordlist.js
	echo "\"" >> wordlist.js
	echo "document.Wordlist_Loaded = 1;" >> wordlist.js
