<?php

include '../../functions.inc';
StandardHeader(array(
		'title' => 'Java Puzzle Applet',
		'header' => 'Java Puzzle Applet - Usage',
		'topic' => 'puzzle'
	));

?>

<P>First off, make sure you have <A HREF="media/puzzle_full.zip">puzzle_full.zip</A>
downloaded. Now, to include the applet in your web page, you need to include
some special tags. A lot of them are optional, and a lot are difficult for 
me to explain, but are really simple once understood.</P>

<PRE>&lt;applet code="puzzle.class" width=___ height=___&gt;
  &lt;param name=num value=___&gt;
  &lt;param name=numx value=___&gt;
  &lt;param name=numy value=___&gt;
  &lt;param name=src value="___"&gt;
  &lt;param name=soundsrc value="___"&gt;
  &lt;param name=type value=___&gt;
  &lt;param name=url value="___"&gt;
  &lt;param name=prefixurl value="___"&gt;
  &lt;param name=postfixurl value="___"&gt;
  &lt;param name=xstyle value="___"&gt;
  &lt;param name=bar value="___"&gt;
  &lt;param name=resize value="__"&gt;
  &lt;param name=website value="__"&gt;
  Sorry, your browser doesn't support Java, or has disabled it.
&lt;/applet&gt;
</PRE><HR>

<DL> 
<DT><B>code</B></DT> 
   <DD>This is the relative URL where the <TT>puzzle.class</TT> file is
      placed.</DD> 
   <DD>* The file <TT>puzzle.class</TT> must not be renamed. It's a weird
      Java thing.</DD> 
<DT><B>num</B>, <B>numx</B>, <B>numy</B></DT> 
   <DD>These refer to the number of pieces in the puzzle. <B>num</B> is the
      total number of pieces, <B>numx</B> is the amount across (horizontally),
      <B>numy</B> is the amount up and down (vertically).</DD> 
   <DD>* Only two of these can specified. I'd suggest <B>numx</B> and
      <B>numy</B></DD> 
   <DD>* If all three are specified, and <B>numx</B> times <B>numy</B>
      doesn't equal <B>num</B>, an error will be generated and the puzzle won't
      work.</DD> 
   <DD>* If two are specified, and <B>num</B> is one of them, and if
      <B>num</B> isn't evenly divisible by <B>numx</B> or <B>numy</B> (whichever one
      was specified), an error will be generate and the puzzle won't work.</DD> 
<DT><B>width</B>, <B>height</B></DT> 
   <DD>The width and height of the applet, respectively.</DD> 
   <DD>* It is recommended, for less image distortion, to multiply the
      image's width and height by some number to make the applet's width and
      height.</DD> 
   <DD>* If you have the bar on the applet (enabled by default), add 20 to
      the height to avoid distortion of the image.</DD> 
<DT><B>src</B></DT> 
   <DD>Relative URL of the image to load. This must be on the same site as
      the <TT>puzzle.class</TT> file. It's a weird Java thing.</DD> 
<DT><B>soundsrc</B></DT> 
   <DD>Relative URL of a sound file (in <TT>.au</TT> format) to play when
      the puzzle has been completed. If not specified, no sound will be played. Must
      be on the same site as <TT>puzzle.class</TT>.</DD> 
<DT><B>type</B></DT> 
   <DD>Type of puzzle. If not specified, it defaults to 0.</DD> 
   <DD><I>0</I> = Swap type.</DD> 
   <DD><I>1</I> = Slide type, with the 'empty' square starting in a random
      position</DD> 
   <DD><I>2</I> = Slide type, with the 'empty' square in the lower
      right-hand corner.</DD> 
<DT><B>url</B>, <B>prefixurl</B>, <B>postfixurl</B></DT> 
   <DD>Relative URL of the web page to display when the puzzle has been
      completed. Convenient if you want to allow the user to be able to download the
      whole picture or if you want to do something special with the number of moves
      it took.</DD> 
   <DD>If <B>url</B> is specified, the page will be shown (and some extra
      information will be appended to the URL). If not, no page will be shown.</DD> 
   <DD>The URL that is generated looks like this:
      <B>url</B>?<B>prefixurl</B>MOVES<B>postfixurl</B>. You can safely omit
      <B>prefixurl</B> and <B>postfixurl</B> if you so desire. MOVES will be replaced
      with an integer, being the number of moves it took to solve the puzzle.</DD> 
   <DD>For simple entry to a CGI script, an example would have <B>url</B>
      set to "my_results.cgi", <B>prefixurl</B> set to "moves=", and
      <B>postfixurl</B> left unset. If I solved the puzzle in 12 moves, the resulting
      URL generated would be "my_results.cgi?moves=12"</DD> 
   <DD>The sample CGI script in <A HREF="media/puzzle_full.zip">puzzle_full.zip</A>
      should give a bit more detail.  Also, there's scripts in there that
      will deter cheating, or at least make it a bit more difficult to do.</DD> 
<DT><B>xstyle</B></DT> 
   <DD>When someone presses the Reveal button, this will determine how the
      incorrect pieces get marked. If not specified, the default is 0.</DD> 
   <DD><I>0</I> = Thin blue lines making an X over the incorrect pieces</DD>
   <DD><I>1</I> = Big, bold, red X over the incorrect pieces</DD> 
<DT><B>bar</B></DT> 
   <DD>This tells the applet where to draw select portions of the bar. By
      default, it is set to 1357. If you set it to 0, you will not have a bar
      displayed on top of the puzzle. Whether or not you have this bar affects the
      <B>height</B> setting.</DD> 
   <DD>The first number is the position of the "Moves" field, then comes the
      number correct, the Reveal button and lastly the Mix button. Each field uses
      the following numbers for placement. They can easily overlap or cover each
      other, so be careful when deciding where things go.</DD> 
   <DD><I>0</I> = Not displayed</DD> 
   <DD><I>1</I> = Left aligned</DD> 
   <DD><I>2</I> = Centered 1/4 from left side</DD> 
   <DD><I>3</I> = Centered 1/3 from left side</DD> 
   <DD><I>4</I> = Centered in middle</DD> 
   <DD><I>5</I> = Centered 1/3 from right side</DD> 
   <DD><I>6</I> = Centered 1/4 from right side</DD> 
   <DD><I>7</I> = Right aligned</DD> 
<DT><B>resize</B></DT> 
   <DD>If the image specified doesn't fit into the applet's displayable area
      (the <B>width</B> and <B>height</B> - the size of the status bar [if any]),
      then the image is resized to fit. This will mess up the proportions of the
      image, so make sure that you specify the <B>width</B> and <B>height</B> of the
      applet properly! If not specified, this defaults to 0.</DD> 
   <DD>Since resizing is based on the implementation of Java (I have no
      control over it), and all I get are these silly names for how resizing is done,
      that's all I can provide to you. If you use this option, test out the different
      resize methods until you find one that you like.</DD> 
   <DD><I>0</I> = Do not resize (whew!).</DD> 
   <DD><I>1</I> = Use the 'default' resize method.</DD> 
   <DD><I>2</I> = Use the 'fast' resize method.</DD> 
   <DD><I>3</I> = Use the 'smooth' resize method.</DD> 
   <DD><I>4</I> = Use the 'area averaging' resize method.</DD>
<DT><B>website</B></DT>
   <DD>Due to the number of messages I have received over the years
      pertaining to a messed up puzzle installation on a web site, I have realized
      that adding a contact at the web site to my puzzle display would be a good
      idea. If you set this, the entire value will be displayed on the puzzle screen
      while it is loading and if there is an error.</DD>
   <DD>Since this message comes after a line saying "Direct comments about
      this website to:", I would suggest you put "Your Name &lt;your email
      address&gt;" as the value of this applet parameter.</DD> 
</DL>

<P>If you mess up, or if there is some sort of problem, the applet will
generate an <A HREF="errors.php">error code</A>. <B><U>All error codes are
shown on the Java Console</U></B>, along with some debugging information. The
Java Console can be viewed in Netscape by looking under the "<U>O</U>ptions"
menu. Mozilla can do that too.  Internet Explorer, at the time of this
writing, can not do that.</p>

<?php

StandardFooter();
