---
layout: "@/layouts/cipher-layout.astro"
title: Hexadecimal
summary: Write each character as its code point in base 16.
code: true
breadcrumbs:
    - name: Rumkin.com
      href: /
    - name: Web-Based Tools
      href: /tools/
    - name: Ciphers and Codes
      href: /tools/cipher/
---

Hexadecimal is base 16, counting `0` to `9` and then `A` to `F`.
It is how character codes are usually written down, because one byte is
always exactly two hexadecimal digits.

That makes the codes two digits wide with nothing between them - a capital `A`
is `41`. Writing always uses capitals, but reading accepts either case, so a
lower case `z` comes out as `7A` and both `7A` and `7a` read back as `z`.

The same idea in other bases: [binary](../binary/), [decimal](../decimal/) and
[octal](../octal/).

Examples:

-   <cipher-example label="Hello!" topic="hexadecimal" payload-direction="DECRYPT" payload-input="48656C6C6F21"></cipher-example>

<simple-code code="hexadecimal" topic="hexadecimal" label="Message to encode or decode"></simple-code>
