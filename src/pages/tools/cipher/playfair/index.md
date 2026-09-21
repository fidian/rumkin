---
title: Playfair
summary: This cipher uses pairs of letters and a 5x5 grid to encode a message.  It is fairly strong for a pencil and paper style code.
cipher: true
js:
    - ../rumkin-cipher.js
    - playfair-module.js
components:
    - className: module
      component: Playfair
    - className: conduit
      component: Conduit
---

The Playfair cipher is a digraph substitution cipher.  It employs a table where one letter of the alphabet is omitted, and the letters are arranged in a 5x5 grid.  Typically, the J is removed from the alphabet and an I takes its place in the text that is to be encoded.  Below is an unkeyed grid.

<div class="D(f) Jc(c)"><pre>A B C D E
F G H I K
L M N O P
Q R S T U
V W X Y Z</pre></div>

To encode a message, one breaks it into two-letter chunks.  Repeated letters in the same chunk are usually separated by an X.  The message, "HELLO JOE" would become "HE LX LO IO EX". The J becomes I and the double LL has an X added.  Also, since the resulting message has an odd number of letters, it is padded with another X. Next, you take your letter pairs and look at their positions in the grid.

"HE" forms two corners of a rectangle.  The other letters in the rectangle are
C and K.  You start with the H and slide over to underneath the E and write
down K.  Similarly, you take the E and slide over to the same column as H in
order to get C.  So, the first two letters are "KC".  "LX" becomes "NV" in the
same way.

"LO" are in the same row.  In this instance, you just slide the characters one position to the right, resulting in "MP".  When there are letters in the same column, like "IO", you would slide down one position and get "OT". If you ever slide past the edge of the square, you loop around.

The resulting message is now "KC NV MP OT CZ" or "KCNVMPOTCZ" if you remove the spaces.

This encoder will do all of the lookups for you. It also preserves punctuation and whitespace, but it starts to get a bit weird when inserting letters between repeats or when adding a letter at the end. For example, the message "HEY!" would chage to "KCZ!X". If you don't want that to happen, include the padding characters manually.

This particular cipher was used by the future U.S. President, John F.
Kennedy, Sr.  He sent a <span class="conduit" data-label="message" data-topic="playfair" data-payload-alphabet="English alphabetKey:ROYALNEWZEALANDNAVY useLastInstance:false reverseKey:false reverseAlphabet:false keyAtEnd:false" data-payload-direction="DECRYPT" data-payload-translations="JI" data-payload-doubles="UNCHANGED" data-payload-input="KX JEYU REB EZW EHEW RYTU HE YFSKRE HE GOYFIWTT TUOLKS YCA JPOBO TE IZONTX BYBW T GONE YC UZWRGD S ONSXBOU YWR HEBAAHYUSED Q"></span> about a boat going down.

<div class="module"></div>
