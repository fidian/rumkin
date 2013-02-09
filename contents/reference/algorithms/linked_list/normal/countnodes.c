#include "globals.h"

unsigned long countNodes()
{
   unsigned long nodes = 0;
   node *curr;
   
   curr = nodeHead;
   while (curr)
     {
	nodes ++;
	curr = curr->next;
     }
   
  return nodes;
}
