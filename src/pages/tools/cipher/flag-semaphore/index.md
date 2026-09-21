---
title: Flag Semaphore
summary: Signaling messages using flags, often from ship to ship.
code: true
css:
    - index.css
js:
    - ../rumkin-cipher.js
    - flag-semaphore-module.js
components:
    - className: module
      component: FlagSemaphore
---

Semaphore is an evolution of the [optical telegraph](https://en.wikipedia.org/wiki/Optical_telegraph), which was used to send messages across vast distances.

The name "semaphore" also can refer to signaling with a light or other means. This encoder uses the flag method and does a very basic translation of characters. When signaling, you should signal Error or Attention. During sending, the receiver will signal "C" with each word properly received, or "E" if there was a problem. When problems are detected or when cancel is received, then the entire previous word is repeated. Double letters should get a very brief space inserted. Switch to numbers by using a "#" in front. Switch back to letters with "J".

These images show the sender, and need to be reversed when you are the transmitter. So, the letter "B" is signaled by raising your *right* hand halfway up. Also, the letters A-I plus K are used for 1-9 and 0 (the letter J was added later).

The font is a modified version of [Semaphore Pramuka](https://www.whatfontis.com/FF_Semaphore-Pramuka.font). This version uses "!" for error/attention, a space for the rest symbol and to split double letters, tilde or slashes for cancel.

<div class="module"></div>
