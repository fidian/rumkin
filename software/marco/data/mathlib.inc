<p>In order to be very accurate, Marco uses MathLib for all of the complex
math functions.  MathLib provides IEEE-754 double precision math functions
to Palm OS programs.  MathLib is a shared library, which means that most
calculators and other math-related programs will share its instructions
instead of adding bulk to each program's size. This makes everything 
smaller in the long run.</p>

<p>If Marco was already installed on the handheld and if everything was
working fine, MathLib does not need to be reinstalled.  If you are installing
Marco for the first time, MathLib might already be loaded on the device.  I
would suggest installing Marco only, and try to run it.  If there is an error
saying something like "Can't find MathLib", then just install MathLib.  Once
installed, MathLib will never need to be installed again, even if Marco or
other programs are updated.  Only if your memory is completely wiped out
would it beed to be installed again.</p>

<p><img src="media/menu_button.gif" align=right>
If you need MathLib and another person who has it on their Palm is handy,
you can use Marco to beam MathLib from one Palm to another.  Tap on the menu
button, then select Beam MathLib under the Marco menu.</p>

<p>You don't need to worry about damaging anything. If MathLib is not
installed, Marco detects it and stops the program before any harm can
be done.  MathLib is available in a package with Marco from the
<a href="download.php">download page</a>.  Additionally, you can download 
just the MathLib file from <a href="prc/MathLib.prc">here</a>
(right-click and pick "Save As"), or you can get everything (including 
documentation and the source code) from this
<a href="http://github.com/fidian/MathLib">MathLib project</a> on GitHub.</p>

<p>The reason that MathLib is used is for accuracy.  Internally, Marco uses
a 'double', which is a 32-bit floating point number.  Palm OS doesn't have
good math functions for doubles, so MathLib was created to fill the void.
It is much more accurate than normal 'float' numbers.  In my tests, it shows
that doubles have an accuracy to 10 significant digits -- the first 10
numbers, not including the decimal point, starting from the left.  These
numbers are all displayed with 10 significant digits.  Most people will not
use all 10 digits, and Marco may not display all 10 digits (depending on how
it is configured), but it is good to know that they are there.</p>

<ul>
<li>3.141592653
<li>32,167,398.92
<li>1024.123456
</ul>

<p>Additionally, Marco uses optimized math functions to minimize the amount
of multiplications and divisions that are needed.  With each multiplication
or division, a tiny amount of precision is lost due to the way computers
handle those arithmetic functions, and Marco strives to keep all numbers as
accurate as possible.</p>
