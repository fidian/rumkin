---
title: K2 - Vigenère (ABSCISSA)
summary: Decrypting the bottom of the top half of Kryptos
---

Here is the upper portion of the cipher text on the Kryptos statue.

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

When trying to decrypt [K1](../k1/), it is possible that you would perform a letter frequency analysis and determine that the key has a length of 8 letters. If you keep working the cipher and use the tableau to the right as a clue, you will find out that it's a [Vigenère cipher](../../../tools/cipher/vigenere/) with an alphabet key of "KRYPTOS" to match the tableau, and a cipher key of "ABSCISSA". When done, you will not be able to decrypt the first two lines, so those would get split off and become [K1](../k1/).

Removing the top two lines from the cipher will give you this portion, commonly referred to as K2.

<div class="Bdw(1px) Bgc(#ddd) P(0.5em) Whs(pl) My(0.5em)"><tt>
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

When decoding with the keyword of "ABSCISSA" you will get this message.

<div class="Bdw(1px) Bgc(#ddd) P(0.5em) Whs(pl) My(0.5em)"><tt>
ITWASTOTALLYINVISIBLEHOWSTHATPO<br/>
SSIBLE?THEYUSEDTHEEARTHSMAGNET<br/>
ICFIELDXTHEINFORMATIONWASGATHER<br/>
EDANDTRANSMITTEDUNDERGRUUNDTOANU<br/>
NKNOWNLOCATIONXDOESLANGLEYKNOWA<br/>
BOUTTHIS?THEYSHOULDITSBURIEDOUT<br/>
THERESOMEWHEREXWHOKNOWSTHEEXACTL<br/>
OCATION?ONLYWWTHISWASHISLASTMES<br/>
SAGEXTHIRTYEIGHTDEGREESFIFTYSE<br/>
VENMINUTESSIXPOINTFIVESECONDSNO<br/>
RTHSEVENTYSEVENDEGREESEIGHTMINU<br/>
TESFORTYFOURSECONDSWESTIDBYROWS
</tt></div>

Sanborn has [given the clue](https://elonka.com/kryptos/CorrectedK2Announcement.html) that the end should not have read "ID by rows" and it was his intent to have the last bit come out as garbage characters. When you change the last line to <tt>DQUMEBEDMHDAFMJGZNUPLGE<b>S</b>WJLLAETG</tt>, it decodes the last line as `TESFORTYFOURSECONDSWESTXLAYERTWO`. Sanborn was presented the corrected K2 solution (with `... SECONDS WEST X LAYER TWO` and confirmed it is correct.

Sanborn has also stated to Elonka that "undergruund" is an intentional misspelling. "Those errors are deliberate. It's not *what* they are that's so important though, as their orientation or positioning."

With spaces and punctuation, it becomes a little easier to read. Also, this appears to be a conversation between two parties that switches perspective on punctuation and `X`, so I split the message to read like dialog.

> It was totally invisible! How's that possible?
>
> They used the Earth's magnetic field. X
>
> The information was gathered and transmitted undergruund to an unknown location. X
>
> Does Langley know about this?
>
> They should. It's buried out there somewhere. X
>
> Who knows the exact location?
>
> Only WW. This was his last message: X
>
> "thirty-eight degrees, fifty-seven minutes, six point five seconds north; seventy-seven degrees, eight minutes, forty-four seconds west. X
>
> Layer two.

Sanborn confirmed that WW is William Webster, the Director of the CIA at the time Kryptos was installed.

The coordinates are about 100 feet southeast of the sculpture. Sanborn used a [benchmark disk](https://interred2.rssing.com/chan-1312950/all_p3.html) for a reference point. From the [Geocaching Forums](https://forums.geocaching.com/GC/index.php?/topic/328615-missing-benchmark-that-may-relate-to-the-kryptos-mystery/),

> Jim said that the thing that was buried out there was the USGA marker. He also noted he was out there recently and it's gone now. He said that marker is how he paced off the location of the coordinates."
>
> If accurate, that detail would explain why none of our numbers have lined up with the coordinates on the sculpture -- the artist, a man who said he doesn't like math, paced them off starting from the mystery marker.


## Threads

`ABSCISSA` is the distance from a point to the vertical, or y-axis. It's the same as the x coordinate.


## Open Questions

* Should the cipher text change to <tt>QZGZLECGYUXUEENJTBJLBQC<b>E</b>TBJDFHRR</tt> so the message reads as "underground"?

* Does the identity of WW actually matter?

* How accurate are the coordinates given? Was the original location for the sculpture moved? Did Sanborn get close enough with maps and wanted to just point back to Kryptos? [Gecaching Forums](https://forums.geocaching.com/GC/index.php?/topic/328615-missing-benchmark-that-may-relate-to-the-kryptos-mystery/) talks about coordinate systems. Sanborn [also mentioned](http://scirealm.org/KryptosHints.html) the coordinates could be one of two different locations, either Xenon's spot or one near the front entrance area.
