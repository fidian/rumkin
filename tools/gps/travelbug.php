<?PHP

include '../../functions.inc';

if (isset($_POST['Name']))
{
    if (get_magic_quotes_gpc())
    {
	foreach ($_POST as $k => $v)
	{
	    $_POST[$k] = stripslashes($v);
	}
    }
    ShowInfoSheet();
    exit;
}

StandardHeader(array('title' => 'Travel Bug Info Sheet',
		     'topic' => 'gps'));

?>
<p>This travel bug information sheet is formatted to be similar to the one
at the <a
href="http://www.xsnrg.com/geocachingwa/asp/travelbugsheet1a.asp">WSGA</a>,
which appears to be the same as the one you can get at the
<a href="http://www.geocaching.com/">Geocaching</a> web site.
The main difference is that this one is intended to fit on a double-sided
credit-card sized piece of paper, which is easier to laminate and take with
bugs that don't fit inside a plastic baggie easily.  Just print, cut,
laminate, and you're set.  If you want one for a 5"x5.2" baggie or a 6"x6"
baggie, I suggest you use the prettier version at <a
href="http://www.xsnrg.com/geocachingwa/asp/travelbugsheet1a.asp">WSGA's
Travel Bug Sheet</a> page.</p>

<p>If you intend on laminating the card and attaching it to the item, I
would suggest printing out the card, folding it, punch a larger hole in it,
and then laminate it.  If you punch the card in the paper area after it is 
laminated, the paper could get wet and destroy the tag.  If you are really
concerned with that, either pre-punch a
larger hole so you have sealed laminate around the paper, or leave a tag of
laminate to one side of the card.  In the end, you won't want to have any
chance of water getting in direct contact with the paper.</p>

<form method=post action="<?= $PHP_SELF ?>">
<table align=center>
<tr><th align=right>Travel Bug Name:</th>
<td><input type=text name=Name size=35></td></tr>
<tr><th align=right>Mission (optional):</th>
<td><input type=text name=Mission size=50></td></tr>
<tr><td colspan=2 align=center>
<input type=submit value="Make Info Sheet"></td></tr>
</table>
</form>
<?PHP

StandardFooter();



function ShowInfoSheet()
{
?>
<html><head><title>Travel Bug Info Sheet</title>
<style type="text/css">
<!--

.heading { font-size: 14pt;
           font-weight: bold; }
	   
.subhead { font-size: 10pt; }

.mission { font-size: 11pt;
           font-family: Arial; 
	   margin-top: 1mm;
	   padding: 1mm;
	   text-align: center;
	   border-style: solid;
	   border-width: 1px; }

.bugname { text-decoration: underline; 
           font-weight: bold; }

.bugtravel { font-weight: bold; }

.textfont { font-size: 9pt; }

.textbold { font-weight: bold; }

.textul { text-decoration: underline; }

.url { font-family: courier; }

.bugimg { padding-right: 1mm; }

/* size is decreased from 90x55 mm to allow for padding */

.cardsize { width: 85mm;
            height: 50mm; 
	    border-style: solid;
	    border-width: 1pt; 
	    padding: 2mm; }

-->
</style></head>
<body bgcolor="#FFFFFF">
<table align=center border=0 cellspacing=0>
<tr><td class=cardsize>

<table align=center border=0 cellpadding=0 cellspacing=0>
<tr><Td><img src=media/travelbug.jpg align=left class=bugimg></td><td>
<div class=heading>This Is No Ordinary Geocaching Trading
Item!</div>
<div class=subhead><br>
<span class=bugname><?= htmlspecialchars($_POST['Name']) ?></span>
is a <span class=bugtravel>Travel Bug</span>,
<?PHP if ($_POST['Mission'] && $_POST['Mission'] != '') { ?>
traveling from geocache to geocache on a very specific mission:</div>
<div class=mission><?= htmlspecialchars($_POST['Mission']) ?>
<?PHP } else { ?>
traveling from geocache to geocache, wandering across the globe, desiring
only to keep moving and see as many different areas as possible.
<?PHP } ?></div>

</td></tr></table>

</td><td class=cardsize>
<div class=textfont>
If you do not intend to log your visit onto the 
<span class=url>geocaching.com</span> web site, please 
<span class=textbold>DO NOT TAKE THIS ITEM</span>.  Its travels and
progress require you to log that it is being taken from this geocache.
You will also need to log when you place it in another geocache.  
It's easy!

<br><br>

If you are willing to log your part of the journey of this
bug and place it in another geocache as soon as possible 
(<span class=textul>after</span> you log your find), grab it from this 
geocache and read the instructions on the 
<span class=url>geocaching.com</span> web site.

</div>

</td></tr></table>

</body></html>
<?PHP
}
