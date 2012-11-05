<?php

$GLOBALS['Topics'] = array(
	'Alternative Methods' => array(
		'lawn' => 'Lawn Care',
	),
	'Electronics' => array(
		'rng' => 'Inexpensive Random Number Generator',
		'ir_webcam' => 'Infrared Webcam Modification',
		'noise_cancel' => 'Noise Cancellation Headphones',
	),
	'Engineering (of some sort)' => array(
		'fan' => 'Japan Magnetic Fan Company',
		'walls' => 'Parametric Amplification of Sound',
		'perpetual_motion' => 'Perpetual Motion Machines and Related Information',
		'water_hardness' => 'Water Hardness Control',
	),
	'Math' => array(
		'pinball' => '2D Ball Bouncing Off Of Walls',
	),
);


/* Find the topic to display
 * all = ... well, all of them */
$Topic = '';

if ($_GET['Topic'])$Topic = $_GET['Topic'];
$Topic = strtolower($Topic);
$TopicTitle = false;

// Make sure the topic is valid
if ($Topic != '') {
	$TopicTitle = GetTopicTitle($Topic);
	
	if (! $TopicTitle)$Topic = '';
}
include '../../functions.inc';

if ($Topic == 'pinball')
include '../../inc/math.php';

if ($TopicTitle && file_exists($Topic . '.inc')) {
	TopicStandardHeader($TopicTitle, $Topic);
	include($Topic . '.inc');
} else {
	TopicStandardHeader();
	IntroParagraph();
	ShowTopics();
}

StandardFooter();


function IntroParagraph() {
	
	?>

<p>Ever have an idea that it seems like the world is ignoring?  It could be
funky, bizarre, abstract, and completely wrong, but it is still amusing or
interesting to think about.  Here are my ideas and ideas that were presented
by others but are useful and fun to think about.</p>
	
<?php
}


function TopicStandardHeader($topic = false, $page = false) {
	StandardHeader(array(
			'title' => 'Oddball Ideas',
			'topic' => 'ideas'
		));
	
	if ($topic !== false) {
		Section(htmlspecialchars($topic));
		echo "<p><a href=\"index.php\">Oddball Idea Index</a></p>\n";
	}
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
			echo '<li>' . IdeaLink($k, $v) . "\n";
		}
	}
	
	echo "</ul>\n";
}


function IdeaURL($file) {
	return 'index.php?Topic=' . urlencode($file);
}


function IdeaLink($file, $desc) {
	return '<a href="' . IdeaURL($file) . '">' . htmlspecialchars($desc) . '</a>';
}


function Separator() {
	return '<hr width=90% size=6 noshade>';
}

