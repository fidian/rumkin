---
layout: "@/layouts/cipher-layout.astro"
title: Dancing Men
summary: Sherlock Holmes solved a mystery that used a stick man cipher.
code: true
breadcrumbs:
    - name: Rumkin.com
      href: /
    - name: Web-Based Tools
      href: /tools/
    - name: Ciphers and Codes
      href: /tools/cipher/
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

* <cipher-example label="A through Z" topic="dancingMen" payload-input="ABCDEFGHIJKLMNOPQRSTUVWXYZ"></cipher-example> - All letters without flags.
* <cipher-example label="With Flags" topic="dancingMen" payload-input="A B C D E F G H I J K L M N O P Q R S T U V W X Y Z "></cipher-example> - All letters with flags
* <cipher-example label="Not In Story" topic="dancingMen" payload-input="fjkquwxz"></cipher-example> - Just the letters that do not appear in a cipher in the story.
* <cipher-example label="All Messages" topic="dancingMen" payload-input="AM HERE ABE SLANEY
AT ELRIGES
COME ELSIE
NEVEB
ELSIE PREPARE TO MEET THY GOD
COME HERE AT ONCE"></cipher-example> - All of the messages from the story. Note that "NEVEB" is probably "NEVER", though the cipher in the text uses a B. [More information](https://www.arthur-conan-doyle.com/index.php?title=Dancing_Men_Alphabet) about these codes.


<font-code rows='[{"label": "", "chars": "ABCDEFGHIJKLMNOPQRSTUVWXYZ"}, {"label": "", "chars": "0123456789 "}]' variants='[{"font": "dancing-men-gl", "label": "Gutenberg Labo"}, {"font": "dancing-men-ars", "label": "Aage Rieck Sørensen"}]' variant-label="Dancing men variant"></font-code>
