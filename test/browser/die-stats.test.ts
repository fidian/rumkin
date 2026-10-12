import { beforeAll, describe, expect, it } from 'vitest';
import {
    $,
    $$,
    click,
    columnText,
    expectExists,
    mount,
    tick,
} from '../support/dom.ts';
import '@/assets/dice/die-stats.ts';

// The example buttons are how the page is mostly used, so drive it with them.
const PAGE = `
<dice-example notation="1d2"></dice-example>
<dice-example notation="2d6"></dice-example>
<dice-example notation="8d6"></dice-example>
<die-stats></die-stats>`;

const example = (notation: string) =>
    click(`dice-example[notation="${notation}"] button`);

/** The "Calculating statistics" line, or null when nothing is running. */
const calculating = () =>
    $$('die-stats p')
        .map((p) => p.textContent?.trim() ?? '')
        .find((line) => line.startsWith('Calculating')) ?? null;

describe('<die-stats>', () => {
    beforeAll(async () => {
        await customElements.whenDefined('die-stats');
    });

    it('centres the headings over right-aligned numbers', async () => {
        await mount(PAGE);
        await example('1d2');
        await expectExists('die-stats table');

        expect($$('die-stats th').map((th) => th.textContent)).toEqual([
            'Roll',
            'Freq',
            'Prob',
            'Bar',
        ]);
        expect(
            $$('die-stats th').map((th) => getComputedStyle(th).textAlign)
        ).toEqual(['center', 'center', 'center', 'center']);
        expect(getComputedStyle($('die-stats td')!).textAlign).toBe('right');
    });

    it('takes the last results down while the next roll is worked out', async () => {
        await mount(PAGE);
        await example('1d2');
        await expectExists('die-stats table');

        await example('2d6');
        await tick();
        // Left up, the 1d2 table would sit under "Calculating" looking like
        // the answer to 2d6.
        expect(calculating()).not.toBeNull();
        expect($('die-stats table')).toBeNull();
        expect($('die-stats roll-histogram')).toBeNull();

        await expectExists('die-stats table');
        expect(calculating()).toBeNull();
        expect(columnText(0, 'die-stats table')).toEqual(
            ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
        );
    });

    it('does not recalculate the roll it is already showing', async () => {
        await mount(PAGE);
        await example('1d2');
        await expectExists('die-stats table');
        const table = $('die-stats table');

        await example('1d2');
        await tick();
        expect(calculating()).toBeNull();
        // The very same element: a recalculation would have rebuilt it.
        expect($('die-stats table')).toBe(table);
    });

    it('does not start over when asked again for the roll it is working out', async () => {
        await mount(PAGE);
        await example('8d6');
        // Nine steps a tenth of a second apart; wait until it is past the
        // first one.
        await expect
            .poll(calculating, { timeout: 3000, interval: 20 })
            .toContain('Merging');

        await example('8d6');
        await tick();
        expect(calculating()).not.toBeNull();
        expect(calculating()).not.toContain('Rolling dice');
    });
});
