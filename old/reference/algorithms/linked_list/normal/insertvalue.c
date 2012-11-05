#include "globals.h"

void insertValue(node *newNode)
{
   node *curr, *prev;

   curr = nodeHead;  // nodeHead is a global
   prev = NULL;
   
   // Scan for place to insert (sorted numerically)
   while (curr && curr->data < newNode->data)
     {
	prev = curr;
	curr = curr->next;
     }
   
   // Update pointers
   newNode->next = curr;
   newNode->prev = prev;
   
   if (prev == NULL)
     nodeHead = newNode;
   else
     prev->next = newNode;
   
   if (curr == NULL)
     nodeTail = newNode;
   else
     curr->prev = newNode;
}
