<?PHP

include '../../functions.inc';

StandardHeader(array('title' => 'Java Puzzle Applet',
		     'header' => 'Java Puzzle Applet - Errors',
		     'topic' => 'puzzle'));

?>

<p>Make sure you are at the Java Console in order to view these messages.
If you aren't there, you can't debug why the software is messing up.</p>

<UL> 
<LI><B>Number of pieces not correctly specified</B> - You didn't specify
   only two of the three values needed for number of pieces (<I>num</I>,
   <I>numx</I>, <I>numy</I>).</LI> 
<LI><B>Total pieces != pieces across * pieces down</B> - You must follow
   the format <I>num</I> = <I>numx</I> * <I>numy</I>. All must be integers (whole
   numbers) and <I>num</I> either must not be specified, or must be divisible
   evenly by the <I>numx</I> or the <I>numy</I> that you specified.</LI> 
<LI><B>Image filename not defined</B> - You didn't specify the parameter
   <I>src</I>.</LI> 
<LI><B>Interrupted</B> - Something interrupted the applet. I don't know
   what it could be, otherwise I would have used a better error message.</LI> 
</UL>

<?PHP Section('Known Bugs'); ?>

<P>I hate to say this, but there are known bugs. However, I can't do
anything more about them, so I consider them resolved.</P>

<UL> 
<LI>It trims off at most (total pieces across - 1) pixels from the right
   side and (total pieces down - 1) pixels from the bottom so the picture will
   work well for chopping into little pieces. Hope you don't mind. The only way to
   fix this is to scale the image, so that when it cuts the pieces into equal
   widths, there are no extra pixels laying around. Fortunately, you can scale
   either before you use it in the applet, or have the applet scale for you.</LI> 
<LI>The puzzle may sometimes display blank pieces where there should be
   puzzle pieces. This is a really strange error, and I don't think it is my
   fault. Now, the mix button clears the screen before mixing the pieces, to
   hopefully get the pieces to show. This may be caused by a low memory problem...
   Not sure.</LI> 
<LI>If you choose to resize the image in the applet, the applet will
   think that the image is all done being resized and try to draw the pieces on
   the screen. This looks quite weird until the image is done being drawn. There's
   really nothing I can do. I suggest using the fast scaling method or only
   sending the applet to people with really fast computers.</LI> 
</UL>

<?PHP

StandardFooter();
