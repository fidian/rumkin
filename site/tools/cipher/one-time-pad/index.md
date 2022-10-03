---
title: One Time Pad
summary: A virtually uncrackable cipher that relies heavily upon a random source for an encryption key.
cipher: true
js:
    - ../rumkin-cipher.js
    - ./one-time-pad-module.js
components:
    - className: module
      component: OneTimePad
---

It is said that the one-time pad is the best cipher anywhere.  It is uncrackable as long as you keep the messages short, use shorthand and abbreviations, remove unnecessary letters, never reuse a pad, and have a good enough random source for data.

This implementation will take the letters (and letters only) from the pad and encrypt the letters from your message.  It leaves spaces, newlines (enters / returns), punctuation, numbers, and all of the things that aren't A-Z alone.  Make sure that your pad is at least as long as the number of characters in your message, otherwise your message will not be encoded.

<div class="module"></div>
