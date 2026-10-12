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
    /**
     * Those a search has not ruled out. Picking a word leaves this alone,
     * which is what lets the reader change their mind afterwards: only
     * "Eliminate Bad Combinations" shortens it and only Reset puts it back.
     */
    availableMatches: string[];
    /** The word the reader picked, or '' while it is still open. */
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

export interface Deduction {
    letterMap: Map<string, string>;
    /**
     * What each segment could still be, in step with the segments: a single
     * word where it is picked or forced, nothing where no dictionary word
     * fits, and always nothing for the text between words.
     */
    candidates: string[][];
    /** True when every word ended up with exactly one candidate. */
    solved: boolean;
}

const fixLetters = (
    letterMap: Map<string, string>,
    cipher: string,
    plain: string
) => {
    for (let i = 0; i < cipher.length; i += 1) {
        letterMap.set(cipher.charAt(i), plain.charAt(i));
    }
};

/**
 * Narrow the lists at `indices` by the letters fixed so far. Whenever a word
 * is left with one candidate its letters are fixed too, which may narrow the
 * others - so this repeats until nothing else can be settled.
 *
 * A list only needs narrowing again when a letter has been fixed since it
 * last was. The map only ever grows, so its size is enough to tell, and
 * `narrowedAt` holds the size each list was last narrowed against. Most
 * passes after the first touch a handful of words.
 *
 * When `strict`, an emptied list ends it at once with false: the listing
 * uses that to abandon a choice that leaves some later word with nothing.
 */
const settle = (
    words: Segment[],
    lists: string[][],
    letterMap: Map<string, string>,
    indices: number[],
    narrowedAt: number[],
    strict = false
): boolean => {
    let changed = true;

    while (changed) {
        changed = false;

        for (const index of indices) {
            if (narrowedAt[index] !== letterMap.size) {
                const pattern = makePattern(words[index].chars, letterMap);
                lists[index] = lists[index].filter((word) =>
                    pattern.test(word)
                );
                narrowedAt[index] = letterMap.size;
                if (strict && !lists[index].length) return false;
            }

            if (lists[index].length === 1) {
                const before = letterMap.size;
                fixLetters(letterMap, words[index].chars, lists[index][0]);
                if (letterMap.size !== before) changed = true;
            }
        }
    }

    return true;
};

/**
 * Work out what every word could be, given the words the reader has picked.
 * A picked word fixes its letters, and settle() takes it from there.
 *
 * Nothing is stored on the segments. The answer is worked out from the picks
 * each time, so taking a pick back takes back everything that followed from
 * it. `except` leaves one word's pick out of the reckoning, which is how its
 * own list can go on offering the alternatives to the word it is showing.
 */
export const deduce = (segments: Segment[], except = -1): Deduction => {
    const letterMap = new Map<string, string>();
    const open: number[] = [];

    const candidates = segments.map((segment, index) => {
        if (!segment.isWord) return [];

        if (segment.selectedWord && index !== except) {
            fixLetters(letterMap, segment.chars, segment.selectedWord);
            return [segment.selectedWord];
        }

        open.push(index);
        return segment.availableMatches;
    });

    // Starting every list at zero means that with nothing picked, nothing
    // is narrowed: each list stands as it is, which spares testing a few
    // thousand words against a pattern of "any letters".
    settle(segments, candidates, letterMap, open, segments.map(() => 0));

    const solved = segments.every(
        (segment, index) => !segment.isWord || candidates[index].length === 1
    );

    return { letterMap, candidates, solved };
};

/** Put back every candidate a search removed, and forget every pick. */
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
export const sortWordsForSearch = (
    segments: Segment[],
    matches = new Map(segments.map((s) => [s, s.availableMatches]))
) =>
    segments
        .filter((segment) => segment.isWord)
        .sort(
            (a, b) =>
                (a.letterCount ?? 0) - (b.letterCount ?? 0) ||
                (matches.get(b)?.length ?? 0) - (matches.get(a)?.length ?? 0)
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
    /** What this word may be for as long as the search runs. */
    matches: string[];
    index: number;
    map: Map<string, string>;
    pattern: RegExp;
}

export interface SearchState {
    order: Segment[];
    /**
     * Each word's candidates under the reader's picks. The search reads
     * these rather than the segments, so one that is stopped part way has
     * changed nothing.
     */
    matches: Map<Segment, string[]>;
    hits: Map<Segment, Set<string>>;
    remaining: Segment[];
    earlier: Frame[];
    current: Frame | null;
    done: boolean;
}

const frameFor = (
    segment: Segment,
    matches: string[],
    map: Map<string, string>,
    cipher = '',
    plain = ''
): Frame => {
    const next = new Map(map);
    fixLetters(next, cipher, plain);
    return {
        segment,
        matches,
        index: 0,
        map: next,
        pattern: makePattern(segment.chars, next),
    };
};

const searchOver = (
    segments: Segment[],
    matches: Map<Segment, string[]>
): SearchState => {
    const order = sortWordsForSearch(segments, matches);
    const hits = new Map<Segment, Set<string>>();
    for (const segment of order) hits.set(segment, new Set());

    const remaining = [...order];
    const first = remaining.pop();

    return {
        order,
        matches,
        hits,
        remaining,
        earlier: [],
        current: first
            ? frameFor(first, matches.get(first) ?? [], new Map())
            : null,
        done: !first,
    };
};

export const createSearch = (segments: Segment[]): SearchState => {
    const { candidates } = deduce(segments);

    return searchOver(
        segments,
        new Map(segments.map((segment, index) => [segment, candidates[index]]))
    );
};

/** How far along the search is, as one bracket per word being tried. */
export const searchProgress = (state: SearchState) =>
    [...state.earlier, state.current]
        .filter((frame): frame is Frame => !!frame)
        .map((frame) => `[${frame.index}/${frame.matches.length}]`)
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

        if (current.index >= current.matches.length) {
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
            current.index < current.matches.length &&
            !current.pattern.test(current.matches[current.index])
        ) {
            current.index += 1;
        }

        if (current.index >= current.matches.length) continue;

        if (state.remaining.length) {
            state.earlier.push(current);
            const segment = state.remaining.pop()!;
            state.current = frameFor(
                segment,
                state.matches.get(segment) ?? [],
                current.map,
                current.segment.chars,
                current.matches[current.index]
            );
        } else {
            // Every word placed: record what each one was.
            for (const frame of state.earlier) {
                state.hits.get(frame.segment)?.add(frame.matches[frame.index]);
            }
            state.hits.get(current.segment)?.add(current.matches[current.index]);
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
            // Counted from what the reader was looking at, which their picks
            // had already shortened, rather than from the whole dictionary.
            const before = state.matches.get(segment) ?? [];
            segment.availableMatches = before.filter((word) => found.has(word));
            possibilitiesRemoved +=
                before.length - segment.availableMatches.length;
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

/** More readings than this and the list has stopped being a help. */
export const MAX_COMBINATIONS = 10000;

interface ListingFrame {
    /** What this word and each one after it may be, given the words above. */
    lists: string[][];
    index: number;
    /** The letters fixed before this word is chosen. */
    map: Map<string, string>;
}

export interface ListingState {
    /** Every reading found so far, each as the whole message. */
    found: string[];
    /** How many words nothing fits. Each line leaves them part decoded. */
    unmatched: number;
    /** True when the limit ended it, so there may be more to find. */
    capped: boolean;
    done: boolean;
    limit: number;
    segments: Segment[];
    /** The words being chosen, in the order they are read. */
    words: Segment[];
    stack: ListingFrame[];
    /** Where it starts from: every word's list, and the letters fixed. */
    root: ListingFrame;
    /**
     * The elimination search over the same words, run alongside until one
     * of the two finishes. stepListing() says why.
     */
    search: SearchState | null;
    /** Readings to pass over after starting again: they are listed already. */
    skip: number;
}

/**
 * Every way the words can be read together, in the order a reader working
 * down the lists would meet them: the first option for the first word, the
 * first that still fits for the second, and so on to the end. The last word
 * then runs through its options, after which the one before it moves on and
 * the last starts over - an odometer, with the last word turning fastest.
 *
 * The search above is free to start with whichever word pins down the most.
 * This one has to take them in reading order, since that is the order the
 * list is promised in, and "IT" is a poor place to start. So each choice is
 * settled the way a pick is - narrow every later word, fix whatever is left
 * with one candidate, narrow again - and abandoned the moment a later word
 * has nothing left. Without that it spends its time pairing first words
 * with second words that some tenth word was always going to rule out.
 *
 * It is resumable for the same reason the search is. A word nothing fits is
 * left out rather than allowed to rule out every reading, and a cipher word
 * that appears twice is only chosen once.
 */
export const createListing = (
    segments: Segment[],
    limit = MAX_COMBINATIONS
): ListingState => {
    const { letterMap, candidates } = deduce(segments);
    const words: Segment[] = [];
    const lists: string[][] = [];
    const seen = new Set<string>();
    let unmatched = 0;

    segments.forEach((segment, index) => {
        if (!segment.isWord) return;

        if (!candidates[index].length) {
            unmatched += 1;
            return;
        }

        if (seen.has(segment.chars)) return;
        seen.add(segment.chars);
        words.push(segment);
        lists.push(candidates[index]);
    });

    const root = { lists, index: 0, map: letterMap };

    return {
        found: [],
        unmatched,
        capped: false,
        done: !words.length || limit < 1,
        limit,
        segments,
        words,
        stack: words.length ? [{ ...root }] : [],
        root,
        search: searchOver(
            words,
            new Map(words.map((word, index) => [word, lists[index]]))
        ),
        skip: 0,
    };
};

/**
 * Start the listing again from lists holding only the words a finished
 * search found a place for. Nothing it drops was part of any reading, and
 * what is left keeps its order, so the readings come out exactly as before -
 * which is what lets the ones already listed be counted off and passed over.
 */
export const narrowListing = (state: ListingState, search: SearchState) => {
    const lists = state.words.map((word, index) =>
        state.root.lists[index].filter((match) =>
            search.hits.get(word)?.has(match)
        )
    );

    state.search = null;
    state.skip = state.found.length;
    // A word left with nothing means there are no readings at all, and an
    // empty stack is how the listing finds that it has run out.
    state.stack = lists.every((list) => list.length)
        ? [{ lists, index: 0, map: state.root.map }]
        : [];
};

/** How far along the listing is, as one bracket per word chosen so far. */
export const listingProgress = (state: ListingState) =>
    state.stack
        .map((frame, depth) => `[${frame.index}/${frame.lists[depth].length}]`)
        .join(' ');

/**
 * Run for up to `budgetMs`. Returns true once the listing is complete.
 *
 * Half of each turn goes to the elimination search until that finishes.
 * Reading order is a poor order to search in: with a large dictionary this
 * can spend ten seconds on a message the search clears up in half a second,
 * after which the listing itself takes a hundredth. But the search has to
 * visit every reading there is, and for two unrelated words that is millions
 * while the first ten thousand are sitting right here. Neither is the one to
 * wait for, so both run and whichever finishes first settles it.
 */
export const stepListing = (state: ListingState, budgetMs = 200): boolean => {
    const deadline = Date.now() + budgetMs;
    const last = state.words.length - 1;

    if (
        state.search &&
        !state.done &&
        stepSearch(state.search, budgetMs / 2)
    ) {
        narrowListing(state, state.search);
    }

    while (!state.done && Date.now() < deadline) {
        const depth = state.stack.length - 1;
        const frame = state.stack[depth];

        if (!frame) {
            state.done = true;
            break;
        }

        if (frame.index >= frame.lists[depth].length) {
            // Out of options for this word: move the one before it on.
            state.stack.pop();
            if (depth > 0) state.stack[depth - 1].index += 1;
            continue;
        }

        const map = new Map(frame.map);
        fixLetters(map, state.words[depth].chars, frame.lists[depth][frame.index]);

        // Every option in this list already suits the letters fixed above,
        // so on the last word there is nothing left to check.
        if (depth === last) {
            if (state.skip) state.skip -= 1;
            else state.found.push(currentPlaintext(state.segments, map));

            frame.index += 1;

            if (state.found.length >= state.limit) {
                state.capped = true;
                state.done = true;
            }

            continue;
        }

        // The shortest lists go first: they are the cheapest to test and the
        // likeliest to come up empty.
        const lists = [...frame.lists];
        const later = lists.map((_, index) => index).slice(depth + 1);
        later.sort((a, b) => lists[a].length - lists[b].length);

        // This frame's lists were settled against its own map, so only the
        // letters this choice adds are news to them.
        const narrowedAt = lists.map(() => frame.map.size);

        if (settle(state.words, lists, map, later, narrowedAt, true)) {
            state.stack.push({ lists, index: 0, map });
        } else {
            frame.index += 1;
        }
    }

    return state.done;
};

/** Run the whole listing at once. Used by the tests. */
export const listCombinations = (
    segments: Segment[],
    limit = MAX_COMBINATIONS
): ListingState => {
    const state = createListing(segments, limit);
    while (!stepListing(state, 1000));
    return state;
};

const counted = (count: number, one: string, many: string) =>
    `${count.toLocaleString('en-US')} ${count === 1 ? one : many}`;

/** What to say about a listing once it has finished or been stopped. */
export const listingSummary = (state: ListingState, stopped = false) => {
    const found = state.found.length;
    let summary: string;

    if (state.capped) {
        summary = `Stopped at ${counted(found, 'combination', 'combinations')}, and there may be more. Pick a word or two to narrow them down.`;
    } else if (stopped) {
        summary = `Stopped after ${counted(found, 'combination', 'combinations')}.`;
    } else if (found) {
        summary = `Found ${counted(found, 'combination', 'combinations')}.`;
    } else {
        summary =
            'No combination of words from this dictionary fits. Try a larger dictionary, or clear a word you picked.';
    }

    if (state.unmatched && found) {
        summary += ` ${counted(state.unmatched, 'word has', 'words have')} no match in this dictionary and ${state.unmatched === 1 ? 'is' : 'are'} left partly decoded.`;
    }

    return summary;
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
