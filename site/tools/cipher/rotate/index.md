---
title: Rotate
summary: This acts as though you are writing the letters in a rectangular grid and then rotating the grid to the left or right 90°
cipher: true
js:
    - ../rumkin-cipher.js
    - rotate-module.js
components:
    - className: module
      component: Rotate
    - className: conduit
      component: Conduit
---


https://kryptosfan.wordpress.com/k3/k3-solution-3/

This cipher is pretty simple.  Basically, you would write all of the
letters in a grid, then rotate the grid 90&deg; and read the characters back
out.  I first heard of this method when Mike posted to the Kryptos Group mailing list.
I liked the method and decided to write up a neat little encoder, which can be used to decode K3.

To decode K3, press the button to insert the text and do the initial rotate. Copy the result and paste it into the input area and change the width to 8 and you will see the secret message.

Only letters are rotated. Extra padding will be added if the width of the table doesn't divide evenly into the number of letters.

- <span class="conduit" data-label="Kryptos K3" data-topic="rotate" data-payload-direction="CLOCKWISE" data-payload-alphabet="English" data-payload-width="24" data-payload-input="ENDyaHrOHNLSRHEOCPTEOIBIDYSHNAIA
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
- <span class="conduit" data-label="Kryptos K3 With Spaces" data-topic="rotate" data-payload-direction="CLOCKWISE" data-payload-alphabet="English" data-payload-width="24" data-payload-input="ENDYAH ROHNLSRHEO CPTEOI BID YSHNAIA CH TNREYUL DSLLSL LNOH SNOSMRWXMN ETP RNGAT IHNR AR PES LNNELEB LPI IACAEWM TWND ITEENRAHC TENEU D RETN H AEOE TFOLSE DT IWE NHAEI OYTE YQHE ENCTAY CRE IFTB RSPAMHHE WEN ATAM A TEGYEE R LBTEEFOA SFI OTUETU AEO TOARMA EE RTN RTI BSE DDNIAAHT TMST EWP IEROAGR IEWFEB AEC TDDHI LC EIHSITE GOE AOSDDRYDL ORITRKL ML EHA GTDH ARDPNE OHMGFMF EUHE ECD MRIP F EIM EHN LSS TTRTVDOH W (?)"></span>

<div class="module"></div>
