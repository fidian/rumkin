<?php
/**
 * Smarty Cache Handler, utilizing memcache extension (http://php.net/memcache)
 *
 * Name:     smarty_cache_memcache
 * Type:     Cache Handler
 * Purpose:  Replacement for the file based cache handling of Smarty.
 *           smarty_cache_memcache() uses the memcache extension to minimize
 *           disk usage.
 * File:     smarty.cache.memcache.php
 * Date:     Dec 2, 2003
 * 
 * Usage example:
 *
 * $GLOBALS['memcache_res'] = new Memcache();
 * $GLOBALS['memcache_res']->connect('your.memcached.host', 11211);
 * $smarty = new Smarty;
 * $smarty->cache_handler_func = 'smarty_cache_memcache';
 * $smarty->caching = true;
 * $smarty->display('index.tpl');
 *
 * @author   André Rabold
 * @version  RC-1
 *
 * Modifications by Chris Westerfield, posted Feb 12, 2005
 * Modifications by Tyler Akins, ported to memcache
 *
 * @package    Smarty
 * @subpackage plugins
 * 
 * @link     http://php.net/memcache
 *           (memcache extension homepage)
 * @link     http://smarty.php.net/manual/en/section.template.cache.handler.func.php
 *           (Smarty online manual)
 * @link     http://www.phpinsider.com/smarty-forum/viewtopic.php?t=10115
 *           (Posting of Chris Westerfield's version)
 */

define('SMARTY_MEMCACHE_INDEX_ID', 'smarty_memcache_index');

/**
 * Make sure that the memcache module is loaded, otherwise do not allow the code
 * to run.
 *
 * Used to be part of the cache handler function, but only needs to be called
 * once, so it was moved to the outermost level. 
 */ 
if(!function_exists('memcache_connect')) {
	die('cache_handler: PHP Extension "memcache" is not installed.');
}

/**
 * Actual caching function
 *
 * @param    string   $action         Cache operation to perform ( read | write | clear )
 * @param    mixed    $smarty         Reference to an instance of Smarty
 * @param    string   $cache_content  Reference to cached contents
 * @param    string   $tpl_file       Template file name
 * @param    string   $cache_id       Cache identifier
 * @param    string   $compile_id     Compile identifier
 * @param    integer  $exp_time       Expiration time
 * @return   boolean                  TRUE on success, FALSE otherwise
 */ 
function smarty_cache_memcache($action, &$smarty, &$cache_content, $tpl_file = null, $cache_id = null, $compile_id = null, $exp_time = null) {
	// Make sure that the memcache object is created
	$memcache = $GLOBALS['memcache_res'];
	if (get_class($memcache) != 'memcached') {
		$smarty->trigger_error('cache_handler:  $GLOBALS[\'memcache_res\'] is not a memcached object.');
		return false;
	}
	
	// Create unique cache id
	$memcache_id = 'smarty_memcache';
	if (isset($cache_id)) {
		$memcache_id .= '/' . $cache_id;
	}
	if (isset($compile_id)) {
		$memcache_id .= '/' . $compile_id;
	}
	if (isset($tpl_file)) {
		$memcache_id .= '/' . $tpl_file;
	}

	if ($action == 'read') {
		// Read cache from memcached
		$cache_content = $memcache->get($memcache_id);
		if ($cache_content == false) {
			// false indicates the data was not returned
			$cache_content = null;
		}
		return true;
	}
	
	if ($action == 'write') {
		// Save cache to shared memory
		$timeNow = time();
		if (is_null($exp_time) || $exp_time < $timeNow) {
			$ttl = 0;
		} else {
			$ttl = $exp_time - $timeNow;
		}
		$memcache->set($memcache_id, $cache_content, $ttl);
		
		// Add to our index
		$indexes = $memcache->get(SMARTY_MEMCACHE_INDEX_ID);
		if (! is_array($indexes)) {
			$indexes = array();
		}
		$indexes[$memcache_id] = 1;
		$memcache->set(SMARTY_MEMCACHE_INDEX_ID, $indexes, 0);
		
		return true;
	}
	
	if ($action == 'clear') {
		// Clear cache info
		$indexes = $memcache->get(SMARTY_MEMCACHE_INDEX_ID);
		
		if (! is_array($indexes)) {
			// Nothing to clear
			return true;
		}

		if (empty($cache_id) && empty($compile_id) && empty($tpl_file)) {
			// Clear everything
			foreach ($indexes as $k => $v) {
				$memcache->delete($k);
			}
			$memcache->delete(SMARTY_MEMCACHE_INDEX_ID);
			
			return true;
		}
		
		if (is_null($tpl_file)) {
			// Clear a group
			$delete_prefix = $memcache_id . '|';
			$delete_length = strlen($delete_prefix);
			foreach ($indexes as $k => $v) {
				if (strncmp($k, $delete_prefix, $delete_length) == 0) {
					$memcache->delete($k);
					unset($indexes[$k]);
				}
			}
			$memcache->set(SMARTY_MEMCACHE_INDEX_ID, $indexes, 0);
			
			return true;
		}
		
		// Clear a single file
		$memcache->delete($memcache_id);
		if (isset($indexes[$memcache_id])) {
			unset($indexes[$memcache_id]);
			$memcache->set(SMARTY_MEMCACHE_INDEX_ID, $indexes, 0);
		}
		return true;
	}
	
	// Error:  Unknown action
	$smarty->trigger_error('cache_handler:  Unknown action "' . $action . '"');
	return false;
}
