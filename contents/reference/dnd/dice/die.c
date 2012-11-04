#include <stdio.h>

int roll(int sides) {
	int byte = 0, rangeMax;
	FILE *fp;

	fp = fopen("/dev/urandom", "r");
	rangeMax = 256;
	while (rangeMax >= 256) {
		byte = fread(&byte, 1, 1, fp);
		rangeMax = sides * (1 + (byte / sides));
	}
	fclose(fp);
	return (byte % sides) + 1;
}
