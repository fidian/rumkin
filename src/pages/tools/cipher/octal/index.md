---
layout: "@/layouts/cipher-layout.astro"
title: Octal
summary: Write each character as its code point in base 8.
code: true
breadcrumbs:
    - name: Rumkin.com
      href: /
    - name: Web-Based Tools
      href: /tools/
    - name: Ciphers and Codes
      href: /tools/cipher/
---

Octal is base 8, so it counts `0` through `7` and then carries.
It was the natural way to write machine words on computers built around 12, 24
and 36 bit registers, where the bits divide neatly into threes, and it survives
in odd corners such as Unix file permissions.

255 is `377` in octal, so every code is three digits wide and they run together
with nothing between them. A capital `A` is `101`.

The same idea in other bases: [binary](../binary/),
[decimal](../decimal/) and [hexadecimal](../hexadecimal/).

Examples:

-   <cipher-example label="Hello!" topic="octal" payload-direction="DECRYPT" payload-input="110145154154157041"></cipher-example>

<simple-code code="octal" topic="octal" label="Message to encode or decode"></simple-code>
