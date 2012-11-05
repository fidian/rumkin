<?php

session_start();
require_once('config.php');
require_once('html.php');
require_once('db.php');
require_once('misc.php');
$GLOBALS['IsAdmin'] = false;

if (isset($_SESSION['SessPass']) && $_SESSION['SessPass'] == $admin_password) {
	$GLOBALS['IsAdmin'] = true;
}

