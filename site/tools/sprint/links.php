<?php
/* Sprint File Uploader
 * 
 * Copyright (C) 2003-2005 - Tyler Akins
 * Licensed under the GNU GPL software license.
 * See the LEGAL file for legal information
 * See http://rumkin.com/tools/sprint/ for more information about these tools
 */
require 'common.inc';
SprintStandardHeader('Phone Links');
echo '<p>Below are sites that deal with mobile phones, have content ' . 'available for you to download, or contain information that may ' . 'be useful.  If you know of other sites, feel free to email ' . 'me about them.</p>';
Section('Ringers, Wallpapers, and Other Phone Files');
$Links = array(
	array(
		'Name' => 'Cellfiles',
		'Desc' => 'A forum where you can post and request ringers, apps, ' . 'games, and videos.  Need stuff to send to your phone?',
		'URL' => 'http://cellfiles.org/'
	),
	array(
		'Name' => 'Craig Given',
		'Desc' => 'Very clean site with ringtones, apps, and images.  ' . 'There is also a very nice FAQ available that will ' . 'answer many questions about using your phone and ' . 'getting more things onto it.',
		'URL' => 'http://www.craiggiven.com/pcs.htm'
	),
	array(
		'Name' => 'fonpirate',
		'Desc' => 'Browse this site with your phone to get images, ' . 'ringers, and programs.',
		'URL' => 'http://www.fonpirate.com/'
	),
	array(
		'Name' => 'Fresh MIDIs',
		'Desc' => 'Popular songs that are in MIDI format, ready for your ' . 'phone.',
		'URL' => 'http://freshmidis.co.nr/'
	),
	array(
		'Name' => 'GetJar',
		'Desc' => 'Games, applications, and utilities for your phone.',
		'URL' => 'http://www.getjar.com/'
	),
	array(
		'Name' => 'MBuzzy',
		'Desc' => 'Free ringtones, apps, and images.  Lots of content.',
		'URL' => 'http://mbuzzy.com/'
	),
	array(
		'Name' => 'Midi Freak',
		'Desc' => 'Free MIDI songs, ringtones, and other things you ' . 'can upload to your phone.',
		'URL' => 'http://www.midifreak.net/Midi.html'
	),
	array(
		'Name' => 'Midlet.org',
		'Desc' => 'Java based games for mobile phones.',
		'URL' => 'http://midlet.org/'
	),
	array(
		'Name' => 'MyPhoneFiles',
		'Desc' => 'Ringers, wallpapers, and more.',
		'URL' => 'http://www.myphonefiles.com/'
	),
	array(
		'Name' => 'phoneART',
		'Desc' => 'Collection of wallpapers and ringers for you to ' . 'download.  You can also leave a comment in the guestbook ' . 'to request something special.',
		'URL' => 'http://www.phoneart.net'
	),
	array(
		'Name' => 'Ring Cities',
		'Desc' => 'Forum site where you can get ringers, games, and ' . 'other downloads.',
		'URL' => 'http://ringcities.com/'
	),
);
MakeLinkList($Links);
Section('Other Uploaders', 'uploaders');
$Links = array(
	array(
		'Name' => '2 ur Phone',
		'Desc' => 'An alternate uploader that uses its own custom ' . 'software.  If you try this, let me know how well ' . 'it works.',
		'URL' => 'http://www.2urphone.com/'
	),
	array(
		'Name' => '3G Inferno',
		'Desc' => 'A blended site that hosts both my old and newer ' . 'uploader, so you can upload .jar files with ' . '.jad if you have them.',
		'URL' => 'http://www.3ginferno.com/uploaders/'
	),
	array(
		'Name' => 'a9000 Upload',
		'Desc' => 'Formats files so you can use QPST to transfer them ' . 'to your phone with a USB cable.  Doesn\'t do any ' . 'uploading itself; it helps make the required files ' . 'to use QPST effectively.',
		'URL' => 'http://www.a900upload.com'
	),
	array(
		'Name' => 'BitPim',
		'Desc' => 'Runs on your local computer and talks to your phone ' . 'through a special USB cable.  Freeware, but you do ' . 'need to go out and buy a cable.',
		'URL' => 'http://bitpim.sourceforge.net/'
	),
	array(
		'Name' => 'CellPhoto',
		'Desc' => 'Another uploader site that was mentioned in the ' . 'shoutbox.',
		'URL' => 'http://www.cellphoto.net/'
	),
	array(
		'Name' => 'Chris On The Web',
		'Desc' => 'My uploader, but skinned to look better and with an ' . 'improved gallery.',
		'URL' => 'http://www.chrisontheweb.net/cellphones/'
	),
	array(
		'Name' => 'Cybertooth',
		'Desc' => 'Another copy of my software, who actually volunteered ' . 'to help take traffic off my site instead of me finding ' . 'them with Google.',
		'URL' => 'http://cybertooth64.com/uploader/'
	),
	array(
		'Name' => 'gtoal.com',
		'Desc' => 'An earlier version of my uploader.  If you have ' . 'problems uploading a .jar that you think should ' . 'work, make sure that you have the .jad handy and ' . 'try this uploader.',
		'URL' => 'http://www.gtoal.com/pcs/'
	),
	array(
		'Name' => 'Hwyman.com',
		'Desc' => 'Maybe this one will work for you?',
		'URL' => 'http://upload.hwyman.com/',
	),
	array(
		'Name' => 'Knuckledragger.net',
		'Desc' => 'Another older copy of my uploader.  Seems like this ' . 'free stuff is quite popular.',
		'URL' => 'http://www.knuckledragger.net/sprintpcsuploads.htm'
	),
	array(
		'Name' => 'LiquidFish',
		'Desc' => 'Modified copy of a very early version of my uploader.',
		'URL' => 'http://www.liquidfish.net/mobile/'
	),
	array(
		'Name' => 'Lumine.net',
		'Desc' => 'My uploader on another site.  I\'m glad that people ' . 'like it so much.',
		'URL' => 'http://lumine.net/pcs/'
	),
	array(
		'Name' => 'Lunarnexus',
		'Desc' => 'Another mirror of my uploader.  Plain looking but ' . 'that just means it loads faster.',
		'URL' => 'http://www.lunarnexus.com/uploader/'
	),
	array(
		'Name' => 'MobileReelz',
		'Desc' => 'Nice ringtone uploader.  Upload your MP3 file, chop ' . 'it down to a ringer, then send it to your phone.',
		'URL' => 'http://mobilereelz.com/'
	),
	array(
		'Name' => 'Nexzign',
		'Desc' => 'One more copy of the uploader.',
		'URL' => 'http://nexzign.com/uploader/'
	),
	array(
		'Name' => 'PCS.Cruz-Network.net',
		'Desc' => 'Same uploader as here, but looks better.',
		'URL' => 'http://pcs.cruz-network.net/'
	),
	array(
		'Name' => 'PCSpix',
		'Desc' => 'Lets you upload files to your phone after ' . 'registering.  Not sure what uploader software they use.',
		'URL' => 'http://pcspix.com/index.html'
	),
	array(
		'Name' => 'Pix2Fone',
		'Desc' => 'Alternate site that will let you send images to your ' . 'phone.',
		'URL' => 'http://www.pix2fone.com/'
	),
	array(
		'Name' => 'ThePhoneMall.net',
		'Desc' => 'My uploader that has been spruced up quite a bit.',
		'URL' => 'http://upload.thephonemall.net/'
	),
	array(
		'Name' => 'RingRingFree',
		'Desc' => 'Another place that hosts the uploader I wrote.',
		'URL' => 'http://www.ringringfree.com/uploader/'
	),
	array(
		'Name' => 'SigStop',
		'Desc' => 'Another copy of the uploader.',
		'URL' => 'http://www.sigstop.com/sprint/'
	),
	array(
		'Name' => 'SprintUsers.com',
		'Desc' => 'Their own software that will send files to your ' . 'phone.  They stole large portions of my FAQ and ' . 'regurgitated it in their own FAQ.  Thanks for the ' . 'lack of credit.',
		'URL' => 'http://www.sprintusers.com/focus/'
	),
	array(
		'Name' => 'Stellernet.com',
		'Desc' => 'Recently set up and would like users to visit his site.',
		'URL' => 'http://www.phoneuploader.stellernet.com/'
	),
	array(
		'Name' => 'T1mmy.net',
		'Desc' => 'An independantly written piece of software that does ' . 'a very good job of sending files.',
		'URL' => 'http://www.t1mmy.net/visionTool.html'
	),
	array(
		'Name' => 'Total Uploader',
		'Desc' => 'This file sender appears to use its own code to send ' . 'images, PRC files, zip files, Java midlets, and plain text ' . 'messages to phones.',
		'URL' => 'http://ra.pcslab.com/upload/help.html'
	),
	array(
		'Name' => 'Veracity',
		'Desc' => 'Another copy of my uploader.',
		'URL' => 'http://shady.d2g.com/uploader/'
	),
	array(
		'Name' => 'Vorpal Cloud',
		'Desc' => 'Same uploader as me, but themed to go with their site.',
		'URL' => 'http://www.vorpalcloud.org/tools/pcsuploader/'
	),
	array(
		'Name' => 'WM5',
		'Desc' => 'My uploader, circa 2007',
		'URL' => 'http://www.wm5.mobi/'
	),
);
MakeLinkList($Links);
Section('Informational Sites and Online Converters', 'info');
$Links = array(
	array(
		'Name' => 'Atlanta Journal-Constitution :: Geekboy',
		'Desc' => 'A write-up on how to create and send ringers to ' . 'your phone.',
		'URL' => 'http://www.ajc.com/blogs/content/shared-blogs/ajc/' . 'geek/entries/2006/03/16/my_ringaling.html'
	),
	array(
		'Name' => 'CMX FAQ',
		'Desc' => 'Some information about the CMX format.',
		'URL' => 'http://www.cdmatech.com/solutions/pdf/cmx_faq.pdf'
	),
	array(
		'Name' => 'Dreampages',
		'Desc' => 'A site that lists many other Sprint-related sites.',
		'URL' => 'http://www.dreampages.com/dir/Content/'
	),
	array(
		'Name' => 'How to make PMD files from animated GIFs',
		'Desc' => 'A step-by-step  document with lots of nice ' . 'pictures.',
		'URL' => 'http://www.3guppies.com/ringtones/module/Forum/action/FlatTopic/fid/12/tid/141'
	),
	array(
		'Name' => 'Online Image Converter',
		'Desc' => 'Change your bmp, png, gif, or jpeg images into another ' . 'type.',
		'URL' => 'http://www.thedreaming.com/Code/PHP/OIC/'
	),
	array(
		'Name' => 'Samsung A660 Information',
		'Desc' => 'How to get files on your phone, games that work, ' . 'setting it up as a modem for your computer, and ' . 'lots of other information.',
		'URL' => 'http://members.lycos.co.uk/jab5915/samsung.html'
	),
	array(
		'Name' => 'Screen Sizes',
		'Desc' => 'A list of screen sizes so you can resize images ' . 'to fit your phone before you upload them.',
		'URL' => 'http://forum.sprintusers.com/showthread.php?s=&threadid=37433'
	),
	array(
		'Name' => 'SprintUsers',
		'Desc' => 'This is their section for Sprint Vision PCS users.  ' . 'It contains links to many other worthwhile sites.',
		'URL' => 'http://www.sprintusers.com/links/links-visioncontent.php'
	),
	array(
		'Name' => 'WAP Universal Resource File',
		'Desc' => 'Look up phone information based on model, make, ' . 'or user agent string.',
		'URL' => 'http://www.thewirelessfaq.com/all.asp'
	),
);
MakeLinkList($Links);
Section('Uploading and Related Software', 'software');
$Links = array(
	array(
		'Name' => 'BlurredVision',
		'Desc' => 'PHP toolkit to upload files to your PCS phone.  Still ' . 'in early development stages.',
		'URL' => 'http://sourceforge.net/projects/blurredvision'
	),
	array(
		'Name' => 'messaging.inc',
		'Desc' => 'PHP function to send a SMS via Sprint\'s web site.  ' . 'It works better than using email to send messages.',
		'URL' => 'messaging.inc'
	),
	array(
		'Name' => 'MiniSendNote',
		'Desc' => 'Tiny program to send messages from a Sprint phone ' . 'without forcing you to use their annoying WAP system.',
		'URL' => 'http://www.apgap.com/minisendnote.php'
	),
	array(
		'Name' => 'My Uploader',
		'Desc' => 'The code that runs this site.  Not to be humble, but ' . 'it has all of the awesome features I can think of.  ' . 'Automatic image resizing, phone detection, and ' . 'tons more.  Oh, it\'s freeware (open source).  Yeah, ' . 'I know, that wasn\'t humble at all.',
		'URL' => 'downloads.php'
	),
	array(
		'Name' => 'PCS Vision Uploader',
		'Desc' => 'Appears to be effectively the same thing as what I ' . 'wrote, but developed independently.',
		'URL' => 'http://osx.freshmeat.net/projects/pcsvisionuploader/'
	),
	array(
		'Name' => 'Text Messenger',
		'Desc' => 'Palm OS program to send a Sprint user a message.',
		'URL' => 'http://i500.nopdesign.com/apps.esiml'
	),
);
MakeLinkList($Links);
StandardFooter();
