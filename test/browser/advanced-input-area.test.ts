import { beforeAll, describe, expect, it } from 'vitest';
import { $, $$, mount, tick } from '../support/dom.ts';
import '@/assets/cipher/advanced-input-area.ts';

const area = () => $<HTMLTextAreaElement>('textarea')!;

const clickAction = async (label: string) => {
    const button = $$('button').find((b) => b.textContent?.trim() === label);
    expect(button, `no action button labelled "${label}"`).toBeTruthy();
    button!.click();
    await tick();
};

const setText = async (text: string) => {
    area().value = text;
    area().dispatchEvent(new Event('input', { bubbles: true }));
    await tick();
};

const onChange = (seen: string[]) =>
    $('advanced-input-area')!.addEventListener('value-change', (e) =>
        seen.push((e as CustomEvent<string>).detail)
    );

describe('<advanced-input-area>', () => {
    beforeAll(async () => {
        await customElements.whenDefined('advanced-input-area');
    });

    it('shows the value it was given', async () => {
        await mount('<advanced-input-area></advanced-input-area>');
        const el = $('advanced-input-area') as HTMLElement & { value: string };
        el.value = 'HELLO';
        await tick();
        expect(area().value).toBe('HELLO');
    });

    it('announces what the reader types', async () => {
        await mount('<advanced-input-area></advanced-input-area>');
        const seen: string[] = [];
        onChange(seen);
        await setText('abc');
        expect(seen).toEqual(['abc']);
    });

    it('applies a removal action and announces the result', async () => {
        await mount('<advanced-input-area></advanced-input-area>');
        const seen: string[] = [];
        onChange(seen);

        await setText('Hello, World 42!');
        await clickAction('numbers');

        expect(area().value).toBe('Hello, World !');
        expect(seen.at(-1)).toBe('Hello, World !');
    });

    it('applies a case change', async () => {
        await mount('<advanced-input-area></advanced-input-area>');
        await setText('the quick brown fox');
        await clickAction('UPPERCASE');
        expect(area().value).toBe('THE QUICK BROWN FOX');
    });

    it('groups the text using the sizes on screen', async () => {
        await mount('<advanced-input-area></advanced-input-area>');
        await setText('THEQUICKBROWNFOX');
        await clickAction('Make groups');
        expect(area().value).toBe('THEQU ICKBR OWNFO X');
    });

    it('regroups when the group size is changed', async () => {
        await mount('<advanced-input-area></advanced-input-area>');
        await setText('ABCDEFGH');

        const [group] = $$<HTMLInputElement>('input[type=number]');
        group.value = '4';
        group.dispatchEvent(new Event('input', { bubbles: true }));
        await tick();

        await clickAction('Make groups');
        expect(area().value).toBe('ABCD EFGH');
    });

    it('does not hang when the line size is zero', async () => {
        // The Mithril version looped forever here and locked up the tab.
        await mount('<advanced-input-area></advanced-input-area>');
        await setText('ABCDEF');

        const [, line] = $$<HTMLInputElement>('input[type=number]');
        line.value = '0';
        line.dispatchEvent(new Event('input', { bubbles: true }));
        await tick();

        await clickAction('Make groups');
        expect(area().value).toBe('ABCDE F');
    });

    it('stays quiet when an action changes nothing', async () => {
        await mount('<advanced-input-area></advanced-input-area>');
        await setText('ABC');

        const seen: string[] = [];
        onChange(seen);

        await clickAction('UPPERCASE'); // already uppercase
        expect(seen).toEqual([]);
    });

    it('shows a label only when one is given', async () => {
        await mount('<advanced-input-area></advanced-input-area>');
        expect($('label')).toBeNull();

        await mount('<advanced-input-area label="Message"></advanced-input-area>');
        expect($('label')!.textContent).toContain('Message');
    });

    it('turns off the browser text helpers that would corrupt cipher text', async () => {
        await mount('<advanced-input-area></advanced-input-area>');
        expect(area().getAttribute('spellcheck')).toBe('false');
        expect(area().getAttribute('autocapitalize')).toBe('off');
        expect(area().getAttribute('autocorrect')).toBe('off');
    });
});
