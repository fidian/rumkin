---
title: Gold Bug
summary: A substitution cipher from an Edgar Allan Poe short story.
code: true
js:
    - ../rumkin-cipher.js
    - gold-bug-module.js
components:
    - className: module
      component: GoldBug
    - className: conduit
      component: Conduit
---

Published in 1843, *The Gold-Bug* is a short story from Edgar Allan Poe about a gentleman that was bitten by a gold-colored bug and follows a secret message that would lead to a buried treasure.

The "Gold Bug" symbols never had symbols for J, K, Q, W, X, and Z.  In their place, I decided upon the symbols based on others that I saw in the code (there was a ] but not a [ symbol) and what I saw on pictures of old typewriters.  Apparently, I made good choices because this was later copied by [dCode](https://www.dcode.fr/gold-bug-poe).

Examples:

* <span class="conduit" data-label="Secret Message" data-topic="goldBug" data-payload-direction="DECRYPT" data-payload-input="53‡‡†305))6*;4826)4‡.)4‡);80
6*;48†8¶60))85;1‡(;:‡*8†83(88)
5*†;46(;88*96*?;8)*‡(;485);5*†
2:*‡(;4956*2(5*-4)8¶8*;40692
85);)6†8)4‡‡;1(‡9;48081;8:8‡1
;48†85;4)485†528806*81(‡9;48
;(88;4(‡?34;48)4‡;161;:188;‡?;"></span> - From the short story.
* <span class="conduit" data-label="More Readable Version" data-topic="goldBug" data-payload-direction="DECRYPT" data-payload-input="5 3‡‡† 305)) 6* ;48 26)4‡.') 4‡);80 6* ;48 †8¶60') )85;
1‡(;: ‡*8 †83(88) 5*† ;46(;88* 96*?;8) *‡(;4 85); 5*† 2: *‡(;4
956* 2(5*-4 )8¶8*;4 0692 85); )6†8
)4‡‡; 1(‡9 ;48 081; 8:8 ‡1 ;48 †85;4') 485†
5 288 06*8 1(‡9 ;48 ;(88 ;4(‡?34 ;48 )4‡; 161;: 188; ‡?;"></span> - Added spaces between words and a little punctuation.

<div class="module"></div>
