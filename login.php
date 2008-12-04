<?php

include 'functions.inc';
global $Users;
session_start();

if (! isset($_SESSION['Redirect']))$_SESSION['Redirect'] = '/';
$failure = false;

if (isset($_POST['u']) && isset($_POST['p'])) {
	if (ValidPassword()) {
		$_SESSION['Login_User'] = $_POST['u'];
		$_SESSION['Login_Pass'] = $Users[$_POST['u']][0];
		$_SESSION['Login_Time'] = time();
		Redirect($_SESSION['Redirect']);
	}
	
	$failure = true;
}

StandardHeader(array(
		'title' => 'Verify Identity',
		'callback' => 'AddJavascript'
	));

?>

<p><?php

if (! $failure) { ?>
	In order to view this page, you need to verify your identity.
	Please login.
<?php
} else { ?>
	Login invalid.  All accesses to this page are logged.
<?php
} ?>

<form method=post action="login.php" name=theform onsubmit="RecodePass()">
<input type=hidden name=nonce value="<?php MakeNonce() ?>">
<input type=hidden name=md5 value="">
<table align=center border=1>
<tr><th align=right>Username:</th>
<td><input type=text name=u size=20></td></tr>
<tr><th align=right>Password:</th>
<td><input type=password name=p size=20></td></tr>
<tr><td colspan=2 align=center><input type=submit value="Log In"></td></tr>
</table>
</form>
<script language=javascript>
<!--
document.theform.u.focus();
// -->
</script>
<?php

StandardFooter();


function AddJavascript() {
	
	?>
<script language="javascript" src="/inc/js/md5.js"></script>
<script language="javascript">
function RecodePass()
{
   document.theform.md5.value =
      md5(document.theform.nonce.value + md5(document.theform.p.value));
   i = document.theform.p.value.length;
   document.theform.p.value = "";
   while (i --)
      document.theform.p.value += "*";
}
</script><?php
}

// I trust PHP's mt_rand more than Math.rand() in javascript
function MakeNonce() {
	$let = ' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	$let .= '0123456789,.?;:[]{}|-_=+~';
	$str = '';
	
	for ($i = 0; $i < 32; $i ++) {
		$str .= substr($let, mt_rand(0, strlen($let) - 1), 1);
	}
	
	echo $str;
}

// Test to see if the user/pass combo is valid
function ValidPassword() {
	global $Users;
	
	if (! isset($Users[$_POST['u']]))return false;
	
	if (isset($_POST['md5']) && $_POST['md5'] != '') {
		// Use the nonce + md5 encrypted pass
		if (md5($_POST['nonce'] . $Users[$_POST['u']][0]) == $_POST['md5']) {
			return true;
		}
		
		return false;
	}
	
	if ($Users[$_POST['u']][0] == md5($_POST['p'])) {
		return true;
	}
	
	return false;
}

