/* Might I suggest you DO NOT code like this?  I am only whipping up an
 * example program.  Using conventions like this will get you yelled at
 * if you are writing a real program.
 */

#include "listdef.h"
#include <stdio.h>
#include <stdlib.h>


#define PTRTYPE int
#define XOR(a,b) ((node *) ((PTRTYPE)(a)^(PTRTYPE)(b)))
#define XOR3(a,b,c) ((node *) ((PTRTYPE)(a)^(PTRTYPE)(b)^(PTRTYPE)(c)))


#ifndef MAIN
extern node *nodeHead;
extern node *nodeTail;
#else
node *nodeHead;
node *nodeTail;

unsigned long countNodes(void);
void insertValue(node *);
void deleteNode(int);
#endif
