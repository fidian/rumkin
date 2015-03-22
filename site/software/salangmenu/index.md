----
title: SalangMenu
template: index.jade
----

<center>
    <applet code="SalangMenu.class" width="300" height="30">
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
        <param name="popurl21" value="#HowInclude">
        <param name="pop22" value="Explanation of Options">
        <param name="popurl22" value="#Options">
    </applet>
</center>


Introduction
============

Since I am unable to locate the actual author(s) of this neat little applet, I decided to write up some documentation myself.  If you do find the actual author(s) of this applet, please let me know.  Until the real webpage can be found, this might be an adequate replacement.  If you want to download it, you can get a [zip archive](salangmenu.zip) of the .class files.  I would suggest saving this web page file to disk so that you have the documentation with the .class files when you need it.

From what I have been able to tell, this applet is freeware (all the sites that list it only list it as freeware).  It is one of the smallest Java menu applets I have found, totaling only about 10k.


How To Include
==============

First off, please be familiar with inserting Java applets into your web
pages.  There are tons of tutorials out there, so go check them out.  View the page source to see how I add my own `<applet>` tag.


Explanation Of Options
======================

* `applet codebase="media/" code="SalangMenu.class" width="300" height="30"` - Make sure that it is wide enough and tall enough for your use.  The class files are case sensitive, so make sure you have them named correctly and refer to the appropriately.  Popup.class, Pulldown.class, SalangMenu.class.  I once put mine into a "media" directory, which explains the "codebase" attribute.  Since then I have moved them back and my current `<applet>` tag doesn't have the `codebase=` bit.

* `param name="copyright" value="jzs club"` - Must be in here.  Sad, really, since searching for "jzs club" on the web results in nothing.  It would be better if the jzs club had a web page.

* `param name="batangcolor" value="255,255,255"` - Background color, from what I can gather.

* `param name="menubgcolor" value="192,192,192"` - Background color again?

* `param name="menufgcolor" value="0,0,0"` - Foreground color

* `param name="mainfontheight" value="16"` and `param name="mainfont" value="Arial"` - Which font and how big the font should be for the main menu.

* `param name="subfontheight" value="14"` and `param name="subfont" value="Arial"` - Which font and how big the font should be for all sub-menus.

* `param name="target" value="_top"` - Which frame the link should load in -- use `_top` for non-frames pages.

* `param name="pullsx" value="0"` - Indent from left side of applet box in pixels.

* `param name="pullnum" value="2"` - Number of items in the main menu.  Keep this number below ten to avoid problems with it later in life.

* `param name="sbgcolor1" value="166,188,100"` and `param name="sfgcolor1" value="0,0,0"` and `param name="popbgcolor1" value="90,194,240"` and `param name="popfgcolor1" value="0,0,0"` - Color setup for the menu when selected and the selected popup menu.  Notice how everything has a 1 after it?  You repeat this section for every menu option.

* `param name="pull1" value="Introduction"` and `param name="pullurl1" value="#Intro"` and `param name="popnum1" value="0"` - Name of the first item in the menu, the URL it should go to, and the number of sub-menu items.  Again, everything has a 1 after it, indicating that this is for the first menu option.  You repeat this for each menu option.

* `param name="pop21" value="How To Include"` and `param name="popurl21" value="index.php#HowInclude"` - The name and the URL for the sub menu option.  The "21" means it is for menu option 2, submenu option 1.  Now you might guess why you want less than 10 options in your main menu and in each submenu.  Again, repeat this format for each menu option.

* `/applet` - Done.

You can add other options and other submenus by adding param tags and changing the names appropriately.
