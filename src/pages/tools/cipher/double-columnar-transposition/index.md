---
layout: "@/layouts/cipher-layout.astro"
title: Double Columnar Transposition
summary: Because two is better than one. This was used by the U.S. Army during World War II.
cipher: true
breadcrumbs:
    - name: Rumkin.com
      href: /
    - name: Web-Based Tools
      href: /tools/
    - name: Ciphers and Codes
      href: /tools/cipher/
---

A double transposition, also known as a double columnar transposition, was used by the U.S. Army in World War I, and it is very similar to the German's [Übchi](../ubchi/) code. A double columnar transposition is simply two [columnar transpositions](../columnar-transposition/) in a row.

Examples:

-   <cipher-example label="Kryptos K3" topic="doubleColumnarTransposition" payload-direction="DECRYPT" payload-alphabet="English" payload-first-key="aaaaaaaaaaaaaaaaaaaaa" payload-second-key="aaaaaaaaaaaaaaaaaaaaaaaaaaaa" payload-dupes-backwards="true" payload-column-order="false" payload-input="ENDYAHROHNLSRHEOCPTEOIBIDYSHNAIA
CHTNREYULDSLLSLLNOHSNOSMRWXMNE
TPRNGATIHNRARPESLNNELEBLPIIACAE
WMTWNDITEENRAHCTENEUDRETNHAEOE
TFOLSEDTIWENHAEIOYTEYQHEENCTAYCR
EIFTBRSPAMHHEWENATAMATEGYEERLB
TEEFOASFIOTUETUAEOTOARMAEERTNRTI
BSEDDNIAAHTTMSTEWPIEROAGRIEWFEB
AECTDDHILCEIHSITEGOEAOSDDRYDLORIT
RKLMLEHAGTDHARDPNEOHMGFMFEUHE
ECDMRIPFEIMEHNLSSTTRTVDOHW?"></cipher-example>
-   <cipher-example label="Kryptos K3 With Spaces" topic="doubleColumnarTransposition" payload-direction="DECRYPT" payload-alphabet="English" payload-first-key="aaaaaaaaaaaaaaaaaaaaa" payload-second-key="aaaaaaaaaaaaaaaaaaaaaaaaaaaa" payload-dupes-backwards="true" payload-column-order="false" payload-input="ENDYAH ROHNLSRHEO CPTEOI BID YSHNAIA CH TNREYUL DSLLSL LNOH SNOSMRWXMN ETP RNGAT IHNR AR PES LNNELEB LPI IACAEWM TWND ITEENRAHC TENEU D RETN H AEOE TFOLSE DT IWE NHAEI OYTE YQHE ENCTAY CRE IFTB RSPAMHHE WEN ATAM A TEGYEE R LBTEEFOA SFI OTUETU AEO TOARMA EE RTN RTI BSE DDNIAAHT TMST EWP IEROAGR IEWFEB AEC TDDHI LC EIHSITE GOE AOSDDRYDL ORITRKL ML EHA GTDH ARDPNE OHMGFMF EUHE ECD MRIP F EIM EHN LSS TTRTVDOH W (?)"></cipher-example>

<double-columnar-cipher></double-columnar-cipher>
