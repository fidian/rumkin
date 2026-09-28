---
layout: "@/layouts/cipher-layout.astro"
title: Gronsfeld
summary: "This operates very similar to a Vigenère cipher, but uses numbers instead of a key word."
cipher: true
breadcrumbs:
    - name: Rumkin.com
      href: /
    - name: Web-Based Tools
      href: /tools/
    - name: Ciphers and Codes
      href: /tools/cipher/
---

The Gronsfeld cipher is essentially a [Vigenère](../vigenere/) cipher, but uses numbers instead of letters. So, a Gronsfield key of 0123 is the same as a Vigenère key of ABCD. This online version lets you encode and decode messages with a keyed alphabet as well, to allow for maximum flexibility.

Examples:

-   <cipher-example label="Boxentriq" topic="gronsfeld" payload-direction="DECRYPT" payload-alphabet="English alphabetKey: useLastInstance:false reverseKey:false reverseAlphabet:false keyAtEnd:false" payload-cipher-key="321810" payload-input="wjbb xion cm b hdte kmipd tijd wjf adaugdzpw ewu ef mxuu oft rxfz uhh jjtm nhxfzuhhnfat sr jf tfd wjf eby dpe bie rvimss iqmtpwhf" payload-autokey="false"></cipher-example>

<gronsfeld-cipher></gronsfeld-cipher>
