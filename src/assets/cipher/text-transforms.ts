/**
 * The text tidying actions offered above every cipher's input box: strip
 * characters, change case, and regroup into blocks.
 *
 * No DOM here, so all of it is tested under Node.
 */

// German sharp s is the one letter whose case change JavaScript gets wrong
// for this purpose: "ß".toUpperCase() is "SS", which changes the length of
// the message and so changes the cipher text. Swap in capital sharp s
// BEFORE uppercasing - the Mithril version did it after, by which point
// there was no "ß" left to match and the guard never fired.
export const lower = (text: string) =>
    text.replace(/ẞ/g, 'ß').toLowerCase();
export const upper = (text: string) =>
    text.replace(/ß/g, 'ẞ').toUpperCase();

export const removeLetters = (text: string) => text.replace(/\p{L}/gu, '');
export const removeNumbers = (text: string) => text.replace(/\d/gu, '');
export const removeWhitespace = (text: string) => text.replace(/\s/gu, '');
/** Everything that is not a letter, a digit or whitespace. */
export const removeOther = (text: string) => text.replace(/[^\p{L}\s\d]/gu, '');

export const toLowerCase = lower;
export const toUpperCase = upper;

/** Lower case, then capitalize the first letter of each sentence. */
export const toNaturalCase = (text: string) =>
    lower(text).replace(/(^|\n|[.?!])\s*\S/g, (match) => upper(match));

/** Lower case, then capitalize the first letter of each word. */
export const toTitleCase = (text: string) =>
    lower(text).replace(/(^|\n|\s)\s*\S/g, (match) => upper(match));

export const swapCase = (text: string) =>
    [...text]
        .map((c) => {
            const u = upper(c);
            return c === u ? lower(c) : u;
        })
        .join('');

export const reverse = (text: string) => [...text].reverse().join('');

/**
 * Regroup the text into blocks of `group` characters, `split` blocks to a
 * line. All existing whitespace is discarded first.
 *
 * A group size below 1 leaves the text as one run, and a split below 1 puts
 * every group on a single line. Note that the original implementation looped
 * forever on a split of exactly 0.
 */
export const makeGroups = (text: string, group: number, split: number) => {
    const size = Math.floor(group);
    const perLine = Math.floor(split);
    const stripped = removeWhitespace(text);

    if (size < 1) {
        return stripped;
    }

    const groups: string[] = [];
    for (let i = 0; i < stripped.length; i += size) {
        groups.push(stripped.slice(i, i + size));
    }

    if (perLine < 1) {
        return groups.join(' ');
    }

    const lines: string[] = [];
    for (let i = 0; i < groups.length; i += perLine) {
        lines.push(groups.slice(i, i + perLine).join(' '));
    }

    return lines.join('\n');
};
