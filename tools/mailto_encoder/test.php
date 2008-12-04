<?php


// -*- php -*-
function HideEmail($user, $host) {
	$MailLink = '<a href="mailto:' . $user . '@' . $host . '">' . $user . '@' . $host . '</a>';
	$MailLetters = '';
	
	for ($i = 0; $i < strlen($MailLink); $i ++) {
		$l = substr($MailLink, $i, 1);
		
		if (strpos($MailLetters, $l) === false) {
			$p = rand(0, strlen($MailLetters));
			$MailLetters = substr($MailLetters, 0, $p) . $l . substr($MailLetters, $p, strlen($MailLetters));
		}
	}
	
	$MailLettersEnc = str_replace('\\', '\\\\', $MailLetters);
	$MailLettersEnc = str_replace('"', '\\"', $MailLetters);
	$MailIndexes = '';
	
	for ($i = 0; $i < strlen($MailLink); $i ++) {
		$index = strpos($MailLetters, substr($MailLink, $i, 1));
		$index += 48;
		$MailIndexes .= chr($index);
	}
	
	?><SCRIPT LANGUAGE="javascript"><!--
ML="<?php echo $MailLettersEnc ?>";
MI="<?php echo $MailIndexes ?>";
OT="";
for(j=0;j<MI.length;j++){
OT+=ML.charAt(MI.charCodeAt(j)-48);
}document.write(OT);
// --></SCRIPT><NOSCRIPT>Sorry, you need javascript to view this email address</noscript><?php
}


function HideEmailWithName($name, $user, $host) {
	print $name . ' &lt;';
	HideEmail($user, $host);
	print '&gt;';
}

echo HideEmailWithName('Email Someone', 'username', 'hostname.com');
