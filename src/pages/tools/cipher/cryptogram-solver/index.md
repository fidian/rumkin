---
layout: "@/layouts/cipher-layout.astro"
title: Cryptogram Solver
summary: If you have a plain text message, this will help find possible solutions in a matter of seconds.  It works with simple substitution ciphers only.
tool: true
breadcrumbs:
    - name: Rumkin.com
      href: /
    - name: Web-Based Tools
      href: /tools/
    - name: Ciphers and Codes
      href: /tools/cipher/
---

Do you have a cryptogram, also known as a cryptoquip or a simple letter substitution cipher? Just type it in here and perhaps this will solve it right away. If not, it should allow you to work towards a solution by offering candidates for each word and tying the letters together throughout the entire cipher. It happens entirely in your browser, which is why a word list has to be downloaded in order to solve the cipher.

> WARNING: The dictionaries used for this tool are not censored. If you want to provide dictionaries without offensive words, contact me.

Only dictionary words are provided in the drop-down lists, but it is possible that misspelled words, names, and other things can still be decoded.

Each word has a drop-down list holding every dictionary word that still fits. Pick one to assign it as the correct word, and the rest of the cryptogram will inherit those letters, reducing the number of options for the other words. You can change your mind by picking a different word from the same list, or pick "(clear)" at the top of the list to leave that word undecided again. A word shown in bold is one you picked; the others were worked out from the letters you fixed.

<cryptogram-solver></cryptogram-solver>
