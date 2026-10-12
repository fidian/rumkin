import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import {
    $,
    $$,
    click,
    expectCount,
    expectExists,
    expectMissing,
    expectText,
    mount,
    tick,
    type,
} from '../support/dom.ts';
import '@/assets/cipher/cryptogram-solver-tool.ts';

// "barter garter": two words of one shape that differ in the first letter,
// so picking one decides most of the other.
const WORDS = ['BASHES', 'CASHES', 'DASHES', 'AISLES', 'BISLES'];

const LISTS = [
    { filename: 'test.txt', name: 'Test', description: '', wordCount: 5 },
];

const selects = () => $$<HTMLSelectElement>('word-choice select');

const offered = (select: HTMLSelectElement) =>
    [...select.options].map((option) => option.textContent);

/** What a tap does before the list appears. */
const open = (select: HTMLSelectElement) => {
    select.dispatchEvent(new Event('pointerdown', { bubbles: true }));
    return offered(select);
};

const choose = async (select: HTMLSelectElement, word: string) => {
    open(select);
    select.value = word;
    select.dispatchEvent(new Event('change', { bubbles: true }));
    await tick();
};

const solve = async (cipherText = 'BARTER GARTER') => {
    await mount('<cryptogram-solver></cryptogram-solver>');
    await type('cryptogram-solver textarea', cipherText);
    await expectExists('cryptogram-solver button.solve:not([disabled])');
    await click('cryptogram-solver button.solve');
    await expectExists('word-choice select');
};

const button = (label: string) =>
    $$<HTMLButtonElement>('cryptogram-solver button').find(
        (candidate) => candidate.textContent?.trim() === label
    )!;

describe('<cryptogram-solver>', () => {
    beforeAll(async () => {
        await customElements.whenDefined('cryptogram-solver');
    });

    beforeEach(() => {
        vi.stubGlobal('fetch', async (url: string) =>
            new Response(
                url.endsWith('.json') ? JSON.stringify(LISTS) : WORDS.join('\n')
            )
        );
    });

    afterEach(() => {
        vi.unstubAllGlobals();
        sessionStorage.clear();
    });

    it('gives each word a drop-down showing the letters known so far', async () => {
        await solve();

        expect(selects()).toHaveLength(2);
        expect(selects().map((select) => select.value)).toEqual(['', '']);
        expect(
            selects().map((select) => select.selectedOptions[0].textContent)
        ).toEqual(['??????', '??????']);
    });

    it('holds one option until the list is about to open, then all of them', async () => {
        await solve();
        const [first] = selects();

        // Thousands of words in a real dictionary, times every word in the
        // message: not something to build for a list nobody has opened.
        expect(first.options).toHaveLength(1);
        expect(open(first)).toEqual(['??????', ...WORDS]);
    });

    it('fills the list for a keyboard as well as a tap', async () => {
        await solve();
        const [first, second] = selects();

        first.dispatchEvent(new Event('focus'));
        expect(first.options).toHaveLength(6);

        second.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
        expect(second.options).toHaveLength(6);
    });

    it('does not change width as it fills, though "(clear)" is longer', async () => {
        await solve('BARTER GARTER');
        await choose(selects()[0], 'BASHES');

        const [first] = selects();
        const closed = first.getBoundingClientRect().width;
        expect(open(first)).toContain('(clear)');
        expect(first.getBoundingClientRect().width).toBe(closed);
    });

    it('narrows the other word to what fits the one picked', async () => {
        await solve();
        await choose(selects()[0], 'BASHES');

        expect(selects()[0].value).toBe('BASHES');
        expect(selects()[1].selectedOptions[0].textContent).toBe('?ASHES');
        expect(open(selects()[1])).toEqual(['?ASHES', 'CASHES', 'DASHES']);
        await expectText('cryptogram-solver .so-far', 'BASHES gASHES');
    });

    it('still offers a picked word everything it could be instead', async () => {
        await solve();
        await choose(selects()[0], 'BASHES');

        expect(open(selects()[0])).toEqual(['(clear)', ...WORDS]);
        expect(selects()[0].value).toBe('BASHES');
    });

    it('gives the other word a different list when the pick is changed', async () => {
        await solve();
        await choose(selects()[0], 'BASHES');
        await choose(selects()[0], 'AISLES');

        // One word left that fits, so it is filled in rather than offered.
        expect(selects()[1].value).toBe('BISLES');
        expect(open(selects()[1])).toEqual(['BISLES']);
    });

    it('clears one word without touching the rest', async () => {
        await solve();
        await choose(selects()[0], 'BASHES');
        await choose(selects()[1], 'DASHES');
        await choose(selects()[0], '');

        expect(selects()[0].value).toBe('');
        expect(selects()[1].value).toBe('DASHES');
        expect(open(selects()[0])).toEqual(['?ASHES', 'BASHES', 'CASHES']);
    });

    it('marks a word the reader picked apart from one that was deduced', async () => {
        await solve();
        await choose(selects()[0], 'AISLES');

        expect(selects()[0].classList.contains('picked')).toBe(true);
        expect(selects()[1].classList.contains('picked')).toBe(false);
    });

    it('lists every combination below the Reset and Start over buttons', async () => {
        await solve();
        await click('cryptogram-solver button.list-all');
        await expectCount('cryptogram-solver ol.combinations li', 8);

        expect(
            $$('cryptogram-solver ol.combinations li').map((li) => li.textContent)
        ).toEqual([
            'BASHES CASHES',
            'BASHES DASHES',
            'CASHES BASHES',
            'CASHES DASHES',
            'DASHES BASHES',
            'DASHES CASHES',
            'AISLES BISLES',
            'BISLES AISLES',
        ]);
        await expectText('cryptogram-solver .list-status', 'Found 8 combinations.');

        const list = $('cryptogram-solver ol.combinations')!;
        for (const label of ['Reset', 'Start over']) {
            expect(
                button(label).compareDocumentPosition(list) &
                    Node.DOCUMENT_POSITION_FOLLOWING
            ).toBeTruthy();
        }
    });

    it('lists only what goes with the words already picked', async () => {
        await solve();
        await choose(selects()[1], 'DASHES');
        await click('cryptogram-solver button.list-all');

        await expectCount('cryptogram-solver ol.combinations li', 2);
        expect(
            $$('cryptogram-solver ol.combinations li').map((li) => li.textContent)
        ).toEqual(['BASHES DASHES', 'CASHES DASHES']);
    });

    it('says when the list is older than the choices above it', async () => {
        await solve();
        await click('cryptogram-solver button.list-all');
        await expectCount('cryptogram-solver ol.combinations li', 8);
        await expectMissing('cryptogram-solver .stale');

        await choose(selects()[0], 'BASHES');
        await expectExists('cryptogram-solver .stale');
        // Still there to read from while picking words to match it.
        expect($$('cryptogram-solver ol.combinations li')).toHaveLength(8);

        await click('cryptogram-solver button.list-all');
        await expectCount('cryptogram-solver ol.combinations li', 2);
        await expectMissing('cryptogram-solver .stale');
    });

    it('keeps picks changeable after eliminating, short of the pick itself', async () => {
        await solve();
        await choose(selects()[0], 'BASHES');
        button('Eliminate Bad Combinations').click();
        await tick(20);

        // Eliminating is done under the picks, so it keeps them.
        expect(open(selects()[0])).toEqual(['(clear)', 'BASHES']);
        expect(open(selects()[1])).toEqual(['?ASHES', 'CASHES', 'DASHES']);
    });

    it('puts everything back on Reset', async () => {
        await solve();
        await choose(selects()[0], 'BASHES');
        await click('cryptogram-solver button.list-all');
        await expectCount('cryptogram-solver ol.combinations li', 2);

        button('Reset').click();
        await tick();

        expect(selects().map((select) => select.value)).toEqual(['', '']);
        expect($$('cryptogram-solver ol.combinations li')).toHaveLength(0);
        expect($('cryptogram-solver .list-status')?.textContent?.trim()).toBe('');
        expect(open(selects()[1])).toEqual(['??????', ...WORDS]);
    });

    it('keeps the punctuation between words and leaves the spaces out', async () => {
        await solve('BARTER, GARTER');

        // A block per space would start a wrapped row a space in from the
        // margin; the blocks are set apart already.
        expect(
            $$('cryptogram-solver .word').map((word) =>
                word.querySelector('tt')?.textContent
            )
        ).toEqual(['BARTER', ',', 'GARTER']);
    });

    it('shows a word nothing fits as plain letters, with no drop-down', async () => {
        await solve('BARTER QQ');

        expect(selects()).toHaveLength(1);
        expect($$('cryptogram-solver tt.plain-word').map((tt) => tt.textContent))
            .toContain('??');
    });
});
