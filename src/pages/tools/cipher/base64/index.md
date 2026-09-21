---
title: Base64
summary: This is typically used to make binary data safe to transport as strictly text.
code: true
js:
    - ../rumkin-cipher.js
    - base64-module.js
components:
    - className: module
      component: Base64
    - className: conduit
      component: Conduit
---

Base64 translates binary into safe text. It is used for some web servers, sending attachments in email, plus has frequent use elsewhere when a method of transferring data using binary systems is not available.

Examples:

-   <span class="conduit" data-label="Wikipedia" data-topic="base64" data-payload-direction="DECRYPT" data-payload-input="TWFueSBoYW5kcyBtYWtlIGxpZ2h0IHdvcmsu"></span>

<div class="module"></div>
