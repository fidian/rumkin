---
title: Übchi
summary: A double columnar transposition cipher that uses the same key, but adds a number of pad characters.  Used by the Germans in World War I.
cipher: true
js:
    - ../rumkin-cipher.js
    - ./ubchi-module.js
components:
    - className: module
      component: Ubchi
    - className: conduit
      component: Conduit
---

During World War I, the Germans used a double columnar transposition cipher called Übchi ("ubchi" with umlauts). For a bit more information about columnar transposition ciphers, see [that cipher's page](../columnar-transposition/). This method is surprisingly similar to the U.S. Army's [double columnar transposition](../double-columnar-transposition/), also used during World War I.

Examples:

-   <span class="conduit" data-label="dCode" data-topic="ubchi" data-payload-direction="DECRYPT" data-payload-alphabet="English" data-payload-column-order="false" data-payload-dupes-backwards="false" data-payload-column-key="UBER" data-payload-input="TECXRES" data-payload-pad-character="X"></span>

<div class="module"></div>
