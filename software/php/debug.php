<?php

require_once('include.php');
require_once('debug.inc');
page_top();

if (isset($_GET['clear_session'])) {
	DeleteSession($GLOBALS['memcache'], $_GET['clear_session']);
	ShowSessions($GLOBALS['memcache']);
} elseif (isset($_GET['session'])) {
	ShowSession($GLOBALS['memcache'], $_GET['session']);
} else {
	ShowSessions($GLOBALS['memcache']);
}

page_bottom();


function ShowSessions($memcache) {
	// Fetch all debug sessions
	$sessions = $memcache->get(DEBUG_MEMCACHE_SESSIONS_KEY);
	
	if (! is_array($sessions) || count($sessions) == 0) {
		echo 'No sessions saved.';
		return;
	}
	
	echo "<ul>\n";
	
	foreach ($sessions as $data) {
		echo '<li><a href="?session=' . urlencode($data['id']) . '">';
		echo htmlspecialchars($data['ip']) . ' @ ';
		echo htmlspecialchars(date('r', $data['time'])) . '</a>';
		echo ' (<a href="?clear_session=' . urlencode($data['id']) . '">Del</a>)';
		echo ' - ' . ((int)$memcache->get(DEBUG_MEMCACHE_SESSION_PREFIX . $data['id'])) . ' messages';
		echo "</li>\n";
	}
	
	echo "</ul>\n";
}


function ShowSession($memcache, $session) {
	$session_base = DEBUG_MEMCACHE_SESSION_PREFIX . $session;
	$max = (int)$memcache->get($session_base);
	echo $max . " debug messages:\n";
	echo "<table border=1 cellspacing=0 cellpadding=2 style=\"border:1px solid black\">\n";
	echo "<tr><th>Lvl</th><th>File</th><th>Message</th><th>Time</th></tr>\n";
	
	for ($i = 0; $i < $max; $i ++) {
		$info = $memcache->get($session_base . '|' . $i);
		echo '<tr>';
		echo '<td align=center>' . htmlspecialchars($info['level']) . '</td>';;
		echo '<td>' . htmlspecialchars($info['file'] . ': ' . $info['line']) . '</td>';
		echo '<td>' . htmlspecialchars($info['message']) . '</td>';
		echo '<td>' . round($info['time'], 4) . '</td>';
		echo "</tr>\n";
		
		if (isset($info['data'])) {
			$x = trim(print_r($info['data'], true));
			
			if ($x == '') {
				ob_start();
				var_export($x);
				$x = trim(ob_get_clean());
			}
			
			echo '<tr><td colspan=4><pre>';
			echo htmlspecialchars($x);
			echo "\n</pre></td></tr>\n";
		}
	}
	
	echo "</table>\n";
}


function DeleteSession($memcache, $session) {
	// Delete the main key
	$sessions = $memcache->get(DEBUG_MEMCACHE_SESSIONS_KEY);
	
	foreach ($sessions as $k => $v) {
		if ($v['id'] == $session) {
			unset($sessions[$k]);
		}
	}
	
	$memcache->set(DEBUG_MEMCACHE_SESSIONS_KEY, $sessions);
	
	// Delete the rest
	$session_base = DEBUG_MEMCACHE_SESSION_PREFIX . $session;
	$max = (int)$memcache->get($session_base);
	$memcache->delete($session_base);
	
	for ($i = 0; $i <= $max; $i ++) {
		$memcache->delete($session_base . '|' . $i);
	}
	
	echo "Erased session $session<br>";
}

