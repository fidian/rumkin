---
title: Caesar
summary: A Caesar cipher lets you add an arbitrary value, shifting each letter forwards or backwards. Traditionally, the offset is 3, making A into D, B into E, etc.
cipher: true
js:
    - ../rumkin-cipher.js
    - caesar-module.js
components:
    - className: module
      component: Caesar
---

This is a standard Caesarian Shift cipher encoder, also known as a rot-N encoder. It's a style of substitution cipher where you can add one, two, or any number up
to 25 to your string and see how it changes.  This is an offshoot of the [rot13](../rot13/) encoder. To perform this shift by hand, you could just write the alphabet on two strips of paper.  Line them up so the top strip's A matches the bottom strip's D (for example) and
then you can encode.  A simple test to see how this works would be to use the alphabet as the input and see the output while changing the value of `N`.

This sort of cipher can also be known as a wheel cipher.  This is where an inner wheel has the alphabet around the outside, and that is placed upon an outer wheel, also with the alphabet going around it.  You can rotate the wheels so that ABC lines up with any series of letters, such as BCD or even a match much further of QRS. Caesar originally shifted by 3 letters, so A -> D, B -> E, and so on, which was good enough for that time.

To encode something, just pick an `N` and type in your message.  To decode something, subtract the encryption `N` from 26 and it should be decoded for you. Alternately, the [cryptogram solver](../cryptogram-solver/) can manually help you solve ciphers using this method.

You can make the cipher more complicated by shuffling the alphabet by using a key. Performing this by hand would be nearly the same as a Caesar alphabet, but you would write the scrambled alphabet instead of a sorted alphabet on both the outer and inner wheel rings (or top and bottom pieces of paper).

<div class="module"></div>
