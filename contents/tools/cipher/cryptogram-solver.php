<?php


require '../../functions.inc';
StandardHeader(array(
		'title' => 'Cryptogram Solver',
		'topic' => 'cipher'
	));
$dictionaries = array(
	'american-english-small' => 'American English (Small)',
	'american-english' => 'American English (Medium)',
	'american-english-large' => 'American English (Large)',
	'american-english-huge' => 'American English (Huge)',
	'brazilian' => 'Brazilian',
	'british-english-small' => 'British English (Small)',
	'british-english' => 'British English (Medium)',
	'british-english-large' => 'British English (Large)',
	'british-english-huge' => 'British English (Huge)',
	'canadian-english-small' => 'Canadian English (Small)',
	'canadian-english' => 'Canadian English (Medium)',
	'canadian-english-large' => 'Canadian English (Large)',
	'canadian-english-huge' => 'Canadian English (Huge)',
	'catalan' => 'Catalan',
	'danish' => 'Danish',
	'dutch' => 'Dutch',
	'faroese' => 'Faroese',
	'finnish' => 'Finnish',
	'french' => 'French',
	'galician' => 'Galician (Minimos)',
	'ngerman' => 'German (New)',
	'ogerman' => 'German (Old)',
	'italian' => 'Italian',
	'bokmaal' => 'Norwegian (Bokmal)',
	'norsk' => 'Norwegian (Norsk)',
	'nynorsk' => 'Norwegian (Nynorsk)',
	'polish' => 'Polish',
	'portuguese' => 'Portuguese (European)',
	'spanish' => 'Spanish',
	'swedish' => 'Swedish',
	'swiss' => 'Swiss (German)',
);
$dictionary = 'american-english';
$text = '';

if (isset($_POST['text']) && $_POST['text'] != '') {
	$text = $_POST['text'];
	
	if (get_magic_quotes_gpc()) {
		$text = stripslashes($text);
	}
}

if (isset($_POST['dict']) && isset($dictionaries[$_POST['dict']])) {
	$dictionary = $_POST['dict'];
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
Dictionary:  <select name="dict">
<?PHP

foreach ($dictionaries as $dictName => $dictDesc) {
	echo '<option value="' . $dictName . '"';
	if ($dictName == $dictionary) {
		echo ' SELECTED';
	}
	echo '>' . htmlspecialchars($dictDesc) . "</option>\n";
}

?>
</select><br>
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
	$a = exec('./cryptogram "' . $text . '" wordlists/' . $dictionary, $out);
	$out = implode("<br>\n", $out);
	
	if ($out == '') {
		echo 'Sorry, no quotes found.';
	} else {
		echo $out;
	}
}

StandardFooter();
