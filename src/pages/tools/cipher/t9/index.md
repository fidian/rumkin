---
layout: "@/layouts/cipher-layout.astro"
title: T9
summary: One key press per letter, with a dictionary to work out which word you meant.
code: true
breadcrumbs:
    - name: Rumkin.com
      href: /
    - name: Web-Based Tools
      href: /tools/
    - name: Ciphers and Codes
      href: /tools/cipher/
---

T9 was the other way to type on a numeric keypad. Rather than
pressing a key until the right letter appeared, you pressed it once per letter
and let the phone work out the word. `43556` is `hello`.

The catch is that `43556` is also `gekko`, `idjjm` and a great many strings that
are not words at all. A phone resolved that with a dictionary, and so does this.
Pick a word list below and any code that matches a word will come back as that
word; where several words match, all of them are offered.

With no dictionary the best anyone can do is read the first letter printed on
each key, which turns `43556` into `gdjjm`. That is what you get for a code no
word matches.

Only the keys `2` through `9` spell anything, so spaces and punctuation are left
where they are and come back unchanged.

This is not [the telephone code](../telephone/), which counts taps and is
unambiguous.

Examples:

-   <cipher-example label="A sentence" topic="t9" payload-direction="DECRYPT" payload-input="843 78425 27696 369"></cipher-example>
-   <cipher-example label="Encode a sentence" topic="t9" payload-direction="ENCRYPT" payload-input="the quick brown fox"></cipher-example>

<t9-code></t9-code>
