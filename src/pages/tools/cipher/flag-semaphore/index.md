---
layout: "@/layouts/cipher-layout.astro"
title: Flag Semaphore
summary: Signaling messages using flags, often from ship to ship.
code: true
breadcrumbs:
    - name: Rumkin.com
      href: /
    - name: Web-Based Tools
      href: /tools/
    - name: Ciphers and Codes
      href: /tools/cipher/
---

Semaphore is an evolution of the [optical telegraph](https://en.wikipedia.org/wiki/Optical_telegraph), which was used to send messages across vast distances.

The name "semaphore" also can refer to signaling with a light or other means. This encoder uses the flag method and does a very basic translation of characters. Before signaling a message, you should send the Error/Attention signal. As you send, the receiver signals "C" after each word properly received, or "E" if there was a problem. When a problem is detected or a cancel is received, the entire previous word is repeated. Double letters should have a very brief rest inserted between them. Switch to numbers by using a "#" in front. Switch back to letters with "J".

These images show the sender as the receiver sees them, so you need to mirror them when you are the one transmitting. So, the letter "B" is signaled by raising your *right* hand halfway up. Also, the letters A-I plus K are used for 1-9 and 0 (the letter J was added later).

The font is a modified version of [Semaphore Pramuka](https://www.whatfontis.com/FF_Semaphore-Pramuka.font). This version uses "!" for error/attention, a space for the rest symbol and to split double letters, and a tilde or slashes for cancel.

<font-code rows='[{"label": "", "chars": "ABCDEFGHIJKLMNOPQRSTUVWXYZ"}, {"label": "", "chars": "0123456789#!"}]' font="semaphore"></font-code>
