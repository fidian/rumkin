import { describe, expect, it } from 'vitest';
import { runCipher } from '@/assets/cipher/cipher-result.ts';
import { defaultAlphabet } from '@/assets/cipher/alphabet.ts';

/**
 * The example buttons on a page are its fixtures. Each case here is the
 * payload of a <cipher-example> on the page named, so a change that breaks
 * an example breaks a test rather than only the page.
 */
const alphabet = defaultAlphabet();

const decode = (name: string, input: string, options?: Record<string, unknown>) =>
    runCipher({ name, direction: 'DECRYPT', message: input, alphabet, options })
        .text;

const encode = (name: string, input: string, options?: Record<string, unknown>) =>
    runCipher({ name, direction: 'ENCRYPT', message: input, alphabet, options })
        .text;

describe('the base-N codes', () => {
    it('reads the decimal page example', () => {
        expect(decode('decimal', '072101108108111033')).toBe('Hello!');
    });

    it('reads the hexadecimal page example', () => {
        expect(decode('hexadecimal', '48656C6C6F21')).toBe('Hello!');
    });

    it('reads the octal page example', () => {
        expect(decode('octal', '110145154154157041')).toBe('Hello!');
    });

    // "A" is its code point, not its position in the alphabet - which is what
    // /tools/cipher/letter-numbers/ is for, and the three pages say so.
    it('writes A as its code point in each base', () => {
        expect(encode('decimal', 'A')).toBe('065');
        expect(encode('hexadecimal', 'A')).toBe('41');
        expect(encode('octal', 'A')).toBe('101');
        expect(encode('letterNumber', 'A')).toBe('1');
    });
});

describe('braille', () => {
    it('reads the page examples', () => {
        expect(decode('braille', '⠠⠓⠑⠇⠇⠕⠂ ⠺⠕⠗⠇⠙⠖')).toBe('Hello, world!');
        expect(decode('braille', '⠠⠍⠑⠑⠞ ⠍⠑ ⠁⠞ ⠼⠙ ⠕⠄⠉⠇⠕⠉⠅⠲')).toBe(
            "Meet me at 4 o'clock."
        );
    });

    it('needs only one number sign for a run of digits', () => {
        expect(encode('braille', '123')).toBe('⠼⠁⠃⠉');
    });

    // Digits reuse the cells for a-j, so a letter straight after one needs the
    // letter sign to keep from being read as another digit.
    it('ends a run of digits with a letter sign', () => {
        expect(encode('braille', '1a')).toBe('⠼⠁⠰⠁');
        expect(decode('braille', '⠼⠁⠰⠁')).toBe('1a');
    });
});

describe('telephone', () => {
    it('reads the page example', () => {
        expect(decode('telephone', '222*2555*5550633')).toBe('call me');
    });

    // Without the star, "cab" and "ab" are both 2222.
    it('separates two letters on one key', () => {
        expect(encode('telephone', 'cab')).toBe('222*2*22');
        expect(encode('telephone', 'ab')).toBe('2*22');
    });
});

describe('t9', () => {
    it('writes the page example', () => {
        expect(encode('t9', 'the quick brown fox')).toBe(
            '843 78425 27696 369'
        );
    });

    it('resolves a code against a dictionary', () => {
        expect(decode('t9', '43556 96753', { words: ['hello', 'world'] })).toBe(
            'hello world'
        );
    });

    it('offers every word that matches', () => {
        expect(decode('t9', '43556', { words: ['hello', 'gekko'] })).toBe(
            'hello|gekko'
        );
    });

    // No dictionary still has to produce something, and the first letter on
    // each key at least reads back the same way every time.
    it('falls back to the first letter on each key', () => {
        expect(decode('t9', '43556')).toBe('gdjjm');
    });
});

describe('quagmire', () => {
    // The ACA's own worked examples, which are the page's four buttons.
    // https://www.cryptogram.org/downloads/aca.info/ciphers/QuagmireI.pdf
    const cases: [string, Record<string, unknown>, string, string][] = [
        [
            'Quagmire I',
            { align: 'A', cipherKey: '', key: 'FLOWER', plainKey: 'SPRINGFEVER' },
            'QPMGQRBUJUYIFDMPYAIFQYYJJJHJYCJLUUTPIDVWYMFSGAESDWHIZRBLIRVCFCZPELBPZYYJJJHWLJJLPUP',
            'THEQUAGONEISAPERIODICCIPHERWITHAKEYEDPLAINALPHABETRUNAGAINSTASTRAIGHTCIPHERALPHABET',
        ],
        [
            'Quagmire II',
            { align: 'A', cipherKey: 'SPRINGFEVER', key: 'FLOWER', plainKey: '' },
            'JICICOSLYKILFVCHEBDXCCORJIOEWAFMWKKTXBGWHRJIBKEDBJWZABUXWHEHUXOXCU',
            'INTHEQUAGTWOASTRAIGHTPLAINALPHABETISRUNAGAINSTAKEYEDCIPHERALPHABET',
        ],
        [
            'Quagmire III',
            {
                align: 'A',
                cipherKey: 'AUTOMOBILE',
                key: 'HIGHWAY',
                plainKey: 'AUTOMOBILE',
            },
            'KRSLWMITJDVIABMRGQMTMLLIVIFUIXRHTNYONVRHHIIIRMCAOVEI',
            'THESAMEKEYEDALPHABETISUSEDFORPLAINANDCIPHERALPHABETS',
        ],
        [
            'Quagmire IV',
            {
                align: 'S',
                cipherKey: 'PERCEPTION',
                key: 'EXTRA',
                plainKey: 'SENSORY',
            },
            'VBMRFCYISPMPBRRHEICXRREIGDX',
            'THISONEEMPLOYSTHREEKEYWORDS',
        ],
    ];

    for (const [name, options, cipherText, plainText] of cases) {
        it(`deciphers the ${name} example`, () => {
            expect(decode('quagmire', cipherText, options)).toBe(plainText);
        });

        it(`enciphers the ${name} example`, () => {
            expect(encode('quagmire', plainText, options)).toBe(cipherText);
        });
    }

    // Neither alphabet keyed is what the ACA numbering is built on.
    it('is an ordinary Vigenere with no keys at all', () => {
        const options = { align: 'A', cipherKey: '', key: 'LEMON', plainKey: '' };

        expect(encode('quagmire', 'ATTACKATDAWN', options)).toBe(
            encode('vigenère', 'ATTACKATDAWN', { key: 'LEMON' })
        );
    });
});
