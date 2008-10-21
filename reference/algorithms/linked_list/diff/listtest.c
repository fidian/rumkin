#define MAIN
#include "globals.h"

node *MakeNewNode(int value)
{
   node *newNode;
   
   newNode = calloc(1, sizeof(node));
   if (newNode == NULL)
     {
	printf("Not enough memory!\n");
	exit(-1);
     }
	
   newNode->data = value;
   return newNode;
}

  
void Populate(void)
{
   int i;
   node *newNode;
   
   printf("Populating ...\n");
   i = RAND_MAX ^ (RAND_MAX & 0x1FFF);
   for (i = RAND_MAX; i >= 0; i -= 0x1FFF)
     {
	newNode = MakeNewNode(i);
	insertValue(newNode);
     }
}


void InsertTest(unsigned long imax)
{
   unsigned long i;
   node *newNode;
   
   printf("Inserting ...\n");
   for (i = 0; i < imax; i ++)
     {
	newNode = MakeNewNode(rand());
	insertValue(newNode);
     }
   printf("%lu nodes inserted\n", countNodes());
}


void DeleteTest(unsigned long imax)
{
   unsigned long i;
   unsigned long nodeNum;

   Populate();
   printf("%lu nodes inserted\n", countNodes());
   printf("Random deletes ...\n");
   for (i = 0; i < imax; i ++)
     {
	nodeNum = (unsigned long) ((double) i * 
				   ((double) rand() / (double) RAND_MAX));
	deleteNode(nodeNum);
     }
   printf("%lu nodes left\n", countNodes());
}


int main(int argc, char **argv)
{
   unsigned long imax;
   int t;

   // Purposely seed the random number generator to ensure
   // consistant results
   srand(31415);
   
   if (argc < 3)
     {
	printf("%s <iterations> <test_num>\n", argv[0]);
	return 0;
     }
   
   imax = atol(argv[1]);
   if (imax == 0)
     {
	printf("Iterations must be bigger than 0.\n");
	return 0;
     }
   
   printf("Running %lu iterations\n", imax);

   t = atoi(argv[2]);
   switch (t)
     {
      case 1:
	InsertTest(imax);
	break;
	
      case 2:
	DeleteTest(imax);
	break;
	
      default:
	printf("Unknown test %d.  Use a number betwen 1 and 2.\n", t);
     }
   
   return 0;
}
