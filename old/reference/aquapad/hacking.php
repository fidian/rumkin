<?php

include './functions.inc';
AquaStart('Hacking');

?>

<p>This page is merely a collection of quick notes and little ideas while I
am working on the AquaPad and warping its will to do my bidding.</p>

<ul>
<li><a href="#shell">Obtaining a Shell</a></li>
<li><a href="#cf">CompactFlash Information</a></li>
<li><a href="#filesys">Filesystems</a></li>
<li><a href="#booting">Booting</a></li>
<li><a href="#software">Software</a></li>
<li><a href="#windows">Windows-Related</a></li>
<li><a href="#todo">Things I Still Want to Do</a></li>
</ul>

<?php Section('Obtaining a Shell', 'shell'); ?>

<p>When IceWM is fully loaded, you merely tap the right Control + right Alt
twice (press them simultaneously) and you'll be thrown into the 4th virtual
term.  Use left Alt + Fx, where x is 1 through 5, to switch terminals.  1 is
a shell, 2 is X, 3 is ... nothing, 4 is a log, 5 is another shell.</p>

<p>While X is loading and before IceWM gets started, you can press
Control-Alt-Backspace to kill X and go back to a shell.  Ok, it isn't all
that useful, but it is faster than the other method.</p>

<?php Section('CompactFlash Information', 'cf'); ?>

<p>The documentation puts limits on the CompactFlash that you can use, but
this is wrong.  You can use any size of CompactFlash or MicroDrive that you
want as long as the BIOS supports it.  I have inserted a 1Gb CF card and an
8Gb MicroDrive, and the BIOS should support far beyond that.  The reason it
works is because the CompactFlash specification says that the card itself
needs to support the size of the storage.  This is unlike other media types,
such as SmartMedia, where the controller is built into the reader, and thus
limited to a specific size.</p>

<?php Section('Filesystems', 'filesys'); ?>

<p>The first and second partitions contain the root filesystem (/bin, /sbin,
/etc, /dev, /lib, /var.  The third partition is configuration data.  The
fourth partition contains multiple cramfs partitions that populate /usr,
/usrX11R6, and /usr/X11R6/lib/fonts.</p>

<?php Section('Booting', 'booting'); ?>

<p>If you connect a USB keyboard before turning it on, you can press Page Up 
while booting to get you into the BIOS.  Just ignore
the message that says for you to press DEL to get into the BIOS.
<i>&lt;grin&gt;</i></p>

<p>When you are in the BIOS, you can change the boot device.  This makes it
much easier to test new flash images before installing them on the internal
Compact Flash card.  However, it appears that Midori stores its
configuration data on /dev/hda unless you do some patching or if you
compile Midori to use /dev/hdc instead.  Perhaps more on this later.</p>

<p>One of the more annoying things about this BIOS is that it doesn't
auto-detect CF cards that you want to boot to.  So, if you want to boot from
the external CF slot (IDE-2 in the BIOS), you also need to run the
auto-detection so that you can boot from that device.  It needs to know the
heads/cylinders/etc. of the CF in order to even attempt booting to it.</p>

<?php Section('Software', 'software'); ?>

<p>The remote software update program does not work, but it isn't the
software's fault.  There is no update server at the stock IP address.  FIC
doesn't appear to be making new versions of Midori, to keep up with the
development that is going on, so it looks like we have to do it ourselves.
The remote software update does work if you get Midori compiled and do the
upgrade through it.  See the Links section for a page about patching the
AquaPad if you want more information.  I do plan on putting more information
in the Upgrades section, but that may have to wait a bit.</p>

<p>Want to run an xterm?  I haven't been able to do this, but you should
just get to a shell and type "/usr/X11R6/bin/xterm --display :0".  Another
person said to use "export DISPLAY=localhost:0.0; xterm".  I get errors
about a missing library file when it is <b>right there</b>.  Somewhat
frustrating.</p>

<?php Section('Windows-Related', 'windows'); ?>

<p>Several people want to stick Windows onto this tablet.  That's fine with
me &ndash; even though I prefer Linux, I'm not about to say that Linux is
better for <i>you</i>.  In an effort to broaden my site just a little bit,
here are some things for you Windows people.</p>

<p><a href="http://www.nliteos.com">nLite</a> - Windows Installation
Customizer.  With this tool, you can create your own Windows installation
without Outlook, Internet Explorer, MSN, Messenger, etc.  You remaster a CD
to install a version of Windows that you want.</p>

<p><a
href="http://www.windowsdevcenter.com/pub/a/windows/excerpt/CarPCHacks_Chap1/">Installing
Windows on a CompactFlash Card</a> - Describes how Microsoft's XP <a
href="http://windowsembeddedkit.com">Embedded OS</a> will help you out 
and run well off a CompactFlash card.</p>

<?php Section('Things I Still Want to Do', 'todo'); ?>

<ul>
<li>Distribute a new Linux image that contains only open-source software which 
works well.</li>
<li>Get better handwriting recognition.  Probably a lot more like Palm's
software.  <a href="http://www.xstroke.org/">xstroke</a> comes to mind.</li>
<li>That keyboard either has to go or needs to be moveable and more
configurable.  Maybe try out <a
href="http://www.gnu.org/software/gtkeyboard/gtkeyboard.html">GTKeyboard</a>?</li>
<li>IR Remote control.  That would rock.</li>
<li>Opera or Phoenix instead of Mozilla.  Hopefully something that starts
faster.</li>
<li>SSH</li>
<li>Make XTerm more accessable.  (I've not been able to get it to work from the
above commands yet.)</li>
<li>Add a Java plugin to the browser?  Awful big.</li>
<li>IceWM upgraded, Linux's kernel upgraded, etc.</li>
<li>Kill that little mail icon on the tray and reorganize the menus a
LOT.  Move a lot of the buttons into the menu to free up taskbar space and
to make it seem less cluttered.</li>
<li>Change the image that is displayed while booting.  Change the background
image.</li>
<li>Voice recognition?  That could potentially save lots of typing.
<a href="http://cmusphinx.sourceforge.net/">Sphinx</a></li>
<li>Speech synthesis?  That could make the Aquapad read books to you from
Project Gutenberg!
<a href="http://epos.ure.cas.cz/">Epos</a>
<a href="http://www.cstr.ed.ac.uk/projects/festival/">Festival</a>
<a href="http://www.speech.cs.cmu.edu/flite/index.html">Flite</a></li>
</ul>

<?php

AquaStop();
