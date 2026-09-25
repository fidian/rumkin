---
layout: "@/layouts/cipher-layout.astro"
title: Quagmire Ciphers
summary: Quagmire I through IV - a Vigenere tableau built from a keyed plaintext alphabet, a keyed ciphertext alphabet, or both.
cipher: true
breadcrumbs:
    - name: Rumkin.com
      href: /
    - name: Web-Based Tools
      href: /tools/
    - name: Ciphers and Codes
      href: /tools/cipher/
---

The Quagmires, as the American Cryptogram Association numbers them, are a Vigenere cipher whose two alphabets may each be keyed. A passphrase - the indicator key - selects a column of the tableau for each letter in turn, exactly as an ordinary Vigenere does.

Which alphabet carries a keyword is the whole difference between them:

| | Plain alphabet | Cipher alphabet |
| --- | --- | --- |
| Vigenere | normal | normal |
| **Quagmire I** | keyed | normal |
| **Quagmire II** | normal | keyed |
| **Quagmire III** | keyed | the same key |
| **Quagmire IV** | keyed | a different key |

Quagmire III is the one you may have met as the Keyed Vigenere.

The indicator key is written under one letter of the plaintext alphabet, and which letter that is shifts the whole tableau. Set it below.

Examples, all four of them the ACA's own worked examples from its cipher sheets:

-   <cipher-example label="Quagmire I" topic="quagmire" payload-direction="DECRYPT" payload-plain-key="SPRINGFEVER" payload-cipher-key="" payload-key="FLOWER" payload-align="A" payload-input="QPMGQ RBUJU YIFDM PYAIF QYYJJ JHJYC JLUUT PIDVW YMFSG AESDW HIZRB LIRVC FCZPE LBPZY YJJJH WLJJL PUP."></cipher-example>
-   <cipher-example label="Quagmire II" topic="quagmire" payload-direction="DECRYPT" payload-plain-key="" payload-cipher-key="SPRINGFEVER" payload-key="FLOWER" payload-align="A" payload-input="JICIC OSLYK ILFVC HEBDX CCORJ IOEWA FMWKK TXBGW HRJIB KEDBJ WZABU XWHEH UXOXC U."></cipher-example>
-   <cipher-example label="Quagmire III" topic="quagmire" payload-direction="DECRYPT" payload-plain-key="AUTOMOBILE" payload-cipher-key="AUTOMOBILE" payload-key="HIGHWAY" payload-align="A" payload-input="KRSLW MITJD VIABM RGQMT MLLIV IFUIX RHTNY ONVRH HIIIR MCAOV EI."></cipher-example>
-   <cipher-example label="Quagmire IV" topic="quagmire" payload-direction="DECRYPT" payload-plain-key="SENSORY" payload-cipher-key="PERCEPTION" payload-key="EXTRA" payload-align="S" payload-input="VBMRF CYISP MPBRR HEICX RREIG DX."></cipher-example>

<quagmire-cipher></quagmire-cipher>

Leave both keys blank and this is an ordinary [Vigenere cipher](../vigenere/). Leave the indicator key blank as well and the tableau shows all twenty-six rows, which is the table itself rather than any one message's worth of it.
