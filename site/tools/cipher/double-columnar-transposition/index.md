---
title: Double Columnar Transposition
summary: Because two is better than one. This was used by the U.S. Army during World War II.
cipher: true
js:
    - ../rumkin-cipher.js
    - double-columnar-transposition-module.js
components:
    - className: module
      component: DoubleColumnarTransposition
    - className: conduit
      component: Conduit
---

A double transposition, also known as a double columnar transposition, was used by the U.S. Army in World War I, and it is very similar to the German's [Übchi](../ubchi/) code. A double columnar transposition is simply two [columnar transpositions](../columnar-transposition/) in a row.

Examples:

-   <span class="conduit" data-label="Kryptos K3" data-topic="doubleColumnarTransposition" data-payload-direction="DECRYPT" data-payload-alphabet="English" data-payload-first-key="aaaaaaaaaaaaaaaaaaaaa" data-payload-second-key="aaaaaaaaaaaaaaaaaaaaaaaaaaaa" data-payload-dupes-backwards="true" data-payload-column-order="false" data-payload-input="ENDYAHROHNLSRHEOCPTEOIBIDYSHNAIA
    CHTNREYULDSLLSLLNOHSNOSMRWXMNE
    TPRNGATIHNRARPESLNNELEBLPIIACAE
    WMTWNDITEENRAHCTENEUDRETNHAEOE
    TFOLSEDTIWENHAEIOYTEYQHEENCTAYCR
    EIFTBRSPAMHHEWENATAMATEGYEERLB
    TEEFOASFIOTUETUAEOTOARMAEERTNRTI
    BSEDDNIAAHTTMSTEWPIEROAGRIEWFEB
    AECTDDHILCEIHSITEGOEAOSDDRYDLORIT
    RKLMLEHAGTDHARDPNEOHMGFMFEUHE
    ECDMRIPFEIMEHNLSSTTRTVDOHW?"></span>
-   <span class="conduit" data-label="Kryptos K3 With Spaces" data-topic="doubleColumnarTransposition" data-payload-direction="DECRYPT" data-payload-alphabet="English" data-payload-first-key="aaaaaaaaaaaaaaaaaaaaa" data-payload-second-key="aaaaaaaaaaaaaaaaaaaaaaaaaaaa" data-payload-dupes-backwards="true" data-payload-column-order="false" data-payload-input="ENDYAH ROHNLSRHEO CPTEOI BID YSHNAIA CH TNREYUL DSLLSL LNOH SNOSMRWXMN ETP RNGAT IHNR AR PES LNNELEB LPI IACAEWM TWND ITEENRAHC TENEU D RETN H AEOE TFOLSE DT IWE NHAEI OYTE YQHE ENCTAY CRE IFTB RSPAMHHE WEN ATAM A TEGYEE R LBTEEFOA SFI OTUETU AEO TOARMA EE RTN RTI BSE DDNIAAHT TMST EWP IEROAGR IEWFEB AEC TDDHI LC EIHSITE GOE AOSDDRYDL ORITRKL ML EHA GTDH ARDPNE OHMGFMF EUHE ECD MRIP F EIM EHN LSS TTRTVDOH W (?)"></span>

<div class="module"></div>
