---
title: Bifid
summary: Breaks information for each letter up and spreads it out in the encoded message. An easy and fairly secure pencil & paper cipher.
cipher: true
js:
    - ../rumkin-cipher.js
    - bifid-module.js
components:
    - className: module
      component: Bifid
    - className: conduit
      component: Conduit
---

The Bifid cipher is considered a more secure cipher because it breaks the message apart into two separate streams and then recombines them. This spreads the information out to multiple letters, increasing security. It uses a table with one letter of the alphabet omitted. Often the J is removed and people just use an I instead. Below is an unkeyed grid.

<div class="D(f) Jc(c)"><pre>A B C D E
F G H I K
L M N O P
Q R S T U
V W X Y Z</pre></div>

To encode a message, you would write your message, "ABCD", then you would figure out the row and column for each letter and write them below the letters, like the example shows. Then you read the numbers off; all of the rows first and then all of the columns. Using this string of numbers, you then look up the letters on the table again and get the encoded message.

<div class="D(f) Jc(c)"><pre>letter: A B C D
   row: 1 1 1 1
column: 1 2 3 4<br>
The numbers: 1 1 1 1 1 2 3 4
    Encoded:  A   A   B   O</pre></div>

All non-letters are ignored and not encoded. The one skipped letter will be automatically translated if you type it in the box. Numbers, spaces, and punctuation will remain in place and will not be encoded.

Examples:

-   <span class="conduit" data-label="Wikipedia" data-topic="bifid" data-payload-alphabet="English alphabetKey:BGWKZQPNDSIOAXEFCLUMTHYVR useLastInstance:false reverseKey:false reverseAlphabet:false keyAtEnd:false" data-payload-direction="DECRYPT" data-payload-input="UAEOLWRINS" data-payload-translations="JI"></span>

<div class="module"></div>
