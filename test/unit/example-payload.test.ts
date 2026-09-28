import { describe, expect, it } from 'vitest';
import {
    applyExamplePayload,
    toCamelCase,
} from '@/assets/cipher/example-payload.ts';
import { defaultAlphabet, parseAlphabetSpec } from '@/assets/cipher/alphabet.ts';

describe('toCamelCase', () => {
    it('converts the attribute names the pages use', () => {
        expect(toCamelCase('cipher-key')).toBe('cipherKey');
        expect(toCamelCase('transposition-operating-mode')).toBe(
            'transpositionOperatingMode'
        );
    });

    it('leaves a single word alone', () => {
        expect(toCamelCase('input')).toBe('input');
    });
});

describe('applyExamplePayload', () => {
    it('coerces to the type each control already holds', () => {
        const target = { input: '', n: 0, autokey: false };
        applyExamplePayload(target, { input: 'HELLO', n: '23', autokey: 'true' });
        expect(target).toEqual({ input: 'HELLO', n: 23, autokey: true });
    });

    it('treats any value other than "true" as false', () => {
        const target = { autokey: true };
        applyExamplePayload(target, { autokey: 'false' });
        expect(target.autokey).toBe(false);
    });

    it('renames dashed attributes to the controller property', () => {
        const target = { cipherKey: '' };
        applyExamplePayload(target, { 'cipher-key': 'ABSCISSA' });
        expect(target.cipherKey).toBe('ABSCISSA');
    });

    it('skips a key the controller does not have', () => {
        const target = { input: '' };
        const applied = applyExamplePayload(target, {
            input: 'HI',
            leftover: 'from an older version of this page',
        });
        expect(applied).toEqual(['input']);
        expect(target).toEqual({ input: 'HI' });
        expect('leftover' in target).toBe(false);
    });

    it('ignores a number that will not parse rather than storing NaN', () => {
        const target = { n: 3 };
        applyExamplePayload(target, { n: 'three' });
        expect(target.n).toBe(3);
    });

    it('reports which keys it applied', () => {
        const target = { input: '', n: 0 };
        expect(applyExamplePayload(target, { n: '5' })).toEqual(['n']);
    });

    it('parses an alphabet spec into the selection object', () => {
        const target = { alphabet: defaultAlphabet() };
        applyExamplePayload(target, {
            alphabet: 'English alphabetKey:KRYPTOS useLastInstance:false',
        });
        expect(target.alphabet.name).toBe('English');
        expect(target.alphabet.alphabetKey).toBe('KRYPTOS');
    });
});

describe('parseAlphabetSpec', () => {
    it('reads the full spec the pages embed', () => {
        expect(
            parseAlphabetSpec(
                'English alphabetKey:KRYPTOS useLastInstance:false reverseKey:true reverseAlphabet:false keyAtEnd:true'
            )
        ).toEqual({
            name: 'English',
            alphabetKey: 'KRYPTOS',
            useLastInstance: false,
            reverseKey: true,
            reverseAlphabet: false,
            keyAtEnd: true,
        });
    });

    it('handles an empty alphabetKey written as "alphabetKey:"', () => {
        // The Caesar and Vigenere pages both write the spec this way.
        const result = parseAlphabetSpec(
            'English alphabetKey: useLastInstance:false reverseKey:false'
        );
        expect(result.alphabetKey).toBe('');
        expect(result.name).toBe('English');
    });

    it('accepts a bare alphabet name', () => {
        expect(parseAlphabetSpec('English').name).toBe('English');
    });

    it('ignores an alphabet that does not exist', () => {
        // Rather than leaving the component with no alphabet at all.
        expect(parseAlphabetSpec('Klingon').name).toBe('English');
    });

    it('ignores unknown options', () => {
        const result = parseAlphabetSpec('English somethingElse:true');
        expect(result).toEqual(defaultAlphabet());
    });

    it('keeps values from the base selection that the spec does not mention', () => {
        const base = { ...defaultAlphabet(), keyAtEnd: true };
        expect(parseAlphabetSpec('English alphabetKey:ABC', base).keyAtEnd).toBe(
            true
        );
    });
});
