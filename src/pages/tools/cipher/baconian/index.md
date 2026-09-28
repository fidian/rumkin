---
layout: "@/layouts/cipher-layout.astro"
title: Baconian
summary: Used to hide a message within another message by using different typefaces or other distinguishing characteristics.
cipher: true
breadcrumbs:
    - name: Rumkin.com
      href: /
    - name: Web-Based Tools
      href: /tools/
    - name: Ciphers and Codes
      href: /tools/cipher/
---

Francis Bacon created this method of hiding one message within another. It is not a true cipher, but just a way to conceal your secret text within plain sight. The way it originally worked is that the writer would use two different typefaces or font styles. One would be the `a` typeface and the other would be `b`. Your message would be written with the two styles intermingled, thus hiding your message within a perfectly normal text.

There are two versions. The first uses the same code for I and J, plus the same code for U and V. The second uses distinct codes for every letter.

For example, let's take the message "Test It" and encode it with the distinct codes for each letter. You get a result like "baabbaabaabaababaabb abaaabaabb". The original message is 6 characters long so the encoded version is 6 &times; 5 = 30 characters. An example of this with a 30-character message, using bolded, emphasized letters for the "B" set, it would look like this:

<baconian-example message="This is a test message with bold for &#39;b&#39;." code="baabbaabaabaababaabb abaaabaabb" style-name="bold-italic"></baconian-example>

When decoding, it will use "0", "A", and "a" as an `a`; "1", "B", and "b" are all equivalent as well. Other letters are ignored.

Examples:

-   <cipher-example label="My example" topic="baconian" payload-alphabet="English" payload-direction="ENCRYPT" payload-condensing-options="DISTINCT" payload-input="Test It" payload-embedding-options="BOLD_EMPHASIS" payload-embedding-text="This is a test message with bold for 'b'."></cipher-example> - This is the example from above.
-   <cipher-example label="Wikipedia" topic="baconian" payload-alphabet="English" payload-direction="DECRYPT" payload-condensing-options="CONDENSED" payload-input="baaab baaba aabaa aabba aaaaa abbaa abbab aabba baaaa aaaaa abbba aabbb babba bbaaa bbaab bbbbb"></cipher-example> - The example from [The Free Encyclopedia](https://en.wikipedia.org/wiki/Bacon%27s_cipher).
-   <cipher-example label="William Frederick Friedman" payload-alphabet="English" topic="baconian" payload-direction="DECRYPT" payload-condensing-options="CONDENSED" payload-input="babaa aabab aabab a"></cipher-example> - His initials were [hidden in code](https://elonka.com/friedman/) on his tombstone, which went undiscovered for quite a while.

<baconian-cipher></baconian-cipher>
