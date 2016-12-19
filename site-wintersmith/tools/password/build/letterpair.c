#include <stdio.h>
#include <string.h>

#define ALPHABET 27

#define ENCODECHARS 95

//#define DOTHREE

#define DEBUG

int main(void)
{
   unsigned char a, b;
#ifdef DOTHREE
   unsigned char c;
   unsigned int table[ALPHABET][ALPHABET][ALPHABET];
   unsigned int total[ALPHABET][ALPHABET];
#else
   unsigned int table[ALPHABET][ALPHABET];
   unsigned int total[ALPHABET];
#endif
   unsigned int i;
   double chance, chance2;
   char temp[4];
   
   temp[1] = 0;
   a = 0;

   for (a = 0; a < ALPHABET; a ++)
     {
#ifdef DOTHREE
	for (b = 0; b < ALPHABET; b ++)
	  {
	     total[a][b] = 0;
	     for (c = 0; c < ALPHABET; c ++)
	       {
		  table[a][b][c] = 0;
	       }
	  }
#else
	total[a] = 0;
	for (b = 0; b < ALPHABET; b ++)
	  {
	     table[a][b] = 0;
	  }
#endif
     }
	
#ifdef DOTHREE   
   b = c = 0;
#else
   b = 0;
#endif
   
   while (!feof(stdin))
     {
	a = b;
#ifdef DOTHREE
	b = c;
	c = fgetc(stdin);
	if (c >= 'A' && c <= 'Z')
	  c -= 'A' - 'a';
	if (c < 'a' || c > 'z')
	  c = 0;
	else
	  c -= 'a' - 1;
	table[a][b][c] ++;
	total[a][b] ++;
#else
	b = fgetc(stdin);
	if (b >= 'A' && b <= 'Z')
	  b -= 'A' - 'a';
	if (b < 'a' || b > 'z')
	  b = 0;
	else
	  b -= 'a' - 1;
	table[a][b] ++;
	total[a] ++;
#endif
     }

   temp[3] = 0;
   for (a = 0; a < ALPHABET; a ++)
     {	
	for (b = 0; b < ALPHABET; b ++)
	  {
#ifdef DOTHREE
	     for (c = 0; c < ALPHABET; c ++)
	       {
		  chance = table[a][b][c];
		  chance /= (double) total[a][b];
#else	     
		  chance = table[a][b];
		  chance /= (double) total[a];
#endif

		  chance2 = chance;
		  for (i = 0; i < 3; i ++)
		    {
		       chance2 *= ENCODECHARS;
		       temp[2 - i] = ' ' + (int) chance2;
		       chance2 -= (int) chance2;
		    }
		 
#ifndef DEBUG
		  for (i = 0; i < 3; i ++)
		    {
		       if (temp[i] == '"' || temp[i] == '\\')
			 {
			    fputc('\\', stdout);
			 }
		       fputc(temp[i], stdout);
		    }
#else
		  chance2 = 0;
		  for (i = 0; i < 3; i ++)
		    {
		       chance2 += temp[i] - ' ';
		       chance2 /= ENCODECHARS;
		    }
#ifdef DOTHREE
		  printf("%c%c%c %s %f %f\n",
			 a ? a + 'a' - 1 : ' ',
			 b ? b + 'a' - 1 : ' ',
			 c ? c + 'a' - 1 : ' ',
			 temp, chance, chance2);
#else
		  printf("%c%c %s %f %f\n",
			 a ? a + 'a' - 1 : ' ',
			 b ? b + 'a' - 1 : ' ',
			 temp, chance, chance2);
#endif
#endif
#ifdef DOTHREE
	       }
#endif
	  }
     }
   
   return 0;
}
