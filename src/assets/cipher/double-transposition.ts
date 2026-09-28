/**
 * The two-pass columnar transpositions: Übchi and double columnar.
 *
 * Both run a columnar transposition twice. Übchi uses the same key for both
 * passes with a padding letter added in between; double columnar uses two
 * different keys. Neither fits runCipher(), which is a single pass.
 *
 * No DOM here.
 */
import rumkinCipher from '@fidian/rumkin-cipher';
import { buildAlphabet, type AlphabetSelection } from './alphabet.ts';
import {
    spacingWarnings,
    visibleSpacing,
    type CipherOutcome,
    type Direction,
} from './cipher-result.ts';

export interface ColumnKeyOptions {
    columnOrder: boolean;
    dupesBackwards: boolean;
}

/** Build the column ordering from a typed key. */
export const columnKeyFor = (
    selection: AlphabetSelection,
    key: string,
    options: ColumnKeyOptions
) =>
    rumkinCipher.util.columnKey(buildAlphabet(selection), key, {
        columnOrder: options.columnOrder,
        dupesBackwards: options.dupesBackwards,
    });

/** "3 1 2" from a parsed key, for showing the reader what it resolved to. */
export const describeColumnKey = (columnKey: number[]) =>
    columnKey.length > 1
        ? `The resulting columnar key: ${columnKey.map((x) => x + 1).join(' ')}`
        : 'Enter numbers or words to generate a column key';

const failure = (message: string): CipherOutcome => ({
    text: '',
    display: '',
    warnings: [],
    error: message,
});

const succeed = (text: string): CipherOutcome => ({
    text,
    display: visibleSpacing(text),
    warnings: spacingWarnings(text),
});

export interface UbchiRequest {
    direction: Direction;
    message: string;
    alphabet: AlphabetSelection;
    columnKey: number[];
    padCharacter: string;
}

/**
 * Übchi: transpose, add a padding letter, transpose again with the same key.
 * Decrypting undoes it, dropping the letter that was added.
 */
export const runUbchi = (request: UbchiRequest): CipherOutcome => {
    if (request.columnKey.length < 2) {
        return failure(
            'You need at least two columns in order to encode anything'
        );
    }

    const cipher = rumkinCipher.cipher.columnarTransposition;
    const alphabet = buildAlphabet(request.alphabet);
    const options = { columnKey: request.columnKey };

    try {
        const message = new rumkinCipher.util.Message(request.message);

        if (request.direction === 'ENCRYPT') {
            const first = cipher.encipher(message, alphabet, options);
            first.append(
                new rumkinCipher.util.MessageChunk(request.padCharacter, [-1])
            );
            return succeed(String(cipher.encipher(first, alphabet, options)));
        }

        const first = cipher.decipher(message, alphabet, options);
        const withoutPad = first.filter(
            (_chunk: unknown, index: number) => index < first.length - 1
        );
        return succeed(String(cipher.decipher(withoutPad, alphabet, options)));
    } catch (e) {
        return failure(e instanceof Error ? e.message : String(e));
    }
};

export interface DoubleColumnarRequest {
    direction: Direction;
    message: string;
    alphabet: AlphabetSelection;
    firstColumnKey: number[];
    secondColumnKey: number[];
}

/**
 * Double columnar: transpose with one key then the other. Decrypting runs
 * the keys in the opposite order.
 */
export const runDoubleColumnar = (
    request: DoubleColumnarRequest
): CipherOutcome => {
    if (
        request.firstColumnKey.length < 2 ||
        request.secondColumnKey.length < 2
    ) {
        return failure(
            'You need at least two columns for each column key in order to encode anything'
        );
    }

    const cipher = rumkinCipher.cipher.columnarTransposition;
    const alphabet = buildAlphabet(request.alphabet);
    const encrypting = request.direction === 'ENCRYPT';
    const method = encrypting ? 'encipher' : 'decipher';
    const [first, second] = encrypting
        ? [request.firstColumnKey, request.secondColumnKey]
        : [request.secondColumnKey, request.firstColumnKey];

    try {
        const message = new rumkinCipher.util.Message(request.message);
        const once = cipher[method](message, alphabet, { columnKey: first });
        return succeed(
            String(cipher[method](once, alphabet, { columnKey: second }))
        );
    } catch (e) {
        return failure(e instanceof Error ? e.message : String(e));
    }
};
