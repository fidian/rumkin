# Cipher work still outstanding

Two separate jobs: six pages that exist but have no tool on them, and one
page whose tool works but predates the library everything else uses.

Effort is given in sittings, where a sitting is a focused couple of hours.
Every estimate assumes the pattern in `AGENTS.md` - a module in
`@fidian/rumkin-cipher`, a `defineCipher()` or `<simple-code>` declaration on
the site, and the page's own example buttons pinned as tests.

## The six placeholder pages

`braille`, `decimal`, `hexadecimal`, `octal`, `t9` and `telephone`. Upstream
each rendered the literal string `ok` under the word "Words!", so there is no
previous behaviour to reproduce and no published answers to test against.
They now say plainly that they were never written.

They are not equally hard. Three are nearly free, two need a data table, and
one is a real project.

### decimal, hexadecimal, octal - half a sitting for all three

`lib/code-tree/binary-encode.js` already is base 2:

```js
for (let i = 0; i < 255; i += 1) {
    codeTree.add(String.fromCharCode(i), `0000000${i.toString(2)}`.substr(-8));
}
```

Generalising that to a radix and a field width covers all three, and
`lib/code/binary.js` becomes `base-n.js` taking the radix as an option.
Widths: hexadecimal 2, octal 3, decimal 3.

One decision first, and it is a content decision, not a coding one: does
"decimal" mean the character's byte value (`A` -> `065`, matching binary and
base64) or its position in the alphabet (`A` -> `1`, matching
`/tools/cipher/letter-numbers/`)? The library can do either. The three pages
should agree with each other and with binary, which argues for byte values.

The site side is one `<simple-code code="baseN">` per page plus a delimiter
field, which `letter-number.js` already demonstrates.

### braille - one sitting

Grade 1 braille is a straight substitution, and Unicode has the whole cell
range at U+2800-U+28FF, so no font and no images are needed. The work is
assembling and checking the table: 26 letters, the number sign, the capital
sign, and the punctuation that differs from the letters it reuses.

Shape it like `lib/code-tree/gold-bug-data.js` - a data module plus an encode
and a decode tree - and on the site it is a `<simple-code>`, or a
`<font-code>` if the cells should be pickable from a palette.

Grade 2 braille (contractions) is a different and much larger problem. Do not
start it by accident.

### telephone - one sitting, and most of it is already written

`lib/code/telephone.js` exists in the library but is **not exported from
`lib/code/index.js` and has no test**. It is a stub with finished
scaffolding: keypad tables for English, Deutsch and Español, a `getCodeList()`
that builds the multi-tap sequences, and a `getCommandConfig()` for the mode
switches. Only `encode()` and `decode()` are empty.

Two bugs are sitting in the data as written. In the Español branch,
`letters["3"]` is assigned twice, so the second assignment silently overwrites
the first with what was meant for `letters["4"]`. And `getCodeList()` loops
`for (let i = v.length; i >= 0; i -= 1)` and reads `v[i]`, which is `undefined`
on the first pass. Fix both while writing the tests.

The comments spell out the intended semantics in detail (`#` capitalises,
`##` is number mode, `###` is caps lock, `*` separates doubled letters), so
this is filling in two function bodies against a written spec.

### t9 - three or more sittings, and it needs a decision

Encoding is the same keypad as telephone and is trivial. Decoding is the
whole problem: `43556` is `hello`, `gekko`, `idjjm` and a hundred other
strings, and picking the right one needs a dictionary and a frequency
ordering.

The site already ships the dictionaries - `public/tools/cipher/wordlists/`
has the American English lists the cryptogram solver fetches, so the data is
there and the fetching pattern exists in
`src/assets/cipher/cryptogram-solver-tool.ts`.

What has to be decided is what the page does with an ambiguous code: offer
every candidate ranked by frequency, offer the single best guess with a
"next match" control the way a phone did, or both. That shapes the module's
return type, so settle it before writing code.

This one is a genuine project, not a port. It is reasonable to ship the other
five and leave t9 saying it was never written.

## Quagmire

`/tools/cipher/quagmires/` works and gives correct answers, but it is the one
cipher page that does not go through `@fidian/rumkin-cipher`. It runs 700
lines of 2005-era browser JavaScript out of `public/tools/cipher/js/`:
`util.js`, `quagmire.js`, `keymaker.js` and the page's own
`quagmires-page.js`. Globals, `document.encoder.plainKey.value`, and a
redraw loop driven by `window.setTimeout('upd()', 200)` - a string eval, 200ms
apart, forever.

### What the cipher actually is

A Vigenere tableau with two independently keyed alphabets:

| | Plain alphabet | Cipher alphabet |
| --- | --- | --- |
| Vigenere | normal | normal |
| Quagmire I | keyed | normal |
| Quagmire II | normal | keyed |
| Quagmire III | keyed | same key |
| Quagmire IV | keyed | keyed differently |

From `quagmire.js`, enciphering one letter is:

```
shift  = cipherAlphabet.indexOf(passphraseLetter)
       - plainAlphabet.indexOf(alignmentLetter)
output = cipherAlphabet[(plainAlphabet.indexOf(input) + shift) % 26]
```

and deciphering swaps the two alphabets and subtracts the shift. The
passphrase advances only on letters; everything else passes through.

### Porting it to the library - one sitting

Everything it needs already exists:

- `Alphabet.keyWord(key, options)` builds a keyed alphabet and is exactly
  what `util.js`'s `MakeKeyedAlphabet()` does by hand, with the keying
  variants (last instance, reversed key, reversed alphabet, key at end) as a
  bonus.
- `Message.separate()` / `Message.overlay()` preserve punctuation and case,
  which the current code does with `b >= "A" && b <= "Z"` - ASCII only, so
  today it cannot work in the German or Spanish alphabets. The library
  version gets those for free.
- `lib/cipher/vigenère.js` is the same loop with one alphabet. The new
  module is that file with a second keyed alphabet and an alignment offset.

So: add `lib/cipher/quagmire.js`, taking `{ plainKey, cipherKey, key, align }`
and keying both alphabets off the one it is handed; export it from
`lib/cipher/index.js`; add `quagmire.test.js` alongside. Publish as 0.18.0 and
bump the site.

**The tests write themselves.** The page carries four worked examples with
published answers - Quagmire I through IV - and they are already verified:

| | Answer |
| --- | --- |
| III | `THESAMEKEYEDALPHABETISUSEDFORPLAINANDCIPHERALPHABETS.` |
| IV | `THISONEEMPLOYSTHREEKEYWORDS.` |

### Rebuilding the page - one to two sittings

`defineCipher()` assumes a single alphabet, so Quagmire either extends it to
allow a second keyed-alphabet picker or gets its own Fudgel component. Given
that it also wants the tableau, its own component is probably cleaner, with
the tableau builder as a pure function tested under Node - `BuildTableau()`
in `quagmire.js` is already almost that, once the `<font color>` tags come
out of it.

`keymaker.js` can be deleted outright. `src/assets/cipher/keyed-alphabet.ts`
is the same idea, already written and already used by every other keyed
cipher.

When the page no longer needs them, delete all four files from
`public/tools/cipher/js/` and drop the `<script is:inline>` block.

### Why it is worth doing

Alphabets other than English, the keying variants every other cipher page
offers, example buttons that double as tests, and 700 lines of global-scope
JavaScript out of the repo. Against that: the cipher is correct today, so
this is cleanup rather than a fix.
