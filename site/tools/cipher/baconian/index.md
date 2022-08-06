---
title: Baconian
summary: Used to hide a message within another message by using different typefaces or other distinguishing characteristics.
cipher: true
mathjax: true
js:
    - ../rumkin-cipher.js
    - baconian-module.js
components:
    - className: module
      component: Baconian
    - className: example
      component: BaconianExample
---

Francis Bacon created this method of hiding one message within another.  It is not a true cipher, but just a way to conceal your secret text within plain sight.  The way it originally worked is that the writer would use two different typefaces or font styles.  One would be the `a` typeface and the other would be `b`.  Your message would be written with the two styles intermingled, thus hiding your message within a perfectly normal text.

There are two versions.  The first uses the same code for I and J, plus the same code for U and V.  The second uses distinct codes for every letter.

For example, let's take the message "Test It" and encode it with the distinct codes for each letter.  You get a result like "baabbaabaabaababaabb abaaabaabb".  The original message is 6 characters long so the encoded version is \\(6 * 5 = 30\\) characters. An example of this with a 30-character message, using bolded, emphasized letters for the "B" set, it would look like this:

<div class="example" data-message="This is a test message with bold for 'b'." data-code="baabbaabaabaababaabb abaaabaabb" data-b-classes="Fw(b) Fs(i)"></div>

When decoding, it will use "0", "A", and "a" as an `a`; "1", "B", and "b" are all equivalent as well.  Other letters are ignored.

<div class="module"></div>