<?php
/* Sprint File Uploader
 * 
 * Copyright (C) 2003-2005 - Tyler Akins
 * Licensed under the GNU GPL software license.
 * See the LEGAL file for legal information
 * See http://rumkin.com/tools/sprint/ for more information about these tools
 */
$Extra_Pre = '../';
include '../common.inc';
include 'faq.inc';


/* Find the topic to display
 * all = ... well, all of them */
$GLOBALS['FAQ Topic'] = '';

if ($_GET['Topic'])$GLOBALS['FAQ Topic'] = preg_replace('/[^-_a-zA-Z0-9]/', '', $_GET['Topic']);
$GLOBALS['FAQ Topic'] = strtolower($GLOBALS['FAQ Topic']);
$TopicTitle = false;

// Make sure the topic is valid
if ($GLOBALS['FAQ Topic'] != '' && $GLOBALS['FAQ Topic'] != 'all') {
	$TopicTitle = GetTopicTitle($GLOBALS['FAQ Topic']);
	
	if (! $TopicTitle)$GLOBALS['FAQ Topic'] = '';
}

if ($TopicTitle && file_exists($GLOBALS['FAQ Topic'] . '.inc')) {
	FAQStandardHeader($TopicTitle);
	include($GLOBALS['FAQ Topic'] . '.inc');
} elseif ($GLOBALS['FAQ Topic'] == 'all') {
	SprintStandardHeader('Phone Uploader FAQ', 1);
	IntroParagraph();
	ShowTopics();
	ShowAllTopics();
} else {
	SprintStandardHeader('Phone Uploader FAQ', 1);
	ShowAllLink();
	IntroParagraph();
	ShowTopics();
}

StandardFooter();


function ShowAllLink() {
	
	?>
	
<p><a href="index.php?Topic=all">Show All Topics</a> at once (better for
printing).</p>

<?php
}


function IntroParagraph() {
	
	?>

<p>Having problems uploading files to your phone?  Need information for
writing your own upload utility?  I hope that these answers will lead you
down the right track.  If you have additional information, I would
<i>love</i> to hear it -- email me about it (link at bottom of page).</p>

<p>Just so you know, I include questions about uploading files in general to
mobilet phones &ndash; not just questions that are related directly to the
uploader.  That way, other people can write programs and set up web sites to
give data to any mobile phone easier.</p>

<?php
}


function ShowTopics() {
	Section('<a name="Top">Topics</a>');
	ShowTopicRecursive($GLOBALS['Topics']);
}


function ShowTopicRecursive($a) {
	echo "<ul>\n";
	
	foreach ($a as $k => $v) {
		if (is_array($v)) {
			echo '<li>' . htmlspecialchars($k) . "\n";
			ShowTopicRecursive($v);
		} else {
			echo '<li>' . FAQLink($k, $v) . "\n";
		}
	}
	
	echo "</ul>\n";
}


function ShowAllTopics($a = false, $depth = 1) {
	if (! is_array($a)) {
		$a = $GLOBALS['Topics'];
	}
	
	foreach ($a as $k => $v) {
		if (is_array($v)) {
			if ($depth == 1)Section(htmlspecialchars($k));
			else echo '<h' . $depth . '>' . htmlspecialchars($k) . '</h' . $depth . ">\n";
			ShowAllTopics($v, $depth + 1);
		} else {
			echo '<h' . $depth . '><a name="' . $k . '">' . htmlspecialchars($v) . '</a></h' . $depth . ">\n";
			
			if (file_exists('faq/' . $k . '.inc')) {
				include('faq/' . $k . '.inc');
			}
		}
	}
}

