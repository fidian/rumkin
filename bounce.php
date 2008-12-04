<?php

include_once('inc/util.php');
$target = $_SERVER['REQUEST_URI'];
$target = substr($target, strlen($_SERVER['SCRIPT_NAME']) + 1);

if ($target == '')Redirect('http://rumkin.com/');
Redirect($target);
