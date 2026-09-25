---
layout: "@/layouts/cipher-layout.astro"
title: Telephone
summary: Multi-tap, the way a phone with a numeric keypad spelled out words.
code: true
breadcrumbs:
    - name: Rumkin.com
      href: /
    - name: Web-Based Tools
      href: /tools/
    - name: Ciphers and Codes
      href: /tools/cipher/
---

Before phones had keyboards, a text message was typed on the
number keys. Each key carried three or four letters, and you pressed it until
the letter you wanted came up: `2` for `a`, `22` for `b`, `222` for `c`.

Two letters on the same key in a row are a problem, because `2222` could be
`cab` or it could be `ab`. Phones solved it by waiting a moment, or by offering
a "next" key. Here that is a `*`, so `cab` is `222*2*22`.

A `#` capitalises the next letter. Two of them switch to number mode, where a
key press is just its own digit, and three turn on caps lock. Another `#`
switches back.

This is not [T9](../t9/), which presses each key once and guesses the word.

Examples:

-   <cipher-example label="Call me" topic="telephone" payload-direction="DECRYPT" payload-input="222*2555*5550633"></cipher-example>

<simple-code code="telephone" topic="telephone" label="Message to encode or decode"></simple-code>

The layout is the one on an ordinary keypad: `1` holds the punctuation, `0` is
the space bar, and `abc` through `wxyz` fill `2` through `9`.
