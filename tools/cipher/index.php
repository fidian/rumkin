<?php

require '../../functions.inc';
StandardHeader(array(
		'title' => 'Cipher Tools',
		'topic' => 'cipher'
	));

?>

<p>Let's say that you need to send your friend a message, but you don't want
another person to know what it is.  You can use a full-blown encryption
tool, such as PGP.  If the message isn't that important or if it is intended
to be decrypted by hand, you should use a simpler tool.  This is a page
dedicated to simple text manipulation tools, which all can be replicated with
just paper and pencil.</p>

<p>If you know of another cipher that you think should be on here, leave me
a message below.</p>

<?php

$Links = array(
	array(
		'Name' => 'Affine',
		'Desc' => 'Similar to a Caesarian shift, but also adds in a ' . 'multiplier to further scramble letters.',
		'URL' => 'affine.php'
	),
	array(
		'Name' => 'Baconian',
		'Desc' => 'Used to hide a message within another message, by ' . 'using different typefaces or other distinguishing ' . 'characteristics.',
		'URL' => 'baconian.php'
	),
	array(
		'Name' => 'Base64',
		'Desc' => 'This is typically used to make binary data safe to ' . 'transport as strictly text.',
		'URL' => 'base64.php'
	),
	array(
		'Name' => 'Bifid',
		'Desc' => 'Breaks information for each letter up and spreads it ' . 'out in the encoded message.  An easy and fairly secure ' . 'pencil & paper cipher.',
		'URL' => 'bifid.php'
	),
	array(
		'Name' => 'Caesarian Shift',
		'Desc' => 'Where ROT13 was based on you adding 13 to the ' . 'letters, a Caesar cipher lets you add an arbitrary value.  Again, ' . 'you can do it with the cryptogram solver, but you can ' . 'scroll through values of N pretty easily with this tool.',
		'URL' => 'caesar.php'
	),
	array(
		'Name' => 'Keyed Caesar',
		'Desc' => 'Similar to a Caesar cipher, but you first alter the ' . 'encoded alphabet with a word or phrase.',
		'URL' => 'caesar-keyed.php'
	),
	array(
		'Name' => 'Columnar Transposition',
		'Desc' => 'Write a message as a long column and then swap ' . 'around the columns.  Read the message going down the columns. ' . 'A simple cypher, but one that is featured on the Kryptos ' . 'sculpture at the CIA headquarters.',
		'URL' => 'coltrans.php'
	),
	array(
		'Name' => 'Double Transposition',
		'Desc' => 'Because two is better than one.  Used by the U.S. ' . 'Army during World War II.',
		'URL' => 'coltrans-double.php'
	),
	array(
		'Name' => 'Cryptogram Solver',
		'Desc' => 'This helps you solve simple ciphers; the methods ' . 'where you replace letter X with letter Y.',
		'URL' => 'cryptogram.php'
	),
	array(
		'Name' => 'Gronsfeld',
		'Desc' => 'The exact same thing as a Vigenere cipher, but it ' . 'uses numbers instead of a key word.',
		'URL' => 'gronsfeld.php'
	),
	array(
		'Name' => 'Morse Code',
		'Desc' => 'Once used to transmit messages around the world, ' . 'this system can still be used in certain situations to ' . 'send messages effectively when alternate mediums are ' . 'not available.',
		'URL' => 'morse.php'
	),
	array(
		'Name' => 'Letter Numbers',
		'Desc' => 'Replace each letter with the number of its position ' . 'in the alphabet.  A simple replacment method that is usually ' . 'the first one taught to children and is still an effective ' . 'way to obscure your message.',
		'URL' => 'numbers.php'
	),
	array(
		'Name' => 'One Time Pad',
		'Desc' => 'A virtually uncrackable cipher that relies heavily ' . 'upon a random source for an encryption key.',
		'URL' => 'otp.php'
	),
	array(
		'Name' => 'Playfair',
		'Desc' => 'This cipher uses pairs of letters and a 5x5 grid ' . 'to encode a message.  It is fairly strong for a pencil and ' . 'paper style code.',
		'URL' => 'playfair.php'
	),
	array(
		'Name' => 'Railfence',
		'Desc' => 'A mildly complicated one where you align letters ' . 'on different rows and then squish the letters together in ' . 'order to create your ciphertext.',
		'URL' => 'railfence.php'
	),
	array(
		'Name' => 'ROT13',
		'Desc' => 'A popular method of hiding text so that only people ' . 'who actually take the time to decode it can actually read ' . 'it.  You swap letters; A becomes N, and N becomes A.  It ' . 'was quite popular on bulletin board systems and Usenet ' . 'newsgroups.  You can do it with the cryptogram solver ' . 'also, if you make A=N, B=O, C=P, etc.',
		'URL' => 'rot13.php'
	),
	array(
		'Name' => 'Rotate',
		'Desc' => 'This acts as though you are writing the letters ' . 'in a rectangular grid and then rotating the grid to the ' . 'left or right 90&deg;.',
		'URL' => 'rotate.php',
		'Escape' => false
	),
	array(
		'Name' => 'Skip',
		'Desc' => 'To decode this, you count N characters, write ' . 'down the letter, count forward N characters, write down ' . 'the letter, etc.  It is used for section 3 of the Kryptos.',
		'URL' => 'skip.php'
	),
	array(
		'Name' => 'Substitution',
		'Desc' => 'Substitute your plaintext letters with other letters, ' . 'images, or codes.  Includes two common pigpen ciphers and ' . 'the Sherlock Holmes\' Dancing Men cipher.',
		'URL' => 'substitution.php'
	),
	array(
		'Name' => '&Uuml;bchi',
		'Desc' => 'A double columnar transposition cipher that uses ' . 'the same key, but adds a number of pad characters.  Used ' . 'by the Germans in WWI.',
		'URL' => 'ubchi.php',
		'Escape' => false
	),
	array(
		'Name' => 'Vigenere',
		'Desc' => 'A special cipher somewhat based on the Caesarian ' . 'shift, but you change the value of N with each ' . 'letter and it is all based on a passphrase.  A pretty ' . 'strong cipher for beginners, and one that can be done ' . 'on paper easily.',
		'URL' => 'vigenere.php'
	),
	array(
		'Name' => 'Keyed Vigenere',
		'Desc' => 'This modified cipher uses an alphabet that is ' . 'out of order.  Two keys are used.  One creates the ' . 'alphabet, the second is the encoding passphrase.  ' . 'This was created to help decrypt the Kryptos ' . 'sculpture.',
		'URL' => 'vigenere-keyed.php'
	),
	array(
		'Name' => 'Vigenere Autokey',
		'Desc' => 'Instead of repeating the password used in order ' . 'to encrypt text, this uses the password once and then ' . 'the plaintext.  It is harder to break than if you were ' . 'to just use the password to encrypt your message.',
		'URL' => 'vigenere-autokey.php'
	),
);
MakeLinkList($Links);
Section('Related Tools');

?>

<p>These pages are not cipher pages, but they do relate to ciphers.  They
are included here to make your life easier.</p>

<?php

$Links = array(
	array(
		'Name' => 'Cryptogram Solver',
		'Desc' => 'If you have a plain text message, this will help ' . 'find possible solutions in a matter of seconds.  It works ' . 'with simple substitution ciphers in plain English only.',
		'URL' => 'cryptogram-solver.php'
	),
	array(
		'Name' => 'Letter Frequency',
		'Desc' => 'Shows how often certain letters appear in your ' . 'text.  Used primarily to assist in decryption.',
		'URL' => 'frequency.php'
	),
	array(
		'Name' => 'Text Manipulator',
		'Desc' => 'Change text around, make things upper- or lowercase,' . 'count/remove spaces.  Also does various statistical analyses ' . 'on the source text.',
		'URL' => 'manipulate.php'
	),
);
MakeLinkList($Links);
StandardFooter();
