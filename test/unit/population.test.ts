import { describe, expect, it } from 'vitest';
import {
    isRegion,
    projectArea,
    splitAreas,
    type RawArea,
} from '@/assets/tools/population.ts';

const area: RawArea = { I: 1, L: 'Testland', P: 1000, B: 100, D: 40, M: 10 };

describe('projectArea', () => {
    it('leaves the snapshot alone at the snapshot date', () => {
        const at = new Date('2020-01-01');
        expect(projectArea(area, at, at).population).toBe(1000);
    });

    it('projects a year of births, deaths and migration', () => {
        const since = new Date('2020-01-01T00:00:00Z');
        const now = new Date(since.getTime() + 365.2425 * 86400000);
        const result = projectArea(area, since, now);

        expect(result.births).toBe(100);
        expect(result.deaths).toBe(40);
        expect(result.migrations).toBe(10);
        expect(result.population).toBe(1000 + 100 - 40 + 10);
    });

    it('grows as time passes', () => {
        const since = new Date('2020-01-01');
        const early = projectArea(area, since, new Date('2021-01-01'));
        const later = projectArea(area, since, new Date('2025-01-01'));
        expect(later.population).toBeGreaterThan(early.population);
    });

    it('counts the days since the snapshot', () => {
        const since = new Date('2020-01-01T00:00:00Z');
        const now = new Date('2020-01-11T00:00:00Z');
        expect(projectArea(area, since, now).days).toBeCloseTo(10, 5);
    });

    it('shrinks a population whose deaths outpace its births', () => {
        const shrinking: RawArea = { ...area, B: 10, D: 100, M: 0 };
        const since = new Date('2020-01-01T00:00:00Z');
        const now = new Date(since.getTime() + 365.2425 * 86400000);
        expect(projectArea(shrinking, since, now).population).toBeLessThan(1000);
    });
});

describe('isRegion', () => {
    it('treats 900 and up as a region', () => {
        expect(isRegion({ ...area, I: 900 })).toBe(true);
        expect(isRegion({ ...area, I: 899 })).toBe(false);
    });
});

describe('splitAreas', () => {
    const data: Record<string, RawArea> = {
        '1': { ...area, I: 1, L: 'zebra' },
        '2': { ...area, I: 2, L: 'Apple' },
        '900': { ...area, I: 900, L: 'World' },
    };

    it('separates countries from regions', () => {
        const { countries, regions } = splitAreas(data);
        expect(countries.map((c) => c.I)).toEqual([2, 1]);
        expect(regions.map((r) => r.I)).toEqual([900]);
    });

    it('sorts by label without regard to case', () => {
        // A case-sensitive sort would put "zebra" before "Apple".
        expect(splitAreas(data).countries.map((c) => c.L)).toEqual([
            'Apple',
            'zebra',
        ]);
    });

    it('applies the nicer names', () => {
        const { regions } = splitAreas(data, { 900: 'The whole world' });
        expect(regions[0].L).toBe('The whole world');
    });

    it('sorts by the renamed label, not the original', () => {
        const { countries } = splitAreas(data, { 1: 'Aardvark' });
        expect(countries.map((c) => c.L)).toEqual(['Aardvark', 'Apple']);
    });
});
