title: WCN Config Generator
template: page.jade

Windows Connect Now (WCN), or Windows Rally, is a way to make network setup easier.  This standard was created by Microsoft and it basically is just a set of files that are put onto a USB drive.  You share this jump drive with others so they can quickly get on networks without typing in huge passwords.  It also works for some networked devices, like a printer I own.

This is fine and good, but what if you currently don't have a Windows computer available?  What about when your house is filled with Linux or Apple computers?  What if you have some family coming over with their laptops and your randomly generated 64 character key is insanely long to type?  (Yes, I'm describing my house.)  Then you need to email everyone the password or try to tell them your network key and hope they can type it in.  Oh the hassle!  On my printer, even this is not an option; it is WCN or nothing.

Worry no more.  Use this form and a zip file will be created that contains the files you want.  Also, in case you are paranoid like the author, rest assured that your network keys will never touch a hard drive on this side. When you press the button, you will be prompted to download a zip file. The easiest thing to do at this point is to just unzip it on a USB jump drive. If you already had an "autorun.inf" file on there, rename it first so it will not get overwritten by accident.

Inside the zip file that you will download, there is the setupSNK.exe program to ease
installation for Windows XP and Vista (perhaps Windows 7?) computers. Custom WSETTING.TXT and WSETTING.WFC files will have your networking configuration.  Plus, you have the option of an easy batch file, Install_Wireless.bat to help set up your network.  If you include the AUTORUN.INI, you'll also get a logo file to make your jump drive have a cool
icon.

<form method="post" action="wcn.php/wcd-usb.zip">
<table border=1 cellpadding=2 cellspacing=0 align=center>
<tr>
	<th align=right><nobr>SSID:</nobr></th>
	<td><input type=text name=ssid size=32><br>
		The name of the network with which you want to connect.</td>
</tr>
<tr>
	<th align=right><nobr>Connection Type:</nobr></th>
	<td><select name="connection">
			<option value="ESS">ESS (Infrastructure)</option>
			<option value="IBSS">IBSS (Ad-hoc)</option>
		</select><br>
		If you have an access point or if you are unsure, use ESS.</td>
</tr>
<tr>
	<th align=right><nobr>Authentication:</nobr></th>
	<td><select name="authentication">
			<option value="open">Open</option>
			<option value="shared">Shared</option>
			<option value="WPA-NONE">WPA-NONE</option>
			<option value="WPA">WPA</option>
			<option value="WPAPSK">WPAPSK</option>
			<option value="WPA2">WPA2</option>
			<option value="WPA2PSK">WPA2PSK</option>
		</select><br>
		I wish I had good advice here.  Sorry.  Write me an email if you
		can think of words that would help in this location.</td>
</tr>
<tr>
	<th align=right><nobr>Encryption:</nobr></th>
	<td><select name="encryption">
			<option value="none">None (Unencrypted)</option>
			<option value="WEP">WEP</option>
			<option value="TKIP">TKIP</option>
			<option value="AES">AES</option>
		</select><br>
		WEP is insecure and you should switch to something better, such as
		WPA2PSK/AES.</td>
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
