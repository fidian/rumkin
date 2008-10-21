<?PHP

include '../../functions.inc';

StandardHeader(array('title' => 'Java Puzzle Applet',
		     'header' => 'Java Puzzle Applet - Slide (Mickey)',
		     'topic' => 'puzzle'));

?>
<P>You solved it in <?= $moves ?> moves!</P> 
<P><A HREF="index.php">Back to the main puzzle page</A>.</P>
<P ALIGN="CENTER"><IMG SRC="media/Mickey.jpg" WIDTH="512" HEIGHT="385"></P>
<?PHP

StandardFooter();
