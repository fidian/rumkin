---
title: Vigenère
summary: Based somewhat on the Caesarian shift cipher, this changes the shift amount with each letter in the message and those shifts are based on a passphrase. A pretty strong cipher for beginners. Functionally similar to "Variant Beaufort."
cipher: true
js:
    - ../rumkin-cipher.js
    - vigenere-module.js
components:
    - className: module
      component: Vigenere
---


### Temporarily Missing Features

> **August 2022:** I have to switch web hosting providers. This page will be
> rewritten in the upcoming weeks, but is not yet ready. Sorry, I don't have
> lots of free time to make this change happen faster. As it stands now, you
> can encode and decode message, but you can't use an "autokey" variant.

A 16<sup>th</sup> century French diplomat, Blaise de Vigenère, created a very simple cipher that is moderately difficult for any unintended parties to decipher.  It is somewhat like a variable [Caesar](../caesar/) cipher, but the N changed with every letter.  You would "encode" your message with a passphrase, and the letters of your passphrase would determine how each letter in the message would be encrypted.

This is the exact opposite of a "Variant Beaufort."  To do the variant, just "decode" your plain text to get the cipher text and "encode" the cipher text to get the plain text again.

A judge created his own Smithy code, which is the same as a Vigenère cipher. It had a couple mistakes in the original, but don't let that stop you from trying to decode his message.

<div class="module"></div>
