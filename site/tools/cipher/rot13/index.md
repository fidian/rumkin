---
title: ROT13
summary: A popular method of hiding text so that only people who actually take the time to decode it can actually read it.  You swap letters; A becomes N, and N becomes A.  It was quite popular on bulletin board systems and Usenet newsgroups.  You can do it with the cryptogram solver also, if you make A=N, B=O, C=P, etc.
cipher: true
js:
    - ../rumkin-cipher.js
    - rot13-module.js
components:
    - className: module
      component: Rot13
---

This is a JavaScript implementation of the "rot13" encoder. Rot13 isn't a very secure algorithm.  A → N, B → O, C → P, and so on. It is used to obscure spoilers and hints so that the person reading has to do a little work in order to understand the message instead of being able to accidentally read it.

Rot13 is both an encoder and decoder for languages that use 26 letters in their alphabet.  You can enter plain text or encoded text, and you will be given the other one.  Just type either one here and it will be automatically encoded or decoded. This implementaion will work with other alphabet lengths as long as they contain an even number of letters. Otherwise, you will only see a warning and it won't halfway work.

I also made a "rotN" encoder, also called a [Caesarian Shift](../caesar/). This will let you pick any number besides 13, and is a much faster way to cycle through different possibilities. Also, the [Vigenère cipher](../vigenere/) is somewhat similar.

<div class="module"></div>
