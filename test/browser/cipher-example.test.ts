import { beforeAll, describe, expect, it } from 'vitest';
import { $, $$, mount, tick } from '../support/dom.ts';
import '@/assets/cipher/cipher-example.ts';
import '@/assets/cipher/caesar-cipher.ts';

// The example buttons drive every cipher page, so this exercises the whole
// path: button -> document event -> payload coercion -> controls -> result.
const PAGE = `
<cipher-example
    topic="caesar"
    label="Wikipedia"
    payload-alphabet="English alphabetKey: useLastInstance:false"
    payload-direction="ENCRYPT"
    payload-input="THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG"
    payload-n="23"
></cipher-example>
<caesar-cipher></caesar-cipher>`;

const settle = async () => {
    await tick();
    await tick();
};

const resultText = () => $('cipher-output .box')?.textContent?.trim();
const messageBox = () => $<HTMLTextAreaElement>('advanced-input-area textarea')!;

describe('cipher examples', () => {
    beforeAll(async () => {
        await customElements.whenDefined('cipher-example');
        await customElements.whenDefined('caesar-cipher');
    });

    it('renders the label as a button', async () => {
        await mount(PAGE);
        expect($('cipher-example button')!.textContent!.trim()).toBe('Wikipedia');
    });

    it('fills in the cipher and produces the published answer', async () => {
        await mount(PAGE);
        await settle();

        $<HTMLButtonElement>('cipher-example button')!.click();
        await settle();

        expect(messageBox().value).toBe(
            'THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG'
        );
        expect(resultText()).toBe('QEB NRFZH YOLTK CLU GRJMP LSBO QEB IXWV ALD');
    });

    it('ignores an example meant for a different cipher', async () => {
        await mount(PAGE);
        await settle();

        document.dispatchEvent(
            new CustomEvent('cipher-example', {
                detail: { topic: 'vigenere', payload: { input: 'SHOULD NOT APPEAR' } },
            })
        );
        await settle();

        expect(messageBox().value).toBe('');
    });

    it('shows a placeholder until there is something to work on', async () => {
        await mount(PAGE);
        await settle();
        expect(resultText()).toBe('Enter text to see the result here');
    });

    it('recomputes when the reader changes the direction', async () => {
        await mount(PAGE);
        await settle();
        $<HTMLButtonElement>('cipher-example button')!.click();
        await settle();

        const direction = $$<HTMLSelectElement>('caesar-cipher select')[0];
        direction.value = 'DECRYPT';
        direction.dispatchEvent(new Event('input', { bubbles: true }));
        await settle();

        // Decrypting with the same N undoes the shift the other way.
        expect(resultText()).not.toBe(
            'QEB NRFZH YOLTK CLU GRJMP LSBO QEB IXWV ALD'
        );
        expect(resultText()).toBe('WKH TXLFN EURZQ IRA MXPSV RYHU WKH ODCB GRJ');
    });

    it('re-keys the alphabet and the result together', async () => {
        await mount(PAGE);
        await settle();
        $<HTMLButtonElement>('cipher-example button')!.click();
        await settle();

        const key = $<HTMLInputElement>('keyed-alphabet input[type=text]')!;
        key.value = 'KRYPTOS';
        key.dispatchEvent(new Event('input', { bubbles: true }));
        await settle();

        expect($('keyed-alphabet .result')!.textContent!.trim()).toBe(
            'KRYPTOSABCDEFGHIJLMNQUVWXZ'
        );
        expect(resultText()).not.toBe(
            'QEB NRFZH YOLTK CLU GRJMP LSBO QEB IXWV ALD'
        );
    });

    it('stops listening once the cipher leaves the page', async () => {
        await mount(PAGE);
        await settle();
        const cipher = $('caesar-cipher')!;
        cipher.remove();
        await settle();

        // Nothing should throw, and nothing should still be holding the
        // controller alive through a document listener.
        expect(() => {
            document.dispatchEvent(
                new CustomEvent('cipher-example', {
                    detail: { topic: 'caesar', payload: { input: 'X' } },
                })
            );
        }).not.toThrow();
    });
});
