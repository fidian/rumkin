/**
 * Unbiased random numbers from the browser's cryptographic source.
 *
 * Math.random() is not suitable for generating a password someone will
 * rely on; crypto.getRandomValues is. The care here is in avoiding modulo
 * bias: taking a random value modulo the range makes the low values more
 * likely, so instead this masks off just enough bits and draws again when
 * the result overshoots.
 *
 * Ported from the Mithril version, which carried a polyfill for browsers
 * without crypto.getRandomValues. Every browser has had it for a decade;
 * the fallback to Math.random is kept for the case where it throws.
 */

const MAX_SAFE = Number.MAX_SAFE_INTEGER;

const fill = (array: Uint32Array) => {
    crypto.getRandomValues(array);
    return array;
};

/** A number from 0 up to but not including 1, like Math.random(). */
export const randomNumber = () => {
    try {
        let result = MAX_SAFE;

        // Loop so the result can never be exactly 1.
        while (result === MAX_SAFE) {
            const array = fill(new Uint32Array(2));
            // 21 bits from the first word, shifted up, plus 32 from the
            // second: 53 bits, the most a double holds exactly.
            result = (array[0] & 0x1fffff) * 0x100000000 + array[1];
        }

        return result / MAX_SAFE;
    } catch {
        return Math.random();
    }
};

/** A whole number from 0 up to but not including `max`, without bias. */
export const randomIndex = (max: number): number => {
    try {
        if (max > MAX_SAFE) throw new Error('out of range');
        if (max <= 1) return 0;

        // The smallest all-ones mask that covers max.
        let mask = 1;
        let bits = 1;
        while (mask < max) {
            mask = mask * 2 + 1;
            bits += 1;
        }

        if (bits <= 32) {
            let result = max;
            while (result >= max) {
                result = fill(new Uint32Array(1))[0] & mask;
            }
            return result;
        }

        // More than 32 bits: all of the low word, and part of the high one.
        let highMask = mask;
        for (let i = 0; i < 32; i += 1) {
            highMask = (highMask - 1) / 2;
        }

        let result = max;
        while (result >= max) {
            const array = fill(new Uint32Array(2));
            result = (array[0] & highMask) * 0x100000000 + array[1];
        }
        return result;
    } catch {
        return Math.floor(Math.random() * max);
    }
};

/** One item, chosen evenly. */
export const randomItem = <T>(items: readonly T[]): T =>
    items[randomIndex(items.length)];
