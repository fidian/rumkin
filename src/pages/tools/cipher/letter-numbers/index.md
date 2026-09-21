---
title: Letter Numbers
summary: Replace each letter with the number of its position in the alphabet.  A simple replacment method that is usually the first one taught to children and is still an effective way to obscure your message.
code: true
js:
    - ../rumkin-cipher.js
    - letter-numbers-module.js
components:
    - className: module
      component: LetterNumbers
---

One of the first ciphers that kids learn is this "letter number" cipher.  You replace letters with a number: A=1, B=2, C=3, etc.

When encrypting, only letters will be encoded and everything else will be left as-is. Encoded numbers can be separated by a delimiter. Numbers can also be padded with zeros so "A" is changed into "01".

<div class="module"></div>
