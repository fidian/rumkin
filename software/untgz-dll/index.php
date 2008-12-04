<?php

include '../../functions.inc';
StandardHeader(array(
		'title' => 'untgz dll',
		'topic' => 'untgz-dll'
	));
$mediaDir = getenv('MEDIABASE') . 'software/untgz-dll/';

?>

<p>I needed a DLL file that would decompress .tar.gz files.  I found the 
<a href="http://nsis.sourceforge.net/UnTGZ_plug-in">UnTGZ</a> plug-in for
<a href="http://nsis.sourceforge.net/">NSIS</a> and it fit my needs
perfectly ... well, perfectly except for the fact that it needed NSIS.</p>

<p>Luckily, they supplied the source code and I then modified it to remove
all NSIS-related things.  I also removed some of the other code that reports
errors, and slightly altered the exported functions.</p>

<p>All hail open source!</p>

<p>To run it, you just use the untgz() function.</p>

<?php MakeBoxTop('center') ?>
<tt>untgz(char *path_to_tgz_file, char *output_directory);</tt>
<?php MakeBoxBottom() ?>

<?php Section('Download'); ?>

<p><b><a href="media/untgz-dll.zip">untgz-dll.zip</a></b>
(<?php echo FidianFileSize($mediaDir . 'untgz-dll.zip') ?>) - Source code for the DLL
</p>

<p><b><a href="media/untgz.dll">untgz.dll</a></b>
(<?php echo FidianFileSize($mediaDir . 'untgz.dll') ?>) - Just the DLL file, UPX compressed for
the absolute minimum size.</p>

<?php

StandardFooter();
