---
title: Cryptogram Solver
summary: If you have a plain text message, this will help find possible solutions in a matter of seconds.  It works with simple substitution ciphers in plain English only.
tool: true
js:
    - cryptogram-solver-module.js
routes:
    - path: /
      component: CryptogramStart
    - path: /wordlist
      component: CryptogramWordlist
    - path: /solve
      component: CryptogramSolve
---

Do you have a cryptogram, also known as a cryptoquip or a simple letter substitution cipher?  Just type it in here and perhaps this will solve it right away. If not, it should allow you to work towards a solution by offering solutions for each word and tying the letters together throughout the entire cipher. It happens entirely in your browser, which is why we have to download a wordlist in order to solve the cipher.

> WARNING: The dictionaries used for this tool are not censored. If you want to provide dictionaries without offensive words, contact me.

Only dictionary words are provided in the drop-down lists, but it is possible that misspelled words, names, and other things can still be decoded.

Click on links to load options for that word. Larger lists take much more time to render in the browser. When you have options shown, select an option to assign it as the correct word and the rest of the cryptogram will inherit those letters and reduce the number of available options for words.

<div class="module"></div>
