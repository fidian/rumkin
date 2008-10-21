#include <stdio.h>
#include <string.h>

int main(void)
{
   char last[30];
   char next[30];
   int len;
   
   next[0] = '\0';

   strcpy(last, next);
   fgets(next, 30, stdin);
   while (! feof(stdin))
     {
	len = strlen(next);
	if (len > 0)
	  {
	     len --;
	     if (next[len] == '\n')
	       next[len] = '\0';
	  }
	len = 0;
	while (last[len] == next[len] && next[len])
	  len ++;
	printf("%c%s", 'A' + len, next + len);
	strcpy(last, next);
	fgets(next, 30, stdin);
     }
   return 0;
}

	
