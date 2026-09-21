/**
 * Solving a cryptogram against a dictionary.
 *
 * The idea: a word's shape gives it a key. "TEST" and "THAT" both key to
 * ABCA, because their repeated letters fall in the same places. So the
 * candidates for a cipher word are exactly the dictionary words sharing its
 * key. Choosing one fixes some letters, which narrows every other word,
 * which may fix more letters, and so on.
 *
 * All of it is pure, so the search can be tested without a browser.
 */
import { upper } from './text-transforms.ts';

/** Letters that can be part of a word, across the alphabets on offer. */
const LETTER =
    /['·A-ZÀÁÂÄÅÃĄÆĈÇĆČÐĐÈÉÊËĘĜĤÌÍÎÏĴŁÑŃÒÓÔÖÕØŜŚŠŞẞÙÚÛÜŬÝŹŻАБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЪЬЮЯ]/;

export const isLetter = (character: string) => LETTER.test(character);

export interface WordKey {
    /** The word's shape, as letters starting from A. */
    key: string;
    /** How many distinct letters it has. */
    letterCount: number;
}

/**
 * The shape of a word. The first distinct letter becomes A, the second B,
 * and so on, so words that repeat letters in the same places share a key.
 */
export const keyWord = (word: string): WordKey => {
    const seen = new Map<string, string>();
    let next = 65;

    const key = [...word]
        .map((letter) => {
            let assigned = seen.get(letter);
            if (assigned === undefined) {
                assigned = String.fromCharCode(next);
                seen.set(letter, assigned);
                next += 1;
            }
            return assigned;
        })
        .join('');

    return { key, letterCount: seen.size };
};

/** Group a dictionary by word shape, so candidates are one lookup away. */
export const keyWordlist = (words: string[]): Map<string, string[]> => {
    const byKey = new Map<string, string[]>();

    for (const word of words) {
        const { key } = keyWord(word);
        const list = byKey.get(key);
        if (list) list.push(word);
        else byKey.set(key, [word]);
    }

    return byKey;
};

/** A run of the cipher text: either a word to solve or the text between. */
export interface Segment {
    chars: string;
    isWord: boolean;
    key?: string;
    letterCount?: number;
    /** Every dictionary word of the same shape. */
    rawMatches: string[];
    /** Those still possible given the letters fixed so far. */
    availableMatches: string[];
    selectedWord: string;
}

/** Split the cipher text into words and the punctuation between them. */
export const parseWords = (
    cipherText: string,
    byKey: Map<string, string[]>
): Segment[] => {
    const segments: Segment[] = [];
    let last: Segment | null = null;

    for (const character of upper(cipherText)) {
        const isWord = isLetter(character);

        if (!last || last.isWord !== isWord) {
            last = {
                chars: character,
                isWord,
                rawMatches: [],
                availableMatches: [],
                selectedWord: '',
            };
            segments.push(last);
        } else {
            last.chars += character;
        }
    }

    for (const segment of segments) {
        if (!segment.isWord) continue;
        const { key, letterCount } = keyWord(segment.chars);
        segment.key = key;
        segment.letterCount = letterCount;
        segment.rawMatches = byKey.get(key) ?? [];
        segment.availableMatches = [...segment.rawMatches];
    }

    return segments;
};

/**
 * A pattern matching the candidates still possible for `chars`. A letter
 * already decided matches only itself; an undecided one matches anything
 * not already spoken for, since a substitution cipher never sends two
 * cipher letters to the same plain letter.
 */
export const makePattern = (chars: string, letterMap: Map<string, string>) => {
    const used = [...letterMap.values()].join('');
    const unused = used ? `[^${used.replace(/[\\\]^-]/g, '\\$&')}]` : '.';
    const pattern = [...chars]
        .map((character) => letterMap.get(character) ?? unused)
        .join('');

    return new RegExp(`^${pattern}$`);
};

export interface DeduceResult {
    letterMap: Map<string, string>;
    /** True when every word ended up with exactly one candidate. */
    solved: boolean;
}

/**
 * Narrow every word against the letters fixed so far. Whenever a word is
 * left with one candidate, its letters are fixed too, which may narrow
 * others - so this repeats until nothing more can be settled.
 */
export const deduce = (
    segments: Segment[],
    letterMap = new Map<string, string>(),
    /**
     * Mappings to apply before narrowing, as [cipher word, plain word].
     * A word the reader just picked arrives here: its letters have to be
     * fixed explicitly, because narrowing only queues a word it settled
     * itself and this one is already settled.
     */
    initialQueue: [string, string][] = []
): DeduceResult => {
    const queue: [string, string][] = [...initialQueue];

    const narrow = () => {
        for (const segment of segments) {
            if (!segment.isWord) continue;

            const pattern = makePattern(segment.chars, letterMap);
            segment.availableMatches = segment.availableMatches.filter((word) =>
                pattern.test(word)
            );

            if (segment.availableMatches.length === 1 && !segment.selectedWord) {
                segment.selectedWord = segment.availableMatches[0];
                queue.push([segment.chars, segment.selectedWord]);
            }
        }
    };

    if (!queue.length) narrow();

    while (queue.length) {
        const [from, to] = queue.shift()!;
        for (let i = 0; i < from.length; i += 1) {
            letterMap.set(from.charAt(i), to.charAt(i));
        }
        narrow();
    }

    const solved = segments.every(
        (segment) => !segment.isWord || !!segment.selectedWord
    );

    return { letterMap, solved };
};

/** Reset every word to its full candidate list. */
export const resetSegments = (segments: Segment[]) => {
    for (const segment of segments) {
        if (!segment.isWord) continue;
        segment.availableMatches = [...segment.rawMatches];
        segment.selectedWord = '';
    }
};

/**
 * Hardest words last, because the search pops from the end. "Hardest" is
 * the most distinct letters, and among equals the fewest candidates - those
 * constrain the rest soonest.
 */
export const sortWordsForSearch = (segments: Segment[]) =>
    segments
        .filter((segment) => segment.isWord)
        .sort(
            (a, b) =>
                (a.letterCount ?? 0) - (b.letterCount ?? 0) ||
                b.availableMatches.length - a.availableMatches.length
        );

export interface SearchOutcome {
    wordsTested: number;
    narrowedWords: number;
    failedWords: number;
    possibilitiesRemoved: number;
    /** True when no word could be part of any complete solution. */
    hopeless: boolean;
}

/**
 * Try to assign every word at once, and keep only the candidates that took
 * part in at least one complete assignment - a word that cannot appear in
 * any consistent reading of the whole message is not a possibility.
 *
 * This is the expensive step and it is exponential in the worst case, so it
 * is resumable: createSearch() sets it up, then stepSearch() runs for a
 * time budget and reports whether it finished. The caller yields between
 * steps so the page stays usable, which is what the Mithril version did
 * with a 200ms budget and a setTimeout.
 */
interface Frame {
    segment: Segment;
    index: number;
    map: Map<string, string>;
    pattern: RegExp;
}

export interface SearchState {
    order: Segment[];
    hits: Map<Segment, Set<string>>;
    remaining: Segment[];
    earlier: Frame[];
    current: Frame | null;
    done: boolean;
}

const frameFor = (
    segment: Segment,
    map: Map<string, string>,
    cipher = '',
    plain = ''
): Frame => {
    const next = new Map(map);
    for (let i = 0; i < cipher.length; i += 1) {
        next.set(cipher.charAt(i), plain.charAt(i));
    }
    return {
        segment,
        index: 0,
        map: next,
        pattern: makePattern(segment.chars, next),
    };
};

export const createSearch = (segments: Segment[]): SearchState => {
    const order = sortWordsForSearch(segments);
    const hits = new Map<Segment, Set<string>>();
    for (const segment of order) hits.set(segment, new Set());

    const remaining = [...order];
    const first = remaining.pop();

    return {
        order,
        hits,
        remaining,
        earlier: [],
        current: first ? frameFor(first, new Map()) : null,
        done: !first,
    };
};

/** How far along the search is, as one bracket per word being tried. */
export const searchProgress = (state: SearchState) =>
    [...state.earlier, state.current]
        .filter((frame): frame is Frame => !!frame)
        .map((frame) => `[${frame.index}/${frame.segment.availableMatches.length}]`)
        .join(' ');

/** Run for up to `budgetMs`. Returns true once the search is complete. */
export const stepSearch = (state: SearchState, budgetMs = 200): boolean => {
    const deadline = Date.now() + budgetMs;

    while (!state.done && Date.now() < deadline) {
        const current = state.current;
        if (!current) {
            state.done = true;
            break;
        }

        if (current.index >= current.segment.availableMatches.length) {
            state.remaining.push(current.segment);
            const previous = state.earlier.pop();
            if (!previous) {
                state.current = null;
                state.done = true;
                break;
            }
            state.current = previous;
            state.current.index += 1;
            continue;
        }

        while (
            current.index < current.segment.availableMatches.length &&
            !current.pattern.test(current.segment.availableMatches[current.index])
        ) {
            current.index += 1;
        }

        if (current.index >= current.segment.availableMatches.length) continue;

        if (state.remaining.length) {
            state.earlier.push(current);
            const segment = state.remaining.pop()!;
            state.current = frameFor(
                segment,
                current.map,
                current.segment.chars,
                current.segment.availableMatches[current.index]
            );
        } else {
            // Every word placed: record what each one was.
            for (const frame of state.earlier) {
                state.hits
                    .get(frame.segment)
                    ?.add(frame.segment.availableMatches[frame.index]);
            }
            state.hits
                .get(current.segment)
                ?.add(current.segment.availableMatches[current.index]);
            current.index += 1;
        }
    }

    return state.done;
};

export interface SearchOutcome {
    wordsTested: number;
    narrowedWords: number;
    failedWords: number;
    possibilitiesRemoved: number;
    /** True when no word could be part of any complete solution. */
    hopeless: boolean;
}

/** Apply a finished search: drop every candidate that never worked out. */
export const applySearch = (state: SearchState): SearchOutcome => {
    let wordsTested = 0;
    let narrowedWords = 0;
    let failedWords = 0;
    let possibilitiesRemoved = 0;

    for (const segment of state.order) {
        wordsTested += 1;
        const found = state.hits.get(segment)!;

        if (found.size) {
            narrowedWords += 1;
            const before = segment.availableMatches.length;
            segment.availableMatches = segment.availableMatches.filter((word) =>
                found.has(word)
            );
            possibilitiesRemoved += before - segment.availableMatches.length;
        } else {
            failedWords += 1;
        }
    }

    return {
        wordsTested,
        narrowedWords,
        failedWords,
        possibilitiesRemoved,
        hopeless: wordsTested > 0 && failedWords === wordsTested,
    };
};

/** Run the whole search at once. Used by the tests. */
export const searchAllWords = (segments: Segment[]): SearchOutcome => {
    const state = createSearch(segments);
    while (!stepSearch(state, 1000));
    return applySearch(state);
};

/** The message as it stands, with undecided letters left as they were. */
export const currentPlaintext = (
    segments: Segment[],
    letterMap: Map<string, string>
) =>
    segments
        .map((segment) =>
            segment.isWord
                ? [...segment.chars]
                      .map((c) => letterMap.get(c) ?? c.toLowerCase())
                      .join('')
                : segment.chars
        )
        .join('');
