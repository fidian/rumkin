<?PHP  // -*- php -*-

// dnd fidian geocaching trivia
$Users = array('fidian' => array('6e8ce4f23cc4c7b85002721e44843aaf', '*'),
	       'btucker' => array(md5('thx1138'), 'dnd'),
	       'bishop' => array(md5('seester'), 'dnd', 'restricted'),
	       'guenever' => array(md5('snow4t'), 'dnd', 'restricted'),
	       'ABarrette' => array(md5('Monkey_Spunk'), 'dnd'),
	       'cbarrette' => array(md5('thesilver'), 'dnd'),
	       'MnGCA' => array(md5('WanderingMoose'), 'geocaching'),
	       'Peter' => array(md5('bunny'), 'dnd'),
	       'Scott' => array(md5('hulk666'), 'dnd'),
	       'BigSalad' => array(md5('potato'), 'dnd'),
	       );

  
function CheckForLogin($perms)
{
    global $Users;

    session_start();

    if (! isset($_SESSION['Login_User']))
      CheckForLogin_Bad();
    
    if (! isset($_SESSION['Login_Pass']))
      CheckForLogin_Bad();
    
    if (time() - $_SESSION['Login_Time'] > 15 * 60)
      CheckForLogin_Bad();
    
    $u = $_SESSION['Login_User'];
    $p = $_SESSION['Login_Pass'];
    
    if (! isset($Users[$u]))
      CheckForLogin_Bad();
    
    if ($Users[$u][0] != $p)
      CheckForLogin_Bad();
    
    foreach ($Users[$u] as $perm_test)
    {
	if ($perm_test == '*' || $perm_test == $perms)
	{
	    $_SESSION['Login_Time'] = time();
	    return;
	}
    }
    
    CheckForLogin_Bad();
}

function CheckForLogin_Bad()
{
    foreach ($_SESSION as $k => $v)
    {
	unset($_SESSION[$k]);
    }

    session_start();

    // This handles "GET" requests.  "POST" requests are not handled
    // at the moment.
    $_SESSION['Redirect'] = $_SERVER['REQUEST_URI'];
    
    Redirect('/login.php');
}
