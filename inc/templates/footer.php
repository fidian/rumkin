<div style="clear: both"></div>
</div>
<?php

if ($GLOBALS['HeaderOpts']['Backlinks'] !== false) {
	include 'backlink.php';
}

?>
</td></tr>
<?php

if ($adInfo) { ?>
<tr><td align=center><div class=adbox>
<script type="text/javascript">
google_ad_client = "<?php echo $adInfo[0] ?>";
google_ad_slot = "<?php echo $adInfo[1] ?>";
google_ad_width = "<?php echo $adInfo[2] ?>";
google_ad_height = "<?php echo $adInfo[3] ?>";
</script><script type="text/javascript"
src="http://pagead2.googlesyndication.com/pagead/show_ads.js"></script>
</div>
</td></tr>
<?php
} ?>
<tr><td valign=bottom>
<div class="r_footbar">
<?php

if ($useTopic && $useTagline) {
	
	?>
<table width="100%" cellpadding=0 cellspacing=0 border=0>
<tr><td width="65%" rowspan=2>
<iframe class="r_chat" src="<?php echo $TopicURL ?>" frameborder=0 allowTransparency=true>
<a href="<?php echo $TopicURL ?>">See comments about this page.</a>
</iframe>
</td><td class="r_info" align=right valign=top>
Tyler Akins &lt;<?php echo HideEmail('fidian', 'rumkin.com'); ?>&gt;
<?php
	
	if (isset($_SESSION['Login_Time'])) {
		
		?><script type="text/javascript" language="JavaScript" src="/inc/js/logout.js"></script><?php
	}
	
	?>
<br>
<a href="/reference/site/chat.html" onclick="return R_ChatWindow()">Chat</a> -
<a href="/reference/site/contact.php">Contact Me</a> - 
<a href="/reference/site/legal.php">Legal Info</a>
</td></tr><tr><td class="r_trivia" valign=bottom>
<?php
	
	ShowTrivia();
	
	?>
</td></tr></table>
<?php
} elseif ($useTagline) {
	
	?>
<table width="100%" cellpadding=0 cellspacing=0 border=0>
<tr><td class="r_trivia" valign=top>
<?php
	
	ShowTrivia();
	
	?>
</td><td class="r_info" align=right valign=top>
Tyler Akins &lt;<?php echo HideEmail('fidian', 'rumkin.com'); ?>&gt;
<?php
	
	if (isset($_SESSION['Login_Time'])) {
		
		?><script language="JavaScript" src="/inc/js/logout.js" type="text/javascript"></script><?php
	}
	
	?>
<br>
<a href="/reference/site/chat.html" onclick="return R_ChatWindow()">Chat</a> -
<a href="/reference/site/contact.php">Contact Me</a> - 
<a href="/reference/site/legal.php">Legal Info</a>
</td></tr></table>
<?php
} elseif ($useTopic) {
	
	?>
<iframe style="height: 150" class="r_chat" src="<?php echo $TopicURL ?>" frameborder=0 allowTransparency=true>
<a href="<?php echo $TopicURL ?>">See comments about this page.</a>
</iframe>
<?php
} else {
	
	?>
<table border=0 cellpadding=0 cellspacing=0 width="100%">
<tr><td class="r_info"><?php echo date('l, F n, Y') ?></td>
<td align=right class="r_info"><?php echo date('G:i:s') ?></td>
</table>
<?php
}

if (isset($GLOBALS['Include jsMath'])) {
	
	?>
<script language="javascript" type="text/javascript">
function NoFontMessage() {};
jsMath.Process();
</script>
<?php
}

?>
</div>
</td></tr></table>
<script src="<?PHP

if (isset($_SERVER['HTTPS'])) {
	echo 'https://ssl.';
} else {
	echo 'http://www.';
}

?>google-analytics.com/ga.js" type="text/javascript"></script>
<script type="text/javascript">
try {
	var pageTracker = _gat._getTracker("UA-7684564-1");
	pageTracker._trackPageview();
} catch(err) {}
</script>
</body>
</html>
