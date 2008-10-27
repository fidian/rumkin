<?php  // -*- php -*-
/* Sprint Message Sending Utility
 *
 * Copyright (C) 2003-5 - Tyler Akins
 * Licensed under the GNU GPL software license.
 * See the LEGAL file for legal information
 * See http://rumkin.com/tools/sprint/ for more information about this tool
 */

// Sends a Sprint SMS message to a user's phone via Sprint's web site.

// SendSprintSMS('5555555555', 'This is my message.', '5555555555')
// SendSprintSMS(5555555555, 'No callback number.')
//
// A fourth parameter can be set to true (anything not false) and this
// function will spit out debugging information.
//
// $to is a 10 digit string (non-digits are removed)
// $messge is up to a 160 character string, can not be an empty string
// $from is an empty string, or a 10 digit string (non-digits are removed)
//
// Returns an error code, which can be passed to SprintErrorDesc() for
// a textual representation of the error.
//
// Sets the global variable trackNumber to the tracking number,
// if it finds one.
function SendSprintSMS($to, $message, $from = '', $debug = false)
{
    $to = preg_replace('/[^0-9]/', '', $to);
    $from = preg_replace('/[^0-9]/', '', $from);
    if (strlen($to) != 10)
      return 1;
    
    if (strlen($from) != 0 && strlen($from) != 10)
      return 1;
    
    if (strlen($message) > 160 || strlen($message) == 0)
      return 1;
    
    $post = 'recipientsNumber=' . $to . '&textMessage=' . urlencode($message) .
      '&characters=' . (160 - strlen($message)) . '&callBackNumber=' .
      $from;
    
    $post_len = strlen($post);

    $Host = 'messaging.sprintpcs.com';
    $fp = fsockopen($Host, 80);
    if ($fp)
    {
	$Page = '/textmessaging/composeconfirm';
	fwrite($fp, "POST $Page HTTP/1.1\r\n" .
	       "User-Agent: Mozilla/5.0 (Windows; U; Windows NT 5.0; rv:1.7.3) Gecko/20040913 Firefox/0.10.1\r\n" .
	       "Host: $Host\r\n" .
	       "Pragma: no-cache\r\n" .
	       "Accept: image/gif, image/x-xbitmap, image/jpeg, " .
	       "image/pjpeg, */*\r\n" .
	       "Content-Length: " . $post_len . "\r\n" .
	       "Content-Type: application/x-www-form-urlencoded\r\n" .
	       "Connection: Close\r\n" .
	       "Cookie: \$Version=\"1\"; JSESSIONID_JFS=\"none\"\r\n" .
	       "\r\n" .
	       $post . "\r\n\r\n");
	
	$response = '';
	while (! feof($fp))
	{
	    $response .= fgets($fp, 1024);
	}
	
	fclose($fp);
	
	if (preg_match("/\\?trackNumber=([0-9A-Z]+)/", $response, $regs))
	  $GLOBALS['trackNumber'] = $regs[1];
		   

	if ($debug)
	  echo "<pre>" . nl2br(str_replace("\r\n", "\n",
					   htmlspecialchars($response)))
	    . "\n</pre>\n";
	
	if (stristr($response, "Message sent"))
	  return 0;
	if (stristr($response, "not subscribe"))
	  return 2;
	if (stristr($response, "Error"))
	  return 3;
	return 4;
    }
    
    return 5;
}


// Returns a text string describing the return code from SendSprintSMS()
function SprintErrorDesc($err)
{
    $Codes = array(0 => 'Message sent successfully.',
		   1 => 'Error with parameters calling SendSprintSMS().  ' .
		      '$to must have 10 digits, $message must be 160 ' .
		      'chars or less, $from must be an empty string or ' .
		      'contain 10 digits.',
		   2 => 'Sprint\'s web site returned "not subscribed" error.',
		   3 => 'Sprint\'s web site returned "Error".',
		   4 => 'The status could not be parsed properly from ' .
		      'Sprint\'s web site.',
		   5 => 'Sprint\'s messaging site appears to be down.',
		   );
    
    if (isset($Codes[$err]))
      return $Codes[$err];
    return 'Unhandled error code. [' . $err . ']';
}
