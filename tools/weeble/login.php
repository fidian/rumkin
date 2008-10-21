<?php
/*
  Weeble File Manager (c) Christopher Michaels & Jonathan Manna
  This software is released under the BSD License.  For a copy of
  the complete licensing agreement see the LICENSE file.
*/

  require_once ("settings.php");
  require_once ("tools/compat.php");
  require_once ("functions-ftp.php");
  require_once ("access_list.php");

  $cookie_array = array ( "", "", "" );
  $cookie_present = FALSE;

  if ( $ftp_disable_mcrypt ) {
    $ftp_remember_me = FALSE;
  } elseif ( extension_loaded ($mcrypt_mod) ) {
    if ( isset ($nocookie) ) {
      setcookie ( "WeebleFM_cookie", "", time(), "/", $HTTP_SERVER_VARS["SERVER_NAME"], 0);
      setcookie ( "WeebleFM_SID", "", time(), "/", $HTTP_SERVER_VARS["SERVER_NAME"], 0);
      setcookie ( "WeebleFM_Server", "", time(), "/", $HTTP_SERVER_VARS["SERVER_NAME"], 0);
    } elseif ( isset ($WeebleFM_cookie) && isset ($WeebleFM_SID) ) {
      $cookie_string = decrypt_string ( $WeebleFM_cookie, $key, $WeebleFM_SID, $pref_ciphers );
      $cookie_array = explode ( "::", $cookie_string, 2 );
      if ( isset ($WeebleFM_Server) ) $cookie_array[2] = $WeebleFM_Server;
      $cookie_present = TRUE;
    }
  } else {
    if (!isset ($ERROR)) $ERROR = 20;
    $ftp_remember_me = FALSE;
  }

  // If register_globals = off display an error.
  if ( !ini_get ("register_globals") && !isset ($ERROR) ) $ERROR = 21;
  elseif ( (phpversion() >= "4.0.3") && !ini_get ("file_uploads") && !isset ($ERROR) ) $ERROR = 22;
  elseif ( !extension_loaded ("ftp") && !isset ($ERROR) ) $ERROR = 23;

// Load the default theme into the login page.
  if ( @is_readable( "themes/" . $default_theme . ".thm" ) ) {
    $tp = fopen( "themes/" . $default_theme . ".thm", 'r' );
    $theme = load_theme( $tp );
    fclose ($tp);  
  }  
  $style = build_style_sheet( $theme );
  
  if (!isset($ERROR) ) $ERROR = 0;
?>
<html>
<head>
<title>Weeble File Manager</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<style type="text/css">
<?php
 echo $style . "\n";
?></style>
</head>

<body>
<p align="center"><img src=<?php echo "\"$logo_anim\""?> alt="Weeble File Manager"></p>
<form name="form_Login" method="post" action="check_login.php">
  <table border="0" cellspacing="2" cellpadding="2" align="center" class="manager">
    <tr class="alt_row"> 
      <td align="right">Username:</td>
      <td> 
        <input type="text" name="ftp_User" size="20" value="<?php echo $cookie_array[0] ?>">
      </td>
    </tr>
    <tr> 
      <td align="right">Password:</td>
      <td> 
        <input type="password" name="ftp_Pass" size="20" value="<?php echo $cookie_array[1] ?>">
      </td>
    </tr>
    <tr>
      <td align="right">Server:</td>
      <td>
	<input type=text name="login_server" size="20" value="<?php
	    if (isset($cookie_array[2]) && $cookie_array[2] != '')
	       echo $cookie_array[2];
            else
	       echo 'rumkin.com';
        ?>">
      </td>
    </tr>
    <tr> 
      <td colspan=2 align="center" class="buttonBar"> 
          <input type="submit" name="Submit" value="Login" <?php if ($ERROR >= 10) echo "DISABLED"?>>
          <input type="reset" name="Reset" value="Reset">
      </td>
    </tr>
    <tr> 
      <td colspan=2 align="center">
        <input type="checkbox" name="ftp_Remember" value="TRUE"
        <?php 
          if ( $cookie_present ) echo " CHECKED";
          if ( !$ftp_remember_me ) echo " DISABLED";  
        ?>
        >Remember Me
      </td>
    </tr>
<?php
  if ( $cookie_present == TRUE ) {
    echo "    <tr class=\"alt_row\">";
    echo "      <td colspan=2 align=\"center\" style=\"font-size: smaller\">";
    echo "        <A href=\"$PHP_SELF?nocookie=1\">Remove Login Cookie</A>";
    echo "      </td>";
    echo "    </tr>";
  }
?>
  </table>
</form>
<P align="center">
  <?php 
    /*
      Error message definitions:
          0 = No error
       1- 9 = Non-fatal errors, login will still be allowed.
      10-19 = Fatal: Configuration (settings.php) based errors.
      20-29 = Fatal: PHP based errors (e.g. required module isn't installed.
      30-39 = Fatal: UnKnown
         99 = Fatal: Access Denied by configuration.
    */
    switch ( $ERROR )
    {
      case 1:
        echo "<B>Missing username or password.</B>";
        break;
      case 2:
        echo "<B>Server could not be found.</B>";
        break;
      case 3:
        echo "<B>Incorrect username or password.</B>";
        break;
      case 20:
        echo "<B><EM>Encryption (mcrypt) support is broken or not compiled into PHP4.</EM><BR>Please contact your system administrator to correct this error.</B>";
        break;
      case 21:
        echo "<B><EM>register_globals=off</EM><BR>Please contact your system administrator to correct this error.</B>";
        break;
      case 22:
        echo "<B><EM>file_uploads=off</EM><BR>Please contact your system administrator to correct this error.</B>";
        break;
      case 23:
        echo "<B><EM>FTP module is broken or not compiled into PHP4.</EM><BR>Please contact your system administrator to correct this error.</B>";
        break;
      case 99:
        echo "<B><EM>Access denied by WeebleFM configuration.</EM></B>";
        break;
    }
  ?>
</P>
</body>
</html>
