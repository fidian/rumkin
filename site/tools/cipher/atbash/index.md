---
title: Atbash
summary: A very simplistic cipher where you change A to Z, B to Y, and so on.
code: true
js:
    - ../rumkin-cipher.js
    - atbash-module.js
components:
    - className: module
      component: Atbash
    - className: conduit
      component: Conduit
---

The Atbash cipher is a very common and simple cipher that simply encodes a message with the reverse of the alphabet. Initially it was used with Hebrew. Basically, when encoded, an "A" becomes a "Z", "B" turns into "Y", etc.

The Atbash cipher can be implemented as an [Affine cipher](../affine/) by setting both `a` and `b` to 25 (the alphabet length minus 1).

Examples:

-   <span class="conduit" data-label="Practical Cryptography" data-topic="atbash" data-payload-alphabet="English" data-payload-direction="DECRYPT" data-payload-input="ZGGZXP ZG WZDM"></span>

<div class="module"></div>
