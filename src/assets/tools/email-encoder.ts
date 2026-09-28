/**
 * Building an obfuscated mailto: link.
 *
 * The point is to put an address on a page without leaving it sitting in
 * the markup for a harvester to read. None of these are secure - a
 * determined scraper runs JavaScript - but they do defeat the ones that
 * only read the source.
 *
 * No DOM here, which also means no document.createElement for escaping.
 */
import { escapeHtml } from './conversions.ts';

export type Obfuscation = 'none' | 'break' | 'shuffled';
export type Encoding = 'none' | 'html';

export interface EmailOptions {
    to: string;
    linkText?: string;
    subject?: string;
    cc?: string;
    bcc?: string;
    body?: string;
    /** Extra attributes for the anchor, such as a class. */
    linkExtra?: string;
    encoding?: Encoding;
    obfuscation?: Obfuscation;
}

/** The mailto: URL, with whichever headers were filled in. */
export const mailtoUrl = (options: EmailOptions) => {
    const query: string[] = [];

    for (const field of ['subject', 'cc', 'bcc', 'body'] as const) {
        const value = options[field];
        if (value) query.push(`${field}=${encodeURI(value)}`);
    }

    const url = encodeURI(options.to);
    return query.length ? `${url}?${query.join('&')}` : url;
};

export const makeLink = (options: EmailOptions) => {
    if (options.encoding === 'none') return options.to;

    const extra = options.linkExtra ? `${options.linkExtra} ` : '';
    return `<a ${extra}href="mailto:${mailtoUrl(options)}">${escapeHtml(
        options.linkText || ''
    )}</a>`;
};

/**
 * Deduplicate and shuffle the characters, keeping "<" last so the generated
 * string cannot start a tag that PHP or ASP would try to interpret.
 *
 * `pick` chooses an insertion point; a test passes a fixed one.
 */
export const shuffleUnique = (
    input: string,
    pick: (upTo: number) => number = (upTo) => Math.floor(Math.random() * upTo)
) => {
    let letters = '';
    let hasLessThan = false;

    for (const letter of input) {
        if (letters.includes(letter) || (letter === '<' && hasLessThan)) {
            continue;
        }

        if (letter === '<') {
            hasLessThan = true;
            continue;
        }

        const at = pick(letters.length);
        letters = letters.slice(0, at) + letter + letters.slice(at);
    }

    return hasLessThan ? `${letters}<` : letters;
};

/** Rewrite as indexes into a shuffled alphabet, decoded by a small script. */
export const shuffledObfuscate = (
    input: string,
    pick?: (upTo: number) => number
) => {
    const letters = shuffleUnique(input, pick);
    const indexes = [...input]
        .map((letter) => String.fromCharCode(48 + letters.indexOf(letter)))
        .join('');

    return `<script>ML=${JSON.stringify(letters)};
MI=${JSON.stringify(indexes)};
OT="";for(j=0;j<MI.length;j++){
OT+=ML.charAt(MI.charCodeAt(j)-48);
}document.write(OT);</script>`;
};

/** Cut into short random runs and write them back joined. */
export const breakObfuscate = (
    input: string,
    runLength: () => number = () => Math.floor(Math.random() * 6) + 1
) => {
    const parts: string[] = [];
    let rest = input;

    while (rest.length) {
        const take = Math.max(1, runLength());
        parts.push(rest.slice(0, take));
        rest = rest.slice(take);
    }

    // join() with no argument uses a comma, so the parts are re-joined with
    // commas between them - which is the bug that made this produce broken
    // output. join("") is what was meant.
    return `<script>document.write(${JSON.stringify(parts)}.join(""))</script>`;
};

export const encodeEmail = (options: EmailOptions) => {
    const link = makeLink(options);

    switch (options.obfuscation) {
        case 'break':
            return breakObfuscate(link);
        case 'shuffled':
            return shuffledObfuscate(link);
        default:
            return link;
    }
};
