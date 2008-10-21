CC=gcc
CCOPTS=-Os -Wall
STRIP=strip

O_FILES=listtest.o countnodes.o insertvalue.o deletenode.o

all: $(O_FILES)
	$(CC) $(CCOPTS) -o listtest $(O_FILES)
	$(STRIP) listtest

%.o: %.c listdef.h
	$(CC) -c $(CCOPTS) $< -o $@
	
clean:
	rm -f *.o *~ listtest