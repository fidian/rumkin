<?PHP

include '../../functions.inc';

StandardHeader(array('title' => 'Java Puzzle Applet',
                     'header' => 'Java Puzzle Applet - History',
		     'topic' => 'puzzle'));

?>

<P>Here is the place where you can find out what I recently did to the
applet to make it better. You can also download some of the previous versions
of the applet, just in case. I wouldn't suggest it. If you do decide to
download an old version, you will need to remove the version number at the end.
For applets prior to version 4.4, the name should be 'Puzzle.class'. For 4.4
and later, the name is 'puzzle.class'. Yes, the capitalization matters. 
Also, some features as defined on the <A HREF="usage.php">usage</A> 
page may not be implemented. You've been warned.</P>

<DL>
<DT>4.4 (current release)</DT>
   <DD>Finally released the source to the program.</DD>
   <DD>Added xstyle, bar, website, and resize parameters.</DD> 
   <DD>Even cleaned some code to try to make it more efficient.</DD> 
   <DD>Added about 4k to the size, unfortunately.</DD> 
   <DD>Updated web page and email addresses to my new home.</DD> 
   <DD>Changed name to 'puzzle.class' instead of 'Puzzle.class'</DD> 
<DT><A HREF="media/old/Puzzle.class.4.3">4.3</A></DT> 
   <DD>Fixed the email addresses.</DD> 
   <DD>Fixed web page URL.</DD> 
<DT><A HREF="media/old/Puzzle.class.4.2">4.2</A></DT> 
   <DD>Took the feature added in version 4.1 and made a separate button for
      it.</DD> 
<DT><A HREF="media/old/Puzzle.class.4.1">4.1</A></DT> 
   <DD>When you click on "Correct", you toggle the ShowX mode on and off for
      helping you to determine which pieces are out of place.</DD> 
<DT><A HREF="media/old/Puzzle.class.4.0">4.0</A></DT> 
   <DD>Uses "implements runnable".</DD> 
   <DD>Fixed annoying update bug finally!</DD> 
   <DD>Attempts to resize applet to size of picture</DD> 
<DT>3.8</DT> 
   <DD>Netscape doesn't work with this.</DD> 
   <DD>My applet tester from Sun does work.</DD> 
<DT>3.7</DT> 
   <DD>Redownloads image if it is messed up.</DD> 
   <DD>Better memory management.</DD> 
   <DD>Mixing routine speeded up a little.</DD> 
<DT>3.6</DT> 
   <DD>The "Mix" button now paints the applet black before drawing the
      pieces on the screen.</DD> 
<DT>3.5</DT> 
   <DD>Rewrote the mixing routine for sliding type puzzles so that they are
      always solveable.</DD> 
   <DD>Fixed a bug with "null" showing up in the url for the second
      page.</DD> 
<DT>3.4</DT> 
   <DD>Added the <I>prefixurl</I> and <I>postfixurl</I> parameters.</DD> 
   <DD>Correctly made <I>url</I> be a relative URL, which means that you can
      not put "http://server.name.com/path" in <I>url</I>, but you can still put in
      "/path/to/page.html".</DD> 
<DT>3.3</DT> 
   <DD>There was a problem with the sound file downloading and playing when
      there was no sound file specified.</DD> 
<DT>3.2</DT> 
   <DD>Optimized one routine</DD> 
   <DD>Hopefully eliminated a delay bug when the puzzle was finished.</DD> 
<DT>3.1</DT> 
   <DD>Made the Mix button green with blue background</DD> 
   <DD>Now, when you have lots of pieces and you swap two pieces (or slide
      one), only the two pieces which changed are updated instead of the entire
      puzzle.</DD> 
   <DD>Added warning if the image is too big for the applet.</DD> 
<DT>3.0</DT> 
   <DD>I finally killed a pesky bug where the image cropping was hanging the
      system.</DD> 
   <DD>Made the Mix button blue.</DD> 
   <DD>I think I solved a problem with the URL loading incorrectly.</DD> 
   <DD>Did a lot of small internal changes.</DD> 
   <DD>Added a second swap puzzle type.</DD> 
   <DD>Display a lot more information to the status bar (the thingie at the
      bottom of the screen) and to the Java Console.</DD> 
<DT>2.4</DT> 
   <DD>Restructured some code to get rid of a problem (hopefully) [I
      failed]</DD> 
   <DD>Squished another minor bug.</DD> 
   <DD>Now, if you go "back" after the puzzle moved you to a new URL, the
      puzzle won't move you again.</DD> 
<DT>2.3</DT> 
   <DD>Fixed a bug where you click before it is loaded and it crashes.</DD> 
   <DD>Speeded up graphic displays a little.</DD> 
   <DD>Speeded up cropping a little.</DD> 
   <DD>Uses less memory.</DD> 
   <DD>Faster routines.</DD> 
   <DD>Added a status display to the status bar (the bottom thing)</DD> 
   <DD>Now counts the columns it has to count instead of each individual
      picture.</DD> 
<DT>2.2</DT> 
   <DD>Speeded up cropping of images.</DD> 
   <DD>Now uses much less memory when chopping pieces.</DD> 
   <DD>Taken out a couple of minor bugs.</DD> 
<DT>2.1</DT> 
   <DD>Allow usage of another type of puzzle -- the slide puzzle!</DD> 
<DT>2.0</DT> 
   <DD>Only uses one image file.</DD> 
   <DD>Specify where image is.</DD> 
   <DD>Specify where sound is.</DD> 
   <DD>Display is much faster (no flickering anymore).</DD> 
<DT>1.0</DT> 
   <DD>Doesn't display images until all pieces are loaded.</DD> 
   <DD>Display is faster.</DD> 
   <DD>Does not load sound until images have been loaded.</DD> 
</DL>
<?PHP

StandardFooter();
