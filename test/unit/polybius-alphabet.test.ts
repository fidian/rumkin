import { describe, expect, it } from 'vitest';
import {
    collapseAlphabet,
    defaultTranslations,
    lettersOf,
    surplusLetters,
} from '@/assets/cipher/polybius-alphabet.ts';
import { defaultAlphabet, parseAlphabetSpec } from '@/assets/cipher/alphabet.ts';

const english = defaultAlphabet();
const spanish = parseAlphabetSpec('Español');

const size = (selection = english, translations = defaultTranslations(selection)) =>
    collapseAlphabet(selection, translations).alphabet.length;

describe('surplusLetters', () => {
    it('is zero for a square', () => {
        expect(surplusLetters(25)).toBe(0);
        expect(surplusLetters(36)).toBe(0);
    });

    it('counts how many are one too many', () => {
        expect(surplusLetters(26)).toBe(1);
        expect(surplusLetters(27)).toBe(2);
    });
});

describe('defaultTranslations', () => {
    it('merges J into I for English, as every textbook does', () => {
        expect(defaultTranslations(english)).toEqual([{ from: 'J', to: 'I' }]);
    });

    it('merges enough letters for an alphabet that needs more than one', () => {
        // Spanish has 27 letters, two more than a 5x5 square.
        expect(defaultTranslations(spanish)).toHaveLength(2);
    });
});

describe('collapseAlphabet', () => {
    it('reaches a square for English', () => {
        expect(size(english)).toBe(25);
    });

    it('reaches a square for Spanish too', () => {
        expect(size(spanish)).toBe(25);
    });

    it('drops the merged letter and keeps the other', () => {
        const { alphabet } = collapseAlphabet(english, [{ from: 'J', to: 'I' }]);
        expect(String(alphabet.letterOrder.upper)).toBe(
            'ABCDEFGHIKLMNOPQRSTUVWXYZ'
        );
    });

    it('honours a merge the reader picked instead of the default', () => {
        const { alphabet } = collapseAlphabet(english, [{ from: 'Z', to: 'A' }]);
        expect(String(alphabet.letterOrder.upper)).toBe(
            'ABCDEFGHIJKLMNOPQRSTUVWXY'
        );
    });

    it('still reaches a square when given no merges at all', () => {
        // Otherwise the cipher would be handed a 26-letter alphabet and fail.
        expect(size(english, [])).toBe(25);
    });

    it('repairs a merge naming a letter that is not in the alphabet', () => {
        const { alphabet, translations } = collapseAlphabet(english, [
            { from: 'Ñ', to: 'N' },
        ]);
        expect(alphabet.length).toBe(25);
        expect(translations[0].from).not.toBe('Ñ');
    });

    it('never merges a letter into itself', () => {
        const { translations } = collapseAlphabet(english, [
            { from: 'A', to: 'A' },
        ]);
        expect(translations[0].from).not.toBe(translations[0].to);
    });

    it('ignores merges beyond what the alphabet needs', () => {
        const { translations } = collapseAlphabet(english, [
            { from: 'J', to: 'I' },
            { from: 'Y', to: 'X' },
            { from: 'W', to: 'V' },
        ]);
        expect(translations).toHaveLength(1);
    });

    it('keys the alphabet before collapsing it', () => {
        const keyed = parseAlphabetSpec('English alphabetKey:KRYPTOS');
        const { alphabet } = collapseAlphabet(keyed, defaultTranslations(keyed));
        expect(String(alphabet.letterOrder.upper).startsWith('KRYPTOS')).toBe(
            true
        );
        expect(alphabet.length).toBe(25);
    });
});

describe('lettersOf', () => {
    it('lists the alphabet in order', () => {
        expect(lettersOf(english).join('')).toBe(
            'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        );
    });

    it('follows the key', () => {
        expect(
            lettersOf(parseAlphabetSpec('English alphabetKey:KRYPTOS')).join('')
        ).toBe('KRYPTOSABCDEFGHIJLMNQUVWXZ');
    });
});
