---
title: Rot13
summary: Swap letters from the beginning of the alphabet with the letters at the end of the alphabet. Encoding is the same as decoding.
code: true
js:
    - ../rumkin-cipher.js
    - rot13-module.js
components:
    - className: module
      component: Rot13
    - className: conduit
      component: Conduit
---

"Rot13" was a popular method of hiding text so only the people who take the time to decode it can read it, but it's such a simple code that everyone should be able to decode it. Swap letters so A becomes N, B becomes O, C changes into P, etc. It also mirrors, so N switches into A. Encoding and decoding is the same. This technique was popular on bulletin board systems and Usenet groups. You can still see it on Geocaching.com and other places to obscure spoilers and hints. The algorithm gets its name by adding 13 to a letter's value, then if you go off the end, you continue counting at the beginning of the alphabet.

Rot13 is both an encoder and decoder for languages that use an even number of letters in their alphabet. You can enter plain text or encoded text, and you will be given the other one. Just type either one here and it will be automatically encoded or decoded. This implementaion will work with other alphabet lengths as long as they contain an even number of letters. Otherwise, you will only see a warning and it won't halfway work.

I also made a "rotN" encoder, also called a [Caesarian Shift](../caesar/). This will let you pick any number besides 13, and is a much faster way to cycle through different possibilities. Also, the [Vigenère cipher](../vigenere/) is somewhat similar.

Examples:

-   <span class="conduit" data-label="Geocaching 101" data-topic="rot13" data-payload-alphabet="English" data-payload-input="Abegu Sbegl Gjb
    Gjragl Rvtug qbg Frira Avar Mreb
    Jrfg Mreb Rvtugl Guerr
    Guvegrra qbg Gjb Gjragl Gjb"></span>

<div class="module"></div>
