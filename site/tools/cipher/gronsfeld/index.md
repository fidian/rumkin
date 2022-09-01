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
    - className: conduit
      component: Conduit
---

The Gronsfeld cipher is essentially a [Vigenère](../vigenere/) cipher, but uses numbers instead of letters. So, a Gronsfield key of 0123 is the same as a Vigenère key of ABCD. This online version lets you encode and decode messages with a keyed alphabet as well, to allow for maximum flexibility.

Examples:

-   <span class="conduit" data-label="Boxentriq" data-topic="gronsfeld" data-payload-direction="DECRYPT" data-payload-alphabet="English alphabetKey: useLastInstance:false reverseKey:false reverseAlphabet:false keyAtEnd:false" data-payload-cipher-key="321810" data-payload-input="wjbb xion cm b hdte kmipd tijd wjf adaugdzpw ewu ef mxuu oft rxfz uhh jjtm nhxfzuhhnfat sr jf tfd wjf eby dpe bie rvimss iqmtpwhf" data-payload-autokey="false"></span>

<div class="module"></div>
