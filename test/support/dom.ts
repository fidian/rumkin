import { expect } from 'vitest';

// Adapted from the Fudgel repository's own test/support/dom.ts.

// Fudgel applies templates in a microtask, so one macrotask is enough for a
// freshly mounted tree to reach viewInit. Plain custom elements upgrade
// synchronously, but their own work may be deferred the same way.
export const tick = (ms = 0) =>
    new Promise<void>((resolve) => setTimeout(resolve, ms));

export const mount = async (html: string) => {
    document.body.innerHTML = html;
    await tick();
};

export const $ = <T extends Element = HTMLElement>(
    selector: string,
    root: ParentNode = document
) => root.querySelector<T>(selector);

export const $$ = <T extends Element = HTMLElement>(
    selector: string,
    root: ParentNode = document
) => [...root.querySelectorAll<T>(selector)];

export const text = (selector: string, root: ParentNode = document) =>
    $(selector, root)?.textContent?.trim() ?? null;

export const click = async (selector: string, root: ParentNode = document) => {
    await expectExists(selector, root);
    $(selector, root)!.click();
};

export const type = async (selector: string, value: string, root: ParentNode = document) => {
    await expectExists(selector, root);
    const el = $<HTMLInputElement | HTMLTextAreaElement>(selector, root)!;
    el.value = value;
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
    await tick();
};

// Retrying assertions, so a test never has to guess how long a render takes.
const poll = <T>(fn: () => T) => expect.poll(fn, { timeout: 3000, interval: 20 });

export const expectText = (selector: string, expected: string, root?: ParentNode) =>
    poll(() => text(selector, root)).toBe(expected);

export const expectContains = (selector: string, expected: string, root?: ParentNode) =>
    poll(() => text(selector, root)).toContain(expected);

export const expectExists = (selector: string, root?: ParentNode) =>
    poll(() => $(selector, root) !== null).toBe(true);

export const expectMissing = (selector: string, root?: ParentNode) =>
    poll(() => $(selector, root)).toBeNull();

export const expectCount = (selector: string, expected: number, root?: ParentNode) =>
    poll(() => $$(selector, root).length).toBe(expected);

/** The trimmed text of every cell in a table's body, row by row. */
export const tableRows = (selector = 'table', root: ParentNode = document) =>
    $$(`${selector} tbody tr`, root).map((tr) =>
        [...tr.children].map((td) => td.textContent?.trim() ?? '')
    );

/** The first cell of every body row, which is what sorting is usually checked on. */
export const columnText = (index: number, selector = 'table', root?: ParentNode) =>
    tableRows(selector, root).map((cells) => cells[index]);
