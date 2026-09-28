---
layout: "@/layouts/cipher-layout.astro"
title: Runes
summary: "Write English in the Anglo-Saxon futhorc, the rune row that grew to fit the language."
code: true
breadcrumbs:
    - name: Rumkin.com
      href: /
    - name: Web-Based Tools
      href: /tools/
    - name: Ciphers and Codes
      href: /tools/cipher/
---

Elder Futhark has twenty-four runes and no *c*, *q*, *v*, *x* or *z*. That is fine for Proto-Germanic and awkward for English, which is why the rune row used in England grew: the Anglo-Saxon futhorc reached thirty-three characters, adding runes for the sounds Old English actually had.

This uses futhorc. Two of its runes are worth knowing about:

-   **Thorn**, ᚦ, is a single rune for *th*. It survived into written English long after the runes went, which is why an eighteenth-century sign painter's `ye olde` is really *the olde* - the `y` is a thorn the printer had no type for.
-   **Ing**, ᛜ, is a single rune for *ng*.

So `THE KING` is five runes, not seven.

Three letters futhorc never had - *v*, *x* and *z* - are written with Unicode's own dedicated runic letters, which keeps every letter distinct and the page reversible.

Examples:

-   <cipher-example label="Thorn and ing" topic="runes" payload-direction="DECRYPT" payload-input="ᚦᛖ ᛣᛁᛜ"></cipher-example>
-   <cipher-example label="A longer one" topic="runes" payload-direction="DECRYPT" payload-input="ᚱᚢᚾᛖᛋ ᚹᛖᚱᛖ ᚳᚢᛏ"></cipher-example>

<simple-code code="runes" topic="runes" label="Message to write in runes, or runes to read back"></simple-code>

Runes are all straight lines because they were carved. A curve is hard work in wood, and a horizontal stroke would vanish into the grain, so futhorc has neither.
