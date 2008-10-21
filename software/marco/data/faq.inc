<?PHP

if (stristr($GLOBALS['PHP_SELF'], 'faq.php') !== false)
    $is_manual = false;
else
    $is_manual = true;
    
?>
<p>This is a list of common questions asked about Marco itself or about
topics that relate to Marco.  If your question is not answered here, <a
href="contact.php">contact the author</a> for a quick solution.</p>

<?PHP Section('Points'); ?>

<p><b>I edited a point and it no longer appears in the list of points.  What
happened to it?</b></p>

<p><img src="media/odd_sort.png" align=right border=1>
Marco sorts point names alphabetically because that is the only method
that Palm OS supplies.  Unfortunately, this means that a list of 1, 2, 10,
and 11 would be sorted as 1, 10, 11, 2.  A screen capture, to the right,
shows this odd behavior.  It sorts the first letter, then the second letter,
then the third.  It doesn't sort the number as an actual number.</p>

<p>If this method of sorting is hard to get used to, just add zeros
at the beginning so that all of the numbers are of the same length.  The
above set of numbers with zeros at the beginning would sort to 01, 02, 10,
11.  The point conversion utility on the web site can import
points and add zeros at the beginning of point numbers so that they sort
properly.</p>

<p>If this problem is extremely severe, request that I work on a "natural
sorting" method.  It would likely be significantly slower, but would give
the desired results.</p>

<?PHP Section('Calculations'); ?>

<p><b>How accurate is Marco?</b></p>

<p>Marco uses MathLib for number calculations.
<?PHP if ($is_manual) { ?>

See the <a href="#mathlib">MathLib section</a> for detailed information.

<?PHP } else { ?>

See the <a href="mathlib.php">MathLib page</a> for detailed information.

<?PHP } ?>

<p><b>Why can't I go to the calculator and back to Marco without losing
everything I entered?</b></p>

<p>If you leave Marco and come back, all of the data entered will be
cleared away.  I do this to save memory, make upgrades easier, and to avoid
several programming hassles.  I agree that it is annoying when you need to
look up information in your calculator, and I strongly suggest using a popup
calculator to solve the problem.  Popup calculators can appear "on top" of
any running program on a Palm, and will let you calculate numbers quickly.</p>

<?PHP if ($is_manual) { ?>

<P>See the section on <a href="#calculators">calculators</a> for a list 
of recommended calculators.</p>

<?PHP } else { ?>

<p>See the <a href="calculators.php">calculators page</a> for a list of
recommended calculators.</p>

<?PHP } ?>

<p><b>Is there an alternate calculator that I can use instead of the
built-in one?</b></p>

<p>Yes.  There are several, one of which is sure to fit your needs.

<?PHP if ($is_manual) { ?>

See the section on <a href="#calculators">calculators</a> for a list 
of recommended calculators.

<?PHP } else { ?>

See the <a href="calculators.php">calculators page</a> for a list of
recommended calculators.

<?PHP } ?></p>

<p><b>Why doesn't Marco have a built-in calculator?</b></p>

<p>Having a calculator added to Marco was seriously debated many times.  It
was decided to not be added to the program for several reasons:</p>

<ul>
<li>It would make Marco bigger (it is quite large enough).
<li>If it is an RPN calculator, infix people would be annoyed.  If it was an
infix calculator, RPN people would be annoyed.  If it was both, the program
would be much bigger.
<li>More potential for bugs in the system.
<li>It wouldn't integrate easily with the calculator button.
<li>There are several great calculators out there already.
</ul>

<?PHP Section('Miscellaneous') ?>

<p><b>Which handheld should I buy to use Marco?</b></p>

<p>The only requirement for a handheld is that it runs Palm OS 3.0 or
newer.  It might run with Palm OS 2.0, but that hasn't been tested.  Marco
has been tested to run on several versions of Palm Pilots, Handspring units,
and even a Palm OS based cell phone.  If you are buying a new device, make
sure it runs "Palm OS" -- it will not run on Palm-sized computers running
Windows CE or other operating systems.</p>

<p>If you are going to buy a device and want to know which one I
recommend, here are my suggestions:</p>

<ul>
<li><b>Brand:</b>  One is as good as another.  I'd suggest Handspring, but
they just merged back with Palm, so there isn't really any difference there.
<li><b>Memory:</b>  2 megs of memory is enough for hundreds of thousands of
points for Marco, a few custom applications, tons of addresses, several
memos, and a large todo list.  If you plan on using the Palm a lot, or if
you want to have space to spare, I would suggest 8 or 16 megs.
<li><b>Color/Black &amp; White:</b>  Color screens are <i>very</i> pretty,
and they show up nice in dark areas.  Black &amp; white screens draw much
less power, so the handheld can run longer without recharging or replacing the
batteries.  If this is for work, get black and white.  If it is for play,
home use, or for testing out programs, color is nice.
<li><b>Hi-res/Standard Resolution:</b>  The newer high-res screens are nice
and make reading less fatiguing.  I would suggest a high-res screen if
possible.  It works well with many games, document readers, and other sorts
of programs.  Overall, it will smooth out fonts to make them more appealing
and rounds buttons a bit nicer.
<li><b>Price:</b>  If it is going to be used out in the field, don't
get a very expensive one.  Dust can quickly scratch up the screen, accidents
happen, and Palms can get dropped.  Of course, get whatever you think is
needed and would be used.
<li><b>Accessories:</b>  A case.  Get a good case.  A nice, sturdy padded
case with velcro and a zipper around the Palm is a good idea.  A metal case
that is able to withstand abuse is a good idea.  I can not suggest this
enough -- get a good case for the Palm.  It <i>will</i> get dropped.
</ul>
