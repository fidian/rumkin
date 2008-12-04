<?php

include '../../functions.inc';
StandardHeader(array(
		'title' => 'SalangMenu',
		'topic' => 'salangmenu'
	));
$Applet = '<applet code="media/SalangMenu.class" width="300" height="30">
    <!-- Needs to be in here -->
    <param name="copyright" value="jzs club">
    <!-- Color setup -->
    <param name="batangcolor" value="255,255,255">
    <param name="menubgcolor" value="192,192,192">
    <param name="menufgcolor" value="0,0,0">
    <!-- Font setup -->
    <param name="mainfontheight" value="16">
    <param name="mainfont" value="Arial">
    <param name="subfontheight" value="14">
    <param name="subfont" value="Arial">
    <!-- Target (for frames) -->
    <param name="target" value="_top">
    <!-- Indent from left side -->
    <param name="pullsx" value="0">
    <!-- Number of items in main menu -->
    <param name="pullnum" value="2">
    <!-- Item number one -->
    <param name="sbgcolor1" value="166,188,100">
    <param name="sfgcolor1" value="0,0,0">
    <param name="popbgcolor1" value="90,194,240">
    <param name="popfgcolor1" value="0,0,0">
    <param name="pull1" value="Introduction">
    <param name="pullurl1" value="index.php#Intro">
    <param name="popnum1" value="0">
    <!-- Item number two -->
    <param name="sbgcolor2" value="241,121,107">
    <param name="sfgcolor2" value="0,0,0">
    <param name="popbgcolor2" value="90,194,240">
    <param name="popfgcolor2" value="0,0,0">
    <param name="pull2" value="Usage">
    <param name="pullurl2" value="none">
    <param name="popnum2" value="2">
    <!-- Sub menu under item 2 -->
    <param name="pop21" value="How To Include">
    <param name="popurl21" value="index.php#HowInclude">
    <param name="pop22" value="Explanation of Options">
    <param name="popurl22" value="index.php#Options">
</applet>
';

?>

<center>

<?php echo $Applet ?>

</center>

<?php Section('<a name="Intro">Introduction</a>'); ?>

<p>Since I am unable to locate the actual author(s) of this neat little
applet, I decided to write up some documentation myself.  If you do find 
the actual author(s) of this applet, please let me know.  Until the
real webpage can be found, this might be an adequate replacement.  If you
want to download it, you can get a <a href="media/salangmenu.zip">zip archive</a>
of the .class files.  I would suggest saving this web page file to disk so
that you have the documentation with the .class files when you need it.</p>

<p>From what I have been able to tell, this applet is freeware (all the
sites that list it only list it as freeware).  It is one of the smallest
Java menu applets I have found, totalling only about 10k.</p>

<?php Section('<a name="HowInclude">How to Include</a>'); ?>

<p>First off, please be familiar with inserting Java applets into your web
pages.  There are tons of tutorials out there, so go check them out.  
This is is how I got the above menu displayed:</p>

<pre><?php echo htmlspecialchars($Applet) ?>
</pre>

<?php Section('<a name="Options">Explanation of Options</a>'); ?>

<dl>

<dt>applet code="media/SalangMenu.class" width="300" height="30"</dt>
<dd>Make sure that it is wide enough and tall enough for your use.  The
class files are case sensitive, so make sure you have them named correctly
and refer to the appropriately.  Popup.class, Pulldown.class,
SalangMenu.class.  I put mine into a "media" directory; you need not do
the same.</dd>

<dt>param name="copyright" value="jzs club"
<dd>Must be in here.  Sad, really, since searching for "jzs club" on the web
results in nothing.  It would be better if the jzs club had a web page.</dd>

<dt>param name="batangcolor" value="255,255,255"</dt>
<dd>Background color, from what I can gather.</dd>

<dt>param name="menubgcolor" value="192,192,192"</dt>
<dd>Background color again?</dd>

<dt>param name="menufgcolor" value="0,0,0"</dt>
<dd>Foreground color</dd>

<dt>param name="mainfontheight" value="16"<br>
param name="mainfont" value="Arial"</dt>
<dd>Which font and how big the font should be for the main menu.</dd>

<dt>param name="subfontheight" value="14"<br>
param name="subfont" value="Arial"</dt>
<dd>Which font and how big the font should be for all sub-menus.</dd>

<dt>param name="target" value="_top"</dt>
<dd>Which frame the link should load in -- use _top for non-frames pages.</dd>

<dt>param name="pullsx" value="0"</dt>
<dd>Indent from left side of applet box in pixels.</dd>

<dt>param name="pullnum" value="2"</dt>
<dd>Number of items in the main menu.  Keep this number below ten to avoid
problems with it later in life.</dd>

<dt>param name="sbgcolor1" value="166,188,100"<br>
param name="sfgcolor1" value="0,0,0"<br>
param name="popbgcolor1" value="90,194,240"<br>
param name="popfgcolor1" value="0,0,0"</dt>
<dd>Color setup for the menu when selected and the selected popup menu.
Notice how everything has a 1 after it?</dd>

<dt>param name="pull1" value="Introduction"<br>
param name="pullurl1" value="index.php#Intro"<br>
param name="popnum1" value="0"</dt>
<dd>Name of the first item in the menu, the URL it should go to, and the
number of sub-menu items.  Again, everything has a 1 after it, indicating
that this is for the first menu option.</dd>

<dt>param name="sbgcolor2" value="241,121,107"<br>
param name="sfgcolor2" value="0,0,0"<br>
param name="popbgcolor2" value="90,194,240"<br>
param name="popfgcolor2" value="0,0,0"</dt>
<dd>Color setup for the second menu option and its submenu.  All the 1's
have been changed to 2's so this is for the second option.</dd>

<dt>param name="pull2" value="Usage"<br>
param name="pullurl2" value="none"<br>
param name="popnum2" value="2"</dt>
<dd>The name of the item, the URL ("none" = no link), and the number of
sub-menus.</dd>

<dt>param name="pop21" value="How To Include"<br>
param name="popurl21" value="index.php#HowInclude"</dt>
<dd>The name and the URL for the sub menu option.  The "21" means it is for
menu option 2, submenu option 1.  Now you might guess why you want less than
10 options in your main menu and in each submenu.</dd>

<dt>param name="pop22" value="Explanation of Options"<br>
param name="popurl22" value="index.php#Options"</dt>
<dd>Menu option 2, submenu option 2.</dd>

<dt>/applet</dt>
<dd>Done.</dd>

</dl>

<p>You can add other options and other submenus by adding param tags and
changing the names appropriately.</p>

<?php

StandardFooter();
