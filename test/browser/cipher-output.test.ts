import { beforeAll, describe, expect, it } from 'vitest';
import { $, mount, tick } from '../support/dom.ts';
import '@/assets/cipher/cipher-output.ts';

const box = () => $('cipher-output .box')!.textContent!.trim();
const settle = async () => {
    await tick();
    await tick();
};

describe('<cipher-output>', () => {
    beforeAll(async () => {
        await customElements.whenDefined('cipher-output');
    });

    it('shows the placeholder while there is no result', async () => {
        await mount('<cipher-output placeholder="Nothing yet"></cipher-output>');
        await settle();
        expect(box()).toBe('Nothing yet');
    });

    it('follows the placeholder attribute when it changes', async () => {
        // A property assignment does not reach a Fudgel attr from outside,
        // so the components bind this as an attribute. If that ever regresses
        // the box silently goes blank instead of explaining itself, which is
        // how the rot13 "odd alphabet" message was lost.
        await mount('<cipher-output placeholder="First"></cipher-output>');
        await settle();
        expect(box()).toBe('First');

        $('cipher-output')!.setAttribute('placeholder', 'Second');
        await settle();
        expect(box()).toBe('Second');
    });

    it('shows the result once there is one', async () => {
        await mount('<cipher-output placeholder="Nothing yet"></cipher-output>');
        const el = $('cipher-output') as HTMLElement & { outcome: unknown };
        el.outcome = { text: 'ABC', display: 'ABC', warnings: [] };
        await settle();
        expect(box()).toBe('ABC');
    });

    it('lists the warnings above the result', async () => {
        await mount('<cipher-output></cipher-output>');
        const el = $('cipher-output') as HTMLElement & { outcome: unknown };
        el.outcome = {
            text: 'A  B',
            display: 'A  B',
            warnings: ['Two or more consecutive spaces in output'],
        };
        await settle();
        expect($('cipher-output .warnings')!.textContent).toContain(
            'Two or more consecutive spaces'
        );
        expect($('cipher-output .warnings')!.textContent).toContain(
            'The following problem has been detected.'
        );
    });

    it('uses the plural when there is more than one warning', async () => {
        await mount('<cipher-output></cipher-output>');
        const el = $('cipher-output') as HTMLElement & { outcome: unknown };
        el.outcome = { text: '', display: '', warnings: ['one', 'two'] };
        await settle();
        expect($('cipher-output .warnings')!.textContent).toContain(
            'The following problems have been detected.'
        );
    });

    it('shows an error instead of an empty box', async () => {
        await mount('<cipher-output></cipher-output>');
        const el = $('cipher-output') as HTMLElement & { outcome: unknown };
        el.outcome = { text: '', display: '', warnings: [], error: 'Bad key' };
        await settle();
        expect($('cipher-output .error')!.textContent).toBe('Bad key');
    });
});
