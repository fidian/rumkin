CC = gcc
CCOPTS = -Os -Wall

all: comp common.js letterpair

comp: comp.c
	$(CC) $(CCOPTS) comp.c -o comp
	strip comp
	
common.js: comp common.txt
	./comp < common.txt > common.js

letterpair: letterpair.c
	$(CC) $(CCOPTS) letterpair.c -o letterpair
	strip letterpair

other.stats: letterpair
	gzcat ../../../../rumkin-media/tools/password/build/other.txt.gz | \
	./letterpair > other.stats

frequency.js: other.stats
	echo "// Compressed and encoded letter frequency table" > frequency.js
	echo "" >> frequency.js
	echo -n "var Frequency_List = \"" >> frequency.js
	cat other.stats >> frequency.js
	echo "\";" >> frequency.js
	echo "" >> frequency.js
	echo "document.Frequency_Loaded = 1;" >> frequency.js
