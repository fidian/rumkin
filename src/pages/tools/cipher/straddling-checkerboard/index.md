---
layout: "@/layouts/cipher-layout.astro"
title: Straddling Checkerboard
summary: "Letters become digits, and the common ones cost half as much. The fractionating step inside the VIC cipher."
code: true
breadcrumbs:
    - name: Rumkin.com
      href: /
    - name: Web-Based Tools
      href: /tools/
    - name: Ciphers and Codes
      href: /tools/cipher/
---

A board ten columns wide. The top row holds the eight commonest letters and each of those costs a single digit. Two of the ten columns in that row are left empty, and their column numbers become the labels of two more rows, which hold everything else at two digits apiece.

```
    0  1  2  3  4  5  6  7  8  9
    E  T     A  O  N     R  I  S
2   B  C  D  F  G  H  J  K  L  M
6   P  Q  /  U  V  W  X  Y  Z  .
```

Nothing marks where one letter ends and the next begins. A reader knows that a 2 or a 6 starts a two-digit code and that any other digit stands alone, and that is the *straddling* the name refers to.

Two things come out of this. The message is shorter than one digit pair per letter, because the common letters are cheap. And the codes are of uneven length, which blurs the boundaries for anyone counting frequencies in whatever gets applied next - which, for the Soviet agents who used it, was usually a [one-time pad](../one-time-pad/).

This is the first half of the VIC cipher, the hand cipher carried by Reino Hayhanen and found in 1953 inside a hollow nickel in Brooklyn.

Examples:

-   <cipher-example label="ATTACK AT DAWN" topic="straddlingCheckerboard" payload-direction="DECRYPT" payload-input="3113212731223655"></cipher-example>

<straddling-checkerboard-code></straddling-checkerboard-code>

A digit cannot be spelled on the board, so it is escaped with the slash's code and then written as itself. Anything with no cell at all is dropped, because there is nowhere in a run of digits to hide it.
