---
layout: "@/layouts/cipher-layout.astro"
title: Braille
summary: Grade 1 English Braille, written with the Unicode braille patterns.
code: true
breadcrumbs:
    - name: Rumkin.com
      href: /
    - name: Web-Based Tools
      href: /tools/
    - name: Ciphers and Codes
      href: /tools/cipher/
---

Braille writes each letter as a pattern of raised dots in a cell
two across and three down. The dots are numbered down the left column and then
down the right:

```
1 4
2 5
3 6
```

So `a` is dot 1 alone, `b` is dots 1 and 2, and `c` is dots 1 and 4. The first
ten letters use only the top two rows; `k` through `t` repeat them with dot 3
added; `u` through `z` repeat `k` through `o` with dot 6 added. `w` is the odd
one out, because French had no `w` when Louis Braille drew this up in 1824.

Three cells change how the cells after them are read. A capital sign marks the
next letter as a capital. A number sign starts a run of digits, which reuse the
cells for `a` through `j`, so `1` and `a` are the same cell and only the number
sign tells them apart. A letter sign ends a run of digits early, which is why
`1a` needs one and `1 a` does not.

This is Grade 1 braille, letter for letter. Grade 2, which contracts common
words and letter groups, is a much larger system and is not attempted here.

Note that braille writes both brackets with the same cell and leaves the rest
to context, so `(` and `)` cannot both survive a round trip.

Examples:

-   <cipher-example label="Hello, world!" topic="braille" payload-direction="DECRYPT" payload-input="⠠⠓⠑⠇⠇⠕⠂ ⠺⠕⠗⠇⠙⠖"></cipher-example>
-   <cipher-example label="A number and a letter sign" topic="braille" payload-direction="DECRYPT" payload-input="⠠⠍⠑⠑⠞ ⠍⠑ ⠁⠞ ⠼⠙ ⠕⠄⠉⠇⠕⠉⠅⠲"></cipher-example>

<simple-code code="braille" topic="braille" label="Message to encode or decode"></simple-code>
