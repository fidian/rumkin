#include "globals.h"

void deleteNode(unsigned long i)
{
   node *prev, *curr, *temp;
     
   // Find the node
   prev = NULL;
   curr = nodeHead;
   while (curr && i --)
     {
	temp = XOR(prev, curr->diff);
	prev = curr;
	curr = temp;
     }
   
   // Might have fallen off the list
   if (curr == NULL)
     return;
   
   // Erase the node
   temp = curr;
   curr = XOR(prev, temp->diff);
   free(temp);
   
   // Update links
   if (prev != NULL)
     prev->diff = XOR3(prev->diff, temp, curr);
   else
     nodeHead = curr;
   
   if (curr != NULL)
     curr->diff = XOR3(curr->diff, temp, prev);
   else
     nodeTail = prev;
}
