---
layout: "@/layouts/tool-layout.astro"
title: Passwords
summary: Find out if your password is strong enough to prevent unauthorized access. Generate new, secure passwords with Diceware or a random password generator.
breadcrumbs:
    - name: Rumkin.com
      href: /
    - name: Web-Based Tools
      href: /tools/
---

If you use a computer, you more than likely have a password or a passphrase.  Security is something that people often don't take seriously enough.  Because of this, I have created a couple tools that help to make things simpler.


Password Strength
-----------------

Want to see some score about the quality of your current password? Just type it in here. Nothing is sent to my server. Also, the source code to this password checker [is on GitHub](https://github.com/tests-always-included/password-strength). In case you are interested in the math behind this tool, there's an [explanation of the calculation](https://github.com/tests-always-included/password-strength/blob/master/doc/entropy-seems-wrong.md) and another explanation about the [strength levels and estimated cracking time](https://github.com/tests-always-included/password-strength/blob/master/doc/strength-levels.md).

<password-strength></password-strength>


Diceware
--------

A method was created to generate passphrases with a lookup table and some dice, called [Diceware](http://world.std.com/~reinhold/diceware.html). The form below does the same thing for you, allowing you to skip looking up words on a 30+ page list. The point of this method is to make a random passphrase that could also be memorable.

<diceware-passphrase></diceware-passphrase>


Password Generator
------------------

If the Diceware section doesn't satisfy your needs, this one should. It's far more flexible. Unfortunately that also makes it a bit more complex.

<password-generator></password-generator>


MD5 Hash Generator
------------------

Calculate the MD5 checksum of a bit of text, password, or whatever you like.  Runs in your browser and nothing is sent back to me.

<md5-hash></md5-hash>

