<?php

include '../../functions.inc';
StandardHeader(array(
		'title' => 'Make a Whiteboard',
		'topic' => 'whiteboard',
		'sorttable' => 1
	));

?>

<p>Below is a list of different methods that I would recommend for creating
your own whiteboards.  With each, you have a list of advantages and
disadvantages.  The methods are broken down by use; you have different needs
if you want one large whiteboard instead of twenty small whiteboards.</p>
	
<p>This is not a list of all of the different whiteboard materials.  Most
commercially-available whiteboard <a href="surfaces.php">surfaces</a> that
come to the consumer as ready-to-use whiteboards are not listed.  Below are
only things that may need some sort of instructions in order to make a
whiteboard properly.</p>

<?php

MakeBoxTop('center');
$Names = array(
	'contact' => 'Contact Paper',
	'laminate' => 'Laminate',
	'mb4000w' => 'MB4000W',
	'plastic' => 'Plastic Sheets',
	'polycoat' => 'Polycoated Cardboard',
);
$Methods = array(
	array(
		'Walls',
		'mb4000w',
		'Keeps original wall color'
	),
	array(
		'Personal boards',
		'laminate',
		'Great for schools'
	),
	array(
		'Personal boards',
		'polycoat',
		''
	),
	array(
		'Personal boards',
		'contact',
		''
	),
	array(
		'Roll-up surface',
		'plastic',
		''
	),
	array(
		'Tables',
		'mb4000w',
		''
	),
	array(
		'Tables',
		'contact',
		'Only if the table is thin enough'
	),
	array(
		'Whiteboard resurfacing',
		'mb4000w',
		''
	),
);

?>

<table class="sortable" cellspacing=0 cellpadding=3 border=1>
<caption>Whiteboard Creation Methods for Different Applications</caption>
<thead>
<tr><th>Application</th><th>Method</th><th>Notes</th></th>
</thead>
<tbody>
<?php

foreach ($Methods as $method) {
	
	?>
<tr><td><?php echo htmlspecialchars($method[0]) ?></td><td><a href="#<?php echo $method[1] ?>"><?php echo htmlspecialchars($Names[$method[1]])
	
	?></a></td><td><?php echo htmlspecialchars($method[2]) ?></td></tr>
<?php
}

?>
</tbody>
</table>
<?php MakeBoxBottom(); ?>

<?php Section('Laminate', 'laminate'); ?>

<p>If you laminate tagboard, you can create fairly good dry erase boards
without spending loads of money.  This would work great for teachers who
want each student to have a whiteboard, or if you want a cheap whiteboard to
keep track of figures at your desk.  I have used them while playing D&amp;D
to keep track of turns and my hit points during battle.</P>

<p><b>Pro:</b> It is quick, easy, and cost-effective.<br>
<b>Con:</b> When marks linger for a while, they may stain the plastic.  It
is not as easy to wipe off as a real whiteboard.<br>
<a href="surfaces.php#laminate"><b>See my review</b></a></p>

<p>The method is simple:  Just find some tagboard and laminate it.  You may
need to find a local copy shop or a school to get it laminated with one of
those nice industrial-strength laminators.  I have heard of bad results if
you try to use some types of clear contact paper or a similar sticky plastic
as a laminate.  You want to find the type that is melded together by heat
under a roller as a press.</p>

<?php Section('MB4000W Whiteboard Coating', 'mb4000w'); ?>

<p>This is similar to a clear paint and is sold by <a
href="http://solutionsmb.com/">Solutions MB</a>.  It is quite durable and
easy to apply.  It almost is exactly the same as some high-quality boards,
and almost everything wipes right off.  It would be ideal for coating walls
of a room, resurfacing a whiteboard, coating your desk or table, and making
any sort of solid surface into a whiteboard.</p>

<p><b>Pro:</b> It can cover large areas and turn them into a
whiteboard surface.  Can keep the original surface's colors and
designs intact.<br>
<b>Con:</b> There is a little preparaion you need to do in order to have this
product stick properly, but the process isn't hard and is totally worth it.
Also, tiny lines and miniscule bubbles may form just because you are applying
it with a foam brush or roller.<br>
<a href="surfaces.php#mb4000w"><b>See my review</b></a></p>

<p>First, you must prepare the surface.  It is best to work with the surface
horizontally if possible.  They recommend you first coat your surface with
a matte or eggshell, latex-based paint base.  You do not need to use white.
I used a rose colored pink.  It's possible to get the paint base before they
add color to it so you can apply clear paint and preserve your original wall
colors and decorations.</p>

<p>Wait for the paint to cure, not merely dry.  This could take a week to
be safe.</p>

<p>Now you simply use a foam brush, roller, or other really smooth way to
apply the MB4000W coating.  It doesn't take much.  You can even go over it
again after an hour or two to generate a thicker coating.  Now you need to
wait at least three days for the layer to cure, but then you are able to
doodle on your wall, use whiteboard markers on the table, or be artistic
wherever you applied the coating.</p>

<?php Section('Plastic Sheets', 'plastic'); ?>

<p>Some plastic sheets work well as whiteboards.  To use them, you just need
to unroll them or put them on the table.  This may work well for covering a
desk or table, having a portable whiteboard, or if you want a small
whiteboard for your wall.</p>

<p><b>Pro:</b> Inexpensive and quick to set up.</br>
<b>Con:</b> Marks may stain plastic.  Sometimes stays rolled and is hard to
flatten.<br>
<a href="surfaces.php#plastic_sheet"><b>See my review</b></a></p>

<p>Well, the setup for this is easy.  You can cut the plastic sheet to fit
your surface, or mount it on the wall.  I used a clear sheet that looked
like a window shade and hit id underneath a drape/valance thing.</p>

<?php Section('Contact Paper', 'contact'); ?>

<p>Contact paper is readily available at most major stores.  It is quick to
apply and you can get some nice designs.  Try for ones that are very glossy,
usually cheaper contact paper is better.  This is good for making individual
boards, and coating small desks.</p>

<p><b>Pro:</b> Cheap and easy to find.<br>
<b>Con:</b> Markers left on can stain, contact paper eventually peels away
from surface.<br>
<a href="surfaces.php#contact_paper"><b>See my review</b></a></p>

<p>First, cut the contact paper to fit and then peel back a corner.  Apply
the corner to the surface, making sure it still lines up properly.  Slowly
peel away more and use a flat edge, such as a credit card, to push the
contact paper onto the surface.  Make sure to go slow and get rid of any air
bubbles right away, since you will not be able to remove them later.</p>

<?php Section('Polycoated Cardboard', 'polycoat'); ?>

<p>Realtors may use a special cardboard for their signs, and you can usually
pick up similar materials from a sign shop.  Test a sample first.  These can
make great personal-sized whiteboards and can be obtained for next to
nothing if you can find a good source.</p>

<p><b>Pro:</b> Typically inexpensive and usually work pretty well.<br>
<p>Con:</b> May be hard to find, may have advertising on the back.  Markers
can stain surface.<br>
<a href="surfaces.php#polycoated_cardboard"><b>See my review</b></a></p>

<p>These babies are the simplest of all to make into whiteboards.  First,
you can cut them down to the size you want.  Next, you're done.  See?
Easy!</p>

<?php

StandardFooter();
