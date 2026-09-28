/**
 * Solving a cryptogram by hand: pick a replacement for each symbol and
 * watch the message appear underneath.
 *
 * The layout - which symbols need a box, and how the text breaks into lines
 * and words - is here, with no DOM in it.
 */

export interface LetterMapping {
    /** The symbol as it appears in the cipher text. */
    from: string;
    /** What the reader thinks it stands for. */
    to: string;
    /** A highlight colour, for grouping guesses while working. */
    colour: string;
}

export const HIGHLIGHTS = [
    { value: '', label: 'None' },
    { value: 'red', label: 'Red' },
    { value: 'orange', label: 'Orange' },
    { value: 'yellow', label: 'Yellow' },
    { value: 'green', label: 'Green' },
    { value: 'blue', label: 'Blue' },
    { value: 'purple', label: 'Purple' },
];

const WHITESPACE = ' \n\r\t\v';

export const isWhitespace = (character: string) =>
    WHITESPACE.includes(character);

/**
 * One entry per distinct non-whitespace symbol, in code point order.
 * Guesses already made are kept when the text is edited, so retyping a
 * letter does not throw away the work.
 */
export const buildMappings = (
    text: string,
    existing: Map<string, LetterMapping> = new Map()
): Map<string, LetterMapping> => {
    const mappings = new Map<string, LetterMapping>();

    for (const character of text) {
        if (mappings.has(character)) continue;
        mappings.set(
            character,
            existing.get(character) ?? {
                from: character,
                to: character,
                colour: '',
            }
        );
    }

    return mappings;
};

/** The symbols that get a box, in code point order. */
export const mappingList = (mappings: Map<string, LetterMapping>) =>
    [...mappings.values()]
        .filter((mapping) => !isWhitespace(mapping.from))
        .sort((a, b) => a.from.charCodeAt(0) - b.from.charCodeAt(0));

/** Apply the reader's guesses to the whole text. */
export const translate = (
    text: string,
    mappings: Map<string, LetterMapping>
) =>
    [...text].map((character) => mappings.get(character)?.to ?? character).join('');

export interface LayoutLetter {
    from: string;
    to: string;
    colour: string;
}

/** The cipher text broken into lines and words, ready to lay out in columns. */
export const layout = (
    text: string,
    mappings: Map<string, LetterMapping>
): LayoutLetter[][][] =>
    text
        .split(/\r\n?|\n|\v/)
        .map((line) =>
            line.split(/[ \t]/).map((word) =>
                [...word].map((character) => {
                    const mapping = mappings.get(character);
                    return {
                        from: character,
                        to: mapping?.to ?? character,
                        colour: mapping?.colour ?? '',
                    };
                })
            )
        );
