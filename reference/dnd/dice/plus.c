#include <stdio.h>
#include <stdlib.h>

int main(int argc, char **argv) {
	unsigned long long *tallies;
	int *rolls;
	int sides, dice, i, tally, max;

	if (argc < 3) {
		printf("Specify number of sides and dice\n");
		return 0;
	}

	sides = atoi(argv[1]);
	dice = atoi(argv[2]);

	if (sides < 1 || dice < 1) {
		printf("Need positive numbers for sides and dice\n");
		return 0;
	}

	printf("Sides %d, dice %d\n", sides, dice);

	tallies = (unsigned long long *) malloc(sizeof(unsigned long long) * (sides + dice));
	rolls = (int *) malloc(sizeof(int) * (dice));

	for (i = 0; i < dice; i ++) {
		rolls[i] = 1;
	}

	for (i = 0; i < sides + dice; i ++) {
		tallies[i] = 0;
	}

	while (rolls[dice - 1] <= sides) {
		// Mark the tally
		tally = 1;
		max = 0;
		for (i = 0; i < dice; i ++) {
			if (rolls[i] == max) {
				tally ++;
			} else if (rolls[i] > max) {
				max = rolls[i];
				tally = 1;
			}
		}

		// Yeah, tallies[0] will never increment
		tallies[max + tally - 1] ++;

		// Increment
		i = 0;
		rolls[i] ++;
		while (rolls[i] > sides && i < dice - 1) {
			rolls[i] = 1;
			rolls[i + 1] ++;
			i ++;
		}
	}

	for (i = 1; i < sides + dice; i ++) {
		printf("%2d: %llu\n", i, tallies[i]);
	}
}
