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

describe('binary', () => {
    // Both code trees stopped at 254, so 0xFF had no code and came back
    // through the encoder as the character itself.
    it('codes the whole byte', () => {
        expect(encode('binary', '\u0000\u00FF')).toBe('0000000011111111');
        expect(decode('binary', '0000000011111111')).toBe('\u0000\u00FF');
    });

    it('agrees with the other bases', () => {
        expect(encode('binary', 'A')).toBe('01000001');
        expect(encode('octal', 'A')).toBe('101');
        expect(encode('hexadecimal', 'A')).toBe('41');
        expect(encode('decimal', 'A')).toBe('065');
    });
});

describe('ADFGX and ADFGVX', () => {
    // Wikipedia's worked examples, which are the page's two buttons.
    it('reads the ADFGX example', () => {
        expect(
            decode('adfgx', 'FAXDF ADDDG DGFFF AFAX AFAFX', {
                square: 'BTALPDHOZKQFVSNGICUXMREWY',
                transpositionKey: 'CARGO',
            })
        ).toBe('ATTACKATONCE');
    });

    it('reads the ADFGVX example, digits and all', () => {
        expect(
            decode('adfgx', 'DGDD DAGD DGAF ADDF DADV DVFA ADVX', {
                digits: true,
                square: 'NA1C3H8TB2OME5WRPD4F6G7I9J0KLQSUVXYZ',
                transpositionKey: 'PRIVACY',
            })
        ).toBe('ATTACKAT1200AM');
    });
});

describe('trifid', () => {
    const square = 'FELIXMARDSTBCGHJKNOPQUVWYZ+';

    it("reads Delastelle's own example", () => {
        expect(
            decode('trifid', 'FMJFV OISSU FTFPU FEQQC', { period: 5, square })
        ).toBe('AIDETOILECIELTAIDERA');
    });

    // The period is part of the key. The same cube and a different period is
    // a different cipher.
    it('gives a different answer at a different period', () => {
        expect(
            decode('trifid', 'FMJFV OISSU FTFPU FEQQC', { period: 10, square })
        ).not.toBe('AIDETOILECIELTAIDERA');
    });
});

describe('the straddling checkerboard', () => {
    it('reads the page example', () => {
        expect(decode('straddlingCheckerboard', '3113212731223655')).toBe(
            'ATTACKATDAWN'
        );
    });

    // The eight commonest letters cost one digit, everything else two.
    it('spends fewer digits on common letters', () => {
        expect(encode('straddlingCheckerboard', 'ETAONRIS')).toHaveLength(8);
        expect(encode('straddlingCheckerboard', 'BCDFGHJK')).toHaveLength(16);
    });
});

describe('baudot', () => {
    // The published values from the Coldplay sleeve are what pin the bit
    // order down: bit 1 first, so the string reads back to front from the
    // code's value.
    it('reads the X&Y sleeve', () => {
        expect(decode('baudot', '10111 11011 01011 11111 10101')).toBe('X&Y');
    });

    it('needs five columns for a three character title', () => {
        expect(encode('baudot', 'X&Y').split(' ')).toHaveLength(5);
    });

    it('sends one shift for a run of digits', () => {
        expect(decode('baudot', encode('baudot', 'CALL 911'))).toBe('CALL 911');
    });
});

describe('wigwag', () => {
    it('reads the page example', () => {
        expect(
            decode('wigwag', '22 2 2 22 121 2121 3 22 2 3 222 22 1121 11 333')
        ).toBe('ATTACK AT DAWN');
    });

    // The codes are not prefix free, so the space between letters is not
    // decoration.
    it('tells IT from E only by the pause', () => {
        expect(decode('wigwag', '1 2 333')).toBe('IT');
        expect(decode('wigwag', '12 333')).toBe('E');
    });
});

describe('runes', () => {
    it('reads the page example', () => {
        expect(decode('runes', '\u16a6\u16d6 \u16e3\u16c1\u16dc')).toBe(
            'THE KING'
        );
    });

    // Thorn and ing are one rune each, so this is five runes and not seven.
    it('writes TH and NG as single runes', () => {
        expect(encode('runes', 'THE KING').replace(' ', '')).toHaveLength(5);
    });

    // Futhorc has no v, x or z, and Unicode's dedicated runic letters keep
    // the mapping reversible.
    it('round trips every letter', () => {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        expect(decode('runes', encode('runes', letters))).toBe(letters);
    });
});

describe('cherokee', () => {
    it('reads the page examples', () => {
        expect(decode('cherokee', '\u13e3\u13b3\u13a9')).toBe('TSALAGI');
        expect(decode('cherokee', '\u13a3\u13cf\u13f2')).toBe('OSIYO');
    });

    it('writes a syllable as one character', () => {
        expect(encode('cherokee', 'TSALAGI')).toHaveLength(3);
    });

    // It is a syllabary for Cherokee, not a cipher for English, so a letter
    // that is not part of a syllable is left alone.
    it('leaves English where it is', () => {
        expect(encode('cherokee', 'hello')).toBe('\u13ael\u13b6');
    });
});
