<?php

require '../../inc/unzip.php';
$coords = preg_split('/,|\s/', $_REQUEST['BBOX']);
$polyfile = tempnam('', 'poly');
$polyfp = fopen($polyfile, 'a');
fwrite($polyfp, $coords[1] . ' ' . $coords[0] . "\n");
fwrite($polyfp, $coords[1] . ' ' . $coords[2] . "\n");
fwrite($polyfp, $coords[3] . ' ' . $coords[2] . "\n");
fwrite($polyfp, $coords[3] . ' ' . $coords[0] . "\n");
fwrite($polyfp, $coords[1] . ' ' . $coords[0] . "\n");
fclose($polyfp);
$cmd = 'gpsbabel -i openoffice ' . '-f ~fidian/public_html/geocaching/Geocaching.csv ' . '-x polygon,file=' . $polyfile . ' -o openoffice -F - | ' . 'head -n 51 | ' . 'gpsbabel -i openoffice -f - -o kml -F -';
header('Content-Type: application/keyhole');


/*
 * $fp = fopen('debug.txt', 'a');
 * if ($fp) {
 * fwrite($fp, print_r($_REQUEST, true));
 * fwrite($fp, $cmd . "\n");
 * fclose($fp);
 * }
 */
passthru($cmd);
unlink($polyfile);
