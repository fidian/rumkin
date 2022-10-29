---
title: Dancing Men
summary: Sherlock Holmes solved a mystery that used a stick man cipher.
code: true
css:
    - index.css
js:
    - ../rumkin-cipher.js
    - dancing-men-module.js
components:
    - className: module
      component: DancingMen
    - className: conduit
      component: Conduit
---

Mr. Hilton Cubitt of Ridling Thorp Manor was baffled by a series of stick figures, yet the amazing Sherlock Holmes was up to the challenge in [The Adventure of the Dancing Men](https://www.gutenberg.org/files/108/108-h/108-h.htm#chap03)

The story did not include all of the letters - only 17 out of the possible 26. Because of the gaps, other people have filled in the missing symbols with stick figures of their own creation. This encoder can produce results using either version.

Gutenberg Labo has made a font that mirrors the text closely.

<div class="D(f) Fxd(c) Ai(c) Jc(c)">
Gutenberg Labo<br />
<span class="dancing-men-gl">dancinGmen</span>
</div>

Aage Rieck Sørensen, a true Holmes enthusiast, discovered a hidden pattern in the script and created one version of the font.

<div class="D(f) Fxd(c) Ai(c) Jc(c)">
Aage Rieck Sørensen<br />
<span class="dancing-men-ars">dancinGmen</span>
</div>

Note that they do not agree on the 7 missing letters, so both are included here for completeness as they are both commonly found with internet searches.

Examples:

* <span class="conduit" data-label="A through Z" data-topic="dancingMen" data-payload-input="ABCDEFGHIJKLMNOPQRSTUVWXYZ"></span> - All letters without flags.
* <span class="conduit" data-label="With Flags" data-topic="dancingMen" data-payload-input="A B C D E F G H I J K L M N O P Q R S T U V W X Y Z "></span> - All letters with flags
* <span class="conduit" data-label="Not In Story" data-topic="dancingMen" data-payload-input="fjkquwxz"></span> - Just the letters that do not appear in a cipher in the story.
* <span class="conduit" data-label="All Messages" data-topic="dancingMen" data-payload-input="AM HERE ABE SLANEY
AT ELRIGES
COME ELSIE
NEVEB
ELSIE PREPARE TO MEET THY GOD
COME HERE AT ONCE"></span> - All of the messages from the story. Note that "NEVEB" is probably "NEVER", though the cipher in the text uses a B. [More information](https://www.arthur-conan-doyle.com/index.php?title=Dancing_Men_Alphabet) about these codes.


<div class="module"></div>
