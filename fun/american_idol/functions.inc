<?PHP


function Box($title, $data, $tableParms = '') {
   $Dim = array('top' => 33,
                'left' => 12,
		'right' => 12,
		'bottom' => 9);
		
   ?><table <?PHP echo $tableParms ?> border=0 cellpadding=0 cellspacing=0>
  <tr><td background="media/corner_topleft.gif"><img 
      src="media/spacer.gif" height=33 width=12></td>
    <td width=98% background="media/box_top.gif" valign=top><CENTER><image 
      align=center src="media/spacer.gif" height=5></CENTER><font 
      color="#FFFFFF" face="arial"><B><?PHP echo $title ?></B></font></td>
    <td background="media/corner_topright.gif"><img 
      src="media/spacer.gif"></td></tr>
  <tr><td background="media/box_left.gif"><img src="media/spacer.gif"></td>
    <td bgcolor="#FFFFFF"><font color="#000000" face="times"><?PHP
    echo $data ?></font></td>
    <td background="media/box_right.gif"><img 
      src="media/spacer.gif"></td></tr>
  <tr><td background="media/corner_bottomleft.gif"><img
      src="media/spacer.gif"></td>
    <td background="media/box_bottom.gif"><img 
      src="media/spacer.gif"></td>
    <td background="media/corner_bottomright.gif"><img
      src="media/spacer.gif" height=9 width=12></td></tr>
  <tr><td colspan=3><img src="media/spacer.gif" height=5></td></tr>
</table>
<?PHP
}


function StandardHeader() {
   $newTitle = "American Idol Online Judging";
   
?><HTML><HEAD><TITLE><?PHP echo $newTitle ?></TITLE></HEAD>
<style type="text/css">
<!--
body {
   background-position: center top;
   background-repeat: no-repeat;
}
-->
</style>
<!-- These generated pages are (C)opyright 2002-2003, Tyler Akins -->
<body bgcolor=#000000 text=#606060 link=#7F5020
background="media/bg_blank.jpg">
<center><img src="media/spacer.gif" height=100></center>
<?PHP
}


function TinyFooter() {
?>
<p><hr>
<font size=-2>
Tyler Akins (<?PHP
HideEmail('fidian', 'rumkin.com') ?>)<br>
All names, trademarks, etc. are property of their respective
owners.  This site is not an official site of <a
href="http://idolonfox.msn.com">American Idol</a>.  It is just here to amuse.
If I am stepping on anyone's toes, just send me an email and I'll quickly 
do what I can about removing or modifying the content.
</font></p>
<?PHP
}


function StandardFooter() {
   TinyFooter();
?>
</td></tr>
</table>
</body>
</html>
<?PHP
}


function HideEmail($user, $pass) {
   $MailLink = '<a href="mailto:' . $user . '@' . $pass . '">' . $user .
      '@' . $pass . '</a>';
   
   $MailLinkNew = '';
   for ($i = 0; $i < strlen($MailLink); $i ++) {
      $MailLinkNew .= '%' . bin2hex($MailLink[$i]);
   }
   $MailLink = $MailLinkNew;
   
   $MailLinkNew = array();
   while (strlen($MailLink)) {
      $MailLinkNew[] = substr($MailLink, 0, 25) . '" + "' .
         substr($MailLink, 25, 25);
      $MailLink = substr($MailLink, 50);
   }
   
?><SCRIPT LANGUAGE="javascript">
MaIlMe=new Array();
<?PHP foreach ($MailLinkNew as $index =>$data) {
?>MaIlMe[<?PHP echo $index ?>]="<?PHP echo $data ?>";
<?PHP } ?>

OutString="";
for (j=0;j<MaIlMe.length;j++){
OutString+=MaIlMe[j];
}document.write(unescape(OutString));
</SCRIPT><NOSCRIPT>Sorry, you need javascript to this email address</noscript><?PHP
}
