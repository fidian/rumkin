---
layout: "@/layouts/cipher-layout.astro"
title: Trifid
summary: "Delastelle, 1902. Bifid in three dimensions, so each letter has three coordinates instead of two."
cipher: true
breadcrumbs:
    - name: Rumkin.com
      href: /
    - name: Web-Based Tools
      href: /tools/
    - name: Ciphers and Codes
      href: /tools/cipher/
---

Felix Delastelle published the [bifid cipher](../bifid/) in 1895 and this one in 1902. Bifid puts the alphabet in a square and gives every letter two coordinates. Trifid puts it in a 3x3x3 cube and gives every letter three - which needs 27 cells for 26 letters, so a twenty-seventh character comes along for the ride, traditionally a `+`.

A group of letters is written out as three rows of coordinates, one row per dimension, and then read back across those rows in threes. Each ciphertext letter therefore takes one coordinate from three different plaintext letters. Change one letter of the plaintext and three letters of the ciphertext move.

The group size is the period. A longer period spreads each letter's influence further and makes the cipher stronger, which is why the period is the first thing anyone attacking it wants to know.

Examples:

-   <cipher-example label="Delastelle's own" topic="trifid" payload-direction="DECRYPT" payload-square="FELIXMARDSTBCGHJKNOPQUVWYZ+" payload-key="" payload-period="5" payload-input="FMJFV OISSU FTFPU FEQQC"></cipher-example>
-   <cipher-example label="The same message, period 10" topic="trifid" payload-direction="DECRYPT" payload-square="FELIXMARDSTBCGHJKNOPQUVWYZ+" payload-key="" payload-period="10" payload-input="FMFKOIIRSUFSFILJYKLC"></cipher-example>

<trifid-cipher></trifid-cipher>

Delastelle's example enciphers *aide-toi, le ciel t'aidera* - heaven helps those who help themselves.
