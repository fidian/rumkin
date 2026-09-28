import { describe, expect, it } from 'vitest';
import {
    byName,
    byScore,
    countScores,
    topTen,
} from '@/assets/reference/scoreboard.ts';
import tallies from '@/data/scoreboard-tallies.json';

describe('countScores', () => {
    it('counts each name once', () => {
        expect(countScores(['a', 'b', 'a'])).toEqual([
            { name: 'a', count: 2 },
            { name: 'b', count: 1 },
        ]);
    });

    it('counts nothing for an empty list', () => {
        expect(countScores([])).toEqual([]);
    });

    it('accounts for every tally', () => {
        const total = countScores(tallies as string[]).reduce(
            (sum, score) => sum + score.count,
            0
        );
        expect(total).toBe(tallies.length);
    });
});

describe('byScore', () => {
    it('puts the highest first', () => {
        expect(byScore(countScores(['a', 'b', 'b'])).map((s) => s.name)).toEqual(
            ['b', 'a']
        );
    });
});

describe('byName', () => {
    it('sorts alphabetically without regard to case', () => {
        // A case-sensitive sort would put "Zeta" before "alpha".
        expect(
            byName(countScores(['Zeta', 'alpha', 'Mike'])).map((s) => s.name)
        ).toEqual(['alpha', 'Mike', 'Zeta']);
    });
});

describe('topTen', () => {
    it('takes ten', () => {
        expect(topTen(countScores(tallies as string[]))).toHaveLength(10);
    });

    it('takes them in descending order', () => {
        const counts = topTen(countScores(tallies as string[])).map(
            (s) => s.count
        );
        expect(counts).toEqual([...counts].sort((a, b) => b - a));
    });

    it('takes everything when there are fewer than ten', () => {
        expect(topTen(countScores(['a', 'b']))).toHaveLength(2);
    });
});
