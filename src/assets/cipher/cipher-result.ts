/**
 * Running a cipher and describing the result.
 *
 * Kept free of the DOM: the components below only display what these return.
 */
import rumkinCipher from '@fidian/rumkin-cipher';
import { buildAlphabet, type AlphabetSelection } from './alphabet.ts';

export type Direction = 'ENCRYPT' | 'DECRYPT';

export interface CipherRequest {
    /** Key in rumkinCipher.cipher or rumkinCipher.code, e.g. "caesar". */
    name: string;
    direction: Direction;
    message: string;
    alphabet: AlphabetSelection;
    /**
     * Some transpositions move every character rather than working within
     * an alphabet, and the library wants no alphabet at all for those.
     */
    noAlphabet?: boolean;
    /**
     * A prepared alphabet to use instead of building one from `alphabet`.
     * Bifid and Playfair collapse theirs to a square first.
     */
    squareAlphabet?: unknown;
    options?: Record<string, unknown>;
}

export interface CipherOutcome {
    text: string;
    /** Text with the spacing made visible, for display. */
    display: string;
    warnings: string[];
    error?: string;
}

// Not a space: it keeps runs of spaces from collapsing on screen, so a
// reader can see exactly what the cipher produced.
const NBSP = String.fromCharCode(160);

/**
 * Spacing in cipher text is easy to lose by accident when copying, so it is
 * called out rather than left for the reader to discover.
 *
 * This is for the ciphers, and particularly for a transposition set to move
 * every character: there a space is a character's worth of position, and
 * "attack at dawn" comes out of a four-rail fence as "a wtkaantctda " with a
 * trailing space the reader never typed. Lose it and the message will not
 * decode.
 *
 * The codes are exempt - see runCipher below.
 */
export const spacingWarnings = (text: string): string[] => {
    const warnings: string[] = [];

    if (/^ /m.test(text)) warnings.push('Found a leading space in output');
    if (/ $/m.test(text)) warnings.push('Found a trailing space in output');
    if (/ {2,}/.test(text)) {
        warnings.push('Two or more consecutive spaces in output');
    }

    return warnings;
};

/** Make runs of spaces and edge spaces visible without changing the length. */
export const visibleSpacing = (text: string) =>
    text.replace(/ {2}/g, ` ${NBSP}`).replace(/^ | $/gm, NBSP);

export const runCipher = (request: CipherRequest): CipherOutcome => {
    const { name, direction, message, options } = request;
    const encrypting = direction !== 'DECRYPT';

    const cipher = rumkinCipher.cipher[name as keyof typeof rumkinCipher.cipher];
    const code = rumkinCipher.code[name as keyof typeof rumkinCipher.code];
    const module = cipher ?? code;

    if (!module) {
        return {
            text: '',
            display: '',
            warnings: [],
            error: `No cipher or code named "${name}".`,
        };
    }

    const method = cipher
        ? encrypting
            ? 'encipher'
            : 'decipher'
        : encrypting
          ? 'encode'
          : 'decode';

    try {
        const text = String(
            module[method](
                new rumkinCipher.util.Message(message),
                request.noAlphabet
                    ? null
                    : (request.squareAlphabet ?? buildAlphabet(request.alphabet)),
                options ?? undefined
            )
        );

        return {
            text,
            display: visibleSpacing(text),
            // A code substitutes one thing for another and hands your own
            // spacing back untouched, so the only way it can report a
            // trailing space is if you typed one. Telling you that is not
            // news, and a red box calling it a problem is wrong. Ciphers
            // rearrange text and can genuinely produce spacing you did not
            // write, so they keep the check.
            warnings: cipher ? spacingWarnings(text) : [],
        };
    } catch (e) {
        // A bad key or an alphabet the cipher cannot use ends up here. Say
        // so rather than showing an empty box.
        return {
            text: '',
            display: '',
            warnings: [],
            error: e instanceof Error ? e.message : String(e),
        };
    }
};
