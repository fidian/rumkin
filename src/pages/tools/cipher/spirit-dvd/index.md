---
title: Spirit DVD Code
summary: The Mars rover has a DVD with a code printed around the perimeter.
code: true
js:
    - ../rumkin-cipher.js
    - spirit-dvd-module.js
components:
    - className: module
      component: SpiritDvd
    - className: conduit
      component: Conduit
---

There's a code along the outside rim of the DVD attached to the Mars rover named Spirit. It was a challenge posed with clues given in January 2004.

<div class="D(f) Jc(c)"><img src="spirit-dvd.jpg" /></div>

Examples:

* <span class="conduit" data-label="Clue 1" data-topic="spiritDvd" data-payload-direction="DECRYPT" data-payload-input="-||||-||||-----|-||-|||-|-|-|-||--|---|||-------||---||||----|----||-|-|-||||--|---|||-|-||-||-----||||-||-|--|||-||-|-||||--|---||---|||--|----||----||--||--|---|-|-|||----|-|-||---------|||--|-|-||||-----|||-|-|-|||-||-|||---|||--|-|-|-||---||-||--||||||-|---||---|||-||----||-|---|-|--|-||||--|.---||---|||--|-----||||-||||------|||-|||-|||||-||-||-||||--||---|||----|-||--,---||---|||--|-----|-||-|-|||-|-|---||----||--||||---||||---|-||||----|-|||||----||--|---|||||||,---||----||--||--||----|---||---||||---||--|--||---||--||||---|||--|-||-------||----||--||-|-||-------||--||--|||-|-||-||-|---|-|--|||---|||-|-|||-|-|---||-||--|||-|-----|---|-|-|-|---|||-|--------|||-|-||||--||-|--|||--||--||----|---||-----||---|||-|-|-||||-----|---||-||||||---|-|-|-|---|||-|-------||||-||||--|||--|||-|-||-||||-----||||."></span> - This was the first hint for how to solve the shorter code that's displayed on the DVD.

* <span class="conduit" data-label="DVD Code" data-topic="spiritDvd" data-payload-direction="DECRYPT" data-payload-input="|-|--|||---||||||--||---|-||---||||-|||---|-|--|--||----|---||--||--||----|"></span> - The code from the DVD. It is easiest if you look only at the upper left and work from left to right, from outside to inside. The other two portions of code are the same message.

<div class="module"></div>
