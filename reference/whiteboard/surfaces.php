<?php

include '../../functions.inc';
include 'whiteboard.inc';
StandardHeader(array(
		'title' => 'Whiteboard Surfaces',
		'topic' => 'whiteboard',
		'sorttable' => 1
	));

?>

<p>I have tried numerous types of surfaces in the hopes that I would be able
to make a good, cheap whiteboard.  In order to save you time and money, I
have posted my results on the web.  I hope this helps you out.</p>

<p>I rated the surfaces on eraseability with whiteboard markers only.
Ghosting, residue, and difficulty wiping away the marks all lead to a worse
score.  I also try to use new surfaces because the wear on a whiteboard can
cause it to become a worse surface.  I have a commercial whiteboard that has
seen its share of use and it was worse than using a tileboard!</p>

<p>The price factor reflects the approximate cost to cover a wall in the 
material, or essentially the cost for the surface area.  Most commercial
whiteboards would get a very poor price rating.</p>

<p>Try to keep in mind that the quality of the marker and how it works with
the surface is also a key factor in judging a surface.  If it doesn't work
for you, but I say it works well, try a different brand of marker and hope
for the best.</p>

<p>If you make a whiteboard surface, you can send me a test sample for me to
try.  I'll put your product up here and I'll give you a review.  However,
you are not guaranteed to have a positive review if it just doesn't work.</p>

<?php

$Things = array(
	'Avery "Write-On Cling Sheets"' => array(
		0,
		0,
		'avery',
		'Reported to work',
		'Reported to work very well.  It is just like a whiteboard that you can stick to the walls.  The 27" x 32" might be a bit small for your purposes, but it would work great for a small office whiteboard.  My only questions are about durability and long-term marker stains.  One visitor mentioned that their marker bled through the sheet and actually stained the wall.'
	),
	'Aluminum Foil' => array(
		0,
		0,
		'aluminum',
		'An interesting solution',
		'A visitor sent in a tip to use aluminum foil, which may be a fun classroom project.  All you need is some sort of backing, aluminum foil, and some type of glue that adheres to aluminum foil.  If you want a really easy backing, you could use cardboard.  As for the glue, I would recommend spray adhesive since bonding with the foil may be a challenge and spray ahesive sticks to almost anything.'
	),
	'Appliances' => array(
		4,
		1,
		'appliances',
		'Works in a pinch',
		'You can use whiteboard markers on many appliances.  The factory\'s coating works pretty well, but marker can get stuck in the texture sometimes.  The major drawback is that it is hard to line your wall with washers, dryers, ovens, and refrigerators.'
	),
	'Carolina Pad "Write On/Wipe Off Poster Board"' => array(
		5,
		5,
		'cpp_poster',
		'A rollable, portable whiteboard',
		'I was able to test one of these 22" x 28" pieces of plastic, and it really surprised me.  It was like having a small, rollable, handy whiteboard.  Markers erased completely and easily.  Also, the price is hard to beat; I found one retailer online that was selling this product for under $2.  The only bad thing is that it is not large enough for my table or wall, but it is great for individual work areas.'
	),
	'Cellophane / Plastic Wrap' => array(
		1,
		5,
		'cellphane',
		'Good for emergencies, bad durability',
		'The plastic with which you wrap food usually works.  This also includes most heat-shrink window insulation.  As always, test first.  This type of material works well initially, but usually stains with long-term marks.'
	),
	'Ceramic Material' => array(
		5,
		1,
		'ceramic',
		'Used in high-end whiteboards',
		'This is probably outside the price range of most visitors, but really high-end whiteboards use metal and a ceramic material to make an extremely nice surface with a really high durability and lifetime when not dropped and broken.  Ceramic dishes could also work, depending on the amount of scratches on the surface.',
		'I rated this poorly on price because most people who are visiting this web site do not need such an expensive solution.'
	),
	'Contact Paper' => array(
		3,
		5,
		'contact_paper',
		'Usually works well',
		'Just head to your local retailer and pick up a roll for a couple dollars.  Quick and easy.  Test it out before buying to make sure that your type of contact paper will erase cleanly because some textures and materials do not work with dry erase markers.  Typically, the cheaper contact paper works better.'
	),
	'Glass' => array(
		5,
		2,
		'glass',
		'Works great',
		'Test first!  I have had a report that some windows do not erase well, which might indicate the window is not actual glass.<br><br>I write all over windows, glass mirrors, and glass table tops.  It would be difficult and maybe dangerous to coat a wall with glass, but at least it is a convenient surface.  Sometimes markers can be a little stubborn to erase, but numerous <a href="cleaners.php">cleaners</a> can get them off with almost no work.'
	),
	'Latex Paint (High Gloss)' => array(
		1,
		1,
		'latex',
		'Complete failure',
		'A suggestion from a paint guy at the local hardware store was to use Behr High-Gloss, 100% Acrylic Latex, Ultra Pure White paint.  That didn\'t work at all.  The $12 quart of paint thickly coated my 4\' x 8\' gaming table.  However, nothing was erasable; it worked as well as paper.'
	),
	'Laminated Sheets' => array(
		3,
		4,
		'laminate',
		'Fairly good and inexpensive',
		'If you can get a good, smooth laminated piece of tagboard or similar material, this will work for individual or small whiteboards.  Dry erase markers eventually do stain them if the marker is left on for long periods of time.  It may be difficult to erase the marker, depending on the laminate used.<br><br>If you are a teacher, this would make great individual dry erase board for your class, especially if you have access to a laminator at school.  I also have <a href="make.php#laminate">instructions</a> for how to make personal whiteboards with laminated sheets.'
	),
	'MB-3000 Whiteboard Coating' => array(
		4,
		5,
		'mb3000',
		'Turns a surface into a whiteboard',
		'<a href="media/mb3000.jpg"><img align="right" src="media/mb3000_small.jpg"></a>I was contacted by <a href="http://www.solutionsmb.com/">Solutions MB</a> regarding their whiteboard repair kit.  Really, it is a clear coating that you can apply to a surface that will turn it into a whiteboard.  I used the product to turn my ruined whiteboard into a new "pinkboard."  The surface wipes off markers well, but not quite as well as a whiteboard.  It was $40 for 8 oz, but you use only a thin coat to turn any painted surface into a whiteboard.</p><p>The down side is that when you apply it with a foam brush, it may cause some minor streaks and really tiny bubbles to show up on the surface of the coating.  The problem I had may have been made worse because I didn\'t wait for the paint underneath to finish curing.  See my instructions for <a href="make.php#mb3000">making a whiteboard</a> with with MB-3000 for more information.</p><p>If you want to turn the walls of your house into whiteboard surfaces, this might be perfect.'
	),
	'MB4000W Whiteboard Coating' => array(
		3,
		5,
		'mb4000w',
		'Water-based coating to create a whiteboard',
		'<p><a href="http://www.solutionsmb.com/">Solutions MB</a> came out with a water-based version of their MB3000 coating and asked if I would try it.  After several attempts to get it to apply smoothly, I believe that I have finally discovered the right way to apply it.  You want to follow their directions and prep the area just right.  Then, when you coat the surface, you want to only put on a thin layer (just make it wet).  Let it dry completely, then add another layer if you desire.  If the layer is too thick or if you work the material as it is drying, you will make the surface rough and no marker will erase.</p><p>I also have issues wiping marker off sometimes.  I have two boards that I attempted to coat identically.  One erases like magic, the other (the one I had a hard time coating) has ghosting in areas.</p><p>Done right, this stuff works well.</p>',
	),
	'Metal, Sheet' => array(
		0,
		0,
		'metal',
		'May work for some metals',
		'I have heard that some metals will let you use a dry erase marker on them and have it wipe off with ease.  Sometimes the metals are coated, other times they are not.  I need to delve into this area a bit more.'
	),
	'Plastic, Page Protectors' => array(
		2,
		5,
		'page_protectors',
		'Good if you find the right one',
		'Slipping in a piece of cardboard or tagboard to stiffen the plastic pocket will turn the plastic into a nice personal whiteboard.  Depending on the type of page protector, the dry erase marker may not wipe off or come off entirely.  For best results, get the really glossy and really cheap ones.  The textured ones have a harder time removing the marker.  While this isn\'t a good solution for my walls nor table, it may work well for you.'
	),
	'Plastic, Sheet' => array(
		4,
		5,
		'plastic_sheet',
		'Very good and inexpensive',
		'<table border=0 cellpadding=0 cellspacing=0 align=right><tr><td><a href="media/hide.jpg"><img src="media/tn_hide.jpg"></a> <a href="media/roll.jpg"><img src="media/tn_roll.jpg"></a></td></tr></table>I purchased a roll of plastic from a local surplus store (<a href="http://ax-man.com/">Ax-Man Surplus</a>) for $2.50.  It was labeled as a roll-up heat insulator, but it looks like a clear window shade.  The plastic is pretty durable and most markers will wipe off with no effort.  If left on, my troublesome red marker left a residue, but that was removable with a cleaner.  I mounted a roll under a window shade, then pulled up the window shade to show you how well it is hidden.  You can see this picture to the right.  Nobody suspects the sheet plastic is there, yet I have an instant writeable surface when needed.<br><br>Once I saw a page on the net that detailed making dry erase boards out of sheets of plastic that could be cut into the desired size, then they had supporting pieces of wood at the top and they would roll up with velcro straps and be held as a roll until needed.  I can\'t find it now, but this clear shade is along the same lines as that page.  If you find that page, please let me know.'
	),
	'Polycoated Cardboard' => array(
		3,
		4,
		'polycoated_cardboard',
		'Easy and effective',
		'The backs of political yard signs or scrap from screen printing jobs may be used as a whiteboard.  The marker may be difficult or impossible to remove if it stays too long on the cardboard.'
	),
	'Poly Sheets' => array(
		0,
		0,
		'poly sheets',
		'Looks great',
		'It looks like <a href="http://www.kk.org/cooltools/archives/000700.php">these things</a> would do the trick nicely.  If you get creative and use duct tape, spray adhesive, or another method of attaching them to your wall, you could fill the area pretty fast.'
	),
	'Polyurethane (Coating)' => array(
		3,
		4,
		'polyurethane',
		'Suggestion from visitors',
		'The Shower Board link (below) suggests that coating something like tileboard with a wipe-on polyurethane may make the tileboard more like a commercial whiteboard, but it also says that their tests failed when they used a polyurethane varnish.  They say that perhaps Minwax or Varathane Professional may work.<br><br>I did try out my parents\' floor, which was coated with Varathane.  The markers wiped right off, but I was not allowed to do an extended test.'
	),
	'Tatco Whiteboard Sheets' => array(
		0,
		0,
		'tatco_sheets',
		'Suggestion from a visitor',
		'This is another product that I was told about but have not yet had the pleasure of testing.  They are described as portable plastic sheets that stick (static cling?) to surfaces.  It works with dry erase, wet erase, and permanent markers.  I wonder how well it stands up to use and permanent markers.  The product I see is $23 for twelve 37" x 12" sheets or $46 for twenty 37" x 24" sheets.'
	),
	'Tileboard / Melamine' => array(
		2,
		5,
		'tileboard',
		'Large surface for cheap',
		'These are smooth, white, shower board sheets.  Usually they come in 4\' x 8\' panels.  Water just rolls off these things.  A single sheet coats my table nicely.  Take a marker with you and test the tileboard in the store; some tileboard works and others don\'t work at all.  I have found that the cheapest tileboard works the best since it has no texture.  I have seen prices for $7 to $15 for various styles and colors.<br><br>I invested $7 to get the cheap, glossy, white kind.  After testing, it seems to work tolerably well.  The markers don\'t quite wipe off cleanly, but it is an extremely cheap solution when compared to a commercial 4\' x 8\' whiteboard.'
	),
	'Troy Dry Erase Sheets' => array(
		0,
		0,
		'troy',
		'Self-stick poly sheets',
		'You can get a 48" x 60" roll of self-stick poly that works as a whiteboard.  Check out <a href="http://www.troydryerase.com">Troy\'s website</a>.'
	),
	'WallTalkers' => array(
		0,
		0,
		'walltalkers',
		'Dry-erase wallpaper and contact paper',
		'A friend of mine mentioned he can get a type of wallpaper and a type of contact paper that would work.  It is designed as a dry erase whiteboard.  It probably would have worked wonderfully, but I don\'t have that kind of money available to coat the walls of my house.  Check out <a href="http://www.walltalkers.com/">WallTalkers</a> and see what they have to offer.'
	),
	'Whiteboard Paint' => array(
		0,
		0,
		'whiteboard_paint',
		'White paint (not a coating)',
		'I read an article on the web saying that there is whiteboard paint.  It is similar to chalkboard paint, except it is white and very glossy.  It sounded ideal, but the paint is hard to find.  There is also magnetic paint that you can use as a base coat under the whiteboard paint to make a versatile whiteboard, which also is sometimes hard to find.  <br><br>I have wonderful visitors that have showed me different whiteboard paints.  One said for me to use <a href="http://dryerasemagic.com">Markee&trade;</a>.  For $100 a gallon, you can turn any wall into a whiteboard.  Unfortuantely, it also says the marker has to be erased within 24 hours, which is too restrictive for me.  Other visitors have steered me towards IdeaPaint, which is $3.75 a square foot (minimum 50 sq. ft. = $187.50).  Application is the same as the Solutions MB product; it is a single white-colored coating that can be painted on any smooth surface.  It does say to wipe clean after each use.'
	),
);
MakeBoxTop('center');

?>

<table border=1 cellpadding=3 cellspacing=0 align=center class="sortable">
<caption>Surface Rankings &ndash; Click a Header to Sort</caption>
<thead>
<tr><th>Material</th><th>Score</th><th>Price</th><th>Description</th></tr>
</thead>
<tbody>
<?php

foreach ($Things as $N => $T) {
	echo '<tr><td><a href="#' . $T[2] . '">' . $N . '</a></td>';
	echo '<td align=center>' . Rate($T[0]) . '</td>';
	echo '<td align=center>' . Rate($T[1]) . '</td>';
	echo '<td>' . $T[3] . "</td></tr>\n";
}

echo "</tbody>\n</table>\n";
MakeBoxBottom();

foreach ($Things as $N => $T) {
	Section($N, $T[2]);
	echo '<p>' . $T[4] . "</p>\n";
}

StandardFooter();
