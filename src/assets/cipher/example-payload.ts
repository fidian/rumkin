/**
 * Applying a worked example to a cipher's controls.
 *
 * Every cipher page carries a few example buttons ("Kryptos K1", "Smithy
 * Code") whose settings are written as HTML attributes, so they arrive as
 * strings. Each one is coerced to the type the control already holds, which
 * is how one mechanism drives twenty different forms.
 */
import { parseAlphabetSpec, type AlphabetSelection } from './alphabet.ts';

export type ExamplePayload = Record<string, string>;

/** "cipher-key" -> "cipherKey", the attribute naming the pages already use. */
export const toCamelCase = (name: string) =>
    name.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());

const looksLikeAlphabet = (value: unknown): value is AlphabetSelection =>
    typeof value === 'object' &&
    value !== null &&
    'alphabetKey' in (value as object);

/**
 * Copy `payload` onto `target`, converting each value to match what is
 * already there. A key the controller does not have is skipped rather than
 * invented, so an example left over from an older version of a page cannot
 * put a control into a state it has no way to display.
 */
export const applyExamplePayload = (
    target: Record<string, unknown>,
    payload: ExamplePayload
): string[] => {
    const applied: string[] = [];

    for (const [rawKey, rawValue] of Object.entries(payload)) {
        const key = toCamelCase(rawKey);
        if (!(key in target)) continue;

        const current = target[key];

        if (looksLikeAlphabet(current)) {
            target[key] = parseAlphabetSpec(rawValue, current);
        } else if (typeof current === 'number') {
            const n = Number(rawValue);
            if (Number.isNaN(n)) continue;
            target[key] = n;
        } else if (typeof current === 'boolean') {
            target[key] = rawValue === 'true';
        } else if (typeof current === 'string') {
            target[key] = rawValue;
        } else {
            continue;
        }

        applied.push(key);
    }

    return applied;
};

/** Read the payload out of a <cipher-example>'s payload-* attributes. */
export const readPayloadAttributes = (element: Element): ExamplePayload => {
    const payload: ExamplePayload = {};

    for (const attr of element.attributes) {
        if (attr.name.startsWith('payload-')) {
            payload[attr.name.slice('payload-'.length)] = attr.value;
        }
    }

    return payload;
};
