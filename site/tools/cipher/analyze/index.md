---
title: Analyze
summary: Shows how often certain letters appear in your text.  Used primarily to assist in decryption.
tool: true
js:
    - ../rumkin-cipher.js
    - analyze-module.js
components:
    - className: module
      component: Analyze
---

One way to tell if you have a "transposition" style of cipher instead of an encrypting method is to perform a letter frequency analysis on the cipher text. In English, you will have certain letters (E, T) show up more than others (Q, Z). To use this tool, just copy your text into the top box and this displays different categories and properties for the characters. Opening any of these will show charts.

The different classifications of characters are based on Unicode's definitions of some selected blocks, properties, and scripts. If you want to get any additional information that is not provided, please contact me.

<div class="module"></div>
