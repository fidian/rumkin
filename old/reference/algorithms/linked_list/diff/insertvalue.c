#include "globals.h"

void insertValue(node *newNode)
{   
   node *prev, *curr, *temp;  // Extra pointers here
   
   curr = nodeHead;  // nodeHead is a global
   prev = NULL;
   
   // Scan for place to insert (sorted numerically)
   while (curr && curr->data < newNode->data)
     {
	temp = XOR(prev, curr->diff);
	prev = curr;
	curr = temp;
     }
   
   // Update pointers
   newNode->diff = XOR(prev, curr);
   
   if (curr != NULL)
     curr->diff = XOR3(curr->diff, prev, newNode);
   else
     nodeTail = newNode;  // Last in list
   
   if (prev != NULL)
     prev->diff = XOR3(prev->diff, curr, newNode);
   else
     nodeHead = newNode;  // First in list
}
