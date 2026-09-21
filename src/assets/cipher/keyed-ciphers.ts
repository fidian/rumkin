/**
 * The keyed ciphers, each declared as a set of fields and a function that
 * turns them into the library's options. See define-cipher.ts.
 */
import rumkinCipher from '@fidian/rumkin-cipher';
import { defineCipher } from './define-cipher.ts';
import { buildAlphabet } from './alphabet.ts';

const TRANSPOSITION_MODES = [
    { value: 'NORMAL', label: 'Letters only, ignore capitalization' },
    { value: 'MOVE_CAPS', label: 'Letters only, move capitalization' },
    { value: 'ALL_CHARS', label: 'Every character' },
];

defineCipher({
    tag: 'vigenere-cipher',
    code: 'vigenère',
    topic: 'vigenere',
    alphabet: true,
    fields: [
        { name: 'cipherKey', type: 'text', label: 'Cipher key' },
        {
            name: 'autokey',
            type: 'checkbox',
            label: 'Use "autokey" variant to extend the key with plaintext',
        },
    ],
    options: (s) => ({ key: s.cipherKey, autokey: s.autokey }),
});

defineCipher({
    tag: 'gronsfeld-cipher',
    // Gronsfeld is Vigenere with a key written in digits, so the library
    // runs it as Vigenere once the digits become letters.
    code: 'vigenère',
    topic: 'gronsfeld',
    alphabet: true,
    fields: [
        { name: 'cipherKey', type: 'text', label: 'Cipher key (digits)' },
        {
            name: 'autokey',
            type: 'checkbox',
            label: 'Use "autokey" variant to extend the key with plaintext',
        },
    ],
    options: (s) => {
        const letters = String(buildAlphabet(s.alphabet).letterOrder.upper);
        return {
            key: String(s.cipherKey ?? '')
                .replace(/[^0-9]/g, '')
                .replace(/[0-9]/g, (digit) => letters.charAt(+digit)),
            autokey: s.autokey,
        };
    },
});

defineCipher({
    tag: 'affine-cipher',
    code: 'affine',
    topic: 'affine',
    alphabet: true,
    fields: [
        { name: 'a', type: 'number', label: 'A (multiplier)', value: 5, min: 1 },
        { name: 'b', type: 'number', label: 'B (shift)', value: 8, min: 0 },
    ],
    options: (s) => ({ multiplier: s.a, shift: s.b }),
});

defineCipher({
    tag: 'one-time-pad-cipher',
    code: 'oneTimePad',
    topic: 'oneTimePad',
    alphabet: true,
    fields: [
        { name: 'pad', type: 'text', label: 'Pad' },
        {
            name: 'firstIsOne',
            type: 'checkbox',
            label: 'The first letter of the alphabet is 1 rather than 0',
        },
    ],
    options: (s) => ({
        pad: new rumkinCipher.util.Message(String(s.pad ?? '')),
        firstIsOne: s.firstIsOne,
    }),
});

defineCipher({
    tag: 'rail-fence-cipher',
    code: 'railFence',
    topic: 'railFence',
    alphabet: true,
    fields: [
        { name: 'rails', type: 'number', label: 'Rails', value: 5, min: 2 },
        { name: 'offset', type: 'number', label: 'Offset', value: 0, min: 0 },
        {
            name: 'transpositionOperatingMode',
            type: 'select',
            label: 'Operating on',
            choices: TRANSPOSITION_MODES,
        },
    ],
    // "Every character" moves punctuation and spaces too, which the library
    // does by being given no alphabet to work within.
    useAlphabet: (s) => s.transpositionOperatingMode !== 'ALL_CHARS',
    options: (s) => ({
        rails: Number(s.rails),
        offset: Number(s.offset),
        keepCapitalization: s.transpositionOperatingMode === 'MOVE_CAPS',
    }),
});

defineCipher({
    tag: 'rotate-cipher',
    code: 'rotate',
    topic: 'rotate',
    alphabet: true,
    // Rotating the other way is the inverse, so the choice is a direction of
    // rotation rather than encrypt/decrypt.
    direction: false,
    fields: [
        {
            name: 'rotateDirection',
            type: 'select',
            label: 'Rotation',
            choices: [
                { value: 'CLOCKWISE', label: 'Clockwise' },
                { value: 'COUNTERCLOCKWISE', label: 'Counterclockwise' },
            ],
        },
        { name: 'width', type: 'number', label: 'Width', value: 1, min: 1 },
        {
            name: 'moveCaps',
            type: 'checkbox',
            label: 'Move capitalization with the letters',
        },
    ],
    options: (s) => ({
        clockwise: s.rotateDirection === 'CLOCKWISE',
        keepCapitalization: s.moveCaps,
        width: Number(s.width),
    }),
});

defineCipher({
    tag: 'skip-cipher',
    code: 'skip',
    topic: 'skip',
    alphabet: true,
    fields: [
        { name: 'skip', type: 'number', label: 'Skip', value: 2, min: 1 },
        {
            name: 'transpositionOperatingMode',
            type: 'select',
            label: 'Operating on',
            choices: TRANSPOSITION_MODES,
        },
    ],
    useAlphabet: (s) => s.transpositionOperatingMode !== 'ALL_CHARS',
    options: (s) => ({
        skip: Number(s.skip),
        keepCapitalization: s.transpositionOperatingMode === 'MOVE_CAPS',
    }),
});

defineCipher({
    tag: 'columnar-transposition-cipher',
    code: 'columnarTransposition',
    topic: 'columnarTransposition',
    alphabet: true,
    fields: [
        { name: 'key', type: 'text', label: 'Column key' },
        {
            name: 'columnOrder',
            type: 'checkbox',
            label: 'Use the key as a column order instead of column labels',
        },
        {
            name: 'dupesBackwards',
            type: 'checkbox',
            label: 'Number duplicate entries backwards instead of forwards',
        },
        {
            name: 'transpositionOperatingMode',
            type: 'select',
            label: 'Operating on',
            choices: TRANSPOSITION_MODES,
        },
    ],
    useAlphabet: (s) => s.transpositionOperatingMode !== 'ALL_CHARS',
    options: (s) => ({
        // columnKey turns the typed key into the column ordering the cipher
        // works from, and needs the alphabet to do it.
        columnKey: rumkinCipher.util.columnKey(
            buildAlphabet(s.alphabet),
            String(s.key ?? ''),
            {
                columnOrder: s.columnOrder,
                dupesBackwards: s.dupesBackwards,
            }
        ),
        keepCapitalization: s.transpositionOperatingMode === 'MOVE_CAPS',
    }),
});
