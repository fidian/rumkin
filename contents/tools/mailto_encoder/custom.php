<?php

include '../../functions.inc';


function Insert_JS() {
	
	?>
<SCRIPT LANGUAGE="javascript" type="text/javascript" src="email.js"></SCRIPT>
<SCRIPT LANGUAGE="javascript" type="text/javascript" src="custom.js"></SCRIPT>
<?php
}

StandardHeader(array(
		'title' => 'Mailto Encoder',
		'header' => 'Advanced Mailto Encoder',
		'topic' => 'mailto',
		'callback' => 'Insert_JS'
	));

?>

<p>Below is one of the most flexible email address encoders available on the
web.  You are allowed to pick from several options, to select things you
want to do and things that you don't, and to finally see the end results.</p>

<p>There is also a much <a href="simple.php">simpler</a> version of this web
page, and you can go back to the <a href="index.php">main page</a> of the
mailto encoding tools.</p>

<p><b>Please make sure your email link works!</b>  To test it, use the popup
window link.  Some of the options are incompatible with each other.  I tried
to make warnings appear when conflicts occur, but I may not have caught them
all.</p>

<FORM NAME="MailtoForm" METHOD="POST" ACTION="javascript:RunEncode();">

<?php Section('Step 1:  Email Address'); ?>

<p>Please enter your email address here.  You can feel safe about
typing it in here because all of the processing is done on your
computer and it does not relay any information to any other computer.</p>

<table border=1 cellspacing=1 cellpadding=4>
<tr>
  <th align=right>Email Address:</th>
  <td><input type=text name="Email" size=40 value="user@host.name"></td>
  <td><i>Mandatory</i></td>
</tr>
</table>

<?php Section('Step 2:  Additional Information'); ?>

<p>If you want any other specific information in the email message, you
should enter it here.  This may or may not be supported by the browser +
mail program combination.  The user can most likely edit the information
supplied here.  It just populates the fields to get the email ready for the
user.</p>

<table border=1 cellspacing=1 cellpadding=4>
<tr>
  <th align=right>CC:</th>
  <td><input type=text name="Cc" size=40></td>
  <td>Who else the message should be sent to</td>
</tr>
<tr>
  <th align=right>BCC:</th>
  <td><input type=text name="Bcc" size=40></td>
  <td>People listed here should get a copy but their names won't be on the
      email message.</td>
</tr>
<tr>
  <th align=right>Subject:</th>
  <td><input type=text name="Subject" size=40></td>
  <td>The subject line of the outgoing message.</td>
</tr>
<tr>
  <th align=right>Body:</th>
  <td><input type=text name="Body" size=40></td>
  <td>Text that should appear in the message.</td>
</tr>
</table>

<?php Section('Step 3:  The Link'); ?>

<p>This section describes how the link should look like.  (The "link" is the
"&lt;A HREF=...&gt;" thing.)</p>

<table border=1 cellspacing=1 cellpadding=4>
<tr>
  <td><input type=radio name="Encode_Link" value="None"></td>
  <td>Do not make a link for me.  This skips making the &lt;A HREF=...&gt;
      tag.</td>
</tr>
<tr>
  <td><input type=radio name="Encode_Link" value="Normal" CHECKED></td>
  <td>Make a standard mailto: link in HTML.  This option works great with
      JavaScript encoding, an option displayed below.</td>
</tr>
<tr>
  <td><input type=radio name="Encode_Link" value="Hexer"></td>
  <td>Use HTML hex codes (e.g. "&amp;#117;") and URL encoded characters 
      (e.g. "%75") when writing the HTML.  Better if you do not plan on
      using JavaScript encoding.<br>
      Chance a letter will be encoded:
      <input type=text name="Hexer_Frequency" size=3 value=50>%<br>
      Chance the encoding method will be HTML-style:
      <input type=text name="Hexer_Method" size=3 value=35>%
  </td>
</tr>
<tr>
  <td><input type=radio name="Encode_Link" value="Table"></td>
  <td>Encode the address in a table.  It looks like a normal address, but
      HTML table tags are breaking it up.  A link can not be made with this
      method.  Also, the items from Step 2 are ignored.
  </td>
</tr>
</table>


<?php Section('Step 4:  What Is Displayed'); ?>

<p>Usually, if you make a link on your web page, you want the user to be
able to see your link.  This provides various ways of displaying your email
address.</p>

<table border=1 cellspacing=1 cellpadding=4>
<tr>
  <td><input type=radio name="Encode_Visible" value="None"></td>
  <td>Do not make anything visible for me.  This will make any link impossible
      to click, since there won't be anything for the user to click upon.
  </td>
</tr>
<tr>
  <td><input type=radio name="Encode_Visible" value="Normal" CHECKED></td>
  <td>Normal -- just display the email address plainly.  Use this with
      JavaScript encoding, otherwise your email address will be harvested
      by spambots.
  </td>
</tr>
<tr>
  <td><input type=radio name="Encode_Visible" value="Text"></td>
  <td>Use this text instead of another option.  Be careful with HTML
      characters such as &amp;, &lt;, and &gt;.  Use &amp;amp; instead of
      &amp;, etc.<br>
      <input type=text name="Encode_Visible_Text" size=40>
  </td>
</tr>
<tr>
  <td><input type=radio name="Encode_Visible" value="Image"></td>
  <td>Show address as an image.  I have "image.jpg" on my server to show you
      an example of what this will look like.  Change it to whatever name you
      want right before you copy the generated code to your page.<br>
      Filename:
      <input type=text name="Visible_ImageName" value="media/image.jpg"><br>
      Alt text:
      <input type=text name="Visible_ImageAlt" size=40 value="Email Me"><br>
      Additional image parameters:
      <input type=text name="Visible_ImageTags" size=40 value="border=0">
  </td>
</tr>
<tr>
  <td><input type=radio name="Encode_Visible" value="SillySpeak"></td>
  <td>Use some sort of silly notation -- user (at) host [dot] com</td>
</tr>
<tr>
  <td><input type=radio name="Encode_Visible" value="DeleteMe"></td>
  <td>Insert extra words into the email address, using various methods.
      This is more common in places that you can not enter a link and must
      enter your email address in plain text.<br>
      <select name="DeleteMeOpts" size=1>
      <option value="Solid">user@DELETEMEhost.name</option>
      <option value="Split">userNO@hoSPAMst.name</option>
      <option value="Mingled">uNsOeSrP@AhMoNsOtS.PcAoMm</option>
      </select><br>
      <input type=checkbox name="DeleteMe_Lowercase"> Use lowercase
  </td>
</tr>
<tr>
  <td><input type=radio name="Encode_Visible" value="Reverse"></td>
  <td>Reverse the email address.  Again, not very common, but might be fun
      to look at.  (e.g.  moc.tsoh@resu)
  </td>
</tr>
<tr>
  <td><input type=radio name="Encode_Visible" value="Hexer"></td>
  <td>Use HTML character encoding (e.g. "&amp;#117;") on some or all of the
      letters.<br>
      Chance a letter is encoded:
      <input type=text name="HexerLink_Frequency" size=3 value=40>%
  </td>
</tr>
</table>


<?php Section('Step 5:  Additional Options'); ?>

<table border=1 cellspacing=1 cellpadding=4>
<tr>
  <td><input type=checkbox name="Option_Javascript"></td>
  <td>Encode everything in JavaScript.  The Double-Escaped code may not work
      properly with Opera 5, but might in newer versions.  I tried to make
      sure that the generated code is pretty small, especially when compared
      to a couple of the larger JavaScript encoding functions out there.<br>
      Encoding Strength:  <select name="JavascriptStrength">
      <option value="Normal">Normal</option>
      <option value="Break">Break up strings</option>
      <option value="Subst" SELECTED>Substitutions (My Favorite)</option>
      <option value="Double">Double-Escaped</option>
      </select>
  </td>
</tr>
<tr>
  <td><input type=checkbox name="Option_ImageAt"></td>
  <td>Use an image instead of the @ symbol.<br>
      Filename:
      <input type=text name="Options_ImageName" value="media/at.jpg" size=40><br>
      Alt text:
      <input type=text name="Options_ImageAlt" value=" (at) " size=40>
  </td>
</tr>
</table>


<?php Section('Step 6:  Generate HTML'); ?>

<p>Press this button to generate the code that you will copy into your web
page's source.</p>

<?php MakeBoxTop('center'); ?>
<INPUT TYPE="SUBMIT" VALUE="Encode Address">
<?php MakeBoxBottom(); ?>
<P><B>Your final HTML code is:</B><BR>
<textarea name="CodeText" rows=5 cols=70 wrap=soft></TEXTAREA>
</form>
<BR>... View the code in a <A
HREF="javascript:CreatePopup(document.MailtoForm.CodeText.value);">popup
window</A>.</p>

<p>If you want a new email image or the '@' symbol as an image, you should
visit <A HREF="http://www.cooltext.com/">CoolText.com</A> and it can make them
for you.  It's free and web-based.</P>

<P><font size="-1">Please don't steal this script and
say that you wrote it.  It took me <b>forever</b> to make this
little bugger.  You can copy it and use it on your web site or
whatever.  Just please give me credit by mentioning my name (Tyler
Akins) and provide a link to my site (<a
href="http://rumkin.com/tools/mailto_encoder">http://rumkin.com/tools/mailto_encoder</a>).</p>

<?php

StandardFooter();
