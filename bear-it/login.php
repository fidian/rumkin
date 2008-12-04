<?php

require_once('main.inc');
$Comment = '';

if ($GLOBALS['IsAdmin']) {
	session_unregister('SessPass');
	$GLOBALS['IsAdmin'] = false;
	
	if (isset($auto_logout))Location('index.php?popcomment=You+have+been+automatically+logged+' . 'out+due+to+inactivity.');
	else Location('index.php?popcomment=You+have+been+logged+out!');
}

if (isset($Password)) {
	if ($Password == $GLOBALS['admin_password']) {
		global $SessPass;
		$SessPass = $Password;
		session_register('SessPass');
		Location('index.php');
	}
	
	$Comment = 'Invalid password.  Login attempt logged.';
}

ShowHeader('Admin Login');

if ($Comment != '')ShowComment($Comment);

?>
	

<FORM METHOD="POST" ACTION="login.php" name='LoginForm'>
  <table>
      <tr>
        <td>Password:</td>
        <td><INPUT TYPE="password" NAME="Password" SIZE=32></td>
      </tr>
  </table>
<INPUT TYPE="submit" VALUE="Login">
</FORM>

<script language="javascript">

document.LoginForm.Password.focus();	
document.onload = JumpToPasswordBox;
//setTimeout("JumpToPasswordBox()", 100);

function JumpToPasswordBox() {
   // Doesn't work for Mozilla, but it is needed for Netscape in frames
   // document.focus();
   document.LoginForm.Password.focus();
}

</script>

<?php

ShowFooter(- 1, - 1);

?>
