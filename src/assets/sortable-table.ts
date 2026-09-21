/**
 * Click a column heading to sort the table by it; click again to reverse.
 *
 * Replaces jQuery + tablesorter. The table is rendered by Astro and lives in
 * the light DOM, so the page reads correctly with no JavaScript at all and
 * this element only adds the sorting:
 *
 *     <sortable-table>
 *         <table>...</table>
 *     </sortable-table>
 *
 * The ordering itself is in table-sort.ts.
 */
import { sortedOrder } from './table-sort.ts';

const cellText = (row: HTMLTableRowElement, column: number) =>
    row.cells[column]?.textContent?.trim() ?? '';

export class SortableTable extends HTMLElement {
    /** Column currently sorted, or -1 for the order the page supplied. */
    #column = -1;
    #descending = false;
    #original: HTMLTableRowElement[] = [];

    connectedCallback() {
        // The table is a child in the light DOM, so it may not be parsed yet
        // when this element upgrades.
        queueMicrotask(() => this.#attach());
    }

    #table() {
        return this.querySelector('table');
    }

    #headers() {
        const table = this.#table();
        return table
            ? [...table.querySelectorAll<HTMLTableCellElement>('thead th')]
            : [];
    }

    #attach() {
        const body = this.#table()?.tBodies[0];
        if (!body) return;

        this.#original = [...body.rows];

        this.#headers().forEach((th, column) => {
            th.classList.add('sortable-table-header');
            th.setAttribute('role', 'columnheader');
            th.setAttribute('aria-sort', 'none');
            th.tabIndex = 0;
            th.addEventListener('click', () => this.sort(column));
            th.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    this.sort(column);
                }
            });
        });
    }

    /** Sort by `column`, reversing if it is already the sorted column. */
    sort(column: number) {
        const body = this.#table()?.tBodies[0];
        if (!body) return;

        this.#descending = this.#column === column ? !this.#descending : false;
        this.#column = column;

        const values = this.#original.map((row) => cellText(row, column));

        // One fragment, so the table reflows once rather than once per row.
        const fragment = document.createDocumentFragment();
        for (const index of sortedOrder(values, this.#descending)) {
            fragment.append(this.#original[index]);
        }
        body.append(fragment);

        this.#headers().forEach((th, index) => {
            const sorted = index === column;
            th.classList.toggle('sortable-table-asc', sorted && !this.#descending);
            th.classList.toggle('sortable-table-desc', sorted && this.#descending);
            th.setAttribute(
                'aria-sort',
                sorted ? (this.#descending ? 'descending' : 'ascending') : 'none'
            );
        });
    }
}

if (!customElements.get('sortable-table')) {
    customElements.define('sortable-table', SortableTable);
}
