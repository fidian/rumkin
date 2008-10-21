<?PHP

session_start();

require_once('config.inc');
require_once('html.inc');
require_once('db.inc');
require_once('misc.inc');

foreach ($_SESSION as $k => $v)
{
   $GLOBALS[$k] = $v;
}

if (isset($SessPass) && $SessPass == $admin_password)
   $IsAdmin = true;
else
   $IsAdmin = false;

foreach ($_REQUEST as $k => $v)
{
   $GLOBALS[$k] = $v;
}