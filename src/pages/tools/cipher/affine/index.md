---
layout: "@/layouts/cipher-layout.astro"
title: Affine
summary: Similar to a Caesarian shift, but also adds in a multiplier to further scramble letters.
cipher: true
breadcrumbs:
    - name: Rumkin.com
      href: /
    - name: Web-Based Tools
      href: /tools/
    - name: Ciphers and Codes
      href: /tools/cipher/
---

The Affine cipher is a monoalphabetic substitution cipher and it can be the exact same as a standard <a href="../caesar/">Caesarian shift</a> when `a` is 1. Mathematically, it is represented as \\(e(x) = (ax + b) \\bmod m\\). Decryption is a slightly different formula, \\(d(x) = a^{-1} (x - b) \\bmod m\\).</p>

Examples:

-   <cipher-example label="Wikipedia" topic="affine" payload-alphabet="English" payload-direction="DECRYPT" payload-a="5" payload-b="8" payload-input="IHHWVCSWFRCP"></cipher-example> - The example Wikipedia uses to show off the cipher.

To encode something, you need to pick the `a` and it must be coprime with the length of the alphabet, which is the `m` value. To make this easier, I have the (+) and (-) buttons to change the A to the next higher or lower coprime number.

<affine-cipher></affine-cipher>
