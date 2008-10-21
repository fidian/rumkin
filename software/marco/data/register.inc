<?PHP

if (stristr($GLOBALS['PHP_SELF'], 'register.php') !== false)
    $is_manual = false;
else
    $is_manual = true;
  
if ($is_manual)
{
    $contact_url = "#contact";
    $faq_url = "#faq";
}
else
{
    $contact_url = "contact.php";
    $faq_url = "faq.php";
}

?>
<p>Marco used to be shareware, but now it is not supported.  I have opened
up the registration process to immediately
generate you a working code.</p>

<p>Follow these steps to register Marco for your handheld:

<ol>

<li>Start Marco.

<li><img align=right src="media/menu_button.gif">
Tap on the menu button and select "About Marco" to determine the version
of Marco on your handheld.

<li>Write down the version of Marco.  This
is <i>VERY</i> important.  Keep this information in a safe place.

<li>Press "Ok" to go back to the main menu of Marco.

<li>Tap on Preferences, and then press Register Me.

<li>Look for something that says RegCode.  It should look something
like this:  <b>82:C1:DF:7D:7A:81:70:21:7E:B5:BD</b>

<li>Write down your RegCode in the same place where you wrote down the
version of Marco you are registering.

<script language="JavaScript"><!--
function showCode(st) {
	var co = document.getElementById('codeOut');
	if (! co) {
		return;
	}
	co.innerHTML = st;
}

function makeCode() {
	var ci = document.getElementById('codeIn');
	if (! ci) {
		return false;
	}

	// Get the code
	var regkey = ci.value;

	// Clean it up
	regkey = regkey.toLowerCase();
	regkey = regkey.replace('o', '0');
	regkey = regkey.replace('i', '1');
	regkey = regkey.replace(/[^0-9a-f]/g, '');

	if (regkey.length < 20) {
		showCode('Partial or mis-typed key');
		return false;
	}

	// Parse and break into numbers
	var regbytes = new Array(10);
	var hex = '0123456789abcdef';
	for (var i = 0; i < 10; i ++) {
		regbytes[i] = hex.indexOf(regkey.charAt(i * 2)) * 16 +
			hex.indexOf(regkey.charAt((i * 2) + 1));
	}

	// Check for checksum errors
	var checksum = 0;
	for (var i = 0; i < 9; i ++) {
		checksum += regbytes[i];
		checksum = checksum % 256;
	}
	if (checksum != regbytes[9]) {
		showCode('Checksum does not match - mis-typed key?');
		return false;
	}

	var key = 0;
	for (var i = 0; i < 9; i ++) {
		var a = (21031 * regbytes[i]) & 0xffff;
		a = (a + 24506) & 0xffff;
		var b = (40782 * i) & 0xffff;
		key = ((key ^ a) + (b ^ 27795)) & 0xFFFF;
	}

	key = key.toString();
	while (key.length < 5) {
		key = '0' + key;
	}

	showCode(key);
	return false;
}
// --></script>
<form action="#" onsubmit="return makeCode()">
<li>Enter your code here:  <input type=text id="codeIn" size="40"
onKeyUp="makeCode()" onChange="makeCode()"><Br>
You unlock code:  <span id="codeOut"></span></li>
</form>

<li>Once you get an unlock code (typically a number with five digits), go
back to the registration screen by running Marco, tapping on Preferences,
and then picking Register Me.  Press the button to enter the unlock code.

<li>After entering the code and pressing Ok, Marco will say that
it is going to jump back to the applications screen.  That's fine.  It
doesn't hurt anything.  Just re-run Marco.

<li>To check if it is registered, go back to the preferences screen.  The
Register Me button should no longer be there.  If it still is there, the
unlock code that was entered is not a valid code.

</ol>

<p>If you have any problems, try reading the <a href="<?= $faq_url ?>">FAQ</a>
for answers.</p>
