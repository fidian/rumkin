---
layout: "@/layouts/cipher-layout.astro"
title: Baudot
summary: "The five-bit telegraph code that ran the world's teleprinters - and that Coldplay put on the cover of X&Y."
code: true
breadcrumbs:
    - name: Rumkin.com
      href: /
    - name: Web-Based Tools
      href: /tools/
    - name: Ciphers and Codes
      href: /tools/cipher/
---

Five bits give thirty-two combinations, which will not hold the letters and the digits at once. So two of the thirty-two are shifts. LTRS and FIGS decide which of two meanings the other thirty carry, exactly like holding down a shift key, and a teleprinter sent one only when the mode had to change. It also meant that a telegram which dropped a single character could come out as gibberish for the rest of the line.

This is properly ITA2, the International Telegraph Alphabet No. 2 of 1924. Emile Baudot's own code of 1870 was a different arrangement, but his name stuck to the idea.

**Coldplay's X&Y sleeve is this code.** Each column of colour blocks is one five-bit character - a block for 1, a gap for 0 - and the colours themselves carry nothing at all. The title is three characters but the sleeve has five columns, because the ampersand lives on the figure shift and so needs a FIGS before it and an LTRS after it to get back to the Y.

Examples:

-   <cipher-example label="X&amp;Y" topic="baudot" payload-direction="DECRYPT" payload-input="10111 11011 01011 11111 10101"></cipher-example>
-   <cipher-example label="A telegram" topic="baudot" payload-direction="DECRYPT" payload-input="01110 11000 01001 01001 00100 11011 00011 11101 11101"></cipher-example>

<simple-code code="baudot" topic="baudot" label="Message to encode or decode"></simple-code>

Bit 1 goes down the wire first and so is written leftmost, which is the reverse of how the code's value reads. That is where hand-copied versions of this table usually go wrong; the published values for the sleeve, X = 10111 and Y = 10101, are what pin it down.

The figure shift here is the American teleprinter arrangement, which is the one with the ampersand on it. International ITA2 puts a pound sign where the hash is, a plus where the quote is, and an equals where the semicolon is.
