/**
 * The arithmetic and string work behind several of the small tools.
 * No DOM here.
 */

/* ------------------------------------------------------------------ */
/* Degrees                                                             */
/* ------------------------------------------------------------------ */

export interface Degrees {
    /** Decimal degrees, signed. */
    degrees: number;
    wholeDegrees: number;
    minutes: number;
    wholeMinutes: number;
    seconds: number;
}

/**
 * Read a bearing in any of the forms people write them: N45.12345,
 * "45 7 24.42", 93 52.592W, and so on. A W or S anywhere makes it negative,
 * and each number after the first is the next sexagesimal place.
 */
export const parseDegrees = (input: string): number => {
    const negative = /[WS-]/.test(input);
    const cleaned = input
        .replace(/[^0-9.,]/g, ' ')
        .replace(/,/g, '.')
        .trim();

    if (!cleaned) return 0;

    let total = 0;
    let place = 1;

    for (const part of cleaned.split(/\s+/)) {
        total += Number(part) * place;
        place /= 60;
    }

    return negative ? -total : total;
};

export const splitDegrees = (signed: number): Degrees => {
    const magnitude = Math.abs(signed);
    const sign = signed < 0 ? -1 : 1;
    const wholeDegrees = Math.floor(magnitude);
    const minutes = (magnitude - wholeDegrees) * 60;
    const wholeMinutes = Math.floor(minutes);

    return {
        degrees: magnitude * sign,
        wholeDegrees: wholeDegrees * sign,
        minutes,
        wholeMinutes,
        seconds: (minutes - wholeMinutes) * 60,
    };
};

const round = (value: number, places: number) => {
    const factor = 10 ** places;
    return Math.round(value * factor) / factor;
};

export interface DegreeFormats {
    degrees: string;
    degreesMinutes: string;
    degreesMinutesSeconds: string;
}

export const formatDegrees = (input: string): DegreeFormats => {
    const parts = splitDegrees(parseDegrees(input));

    return {
        degrees: `${round(parts.degrees, 6)}`,
        degreesMinutes: `${parts.wholeDegrees}° ${round(parts.minutes, 3)}`,
        degreesMinutesSeconds: `${parts.wholeDegrees}° ${parts.wholeMinutes}' ${round(parts.seconds, 2)}"`,
    };
};

/* ------------------------------------------------------------------ */
/* Number bases                                                        */
/* ------------------------------------------------------------------ */

const DIGITS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

/** Convert between bases 2 to 36. Characters that are not digits of the
 *  input base are skipped, so a stray space or comma does no harm. */
export const convertBase = (input: string, fromBase: number, toBase: number) => {
    let value = 0;

    for (const character of input.toUpperCase()) {
        const digit = DIGITS.indexOf(character);
        if (digit >= 0 && digit < fromBase) {
            value = value * fromBase + digit;
        }
    }

    if (!value) return '0';

    let out = '';
    while (value) {
        const digit = value % toBase;
        out = DIGITS.charAt(digit) + out;
        value = (value - digit) / toBase;
    }

    return out;
};

/* ------------------------------------------------------------------ */
/* Character codes                                                     */
/* ------------------------------------------------------------------ */

/** Each character's UTF-16 code unit, as four hex digits. */
export const characterCodes = (text: string) =>
    [...text].map((c) =>
        `0000${c.charCodeAt(0).toString(16)}`.slice(-4)
    );

/* ------------------------------------------------------------------ */
/* Mailto / HTML obfuscation                                           */
/* ------------------------------------------------------------------ */

/**
 * Rewrite text as a small self-decoding script, so an address on a page is
 * not sitting there in the markup for a harvester to read.
 *
 * `shuffle` is injectable so a test can pin the output; the tool passes
 * Math.random.
 */
export const encodeAsScript = (
    text: string,
    shuffle: (letters: string[]) => string[] = defaultShuffle
) => {
    const order = shuffle([...new Set([...text])]);
    const positions = new Map(order.map((letter, index) => [letter, index]));

    const recoded = [...text]
        .map((letter) => String.fromCharCode(48 + positions.get(letter)!))
        .join('');

    const letters = JSON.stringify(order.join(''));
    const encoded = JSON.stringify(recoded);

    return `((function(l,r){
var o='',j=0;
for(;j<r.length;j++){o+=l.charAt(r.charCodeAt(j)-48);}
document.write(o);
})(${letters},
${encoded}))`;
};

/** Random order, except "<" is forced last so the output cannot start a
 *  tag that PHP or ASP would try to interpret. */
const defaultShuffle = (letters: string[]) =>
    letters
        .map((letter) => ({
            letter,
            rank: letter === '<' ? 1 : Math.random(),
        }))
        .sort((a, b) => a.rank - b.rank)
        .map((entry) => entry.letter);

/* ------------------------------------------------------------------ */
/* Rainbow text                                                        */
/* ------------------------------------------------------------------ */

export interface RainbowLetter {
    character: string;
    colour: string;
    /** Whitespace carries no colour; it is emitted as it is. */
    blank: boolean;
}

const channel = (length: number, index: number, offset: number) => {
    // Three sine waves a third of a turn apart, squared so they stay
    // positive, sweep through the spectrum across the length of the text.
    const position = index / (length / Math.PI) + offset * (Math.PI / 3);
    const wave = Math.sin(position);
    return `00${Math.floor(wave * wave * 255).toString(16)}`.slice(-2);
};

export const rainbow = (text: string): RainbowLetter[] => {
    const letters = [...text];

    return letters.map((character, index) => ({
        character,
        blank: character.trim() === '',
        colour: `#${channel(letters.length, index, 1)}${channel(
            letters.length,
            index,
            0
        )}${channel(letters.length, index, -1)}`,
    }));
};

const ESCAPES: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
};

export const escapeHtml = (text: string) =>
    text.replace(/[&<>"]/g, (c) => ESCAPES[c]);

/** The markup for the coloured text, for pasting into a page. */
export const rainbowHtml = (text: string) =>
    rainbow(text)
        .map((letter) =>
            letter.blank
                ? letter.character
                : `<span style="color: ${letter.colour}">${escapeHtml(letter.character)}</span>`
        )
        .join('');
