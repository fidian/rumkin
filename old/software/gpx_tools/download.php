<?php

include '../../functions.inc';
StandardHeader(array(
		'title' => 'GPX Tools for Geocaching',
		'topic' => 'gpx_tools'
	));

?>

<p>You're going to download the tools?  Awesome!  Let me know what you like
and what you do not like.  Below are the release download links, or you can clone the git repository on <a href="https://github.com/fidian/gpx_tools">github</a>.</p>

<dl>

<?php

$versions = array(
	'1.2' => array(
		'notes' => 'December 2011.  Bugs were found thanks to helpful feedback.'
	),
	'1.1' => array(
		'notes' => 'April 2009.  Bugfixes and added 2 new format codes.'
	),
	'1.0' => array(
		'notes' => 'August 2008.'
	),
	'0.2' => array(
		'notes' => 'Bugfix release.'
	),
	'0.1' => array(
		'notes' => 'Initial version.'
	),
);
$formats = array(
	'' => array(
		'name' => 'Source'
	),
	'linux-static' => array(
		'name' => 'Linux (Statically Compiled)'
	),
	'win32' => array(
		'name' => 'Windows Executables'
	),
);
$media_dir = getenv('MEDIABASE') . 'software/gpx_tools/';

foreach ($versions as $v => $a) {
	
	?>
<dt><b><a href="media/gpx_tools-<?php echo $v ?>.tar.gz">gpx_tools-<?php echo $v ?>.tar.gz</a></b>
(<?php echo FidianFileSize($media_dir . 'gpx_tools-' . $v . '.tar.gz'); ?>)</dt>
<dd><?php echo htmlspecialchars($a['notes']); ?></dd>
<dd><?php
	
	$numDisp = 0;
	
	foreach ($formats as $name => $data) {
		if ($name != '')$name .= '-';
		
		foreach (array(
				'.tar.gz',
				'.zip'
			) as $ext) {
			$fn = 'gpx_tools-' . $name . $v . $ext;
			
			if (file_exists($media_dir . $fn)) {
				if ($numDisp)echo ' - ';
				echo '[<a href="media/' . $fn . '">';
				echo $data['name'];
				echo '</a> ' . FidianFileSize($media_dir . $fn);
				echo ']';
				$numDisp ++;
			}
		}
	}
	
	?>
</dd>
<?php
}

?>

</dl>

<?php

StandardFooter();
