/**
 * The Quagmire tableau: the table a solver would draw by hand.
 *
 * The header is the keyed plaintext alphabet. Each row below it is the keyed
 * ciphertext alphabet rotated so that one letter of the indicator key sits
 * under the alignment letter, which is exactly the shift the cipher applies
 * for that position in the key.
 *
 * No DOM here, so the shape of the table can be tested on its own.
 */
import rumkinCipher from '@fidian/rumkin-cipher';

export interface TableauRow {
    /** The indicator key letter this row is for. */
    label: string;
    letters: string;
    /** Where the indicator letter sits, for highlighting it. */
    markAt: number;
}

export interface Tableau {
    header: string;
    rows: TableauRow[];
    /** Column of the alignment letter in the header. */
    alignAt: number;
}

export interface TableauRequest {
    alphabetName?: string;
    plainKey: string;
    cipherKey: string;
    /** The indicator key. Empty shows the whole tableau instead. */
    key: string;
    align: string;
}

const keyed = (name: string, key: string) => {
    const Constructor =
        rumkinCipher.alphabet[name as keyof typeof rumkinCipher.alphabet] ??
        rumkinCipher.alphabet.English;

    return new Constructor().keyWord(key || '', {});
};

/** Rotate a string left, wrapping, so "ABCD" by 1 is "BCDA". */
const rotate = (letters: string, by: number) => {
    const at = ((by % letters.length) + letters.length) % letters.length;

    return letters.slice(at) + letters.slice(0, at);
};

export const buildTableau = (request: TableauRequest): Tableau => {
    const name = request.alphabetName || 'English';
    const plain = String(keyed(name, request.plainKey).letterOrder.upper);
    const cipher = String(keyed(name, request.cipherKey).letterOrder.upper);

    const alignAt = Math.max(plain.indexOf((request.align || '').toUpperCase()), 0);

    // With no indicator key there is no period, so show every row - which is
    // the whole tableau, and is what a reader wants when exploring.
    const indicator =
        request.key.toUpperCase().replace(/[^A-ZÀ-ɏ]/g, '') || cipher;

    const rows: TableauRow[] = [];

    for (const letter of indicator) {
        const at = cipher.indexOf(letter);

        if (at === -1) continue;

        rows.push({
            label: letter,
            letters: rotate(cipher, at - alignAt),
            markAt: alignAt,
        });
    }

    return { alignAt, header: plain, rows };
};
