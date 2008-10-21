<?PHP

include '../../functions.inc';

StandardHeader(array('title' => 'GPX Tools for Geocaching',
		     'topic' => 'gpx_tools'));

?>

<p>You're going to download the tools?  Awesome!  Let me know what you like
and what you do not like.</p>

<dl>

<?PHP

$versions = array(
   '1.0' => array('notes' => 'August 2008.'),
   '0.2' => array('notes' => 'Bugfix release.'),
   '0.1' => array('notes' => 'Initial version.'),
);
$formats = array(
   '' => array('name' => 'Source'),
   'linux-static' => array('name' => 'Linux (Statically Compiled)'),
   'win32' => array('name' => 'Windows Executables'),
);

$media_dir = getenv('MEDIABASE') . 'software/gpx_tools/';
foreach ($versions as $v => $a)
{

?>
<dt><b><a href="media/gpx_tools-<?= $v ?>.tar.gz">gpx_tools-<?= $v ?>.tar.gz</a></b>
(<?= FidianFileSize($media_dir . 'gpx_tools-' . $v . '.tar.gz'); ?>)</dt>
<dd><?PHP echo htmlspecialchars($a['notes']); ?></dd>
<dd><?PHP

   $numDisp = 0;
   foreach ($formats as $name => $data)
   {
      if ($name != '')
         $name .= '-';
      
      foreach (array('.tar.gz', '.zip') as $ext)
      {
         $fn = 'gpx_tools-' . $name . $v . $ext;
         if (file_exists($media_dir . $fn))
         {
            if ($numDisp)
	       echo ' - ';
	    
            echo '[<a href="media/' . $fn . '">';
            echo $data['name'];
            echo '</a> ' . FidianFileSize($media_dir . $fn);
            echo ']';
	    $numDisp ++;
	 }
      }
   }
   
?>
</dd>
<?PHP

}

?>

</dl>

<?PHP

StandardFooter();
