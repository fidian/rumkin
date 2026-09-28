import { beforeAll, describe, expect, it } from 'vitest';
import { $, $$, click, columnText, mount, tick } from '../support/dom.ts';
import '@/assets/sortable-table.ts';

const TABLE = `
<sortable-table>
    <table>
        <thead>
            <tr><th>Cleaner</th><th>Brand</th><th>Score</th></tr>
        </thead>
        <tbody>
            <tr><td>Vinegar</td><td>Generic</td><td>2</td></tr>
            <tr><td>Acetone</td><td>Klean-Strip</td><td>10</td></tr>
            <tr><td>Baby Oil</td><td>Generic</td><td>1</td></tr>
        </tbody>
    </table>
</sortable-table>`;

describe('<sortable-table>', () => {
    beforeAll(async () => {
        await customElements.whenDefined('sortable-table');
    });

    it('leaves the page order alone until a heading is clicked', async () => {
        await mount(TABLE);
        expect(columnText(0)).toEqual(['Vinegar', 'Acetone', 'Baby Oil']);
    });

    it('sorts by the clicked column', async () => {
        await mount(TABLE);
        await click('th');
        expect(columnText(0)).toEqual(['Acetone', 'Baby Oil', 'Vinegar']);
    });

    it('reverses when the same heading is clicked again', async () => {
        await mount(TABLE);
        await click('th');
        await click('th');
        expect(columnText(0)).toEqual(['Vinegar', 'Baby Oil', 'Acetone']);
    });

    it('starts ascending again when a different heading is clicked', async () => {
        await mount(TABLE);
        await click('th'); // Cleaner, ascending
        await click('th'); // Cleaner, descending
        $$('th')[2].click(); // Score, should be ascending
        await tick();
        expect(columnText(2)).toEqual(['1', '2', '10']);
    });

    it('sorts a numeric column by value rather than as text', async () => {
        await mount(TABLE);
        $$('th')[2].click();
        await tick();
        // Text sorting would give 1, 10, 2 here.
        expect(columnText(2)).toEqual(['1', '2', '10']);
    });

    it('keeps tied rows in the order the page gave them', async () => {
        await mount(TABLE);
        $$('th')[1].click();
        await tick();
        // Both "Generic" rows tie; Vinegar came before Baby Oil in the source.
        expect(columnText(0)).toEqual(['Vinegar', 'Baby Oil', 'Acetone']);
    });

    it('sorts from the keyboard', async () => {
        await mount(TABLE);
        const th = $<HTMLTableCellElement>('th')!;
        th.dispatchEvent(
            new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
        );
        await tick();
        expect(columnText(0)).toEqual(['Acetone', 'Baby Oil', 'Vinegar']);
    });

    it('reports the sort direction to assistive technology', async () => {
        await mount(TABLE);
        expect($$('th').map((th) => th.getAttribute('aria-sort'))).toEqual([
            'none',
            'none',
            'none',
        ]);

        await click('th');
        expect($$('th').map((th) => th.getAttribute('aria-sort'))).toEqual([
            'ascending',
            'none',
            'none',
        ]);

        await click('th');
        expect($('th')!.getAttribute('aria-sort')).toBe('descending');

        // Sorting a different column clears the old one.
        $$('th')[2].click();
        await tick();
        expect($$('th').map((th) => th.getAttribute('aria-sort'))).toEqual([
            'none',
            'none',
            'ascending',
        ]);
    });

    it('makes every heading reachable by keyboard', async () => {
        await mount(TABLE);
        expect($$('th').every((th) => th.tabIndex === 0)).toBe(true);
    });

    it('does not throw when it wraps no table', async () => {
        await mount('<sortable-table></sortable-table>');
        expect($('sortable-table')).not.toBeNull();
    });

    it('does not throw when the table has no body rows', async () => {
        await mount(
            '<sortable-table><table><thead><tr><th>A</th></tr></thead><tbody></tbody></table></sortable-table>'
        );
        await click('th');
        expect($$('tbody tr')).toHaveLength(0);
    });
});
