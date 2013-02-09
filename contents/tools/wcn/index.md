---
title: WCN Config Generator
template: page.jade
jsonform: true
---

Windows Connect Now (WCN), or Windows Rally, is a way to make network setup easier.  This standard was created by Microsoft and it basically is just a set of files that are put onto a USB drive.  You share this jump drive with others so they can quickly get on networks without typing in huge passwords.  It also works for some networked devices, like a printer I own.

This is fine and good, but what if you currently don't have a Windows computer available?  What about when your house is filled with Linux or Apple computers?  What if you have some family coming over with their laptops and your randomly generated 64 character key is insanely long to type?  (Yes, I'm describing my house.)  Then you need to email everyone the password or try to tell them your network key and hope they can type it in.  Oh the hassle!  On my printer, even this is not an option; it is WCN or nothing.

Worry no more.  Use this form and a zip file will be created that contains the files you want.  Also, in case you are paranoid like the author, rest assured that your network keys will never touch a hard drive on this side. When you press the button, you will be prompted to download a zip file. The easiest thing to do at this point is to just unzip it on a USB jump drive. If you already had an "autorun.inf" file on there, rename it first so it will not get overwritten by accident.

Inside the zip file that you will download, there is the setupSNK.exe program to ease
installation for Windows XP and Vista (perhaps Windows 7?) computers. Custom WSETTING.TXT and WSETTING.WFC files will have your networking configuration.  Plus, you have the option of an easy batch file, Install_Wireless.bat to help set up your network.  If you include the AUTORUN.INI, you'll also get a logo file to make your jump drive have a cool
icon.

<form method="post" class="jsonform" schema="/schemas/wcn.json" action="/wcn/index.php/wcn-usb.zip">You need JavaScript enabled to see this form.</form>
