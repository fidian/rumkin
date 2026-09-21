/**
 * Describing a keyboard event, for the event tester.
 *
 * The properties reported include several that modern browsers no longer
 * set - keyCode, charCode, keyIdentifier - because the page exists to show
 * what a given browser actually does, and an absent property is itself the
 * answer.
 *
 * No DOM here.
 */

/** Properties worth reporting as a number, with the character if printable. */
const NUMERIC = ['keyCode', 'which', 'charCode'] as const;

/** Properties reported as they are. */
const PLAIN = [
    'shiftKey',
    'ctrlKey',
    'altKey',
    'metaKey',
    'key',
    'char',
    'location',
    'repeat',
    'keyIdentifier',
    'keyLocation',
] as const;

/** A key code, with the character it stands for when it is a printable one. */
export const describeCode = (value: unknown) => {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';

    const text = String(value);
    return typeof value === 'number' && value >= 32 && value < 127
        ? `${text} (${String.fromCharCode(value)})`
        : text;
};

export interface EventLike {
    [property: string]: unknown;
    target?: { nodeName?: string; value?: unknown } | null;
    srcElement?: { nodeName?: string } | null;
}

/** One line of the log for one event. */
export const describeEvent = (
    type: string,
    event: EventLike,
    millisecondsSinceStart: number
) => {
    const parts = [`[${type} ${millisecondsSinceStart}ms]`];

    for (const property of NUMERIC) {
        if (event[property] !== undefined) {
            parts.push(`${property}=${describeCode(event[property])}`);
        }
    }

    for (const property of PLAIN) {
        if (event[property] !== undefined) {
            parts.push(`${property}=${event[property]}`);
        }
    }

    const source = event.srcElement ?? event.target;
    if (source?.nodeName !== undefined) {
        parts.push(`srcElement.nodeName=${source.nodeName}`);
    }

    if (event.target && event.target.value !== undefined) {
        parts.push(`target.value=${event.target.value}`);
    }

    return parts.join(' ');
};

export const EVENT_TYPES = [
    'change',
    'input',
    'keydown',
    'keypress',
    'keyup',
] as const;
