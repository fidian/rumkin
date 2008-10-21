<div style="clear: both"></div>
</div>
<?PHP

if ($GLOBALS['HeaderOpts']['Backlinks'] !== false)
{
    include 'backlink.php';
}

?>
</td></tr>
<?PHP if ($adInfo) { ?>
<tr><td align=center><div class=adbox>
<script type="text/javascript">
google_ad_client = "<?PHP echo $adInfo[0] ?>";
google_ad_slot = "<?PHP echo $adInfo[1] ?>";
google_ad_width = "<?PHP echo $adInfo[2] ?>";
google_ad_height = "<?PHP echo $adInfo[3] ?>";
</script><script type="text/javascript"
src="http://pagead2.googlesyndication.com/pagead/show_ads.js"></script>
</div>
</td></tr>
<?PHP } ?>
<tr><td valign=bottom>
<div class="r_footbar">
<?PHP

if ($useTopic && $useTagline)
{

?>
<table width="100%" cellpadding=0 cellspacing=0 border=0>
<tr><td width="65%" rowspan=2>
<iframe class="r_chat" src="<?= $TopicURL ?>" frameborder=0 allowTransparency=true>
<a href="<?= $TopicURL ?>">See comments about this page.</a>
</iframe>
</td><td class="r_info" align=right valign=top>
Tyler Akins &lt;<?= HideEmail('fidian',
'rumkin.com'); ?>&gt;
<?PHP

if (isset($_SESSION['Login_Time']))
{

?><script type="text/javascript" language="JavaScript" src="/inc/js/logout.js"></script><?PHP

}

?>
<br>
<a href="/reference/site/chat.html" onclick="return R_ChatWindow()">Chat</a> -
<a href="/reference/site/contact.php">Contact Me</a> - 
<a href="/reference/site/legal.php">Legal Info</a>
</td></tr><tr><td class="r_trivia" valign=bottom>
<?PHP

ShowTrivia();

?>
</td></tr></table>
<?PHP

}
elseif ($useTagline)
{

?>
<table width="100%" cellpadding=0 cellspacing=0 border=0>
<tr><td class="r_trivia" valign=top>
<?PHP

ShowTrivia();

?>
</td><td class="r_info" align=right valign=top>
Tyler Akins &lt;<?= HideEmail('fidian',
'tiny.net'); ?>&gt;
<?PHP

if (isset($_SESSION['Login_Time']))
{

?><script language="JavaScript" src="/inc/js/logout.js" type="text/javascript"></script><?PHP

}

?>
<br>
<a href="/reference/site/chat.html" onclick="return R_ChatWindow()">Chat</a> -
<a href="/reference/site/contact.php">Contact Me</a> - 
<a href="/reference/site/legal.php">Legal Info</a>
</td></tr></table>
<?PHP

}
elseif ($useTopic)
{

?>
<iframe style="height: 150" class="r_chat" src="<?= $TopicURL ?>" frameborder=0 allowTransparency=true>
<a href="<?= $TopicURL ?>">See comments about this page.</a>
</iframe>
<?PHP

}
else
{

?>
<table border=0 cellpadding=0 cellspacing=0 width="100%">
<tr><td class="r_info"><?= date("l, F n, Y") ?></td>
<td align=right class="r_info"><?= date("G:i:s") ?></td>
</table>
<?PHP

}

if (isset($GLOBALS['Include jsMath']))
{

?>
<script language="javascript" type="text/javascript">
function NoFontMessage() {};
jsMath.Process();
</script>
<?PHP

}

?>
</div>
</td></tr></table>
</body>
</html>
