<?PHP // -*- php -*-

include_once('config-dist.php');

// The database server to use, the username and password to log into the
// server with, the database in the server that has the table, and the
// name of the table in the database.
$GLOBALS['Database User'] = 'rumkin';
$GLOBALS['Database Password'] = 'MiscLogin';

// Who to send emails to
$GLOBALS['Admin Email'] = 'fidian@rumkin.com';

// Who emails are sent from
$GLOBALS['Mail From'] = 'delete@rumkin.com';

// Turn off automatic cleaning
$GLOBALS['AutoClean Chance'] = 0;


$GLOBALS['Ban Phone'] = array('8147693521', '9032493528', '7272442134',
	'7276670315');

$GLOBALS['Gallery Directory'] = getenv('MEDIABASE') . 'tools/sprint/gallery/';
