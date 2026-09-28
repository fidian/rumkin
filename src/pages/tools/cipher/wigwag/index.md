---
layout: "@/layouts/cipher-layout.astro"
title: Wig-Wag
summary: "Myer's one-flag aerial telegraph, waved across the battlefields of the American Civil War."
code: true
breadcrumbs:
    - name: Rumkin.com
      href: /
    - name: Web-Based Tools
      href: /tools/
    - name: Ciphers and Codes
      href: /tools/cipher/
---

Albert Myer worked out a signalling system for a single flag and got it adopted in 1860; by 1861 both sides were using it. Semaphore needs two flags and a clear view of both; wig-wag needs one flag, or a kerosene torch at night, and a hilltop.

The flag starts upright. A sweep to the sender's left and back is a **1**; a sweep to the right and back is a **2**. A dip to the front is a **3**, and marks the end of something: one for the end of a word, two for the end of a sentence, three for the end of the message.

Each letter is a short run of 1s and 2s - I is a single 1, T is a single 2, A is 22. Those codes are not prefix free, so the pause between letters is doing real work; without it, `1 2` and `12` are both readable and mean different things. Here that pause is a space.

Each numeral is five motions, which keeps them clear of every letter, and each also doubles as an instruction to the other station: 1 means *wait*, 6 means *send faster*, 7 means *did you understand?*

The codes below are the General Service Code of July 1864. Myer's original had the 1 and the 2 the other way round.

Examples:

-   <cipher-example label="ATTACK AT DAWN" topic="wigwag" payload-direction="DECRYPT" payload-input="22 2 2 22 121 2121 3 22 2 3 222 22 1121 11 333"></cipher-example>
-   <cipher-example label="A short one" topic="wigwag" payload-direction="DECRYPT" payload-input="1 2 333"></cipher-example>

<wigwag-code></wigwag-code>

Wig-wag was read as easily by the enemy as by the station it was meant for, which is why a message sent this way was usually enciphered first.
