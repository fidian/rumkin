/**
 * Bifid and Playfair write the alphabet into a square grid, so the alphabet
 * has to have a square number of letters. English has 26, which is one too
 * many for a 5x5 square, so a pair of letters is merged - traditionally J
 * into I. Spanish has 27, so two merges are needed.
 *
 * No DOM here. The element that shows the merges is square-cipher.ts.
 */
import { buildAlphabet, type AlphabetSelection } from './alphabet.ts';

/** One merge: `from` is written as `to` before the cipher runs. */
export interface Translation {
    from: string;
    to: string;
}

/** How many letters have to be merged away to reach a square. */
export const surplusLetters = (length: number) => {
    const side = Math.floor(Math.sqrt(length));
    return length - side * side;
};

/**
 * The merges to apply by default. J into I whenever both are present,
 * because that is the convention every textbook uses; otherwise the first
 * two letters, which is arbitrary but has to be something.
 */
export const defaultTranslations = (
    selection: AlphabetSelection
): Translation[] => {
    let alphabet = buildAlphabet(selection);
    const translations: Translation[] = [];

    while (surplusLetters(alphabet.length) > 0) {
        const hasI = alphabet.toIndex('I') !== -1;
        const hasJ = alphabet.toIndex('J') !== -1;
        const translation = hasI && hasJ
            ? { from: 'J', to: 'I' }
            : { from: alphabet.toLetter(0), to: alphabet.toLetter(1) };

        translations.push(translation);
        alphabet = alphabet.collapse(translation.from, translation.to);
    }

    return translations;
};

/**
 * Apply the merges. A translation naming a letter that is no longer in the
 * alphabet - because an earlier merge removed it, or because the reader
 * changed the alphabet underneath - is repaired rather than dropped, so the
 * result always reaches a square.
 */
export const collapseAlphabet = (
    selection: AlphabetSelection,
    translations: Translation[]
) => {
    let alphabet = buildAlphabet(selection);
    const applied: Translation[] = [];

    for (const translation of translations) {
        if (surplusLetters(alphabet.length) === 0) break;

        let { from, to } = translation;
        if (alphabet.toIndex(from) === -1) from = alphabet.toLetter(0);
        if (alphabet.toIndex(to) === -1 || to === from) {
            to = alphabet.toLetter(from === alphabet.toLetter(0) ? 1 : 0);
        }

        applied.push({ from, to });
        alphabet = alphabet.collapse(from, to);
    }

    // The reader may have removed merges the alphabet still needs.
    while (surplusLetters(alphabet.length) > 0) {
        const from = alphabet.toLetter(0);
        const to = alphabet.toLetter(1);
        applied.push({ from, to });
        alphabet = alphabet.collapse(from, to);
    }

    return { alphabet, translations: applied };
};

/** The letters of the alphabet, for offering as merge choices. */
export const lettersOf = (selection: AlphabetSelection): string[] => [
    ...String(buildAlphabet(selection).letterOrder.upper),
];
