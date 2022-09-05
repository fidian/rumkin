---
title: K1 - Vigenère (PALIMPSEST)
summary: Investigation into the top portion of the Kryptos cipher
---

This is the top portion of the Kryptos cipher text.

<div class="Bdw(1px) Bgc(#ddd) P(0.5em) Whs(pl) My(0.5em)"><tt>
EMUFPHZLRFAXYUSDJKZLDKRNSHGNFIVJ<br/>
YQTQUXQBQVYUVLLTREVJYQTMKYRDMFD<br/>
VFPJUDEEHZWETZYVGWHKKQETGFQJNCE<br/>
GGWHKK?DQMCPFQZDQMMIAGPFXHQRLG<br/>
TIMVMZJANQLVKQEDAGDVFRPJUNGEUNA<br/>
QZGZLECGYUXUEENJTBJLBQCRTBJDFHRR<br/>
YIZETKZEMVDUFKSJHKFWHKUWQLSZFTI<br/>
HHDDDUVH?DWKBFUFPWNTDFIYCUQZERE<br/>
EVLDKFEZMOQQJLTTUGSYQPFEUNLAVIDX<br/>
FLGGTEZ?FKZBSFDQVGOGIPUFXHHDRKF<br/>
FHQNTGPUAECNUVPDJMQCLQUMUNEDFQ<br/>
ELZZVRRGKFFVOEEXBDMVPNFQXEZLGRE<br/>
DNQFMPNZGLFLPMRJQYALMGNUVPDXVKP<br/>
DQUMEBEDMHDAFMJGZNUPLGEWJLLAETG
</tt></div>

The first clue to decrypting this message is on the other side of the statue. There's a tableau of letters, which looks like a normal tableau with the alphabet keyed with "KRYPTOS". If you decode this as a [Vigenère cipher](../../../tools/cipher/vigenere/) and set the alphabet key as "KRYPTOS", then the next hard part is to figure out the cipher key. Well, it turns out that a statistical analysis of the letter frequencies indicate a cipher key of 8 letters. If you kept at it, you would find that [K2](../k2/) would be decoded first and the top two rows of text would not decode correctly.

Separating the top two lines from [K2](../k2/), you get this.

<div class="Bdw(1px) Bgc(#ddd) P(0.5em) Whs(pl) My(0.5em)"><tt>
EMUFPHZLRFAXYUSDJKZLDKRNSHGNFIVJ<br/>
YQTQUXQBQVYUVLLTREVJYQTMKYRDMFD
</tt></div>

Frequency analysis isn't as helpful, but it is possible to determine that the length of the keyword is 10 characters, and from there you could work out "PALIMPSEST". Decoding it produces this.

<div class="Bdw(1px) Bgc(#ddd) P(0.5em) Whs(pl) My(0.5em)"><tt>
BETWEENSUBTLESHADINGANDTHEABSENC<br/>
EOFLIGHTLIESTHENUANCEOFIQLUSION
</tt></div>

With spaces and punctuation, it becomes this:

> Between subtle shading and the absence of light lies the nuance of iqlusion.

Sanborn has indicated to Elonka that the misspelled character in "illusion" is intentional. "Those errors are deliberate. It's not *what* they are that's so important though, as their orientation or positioning."


## Threads

`PALIMPSEST` is writing material where the original writing was scraped away in order to be used again, but where traces of the original writing remain.


## Open Questions

* Why is "illusion" misspelled as "ilqlusion"? Should the cipher text look like <tt>YQTQUXQBQVYUVLLTREVJYQTM<b>W</b>YRDMFD</tt>?
