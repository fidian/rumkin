<?PHP
/* Sprint File Uploader
 *
 * Copyright (C) 2003-2005 - Tyler Akins
 * Licensed under the GNU GPL software license.
 * See the LEGAL file for legal information
 * See http://rumkin.com/tools/sprint/ for more information about these tools
 */

/* This displays the result of uploading the file.  I tried to separate
 * code from HTML.
 */

include 'common.inc';
include 'upload.inc';

if (! isset($_GET['skip']))
{
    // This function will either exit successfully or will call Bail()
    // with an error message.
    $info = HandleUpload();

    // $info['ID'] = Description ID
    // $info['FileID'] = File ID
    // $info['FileName'] = Name of file
    // $info['Folder'] = Folder name, if applicable
    // $info['DescText'] = Description of file
    // $info['URL'] = URL of the file to download (GCD/JAD)
    // $info['URL2'] = URL of the file to download (direct)
    // $info['SendTo'] = Who it was sent to
    // $info['Jump'] = The jump number
    
    if (isset($info['SendTo']))
    {
	setcookie('sendto', $info['SendTo']);
    }
}
else
{
    $info = array();
    $info['FileName'] = 'file.zip';
    $info['Jump'] = 0;
}

SprintStandardHeader('File Uploader');

if ($info['SendTo'] != '')
{
    if (strpos($info['SendTo'], '@') !== false)
      $sendto_type = 'email address';
    else
      $sendto_type = 'phone number';

?>
<p>Sent the download link for <b><?PHP echo $info['FileName'] ?></b> to the
<?PHP echo $sendto_type ?> <?PHP echo $info['SendTo'] ?>.</p>

<p>Please be patient and wait a few minutes for your phone to get the
notification message.  If it doesn't get the message, you use your phone's
web browser and go to this URL to download the file manually:</p>
<?PHP
}
else
{
?>
<p>I am not sending the download link to your phone.  You need to go to
the following URL manually.</p>
<?PHP
}

MakeBoxTop('center');

?>

<b><a href="faq/index.php?Topic=jumpcode">Jump Code:</a>  <?PHP echo $info['Jump'] ?></b><br>
To get a file with the <a href="faq/index.php?Topic=jumpcode">jump code</a>, use your
phone's browser and go to<br>
<?PHP echo $GLOBALS['URL Base'] ?>jump.php

<?PHP

MakeBoxBottom();

?>

<?PHP if ($info['SendTo'] != '') { ?>
<p>Also, please wait a minute or two before uploading another file to your
phone &ndash; Sprint seems to ignore messages that are sent too close to
each other.</p>
<?PHP } ?>

<p><font size="+1">If you have questions or an error message shows up,
please check out the <a href="faq/">FAQ</a> &ndash; it is very likely
your question is answered there.</font></p>

<p>&nbsp;</p>
	
<form action="https://www.paypal.com/cgi-bin/webscr" method="post">
<input type="hidden" name="cmd" value="_xclick">
<input type="hidden" name="business" value="fidian@rumkin.com">
<input type="hidden" name="item_name" value="Rumkin - Phone Uploader">
<input type="hidden" name="no_shipping" value="1">
<input type="hidden" name="return" value="http://rumkin.com/tools/sprint/">
<input type="hidden" name="cancel_return" value="http://rumkin.com/tools/sprint/">
<input type="hidden" name="no_note" value="1">
<input type="hidden" name="currency_code" value="USD">
<input type="hidden" name="tax" value="0">
<input type="hidden" name="lc" value="US">
<input type="hidden" name="bn" value="PP-DonationsBF">
<p align=center>
If you like this service and you want it to remain free, consider
donating, even a dollar or two would be nice.<br>
<input type="image" src="https://www.paypal.com/en_US/i/btn/x-click-but21.gif" border="0" 
name="submit" alt="Donate securely with PayPal"><br>
<font size="-1">I get over 100,000 visitors, almost 2 million hits, and
transfer about 20 gigs of data every month.  Why do this?
Because it is unfair for your provider to charge you such a high amount for
ringers and wallpapers.
By donating, it shows me your appreciation for this tool and makes me want
to keep working on the uploader.
</font></p>
<p align=center>Donations accepted by <a href="#" onclick="javascript:window.open('https://www.paypal.com/us/cgi-bin/webscr?cmd=xpt/popup/OLCWhatIsPayPal-outside','olcwhatispaypal','toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, width=400, height=350');"><img  src="https://www.paypal.com/en_US/i/logo/PayPal_mark_37x23.gif" border="0" alt="Acceptance Mark"></a>
</p>
</form>

<p>Back to the <a href="index.php">Upload Form</a>.</p>

<?PHP

StandardFooter();
