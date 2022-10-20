---
title: Morse Code
summary: Once used to transmit messages around the world, this system can still be used in certain situations to send messages effectively when alternate mediums are not available.
cipher: true
js:
    - ../rumkin-cipher.js
    - morse-module.js
components:
    - className: module
      component: Morse
    - className: morseTable
      component: MorseTable
    - className: conduit
      component: Conduit
---

Morse Code, created by Samuel Morse, was designed to transmit letters across telegrams.  He wanted frequently used letters to have short codes and less frequently used letters to have longer codes to make transmission faster.  It has since been used in many other situations.  For a lot more information, visit [Wikipedia](http://www.wikipedia.org/wiki/Morse_code).

When you encode messages, typically one will leave out punctuation. When decoding, only periods and hyphens will be decoded and the rest will be left as-is. This site uses International Morse Code with some additional enhancements. There's also a few tools to help you decode snippets you find by allowing you to reverse the input (flipping the text backwards) and swapping periods and hyphens.

One of the more famous places that utilizes Morse Code is the Kryptos statue. Check out [photos of the sculpture](http://www.voynich.net/Kryptos/). This sculpture has several messages that can be entered into this decoder. <span class="conduit" data-label="SOS" data-topic="morse" data-payload-direction="DECRYPT" data-payload-input="... --- ..."></span> (this is sent as the [prosign](https://en.wikipedia.org/wiki/Prosigns_for_Morse_code)), <span class="conduit" data-label="RQ" data-topic="morse" data-payload-direction="DECRYPT" data-payload-input=".-. --.-"></span>, <span class="conduit" data-label="SHADOW FORCES" data-topic="morse" data-payload-direction="DECRYPT" data-payload-input=". / . / ... .... .- -.. --- .-- / . / .
..-. --- .-. -.-. . ... / . / . / . / . / ."></span>, <span class="conduit" data-label="VIRTUALLY INVISIBLE" data-topic="morse" data-payload-direction="DECRYPT" data-payload-input=". / . / ...- .. .-. - ..- .- .-.. .-.. -.-- .
. / . / . / . / . / .. -. ...- .. ... .. -... .-.. . /"></span> (the extra E at the end of VIRTUALLY doesn't have a large enough gap to make it a separate word), <span class="conduit" data-label="...T IS YOUR POSITION" data-topic="morse" data-payload-direction="DECRYPT" data-payload-input="- / .. ... / -.-- --- ..- .-.
.--. --- ... .. - .. --- -. / ."></span>, <span class="conduit" data-label="DIGETAL INTERPRETATIT" data-topic="morse" data-payload-direction="DECRYPT" data-payload-input=". / -.. .. --. . / - .- .-.. / . / . / .
.. -. - . .-. .--. .-. . - .- - .. -"></span>, and <span class="conduit" data-label="LUCID MEMORY" data-topic="morse" data-payload-direction="DECRYPT" data-payload-input=".-.. ..- -.-. .. -.. / . / . / .
/ -- . -- --- .-. -.-- / . /"></span>. If this thing interests you, there's an [expanded page](../../../reference/kryptos/k0/) with more info.

<div class="module"></div>

Here are all of the letters I understand, followed by all of the prosigns and more complicated meanings.

<div class="morseTable"></div>
