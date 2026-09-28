/**
 * A worked example on a cipher page:
 *
 *     <cipher-example
 *         topic="vigenere"
 *         label="Kryptos K1"
 *         payload-direction="DECRYPT"
 *         payload-cipher-key="PALIMPSEST"
 *         payload-input="EMUFPHZLRF..."
 *     ></cipher-example>
 *
 * Clicking it fills in the cipher's controls. This is a plain custom element
 * rather than a Fudgel component because the payload arrives as an open-ended
 * set of payload-* attributes, which suits reading the attributes directly.
 *
 * It reaches the cipher through a bubbling CustomEvent on the document, so a
 * page can hold several ciphers and each only answers to its own topic.
 */
import { readPayloadAttributes } from './example-payload.ts';

export const CIPHER_EXAMPLE_EVENT = 'cipher-example';

export interface CipherExampleDetail {
    topic: string;
    payload: Record<string, string>;
}

export class CipherExample extends HTMLElement {
    connectedCallback() {
        if (this.querySelector('button')) return;

        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = this.getAttribute('label') || 'Example';
        button.addEventListener('click', () => this.send());
        this.append(button);
    }

    send() {
        document.dispatchEvent(
            new CustomEvent<CipherExampleDetail>(CIPHER_EXAMPLE_EVENT, {
                bubbles: true,
                detail: {
                    topic: this.getAttribute('topic') || '',
                    payload: readPayloadAttributes(this),
                },
            })
        );
    }
}

if (!customElements.get('cipher-example')) {
    customElements.define('cipher-example', CipherExample);
}
