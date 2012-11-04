<?php


// Standard page header
function PageHeader($title) {
	NoCacheHeaders();
	
	if (IsPhone()) {
		echo '<html><head><title>' . $title . '</title></head><body>';
	} else {
		StandardHeader(array(
				'title' => $title,
				'topic' => 'uploader'
			));
	}
}


// Standard page footer
function PageFooter() {
	if (IsPhone()) {
		echo '</body></html>';
	} else {
		StandardFooter();
	}
}


// Redirect to a URL.  You should use a fully-qualified URL here.
function RedirectURL($url) {
	header('Location: ' . $url);
	header('Connection: close');
	exit(0);
}


// Spit out a simple WAP or HTML error message and stop execution
function ErrorMessage($msg) {
	// Error message.
	if (IsWapCapable()) {
		header('Content-Type: text/vnd.wap.wml');
		echo "<?xml version=\"1.0\"?>\n";
		
		?><!DOCTYPE wml PUBLIC "-//WAPFORUM//DTD WML 1.1//EN" "http://www.wapforum.org/DTD/wml_1.1.xml">
<wml>
<head>
<meta http-equiv="Cache-Control" content="max-age=0" forua="true"/>
</head>
<card id="error" title="Error">
<p><?php echo $msg ?></p>
<p>Back to the <a title="BACK" href="jump.php">jump page</a>.</p>
</card>
</wml>
<?php
		
		exit(0);
	}
	
	?><html><head><title>Error</title>
<body bgcolor=#FFFFFF>
<p><?php echo $msg ?></p>
<p>Back to the <a href="jump.php">jump page</a>.</p>
</body></html>
<?php
	
	exit(0);
}

