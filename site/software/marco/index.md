---
title: Marco
summary: Surveyor software for the Palm Pilot and other Palm OS devices.  Designed to be a tool for quick calculations and small amounts of number crunching.  Not a complete solution for surveying, but a fast and quick reference and calculator.
components:
    -
        className: module
        component: Register
js:
    - ./register-module.js
---

**Notice:** Marco is considered "End of Life" software and will no longer be supported.  It is still available for download and this site will now generate registration codes for free.

Marco is a collection of common surveyor calculations intended to assist people in the field, where booting up a laptop to just figure out a couple answers would take far too long.  It is designed to be a powerful calculator that is easy to use, and to supplement your desktop computing environment.

Marco will run on any device that runs Palm OS, such as [Palm Pilots](http://palm.3com.com/).  These little devices are ideal platforms for use in the field.  They require absolutely no boot time, are easily transportable, have a long battery life (especially the black & white ones), and are very reliable.  The processor is easily able to handle accurate calculations, and the screen size means that the program can prompt for information in a way that is useful to people that are unfamiliar with the program.  Palm devices are also becoming quite affordable and are being integrated with cell phones and watches.  With all of these reasons, Palm OS devices are perfect for the job.


Manual
------

There is an extensive [manual](manual/) available that explains the options and each of the screens.


Download
--------

The links below are for the unregistered version of Marco.  There's a section later that will generate registration codes for you for free.

Marco requires MathLib.  If you don't know about it, there's a section later that discusses it.  If you are upgrading Marco, you do not need to reinstall MathLib.

Download Mardo as a [zip fie](marco.zip) with MathLib and documentation or as a [prc file](marco.prc).  You can optionally install a sample point file with 3588 [sample points](sample-points.pdb); if installed this will overwrite your current point database.


MathLib
-------

In order to be very accurate, Marco uses MathLib for all of the complex math functions.  MathLib provides IEEE-754 double precision math functions to Palm OS programs.  MathLib is a shared library, which means that most calculators and other math-related programs will share its instructions instead of adding bulk to each program's size. This makes everything smaller in the long run.

Try installing Marco and running it.  If you need to install MathLib then Marco will prompt you.  You would only ever need to do this once.


Registration
------------

Marco used to be shareware, but now it is not supported.  I have opened up the registration process to immediately generate you a working code.

1. Start Marco.
2. Tap on Preferences, and then press Register Me.
3. Look for something that says RegCode.  It should look something like this:  `82:C1:DF:7D:7A:81:70:21:8A:B5:BD`
4. Enter the code into the area below to get your unlock code.
5. Enter the unlock code into Marco.

<p class="module"></p>


Other Calculators
-----------------

Marco was designed to not have a built-in calculator because others would do a better job.  If you don't like the built-in calculator, there are different ones that may work better.  If desired, a different calculator can be mapped to the calculator button on the Palm, taking the place of the built-in calculator.

There are two different types of calculators when it comes to how they process numbers.  Different buttons are pressed when performing a calculation, like 2 * 3.  With *infix*, you press 2 × 3 Enter and you would get your answer.  With *RPN*, you would press 2 Enter 3 ×.

With regard to how the calculators run on the handheld, there are also two different styles.  Popup calculators will appear "over" the currently running program so that you don't lose your information.  Usually they start with a unique "stroke" of the graffiti pen and are considered "hacks" (add-ons and extensions to the system).  The other kind are just normal programs, like the calculator already on the Palm.  You'll switch to the calculator and then back to Marco.  It can not appear as a window over another program and you will lose anything you entered into Marco except saved points.

Hacks (a.k.a. system extensions) require a hack manager such as [X-Master](http://linkesoft.com/english/xmaster/) or [HackMaster](http://www.daggerware.com/hackmstr.htm), or similar.  With the advent of Palm OS 5 and later, hacks are no longer supported, but some people have converted their software to work with the new system provided.  For the calculators listed below, there will be an annotation of "Hack" if it works with Palm OS 4 and earlier, and "OS5" if it works with Palm OS 5 and later.

Many calculators also use MathLib for their math functions.  Marco also requires MathLib, so we share this library and both benefit.

* [Bez Calculator](http://home.a-city.de/franco.bez/palm/bezcalc.html) - Scientific calculator program.  Great if base conversions are not needed and Calcul-8! has buttons that are just too small.  [Infix, Freeware, Open Source]

* [C4](http://www.c4calc.com/) - Advanced color calculator.  Different versions are available.  C4Me is freeware, but the others are shareware.  (Infix, Shareware/Freeware)

* [Calcul-8!](http://www.nutcom.fsnet.co.uk/palm/) - Nice calculator with unit conversion, scientific functions, and base conversions.  (Infix, Freeware)

* [Kalk](http://www.klawitter.de/palm/kalk.html) - Very nice RPN calculator -- one of the better ones available.  Has a fancy version with color buttons and a lite version for people with a limited amount of free memory.  (RPN, Freeware, Open Source)

* [snapCalc](http://www.geocities.com/rnlnero/Palmos.html) - Pops up a calculator window over whatever application is running.  The results of the calculations can be copied back to the current program.  The size of the calculator can be a small moveable one or a large layout that nearly takes up the entire screen.  (Infix, Freeware, Hack, OS5)

* [PopUp Calculator](http://benc.hr/popcalc.htm) and [RPN PopUp Calculator](http://benc.hr/rpnpopcalc.htm) - Alternate pop-up calculator that supports three different calculator form sizes and trig functions.  (Infix or RPN, Shareware, Hack)
