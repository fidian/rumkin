<?php

require '../../../functions.inc';
StandardHeader(array(
		'title' => 'Fuzzy String Matching',
		'topic' => 'algorithms'
	));

?>

<p>Fuzzy matching and confidence levels is what this exercise is all about.
It is tough to match two strings and say that they are quite similar, but
not exact.  There are a few ways you can achieve this goal.</p>

<p><b>Levenshtein Distance:</b>  This calculates the minimum number of
insertions, deletions, and substitutions necessary to convert one string
into another.  A low distance between two strings means that the strings are
more similar.  The best site I have found is <a
href="http://www.merriampark.com/ld.htm">Levenshtein Distance, in Three
Flavors</a>.</p>

<p>I have modified their algorithm and created <a
href="levenshtein.c.txt">C</a> and <a href="levenshtein.prg.txt">FoxPro</a>
versions.  My methods do not use a huge matrix &ndash; they just use a
one-dimensional array the same length as one of the strings.  They also keep
the values in the array incremented by 1 so that the comparisons in the loop
do not need to perform additional math.  The goal was to tweak the loop and
try to keep math to a minimum in there.</p>

<p><b>Gestalt:</b> I stumbled across this algorithm in
<a href="http://php.net/">PHP's</a> documentation about the
<a href="http://php.net/manual/en/function.similar-text.php">similar_text</a>
function.  The best source for the algorithm that I found was in PHP's source
code for the <a
href="http://cvs.php.net/co.php/php-src/ext/standard/string.c">string
functions</a>.  Look for the <tt>php_similar_str</tt>,
<tt>php_similar_char</tt>, and <tt>PHP_FUNCTION(similar_text)</tt> functions.</p>

<p>I have created <a href="gestalt.c.txt">C</a> and <a
href="gestalt.prg.txt">FoxPro</a> versions of the code.  They are both
recursive, so be careful with large strings on limited devices.  Also, Eduardo
Curtolo &lt;<?php echo HideEmail('ecurtolo', 'gmail.com') ?>&gt; provided a <a href="gestalt.pas.txt">Pascal</a> version.</p>

<p><b>SoundEx:</b>  This algorithm is used on your driver's licence (in the
U.S.).  Its goal is to group letters that sound alike, then convert the name
into a series of numbers that can represent the name.  <a
href="http://www.creativyst.com/Doc/Articles/SoundEx1/SoundEx1.htm">Understanding
Classic SoundEx Algorithms</a> provides a very nice description of how
SoundEx is used and generated.  Taking the concept one step further, you
could read <a href="http://www.lanw.com/archives/java/phonetic/default.htm">A Better Phonetic
Lookup</a> and get an algorithm that matches really well, based on how the
language works.</p>

<?php

StandardFooter();
