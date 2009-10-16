#include <math.h>
#include <stdio.h>

int main(int argc, char **argv) {
	int dice, i, max;
	unsigned long long try, tryMax, builder, sum = 0;
	unsigned long long tallies[10];
	int rolls[10];

	if (argc < 2) {
		printf("Specify number of dice, up through 10 dice\n");
		return 0;
	}

	dice = atoi(argv[1]);

	if (dice < 1 || dice > 10) {
		printf("Specify any number of dice, from 1 through 10.\n");
		return 0;
	}

	tryMax = 1;

	for (i = 0; i < dice; i ++) {
		tryMax *= 10;
	}

	for (i = 0; i < 10; i ++) {
		tallies[i] = 0;
	}

	for (try = 0; try < tryMax; try ++) {
		builder = try;
		for (i = 0; i < dice; i ++) {
			rolls[i] = builder % (unsigned long long) 10;
			builder /= (unsigned long long) 10;
		}
		max = 0;
		for (i = 0; i < dice; i ++) {
			if (max < rolls[i]) {
				max = rolls[i];
			}
		}
		tallies[max] ++;
		sum += (unsigned long long) (max + 1);
	}

	printf("%llu\n", sum);
	
	for (i = 0; i < 10; i ++) {
		printf("    %d: %llu\n", i + 1, tallies[i]);
	}
}
