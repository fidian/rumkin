/**
 * Baconian: the hidden message is carried by which letters of an innocent
 * cover text are styled, not by the cover text itself.
 *
 * No DOM here. baconian-cipher.ts renders the runs this returns.
 */
import rumkinCipher from '@fidian/rumkin-cipher';
import { buildAlphabet, type AlphabetSelection } from './alphabet.ts';

/** A stretch of the cover text, either plain or styled. */
export interface Run {
    styled: boolean;
    text: string;
}

export interface Embedding {
    runs: Run[];
    /** False when the cover text ran out before the code did. */
    fits: boolean;
}

/**
 * Bacon's original alphabet gives I/J and U/V the same code, because the
 * distinction did not exist yet. "Distinct" gives every letter its own.
 */
export const baconianAlphabet = (
    selection: AlphabetSelection,
    condensed: boolean
) => {
    const alphabet = buildAlphabet(selection);
    return condensed ? alphabet.collapse('J', 'I').collapse('V', 'U') : alphabet;
};

/** Swap the two symbols, whichever notation the reader pasted in. */
export const swapAB = (text: string) =>
    text.replace(/[01AaBb]/g, (match) => {
        const swaps: Record<string, string> = {
            '0': '1',
            '1': '0',
            A: 'B',
            B: 'A',
            a: 'b',
            b: 'a',
        };
        return swaps[match] ?? match;
    });

/** Reduce any notation to a run of plain "a" and "b". */
export const normalizeCode = (code: string) =>
    code
        .replace(/[0A]/g, 'a')
        .replace(/[1B]/g, 'b')
        .replace(/[^ab]/g, '');

/**
 * Work out which stretches of `coverText` carry a "b" and so have to be
 * styled. Only letters carry the code; spaces and punctuation are passed
 * over, which is what makes the result read naturally.
 */
export const embed = (
    selection: AlphabetSelection,
    rawCode: string,
    coverText: string
): Embedding => {
    const alphabet = buildAlphabet(selection);
    const code = normalizeCode(rawCode);
    const letterIndexes = alphabet.findLetterIndexes(coverText) as number[];

    let consumed = 0;
    const runs: Run[] = [];

    Object.entries(letterIndexes).forEach(([position, letterIndex]) => {
        // -1 means "not a letter of this alphabet", so it carries nothing.
        let styled = false;
        if (letterIndex >= 0) {
            styled = code.charAt(consumed) === 'b';
            consumed += 1;
        }

        const character = coverText.charAt(Number(position));
        const last = runs[runs.length - 1];

        if (last && last.styled === styled) {
            last.text += character;
        } else {
            runs.push({ styled, text: character });
        }
    });

    return { runs, fits: consumed >= code.length };
};

/** Encode a message to its baconian letters. */
export const encodeBaconian = (
    selection: AlphabetSelection,
    condensed: boolean,
    message: string
) =>
    String(
        rumkinCipher.code.baconian.encode(
            new rumkinCipher.util.Message(message),
            baconianAlphabet(selection, condensed)
        )
    );
