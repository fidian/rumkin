<?PHP

$GLOBALS['Topic Reserved Name'] = 'naidif';

function OpenDBConnection($Which)
{
    $UsePersistent = true;
    $DbConnInfo = array(
        'Marco' => array('Site' => 'localhost',
			 'User' => 'rumkin',
			 'Pass' => 'MiscLogin',
			 'DB' => 'marco'),
	'Population' => array('Site' => 'localhost',
			      'User' => 'rumkin',
			      'Pass' => 'MiscLogin',
			      'DB' => 'population'),
        'Rumkin' => array('Site' => 'localhost',
			  'User' => 'rumkin',
			  'Pass' => 'MiscLogin',
			  'DB' => 'rumkin'),
        'Topic' => array('Site' => 'localhost',
			 'User' => 'rumkin',
			 'Pass' => 'MiscLogin',
			 'DB' => 'discuss'),
        'Trivia' => array('Site' => 'localhost',
			  'User' => 'rumkin',
			  'Pass' => 'MiscLogin',
			  'DB' => 'trivia'),
    );

    if (! isset($DbConnInfo[$Which]))
      return false;
    
    if ($UsePersistent)
    {
	$dbconn = mysql_pconnect($DbConnInfo[$Which]['Site'],
				 $DbConnInfo[$Which]['User'],
				 $DbConnInfo[$Which]['Pass']);
    }
    else
    {
	$dbconn = mysql_connect($DbConnInfo[$Which]['Site'],
				$DbConnInfo[$Which]['User'],
				$DbConnInfo[$Which]['Pass']);
    }

    mysql_select_db($DbConnInfo[$Which]['DB'], $dbconn);
    
    return $dbconn;
}
