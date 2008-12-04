<?php
/* -*- php -*-
 * Options:
 *    ['title'] = The page's title
 *    ['header'] = The title to display at the top of the page
 *                 Defaults to ['title'] if not set.
 *    ['menu'] = TRUE/false - display menu (default = true)
 *    ['callback'] = Name of PHP function to call back to add extra
 *                   info in the headers (optional)
 *    ['icon'] = URL of the shortcut icon (optional)
 *    ['topic'] = The topic for the feedback box (unspecified = no box)
 *    ['tagline'] = TRUE/false - display email, fortune, etc.
 *                  (default = true) */
function StandardHeader($Opts = 'Untitled') {
	if (! is_array($Opts))$Opts = array(
		'title' => $Opts
	);
	
	if (! isset($Opts['header']))$Opts['header'] = $Opts['title'];
	$GLOBALS['CurrentTheme'] = $GLOBALS['DefaultTheme'];
	
	if (! isset($Opts['icon']))$Opts['icon'] = '/favicon.ico';
	
	// For google maps
	if (isset($Opts['html']))$Opts['html'] = ' ' . trim($Opts['html']);
	else $Opts['html'] = '';
	
	if (! isset($Opts['backlink']) || $Opts['backlink'])$Opts['Backlinks'] = BackLink();
	else $Opts['Backlinks'] = false;
	$GLOBALS['HeaderOpts'] = $Opts;
	include 'templates/header.php';
}


function Section($name, $linkname = '') {
	echo '<div style="clear: both"></div>';
	echo '</div><div class="r_main"><h2 class="r_sect">';
	
	if ($linkname != '')echo '<a name="' . $linkname . '"></a>';
	echo $name . "</h2>\n";
}


function MakeBoxTop($align = '', $style = '') {
	if ($align == 'left') {
		$align = ' align="left"';
		$style = 'margin: 8px 8px 8px 0px;' . $style;
	} elseif ($align == 'right') {
		$align = ' align="right"';
		$style = 'margin: 8px 0px 8px 8px;' . $style;
	} elseif ($align == 'center') {
		$align = ' align="center"';
		$style = 'margin-top: 8px; margin-bottom: 8px;' . $style;
	} else {
		$align = '';
	}
	
	if ($style != '')$style = ' style="' . $style . '"';
	echo '<table border=0 cellpadding=0 cellspacing=0 class="r_box"' . $align . $style . '><tr><td class="r_box">';
}


function MakeBoxBottom() {
	echo '</td></tr></table>';
}


function ShowTrivia() {
	$dbconn = OpenDBConnection('Trivia');
	$result = mysql_query('select info, quote from trivia ' . 'where category != 4 and char_length(info) < 250 ' . 'order by rand() limit 1', $dbconn);
	$data = mysql_fetch_array($result);
	mysql_free_result($result);
	echo $data[0];
	
	if ($data[1] != '')echo '<br><quote>&ndash; ' . $data[1] . '</quote>';
}


function StandardFooter() {
	$useTopic = false;
	$useTagline = true;
	$adInfo = false;
	$ads = array(
		'sprint' => array(
			'pub-4030324319031673',
			'0545850087',
			728,
			90
		),
	);
	
	if (isset($GLOBALS['HeaderOpts']['ads']) && isset($ads[$GLOBALS['HeaderOpts']['ads']])) {
		$adInfo = $ads[$GLOBALS['HeaderOpts']['ads']];
	}
	
	if (isset($GLOBALS['HeaderOpts']['topic']))$useTopic = $GLOBALS['HeaderOpts']['topic'];
	
	if (isset($GLOBALS['HeaderOpts']['tagline']))$useTagline = $GLOBALS['HeaderOpts']['tagline'];
	
	if ($useTopic) {
		$TopicURL = '/topic.php?&topic=' . urlencode($GLOBALS['HeaderOpts']['topic']) . '&theme=' . urlencode($GLOBALS['CurrentTheme']);
	}
	include 'templates/footer.php';
}


function MakeLinkList($Data) {
	echo "<table cellspacing=1 cellpadding=3 border=2>\n";
	
	foreach ($Data as $Item) {
		$Escape = true;
		
		if (isset($Item['Escape']) && $Item['Escape'] == false)$Escape = false;
		$name = $Item['Name'];
		
		if ($Escape)$name = htmlspecialchars($name);
		echo '<tr><td><b><a href="' . $Item['URL'] . '">' . $name . "</a></b></td><td>\n";
		
		if (is_array($Item['Desc'])) {
			$br = 0;
			
			foreach ($Item['Desc'] as $d) {
				if ($br == 0)$br = 1;
				else echo "<br>\n";
				$desc = $d;
				
				if ($Escape)$desc = htmlspecialchars($desc);
				echo $desc;
			}
		} else {
			$desc = $Item['Desc'];
			
			if ($Escape)$desc = htmlspecialchars($desc);
			echo $desc;
		}
		
		echo "</td></tr>\n";
	}
	
	echo "</table>\n";
}

