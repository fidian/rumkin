<?php

include '../../functions.inc';
StandardHeader(array(
		'title' => 'Floater',
		'topic' => 'floater'
	));

?>

<p>If you use your flash drive a lot, like I do, you will want to have a
menu so that you can run programs easier.  I searched for one that was free
and freely distributable.  One that was small, quick, and simple.  I found
"Floater 1.0" by Daniel Werner.  To operate it, you just make a directory
called "Items" in the same directory as Floater.exe and fill it up with
shortcuts to the programs you want in the menu.  When you run Floater, it
will create a bar in the lower left corner, above the Start button, and it
will have icons in it, one for each program you put in the Items folder.</p>

<p>This works wonderfully on a hard drive, or when you know the full path of
the programs, but a flash drive won't always be the same drive name on each
computer you plug it into.  On one it is I:, on another it is E:.  Because
you can not make a shortcut to a program without specifying the drive
letter, I decided to alter Floater to read paths from a text file.</p>

<p>Floater-txt is based on the original Floater, but I fixed a couple
cosmetic errors, made the menu shrink when you run a program, and made it
read from Floater.txt instead of using an Items directory.  You specify
one menu item per line.  There are two different ways to specify a 
program.  The first has a description, a pipe symbol (the | character), 
and then the filename.  The second uses just the filename.</p>

<?php MakeBoxTop('center'); ?>
<tt>Notepad|c:\windows\notepad.exe<br>
c:\windows\calc.exe</tt>
<?php MakeBoxBottom(); ?>

<p>The advantage here is that you can use relative paths.
"..\Directory\Path.exe" will work now, so you can use Floater as the menu
system for your flash drive.</p>

<?php Section('Downloads') ?>

<p><b><a href="media/floater1.0.zip">Floater 1.0</a></b> 
(<?php echo FidianFileSize(getenv('MEDIABASE') . 'software/floater/floater1.0.zip') ?>) - The original, complete 
with source code for Visual C 6.0</p>

<p><b><a href="media/floater-txt1.0.zip">Floater-txt 1.0</a></b> 
(<?php echo FidianFileSize(getenv('MEDIABASE') . 'software/floater/floater-txt1.0.zip') ?>) - My version that
reads its information from a text file, also complete with Visual C 6.0
source.</p>

<?php

StandardFooter();
