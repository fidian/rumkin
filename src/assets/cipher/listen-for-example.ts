/**
 * Wiring a cipher component up to the example buttons on its page.
 */
import {
    CIPHER_EXAMPLE_EVENT,
    type CipherExampleDetail,
} from './cipher-example.ts';
import { applyExamplePayload } from './example-payload.ts';

/**
 * Listen for the examples belonging to `topic` and apply them to
 * `controller`. Returns a function that stops listening, which the caller
 * must invoke from onDestroy() - Fudgel will not clean up a listener that
 * was added to the document.
 */
export const listenForExample = (
    topic: string,
    controller: object,
    afterApply: () => void
): (() => void) => {
    const handler = (event: Event) => {
        const detail = (event as CustomEvent<CipherExampleDetail>).detail;
        if (!detail || detail.topic !== topic) return;

        applyExamplePayload(
            controller as Record<string, unknown>,
            detail.payload
        );
        afterApply();
    };

    document.addEventListener(CIPHER_EXAMPLE_EVENT, handler);

    return () => document.removeEventListener(CIPHER_EXAMPLE_EVENT, handler);
};
