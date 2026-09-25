# Cipher work still outstanding

The six placeholder pages and Quagmire are done. Everything on the cipher
index now goes through `@fidian/rumkin-cipher`; no page carries its own
cipher code any more.

What is left is smaller, and none of it blocks anything.

## Decisions someone may want to revisit

**T9 offers every candidate, unranked.** `43556` comes back as
`hello|gekko` because both are in the dictionary and nothing says which is
likelier. A real phone ordered its guesses by frequency and showed one at a
time. The word lists the site ships are sorted alphabetically and carry no
counts, so ranking would mean a different list - Norvig's ngram data, or the
Google Books sets, both already noted in `TODO`.

**The T9 dictionary is fetched, not bundled.** `src/assets/cipher/t9-code.ts`
pulls a list from `/tools/cipher/wordlists/` the first time a decode needs
one, and keeps it. The smallest is 386 KB. The library itself takes the word
list as an option and ships none, which is the right split - a word list has
a language and a licence attached.

**Braille is Grade 1 only.** Letter for letter, with the capital, number and
letter signs. Grade 2, which contracts common words and letter groups, is a
much larger system: it needs a contraction table, rules about where a
contraction may be used, and decisions about which of several valid
renderings to produce. It is a project, not an afternoon.

Braille writes `(` and `)` with the same cell, so a round trip through the
page turns `)` into `(`. That is braille's own ambiguity and the page says so.

**The telephone code writes `#` but never `##` or `###`.** Number mode and
caps lock are only ever typed by hand, because writing a message never needs
them - the digits are on the keys already. Decoding understands all three.

## Loose ends in the library

**`code-tree/binary-encode.js` stops at 254.** Its loop is `i < 255`, so
`0xFF` has no code. The base-N trees added for decimal, hexadecimal and octal
use `i < 256` and are otherwise the same file. Folding binary into
`code/base-n.js` would fix the off-by-one and remove the duplication, but it
changes what an existing, tested module produces, so it wants doing
deliberately rather than as a side effect.

**Three bugs were fixed in `code/telephone.js` while finishing it**, all of
them in code that had never run: a duplicated `letters["3"]` assignment in the
Español branch that clobbered key 4, a loop in `getCodeList()` that started
one past the end of its array, and a `case "Deutsch":` that never matched
because the alphabet calls itself `Deutsche`. Worth remembering that the other
unexported modules in that library may be in the same state.

## Not done on purpose

The cipher index still has no entry for the wordlists directory, which is
282 MB of `public/` and by far the largest thing the site deploys. The
cryptogram solver and now T9 both fetch from it. Trimming it to the lists
anyone actually uses is a real saving, but it is a content decision.
