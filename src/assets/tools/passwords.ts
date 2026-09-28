/**
 * Generating passwords and passphrases.
 *
 * Randomness comes from random.ts, which uses the browser's cryptographic
 * source rather than Math.random. Everything here is pure apart from that,
 * and the randomness is injectable so the tests are not a coin toss.
 */
import { randomIndex } from './random.ts';

export const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
export const DIGITS = '0123456789';
export const SYMBOLS = '`~!@#$%^&*()-_=+[{]}\\|;:\'",<.>/?';

export interface CharacterSetOptions {
    uppercase?: boolean;
    lowercase?: boolean;
    numbers?: boolean;
    symbols?: boolean;
    /** Anything else the reader typed in. */
    other?: string;
}

/**
 * The alphabet to draw from: the chosen groups plus anything typed, with
 * duplicates removed and sorted so the same options always give the same
 * set - which is what makes the strength estimate reproducible.
 */
export const makeCharacterSet = (options: CharacterSetOptions) => {
    const set = new Set<string>();
    const add = (characters: string) => {
        for (const character of characters) set.add(character);
    };

    add(options.other ?? '');
    if (options.uppercase) add(UPPERCASE);
    if (options.lowercase) add(LOWERCASE);
    if (options.numbers) add(DIGITS);
    if (options.symbols) add(SYMBOLS);

    return [...set].sort().join('');
};

/** A password of `length` characters drawn evenly from `characters`. */
export const generatePassword = (
    length: number,
    characters: string,
    pick: (max: number) => number = randomIndex
) => {
    if (!characters.length || length <= 0) return '';

    let password = '';
    while (password.length < length) {
        password += characters[pick(characters.length)];
    }

    return password;
};

/** How many bits of entropy a password of this shape carries. */
export const entropyBits = (length: number, alphabetSize: number) =>
    alphabetSize > 1 ? length * Math.log2(alphabetSize) : 0;

/** A passphrase of `count` words drawn evenly from a word list. */
export const generatePassphrase = (
    count: number,
    words: readonly string[],
    separator = ' ',
    pick: (max: number) => number = randomIndex
) => {
    if (!words.length || count <= 0) return '';

    return Array.from({ length: count }, () => words[pick(words.length)]).join(
        separator
    );
};

/** Parse a diceware word list file: one word per line, blanks skipped. */
export const parseWordlist = (text: string) =>
    text
        .replace(/\r/g, '\n')
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);

export interface Preset {
    label: string;
    length: number;
    options: CharacterSetOptions;
}

export const PRESETS: Preset[] = [
    {
        label: 'Reasonable Password',
        length: 24,
        options: { uppercase: true, lowercase: true, numbers: true },
    },
    {
        label: 'Strong Password',
        length: 32,
        options: {
            uppercase: true,
            lowercase: true,
            numbers: true,
            symbols: true,
        },
    },
    {
        label: 'Overkill',
        length: 64,
        options: {
            uppercase: true,
            lowercase: true,
            numbers: true,
            symbols: true,
        },
    },
    {
        label: 'PIN',
        length: 6,
        options: { numbers: true },
    },
];
