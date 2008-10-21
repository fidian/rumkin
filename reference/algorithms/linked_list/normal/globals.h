/* Might I suggest you DO NOT code like this?  I am only whipping up an
 * example program.  Using conventions like this will get you yelled at
 * if you are writing a real program.
 */

#include "listdef.h"
#include <stdio.h>
#include <stdlib.h>

#ifndef MAIN
extern node *nodeHead;
extern node *nodeTail;
#else
node *nodeHead;
node *nodeTail;

unsigned long countNodes(void);
void insertValue(node *);
void deleteNode(unsigned long);
#endif
