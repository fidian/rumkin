---
layout: "@/layouts/cipher-layout.astro"
title: "Übchi"
summary: A double columnar transposition cipher that uses the same key, but adds a number of pad characters.  Used by the Germans in World War I.
cipher: true
breadcrumbs:
    - name: Rumkin.com
      href: /
    - name: Web-Based Tools
      href: /tools/
    - name: Ciphers and Codes
      href: /tools/cipher/
---

During World War I, the Germans used a double columnar transposition cipher called Übchi ("ubchi" with umlauts). For a bit more information about columnar transposition ciphers, see [that cipher's page](../columnar-transposition/). This method is surprisingly similar to the U.S. Army's [double columnar transposition](../double-columnar-transposition/), also used during World War I.

Examples:

-   <cipher-example label="dCode" topic="ubchi" payload-direction="DECRYPT" payload-alphabet="English" payload-column-order="false" payload-dupes-backwards="false" payload-column-key="UBER" payload-input="TECXRES" payload-pad-character="X"></cipher-example>

<ubchi-cipher></ubchi-cipher>
