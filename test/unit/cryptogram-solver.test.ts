import { describe, expect, it } from 'vitest';
import {
    currentPlaintext,
    deduce,
    isLetter,
    keyWord,
    keyWordlist,
    makePattern,
    parseWords,
    resetSegments,
    searchAllWords,
    sortWordsForSearch,
} from '@/assets/cipher/cryptogram-solver.ts';

const DICTIONARY = [
    'THIS', 'IS', 'A', 'TEST', 'BANANA', 'REVERE', 'HELLO', 'WORLD',
    'THAT', 'THEM', 'ATTACK', 'DAWN', 'THE', 'AND', 'CAT',
];

const setUp = (cipherText: string, words = DICTIONARY) =>
    parseWords(cipherText, keyWordlist(words));

describe('keyWord', () => {
    it('gives a word its shape', () => {
        expect(keyWord('ABCD').key).toBe('ABCD');
        expect(keyWord('AABB').key).toBe('AABB');
    });

    it('gives two words the same key when their repeats line up', () => {
        // Both are ABCA: first and last letter the same, middle two new.
        expect(keyWord('TEST').key).toBe(keyWord('THAT').key);
    });

    it('gives different keys when the repeats differ', () => {
        expect(keyWord('HELLO').key).not.toBe(keyWord('WORLD').key);
    });

    it('counts the distinct letters', () => {
        expect(keyWord('BANANA').letterCount).toBe(3);
        expect(keyWord('ABCD').letterCount).toBe(4);
    });

    it('handles an empty word', () => {
        expect(keyWord('')).toEqual({ key: '', letterCount: 0 });
    });
});

describe('keyWordlist', () => {
    it('groups words that share a shape', () => {
        const byKey = keyWordlist(['THIS', 'DAWN', 'HELLO']);
        expect(byKey.get(keyWord('THIS').key)).toEqual(['THIS', 'DAWN']);
    });
});

describe('isLetter', () => {
    it('accepts letters and the apostrophe a contraction needs', () => {
        expect(isLetter('A')).toBe(true);
        expect(isLetter("'")).toBe(true);
    });

    it('rejects spaces and punctuation', () => {
        expect(isLetter(' ')).toBe(false);
        expect(isLetter('.')).toBe(false);
    });
});

describe('parseWords', () => {
    it('splits words from what lies between them', () => {
        const segments = setUp('GSRH RH');
        expect(segments.map((s) => s.chars)).toEqual(['GSRH', ' ', 'RH']);
        expect(segments.map((s) => s.isWord)).toEqual([true, false, true]);
    });

    it('upper-cases before matching, so case does not matter', () => {
        expect(setUp('gsrh')[0].chars).toBe('GSRH');
    });

    it('offers only dictionary words of the same shape', () => {
        // GSRH is ABCD, so it can be THIS or TEST but never BANANA.
        const matches = setUp('GSRH')[0].rawMatches;
        expect(matches).toContain('THIS');
        expect(matches).not.toContain('BANANA');
    });

    it('keeps punctuation as its own segment', () => {
        expect(setUp('GSRH, RH').map((s) => s.chars)).toEqual([
            'GSRH',
            ', ',
            'RH',
        ]);
    });
});

describe('makePattern', () => {
    it('pins a letter that is already decided', () => {
        const pattern = makePattern('AB', new Map([['A', 'T']]));
        expect(pattern.test('TX')).toBe(true);
        expect(pattern.test('XX')).toBe(false);
    });

    it('will not reuse a plain letter already spoken for', () => {
        // A substitution cipher is one-to-one, so B cannot also be T.
        const pattern = makePattern('AB', new Map([['A', 'T']]));
        expect(pattern.test('TT')).toBe(false);
    });

    it('matches anything when nothing is decided', () => {
        expect(makePattern('AB', new Map()).test('XY')).toBe(true);
    });

    it('is not confused by a regex metacharacter in the mapping', () => {
        const pattern = makePattern('AB', new Map([['A', '^']]));
        expect(() => pattern.test('^X')).not.toThrow();
    });
});

describe('deduce', () => {
    it('settles a word that has only one candidate, then uses its letters', () => {
        expect(keyWord('CAT').key).toBe('ABC');
        const segments = setUp('XYZ', ['CAT']);
        const { letterMap, solved } = deduce(segments);
        expect(solved).toBe(true);
        expect(segments[0].selectedWord).toBe('CAT');
        expect(letterMap.get('X')).toBe('C');
        expect(letterMap.get('Z')).toBe('T');
    });

    it('reports not solved when a word stays ambiguous', () => {
        // THIS and DAWN are both ABCD, so one cipher word cannot choose.
        const segments = setUp('XYZW', ['THIS', 'DAWN']);
        expect(deduce(segments).solved).toBe(false);
    });

    it('solves a whole message when the letters chain together', () => {
        const segments = setUp('GSRH RH Z GVHG', DICTIONARY);
        const { letterMap, solved } = deduce(segments);
        expect(solved).toBe(true);
        expect(currentPlaintext(segments, letterMap)).toBe('THIS IS A TEST');
    });
});

describe('resetSegments', () => {
    it('puts every candidate back', () => {
        const segments = setUp('GSRH RH Z GVHG');
        deduce(segments);
        resetSegments(segments);
        expect(segments[0].selectedWord).toBe('');
        expect(segments[0].availableMatches).toEqual(segments[0].rawMatches);
    });
});

describe('sortWordsForSearch', () => {
    it('leaves out the punctuation', () => {
        expect(sortWordsForSearch(setUp('AB, CD')).every((s) => s.isWord)).toBe(
            true
        );
    });

    it('puts the most constrained word last, where the search starts', () => {
        const segments = setUp('Z GSRH');
        const order = sortWordsForSearch(segments);
        expect(order[order.length - 1].chars).toBe('GSRH');
    });
});

describe('searchAllWords', () => {
    it('drops candidates that cannot be part of any full reading', () => {
        const segments = setUp('GSRH RH Z GVHG');
        const before = segments[0].availableMatches.length;
        const outcome = searchAllWords(segments);
        expect(outcome.wordsTested).toBe(4);
        expect(segments[0].availableMatches.length).toBeLessThanOrEqual(before);
        expect(segments[0].availableMatches).toContain('THIS');
    });

    it('says so when the dictionary cannot decode the message', () => {
        // No word in this dictionary has the shape of the cipher word.
        const segments = setUp('XYZZY', ['CAT', 'THE']);
        expect(searchAllWords(segments).hopeless).toBe(true);
    });

    it('copes with a message that has no words in it', () => {
        expect(searchAllWords(setUp('... ---')).wordsTested).toBe(0);
    });
});

describe('currentPlaintext', () => {
    it('lower-cases the letters still undecided', () => {
        const segments = setUp('GSRH RH');
        expect(currentPlaintext(segments, new Map())).toBe('gsrh rh');
    });

    it('keeps the punctuation exactly as it was', () => {
        const segments = setUp('GS-RH!');
        expect(currentPlaintext(segments, new Map())).toBe('gs-rh!');
    });
});

describe('deduce with a word the reader picked', () => {
    it('fixes that word\'s letters even though it is already settled', () => {
        // The bug this guards: narrowing only queues a word it settled
        // itself, so a word chosen by hand had its letters silently ignored
        // and nothing else in the message ever updated.
        const segments = setUp('XYZW ZW', ['THIS', 'DAWN', 'IS', 'AT']);
        const word = segments[0];
        word.selectedWord = 'THIS';
        word.availableMatches = ['THIS'];

        const { letterMap } = deduce(segments, new Map(), [
            [word.chars, 'THIS'],
        ]);

        expect(letterMap.get('X')).toBe('T');
        expect(letterMap.get('W')).toBe('S');
        expect(currentPlaintext(segments, letterMap)).toBe('THIS IS');
    });
});
