# AGENTS.md

Rumkin.com, built with Astro. The conversion from Metalsmith is finished;
this file is what was learned doing it. The rules for writing browser-side
components are in `src/assets/README.md`.

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
silent-markup problems described below. Do not weaken those checks to get a
build through. CI runs `test-unit` and then `build` on every push and pull
request, and deploys only from master.

Order matters in that script: the 360 redirect stubs are written last, after
the link check and the sitemap, because they point at historical URLs and
should not be crawled as site content or listed in the sitemap.

Every redirect now lands on a page that exists; `npm run build-redirects`
reports a dead end if that ever stops being true.

## Layout

- `src/pages/` — **pages only**. Astro routes every `.js` here as an endpoint
  and executes it at build time, which is what broke the build before the
  conversion started. Nothing but `.md` and `.astro` belongs here.
- `src/assets/` — components and the modules they are built from. Read
  `src/assets/README.md` before writing one.
- `src/layouts/`, `src/components/` — Astro-side layout and build-time pieces.
- `src/data/` — JSON a page renders at build time.
- `src/images/` — photographs a page wants Astro to optimise. Anything in
  `public/` is served byte for byte, so a camera original stays a camera
  original; a file under `src/images/` referenced from Markdown as
  `![alt](../../../images/...)` comes out as a webp srcset instead.
- `public/` — everything served as-is, mirroring its URL path.
- `tools/` — the build's own scripts, and the ones the conversion used.
  `redirects.json` is data the site has accumulated since the 1990s.

## Where things stand

Every page is converted: 186 pages, 49 of them ciphers, 15 tools, and 522
tests. Nothing Mithril, jQuery or Metalsmith is left.

Every cipher page goes through `@fidian/rumkin-cipher`. No page carries its
own cipher code, and nothing is left under `public/tools/cipher/js/`.
`CIPHERS-TODO.md` records what is deliberately not done — Grade 2 braille,
ranked T9 candidates — and the loose ends in the library.

**The site needs `@fidian/rumkin-cipher` 1.0.0**, which adds the Quagmire
cipher and the braille, decimal, hexadecimal, octal, t9 and telephone codes.
It went to 1.0.0 rather than 0.18.0 because `alphabet.Deutsche` became
`alphabet.Deutsch`, which 0.x does not describe. Until that version is
published, `npm ci` cannot resolve it; the source is in
`~/Rumkin/rumkin-cipher` and its tests pass there.

## Checking the work

`tools/compare-to-live.mjs` diffs the built site against a snapshot of
rumkin.com by **visible text**, not markup — the two generators emit very
different HTML for the same page.

```bash
node tools/compare-to-live.mjs fetch          # snapshot the live site
node tools/compare-to-live.mjs diff           # summary
node tools/compare-to-live.mjs diff --show /tools/cipher/caesar/
```

119 of 182 pages match the live site exactly. The rest are deliberate edits
made during the conversion, the smart typography Astro applies, and a
handful of places where the live site is simply wrong. Read a difference
before assuming it is a regression, and read the live page before assuming
the live page works.

**The live site is not a correctness oracle.** A good deal of it is broken
in production, and the conversion fixed rather than reproduced it:

- The whiteboard cleaners table is shifted a column, with uninterpolated
  `{{anchor}}` in the markup.
- The rail fence example button does nothing.
- The mailto encoder's "break up strings" option writes the address with
  commas in it.
- Picking Backspace, Explode or Fly Off in the marquee generator throws.
- The twelve Levenshtein pages have an empty `<title>`.
- `image.html` wanted a PHP backend that is long gone; it was a dev
  harness with 214 broken links and has been deleted.
- `quagmires.html` is shadowed by a redirect to `/tools/quagmires/`, a
  destination that was never built. See below.

When the conversion and the live site disagree, check which one is right.

**Quagmires is the clearest example.** The page was never missing content:
its 208 lines and its Quagmire I-IV implementation both work. Three
separate things were wrong. `redirects.json` held
`tools/cipher/quagmires.html -> ../quagmires/`, and Metalsmith wrote that
stub over the real file, so live serves a pointer to a page that was never
created. `js/keymaker.js` had been lost from the repo and was recovered
from commit `9ea7d450`. Two `<link>` tags pointed at `css/base.css` and
`css/normal.css`, which lived under `inc/css/` in the PHP era and were
never at that path. The page is now `src/pages/tools/cipher/quagmires.astro`
and the redirect is gone.

**geonav does animate.** An earlier pass reported the spinning globe as
dead on both sites. That was a sampling error: it spins through 28 frames
in about 840ms and stops back on `na.jpg`, so a check at 1500ms sees the
image it started with. Sample it every 30ms from page load.

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

A cipher that only needs a few text, number or checkbox fields is a
`defineCipher()` declaration and no new component at all - ADFGX, Trifid, the
straddling checkerboard and wig-wag are each about thirty lines in
`keyed-ciphers.ts`.

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

## Photographs

A photograph in `public/` is served exactly as it sits on disk, which for
this site meant five camera originals totalling 4.1 MB on one page. Move it
to `src/images/`, reference it from the Markdown with `![alt](relative/path)`,
and wrap it in `<div class="Ta(c) photo">` with blank lines around the image
so the Markdown inside still parses:

```markdown
<div class="Ta(c) photo">

![Final design of desiccant bag](../../../images/reference/desiccant/pict1294b.jpg)

</div>
```

Astro then emits a webp srcset, and `.photo img` in `src/assets/styles.css`
keeps it to 40vw. Cap the width only: Astro's constrained layout sets
`width: 100%`, so a `max-height` squashes the image rather than scaling it,
and `width: auto` collapses it to nothing before the srcset resolves. Several
photographs sharing one caption go on consecutive lines inside
`<div class="Ta(c) photo photo-row">`, which puts them on one row at 30% each.

An `.astro` page does this with `astro:assets` directly —
`reference/whiteboard/cleaners/` imports one photograph by name and reaches
the rest through `import.meta.glob`, because their paths come from JSON.

## Style

- 4-space indent, double quotes in `.astro`, single in `.ts`. Match the file.
- Comments explain *why*, especially where the original behaviour looks odd.
  Several oddities here are deliberate and faithful — the Morse table showing
  "CH, ch" where every other row shows one label, for instance.
- When porting something that looks like a bug, check whether it was correct
  when written. `upper()` mapping sharp s after uppercasing worked fine on
  browsers where `"ß".toUpperCase()` returned `"ß"` unchanged; engines moved
  to Unicode's default case mapping later. Fix it, but describe it accurately.
