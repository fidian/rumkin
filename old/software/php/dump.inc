<?php
/**
 * Write out human readable and PHP includable data.  Keep the data
 * types the same, so null and false and 0 and '' are all different.
 * Something like an improved var_dump() or a neater var_export().
 * 
 * Unlike the built-in functions, this does write out null, 0, '', and
 * false appropriately.  Think of it as a data pretty-printer or a data
 * formatter for writing include files.  It even detects and handles
 * circular references.
 * 
 * Of course, it would be nice if it could dump the recursive variables
 * so that running the code would set the pointers up, but until I think of
 * an extra-clever way ....
 * 
 * function dump($data, $name = false, $html = true, $echo_out = true)
 *   $data = What you want to dump
 *   $name = The name to display, great for naming the dumped data
 *   $html = Escape for HTML, turn off to make an include file
 *   $echo_out = Write to output, turn off if you want the content returned
 * 
 * Also includes dump_callstack() to show where you are.
 */


/**
 * Here is some test code.  To enable, add a slash on the next line.
 * 
 * 
 * $a = array('int' => 0, 'boolean' => true, 'double' => 1.2345, 'string' => '');
 * dump($a, '$a');
 * 
 * $b = array('array' => &$a, 'null' => null, 123 => 456);
 * dump($b, '$b');
 * 
 * $fp = fopen('dump.inc', 'r');
 * $c = array($b, 'file' => $fp);
 * $a[] = &$c;
 * $c[] = 'another thing';
 * dump($c, 'recursive');
 * 
 * $type_tests = array(
 * array(0, 'zero'),  // integer
 * array(null, 'null'),  // string
 * array('', 'empty string'),  // string
 * array(false, 'false'),  // integer
 * array(1.2345, 'float'),  // integer
 * array(1.999, 'float'),  // integer
 * );
 * 
 * foreach ($type_tests as $v) {
 * $d = array($v[0] => $v[1]);
 * dump($d, 'type_test_' . $v[1]);
 * }
 * exit();
 * 
/**
 * End of test code.
 */


/**
 * Dumps data - Calls the __dump_anything() function for the real work
 */
function dump($data, $name = false, $html = true, $echo_out = true) {
	// Create a unique-ish ID
	$uniqId = md5(uniqid(mt_rand(), true));
	
	if ($name) {
		$uniqStack = array(
			array(
				'base',
				$name
			)
		);
	} else {
		$uniqStack = array(
			array(
				'base',
				'_BASE'
			)
		);
	}
	
	// Capture output if desired
	if (! $echo_out) {
		ob_start();
	}
	
	// HTML
	if ($html) {
		echo '<pre>';
	}
	
	// Name
	if ($name !== false) {
		if ($html) {
			echo '<b>' . htmlspecialchars($name) . '</b> = ';
		} else {
			echo $name . ' = ';
		}
	}
	
	__dump_anything($data, $html, 0, $uniqId, $uniqStack, false);
	
	if ($name !== false) {
		echo ";\n";
	}
	
	if ($html) {
		echo '</pre>';
	}
	
	if (! $echo_out) {
		$c = ob_get_clean();
		return $c;
	}
	
	return false;
}


/**
 * Determines how to write the data - calls __dump_* helper functions
 */
function __dump_anything(&$data, $html, $indentation, $uniqId, $uniqStack, $noFormat) {
	$data_type = gettype($data);
	$function = '__dump_' . $data_type;
	
	if (! function_exists($function)) {
		$function = '__dump_default';
	}
	
	$function($data, $html, $indentation, $uniqId, $uniqStack, $noFormat);
}


/**
 * Write out an index to an array or object.
 * 
 * Only called from __dump_array, __dump_object, and __dump_recursive.
 * Only handles known data types (try to keep it to strings and integers).
 */
function __dump_index(&$data, $html) {
	$data_type = gettype($data);
	$function = '__dump_' . $data_type;
	$function($data, $html, 0, false, false, true);
}


/**
 * Writes out an array, avoids recursion.
 */
function __dump_array(&$data, $html, $indentation, $uniqId, $uniqStack, $noFormat) {
	if (isset($data[$uniqId])) {
		__dump_recursive($data[$uniqId], $html, $noFormat);
		return;
	}
	
	$data[$uniqId] = $uniqStack;
	echo 'array(';
	$indentation ++;
	$isFirst = true;
	
	foreach ($data as $k => &$d) {
		if ($k !== $uniqId) {
			if (! $isFirst) {
				echo ',';
			}
			
			$isFirst = false;
			echo "\n" . str_repeat("\t", $indentation);
			__dump_index($k, $html);
			
			if ($html) {
				if ($noFormat) {
					echo ' =&gt; ';
				} else {
					echo ' <font color="#888a85">=&gt;</font> ';
				}
			} else {
				echo ' => ';
			}
			
			array_push($uniqStack, array(
					'array', &$k
				));
			__dump_anything($d, $html, $indentation, $uniqId, $uniqStack, $noFormat);
			array_pop($uniqStack);
		}
	}
	
	unset($data[$uniqId]);
	$indentation --;
	
	if (count($data)) {
		echo "\n" . str_repeat("\t", $indentation);
	}
	
	echo ')';
}


/**
 * Writes out an object, avoids recursion.
 */
function __dump_object(&$data, $html, $indentation, $uniqId, $uniqStack, $noFormat) {
	if (isset($data->$uniqId)) {
		__dump_recursive($data->$uniqId, $html, $noFormat);
		return;
	}
	
	$data->$uniqId = $uniqStack;
	echo get_class($data) . '::__set_state(array(';
	$variables = (array)$data;
	$indentation ++;
	$isFirst = true;
	
	foreach ($variables as $k => $d) {
		if ($k !== $uniqId) {
			if (! $isFirst) {
				echo ',';
			}
			
			$isFirst = false;
			echo "\n" . str_repeat("\t", $indentation);
			$var_type = 0;  // 0 = public, 1 = protected, 2 = private
			$key_split = explode("\0", $k);
			
			if (count($key_split) == 3) {
				$k = $key_split[2];
				
				if ($key_split[1] == '*') {
					$var_type = 1;  // Key:  \0*\0NameOfVariable
				} else {
					$var_type = 2;  // Key:  \0ClassName\*NameOfVariable
				}
			}
			
			if ($html && ! $noFormat) {
				if ($var_type == 2) {
					echo '<font color="#cc0000">';
				} elseif ($var_type == 1) {
					echo '<font color="#0000cc">';
				} else {
					echo '<font color="#007700">';
				}
			}
			
			__dump_index($k, $html);
			
			if ($html) {
				if ($noFormat) {
					echo ' =&gt; ';
				} else {
					echo '</font> <font color="#888a85">=&gt;</font> ';
				}
			} else {
				echo ' => ';
			}
			
			array_push($uniqStack, array(
					'object',
					$k
				));
			__dump_anything($d, $html, $indentation, $uniqId, $uniqStack, $noFormat);
			array_pop($uniqStack);
		}
	}
	
	unset($data->$uniqId);
	$indentation --;
	
	if (count($data)) {
		echo "\n" . str_repeat("\t", $indentation);
	}
	
	echo '))';
}


/**
 * Writes out a recursion message.
 * 
 * Called by __dump_array and __dump_object when recursion is detected.
 */
function __dump_recursive(&$uniqStack, $html, $noFormat) {
	$first_seen = implode('', $uniqStack);
	
	if ($html && ! $noFormat) {
		echo '<font color="#770000">';
	}
	
	echo 'RECURSIVE(';
	
	foreach ($uniqStack as $member) {
		switch ($member[0]) {
			case 'object':
				
				if ($html) {
					echo '-&gt;' . htmlspecialchars($member[1]);
				} else {
					echo '->' . $member[1];
				}
				
				break;

			case 'array':
				echo '[';
				__dump_index($member[1], $html);
				echo ']';
				break;

			default:
				
				if ($html) {
					echo htmlspecialchars($member[1]);
				} else {
					echo $member[1];
				}
				
				break;
		}
	}
	
	echo ')';
	
	if ($html && ! $noFormat) {
		echo '</font>';
	}
}


/**
 * Writes out a boolean value
 */
function __dump_boolean(&$data, $html, $indentation, $uniqId, $uniqStack, $noFormat) {
	if ($data) {
		if ($html && ! $noFormat) {
			echo '<font color="#00cc00">true</font>';
		} else {
			echo 'true';
		}
	} else {
		if ($html && ! $noFormat) {
			echo '<font color="#cc0000">false</font>';
		} else {
			echo 'false';
		}
	}
}


/**
 * Writes out an escaped string.
 * 
 * To avoid additional overhead if the string is parsed, single quotes are
 * preferred.
 */
function __dump_string(&$data, $html, $indentation, $uniqId, $uniqStack, $noFormat) {
	$data_copy = $data;
	
	if (preg_match('/[^ -~]/', $data)) {
		// specialer case
		$data_copy = str_replace('\\', '\\\\', $data_copy);
		$data_copy = str_replace('"', '\\"', $data_copy);
		$data_copy = str_replace('$', '\\$', $data_copy);
		$data_copy = str_replace("\r", '\\r', $data_copy);
		$data_copy = str_replace("\n", '\\n', $data_copy);
		$data_copy = str_replace("\t", '\\t', $data_copy);
		$data_copy = str_replace("\v", '\\v', $data_copy);
		$data_copy = str_replace("\t", '\\t', $data_copy);
		$data_copy = str_replace("\t", '\\t', $data_copy);
		$data_copy = preg_replace('/([^ -~])/e', "'\x'.bin2hex(\"\\1\")", $data_copy);
		$data_copy = '"' . $data_copy . '"';
	} else {
		// Simple, no double quote needed
		$data_copy = str_replace('\\', '\\\\', $data_copy);
		$data_copy = str_replace('\'', '\\\'', $data_copy);
		$data_copy = '\'' . $data_copy . '\'';
	}
	
	if ($html) {
		$data_copy = htmlspecialchars($data_copy);
		
		if (! $noFormat) {
			$data_copy = '<font color="#0000cc">' . $data_copy . '</font>';
		}
	}
	
	echo $data_copy;
}


/**
 * Writes out an integer by calling __dump_double
 */
function __dump_integer(&$data, $html, $indentation, $uniqId, $uniqStack, $noFormat) {
	__dump_double($data, $html, $indentation, $uniqid, $uniqStack, $noFormat);
}


/**
 * Writes out a number.  No special formatting needed.
 */
function __dump_double(&$data, $html, $indentation, $uniqId, $uniqStack, $noFormat) {
	if ($html && ! $noFormat) {
		echo '<font color="#777700">' . $data . '</font>';
	} else {
		echo $data;
	}
}


/**
 * Writes out a null value
 */
function __dump_NULL(&$data, $html, $indentation, $uniqId, $uniqStack, $noFormat) {
	echo 'null';
}


/**
 * Writes out a resource
 * 
 * If it is a stream resource, additional attributes are also shown.
 */
function __dump_resource(&$data, $html, $indentation, $uniqId, $uniqStack, $noFormat) {
	$res_type = get_resource_type($data);
	$out = 'null /* resource(' . intval($data) . ', ' . $res_type;
	
	if ($res_type == 'stream') {
		$meta = stream_get_meta_data($data);
		$out .= ', "' . $meta[uri] . '", "' . $meta[mode] . '"';
	}
	
	$out .= ') */';
	
	if ($html) {
		echo htmlspecialchars($out);
	} else {
		echo $out;
	}
}


/**
 * This is the default catch-all that should never get used.
 */
function __dump_default(&$data, $html, $indentation, $uniqId, $uniqStack, $noFormat) {
	echo 'DUMPING TYPE OF ' . gettype($data) . ' NOT SUPPORTED';
}


/**
 * Dump the call stack to the current point.
 */
function dump_callstack() {
	$out = array();
	
	foreach (debug_backtrace() as $trace) {
		$out[] = $trace['file'] . ', line ' . $trace['line'];
		$str = "\t";
		
		if ($trace['type']) {
			$str .= $trace['class'] . $trace['type'];
		}
		
		$str .= $trace['function'] . '(';
		$comma = '';
		
		if (is_array($t['args'])) {
			foreach ($t['args'] as $arg) {
				$str .= $comma;
				$comma = ',';
				
				switch (gettype($arg)) {
					case 'array':
						$str .= ' (array)';
						break;

					case 'object':
						$str .= ' ' . get_class($arg);
						break;

					case 'boolean':
						
						if ($arg) {
							$str .= ' true';
						} else {
							$str .= ' false';
						}
						
						break;

					case 'string':
						$str .= ' "' . addslashes($arg) . '"';
						break;

					case 'integer':
					case 'double':
						$str .= ' ' . $arg;
						break;

					case 'NULL':
						$str .= ' NULL';
						break;

					case 'resource':
						$str .= ' (resource)';
						break;

					default:
						$str .= ' (unknown type: ' . gettype($arg) . ')';
				}
			}
		}
		
		$str .= ')';
		$out[] = $str;
	}
	
	echo '<pre>';
	
	foreach ($out as $o) {
		echo htmlspecialchars($o) . "\n";
	}
	
	echo '</pre>';
}

