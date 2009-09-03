<?PHP

require('../../functions.inc');

StandardHeader(array('title' => 'WCN Config Generator',
					'topic' => 'wcn'));

?>

<p>Windows Connect Now (WCN), or Windows Rally, is a way that Microsoft
developed in order to make networking easier.  It will let you generate a
set of files that can be put onto a USB drive, then inserted into a
Windows XP SP 3 or Windows Vista computer in order to nearly instantly
configure networking.</p>

<p>This is fine and good, but what if you currently don't have a Windows
computer available?  What about when your house is filled with Linux or
Apple computers?  What if you have some family coming over with their laptops
and your randomly generated 64 character key is insanely long to type?
Then you need to copy a file or email the key around and trust everyone
can copy and paste.  Oh the hassle!</p>

<p>Worry no more.  Use this form and a zip file will be created that contains
the files you want.  Also, in case you are paranoid like the author, rest
assured that your network keys will never touch a hard drive on this side.
When you press the button, you will be prompted to download a zip file.
The easiest thing to do at this point is to just unzip it on a USB jump drive.
If you already had an "autorun.inf" file on there, rename it first so it
will not get overwritten by accident.</p>

<form method="post" action="wcn.php/wcd-usb.zip">
<table border=1 cellpadding=2 cellspacing=0 align=center>
<tr>
	<th align=right><nobr>SSID:</nobr></th>
	<td><input type=text name=ssid size=32><br>
		The name of the network with which you want to connect.</td>
</tr>
<tr>
	<th align=right><nobr>Connection Type:</nobr></th>
	<td><input type=radio name=connection value=ESS CHECKED> ESS (Infrastructure)<br>
		<input type=radio name=connection value=IBSS> IBSS (Ad hoc)<br>
		If you have an access point or if you are unsure, use ESS.</td>
</tr>
<tr>
	<th align=right><nobr>Authentication:</nobr></th>
	<td><input type=radio name=authentication value=open> Open<br>
		<input type=radio name=authentication value=shared> Shared<br>
		<input type=radio name=authentication value=WPA-NONE> WPA-NONE<br>
		<input type=radio name=authentication value=WPA> WPA<br>
		<input type=radio name=authentication value=WPAPSK> WPAPSK<br>
		<input type=radio name=authentication value=WPA2> WPA2<br>
		<input type=radio name=authentication value=WPA2PSK> WPA2PSK<br>
		I wish I had good advice here.  Sorry.  Write me an email if you
		can think of words that would help in this location.</td>
</tr>
<tr>
	<th align=right><nobr>Encryption:</nobr></th>
	<td><input type=radio name=encryption value=none> None (Unencrypted)<br>
		<input type=radio name=encryption value=WEP> WEP<br>
		<input type=radio name=encryption value=TKIP> TKIP<br>
		<input type=radio name=encryption value=AES> AES<br>
		WEP is insecure.  It is recommended you switch to something better,
		like WPA2PSK/AES.</td>
</tr>
<tr>
	<th align=right><nobr>Network Key:</nobr></th>
	<td><input type=text name=networkkey size=64><br>
		This is the moment we've all been waiting for!</td>
</tr>
<tr>
	<th align=right><nobr>Key Provided Automatically?</nobr></th>
	<td><input type=checkbox name=automatically>
		- Is the key provided by the network automatically?  Probably not.
</tr>
<tr>
	<th align=right><nobr>IEEE 802.1x Enabled?</nobr></th>
	<td><input type=checkbox name=ieee802dot1x>
		- Is IEEE 802.1x access control enabled on this network?  Unsure?
		Then just try it out with this option not checked.
</tr>
<tr>
	<th align=right><nobr>Include Autorun?</nobr></th>
	<td><input type=checkbox name=autorun CHECKED>
		- This will make an autorun.ini file so that the network settings
		program will be started right when you insert the jump drive into
		the computer.  Usually, this is a good thing.</td>
</tr>
<tr>
	<th align=right><nobr>Include Batch File?</nobr></th>
	<td><input type=checkbox name=batch>
		- If you plan on distributing the wireless settings via email,
		on a network drive, or wish to use them from within a directory,
		the setup program works much better when you run it from this batch
		file.  Not needed if you are following the standard plan of using
		a USB jump drive.</td>
<tr>
	<td align=center colspan=2><input type=submit value="Generate Files"></td>
</tr>
</table>
</form>

<?PHP

StandardFooter();
