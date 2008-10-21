<?php
/**
 * Smarty Cache Handler, utilizing APC extension (http://php.net/apc)
 *
 * Name:     smarty_cache_apc
 * Type:     Cache Handler
 * Purpose:  Replacement for the file based cache handling of Smarty.
 *           smarty_cache_apc() uses the apc extension to minimize disk usage.
 * File:     smarty.cache.apc.php
 * Date:     Dec 2, 2003
 * 
 * Usage example:
 *
 * $smarty = new Smarty;
 * $smarty->cache_handler_func = 'smarty_cache_apc';
 * $smarty->caching = true;
 * $smarty->display('index.tpl');
 *
 * @author   André Rabold
 * @version  RC-1
 *
 * Modifications by Chris Westerfield, posted Feb 12, 2005
 * Modifications by Tyler Akins
 *
 * @package    Smarty
 * @subpackage plugins
 * 
 * @link     http://php.net/apc
 *           (apc homepage)
 * @link     http://smarty.php.net/manual/en/section.template.cache.handler.func.php
 *           (Smarty online manual)
 * @link     http://www.phpinsider.com/smarty-forum/viewtopic.php?t=10115
 *           (Posting of Chris Westerfield's version)
 */

define('SMARTY_APC_INDEX_ID', 'smarty_apc_index');

/**
 * Make sure that the APC module is loaded, otherwise do not allow the code
 * to run.
 *
 * Used to be part of the cache handler function, but only needs to be called
 * once, so it was moved to the outermost level. 
 */ 
if(!function_exists('apc')) {
	die('cache_handler: PHP Extension "apc" is not installed.');
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
function smarty_cache_apc($action, &$smarty, &$cache_content, $tpl_file = null, $cache_id = null, $compile_id = null, $exp_time = null) {
	// Create unique cache id
	$apc_id = 'smarty_apc';
	if (isset($cache_id)) {
		$apc_id .= '/' . $cache_id;
	}
	if (isset($compile_id)) {
		$apc_id .= '/' . $compile_id;
	}
	if (isset($tpl_file)) {
		$apc_id .= '/' . $tpl_file;
	}

	if ($action == 'read') {
		// Read cache from shared memory
		$cache_content = apc_fetch($apc_id);
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
		apc_store($apc_id, $cache_content, $ttl);
		
		// Add to our index
		$indexes = apc_get(SMARTY_APC_INDEX_ID);
		if (! is_array($indexes)) {
			$indexes = array();
		}
		$indexes[$apc_id] = 1;
		apc_store(SMARTY_APC_INDEX_ID, $indexes, 0);
		
		return true;
	}
	
	if ($action == 'clear') {
		// Clear cache info
		$indexes = apc_get(SMARTY_APC_INDEX_ID);
		
		if (! is_array($indexes)) {
			// Nothing to clear
			return true;
		}

		if (empty($cache_id) && empty($compile_id) && empty($tpl_file)) {
			// Clear everything
			foreach ($indexes as $k => $v) {
				apc_delete($k);
			}
			apc_delete(SMARTY_APC_INDEX_ID);
			
			return true;
		}
		
		if (is_null($tpl_file)) {
			// Clear a group
			$delete_prefix = $apc_id . '|';
			$delete_length = strlen($delete_prefix);
			foreach ($indexes as $k => $v) {
				if (strncmp($k, $delete_prefix, $delete_length) == 0) {
					apc_delete($k);
					unset($indexes[$k]);
				}
			}
			apc_store(SMARTY_APC_INDEX_ID, $indexes, 0);
			
			return true;
		}
		
		// Clear a single file
		apc_delete($apc_id);
		if (isset($indexes[$apc_id])) {
			unset($indexes[$apc_id]);
			apc_store(SMARTY_APC_INDEX_ID, $indexes, 0);
		}
		return true;
	}
	
	// Error:  Unknown action
	$smarty->trigger_error('cache_handler:  Unknown action "' . $action . '"');
	return false;
}
