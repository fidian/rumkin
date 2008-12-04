<?php

require_once('main.inc');
$Id = substr($_SERVER['PATH_INFO'], 1);
settype($Id, 'integer');
$headers = getallheaders();

if (isset($headers['If-Modified-Since'])) {
	$sincets = HTTP11DateParser(trim($headers['If-Modified-Since']));
} else {
	$sincets = - 1;
}

$sql = 'SELECT Format, Image, UNIX_TIMESTAMP(PublishedAt), Bytes, ' . 'PublishedAt FROM Images WHERE Id = ' . $Id;

if ($sincets != - 1) {
	$sql .= ' AND UNIX_TIMESTAMP(PublishedAt) > ' . $sincets;
}

$res = dbi_query($sql);

if (! $res) {
	BadSQL($sql);
}

$row = dbi_fetch_row($res);
dbi_free_result($res);
$sql = 'UPDATE Images set Views = Views + 1 WHERE Id = ' . $Id;
$res = dbi_query($sql);

if (! $res) {
	BadSQL($sql);
}

if ($sincets < $row[2]) {
	Header('Content-type: ' . $row[0]);
	Header('Last-Modified: ' . timet2httpdate($row[2]));
	Header('Content-Length: ' . $row[3]);
	Header('Pragma: ');
	Header('Cache-Control: cache');
	echo $row[1];
} elseif ($sincets != - 1) {
	Header('Pragma: ');
	Header('Cache-Control: cache');
	header('HTTP/1.1 304 Not Modified');
} else {
	die('Image ' . $Id . ' not found.');
}

?>
