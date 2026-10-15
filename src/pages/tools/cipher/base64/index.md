---
layout: "@/layouts/cipher-layout.astro"
title: Base64
summary: This is typically used to make binary data safe to transport as strictly text.
code: true
breadcrumbs:
    - name: Rumkin.com
      href: /
    - name: Web-Based Tools
      href: /tools/
    - name: Ciphers and Codes
      href: /tools/cipher/
---

Base64 translates binary into safe text. It is used by some web servers and for sending attachments in email, and it is frequently used elsewhere when there is no way to transfer binary data directly.

Examples:

-   <cipher-example label="Wikipedia" topic="base64" payload-direction="DECRYPT" payload-input="TWFueSBoYW5kcyBtYWtlIGxpZ2h0IHdvcmsu"></cipher-example>

<simple-code code="base64" topic="base64" label="Message to encode or decode"></simple-code>
