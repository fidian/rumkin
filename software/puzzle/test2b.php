<?PHP

include '../../functions.inc';

StandardHeader(array('title' => 'Java Puzzle Applet',
		     'header' => 'Java Puzzle Applet - Swap (Sarah)',
		     'topic' => 'puzzle'));

?>
<P>You solved it in <?= $moves ?> moves!</P> 
<P><A HREF="index.php">Back to the main puzzle page</A>.</P>
<P ALIGN="CENTER"><IMG SRC="Sarah.jpg" WIDTH="208" HEIGHT="333"></P>
<?PHP

StandardFooter();
