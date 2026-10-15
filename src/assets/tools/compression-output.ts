/**
 * What the compressors show: the compressed text, optionally wrapped in the
 * JavaScript that turns it back into the original, and how the sizes compare.
 *
 * This is kept apart from compression.ts, which registers the elements, so
 * that the tests can import it under Node.
 */

export interface Codec {
    compressSync: (input: string) => string;
    decompressTiny: unknown;
}

/** How the result compares to what went in, in words. */
export const describeRatio = (before: number, after: number) => {
    if (!before) return '';

    const percent = ((after / before) * 100).toFixed(2);
    const verb = after <= before ? 'removing' : 'adding';
    const difference = Math.abs(before - after);

    return `${before} → ${after} bytes, using ${percent}% of the uncompressed size by ${verb} ${difference} bytes.`;
};

/**
 * Wrap compressed data in the decompressor that reads it. The result is an
 * expression that evaluates to the original text.
 *
 * The codecs work on bytes, one per character, so text that is not plain
 * ASCII goes in as UTF-8 and comes out of the decompressor as UTF-8 too.
 * For that text the expression decodes the bytes back into characters;
 * ASCII text is the same either way and is left without the extra code.
 */
export const withDecompressor = (
    decompressTiny: unknown,
    data: string,
    utf8: boolean,
    bytesPerLine = 60
) => {
    const chunks: string[] = [];
    let rest = data;

    while (rest.length > bytesPerLine) {
        chunks.push(JSON.stringify(rest.slice(0, bytesPerLine)));
        rest = rest.slice(bytesPerLine);
    }
    chunks.push(JSON.stringify(rest));

    const call = `(${String(decompressTiny)})\n(${chunks.join('+\n')})`;

    return utf8
        ? `new TextDecoder().decode(Uint8Array.from(${call},c=>c.charCodeAt(0)))`
        : `(${call})`;
};

/** Compress some text, and say how much that saved. */
export const compressText = (
    codec: Codec,
    text: string,
    includeJs: boolean
) => {
    // The codec reads its input as a binary string, one byte per
    // character, so the text is encoded to UTF-8 first.
    const bytes = new TextEncoder().encode(text);
    const binary = String.fromCharCode(...bytes);
    const compressed = codec.compressSync(binary);
    const output = includeJs
        ? withDecompressor(codec.decompressTiny, compressed, binary !== text)
        : compressed;

    return { output, ratio: describeRatio(bytes.length, output.length) };
};
