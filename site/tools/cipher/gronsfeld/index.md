---
title: Gronsfeld
summary: This operates very similar to a Vigenère cipher, but uses numbers instead of a key word.
cipher: true
js:
    - ../rumkin-cipher.js
    - gronsfeld-module.js
components:
    - className: module
      component: Gronsfeld
---

The Gronsfeld cipher is essentially a [Vigenère](../vigenere/) cipher, but uses numbers instead of letters.  So, a Gronsfield key of 0123 is the same as a Vigenère key of ABCD.  This online version lets you encode and decode messages with a keyed alphabet as well, to allow for maximum flexibility.

<div class="module"></div>.
