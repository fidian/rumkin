# src/assets

The browser-side code: Fudgel components, plain custom elements, and the
modules they are built from.

## One rule, learned three times

**A file that calls `component()` or `customElements.define()` cannot be
imported by a Node test.** Registering an element touches the DOM at import
time, so the module throws before a single test runs.

So every piece of logic worth testing lives in its own module with no DOM in
it, and the element is a thin view over it:

| Logic (tested under Node) | Element |
| --- | --- |
| `table-sort.ts` | `sortable-table.ts` |
| `cipher/text-transforms.ts` | `cipher/advanced-input-area.ts` |
| `cipher/cipher-result.ts` | `cipher/cipher-output.ts` |
| `cipher/morse-data.ts` | `cipher/morse-table.ts` |
| `cipher/alphabet.ts`, `cipher/example-payload.ts` | the cipher elements |

This is worth doing for its own sake — the interesting half then runs in the
fast project instead of a browser — but the import failure is what makes it
non-negotiable.

## Events

`emit()` passes the event name through exactly as given; it does not convert
it to dash-case. A Fudgel template's `@value-change` listens for both
spellings, but these elements are used from plain Astro markup where the
listener is an ordinary `addEventListener('value-change')`. **Name every
emitted event with dashes** and both work.

## Binding into an element's `attr`

Setting a property from outside does not reliably reach a property declared
in `attr`, so bind it as an attribute:

```html
<!-- reaches the attr -->
<cipher-output placeholder="{{message}}"></cipher-output>

<!-- silently does not -->
<cipher-output .placeholder="message"></cipher-output>
```

Fudgel's own guidance says the opposite for **form controls** — an `<input>`
needs `.value`, because an attribute stops tracking once the control is
edited. Both are true; they are different targets.

`prop` is the one to declare when a whole object is being passed, as with
`<keyed-alphabet .selection="alphabet">`.

## Cipher pages

`cipher/register.ts` is the bundle `cipher-layout.astro` loads, so a page
stays as Markdown and drops the element it wants into the body. The
`code` / `cipher` / `tool` frontmatter flags decide which group the page
appears under on the cipher index, so they have to survive conversion.

`tools/convert-cipher-page.mjs` does the mechanical rewrite of a page's
frontmatter and its two bits of embedded markup.

A JSON-valued attribute has to be entity-escaped. The wingdings palette
contains both `'` and `"` among its symbols, and an unescaped copy ends the
attribute early, leaving an element with nothing in it and no visible error.
`tools/check-spacing.mjs` fails the build on that.
