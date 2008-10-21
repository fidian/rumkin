<?PHP  // -*- html -*-
/* Documentation for D&D Helper
 */

include("../../functions.inc");

StandardHeader(array('title' => 'PSR Format',
                     'topic' => 'dnd_helper'));

?>

<table border=1 cellpadding=3 cellspacing=2 align=center bgcolor=#222200>
<tr><td bgcolor=#FFFFEE>
<form method=post action=test_psr.php enctype=multipart/form-data>
Test a PSR file:  <input name="the_file" type=file> -
<input type=submit value="Test File">
</form>
</td></tr></table>

<p>The most flexible database format that D&amp;D Helper supports is the
Phrase Structure Rule grammar style database.  Briefly, it expands a rule into
text and other rules.</p>

<p>For example, let's try to make a database say "Jack is going to the
store."  All examples are real and do work in my parser.  The files are all
simple text files.  The source file to generate the sentence is quite 
simple:</p>

<?PHP

ShowExample("
* MAIN
Jack is going to the store.
");

?>

<p>The first rule in the file is considered the starting rule.  So, we start
with [MAIN] and we pick a random rule.  Since there is only one, we pick
that one.  Let's make this a little more complex by changing the name and
the destination.</p>

<?PHP

ShowExample("
* MAIN
[NAME] is going to the [PLACE].

* NAME
Timothy
Jack
Greg

* PLACE
library
store
shed
");

?>

<p>With the above rules, we can get "Timothy is going to the shed.", "Jack
is going to the library.", "Greg is going to the shed." and others.  In
fact, by having 3 names and 3 destinations, we can get a total of 9
different sentences.</p>

<p>Let's make this a bit more interesting and add more description.</p>

<?PHP

ShowExample("
* MAIN
[NAME] is [JOINER] the [PLACE].
At the [PLACE], you will find [NAME].

* NAME
Timothy
Jack
Greg
Steve

* PLACE
library
store
shed

* JOINER
[WALK] [TO_FROM]
going to
coming from

* WALK
running
walking
skipping
hopping
hobbling
crawling

* TO_FROM
to
from
towards
away from
nearby
");

?>

<p>With this lengthy example, you can get a bunch of different
possibilities.  "Jack is coming from the shed."  "Timothy is crawling nearby
the library."  "Steve is walking away from the store."  You can see a bunch
of possibilities.</p>

<p>By adding another five names or other places, you get the possibility to
create many other phrases.  By adding more variances, you can get more
flavor in your statements.</p>

<p>With the above example, you will notice that the JOINER only expands to
three possible rules.  The first rule, "[WALK] [TO_FROM]" can expand to many
possibilities, but it only has a 1/3 chance of being picked if JOINER is
used.  To make the output look better, we should have the "[WALK] [TO_FROM]"
rule get used more often.</p>

<?PHP

ShowExample("
* JOINER
10:[WALK] [TO_FROM]
1:going to
1:coming from
");

?>

<p>With a JOINER section like this, we give preference to the first rule.
Essentially, we add the numbers on all of the rules.  Then, we pick a random
number, then check to see which rule gets it.  10 + 1 + 1 = 12.  Picking a
random number, 4, means that we use the first rule.  If I pick 11 or 12, we
use the boring "going to" or "coming from" rules.  Essentially, the first
rule is 10 times more likely to get picked than an "average" rule.</p>

<?PHP

ShowExample("
# This is a completely different example.
# Do not just add this to the above PSR rules
#
# Also, any line starting with a # is considered
# a comment and will be ignored.

* NEW_EXAMPLE
Pick up [OBJECT].  [^OBJECT] is over there.

* OBJECT
the sword
an apple
a kitten
");

?>

<p>This example illustrates how you can capitalize the first letter in an
expanded rule.  The first rule picks two objects (they may be different or the same) and
the second object has its first letter capitalized.  "Pick up the sword.  A
kitten is over there."  "Pick up an apple.  An apple is over there."  "Pick
up a kitten.  An apple is over there."  Additionally, it shows how you can
add comments to your PSR files.</p>

<p>The file format also supports long lines -- just use something like
this:</p>

<?PHP

ShowExample("
* LONG_LINE
This is all \
one big, long line \
and will be treated as such. \
You need to end your line \
with a backslash, and the \
parser will append the next \
line to the end of the first one.
");

?>

<p>Lastly, if you have "[[]", "[]]", "[*]", or "[#]" in your rules, it will 
convert that into just the "[", "]", "*", or "#" character, respectively.
Newlines can be added by using "\n".</p>

<p>If you make a file and you would like to use it in D&amp;D Helper, just
follow the above guidelines and send it to me.  I'll convert it into a
database for you.  If you don't mind, I would also like to host it on my
site and distribute it to others.</p>

<?PHP

StandardFooter();

function ShowExample($text)
{
   MakeBoxTop('center');
   echo '<pre>';
   echo htmlspecialchars(trim($text));
   echo "\n</pre>";
   MakeBoxBottom();
}