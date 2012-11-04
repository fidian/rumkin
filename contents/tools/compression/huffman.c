#include "stdio.h"
#include "stdlib.h"
#include "string.h"


int BIT_TABLE[9] = 
{
   0, 1, 2, 4, 8, 16, 32, 64, 128
};

struct HuffmanTreeNode 
{
   unsigned long frequency;
   struct HuffmanTreeNode *parent, *left, *right;
   // Left branch = 0, right branch = 1
   struct HuffmanTreeNode *next, *prev;
};

struct HuffmanTreeCode
{
   unsigned char bit_num;
   unsigned char bits[32];
};


struct HuffmanTreeNode *CreateHuffmanNode(void)
{
   struct HuffmanTreeNode *node;
   
   node = (struct HuffmanTreeNode *) malloc(sizeof(struct HuffmanTreeNode));
   if (! node)
     {
	fprintf(stderr, "Error allocating space for Huffman tree node\n");
	exit(-1);
     }
   
   node->frequency = 0;
   node->parent = NULL;
   node->left = NULL;
   node->right = NULL;
   node->next = NULL;
   node->prev = NULL;
   
   return node;
}


struct HuffmanTreeNode *MergeHuffmanTree(struct HuffmanTreeNode *head)
{
   struct HuffmanTreeNode *smallest, *next_smallest, *node;

   while (head->next != NULL)
     {
	next_smallest = NULL;
	smallest = head;
	node = head->next;
	while (node != NULL)
	  {
	     if (next_smallest == NULL)
	       {
		  if (node->frequency < smallest->frequency)
		    {
		       next_smallest = smallest;
		       smallest = node;
		    }
		  else
		    {
		       next_smallest = node;
		    }
	       }
	     else if (smallest->frequency > node->frequency)
	       {
		  next_smallest = smallest;
		  smallest = node;
	       }
	     else if (next_smallest->frequency > node->frequency)
	       {
		  next_smallest = node;
	       }
	     node = node->next;
	  }
	
	// Move head forward
	while (head == smallest || head == next_smallest)
	  head = head->next;
	
	// smallest and next_smallest are the two smallest nodes
	// Remove them from the list
	if (smallest->prev != NULL)
	  smallest->prev->next = smallest->next;
	if (smallest->next != NULL)
	  smallest->next->prev = smallest->prev;
	if (next_smallest->prev != NULL)
	  next_smallest->prev->next = next_smallest->next;
	if (next_smallest->next != NULL)
	  next_smallest->next->prev = next_smallest->prev;
	
	// Just a matter of housekeeping
	smallest->prev = NULL;
	smallest->next = NULL;
	next_smallest->prev = NULL;
	next_smallest->next = NULL;
	
	// Create a new master node with the frequency values of the
	// two sub-nodes
	node = CreateHuffmanNode();
	node->frequency = smallest->frequency + next_smallest->frequency;
	node->left = next_smallest;
	node->right = smallest;
	next_smallest->parent = node;
	smallest->parent = node;
	
	// Add into the list again
	node->next = head;
	if (head != NULL)
	  head->prev = node;
	head = node;
     }
   
   // We are done creating new nodes.
   return head;
}


void CreateHuffmanCode(struct HuffmanTreeCode *code,
		       struct HuffmanTreeNode *node)
{
   unsigned int i, j;
   
   struct HuffmanTreeNode *prev;
   code->bit_num = 0;
   
   for (i = 0; i < 32; i ++)
     code->bits[i] = 0;
     
   while (node->parent != NULL)
     {
	code->bit_num ++;
	prev = node;
	node = node->parent;
	
	if (node->right == prev)
	  {
	     i = code->bit_num;
	     j = 0;
	     while (i > 8)
	       {
		  j ++;
		  i -= 8;
	       }
	     code->bits[i] ^= BIT_TABLE[i];
	  }
     }
}


struct HuffmanTreeCode **MakeHuffmanCode(struct HuffmanTreeNode **Nodes)
{
   struct HuffmanTreeCode **CodeHead;
   unsigned int i;
   
   CodeHead = (struct HuffmanTreeCode **) 
     malloc(sizeof(struct HuffmanTreeCode *) * 256);
   if (CodeHead == NULL)
     {
	fprintf(stderr, "Unable to allocate memory for code table\n");
	exit(-1);
     }
   
   for (i = 0; i < 256; i ++)
     {
	CodeHead[i] = NULL;
	if (Nodes[i] != NULL)
	  {
	     CodeHead[i] = (struct HuffmanTreeCode *) 
	       malloc(sizeof(struct HuffmanTreeCode));
	     if (CodeHead[i] == NULL)
	       {
		  fprintf(stderr, "Unable to allocate memory for code\n");
		  exit(-1);
	       }
	     CreateHuffmanCode(CodeHead[i], Nodes[i]);
	  }
     }
   
   return CodeHead;
}
   
 
void FreeHuffmanCodes(struct HuffmanTreeCode **head)
{
   unsigned int i;
   
   for (i = 0; i < 256; i ++)
     {
	if (head[i] != NULL)
	  {
	     free(head[i]);
	  }
     }
   free(head);
}


void FreeHuffmanTree(struct HuffmanTreeNode *head)
{
   struct HuffmanTreeNode *node, *node2;

   node = head;
   
   while (head != NULL)
     {
	if (head->left != NULL)
	  {
	     node->next = head->left;
	     node->next->prev = node;
	     node = node->next;
	     node->parent = NULL;
	  }
	if (head->right != NULL)
	  {
	     node->next = head->right;
	     node->next->prev = node;
	     node = node->next;
	     node->parent = NULL;
	  }
	node2 = head->next;
	free(head);
	head = node2;
     }
}


struct HuffmanTreeCode **CreateHuffmanTree(unsigned char *data, unsigned long len)
{
   unsigned long Letters[256];
   struct HuffmanTreeNode *LetterNodes[256];
   unsigned long i;
   struct HuffmanTreeNode *head, *node;
   struct HuffmanTreeCode **codes;

   // Do initial scan of letter frequencies
   for (i = 0; i < 256; i ++)
     {
	Letters[i] = 0;
	LetterNodes[i] = NULL;
     }
   
   for (i = 0; i < len; i ++)
     {
	Letters[data[i]] ++;
     }
   
   // Create the tree leaves
   head = NULL;
   node = NULL;
   for (i = 0; i < 256; i ++)
     {
	if (Letters[i] > 0)
	  {
	     if (node == NULL)
	       {
		  head = CreateHuffmanNode();
		  node = head;
	       }
	     else
	       {
		  node->next = CreateHuffmanNode();
		  node->next->prev = node;
		  node = node->next;
	       }
	     node->frequency = Letters[i];
	     LetterNodes[i] = node;
	  }
     }
   
   head = MergeHuffmanTree(head);
   codes = MakeHuffmanCode(LetterNodes);
   FreeHuffmanTree(head);
   
   return codes;
}


int AppendHuffmanCode(struct HuffmanTreeCode *code,
		       unsigned char *dest, unsigned long dlen,
		       unsigned long *used_bytes, unsigned int *used_bits)
{
   unsigned int i, j, k;
   if (code == NULL)
     {
	fprintf(stderr, "Error with codes!  This shouldn't happen.\n");
	return 1;
     }
   
   i = (*used_bits) + code->bit_num;
   j = i / 8;
   if (i - (j * 8) > 0)
     j ++;
   if (dlen <= (*used_bytes) + j)
     {
	fprintf(stderr, "Encoded data will not fit into dest.\n");
	return 1;
     }
   
   // Ok, this isn't fast, but it is easier to code.
   // Add each bit individually to dest
   i = code->bit_num;
   while (i)
     {
	(*used_bits) ++;
	j = 0;  // the byte offset in code
	k = i;  // the bit offset in code
	while (k > 8)
	  {
	     j ++;
	     k -= 8;
	  }
	if (code->bits[j] & BIT_TABLE[k])
	  {
	     // Yes, we set the bit
	     dest[*used_bytes] ^= BIT_TABLE[8 - *used_bits];
	  }
	if (*used_bits >= 8)
	  {
	     (*used_bytes) ++;
	     *used_bits = 0;
	  }
	
	i --;
     }
   
   return 0;
}


unsigned long CompressWithHuffman(unsigned char *src, unsigned long slen,
				  unsigned char *dest, unsigned long dlen,
				  unsigned int *dbits)
{
   unsigned long dest_bytes, src_bytes;
   unsigned int dest_bits;
   
   struct HuffmanTreeCode **codes;
   
   codes = CreateHuffmanTree(src, slen);
   dest_bytes = 0;
   dest_bits = 0;
   for (src_bytes = 0; src_bytes < slen; src_bytes ++)
     {
	if (AppendHuffmanCode(codes[src[src_bytes]], dest, dlen, 
			      &dest_bytes, &dest_bits))
	  {
	     FreeHuffmanCodes(codes);
	     return 0;
	  }
     }
   FreeHuffmanCodes(codes);
   
   *dbits = dest_bits;
   return dest_bytes;
}


int main(void)
{
   char *src = "abcdef";
   char dest[6];
   unsigned long dest_bytes;
   unsigned int extra_bits;
   
   dest_bytes = CompressWithHuffman(src, strlen(src), dest, 6, &extra_bits);
   
   return 0;
}
