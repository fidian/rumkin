#include "globals.h"

void deleteNode(unsigned long i)
{
   node *prev, *curr, *temp;
     
   // Find the node
   curr = nodeHead;
   while (curr && i--)
     {
	curr = curr->next;
     }
   
   // Might have fallen off the list
   if (curr == NULL)
     return;
   
   // Erase the node
   prev = curr->prev;
   temp = curr;
   curr = curr->next;
   free(temp);
   
   // Update links
   if (prev != NULL)
     prev->next = curr;
   else
     nodeHead = curr;
   
   if (curr != NULL)
     curr->prev = prev;
   else
     nodeTail = prev;
}
