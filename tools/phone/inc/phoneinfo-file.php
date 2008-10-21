<?PHP
/* Mobile Phone File Uploader
 *
 * Copyright (C) 2003-2006 - Tyler Akins
 * Licensed under the GNU GPL software license.
 * See the LEGAL file for legal information
 * http://rumkin.com/tools/phone/
 */


// Functions to use a file-based phone information file

// Where the file is located (usually not changed)
$GLOBALS['Phone Info File'] = 'inc/phones.txt';
$GLOBALS['Phone Info Loaded'] = 0;


// Returns true if I think a phone is accessing the page
function IsPhone()
{
    if (isset($_SERVER['HTTP_USER_AGENT']))
    {
	$UA = $_SERVER['HTTP_USER_AGENT'];
    
	if (stristr($UA, 'MobilePhone ') ||
	    stristr($UA, 'compatible; (Blazer ') ||
	    stristr($UA, 'compatible; (Elaine') ||
	    stristr($UA, ' UP.Browser/'))
	{
	    return true;
	}
    }
    
    if (PhoneDataGet('UseRecord') == 1)
    {
	return true;
    }
    
    return false;
}


function PhoneDataGet($what)
{
    LoadPhoneInfo();
    
    if (! isset($GLOBALS['Phone Info']) ||
	! isset($GLOBALS['Phone Info'][$what]))
    {
	return false;
    }
    
    return $GLOBALS['Phone Info'][$what];
}


function LoadPhoneInfo()
{
    if ($GLOBALS['Phone Info Loaded'])
      return;
    
    $GLOBALS['Phone Info Loaded'] = 1;
    
    ParsePhoneHeaders();
 
    if (! file_exists($GLOBALS['Phone Info File']))
    {
	echo "Phone info file does not exist.";
	exit();
    }

    $data = read_file($GLOBALS['Phone Info File']);
    if ($data == false)
    {
	echo "Unable to open phone info file.";
	exit();
    }
    
    $lines = explode("\n", $data);
    $Def = explode("\t", array_shift($lines));
    $Def = array_flip($Def);
    
    foreach ($lines as $l)
    {
	$l_data = explode("\t", $l);
	
	if (IsStringMatch($_SERVER['HTTP_USER_AGENT'], 
			  $l_data[$Def['UserAgent']]))
	{
	    $Match = 0;
	    
	    if (! $Profile)
	    {
		if ($l_data[$Def['XWapProfile']] == '' ||
		    $l_data[$Def['XWapProfile']] == '%')
		{
		    // Found it
		    $Match = 1;
		}
	    }
	    elseif (IsStringMatch($Profile, $l_data[$Def['XWapProfile']]))
	    {
		$Match = 1;
	    }
	    
	    if ($Match)
	    {
		// Save data
		$GLOBALS['Phone Info'] = array();
		foreach ($Def as $k => $v)
		{
		    $GLOBALS['Phone Info'][$k] = $l_data[$v];
		}
		return;
	    }
	}
    }
}


// Converts $pat from a SQL matching string to a PCRE match, then
// returns the result of matching $pat with $str
function IsStringMatch($str, $pat)
{
    // Escape all special PCRE characters and the delimeter
    $Matches = array('\\', '^', '$', '.', '[', ']', '|', 
		     '(', ')', '?', '*', '+', '{', '}', 
		     '/');
    $Replaces = array('\\\\', '\\^', '\\$', '\\.', '\\[', '\\]', '\\|',
		      '\\(', '\\)', '\\?', '\\*', '\\+', '\\{', '\\}', 
		      '\\/');
    $pat = str_replace($Matches, $Replaces, $pat);
    
    // Translate SQL matches into PCRE matches
    $pat = str_replace(array('%', '_'),
		       array('.*', '.'),
		       $pat);
    
    // Surround with delimeters
    $pat = '/^' . $pat . '$/';
    
    // Speed the match up
    $pat = str_replace(array('/^.*', '.*$/'),
		       array('/', '/'),
		       $pat);
    
    return preg_match($pat, $str);
}
