<?php

require '../../functions.inc';
StandardHeader(array(
		'title' => 'Cryptogram Solver',
		'topic' => 'cipher'
	));
$text = '';

if (isset($_POST['text']) && $_POST['text'] != '') {
	$text = $_POST['text'];
	
	if (get_magic_quotes_gpc()) {
		$text = stripslashes($text);
	}
}

?>

<P>Do you have a cryptogram, also known as a cryptoquip or a simple
letter substitution cipher?  Just type it in here and get it solved within
seconds.  If there are lots of possible solutions, only a subset will be
shown.  This page does send your cryptgram to my
server, so you might not want to use it if your message is extremely 
sensitive and you think that I care about what you are submitting.  Also, only
words that are found in my dictionary will be found.  If there are proper
names or misspellings, it may cause the puzzle to be unsolved.</p>

<form name="encoder" method=post action="cryptogram-solver.php">
<textarea name="text" rows="5" cols="40"><?php echo $text ?></textarea><br>
<input type="submit" value="Solve The Cryptogram">
</form>

<?php

if ($text != '') {
	Section('The Results');
	$text = strtoupper($text);
	$text = preg_replace('/[^A-Z\']/', ' ', $text);
	$text = preg_replace('/ +/', ' ', $text);
	$text = trim($text);
	chdir(getenv('MEDIABASE') . 'tools/cipher/tools');
	$a = exec('./cryptogram "' . $text . '" wordlists/american-english', $out);
	$out = implode("<br>\n", $out);
	
	if ($out == '') {
		echo 'Sorry, no quotes found.';
	} else {
		echo $out;
	}
}

StandardFooter();
