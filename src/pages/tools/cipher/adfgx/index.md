---
layout: "@/layouts/cipher-layout.astro"
title: ADFGX and ADFGVX
summary: "The German field cipher of 1918: a square turns each letter into two, then a transposition pulls the halves apart."
cipher: true
breadcrumbs:
    - name: Rumkin.com
      href: /
    - name: Web-Based Tools
      href: /tools/
    - name: Ciphers and Codes
      href: /tools/cipher/
---

Germany put ADFGX on the air in March 1918, weeks before the Spring Offensive, and added a sixth letter that June. It is two ciphers stacked, and that is the whole idea - break either half on its own and you have nothing.

**First, fractionation.** Every letter is looked up in a square and replaced by its row and column labels, which doubles the length of the message. The labels are the letters A, D, F, G and X, picked because they are far apart in Morse and so survive a bad radio link. ADFGVX adds V and uses a 6x6 square, which has room for the ten digits as well.

**Then, transposition.** That doubled text is written under a keyword and the columns are read out in the keyword's alphabetical order. This is what does the damage: the two halves of a single letter end up in different columns, far apart in the message.

Georges Painvin broke it in June 1918, on a message that came to be called the Radiogram of Victory, and by his own account lost fifteen kilos doing it.

Real squares were shuffled rather than built from a keyword, so you can paste one in below. Leave it blank and the alphabet is keyed instead.

Examples:

-   <cipher-example label="ADFGX" topic="adfgx" payload-direction="DECRYPT" payload-digits="false" payload-square="BTALPDHOZKQFVSNGICUXMREWY" payload-key="" payload-transposition-key="CARGO" payload-input="FAXDF ADDDG DGFFF AFAX AFAFX"></cipher-example>
-   <cipher-example label="ADFGVX, with digits" topic="adfgx" payload-direction="DECRYPT" payload-digits="true" payload-square="NA1C3H8TB2OME5WRPD4F6G7I9J0KLQSUVXYZ" payload-key="" payload-transposition-key="PRIVACY" payload-input="DGDD DAGD DGAF ADDF DADV DVFA ADVX"></cipher-example>

<adfgx-cipher></adfgx-cipher>

The 5x5 square has no room for J, which shares a cell with I, so a J comes back as an I. The 6x6 square has room for both. Anything with no cell at all - punctuation, spaces - is dropped, because a transposition has nowhere to keep it.
