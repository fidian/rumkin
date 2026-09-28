import { describe, expect, it } from 'vitest';
import {
    buildMappings,
    isWhitespace,
    layout,
    mappingList,
    translate,
} from '@/assets/cipher/cryptogram.ts';

describe('isWhitespace', () => {
    it('covers the separators a pasted cryptogram can contain', () => {
        for (const c of [' ', '\n', '\r', '\t', '\v']) {
            expect(isWhitespace(c)).toBe(true);
        }
        expect(isWhitespace('A')).toBe(false);
    });
});

describe('buildMappings', () => {
    it('has one entry per distinct symbol', () => {
        expect([...buildMappings('AAB').keys()]).toEqual(['A', 'B']);
    });

    it('starts each symbol standing for itself', () => {
        expect(buildMappings('A').get('A')).toEqual({
            from: 'A',
            to: 'A',
            colour: '',
        });
    });

    it('keeps guesses already made when the text is edited', () => {
        // Retyping a letter must not throw away the work done so far.
        const first = buildMappings('ABC');
        first.get('A')!.to = 'X';
        first.get('A')!.colour = 'red';

        const second = buildMappings('ABCD', first);
        expect(second.get('A')!.to).toBe('X');
        expect(second.get('A')!.colour).toBe('red');
        expect(second.get('D')!.to).toBe('D');
    });

    it('drops symbols that are no longer in the text', () => {
        const first = buildMappings('ABC');
        expect([...buildMappings('AB', first).keys()]).toEqual(['A', 'B']);
    });
});

describe('mappingList', () => {
    it('leaves whitespace out, since it needs no guess', () => {
        expect(mappingList(buildMappings('A B\nC')).map((m) => m.from)).toEqual(
            ['A', 'B', 'C']
        );
    });

    it('orders by code point', () => {
        expect(mappingList(buildMappings('bCa')).map((m) => m.from)).toEqual([
            'C',
            'a',
            'b',
        ]);
    });
});

describe('translate', () => {
    it('applies the guesses', () => {
        const mappings = buildMappings('ABC');
        mappings.get('A')!.to = 'X';
        mappings.get('B')!.to = 'Y';
        expect(translate('ABCA', mappings)).toBe('XYCX');
    });

    it('leaves whitespace as it was', () => {
        const mappings = buildMappings('A B');
        mappings.get('A')!.to = 'X';
        expect(translate('A B', mappings)).toBe('X B');
    });
});

describe('layout', () => {
    it('splits into lines, then words, then letters', () => {
        const text = 'AB CD\nEF';
        const result = layout(text, buildMappings(text));
        expect(result).toHaveLength(2);
        expect(result[0]).toHaveLength(2);
        expect(result[0][0].map((l) => l.from).join('')).toBe('AB');
        expect(result[1][0].map((l) => l.from).join('')).toBe('EF');
    });

    it('carries the guess and the highlight through', () => {
        const mappings = buildMappings('AB');
        mappings.get('A')!.to = 'X';
        mappings.get('A')!.colour = 'blue';
        expect(layout('AB', mappings)[0][0][0]).toEqual({
            from: 'A',
            to: 'X',
            colour: 'blue',
        });
    });

    it('treats a tab as a word break, like a space', () => {
        expect(layout('AB\tCD', buildMappings('AB\tCD'))[0]).toHaveLength(2);
    });

    it('handles carriage returns from a pasted Windows file', () => {
        expect(layout('AB\r\nCD', buildMappings('AB\r\nCD'))).toHaveLength(2);
    });
});
