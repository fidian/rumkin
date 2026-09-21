import { describe, expect, it } from 'vitest';
import {
    runCipher,
    spacingWarnings,
    visibleSpacing,
} from '@/assets/cipher/cipher-result.ts';
import { defaultAlphabet, parseAlphabetSpec } from '@/assets/cipher/alphabet.ts';

const plain = defaultAlphabet();

describe('spacingWarnings', () => {
    it('says nothing about ordinary text', () => {
        expect(spacingWarnings('HELLO WORLD')).toEqual([]);
    });

    it('notices a leading space on any line', () => {
        expect(spacingWarnings('A\n B')).toContain(
            'Found a leading space in output'
        );
    });

    it('notices a trailing space on any line', () => {
        expect(spacingWarnings('A \nB')).toContain(
            'Found a trailing space in output'
        );
    });

    it('notices a run of spaces', () => {
        expect(spacingWarnings('A  B')).toContain(
            'Two or more consecutive spaces in output'
        );
    });
});

describe('visibleSpacing', () => {
    it('keeps the character count the same', () => {
        const text = '  A  B  ';
        expect(visibleSpacing(text)).toHaveLength(text.length);
    });

    it('leaves single interior spaces alone', () => {
        expect(visibleSpacing('A B')).toBe('A B');
    });
});

describe('runCipher', () => {
    it('reports an unknown cipher rather than failing silently', () => {
        const result = runCipher({
            name: 'nonexistent',
            direction: 'ENCRYPT',
            message: 'HELLO',
            alphabet: plain,
        });
        expect(result.error).toMatch(/nonexistent/);
        expect(result.text).toBe('');
    });

    // The worked examples embedded in the pages, which are the site's own
    // published answers.
    it('reproduces the Wikipedia Caesar example', () => {
        const result = runCipher({
            name: 'caesar',
            direction: 'ENCRYPT',
            message: 'THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG',
            alphabet: plain,
            options: { shift: 23 },
        });
        expect(result.text).toBe('QEB NRFZH YOLTK CLU GRJMP LSBO QEB IXWV ALD');
    });

    it('decrypts Kryptos K1', () => {
        const result = runCipher({
            name: 'vigenère',
            direction: 'DECRYPT',
            message:
                'EMUFPHZLRFAXYUSDJKZLDKRNSHGNFIVJ\nYQTQUXQBQVYUVLLTREVJYQTMKYRDMFD',
            alphabet: parseAlphabetSpec('English alphabetKey:KRYPTOS'),
            options: { key: 'PALIMPSEST', autokey: false },
        });
        expect(result.text.replace(/\n/g, '')).toBe(
            'BETWEENSUBTLESHADINGANDTHEABSENCEOFLIGHTLIESTHENUANCEOFIQLUSION'
        );
    });

    it('decodes the Smithy Code', () => {
        const result = runCipher({
            name: 'vigenère',
            direction: 'ENCRYPT',
            message: 'Jaeiextostgpsacgreamqwfkadpmqzv',
            alphabet: plain,
            options: { key: 'AAYCEHMU', autokey: false },
        });
        expect(result.text).toBe('Jackiefisterwhoareyoudreadnough');
    });

    it('round-trips rot13', () => {
        const encoded = runCipher({
            name: 'rot13',
            direction: 'ENCRYPT',
            message: 'Hello, World!',
            alphabet: plain,
        });
        expect(encoded.text).toBe('Uryyb, Jbeyq!');

        const back = runCipher({
            name: 'rot13',
            direction: 'ENCRYPT',
            message: encoded.text,
            alphabet: plain,
        });
        expect(back.text).toBe('Hello, World!');
    });

    it('carries the spacing warnings through', () => {
        const result = runCipher({
            name: 'caesar',
            direction: 'ENCRYPT',
            message: 'A  B',
            alphabet: plain,
            options: { shift: 1 },
        });
        expect(result.warnings).toContain(
            'Two or more consecutive spaces in output'
        );
    });

    it('uses the keyed alphabet it is given', () => {
        // KRYPTOS keys the alphabet to KRYPTOSABCDEFGHIJLMNQUVWXZ, so a
        // shift of one sends K to R rather than to L.
        const shiftOne = (alphabet: typeof plain) =>
            runCipher({
                name: 'caesar',
                direction: 'ENCRYPT',
                message: 'KEY',
                alphabet,
                options: { shift: 1 },
            }).text;

        expect(shiftOne(parseAlphabetSpec('English alphabetKey:KRYPTOS'))).toBe(
            'RFP'
        );
        expect(shiftOne(plain)).toBe('LFZ');
    });
});
