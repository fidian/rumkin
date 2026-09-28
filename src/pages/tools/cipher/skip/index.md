---
layout: "@/layouts/cipher-layout.astro"
title: Skip
summary: To decode this, you count N characters, write down the letter, count forward N characters, write down the letter, etc.  It is used for section 3 of the Kryptos.
cipher: true
breadcrumbs:
    - name: Rumkin.com
      href: /
    - name: Web-Based Tools
      href: /tools/
    - name: Ciphers and Codes
      href: /tools/cipher/
---

Ok, I admit that I don't know of an "official" name for this algorithm.  I did hear that it is the same method as what a scytale (pronounced `ˈsitᵊl(ˌ)ē `, like "Sit-a lee") employs.  Basically, if you are given the encrypted text, you start at a given letter and then count N letters (wrapping around from the end to the beginning) forward to the next letter.  It can be used for the third part of the Kryptos sculpture.

If you do use this for decoding Kryptos, you will see that you need to just count every 192<sup>nd</sup> letter.  The "y", "a", and "r" are the three letters that are offset from the rest of the text. Also, the question mark at the end needs to count as a letter, so I changed it to "z". The first example encodes with a skip of 191 (to get every 192<sup>nd</sup> letter) and the second example decodes using a skip of 250 - the same result, showing that this algorithm can be used to encode and decode similarly.

This page will only move letters around by default. That's because moving spaces can cause some problems, especially for decryption. If you want to live dangerously, feel free to enable the option. If you want to know more about the type of problems it causes, check out the example.

Examples:

- <cipher-example label="Kryptos K3" topic="skip" payload-direction="ENCRYPT" payload-alphabet="English" payload-skip="191" payload-offset="191" payload-input="ENDyaHrOHNLSRHEOCPTEOIBIDYSHNAIA
CHTNREYULDSLLSLLNOHSNOSMRWXMNE
TPRNGATIHNRARPESLNNELEBLPIIACAE
WMTWNDITEENRAHCTENEUDRETNHAEOE
TFOLSEDTIWENHAEIOYTEYQHEENCTAYCR
EIFTBRSPAMHHEWENATAMATEGYEERLB
TEEFOASFIOTUETUAEOTOARMAEERTNRTI
BSEDDNIAAHTTMSTEWPIEROAGRIEWFEB
AECTDDHILCEIHSITEGOEAOSDDRYDLORIT
RKLMLEHAGTDHARDPNEOHMGFMFEUHE
ECDMRIPFEIMEHNLSSTTRTVDOHWz" payload-transposition-operating-mode="MOVE_CAPS"></cipher-example> - This uses the "encode" mode to decode the message.
- <cipher-example label="Kryptos K3 With Spaces" topic="skip" payload-direction="DECRYPT" payload-alphabet="English" payload-skip="250" payload-offset="250" payload-input="ENDYAH ROHNLSRHEO CPTEOI BID YSHNAIA CH TNREYUL DSLLSL LNOH SNOSMRWXMN ETP RNGAT IHNR AR PES LNNELEB LPI IACAEWM TWND ITEENRAHC TENEU D RETN H AEOE TFOLSE DT IWE NHAEI OYTE YQHE ENCTAY CRE IFTB RSPAMHHE WEN ATAM A TEGYEE R LBTEEFOA SFI OTUETU AEO TOARMA EE RTN RTI BSE DDNIAAHT TMST EWP IEROAGR IEWFEB AEC TDDHI LC EIHSITE GOE AOSDDRYDL ORITRKL ML EHA GTDH ARDPNE OHMGFMF EUHE ECD MRIP F EIM EHN LSS TTRTVDOH W (z)" payload-transposition-operating-mode="NORMAL"></cipher-example> - Shown as a decrypt example
- <cipher-example label="Spaces Example" topic="skip" payload-direction="ENCRYPT" payload-alphabet="English" payload-skip="4" payload-offset="8" payload-input="You will look here but did you see? Spaces are hiding." payload-transposition-operating-mode="ALL_CHARS"></cipher-example> - Try to copy the encoded text and decode it. If you don't copy the spaces very carefully, the message won't be decoded properly.

<skip-cipher></skip-cipher>
