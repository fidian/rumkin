<?php
/* Sprint File Uploader
 * 
 * Copyright (C) 2003-2005 - Tyler Akins
 * Licensed under the GNU GPL software license.
 * See the LEGAL file for legal information
 * See http://rumkin.com/tools/sprint/ for more information about these tools
 */
include '../../inc/zip.php';
$files = array(
	'CHANGELOG',
	'COPYING',
	'LEGAL',
	'TODO',
	'browse.php',
	'common.inc',
	'config-dist.php',
	'desc.php',
	'dl.php',
	'downloads.php',
	'files.txt',
	'formats.php',
	'functions.inc',
	'gallery.php',
	'index.php',
	'install.txt',
	'jump.php',
	'links.php',
	'makezip.php',
	'messaging.inc',
	'newphone.php',
	'phonedata.php',
	'phoneinfo.php',
	'provider.inc',
	'readme.txt',
	'tables.txt',
	'thumb.php',
	'unzip.php',
	'upload.inc',
	'upload.php',
	'admin/',
	'admin/check.php',
	'admin/clean.php',
	'admin/file.php',
	'admin/sendmessage.php',
	'admin/update.php',
	'admin/viewer.php',
	'faq/',
	'faq/index.php',
	'faq/faq.inc'
);
$GLOBALS['Skip Sprint Common File'] = 1;
include('faq/faq.inc');
AddFaqTopics($files, $GLOBALS['Topics']);
MakeZipFile('uploader.zip', $files);


function AddFaqTopics(&$files, $a) {
	foreach ($a as $k => $v) {
		if (is_array($v)) {
			AddFaqTopics($files, $v);
		} else {
			$files[] = 'faq/' . $k . '.inc';
		}
	}
}

