<?php
/* Admin Viewer for Feedback System
 * 
 * Copyright (C) 2004 - Tyler Akins
 * Licensed under the GNU GPL software license.
 * See the legal.txt file for more information
 * See http://rumkin.com/software/feedback/ for more information about the
 * scripts */
include '../functions.inc';
CheckForLogin('restricted');
$dbconn = OpenDBConnection('Topic');
$maxShow = 300;

if (isset($_GET['mark'])) {
	// Mark a topic as read
	$sql = 'update messages set seen = 1 where seen = 0 and topic = "' . addslashes($_GET['mark']) . '"';
	
	if (isset($_GET['max'])) {
		$sql .= ' and id <= ' . $_GET['max'];
	}
	
	mysql_query($sql);
	
	if (isset($_GET['max'])) {
		$message = 'Marked some messages from topic "' . htmlspecialchars($_GET['mark']) . '" as seen.';
	} else {
		$message = 'Marked topic "' . htmlspecialchars($_GET['mark']) . '" as seen.';
	}
}

if (isset($_GET['ban'])) {
	// Ban an IP address
	$sql = 'insert into banned_ip (ipaddr, dq) values ' . '(INET_ATON("' . $_GET['ban'] . '"), "' . $_GET['ban'] . '")';
	$res = mysql_query($sql, $dbconn);
	$message = 'Banned IP ' . $_GET['ban'];
}

if (isset($_GET['unban'])) {
	// Unban an IP address
	$sql = 'delete from banned_ip where ipaddr = INET_ATON("' . $_GET['unban'] . '")';
	$res = mysql_query($sql, $dbconn);
	$message = 'Unbanned IP ' . $_GET['ban'];
}

$days = 0;

if (isset($_GET['days']))$days = $_GET['days'] * 1;

if ($days > 0)$header = 'Postings for the Last ' . $days . ' Days';
else $header = 'Unseen Postings (' . $maxShow . ' maximum per topic)';
StandardHeader(array(
		'title' => 'Discussion List',
		'header' => $header
	));

if (isset($message)) {
	echo "<p>$message</p>";
}

echo 'Change number of days to: ';

foreach (array(
		0,
		1,
		2,
		4,
		7,
		10,
		14,
		21,
		28,
		45,
		60
	) as $d) {
	if ($d > 0)echo " <a href=\"topic_list.php?days=$d\">$d</a>";
	else echo ' <a href="topic_list.php?days=0">Unseen</a>';
}

$sql = 'select * from messages where ';

if ($days > 0)$sql .= 'unix_timestamp(posttime) > (unix_timestamp(now()) - ' . '3600 * 24 * ' . $days . ')';
else $sql .= 'seen = 0';
$sql .= ' order by topic, posttime asc';
$result = mysql_query($sql, $dbconn);
$prevTopic = '';
$res = mysql_fetch_array($result);

while ($res) {
	if ($res['topic'] != $prevTopic) {
		$prevTopic = $res['topic'];
		$Name = htmlspecialchars($prevTopic);
		$topicCount = 0;
		
		if ($days == 0) {
			$Name .= ' - <a href="topic_list.php?mark=' . urlencode($prevTopic) . '">Mark As Seen</a>';
		}
		
		Section($Name);
	}
	
	$topicCount ++;
	
	if ($topicCount < $maxShow) {
		$result2 = mysql_query('select count(*) from banned_ip where ipaddr = ' . 'INET_ATON("' . $res['ip_addr'] . '")', $dbconn);
		$row = mysql_fetch_row($result2);
		mysql_free_result($result2);
		$name = htmlspecialchars($res['name']);
		$message = MakeLinks(htmlspecialchars($res['message']));
		$ip = $res['ip_addr'];
		$page = '<a href="' . $res['page'] . '">' . $res['page'] . '</a>';
		$time = $res['posttime'];
		$banlink = '<a href="topic_list.php?ban=' . urlencode($res['ip_addr']) . '">Ban</a>';
		$unbanlink = '<a href="topic_list.php?unban=' . urlencode($res['ip_addr']) . '">Unban</a>';
		$marklink = '<a href="topic_list.php?mark=' . urlencode($res['topic']) . '&max=' . urlencode($res['id']) . '">Mark To Here</a>';
		$bothlink = '<a href="topic_list.php?ban=' . urlencode($res['ip_addr']) . '&mark=' . urlencode($res['topic']) . '&max=' . urlencode($res['id']) . '">Ban + Mark</a>';
		
		if ($row[0]) {
			// Banned
			
			?>
<span style="font-size: 0.5em">
<b><?php echo $name ?>:</b> <?php echo $message ?>
 (<?php echo $page ?> <?php echo $time ?> <?php echo $unbanlink ?> <?php echo $marklink ?> <?php echo $ip ?>)
</span><br>
<?php
		} else {
			// Not yet banned ?>
<b><?php echo $name ?>:</b> <?php echo $message ?>
 (<?php echo $page ?> <?php echo $time ?> <?php echo $banlink ?> <?php echo $marklink ?> <?php echo $bothlink ?> <?php echo $ip ?>)
<br>
<?php
		}
	} elseif ($topicCount == $maxShow) {
		echo '... more comments suppressed ...<br>';
	}
	
	$res = mysql_fetch_array($result);
}

mysql_free_result($result);
StandardFooter();
