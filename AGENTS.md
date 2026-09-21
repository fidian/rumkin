# AGENTS.md

Rumkin.com, mid-way through a conversion from Metalsmith to Astro. This file
is for anyone — person or agent — picking the conversion up. The rules for
writing browser-side components are in `src/assets/README.md`.

## Commands

```bash
npm test            # unit + browser tests, then the full build, then external links
npm run test-unit   # vitest, both projects
npm run test-watch  # vitest in watch mode
npm run build       # astro build, sitemap, internal links, markup checks
npm run build-dist  # astro build alone, when iterating
npm start           # dev server
```

`npm run build` is the gate. It fails on a broken internal link and on the
two silent-markup problems described below. Do not weaken those checks to get
a build through.

## Layout

- `src/pages/` — **pages only**. Astro routes every `.js` here as an endpoint
  and executes it at build time, which is what broke the build before the
  conversion started. Nothing but `.md` and `.astro` belongs here.
- `src/assets/` — components and the modules they are built from. Read
  `src/assets/README.md` before writing one.
- `src/layouts/`, `src/components/` — Astro-side layout and build-time pieces.
- `src/data/` — JSON a page renders at build time.
- `public/` — everything served as-is, mirroring its URL path.
- `legacy/` — the Mithril sources still to be ported. **Delete a directory
  once its page is converted.** When `legacy/` is empty the port is done.
- `metalsmith/` — the old build. Deleted at the end; its `TODO` has real
  content that should be moved out first.
- `tools/` — the conversion's own scripts.

## Where the conversion stands

Run this for the current count:

```bash
for f in $(find src/pages -name '*.md'); do grep -q '^layout:' "$f" || echo "$f"; done | wc -l
```

A markdown page with no `layout:` frontmatter has not been converted; it
renders with no title, no breadcrumbs and no styling.

Cipher pages: 25 of 39 done. Remaining are bifid, playfair, ubchi,
double-columnar-transposition, baconian, the three apps (analyze, cryptogram,
cryptogram-solver), and six stubs.

**Six cipher pages are stubs upstream** — braille, decimal, hexadecimal,
octal, t9 and telephone each render the literal string `ok` and carry
`summary: FIXME`. They are placeholders on the live site, not conversion
damage. Ask before inventing implementations for them.

## Checking the work

`tools/compare-to-live.mjs` diffs the built site against a snapshot of
rumkin.com by **visible text**, not markup — the two generators emit very
different HTML for the same page.

```bash
node tools/compare-to-live.mjs fetch          # snapshot the live site
node tools/compare-to-live.mjs diff           # summary
node tools/compare-to-live.mjs diff --show /tools/cipher/caesar/
```

Differences it still reports on converted pages are deliberate content edits
made during the conversion. Read one before assuming it is a regression, and
read the live page before assuming the live page works.

**The live site is not a correctness oracle.** Several pages are broken in
production: the whiteboard cleaners table is shifted a column with
uninterpolated `{{anchor}}` in it, the rail fence example button does
nothing, and `image.html` needs a PHP backend that no longer exists. When
the conversion and the live site disagree, check which one is right.

## Converting a cipher page

Cipher pages stay as Markdown. `src/layouts/cipher-layout.astro` loads the
element bundle, so a page drops its custom element straight into the body —
no retyping prose into `.astro`.

```bash
tools/convert-cipher-page.mjs morse-code \
    '<simple-code code="morse" topic="morse"></simple-code>'
```

That rewrites the frontmatter, turns each `<span class="conduit" data-*>`
into `<cipher-example>`, and replaces `<div class="module">`. Prose is never
touched. Then register the element in `src/assets/cipher/register.ts`.

Pick the element by shape:

| Shape | Element |
| --- | --- |
| Direction + message + output | `<simple-code>` |
| Symbol font with a character palette | `<font-code>` |
| Settings plus an options mapping | `defineCipher()` in `keyed-ciphers.ts` |
| Anything genuinely its own thing | Its own component |

Keep the `code` / `cipher` / `tool` frontmatter flag. The cipher index groups
its 39 children by it.

**The example buttons are the test fixtures.** Each page carries worked
examples whose payloads are the site's own published answers — Kryptos K1,
the Smithy Code, the Wikipedia Caesar and affine examples. Verify a converted
cipher by clicking its examples, and pin the answer in a unit test.

## Things that fail silently

Each of these cost time once. The build now catches the last two.

**A pure function in a file that calls `component()` cannot be imported by a
Node test.** Registering an element touches the DOM at import time, so the
module throws before any test runs. Logic goes in its own module; the element
is a thin view over it. This came up three times before it was written down.

**`emit()` does not dash-case event names.** It passes them through verbatim.
A Fudgel template's `@value-change` listens for both spellings, but these
elements are used from Astro markup where the listener is a plain
`addEventListener`. Name every emitted event with dashes.

**A property binding does not reach a property declared in `attr`.** Bind it
as an attribute — `placeholder="{{message}}"`, not `.placeholder="message"`.
Fudgel's guidance says the opposite for *form controls*, which need `.value`;
both are true, they are different targets. Getting this wrong blanked rot13's
"odd number of letters" message with no error anywhere.

**A JSON attribute containing a quote ends its own attribute early.** The
wingdings palette holds both `'` and `"` among its 147 symbols. Unescaped, it
left an element with an empty palette and nothing in the console. Entity-
escape it; `npm run verify-spacing` parses every JSON attribute in `dist` and
fails the build on a broken one.

**`key` and `value` are reserved `*for` loop variables.** `*for="key of keys"`
collides with the index Fudgel already provides, and every `{{key.something}}`
in the loop renders empty - no error, just blank boxes. Name the loop variable
something else.

**Astro's `compressHTML: 'jsx'` strips whitespace at a line boundary next to a
tag.** A link wrapped onto the next line in an `.astro` source renders as
`whiteboards</a>reference`. Separate them with `{" "}`. The same check catches
this.

**Astro 7's compiler does not auto-close tags** and rejects a bare `}` in
markup. Long code samples belong in the frontmatter as template literals
rendered with `set:text`, not escaped with `&lcub;`.

## Style

- 4-space indent, double quotes in `.astro`, single in `.ts`. Match the file.
- Comments explain *why*, especially where the original behaviour looks odd.
  Several oddities here are deliberate and faithful — the Morse table showing
  "CH, ch" where every other row shows one label, for instance.
- When porting something that looks like a bug, check whether it was correct
  when written. `upper()` mapping sharp s after uppercasing worked fine on
  browsers where `"ß".toUpperCase()` returned `"ß"` unchanged; engines moved
  to Unicode's default case mapping later. Fix it, but describe it accurately.
