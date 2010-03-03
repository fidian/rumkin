#include <stdio.h>
#include <stdlib.h>

void showRolls(int dice, int *rolls) {
	int i;

	for (i = 0; i < dice; i ++) {
		if (i) {
			printf(", ");
		}
		printf("%d", rolls[i]);
	}

	printf("\n");
}

int main(int argc, char **argv) {
	unsigned long long *tallies;
	int *rolls;
	int sides, dice, i, duplicates, tally, maxRoll, maxTallies;

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
	maxTallies = sides + (2 * dice) - 1;

	tallies = (unsigned long long *) malloc(sizeof(unsigned long long) * maxTallies);
	rolls = (int *) malloc(sizeof(int) * (dice));

	for (i = 0; i < dice; i ++) {
		rolls[i] = 1;
	}

	for (i = 0; i < maxTallies; i ++) {
		tallies[i] = 0;
	}

	while (rolls[dice - 1] <= sides) {
		// Mark the tally
		duplicates = 0;
		maxRoll = 0;
		for (i = 0; i < dice; i ++) {
			if (rolls[i] == maxRoll) {
				duplicates ++;
			} else if (rolls[i] > maxRoll) {
				maxRoll = rolls[i];
				duplicates = 0;
			}
		}

		// Yeah, tallies[0] will never increment
		tally = maxRoll + (duplicates * 2);
		tallies[tally] ++;

		// Increment
		i = 0;
		rolls[i] ++;
		while (rolls[i] > sides && i < dice - 1) {
			rolls[i] = 1;
			rolls[i + 1] ++;
			i ++;
		}
	}

	for (i = 1; i < maxTallies; i ++) {
		printf("%2d: %llu\n", i, tallies[i]);
	}
}
