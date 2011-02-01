<?php
/* -*- php -*-
 * Support Functions for Feedback System
 * 
 * Copyright (C) 2004 - Tyler Akins
 * Licensed under the GNU GPL software license.
 * See the legal.txt file for more information
 * See http://rumkin.com/software/feedback/ for more information about the
 * scripts
 * / * The feedback system uses multiple levels of controls:
 * 
 * Content filtering:  (happens on the fly)
 * - A lot of words are filtered out and replaced with symbols to make the
 *   site G rated
 * - Links starting with http:// (or some other protocols) are made into
 *   links
 * 
 * Post filtering:  (processed when the post is created)
 * - Blank messages are removed
 * - Checking for actual words
 * - Avoiding identical duplicate posts
 * - IP addresses can be banned
 * 
 * Message limiting:  (processed before the post is inserted to the database)
 * - Via cookie
 * - Via database entry based on IP block (class C)
 * / */
$GLOBALS['Banned Words'] = array(
	'/@/i',
	'/a[\\. ]*s[\\. ]*s[\\. ]*h[\\. ]*o[\\. ]*l[\\. ]*e/i',
	'/ball[sz]/i',
	'/b[\\. ]*[i1][\\. a]*t[\\. ]*c[\\. c]*h(es)?/i',
	'/boner/i',
	'/bastard/i',
	'/blowjob/i',
	'/butt ?hole/i',
	'/clit(erous)?/i',
	'/c[-\\* _]?o[-\\* _]?c[-\\* _]?k/i',
	'/c[- _]?u[- _]?n[- _]?t/i',
	'/d[\\. ]*a[\\. ]*m[\\. ]*n(it)?/i',
	'/d[\\. ]?[i1][\\. ]?c[\\. ]?k/i',
	'/d[iy]ke/i',
	'/d\.?i\.?l\.?d\.?o/i',
	'/dumb[aÅ][s§][s§](e[s§])?/i',
	'/f ?a ?g ?(g ?o ?t ?t?)?s?/i',
	'/fuk/i',
	'/(f|ph)[- _\\.]?[uù8][- _\\.]?c[- _\\.]?(k|\|\<)(er)?/i',
	'/foursome/i',
	'/fisting/i',
	'/fetish/i',
	'/fuicking/i',
	'/fukc/i',
	'/fcuk/i',
	'/goddamn?/i',
	'/homo[\']?s/i',
	'/hump/i',
	'/my b[\\. ]?a[\\. ]?l[\\. ]?l[\\. ]?s/i',
	'/n[\\. ]?[i1\\!][\\. ]?g[\\. ]?g[\\. ]?[ae][[\\. ]?r?/i',
	'/phuck(er)?/i',
	'/p ?[3e] ?n ?[il1|] ?[s§]/i',
	'/p ?u ?s ?s ?y/i',
	'/rim +job/i',
	'/s[-\\. ]?h[-\\. ]?[i1\\!][-\\. ]?t/i',
	'/sexual/i',
	'/s[- _]?l[- _]?u[- _]?t/i',
	'/strap-?on/i',
	'/sperm/i',
	'/tits/i',
	'/vagina/i',
	
	
	// Phrases
	'/(sucks?|licks?) (my|your)? (balls|nuts)/i',
	
	
	// Phone numbers
	'/2152441[0-9]{3}/',
	'/2679817[0-9]{3}/',
	
	
	// Banned web site plugs
	'/3gforfree/i',
	'/bbssm(\.com)?/i',
	'/card-?poker/',
	'/casino[^ ]*\.(com|info|net|org|ru)/i',
	'/hai2u\.com/i',
	'/lemonparty/i',
	'/lacasaproductions/i',
	'/piercing-kingdom\.info/i',
	'/ringcities/i',
	'/teletorrents\.org/i',
	'/treasuretrooper\.com/i',
	
	
	// URL Redirectors
	'/hideurl\.net/',
	'/tinyurl\.com/'
);
BanSpecialWord('a[\\. ]*s[\\. ]*s[\\. ]?');
BanSpecialWord('ass');
BanSpecialWord('cumm?(ed)?');
BanSpecialWord('hell');
BanSpecialWord('raped?');
BanSpecialWord('sex');
$GLOBALS['Your Name'] = 'Your Name';
$GLOBALS['Your Message'] = 'Your Message';
$GLOBALS['Post Message'] = array(
	0 => 'Your message has been posted.',
	1 => 'The duplicate message was skipped.',
	2 => 'Enter a message for it to be posted.',
	3 => 'Too many posts at once.  Wait a while or come back later.',
	4 => 'Message posted.  Remember, this isn\'t ' . '<a href="/reference/site/chat.html">live chat</a>.',
	5 => 'Message sanity checks failed.  Try using real words.',
	6 => 'Invalid message.',
	7 => 'Do not post your phone number unless you want EVERYONE to ' . 'call.<br>If you really want to post it, separate each number ' . 'with spaces.',
	8 => 'This machine has been banned due to naughty messages.',
	9 => 'Sorry, but three seems to be a problem with your browser.',
);


function ShowTopic($topic, $theme, $messages = 20) {
	$dbconn = OpenDBConnection('Topic');
	
	/* Current topic or the "*" topic
	 * Last 180 days */
	$result = mysql_query('select name, message, posttime + 0 as posttime, ip_addr ' . 'from messages ' . 'where (topic = "' . addslashes($topic) . '" ' . 'or topic = "*") and DATE_ADD(posttime, INTERVAL 180 DAY) >= NOW() ' . 'order by posttime desc limit ' . $messages, $dbconn);
	$data = array();
	$res = mysql_fetch_array($result);
	
	while ($res) {
		$data[] = $res;
		$res = mysql_fetch_array($result);
	}
	
	mysql_free_result($result);
	Topic_ShowForm($topic, $theme, $page);
	Topic_ShowMessages($data);
}


function Topic_ShowMessages($data) {
	echo '<span><br>';
	
	// $data = array_reverse($data);
	$useBr = 0;
	
	foreach ($data as $d) {
		if ($useBr)echo '<br>';
		else $useBr = 1;
		echo '<b>' . htmlspecialchars(topic_censor($d['name'])) . ':</b> ';
		echo MakeLinks(htmlspecialchars(topic_censor($d['message'])));
		echo ' - <tt>(' . ShortTime($d['posttime']) . ")</tt>\n";
	}
	
	echo '</span>';
}

$GLOBALS['MonthNumToName'] = array(
	'01' => 'Jan',
	'02' => 'Feb',
	'03' => 'Mar',
	'04' => 'Apr',
	'05' => 'May',
	'06' => 'Jun',
	'07' => 'Jul',
	'08' => 'Aug',
	'09' => 'Sep',
	'10' => 'Oct',
	'11' => 'Nov',
	'12' => 'Dec'
);


function ShortTime($d) {
	$posttime = mktime(substr($d, 8, 2), substr($d, 10, 2), substr($d, 12, 2), substr($d, 4, 2), substr($d, 6, 2), substr($d, 0, 4));
	
	if (time() - $posttime < 60 * 60 * 12) {
		return substr($d, 8, 2) . ':' . substr($d, 10, 2);
	}
	
	if (time() - $posttime < 60 * 60 * 24 * 300) {
		return $GLOBALS['MonthNumToName'][substr($d, 4, 2)] . '&nbsp;' . substr($d, 6, 2);
	}
	
	return substr($d, 0, 4) . '&nbsp;' . $GLOBALS['MonthNumToName'][substr($d, 4, 2)];
}


function Topic_ShowForm($topic, $theme, $page) {
	
	?>
<form method=post action="/topic.php" name=f_form>
<input type=hidden name=topic value="<?php echo htmlspecialchars($topic) ?>">
<input type=hidden name=theme value="<?php echo htmlspecialchars($theme) ?>">
<script language="JavaScript">
var l=parent.document.location.href,i=0,count=0;
while(count<3&&l.length>i){if(l.charAt(i++)=='/'){count++;}}
document.write('<input type=hidden name=page value="'+escape(l.substr(i-1,l.length))+'">');
</script>
<input type=text name=f_name value="<?php
	
	if (isset($_COOKIE['topic_user']))echo $_COOKIE['topic_user'];
	else echo $GLOBALS['Your Name'];
	
	?>" size=10 maxlength=50<?php
	
	if (! isset($_COOKIE['topic_user']))echo ' onfocus="clearit(this, \'' . $GLOBALS['Your Name'] . '\')"';
	
	?>>
<input type=text name=f_mesg value="<?php echo $GLOBALS['Your Message']
	
	?>" size=50 maxlength=250 onfocus="clearit(this, '<?php echo $GLOBALS['Your Message']
	
	?>')">
<input type=submit value="Add">
</form>
<?php
}


function Topic_FormJavascript() {
	
	?>
<script language="javascript"><!--
function clearit(what, v)
{	
   if (what.value == v)
      what.value = "";
}	
// --></script>
<?php
}


function Topic_Post($topic, $name, $mesg, $page) {
	$retcode = 0;
	$name = trim($name);
	$mesg = trim($mesg);
	
	// Requre a referer page
	if (empty($page)) {
		return 9;
	}
	
	// Eliminate blank messages
	if ($name == $GLOBALS['Your Name'] || $name == '' || $mesg == $GLOBALS['Your Message'] || $mesg == '')return 2;
	setcookie('topic_user', $name, time() + 3600 * 24 * 360);
	$p2 = preg_replace('/(\\?|%3F).*/', '', $page);
	
	if (! file_exists($_SERVER['DOCUMENT_ROOT'] . $p2))return 6;
	
	if (preg_match('/<[ \\t\\r\\n]*a[ \\t\\r\\n]*href/', $mesg))return 6;
	
	if (preg_match('/<[ \\t\\r\\n]*script/', $mesg))return 6;
	
	if (preg_match('/\\(?[0-9]{3}\\)?[- \\.]?[0-9]{3}[- \\.]?[0-9]{4}/', $mesg))return 7;
	
	// Handle the reserved name (the admin name)
	$n2 = strtolower($name);
	$n2 = preg_replace('/[^a-z0-9]/', '', $n2);
	
	if (preg_match('/^ty[li1]er(a(k[li1]ns?)?)?$/i', $n2))$name = 'Not Tyler';
	
	if ($n2 == 'administrator' || $n2 == 'admin')$name = 'Not the Administrator';
	
	if ($name == $GLOBALS['Topic Reserved Name'])$name = 'Tyler';
	
	// Check for valid words
	$mesg2 = preg_replace('/[-\\/_@\\.\']/', ' ', $mesg);
	$mesg2 = explode(' ', $mesg2);
	
	foreach ($mesg2 as $m) {
		if (strlen($m) >= 25) {
			// There aren't a lot of 25-letter words out there.
			return 5;
		}
	}
	
	$dbconn = OpenDBConnection('Topic');
	mysql_select_db($Info['DB'], $dbconn);
	
	// Check for banned IP addresses
	$result = mysql_query('select count(*) from banned_ip ' . 'where ipaddr = INET_ATON("' . $_SERVER['REMOTE_ADDR'] . '")', $dbconn);
	$row = mysql_fetch_row($result);
	mysql_free_result($result);
	
	if ($row[0])return 8;
	
	// Look for an identical post (skip if one is found)
	$result = mysql_query('select count(*) from messages ' . 'where topic = "' . addslashes($topic) . '" ' . 'and LOWER(name) = "' . addslashes($name) . '" ' . 'and LOWER(message) = "' . addslashes($mesg) . '" ' . 'and NOW() - posttime < 60 * 60 * 24', $dbconn);
	$row = mysql_fetch_row($result);
	mysql_free_result($result);
	
	if ($row[0])return 1;
	
	// If you aren't the admin ...
	if ($name != 'Tyler') {
		// Extra-complicated thingie to allow 2 posts every 10 minutes or so.
		$Seconds = 600;
		
		// Cookie Version
		$NewerPost = 0;
		$OlderPost = 0;
		
		if (isset($_COOKIE['last_post'])) {
			$Parts = split(';', $_COOKIE['last_post']);
			$NewerPost = $Parts[0];
			$OlderPost = $Parts[1];
			settype($NewerPost, 'integer');
			settype($OlderPost, 'integer');
		}
		
		setcookie('last_post', time() . ';' . $NewerPost, time() + 3600 * 24 * 360);
		
		if (time() - $OlderPost < $Seconds)return 3;
		
		if (time() - $NewerPost < $Seconds)$retcode = 4;
		
		// Database Version
		mysql_query('delete from recent_ip where DATE_ADD(last_post, INTERVAL ' . $SECONDS . ' SECOND) < NOW()', $dbconn);
		$ip = $_SERVER['REMOTE_ADDR'];
		$ip3 = substr($ip, 0, strrpos($ip, '.') - 1);
		$ip3 = addslashes($ip3);
		$result = mysql_query('select count(*) from recent_ip ' . 'where ip_addr = "' . $ip3 . '"', $dbconn);
		$data = mysql_fetch_row($result);
		
		if ($data[0] >= 2)return 3;
		
		if ($data[0] > 0)$retcode = 4;
		mysql_query('insert into recent_ip (ip_addr, last_post) values ("' . $ip . '", NOW() + 0)', $dbconn);
	}
	
	mysql_query('insert into messages (id, topic, name, message, page, ' . 'posttime, ip_addr, seen) ' . 'values (NULL, "' . addslashes($topic) . '", "' . addslashes($name) . '", "' . addslashes($mesg) . '", "' . addslashes($page) . '", NOW(), "' . $_SERVER['REMOTE_ADDR'] . '", 0)');
	return $retcode;
}


function Topic_Censor($str) {
	return preg_replace_callback($GLOBALS['Banned Words'], 'Topic_Censor_Word', $str);
}


function Topic_Censor_Word($matches) {
	$rep = array(
		'a' => '@',
		'Å' => '@',
		'b' => '&',
		'c' => '(',
		'd' => ')',
		'e' => '#',
		'f' => '&',
		'g' => '&',
		'h' => '#',
		'i' => '!',
		'j' => ';',
		'k' => '<',
		'l' => '|',
		'm' => '^',
		'n' => '~',
		'o' => '*',
		'p' => '}',
		'q' => '%',
		'r' => '&',
		's' => '$',
		'§' => '$',
		't' => '+',
		'u' => '_',
		'ù' => '_',
		'v' => '>',
		'w' => '?',
		'x' => '=',
		'y' => '-',
		'z' => '%',
		'0' => '#',
		'1' => '#',
		'2' => '#',
		'3' => '#',
		'4' => '#',
		'5' => '#',
		'6' => '#',
		'7' => '#',
		'8' => '#',
		'9' => '#'
	);
	
	if ($matches[0] == '@')return ' [at] ';
	$str = strtolower($matches[0]);
	
	foreach ($rep as $from => $to) {
		$str = str_replace($from, $to, $str);
	}
	
	return $str;
}


function MakeLinks($str) {
	$firstPos = false;
	
	foreach (array(
			'http://',
			'https://',
			'ftp://',
			'telnet:',
			'mailto:',
			'gopher://',
			'news://'
		) as $token) {
		$testPos = strpos(strtolower($str), $token);
		
		if ($testPos !== false && ($firstPos === false || $testPos < $firstPos)) {
			$firstPos = $testPos;
		}
	}
	
	if ($firstPos === false)return $str;
	$lastPos = strlen($str) - 1;
	
	while (in_array($str[$lastPos], array(
				'.',
				',',
				' ',
				'!',
				'?',
				'<',
				'>',
				'(',
				')',
				'-',
				':',
				'"',
				'\'',
				'[',
				']',
				'{',
				'}',
				'|',
				'`',
				'*'
			)))$lastPos --;
	
	foreach (array(
			' ',
			'<',
			'>',
			'. ',
			', ',
			'(',
			')',
			'"',
			'&quot;',
			'&lt;',
			'&gt;',
			'.<',
			'.&gt;',
			'.>',
			'.&lt;',
			']',
			'[',
			'{',
			'}',
			';',
			"\240"
		) as $token) {
		$testPos = strpos($str, $token, $firstPos);
		
		if ($testPos !== false && $testPos - 1 < $lastPos) {
			$lastPos = $testPos - 1;
		}
	}
	
	$link = substr($str, $firstPos, ($lastPos - $firstPos) + 1);
	
	if (! preg_match('/:(\/\/)?.+\.[a-zA-Z]+/', $link)) {
		$str = substr($str, 0, $firstPos) . $link . MakeLinks(substr($str, $lastPos + 1));
	} else {
		$str = substr($str, 0, $firstPos) . '<a target=_top href="' . $link . '">' . $link . '</a>' . MakeLinks(substr($str, $lastPos + 1));
	}
	
	return $str;
}


function LastMessageTime($topic) {
	$dbconn = OpenDBConnection('Topic');
	$result = mysql_query('select UNIX_TIMESTAMP(posttime) from messages ' . 'where topic = "' . addslashes($topic) . '" ' . 'or topic = "*" ' . 'order by posttime desc limit 1', $dbconn);
	$res = mysql_fetch_array($result);
	
	if ($res)return $res[0];
	return time();
}


function BanSpecialWord($word) {
	$sp = '[ \\.\\-]';
	$GLOBALS['Banned Words'][] = '/^' . $word . $sp . '/i';
	$GLOBALS['Banned Words'][] = '/^' . $word . '$/i';
	$GLOBALS['Banned Words'][] = '/' . $sp . $word . $sp . '/i';
	$GLOBALS['Banned Words'][] = '/' . $sp . $word . '$/i';
}

