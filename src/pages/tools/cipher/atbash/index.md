---
layout: "@/layouts/cipher-layout.astro"
title: Atbash
summary: A very simplistic cipher where you change A to Z, B to Y, and so on.
code: true
breadcrumbs:
    - name: Rumkin.com
      href: /
    - name: Web-Based Tools
      href: /tools/
    - name: Ciphers and Codes
      href: /tools/cipher/
---

The Atbash cipher is a very common and simple cipher that simply encodes a message with the reverse of the alphabet. Initially it was used with Hebrew. Basically, when encoded, an "A" becomes a "Z", "B" turns into "Y", etc.

The Atbash cipher can be implemented as an [Affine cipher](../affine/) by setting both `a` and `b` to 25 (the alphabet length minus 1).

Examples:

-   <cipher-example label="Practical Cryptography" topic="atbash" payload-alphabet="English" payload-direction="DECRYPT" payload-input="ZGGZXP ZG WZDM"></cipher-example>

<simple-code code="atbash" topic="atbash" symmetric with-alphabet verbs="cipher"></simple-code>
