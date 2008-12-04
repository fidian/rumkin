<?php

include 'common.inc';
LoadHFiles();
MarcoHeader('Download');
$mediaDir = getenv('MEDIABASE') . 'software/marco/';

?>

<p>Below is the link to the unregistered version of Marco.  You'll have
seven full days to evaluate the software.  Once that time is up, all features
will be disabled until you register it.  To register it, you will need to
enter an "unlock code" and the Registration page will guide you through the 
steps to get your own unlock code.  Just click on Register in the menu to
the right.</p>

<p>Marco requires MathLib.  To find out more about MathLib and whether you 
need to install it, check out the <a
href="mathlib.php">MathLib</a> explanation page.  If you are
upgrading Marco, you don't need to reinstall MathLib.</p>

<dl>
<dt><b>Download Marco, version <?php echo $GLOBALS['APP_VERSION'] ?></b></dt>
<dd>as a <a href="media/prc/marco.zip">.zip file</a> with MathLib and documentation
  (<?php echo FidianFileSize($mediaDir . 'prc/marco.zip') ?> bytes)</dd>
<dd>as a <a href="media/prc/marco.prc">.prc file</a>
  (<?php echo FidianFileSize($mediaDir . 'prc/marco.prc') ?> bytes)</dd>
</dl>


<?php Section('Additional Files'); ?>

<dl>
<dt><b>Point Files</b> (If installed, they will overwrite your current point
file)</dt>
<dd>3588 Sample Points (<a href="media/prc/sample_points.pdb">.pdb file</a> --
<?php echo FidianFileSize($mediaDir . 'prc/sample_points.pdb') ?> bytes)</dd>
</dl>

<?php

MarcoFooter();
