<?PHP

include '../../functions.inc';

StandardHeader(array('title' => 'Java Puzzle Applet',
		     'header' => 'Java Puzzle Applet - Slide (Sarah)',
		     'topic' => 'puzzle'));
?>

<P>And here is a scrambled picture of the Tyler's wife, Sarah. It is her
high school senior picture.  This puzzle has sound if you properly solve it,
and it uses the slide type of puzzle and a different status bar and the 
bold, red X's for the Reveal button.</P>

<P>Did you ever get those little puzzles with the numbers 1 through 15 on
it, and it looked like it had one tile missing? The objective then was to slide
the tiles around until the tiles were in numerical order. With this puzzle, it
is a bit different. All you have to do is unscramble the picture. To play, you
must move the black box with the red border around. It starts in the lower left
hand corner, and should end up there when the puzzle is done. You move tiles
around by clicking on one which is touching a side of the black box. Then the
tile will slide into the empty position and the empty position will be where
the tile once was. These instructions are a bit confusing, but if you start
playing you will get the hang of it soon enough.</P>

<P ALIGN="CENTER">
<APPLET CODE="puzzle.class" WIDTH="208" HEIGHT="353" CODEBASE="media/">
   <PARAM NAME="numx" VALUE="3">
   <PARAM NAME="numy" VALUE="4">
   <PARAM NAME="src" VALUE="media/Sarah.jpg">
   <PARAM NAME="soundsrc" VALUE="media/Puzzle.au">
   <PARAM NAME="type" VALUE="1">
   <PARAM NAME="prefixurl" VALUE="moves=">
   <PARAM NAME="bar" VALUE="0471">
   <PARAM NAME="xstyle" VALUE="1">
   <PARAM NAME="url" VALUE="test2b.php">
</APPLET>
</P>
<?PHP

StandardFooter();
