/**
 * The alphabet a cipher page is working in, plus the keying options that
 * shuffle it. Mirrors what rumkin-cipher's Alphabet.keyWord() expects.
 */
import rumkinCipher from '@fidian/rumkin-cipher';

export interface AlphabetSelection {
    /** Name of a constructor in rumkinCipher.alphabet, e.g. "English". */
    name: string;
    /** Word used to shuffle the alphabet; empty means "leave it in order". */
    alphabetKey: string;
    useLastInstance: boolean;
    reverseKey: boolean;
    reverseAlphabet: boolean;
    keyAtEnd: boolean;
}

export const alphabetNames = (): string[] => Object.keys(rumkinCipher.alphabet);

export const defaultAlphabet = (): AlphabetSelection => ({
    name: 'English',
    alphabetKey: '',
    useLastInstance: false,
    reverseKey: false,
    reverseAlphabet: false,
    keyAtEnd: false,
});

/** Build the keyed alphabet object the cipher functions take. */
export const buildAlphabet = (selection: AlphabetSelection) => {
    const Constructor =
        rumkinCipher.alphabet[selection.name as keyof typeof rumkinCipher.alphabet] ??
        rumkinCipher.alphabet.English;

    return new Constructor().keyWord(selection.alphabetKey || '', {
        useLastInstance: selection.useLastInstance,
        reverseKey: selection.reverseKey,
        reverseAlphabet: selection.reverseAlphabet,
        keyAtEnd: selection.keyAtEnd,
    });
};

const BOOLEAN_KEYS = [
    'useLastInstance',
    'reverseKey',
    'reverseAlphabet',
    'keyAtEnd',
] as const;

/**
 * Parse the alphabet spec used by the example buttons embedded in the pages,
 * such as:
 *
 *     English alphabetKey:KRYPTOS useLastInstance:false reverseKey:false
 *
 * Tokens are space separated. A bare token names the alphabet; the rest are
 * key:value pairs. Unknown tokens are ignored so an old example on a page
 * cannot break the component.
 */
export const parseAlphabetSpec = (
    spec: string,
    base: AlphabetSelection = defaultAlphabet()
): AlphabetSelection => {
    const result = { ...base };
    const known = new Set(alphabetNames());

    for (const token of spec.split(' ')) {
        if (!token) continue;

        const at = token.indexOf(':');
        if (at === -1) {
            if (known.has(token)) result.name = token;
            continue;
        }

        const key = token.slice(0, at);
        const value = token.slice(at + 1);

        if (key === 'alphabetKey') {
            result.alphabetKey = value;
        } else if ((BOOLEAN_KEYS as readonly string[]).includes(key)) {
            result[key as (typeof BOOLEAN_KEYS)[number]] = value === 'true';
        }
    }

    return result;
};
