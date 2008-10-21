<?PHP

// Sample functions file
// Placed in the public domain by Tyler Akins in 2004
// Modified slightly every now and then if need be

function StandardHeader($Data)
{
   $Title = '';
   if (isset($Data['title']))
      $Title = $Data['title'];

?>

<html>
<head>
<title><?PHP echo $Title ?></title>
</head>
<body bgcolor=FFFFFF>

<?PHP

}

function StandardFooter()
{
?>

</body>
</html>

<?PHP
}


function CheckForLogin($unused)
{
   // This is similar to what I use to check if a person is allowed
   // access to particular pages on my site.
   // Greatly simplified, but should work.

   if (! isset($GLOBALS['Logins']) || ! is_array($GLOBALS['Logins']))
   {
      return;
   }
   
   
   if (isset($_SERVER['PHP_AUTH_USER']))
   {
      $_SESSION['Auth_User'] = $_SERVER['PHP_AUTH_USER'];
      $_SESSION['Auth_Pass_MD5'] = md5($_SERVER['PHP_AUTH_PW']);
   }
   
   if (! isset($_SESSION['Auth_User']) ||
       ! isset($GLOBALS['Logins'][$_SESSION['Auth_User']]) ||
       $GLOBALS['Logins'][$_SESSION['Auth_User']] != 
       $_SESSION['Auth_Pass_MD5'])
   {
      // User didn't authenticate
      header('WWW-Authenticate: Basic realm="Sprint Uploader"');
      header('HTTP/1.0 401 Unauthorized');
      echo "Sorry.  You need admin rights.";
      exit;
   }
}


function FidianFileSize($path, $UseHtml = true, $PathIsBytes = false)
{
    $scale = array('b', 'k', 'm', 'g');
    
    if ($PathIsBytes)
       $bytes = $path;
    else
       $bytes = filesize($path);
    
    $num = 0;
    while ($bytes > 1024 && isset($scale[$num + 1]))
    {
       $bytes /= 1024;
       $num ++;
    }

    if ($bytes < 10)
    {
       $bytes *= 10;
       settype($bytes, 'integer');
       $bytes /= 10;
    }
    else
    {
       settype($bytes, 'integer');
    }

    if ($UseHtml)
        return $bytes . '<small>&nbsp;' . $scale[$num] . '</small>';
    return $bytes . ' ' . $scale[$num];
}


function MakeBoxTop($a = false)
{
   // This draws a box around stuff normally.
}

function MakeBoxBottom()
{
   // And the bottom of the box
}

function Redirect($url)
{
   header('Location: ' . $url);
   header('Connection: close');
   exit(0);
}

function MakeLinkList($Data)
{
    echo "<dl>\n";
    foreach ($Data as $Item) {
	echo '<dt><a href="' . $Item['URL'] . '">' . $Item['Name'] .
	  "</a></dt><dd>" . $Item['Desc'] . "</dd>\n";
    }
    echo "</dl>\n";
}


function Section($n)
{
    echo "<h2>$n</h2>\n";
}