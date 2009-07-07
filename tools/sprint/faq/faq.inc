<?php
/* Sprint File Uploader
 * 
 * Copyright (C) 2003-2005 - Tyler Akins
 * Licensed under the GNU GPL software license.
 * See the LEGAL file for legal information
 * See http://rumkin.com/tools/sprint/ for more information about these tools
 */
$GLOBALS['Topics'] = array(
	'High-Priority Topics' => array(
		'special_problems' => 'Problems with specific phones and carriers',
		'bluestealth' => 'Info on Bluestealth and e-Stealth software',
	),
	'Initial Concerns / Background Info' => array(
		'about' => 'What is this uploader site thing?',
		'charge' => 'Is there any charge for using this service?  Is this ' . 'site really free?',
		'non_sprint' => 'Does this work with non-Sprint phones?',
		'requirements' => 'What do I need for the uploader to work?',
		'usage' => 'How do I use the uploader?',
		'phones' => 'What does my phone support?  What phones work with ' . 'the uploader?',
		'sms_emails' => 'What is my phone\'s SMS email address?',
		'resize' => 'Will the image be shrunk to fit my phone?',
		'screen_size' => 'What if my screen size doesn\'t match what you ' . 'show on the jump page?',
		'jump' => 'Can I skip the SMS process and just bookmark you?',
		'jumpcode' => 'What are jump codes?',
		'privacy' => 'What do you do with my phone number / email?',
		'list_uploads' => 'Can I view what others have uploaded?',
	),
	'File Conversion and Modification' => array(
		'mp3' => 'How do I create / upload MP3 files?',
		'm4a' => 'How do I create / upload M4A files?',
		'qcp' => 'How do I make a QCP file (voice ringer for Sprint phones)?',
		'loud' => 'How can I make ringers louder?',
		'midi' => 'How do I create a MIDI file?',
	),
	'Uploading Problems' => array(
		'formats' => 'What types of files can I upload?',
		'folder' => 'The file is in the wrong folder.  How can I fix this?',
		'missing' => 'I just uploaded a file and now I can\'t find it.',
		'java' => 'This midlet (game / program) doesn\'t work!  Why not?',
		'jad' => 'I don\'t have a .jar file; I only have a .jad file.',
		'gif' => 'My animated GIF doesn\'t work on my phone.',
		'authenticity' => 'Why does my phone say it cannot guarantee the ' . 'authenticity of the file I am downloading?',
		'size_match' => 'The size of the file I downloaded is not the same ' . 'size as the file I uploaded.',
		'not_working' => 'Uploading isn\'t working!  What do I do?',
	),
	'Phone Error Messages' => array(
		'handler' => 'What is "A Handler Is Needed To Use This Content Type"?',
		'e406' => 'What is "Data Error 406 / Content Not Acceptable"?',
		'e901' => 'What is "Data Error 901 / Content Size Too Large"?',
		'e903' => 'What is "Data Error 901 / Loss of Service"?',
		'e904' => 'What is "Data Error 904 / Size Mismatched"?',
		'e905' => 'What is "Data Error 905 / Attribute Mismatch"?',
		'e906' => 'What is "Data Error 906 / Invalid Descriptor"?',
		'e907' => 'What is "Data Error 907 / Server Error"?',
		'e984' => 'What is "Data Error 984 / Size Mismatched"?',
		'no_exact' => 'What is "No Exact URL"?',
	),
	'Developer Questions' => array(
		'code' => 'Can I see / download your code?',
		'list' => 'Can I be notified of updates?',
		'mime_type' => 'What are MIME types?  Which ones do I use?',
		'gcd' => 'What are GCD files?',
		'cache' => 'Does Sprint cache files?',
		'could_not_run_query' => 'I get a "Could not run query" error ' . 'when I installed the uploader on my site.  Why?',
		'issues' => 'What other issues are there?',
	),
);


function FAQStandardHeader($topic) {
	SprintStandardHeader('Uploader FAQ', 1);
	echo "<p><a href=\"index.php\">FAQ Topic Index</a></p>\n";
	Section(htmlspecialchars($topic));
}


function FAQLink($topic, $text) {
	if ($GLOBALS['FAQ Topic'] != 'all') {
		return '<a href="index.php?Topic=' . urlencode($topic) . '">' . htmlspecialchars($text) . '</a>';
	}
	
	return '<a href="#' . urlencode($topic) . '">' . htmlspecialchars($text) . '</a>';
}


function GetTopicTitle($Topic, $arr = false) {
	if (! is_array($arr)) {
		$arr = $GLOBALS['Topics'];
	}
	
	foreach ($arr as $k => $v) {
		if (is_array($v)) {
			$t = GetTopicTitle($Topic, $v);
			
			if ($t)return $t;
		}
		
		if ($k == $Topic)return $v;
	}
	
	return false;
}

