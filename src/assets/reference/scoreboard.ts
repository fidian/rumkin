/**
 * Counting the tallies for the scoreboard. No DOM here.
 */

export interface Score {
    name: string;
    count: number;
}

/** One entry per person, counting how many times they appear. */
export const countScores = (tallies: readonly string[]): Score[] => {
    const byName = new Map<string, Score>();

    for (const name of tallies) {
        const existing = byName.get(name);
        if (existing) existing.count += 1;
        else byName.set(name, { name, count: 1 });
    }

    return [...byName.values()];
};

/** Highest score first. Ties keep the order they were counted in. */
export const byScore = (scores: Score[]) =>
    [...scores].sort((a, b) => b.count - a.count);

/** Alphabetical, ignoring case, which is how people look themselves up. */
export const byName = (scores: Score[]) =>
    [...scores].sort((a, b) =>
        a.name.toUpperCase().localeCompare(b.name.toUpperCase())
    );

export const topTen = (scores: Score[]) => byScore(scores).slice(0, 10);
