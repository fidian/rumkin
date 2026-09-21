/**
 * Marco unlock codes.
 *
 * Marco is end-of-life, so the site gives the codes out free; this works out
 * the unlock code from a device's registration code. No DOM here.
 */

export type RegisterError = 'EMPTY' | 'SHORT' | 'LONG' | 'CHECKSUM';

export interface RegisterResult {
    unlockCode?: string;
    errorCode?: RegisterError;
}

/**
 * Registration codes are read off a Palm screen, so the characters people
 * confuse are folded before anything else: O becomes 0, I and L become 1.
 */
export const normalizeCode = (code: string) =>
    code
        .trim()
        .toLowerCase()
        .replace(/o/g, '0')
        .replace(/[il]/g, '1')
        .replace(/[^a-f0-9]/g, '');

export const unlockCodeFor = (code: string): RegisterResult => {
    const cleaned = normalizeCode(code);

    if (cleaned.length === 0) return { errorCode: 'EMPTY' };
    if (cleaned.length < 20) return { errorCode: 'SHORT' };
    if (cleaned.length > 22) return { errorCode: 'LONG' };

    const hex = '0123456789abcdef';
    const bytes: number[] = [];

    for (let i = 0; i < 10; i += 1) {
        bytes[i] =
            hex.indexOf(cleaned.charAt(i * 2)) * 16 +
            hex.indexOf(cleaned.charAt(i * 2 + 1));
    }

    // The tenth byte is a checksum of the first nine.
    let checksum = 0;
    for (let i = 0; i < 9; i += 1) {
        checksum = (checksum + bytes[i]) % 256;
    }

    if (checksum !== bytes[9]) return { errorCode: 'CHECKSUM' };

    let key = 0;
    for (let i = 0; i < 9; i += 1) {
        let a = (21031 * bytes[i]) & 0xffff;
        a = (a + 24506) & 0xffff;
        const b = (40782 * i) & 0xffff;
        key = ((key ^ a) + (b ^ 27795)) & 0xffff;
    }

    return { unlockCode: String(key).padStart(5, '0') };
};

export const MESSAGES: Record<RegisterError, string> = {
    EMPTY: 'You need to enter a registration code to see the unlock code here.',
    SHORT: 'Enter more characters.',
    LONG: 'The code is too long. Something is wrong.',
    CHECKSUM:
        'The code has a problem. Double check all of the letters and numbers.',
};
