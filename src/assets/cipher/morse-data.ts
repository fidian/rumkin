/**
 * Building the Morse reference list. No DOM, so it tests under Node; the
 * <morse-table> element only renders what this returns.
 */
export interface MorseEntry {
    code: string;
    text: string[];
}

export interface MorseRow {
    labels: string;
    code: string;
}

const BETTER_LABEL: Record<string, string> = { ' ': 'Space' };

const toLabel = (text: string) =>
    BETTER_LABEL[text] ?? (text.length < 2 ? text.toUpperCase() : text);

/**
 * Turn the library's data into display rows, keeping only the entries whose
 * labels pass `keep`. Upper and lower case collapse to one label, so "A" and
 * "a" are listed once.
 */
export const morseRows = (
    entries: MorseEntry[],
    keep: (label: string) => boolean
): MorseRow[] => {
    const rows: MorseRow[] = [];

    for (const entry of entries) {
        const labels: string[] = [];
        const seen = new Set<string>();

        for (const text of entry.text) {
            const label = toLabel(text);
            if (keep(label) && !seen.has(label)) {
                seen.add(label);
                labels.push(label);
            }
        }

        if (labels.length) {
            rows.push({ labels: labels.join(', '), code: entry.code });
        }
    }

    return rows;
};

// "CH" is a single Morse code written with two letters, so the split between
// the letter list and the prosign list is at three characters, not two.
export const isLetter = (label: string) => label.length < 3;
export const isProsign = (label: string) => label.length > 2;
