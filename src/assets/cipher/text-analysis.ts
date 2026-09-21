/**
 * Working out what a block of text is made of: how long it is, how evenly
 * its letters are spread, and which Unicode blocks and scripts its
 * characters come from.
 *
 * No DOM here. analyze-text.ts renders what this returns.
 */
import rumkinCipher from '@fidian/rumkin-cipher';
import propertyData from '@/data/character-properties.json';
import { buildAlphabet, type AlphabetSelection } from './alphabet.ts';

/** A Unicode property and the code point ranges that belong to it. */
export interface CharacterProperty {
    name: string;
    ranges: [number, number][];
    min: number;
    max: number;
}

/** What a property matched in the text. */
export interface PropertyTally {
    property: CharacterProperty;
    name: string;
    /** How many characters of the text fell in this property. */
    count: number;
    /** Character to how many times it appeared. */
    matches: Map<string, number>;
}

export interface Measurements {
    length: number;
    kappaPlaintext: number;
    indexOfCoincidence: number;
}

/** One row of a chart: the character, its label, and how often it appeared. */
export interface Datum {
    character: string;
    code: number;
    label: string;
    count: number;
}

// Control characters have no glyph, so they are named instead.
const CONTROL_NAMES: Record<number, string> = {
    0: 'NUL', 1: 'SOH', 2: 'STX', 3: 'ETX', 4: 'EOT', 5: 'ENQ', 6: 'ACK',
    7: 'BEL', 8: 'BS', 9: 'TAB', 10: 'LF', 11: 'VT', 12: 'FF', 13: 'CR',
    14: 'SO', 15: 'SI', 16: 'DLE', 17: 'DC1', 18: 'DC2', 19: 'DC3',
    20: 'DC4', 21: 'NAK', 22: 'SYN', 23: 'ETB', 24: 'CAN', 25: 'EM',
    26: 'SUB', 27: 'ESC', 28: 'FS', 29: 'GS', 30: 'RS', 31: 'US',
    32: 'SP', 127: 'DEL',
};

export const labelFor = (character: string) =>
    CONTROL_NAMES[character.charCodeAt(0)] ?? character;

const toRanges = (entries: (number | number[])[]): [number, number][] =>
    entries.map((entry) =>
        Array.isArray(entry) ? [entry[0], entry[1]] : [entry, entry]
    );

/**
 * The property table, built once. The min/max are a cheap rejection test
 * before walking the ranges - the original computed them with
 * Math.min(array), which always gives NaN, so every property walked all of
 * its ranges for every character.
 */
export const characterProperties: CharacterProperty[] = Object.entries(
    propertyData as Record<string, (number | number[])[]>
).map(([name, entries]) => {
    const ranges = toRanges(entries);
    return {
        name,
        ranges,
        min: Math.min(...ranges.map((r) => r[0])),
        max: Math.max(...ranges.map((r) => r[1])),
    };
});

export const propertyMatches = (property: CharacterProperty, code: number) =>
    code >= property.min &&
    code <= property.max &&
    property.ranges.some(([from, to]) => code >= from && code <= to);

/** Group the characters of `text` by the properties they belong to. */
export const tallyProperties = (text: string): PropertyTally[] => {
    const tallies = new Map<string, PropertyTally>();

    for (const character of text) {
        const code = character.charCodeAt(0);

        for (const property of characterProperties) {
            if (!propertyMatches(property, code)) continue;

            let tally = tallies.get(property.name);
            if (!tally) {
                tally = {
                    property,
                    name: property.name,
                    count: 0,
                    matches: new Map(),
                };
                tallies.set(property.name, tally);
            }

            tally.count += 1;
            tally.matches.set(character, 1 + (tally.matches.get(character) ?? 0));
        }
    }

    return [...tallies.values()].sort((a, b) => a.name.localeCompare(b.name));
};

export const measure = (
    text: string,
    selection: AlphabetSelection
): Measurements => {
    const message = new rumkinCipher.util.Message(text);
    return {
        length: text.length,
        kappaPlaintext: rumkinCipher.util.kappaPlaintext(message),
        indexOfCoincidence: rumkinCipher.util.indexOfCoincidence(
            message,
            buildAlphabet(selection)
        ),
    };
};

const datum = (character: string, count: number): Datum => ({
    character,
    code: character.charCodeAt(0),
    label: labelFor(character),
    count,
});

/** Just the characters that appeared, in code point order. */
export const matchesView = (tally: PropertyTally): Datum[] =>
    [...tally.matches]
        .map(([character, count]) => datum(character, count))
        .sort((a, b) => a.code - b.code);

/** The characters that appeared, commonest first. */
export const frequencyView = (tally: PropertyTally): Datum[] =>
    [...tally.matches]
        .map(([character, count]) => datum(character, count))
        .sort((a, b) => b.count - a.count || a.code - b.code);

/**
 * Every character of the property, so a gap is visible as a gap - but with
 * the long empty stretches cut out, since a block can run to thousands of
 * code points. A run of characters is kept when anything within ten of it
 * was used; otherwise the list is broken and a new one started.
 */
export const nearbyView = (tally: PropertyTally, window = 10): Datum[][] => {
    const lists: Datum[][] = [];
    let current: Datum[] = [];
    const queue: { datum: Datum; used: number; before: number; after: number }[] = [];

    const drain = () => {
        const item = queue.shift();
        if (!item) return;

        for (const other of queue) {
            other.before += item.used;
            item.after += other.used;
        }

        if (item.used + item.before + item.after) {
            current.push(item.datum);
        } else if (current.length) {
            lists.push(current);
            current = [];
        }
    };

    for (const [from, to] of tally.property.ranges) {
        for (let code = from; code <= to; code += 1) {
            const character = String.fromCharCode(code);
            const entry = datum(character, tally.matches.get(character) ?? 0);

            if (queue.length >= window) drain();
            queue.push({ datum: entry, used: entry.count ? 1 : 0, before: 0, after: 0 });
        }
    }

    while (queue.length) drain();
    if (current.length) lists.push(current);

    return lists;
};
