<?php

$memcache = new Memcache();
$memcache->addServer('localhost', 11211);
$GLOBALS['memcache_res'] = $memcache;
define('DEBUG_GLOBAL_KEY', '__debug_level');
define('DEBUG_GLOBAL_SESSION', '__debug_session');
define('DEBUG_COOKIE', 'debug_level');
define('DEBUG_GLOBAL_MEMCACHE', 'memcache_res');
define('DEBUG_MEMCACHE_SESSIONS_KEY', 'debug_session_index');
define('DEBUG_MEMCACHE_SESSION_PREFIX', 'debug_session|');
$GLOBALS['DEBUG_START_TIME'] = microtime(true);


// Can pass 1 additional parameter of data that should be added
function debug($level, $message) {
	// If we didn't set up the debug session stuff for this request yet
	if (! isset($GLOBALS[DEBUG_GLOBAL_KEY])) {
		/* Only enable debug if we are on dev and if the cookie is set
		 * and if the memcache object exists */
		if (
			
			/* $is_dev && */
			isset($_COOKIE[DEBUG_COOKIE]) && isset($GLOBALS[DEBUG_GLOBAL_MEMCACHE])) {
			// Set the global yes/no flag
			$GLOBALS[DEBUG_GLOBAL_KEY] = (int)$_COOKIE[DEBUG_COOKIE];
			
			// Create a new, unique session ID
			$GLOBALS[DEBUG_GLOBAL_SESSION] = md5(uniqid(mt_rand(), true));
			
			// Add our session ID to the list in memcache
			$idx = $GLOBALS[DEBUG_GLOBAL_MEMCACHE]->get(DEBUG_MEMCACHE_SESSIONS_KEY);
			
			if (! is_array($idx)) {
				$idx = array();
			}
			
			$added = array(
				'id' => $GLOBALS[DEBUG_GLOBAL_SESSION],
				'time' => time(),
				'ip' => '12.34.56.78'
			);
			array_unshift($idx, $added);
			$GLOBALS[DEBUG_GLOBAL_MEMCACHE]->set(DEBUG_MEMCACHE_SESSIONS_KEY, $idx);
			
			// Add the "number of messages" value to memcache
			$sess = DEBUG_MEMCACHE_SESSION_PREFIX . $GLOBALS[DEBUG_GLOBAL_SESSION];
			$idx = (int)$GLOBALS[DEBUG_GLOBAL_MEMCACHE]->set($sess, 0);
		} else {
			// Debug is not enabled.  Set "no" and quit.
			$GLOBALS[DEBUG_GLOBAL_KEY] = false;
			return;
		}
	} elseif ($GLOBALS[DEBUG_GLOBAL_KEY] === false) {
		// Debug is disabled.  Quit.
		return;
	} elseif ($GLOBALS[DEBUG_GLOBAL_KEY] < $level) {
		// Debug is enabled, but we are not logging this level
		return;
	}
	
	/* Debug is enabled and we are logging this level
	 * Get the new index number */
	$memcache = $GLOBALS[DEBUG_GLOBAL_MEMCACHE];
	$sess = DEBUG_MEMCACHE_SESSION_PREFIX . $GLOBALS[DEBUG_GLOBAL_SESSION];
	$idx = (int)$memcache->increment($sess);
	$sess .= '|' . ($idx - 1);
	
	// Build the data we want to log
	$trace = debug_backtrace();
	$trace = array_shift($trace);
	$trace_file = explode('/', $trace['file']);
	$output = array(
		'message' => $message,
		'level' => $level,
		'line' => $trace['line'],
		'file' => array_pop($trace_file),
		'time' => microtime(true) - $GLOBALS['DEBUG_START_TIME']
	);
	
	if (func_num_args() > 2) {
		$output['data'] = func_get_arg(2);
	}
	
	// Add the log information to memcache
	$memcache->set($sess, $output);
}

