---
title: Affine
summary: Similar to a Caesarian shift, but also adds in a multiplier to further scramble letters.
cipher: true
mathjax: true
js:
    - ../rumkin-cipher.js
    - affine-module.js
components:
    - className: module
      component: Affine
    - className: conduit
      component: Conduit
---

The Affine cipher is a monoalphabetic substitution cipher and it can be the exact same as a standard <a href="../caesar/">Caesarian shift</a> when `a` is 1. Mathematically, it is represented as \\(e(x) = (ax + b) \\bmod m\\). Decryption is a slightly different formula, \\(d(x) = a^{-1} (x - b) \\bmod m\\).</p>

Examples:

-   <span class="conduit" data-label="Wikipedia" data-topic="affine" data-payload-alphabet="English" data-payload-direction="DECRYPT" data-payload-a="5" data-payload-b="8" data-payload-input="IHHWVCSWFRCP"></span> - The example Wikipedia uses to show off the cipher.

To encode something, you need to pick the `a` and it must be coprime with the length of the alphabet, which is the `m` value. To make this easier, I have the (+) and (-) buttons to change the A to the next higher or lower coprime number.

<div class="module"></div>
