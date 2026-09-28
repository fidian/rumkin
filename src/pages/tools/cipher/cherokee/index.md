---
layout: "@/layouts/cipher-layout.astro"
title: Cherokee
summary: "Sequoyah's syllabary, the only writing system known to have been invented by someone who could not already read."
code: true
breadcrumbs:
    - name: Rumkin.com
      href: /
    - name: Web-Based Tools
      href: /tools/
    - name: Ciphers and Codes
      href: /tools/cipher/
---

Sequoyah finished this in 1821, having worked on it for twelve years without being able to read English or any other script. Within a few years of its adoption the Cherokee Nation had a higher literacy rate than the settlers around it, and by 1828 it had a newspaper.

**This is not a cipher.** It is a syllabary: each of its eighty-six characters is a whole syllable, not a letter. So it transliterates romanised Cherokee into Sequoyah's characters rather than enciphering English. Type `TSALAGI` and you get ᏣᎳᎩ, three syllables and three characters - that is what the Cherokee call themselves. Type `hello` and you get ᎮlᎶ, because *he* and *lo* are syllables and the *l* in the middle is not.

The one consonant that stands alone is **s**, Ꮝ, which is why `GAWONISGI` comes out as five characters: *ga-wo-ni-s-gi*.

Examples:

-   <cipher-example label="Tsalagi" topic="cherokee" payload-direction="DECRYPT" payload-input="ᏣᎳᎩ"></cipher-example>
-   <cipher-example label="A greeting" topic="cherokee" payload-direction="DECRYPT" payload-input="ᎣᏏᏲ"></cipher-example>

<simple-code code="cherokee" topic="cherokee" label="Romanised Cherokee to write in the syllabary, or the syllabary to read back"></simple-code>

Longest match wins, so `SA` is the single character Ꮜ rather than the standalone *s* followed by *a*.
