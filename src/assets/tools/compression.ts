/**
 * Text compressors: <lz77-compressor>, <huffman-compressor>, <base64-encoder>
 *
 * Each takes some text and shows what it becomes, with a note on whether
 * that was actually smaller - for short strings it usually is not, which is
 * the interesting part.
 */
import { component, css, html } from 'fudgel';
import { Buffer as BufferPolyfill } from 'buffer';
import { type Codec, compressText } from './compression-output.ts';

// The compression library is written against Node's Buffer. Browserify used
// to supply one; put the browser polyfill where the library will look before
// any of its code runs, which is why this sits above its import.
const globals = globalThis as { Buffer?: unknown };
globals.Buffer ??= BufferPolyfill;

const { default: rumkinCompression } = await import(
    '@fidian/rumkin-compression'
);

const SHARED = css`
    :host {
        display: block;
    }

    textarea {
        font: inherit;
        height: 8em;
        width: 100%;
    }

    pre {
        background-color: #ddd;
        border: 1px solid;
        overflow-wrap: anywhere;
        padding: 0.5em;
        white-space: pre-wrap;
    }
`;

const NO_ASSIST = `spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off"`;

const compressor = (tag: string, codec: Codec) =>
    component(
        tag,
        {
            style: SHARED,
            template: html`
                <div>
                    <label>
                        <input
                            type="checkbox"
                            .checked="includeJs"
                            @change="toggleJs($event)"
                        />
                        Include necessary JavaScript for decompression
                    </label>
                </div>
                <textarea
                    placeholder="Enter text here"
                    ${NO_ASSIST}
                    @input="setText($event)"
                ></textarea>
                <div *if="!text">
                    Enter some text to compress and the result will be shown
                    here.
                </div>
                <div *if="text">{{ratio}}</div>
                <pre *if="text">{{output}}</pre>
            `,
        },
        class {
            text = '';
            includeJs = false;
            output = '';
            ratio = '';

            toggleJs(event: Event) {
                this.includeJs = (event.target as HTMLInputElement).checked;
                this.compress();
            }

            setText(event: Event) {
                this.text = (event.target as HTMLTextAreaElement).value;
                this.compress();
            }

            private compress() {
                if (!this.text) {
                    this.output = '';
                    this.ratio = '';
                    return;
                }

                const result = compressText(codec, this.text, this.includeJs);
                this.output = result.output;
                this.ratio = result.ratio;
            }
        }
    );

compressor('lz77-compressor', rumkinCompression.lz77Ascii);
compressor('huffman-compressor', rumkinCompression.huffmanAscii);

component(
    'base64-encoder',
    {
        style: SHARED,
        template: html`
            <textarea
                placeholder="Enter text here"
                ${NO_ASSIST}
                @input="setText($event)"
            ></textarea>
            <div *if="!text">
                Enter some text to encode and the result will be shown here.
            </div>
            <pre *if="text">{{output}}</pre>
        `,
    },
    class {
        text = '';
        output = '';

        setText(event: Event) {
            this.text = (event.target as HTMLTextAreaElement).value;

            // btoa only takes Latin-1, so the text is encoded to UTF-8 bytes
            // first. Buffer, which the Mithril version used, is a Node API
            // that only worked here because browserify shimmed it.
            const bytes = new TextEncoder().encode(this.text);
            this.output = this.text
                ? btoa(String.fromCharCode(...bytes))
                : '';
        }
    }
);
