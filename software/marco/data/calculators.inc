<?PHP

if (stristr($GLOBALS['PHP_SELF'], 'calculators.php') !== false)
    $is_manual = false;
else
    $is_manual = true;
    
?>
<p>Marco was designed to not have a built-in calculator.  For the reasoning
behind that, please see the <a href="<?PHP
    if ($is_manual)
       echo "#faq";
    else
       echo "faq.php";
?>">FAQ</a>.  If you don't like the built-in calculator, there are different
ones that may work better.  If desired, a different calculator can be mapped
to the calculator button on the Palm, taking the place of the built-in
calculator.</p>

<p>There are two different types of calculators when it comes to how they
process numbers.  Different buttons are pressed when performing
a calculation, like 2 * 3.  With <i>infix</i>, you press 2 X 3 Enter and you
would get your answer.  With <i>RPN</i>, you would press 2 Enter 3 X.</p>

<p>With regard to how the calculators run on the handheld, there are also
two different styles.  Popup calculators will appear "over" the currently
running program so that you don't lose your information.  Usually they start
with a unique "stroke" of the grafitti pen and are considered "hacks"
(add-ons and extensions to the system).  The other kind are just normal
programs, like the calculator already on the Palm.  You'll switch to the
calculator and then back to Marco.  It can not appear as a window over another
program and you will lose anything you entered into Marco except saved
points.</p>

<p>Many of the calculators use <a href="<?PHP
    if ($is_manual)
       echo "#mathlib";
    else
       echo "mathlib.php";
?>">MathLib</a> for trig functions.  If Marco runs, then MathLib is
installed on your Palm, and then all of these calculators should also
work.</p>

<?PHP Section('Calculator Applications') ?>

<p>These calculators run as separate programs and do not "pop up" over
Marco.  However, they usually have added functionality and are often much
more powerful than the other style.  You would install these like any other
program -- download, extract, and then install the .prc file.</p>

<dl>

<dt><a href="http://home.a-city.de/franco.bez/palm/bezcalc.html">Bez
Calculator</a>
<dd>Scientific calculator program.  Great if base conversions are not needed
and Calcul-8! has buttons that are just too small.  [Infix, Freeware, Open
Source]

<dt><a href="http://www.c4calc.com/">C4</a>
<dd>Advanced color calculator.  Different versions are available.  C4Me is
freeware, but the others are shareware.  [Infix, Shareware/Freeware]

<dt><a href="http://www.nutcom.fsnet.co.uk/palm/">Calcul-8!</a>
<dd>Nice calculator with unit conversion, scientific functions, and base
conversions.  [Infix, Freeware]

<dt><a href="/reference/palm/FreeForm.zip">FreeForm</a>
<dd>A simple and clean interface for a small calculator.  It supports
parenthesis up to a depth of 25, and 10 memories.  For frequent calculations,
scripts can be written that support loops and conditional execution.
[Infix, Freeware]

<dt><a href="http://www.klawitter.de/palm/kalk.html">Kalk</a>
<dd>Very nice RPN calculator -- one of the better ones available.  Has a
fancy version with color buttons and a lite version for people with a
limited amount of free memory.  [RPN, Freeware, Open Source]

</dl>

<?PHP Section('Calculator Hacks'); ?>

<p>These "hacks" (or system extensions) require a hack manager such as <a
href="http://linkesoft.com/english/xmaster/">X-Master</a>, <a
href="http://www.daggerware.com/hackmstr.htm">HackMaster</a>, or similar.
I suggest X-Master because it is free and has more features than what are
usually needed.  You download, extract, and install the calculators.  Then,
you set them up by running X-Master (or your alternate hack manager) and
configuring the calculator.</p>

<p>With the advent of Palm OS 5 and later, hacks are no longer supported,
but some people have converted their software to work with the new system
provided.  For the calculators listed below, there will be an annotation of
"Hack" if it works with Palm OS 4 and earlier, and "OS5" if it works with
Palm OS 5 and later.</p>

<dl>

<dt><a href="http://www.geocities.com/rnlnero/Palmos.html">snapCalc</a>
<dd>Pops up a calculator window over whatever application is running.  The
results of the calculations can be copied back to the current program.  The
size of the calculator can be a small moveable one or a large layout that
nearly takes up the entire screen.  [Infix, Freeware, Hack, OS5]

<dt><a href="http://benc.hr/popcalc.htm">PopUp Calculator</a> and <a
href="http://benc.hr/rpnpopcalc.htm">RPN PopUp Calculator</a>
<dd>Alternate pop-up calculator that supports three different calculator
form sizes and trig functions.  [Infix or RPN, Shareware, Hack]

</dl>