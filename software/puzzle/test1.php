<?PHP

include '../../functions.inc';

StandardHeader(array('title' => 'Java Puzzle Applet',
		     'header' => 'Java Puzzle Appler - Swap (Mickey)',
		     'topic' => 'puzzle'));

?>

<P>Just for your amusement, you can test out the applet here. This is proof
that Mickey frightens young children! Keep him away, that mean, evil villian!
This example has no sound, and uses the swap style of puzzle. The
<I>website</I> parameter is also set on this example to "Rumkin Puzzle
&lt;email@address&gt;" in order to demonstrate how that will appear.</P>

<P>To play, just find two squares you want to swap. Click on one. It will
receive a red highlight. Click on the other and the two pieces shall be
swapped. Continue to swap until you solve the puzzle.</P>

<P ALIGN="CENTER">
<APPLET CODE="puzzle.class" WIDTH="512" HEIGHT="405" CODEBASE="media/">
  <PARAM NAME="numx" VALUE="6">
  <PARAM NAME="website" VALUE="Rumkin Puzzle <email@address>">
  <PARAM NAME="numy" VALUE="4">
  <PARAM NAME="src" VALUE="media/Mickey.jpg">
  <PARAM NAME="prefixurl" VALUE="moves=">
  <PARAM NAME="url" VALUE="test1b.php">
</APPLET>
</P>

<?PHP

StandardFooter();
