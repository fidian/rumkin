<?php

include '../../functions.inc';
StandardHeader(array(
		'title' => 'USBStart',
		'topic' => 'flash'
	));

?>

<p>USBStart is designed to run with Windows XP SP2's autorun.  It also works
well with <a href="http://www.archidune.com/apo/">APO USB Autorun</a>, which
is a free program that will add the autorun functionality to any earlier
version of Windows that supports flash drives (Windows 98 and up).</p>

<?php Section('Description') ?>

<p>USBStart will run a program when it starts, then unmount the flash drive
when that program finishes.  I use it to run <a
href="/software/floater/">Floater</a>, which is a menu for the programs I
keep on my flash drive.  When I close Floater, USBStart will copy an
unmounting program and a little copy of itself to a temp directory on the
host computer.  USBStart will close and the little copy will run, which will
attempt to dismount the drive and then all temporary files are deleted.</p>

<p>Basically, once you have autorun enabled (or APO USB Autorun) and your
flash drive set up properly, you need to just stick in your jump drive and
the menu will start.  Run programs and do your thing, and finally close the
menu to dismount the flash drive.  It couldn't be much simpler.</p>

<?php Section('Setup') ?>

<p>Here are the suggested steps to get your flash drive working like mine.</p>

<ol>
<li>Download and extract <a href="media/usbstart.zip">usbstart.zip</a>.
<li>Create a directory on your flash drive called <tt>Utils</tt>.
<li>Copy deveject.exe (in the usbstart.zip file) to the <tt>Utils</tt>
directory.
<li>Copy USBStart.exe and USBStart.ini to your <tt>Utils</tt> directory.
<li>Copy <a href="/software/floater/">Floater</a> (just the .exe file)
to your <tt>Utils</tt> directory (use Floater-txt).
<li>Set up Floater.txt so that when you run Floater, it will show you an
acceptable menu.
<li>Set up an autorun.ini file in the root directory of your flash drive.
Instructions on this listed below, or you can use the APO Autorun Builder,
which comes as part of the <a href="http://www.archidune.com/apo/">APO 
Autorun Suite</a>.
</ol>

<p>At this point, you should be able to dismount the drive, then reinsert it
and have the autorun start up the floating menu.  When you close the menu,
the flash drive should be dismounted automatically and you can remove it
safely from the computer.</p>

<?php Section('autorun.inf') ?>

<p>Right-click and create a new text file.  Name it autorun.inf.  Make sure
that you have file extensions turned on; that way you won't accidentally
create an "autorun.inf.txt" file and wonder what is wrong for the longest
time.</p>

<p>In that file, add these lines:</p>

<?php MakeBoxTop('center') ?>
<pre>[autorun]
open=Utils\USBStart.exe
action=Open Floating Menu

shell\Floating Menu=Floating Menu
shell\Floating Menu\command=USBStart.exe
</pre>
<?php MakeBoxBottom() ?>

<p>There are other things you can add to this file, but the lines above will
be enough to get it to work.</p>

<?php Section('Download') ?>

<p><b><a href="media/usbstart.zip">usbstart.zip</a></b>
(<?php echo FidianFileSize(getenv('MEDIABASE') . 'software/usbstart/usbstart.zip') ?>) - The program, deveject (with .cpp
source), and <a href="http://nsis.sourceforge.net/">NSIS</a> source to
USBStart.</p>

<?php

StandardFooter();
