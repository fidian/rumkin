import { describe, expect, it } from 'vitest';
import {
    lower,
    makeGroups,
    removeLetters,
    removeNumbers,
    removeOther,
    removeWhitespace,
    reverse,
    swapCase,
    toNaturalCase,
    toTitleCase,
    upper,
} from '@/assets/cipher/text-transforms.ts';

describe('case conversion', () => {
    it('lowercases and uppercases ASCII', () => {
        expect(lower('Hello World')).toBe('hello world');
        expect(upper('Hello World')).toBe('HELLO WORLD');
    });

    it('keeps the German sharp s a single character', () => {
        // "ß".toUpperCase() is "SS", which would lengthen the message and so
        // change the cipher text. Capital sharp s keeps the length.
        expect(upper('straße')).toBe('STRAẞE');
        expect(upper('straße')).toHaveLength('straße'.length);
        expect(lower('STRAẞE')).toBe('straße');
    });

    it('round-trips accented letters', () => {
        expect(upper('café')).toBe('CAFÉ');
        expect(lower('CAFÉ')).toBe('café');
    });
});

describe('removal', () => {
    const sample = 'Hello, World 42!';

    it('removes letters', () => {
        expect(removeLetters(sample)).toBe(',  42!');
    });

    it('removes numbers', () => {
        expect(removeNumbers(sample)).toBe('Hello, World !');
    });

    it('removes whitespace, including newlines and tabs', () => {
        expect(removeWhitespace('a b\tc\nd')).toBe('abcd');
    });

    it('removes punctuation but keeps letters, digits and spaces', () => {
        expect(removeOther(sample)).toBe('Hello World 42');
    });

    it('treats accented letters as letters', () => {
        expect(removeLetters('café!')).toBe('!');
        expect(removeOther('café!')).toBe('café');
    });
});

describe('toNaturalCase', () => {
    it('capitalizes the start of each sentence', () => {
        expect(toNaturalCase('hello world. how are you? fine! ok')).toBe(
            'Hello world. How are you? Fine! Ok'
        );
    });

    it('capitalizes after a newline', () => {
        expect(toNaturalCase('one\ntwo')).toBe('One\nTwo');
    });

    it('lowercases text that was shouting', () => {
        expect(toNaturalCase('HELLO WORLD')).toBe('Hello world');
    });
});

describe('toTitleCase', () => {
    it('capitalizes every word', () => {
        expect(toTitleCase('the quick brown fox')).toBe('The Quick Brown Fox');
    });

    it('lowercases the rest of each word', () => {
        expect(toTitleCase('THE QUICK BROWN FOX')).toBe('The Quick Brown Fox');
    });
});

describe('swapCase', () => {
    it('swaps each letter', () => {
        expect(swapCase('Hello World')).toBe('hELLO wORLD');
    });

    it('leaves digits and punctuation alone', () => {
        expect(swapCase('a1B2!')).toBe('A1b2!');
    });

    it('is its own inverse', () => {
        expect(swapCase(swapCase('MiXeD cAsE 42'))).toBe('MiXeD cAsE 42');
    });
});

describe('reverse', () => {
    it('reverses the characters', () => {
        expect(reverse('abcdef')).toBe('fedcba');
    });

    it('does not split an astral character in half', () => {
        // Reversing by UTF-16 code unit would produce broken surrogates here.
        expect(reverse('a\u{1F600}b')).toBe('b\u{1F600}a');
    });
});

describe('makeGroups', () => {
    const text = 'THEQUICKBROWNFOXJUMPSOVERTHELAZYDOG'; // 35 letters

    it('splits into groups of five, ten groups to a line', () => {
        expect(makeGroups(text, 5, 10)).toBe(
            'THEQU ICKBR OWNFO XJUMP SOVER THELA ZYDOG'
        );
    });

    it('wraps to a new line after the given number of groups', () => {
        expect(makeGroups(text, 5, 3)).toBe(
            'THEQU ICKBR OWNFO\nXJUMP SOVER THELA\nZYDOG'
        );
    });

    it('discards the whitespace that was already there', () => {
        expect(makeGroups('AB CD\nEF', 2, 2)).toBe('AB CD\nEF');
    });

    it('leaves a short final group short', () => {
        expect(makeGroups('ABCDEFG', 3, 10)).toBe('ABC DEF G');
    });

    it('returns one unbroken run when the group size is below 1', () => {
        expect(makeGroups(text, 0, 10)).toBe(text);
        expect(makeGroups(text, -1, 10)).toBe(text);
    });

    it('puts every group on one line when the split is below 1', () => {
        expect(makeGroups('ABCDEF', 2, -1)).toBe('AB CD EF');
    });

    it('terminates on a split of exactly 0', () => {
        // The Mithril implementation looped forever here, hanging the tab.
        expect(makeGroups('ABCDEF', 2, 0)).toBe('AB CD EF');
    });

    it('rounds fractional sizes down', () => {
        expect(makeGroups('ABCDEF', 2.9, 10)).toBe('AB CD EF');
    });

    it('handles empty input', () => {
        expect(makeGroups('', 5, 10)).toBe('');
    });

    it('never loses or adds a character', () => {
        for (const [group, split] of [
            [5, 10],
            [3, 4],
            [1, 1],
            [7, 2],
        ]) {
            expect(removeWhitespace(makeGroups(text, group, split))).toBe(text);
        }
    });
});
