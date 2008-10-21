<?PHP

include '../../functions.inc';

StandardHeader(array('title' => 'Diceware',
		     'topic' => 'password',
		     'callback' => 'insert_js'));

include('../../inc/js/prng_bar.html');
?>
	
<p>If you need to generate a secure passphrase, an easy and secure method
is to use dice.  <a href="http://www.diceware.com">Diceware</a> has a
nice description of how to do that.  It uses a large list of words and a set
of dice.  You shake the dice and look up the word that was selected.</p>

<p>This page will help do those lookups faster.  It is written in JavaScript
and runs entirely in your browser &ndash; no information is relayed back to
my server.  Also, it can generate die rolls for you, but I agree with Arnold
Reinhold and say that this software really shouldn't generate passwords for
you.  There is no good way for me to prove that the random number generator
in JavaScript is of a high enough quality to ensure that the words it picks
are random enough.  That said, I would say it is good enough for most
people.</p>

<p>When you get done generating your passphrase, you might want to see <a
href="passchk.php">how strong</a> it is.</p>

<form method="POST" action="#" onSubmit="return false" name="diceware_form">
<p><b>Enter your die rolls below.</b>  Every five numbers will generate
one word.</p>
<p><input type=text size=80 name="rolls"><br>
<a href="#" onclick="AddDieRolls(); return false">Generate a word</a> &ndash;
this uses the better random number generation if the bar above is at least
orange.</p>
</form>
<?PHP

MakeBoxTop('center', 'width: 50%');

?><span id="diceware_result">Loading ...</span><?PHP
	
MakeBoxBottom();
	
StandardFooter();


function insert_js()
{
?>
<script language="javascript" src="/inc/js/sha256.js"></script>
<script language="javascript" src="/inc/js/prng.js"></script>
<script language="javascript" src="diceware.js"></script>
<script language="javascript" src="diceware_words.js"></script>
<?PHP
}
