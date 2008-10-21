<?PHP

include "common.inc";
include "../../admin/PalmOS/db.inc";

MarcoHeader();

LoadHFiles();

MakeBoxTop('center');

?>
<B>Current Version:</B> <?= $GLOBALS['APP_VERSION'] ?><br>
<B>Compile Date:</B><br>
<?= $GLOBALS['COMPILE_DATE'] ?>
<?PHP

MakeBoxBottom();

?>

<p>Marco is a collection of common surveyor calculations intended to assist
people in the field, where booting up a laptop to just figure out a couple
answers would take far too long.  It is designed to be a powerful calculator
that is easy to use, and to supplement your desktop computing environment.</p>

<p>Marco will run on any device that runs Palm OS, such as <a
href="http://palm.3com.com/">Palm Pilots</a>.  These little devices are
ideal platforms for use in the field.  They require absolutely no
boot time, are easily transportable, have a long battery life (especially
the black &amp; white ones), and are very reliable.  The processor is easily
able to handle accurate calculations, and the screen size means that the
program can prompt for information in a way that is useful to people that
are unfamiliar with the program.  Palm devices are also becoming quite
affordable and are being integrated with cell phones and watches.  With all
of these reasons, Palm OS devices are perfect for the job.</p>

<p>Take a look at the <a href="download.php">current version</a>
or peek at the <a href="manual.php">manual</a> for explanations of
how Marco works and what it looks like.  Test it out to see if you like it.  
If you intend on using it beyond the seven day trial period, you'll need to
<a href="register.php">register Marco</a> to continue using 
the software.  Don't worry - the code is generated on the registration page
now (no fee required), but I have also deemed this software to be "end
of life" so you won't be getting any support.</p>

<?PHP
	
MarcoFooter();
