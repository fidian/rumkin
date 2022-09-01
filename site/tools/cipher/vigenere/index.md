---
title: Vigenère
summary: Based somewhat on the Caesarian shift cipher, this changes the shift amount with each letter in the message and those shifts are based on a passphrase. A pretty strong cipher for beginners. Functionally similar to "Variant Beaufort" and this also supports autokey.
cipher: true
js:
    - ../rumkin-cipher.js
    - vigenere-module.js
components:
    - className: module
      component: Vigenere
    - className: conduit
      component: Conduit
---

A 16<sup>th</sup> century French diplomat, Blaise de Vigenère, created a very simple cipher that is moderately difficult for any unintended parties to decipher. It is somewhat like a variable [Caesar](../caesar/) cipher, but the N changed with every letter. You would "encode" your message with a passphrase, and the letters of your passphrase would determine how each letter in the message would be encrypted.

This is the exact opposite of a "Variant Beaufort." To do the variant, just "decode" your plain text to get the cipher text and "encode" the cipher text to get the plain text again.

A judge created his own Smithy code, which is the same as a Vigenère cipher. It had a couple mistakes in the original, but don't let that stop you from trying to decode his message.

This also supports the "autokey" method, where letters from the plaintext are used to extend the key. This eliminates a weakness in the cipher, but now the security depends on everything being spelled correctly and the strength can be compromised by picking bad combinations of words in your plaintext.

Examples:

-   <span class="conduit" data-label="Smithy Code" data-topic="vigenere" data-payload-direction="ENCRYPT" data-payload-alphabet="English alphabetKey: useLastInstance:false reverseKey:false reverseAlphabet:false keyAtEnd:false" data-payload-cipher-key="AAYCEHMU" data-payload-autokey="false" data-payload-input="Jaeiextostgpsacgreamqwfkadpmqzv"></span>
-   <span class="conduit" data-label="Smithy Code (Fixed)" data-topic="vigenere" data-payload-direction="ENCRYPT" data-payload-alphabet="English alphabetKey: useLastInstance:false reverseKey:false reverseAlphabet:false keyAtEnd:false" data-payload-cipher-key="AAYCEHMU" data-payload-autokey="false" data-payload-input="jaeiex tosHgp sac gre amq wfkadpmqzvZ"></span> - Corrections are capitalized and spaces are added to make reading easier.
-   <span class="conduit" data-label="Kryptos K1" data-topic="vigenere" data-payload-direction="DECRYPT" data-payload-alphabet="English alphabetKey:KRYPTOS useLastInstance:false reverseKey:false reverseAlphabet:false keyAtEnd:false" data-payload-cipher-key="PALIMPSEST" data-payload-autokey="false" data-payload-input="EMUFPHZLRFAXYUSDJKZLDKRNSHGNFIVJ
    YQTQUXQBQVYUVLLTREVJYQTMKYRDMFD"></span>
-   <span class="conduit" data-label="Kryptos K2 (original)" data-topic="vigenere" data-payload-direction="DECRYPT" data-payload-alphabet="English alphabetKey:KRYPTOS useLastInstance:false reverseKey:false reverseAlphabet:false keyAtEnd:false" data-payload-cipher-key="ABSCISSA" data-payload-autokey="false" data-payload-input="VFPJUDEEHZWETZYVGWHKKQETGFQJNCE
    GGWHKK?DQMCPFQZDQMMIAGPFXHQRLG
    TIMVMZJANQLVKQEDAGDVFRPJUNGEUNA
    QZGZLECGYUXUEENJTBJLBQCRTBJDFHRR
    YIZETKZEMVDUFKSJHKFWHKUWQLSZFTI
    HHDDDUVH?DWKBFUFPWNTDFIYCUQZERE
    EVLDKFEZMOQQJLTTUGSYQPFEUNLAVIDX
    FLGGTEZ?FKZBSFDQVGOGIPUFXHHDRKF
    FHQNTGPUAECNUVPDJMQCLQUMUNEDFQ
    ELZZVRRGKFFVOEEXBDMVPNFQXEZLGRE
    DNQFMPNZGLFLPMRJQYALMGNUVPDXVKP
    DQUMEBEDMHDAFMJGZNUPLGEWJLLAETG"></span> - The statue has a slight error near the end.
-   <span class="conduit" data-label="Kryptos K2 (fixed)" data-topic="vigenere" data-payload-direction="DECRYPT" data-payload-alphabet="English alphabetKey:KRYPTOS useLastInstance:false reverseKey:false reverseAlphabet:false keyAtEnd:false" data-payload-cipher-key="ABSCISSA" data-payload-autokey="false" data-payload-input="VFPJUDEEHZWETZYVGWHKKQETGFQJNCE
    GGWHKK?DQMCPFQZDQMMIAGPFXHQRLG
    TIMVMZJANQLVKQEDAGDVFRPJUNGEUNA
    QZGZLECGYUXUEENJTBJLBQCRTBJDFHRR
    YIZETKZEMVDUFKSJHKFWHKUWQLSZFTI
    HHDDDUVH?DWKBFUFPWNTDFIYCUQZERE
    EVLDKFEZMOQQJLTTUGSYQPFEUNLAVIDX
    FLGGTEZ?FKZBSFDQVGOGIPUFXHHDRKF
    FHQNTGPUAECNUVPDJMQCLQUMUNEDFQ
    ELZZVRRGKFFVOEEXBDMVPNFQXEZLGRE
    DNQFMPNZGLFLPMRJQYALMGNUVPDXVKP
    DQUMEBEDMHDAFMJGZNUPLGEsWJLLAETG"></span> - The last line was missing a letter. This is the corrected form with the missing letter added in lower case.

<div class="module"></div>
