#include "globals.h"

unsigned long countNodes()
{
   unsigned long nodes = 0;
   node *curr, *prev, *temp;
   
   prev = NULL;
   curr = nodeHead;
   while (curr)
     {
	nodes ++;
	temp = curr;
	curr = XOR(prev, temp->diff);
	prev = temp;
     }
   
  return nodes;
}
