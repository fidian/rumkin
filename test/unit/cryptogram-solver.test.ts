import { describe, expect, it } from 'vitest';
import {
    applySearch,
    createListing,
    createSearch,
    currentPlaintext,
    deduce,
    isLetter,
    keyWord,
    keyWordlist,
    listCombinations,
    listingProgress,
    listingSummary,
    makePattern,
    narrowListing,
    parseWords,
    resetSegments,
    searchAllWords,
    sortWordsForSearch,
    stepListing,
    stepSearch,
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
        const { letterMap, candidates, solved } = deduce(segments);
        expect(solved).toBe(true);
        expect(candidates[0]).toEqual(['CAT']);
        expect(letterMap.get('X')).toBe('C');
        expect(letterMap.get('Z')).toBe('T');
    });

    it('does not record a forced word as though the reader had picked it', () => {
        // The bug this guards: a word settled by deduction used to be
        // stored as selected, so nothing short of Reset could undo it.
        const segments = setUp('XYZ', ['CAT']);
        deduce(segments);
        expect(segments[0].selectedWord).toBe('');
        expect(segments[0].availableMatches).toEqual(['CAT']);
    });

    it('offers nothing for the text between words', () => {
        const segments = setUp('XYZ, XYZ', ['CAT']);
        expect(deduce(segments).candidates).toEqual([['CAT'], [], ['CAT']]);
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
    it('puts every candidate back and forgets every pick', () => {
        const segments = setUp('GSRH RH Z GVHG');
        segments[0].selectedWord = 'THIS';
        searchAllWords(segments);
        expect(segments[0].availableMatches).toEqual(['THIS']);

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

// "barter garter": two words of one shape that differ in the first letter,
// so whatever one of them is decides most of the other.
const RHYMES = ['BASHES', 'CASHES', 'DASHES', 'AISLES', 'BISLES'];

const pick = (segments: ReturnType<typeof setUp>, index: number, word: string) => {
    segments[index].selectedWord = word;
};

describe('deduce with a word the reader picked', () => {
    it('fixes that word\'s letters and narrows the rest by them', () => {
        const segments = setUp('XYZW ZW', ['THIS', 'DAWN', 'IS', 'AT']);
        pick(segments, 0, 'THIS');

        const { letterMap, candidates } = deduce(segments);

        expect(letterMap.get('X')).toBe('T');
        expect(letterMap.get('W')).toBe('S');
        expect(candidates[0]).toEqual(['THIS']);
        expect(currentPlaintext(segments, letterMap)).toBe('THIS IS');
    });

    it('narrows the other word to those sharing the picked letters', () => {
        const segments = setUp('BARTER GARTER', RHYMES);
        pick(segments, 0, 'BASHES');

        // AISLES and BISLES do not end ASHES, and B is already spoken for.
        expect(deduce(segments).candidates[2]).toEqual(['CASHES', 'DASHES']);
    });

    it('leaves the dictionary lists alone, so a pick can be changed', () => {
        const segments = setUp('BARTER GARTER', RHYMES);
        pick(segments, 0, 'BASHES');
        deduce(segments);

        expect(segments[0].availableMatches).toEqual(RHYMES);
        expect(segments[2].availableMatches).toEqual(RHYMES);

        pick(segments, 0, 'AISLES');
        expect(deduce(segments).candidates[2]).toEqual(['BISLES']);
    });

    it('offers a picked word its alternatives when it is left out', () => {
        const segments = setUp('BARTER GARTER', RHYMES);
        pick(segments, 0, 'BASHES');

        // As a pick it is one word; left out, it is everything again.
        expect(deduce(segments).candidates[0]).toEqual(['BASHES']);
        expect(deduce(segments, 0).candidates[0]).toEqual(RHYMES);
    });

    it('still holds a left-out word to the other picks', () => {
        const segments = setUp('BARTER GARTER', RHYMES);
        pick(segments, 0, 'BASHES');
        pick(segments, 2, 'CASHES');

        expect(deduce(segments, 0).candidates[0]).toEqual(['BASHES', 'DASHES']);
    });

    it('undoes everything a pick led to once the pick is cleared', () => {
        const segments = setUp('XYZW ZW', ['THIS', 'DAWN', 'IS', 'AT']);
        pick(segments, 0, 'THIS');
        expect(deduce(segments).solved).toBe(true);

        pick(segments, 0, '');
        const { letterMap, candidates, solved } = deduce(segments);
        expect(solved).toBe(false);
        expect(letterMap.size).toBe(0);
        expect(candidates[2]).toEqual(['IS', 'AT']);
    });

    it('lets a forced word narrow others in turn', () => {
        // Picking THIS forces ZW to IS; nothing else here could say that
        // WV must then start with S.
        const segments = setUp('XYZW ZW WV', ['THIS', 'DAWN', 'IS', 'AT', 'SO', 'TO']);
        pick(segments, 0, 'THIS');

        expect(deduce(segments).candidates[4]).toEqual(['SO']);
    });
});

describe('the search under the reader\'s picks', () => {
    it('keeps a picked word and drops what cannot go with it', () => {
        const segments = setUp('BARTER GARTER', RHYMES);
        pick(segments, 0, 'BASHES');

        const outcome = searchAllWords(segments);

        expect(segments[0].availableMatches).toEqual(['BASHES']);
        expect(segments[2].availableMatches).toEqual(['CASHES', 'DASHES']);
        // Counted from the two the reader could see, not the five in the
        // dictionary: nothing visible went away.
        expect(outcome.possibilitiesRemoved).toBe(0);
    });

    it('changes nothing until it is applied', () => {
        // Stopping a search part way has to leave the lists as they were.
        const segments = setUp('XYZW ZW', ['DAWN', 'THIS', 'IS']);
        const state = createSearch(segments);
        while (!stepSearch(state, 1000));

        expect(segments[0].availableMatches).toEqual(['DAWN', 'THIS']);
        applySearch(state);
        expect(segments[0].availableMatches).toEqual(['THIS']);
    });
});

describe('listCombinations', () => {
    const lines = (cipherText: string, words: string[], limit?: number) =>
        listCombinations(setUp(cipherText, words), limit).found;

    it('reads the message every way the dictionary allows', () => {
        expect(lines('XYZW ZW', ['THIS', 'DAWN', 'IS', 'AT'])).toEqual([
            'THIS IS',
        ]);
    });

    it('turns the last word fastest, like an odometer', () => {
        // Independent words, so every pairing works: first option of the
        // first word with each option of the second, then the next.
        expect(lines('AB CD', ['ON', 'IT', 'UP'])).toEqual([
            'ON IT',
            'ON UP',
            'IT ON',
            'IT UP',
            'UP ON',
            'UP IT',
        ]);
    });

    it('takes the options in dictionary order', () => {
        expect(lines('BARTER GARTER', RHYMES)).toEqual([
            'BASHES CASHES',
            'BASHES DASHES',
            'CASHES BASHES',
            'CASHES DASHES',
            'DASHES BASHES',
            'DASHES CASHES',
            'AISLES BISLES',
            'BISLES AISLES',
        ]);
    });

    it('never gives two cipher letters the same plain letter', () => {
        // ON ON would need both A and C to be O.
        expect(lines('AB CD', ['ON', 'IT'])).toEqual(['ON IT', 'IT ON']);
    });

    it('keeps the punctuation in each line', () => {
        expect(lines('XYZW, ZW!', ['THIS', 'IS'])).toEqual(['THIS, IS!']);
    });

    it('keeps to the words the reader picked', () => {
        const segments = setUp('BARTER GARTER', RHYMES);
        pick(segments, 2, 'DASHES');

        expect(listCombinations(segments).found).toEqual([
            'BASHES DASHES',
            'CASHES DASHES',
        ]);
    });

    it('stops at the limit and says there may be more', () => {
        const state = listCombinations(setUp('AB CD', ['ON', 'IT', 'UP']), 4);
        expect(state.found).toEqual(['ON IT', 'ON UP', 'IT ON', 'IT UP']);
        expect(state.capped).toBe(true);
        expect(listingSummary(state)).toContain('Stopped at 4 combinations');
    });

    it('does not call a complete list cut short', () => {
        const state = listCombinations(setUp('AB CD', ['ON', 'IT']));
        expect(state.capped).toBe(false);
        expect(listingSummary(state)).toBe('Found 2 combinations.');
    });

    it('backs out of a first word that leads nowhere', () => {
        // DAWN fits XYZW, but then nothing fits ZW.
        expect(lines('XYZW ZW', ['DAWN', 'THIS', 'IS'])).toEqual(['THIS IS']);
    });

    it('chooses a repeated cipher word once', () => {
        expect(lines('AB AB', ['ON', 'IT'])).toEqual(['ON ON', 'IT IT']);
    });

    it('leaves a word nothing fits part decoded rather than giving up', () => {
        // No five letter word here, but its letters still follow the rest.
        const state = listCombinations(setUp('XYZW WZYXQ', ['THIS', 'DAWN']));
        expect(state.found).toEqual(['THIS SIHTq', 'DAWN NWADq']);
        expect(state.unmatched).toBe(1);
        expect(listingSummary(state)).toBe(
            'Found 2 combinations. 1 word has no match in this dictionary and is left partly decoded.'
        );
    });

    it('says so when nothing fits together', () => {
        // Each word has options, but no option for one suits any for the other.
        const state = listCombinations(
            setUp('XYZW ZW', ['DAWN', 'DUSK', 'IS', 'AT'])
        );
        expect(state.found).toEqual([]);
        expect(state.unmatched).toBe(0);
        expect(listingSummary(state)).toContain('No combination');
    });

    it('copes with a message that has no words in it', () => {
        expect(lines('... ---', DICTIONARY)).toEqual([]);
    });

    it('can be run a slice at a time and reports where it is', () => {
        const state = createListing(setUp('AB CD', ['ON', 'IT', 'UP']));
        expect(listingProgress(state)).toBe('[0/3]');
        // A budget of nothing does no work at all.
        expect(stepListing(state, 0)).toBe(false);
        expect(state.found).toEqual([]);

        while (!stepListing(state, 1000));
        expect(state.found).toHaveLength(6);
    });

    it('lists the same readings when the search catches up part way', () => {
        // PARKER has the shape of the rest but nothing to pair with, so the
        // search drops it and the lists the listing restarts from differ.
        const words = [...RHYMES, 'PARKER'];
        const whole = lines('BARTER GARTER', words);
        expect(whole).toHaveLength(8);

        // Three found with the search held back, as on a slow message...
        const segments = setUp('BARTER GARTER', words);
        const state = createListing(segments, 3);
        state.search = null;
        while (!stepListing(state, 1000));
        expect(state.found).toEqual(whole.slice(0, 3));

        // ...then it finishes, and the listing carries on from the fourth.
        const search = createSearch(segments);
        while (!stepSearch(search, 1000));
        narrowListing(state, search);
        expect(state.stack[0].lists[0]).not.toContain('PARKER');

        Object.assign(state, { limit: 100, done: false, capped: false });
        while (!stepListing(state, 1000));
        expect(state.found).toEqual(whole);
    });

    it('finds nothing to list when the search finds nothing', () => {
        const segments = setUp('XYZW ZW', ['DAWN', 'DUSK', 'IS', 'AT']);
        const state = createListing(segments);
        const search = createSearch(segments);
        while (!stepSearch(search, 1000));
        narrowListing(state, search);

        while (!stepListing(state, 1000));
        expect(state.found).toEqual([]);
    });

    it('counts one combination in the singular', () => {
        const state = listCombinations(setUp('XYZW ZW', ['THIS', 'IS']));
        expect(listingSummary(state)).toBe('Found 1 combination.');
        expect(listingSummary(state, true)).toBe('Stopped after 1 combination.');
    });
});
