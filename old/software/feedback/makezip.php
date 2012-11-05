<?php
/* Sprint File Uploader
 * 
 * Copyright (C) 2003-2004 - Tyler Akins
 * Licensed under the GNU GPL software license.
 * See the LEGAL file for legal information
 * See http://rumkin.com/tools/sprint/ for more information about these tools
 */
include '../../inc/zip.php';
$files = array(
	'db_structure.sql',
	'functions.inc',
	'topic.php',
	'readme.txt',
	'legal.txt',
	'copying.txt',
	'admin/',
	'admin/topic_list.php'
);
MakeZipFile('uploader.zip', $files);
