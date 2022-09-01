---
title: Rail Fence
summary: A mildly complicated one where you align letters on different rows and then squish the letters together in order to create your ciphertext.
cipher: true
js:
    - ../rumkin-cipher.js
    - rail-fence-module.js
components:
    - className: module
      component: RailFence
    - className: conduit
      component: Conduit
---

When you rearrange your text in a "wave" sort of pattern (down, down, up, up, down, down, etc.), it is called a rail fence. Take the text "WAFFLES FOR BREAKFAST" and arrange them in waves like the diagram below. Note that spaces are removed.

<p><tt>
W&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;O&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A<br>
&nbsp;A&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;F&nbsp;R&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;F&nbsp;S<br>
&nbsp;&nbsp;F&nbsp;&nbsp;&nbsp;S&nbsp;&nbsp;&nbsp;B&nbsp;&nbsp;&nbsp;K&nbsp;&nbsp;&nbsp;T<br>
&nbsp;&nbsp;&nbsp;F&nbsp;E&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;R&nbsp;A<br>
&nbsp;&nbsp;&nbsp;&nbsp;L&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;E
</tt></p>

Next, squish together the lines. I added a space between each of the condensed lines.

<p><tt>WOA AFRFS FSBKT FERA LE</tt></p>

When you use this cipher tool, the original spaces and punctuation are preserved. Only letters are shuffled and everything else will remain where it was.

Examples:

-   <span class="conduit" data-label="My Example" data-topic="railFence" data-payload-direction="ENCRYPT" data-payload-alphabet="English" data-payload-rails="5" data-payload-offset="0" data-payload-input="WAFFLES FOR BREAKFAST"></span>
-   <span class="conduit" data-label="Battlefield" data-topic="railFence" data-payload-direction="DECRYPT" data-payload-alphabet="English" data-payload-rails="5" data-payload-offset="0" data-payload-input="LLEOILUANVE TMSGES AINUTE"></span> - This is the reversed form of the morse code message "ETUNIASEGSMTEVNAULIOELL".

<div class="module"></div>
