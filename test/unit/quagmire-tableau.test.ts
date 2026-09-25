import { describe, expect, it } from 'vitest';
import { buildTableau } from '@/assets/cipher/quagmire-tableau.ts';

describe('buildTableau', () => {
    // The ACA's own Quagmire I sheet prints this table, so it is the fixture.
    // https://www.cryptogram.org/downloads/aca.info/ciphers/QuagmireI.pdf
    const acaQuagmireOne = buildTableau({
        align: 'A',
        cipherKey: '',
        key: 'FLOWER',
        plainKey: 'SPRINGFEVER',
    });

    it('heads the table with the keyed plaintext alphabet', () => {
        expect(acaQuagmireOne.header).toBe('SPRINGFEVABCDHJKLMOQTUWXYZ');
    });

    it('draws one row per letter of the indicator key', () => {
        expect(acaQuagmireOne.rows.map((row) => row.label).join('')).toBe(
            'FLOWER'
        );
    });

    it('rotates each row the way the ACA prints it', () => {
        expect(acaQuagmireOne.rows.map((row) => row.letters)).toEqual([
            'WXYZABCDEFGHIJKLMNOPQRSTUV',
            'CDEFGHIJKLMNOPQRSTUVWXYZAB',
            'FGHIJKLMNOPQRSTUVWXYZABCDE',
            'NOPQRSTUVWXYZABCDEFGHIJKLM',
            'VWXYZABCDEFGHIJKLMNOPQRSTU',
            'IJKLMNOPQRSTUVWXYZABCDEFGH',
        ]);
    });

    it('puts each indicator letter under the alignment letter', () => {
        for (const row of acaQuagmireOne.rows) {
            expect(row.letters.charAt(row.markAt)).toBe(row.label);
        }

        expect(acaQuagmireOne.header.charAt(acaQuagmireOne.alignAt)).toBe('A');
    });

    // Quagmire IV keys both alphabets and aligns under a letter that is not A,
    // which is where an off-by-one in the rotation would show up.
    it('handles two keys and an alignment away from the start', () => {
        const tableau = buildTableau({
            align: 'S',
            cipherKey: 'PERCEPTION',
            key: 'EXTRA',
            plainKey: 'SENSORY',
        });

        expect(tableau.header).toBe('SENORYABCDFGHIJKLMPQTUVWXZ');
        expect(tableau.alignAt).toBe(0);
        expect(tableau.rows[0].letters).toBe('ERCTIONABDFGHJKLMQSUVWXYZP');
        expect(tableau.rows.map((row) => row.label).join('')).toBe('EXTRA');
    });

    // An empty indicator key has no period, so there is nothing to draw rows
    // from. Showing the whole tableau is more use than showing nothing.
    it('shows every row when there is no indicator key', () => {
        const tableau = buildTableau({
            align: 'A',
            cipherKey: '',
            key: '',
            plainKey: '',
        });

        expect(tableau.rows).toHaveLength(26);
        expect(tableau.rows[0].letters).toBe('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    });
});
