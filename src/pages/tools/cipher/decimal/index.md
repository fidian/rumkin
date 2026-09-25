---
layout: "@/layouts/cipher-layout.astro"
title: Decimal
summary: Write each character as its code point in base 10.
code: true
breadcrumbs:
    - name: Rumkin.com
      href: /
    - name: Web-Based Tools
      href: /tools/
    - name: Ciphers and Codes
      href: /tools/cipher/
---

Every character a computer stores has a number, and until Unicode
came along those numbers ran from 0 to 255. This writes each character as that
number in ordinary base 10.

255 needs three digits, so every code is padded to three - a capital `A` is
`065`, not `65`. That fixed width is what lets the codes run together with
nothing between them and still be read back one at a time. [Binary](../binary/),
[hexadecimal](../hexadecimal/) and [octal](../octal/) do the same thing in
base 2, 16 and 8.

If you are after `A` = 1 rather than `A` = 65, that is
[letter numbers](../letter-numbers/) instead.

Examples:

-   <cipher-example label="Hello!" topic="decimal" payload-direction="DECRYPT" payload-input="072101108108111033"></cipher-example>

<simple-code code="decimal" topic="decimal" label="Message to encode or decode"></simple-code>
