<?PHP

include '../../functions.inc';
include 'whiteboard.inc';

StandardHeader(array('title' => 'Whiteboard Cleaning',
		     'topic' => 'whiteboard',
		     'sorttable' => 1));

?>
	
<p><a href="images/board_big.jpg"><img src="images/board_small.jpg"
align="right"></a>
People have all sorts of different tricks that they use to clean a
whiteboard.  Some things work well for whiteboard markers.  Other methods
are better for marks by markers that are not dry erase.  I decided to
finally put all of the rumors and tips to the test.  I sacrificed my large
commercial whiteboard and coated it with the following materials:</p>

<ul>
<li>Dry erase marker (three different brands, various colors)
<li>Wet erase marker (one brand)
<li>Permanent marker (four different brands, various colors)
<li>Crayon (one brand, several colors)
<li>Pencil (standard #2 and colored pencils)
<li>Ink (stamping pad refill ink)
<li>UV permanent marker (one brand)
</ul>

<p>To make the test really difficult, I let the whiteboard sit for over a
month with the test marks on it. I have to say that the dry erase and wet
erase marker were usually wiped away without any problem.  The permanent
markers and UV marker didn't come off in most tests, and the stamping pad
ink seeped into the board and would not come entirely off with anything
short of a belt sander.  However, if you decide to not let the ink sit as
long as I did, then you will likely not have the permanent discoloration
when you use the cleaners suggested below.</p>

<p>Our testing procedure for each cleaner was the same.  Apply the cleaner,
wait two minutes, wipe 20 times with a clean cotton cloth.  For cleaners
that did not follow the rules, we did our best.  The 
<a href="#eraser">Mr. Clean Magic Eraser</a>,
<a href="#cloth_dry">dry cloth</a>, and <a href="#cloth_wet">wet cloth</a>
were not left on the surface for two minutes before 
use.  The <a href="#tape">clear tape</a> was left on for two minutes before
being pulled off.  The markers (<a href="#dry_erase">dry</a>, 
<a href="#wet_erase">wet</a>) were applied, two minutes elapsed, then a 
dry or wet cloth was used to wipe 20 times.</p>

<p>We used a limited number of wipes because we didn't want to sit and scrub
with each cleaner.  One could scratch the finish off if an abrasive cleaner
was used, and it would be all nice and white.  However, the next time you
try to write on it, you wouldn't be able to erase it.  The goal is to find
the best cleaner that makes you wipe as little as possible that is
completely safe for your board surface.  We also mark down scores if the
product left a film since we really only want to clean the board once and
we don't want to clean off our cleaner after cleaning it.</p>

<p><b>Overall Score</b> is how well the cleaner performed on all of the
marks that were on the board.  <b>Whiteboard Score</b> rates how well just
the whiteboard markers were removed.  This way you can pick the best cleaner
for your particular application.</p>

<?PHP

$Cleaners = array(
   array('Acetone', 'Klean-Strip', 4, 5, 'acetone',
      'Smeared the ink, fumes',
      'acetone.jpg',
      "This is in the hardware section of your " .
      "favorite store.  When I purchsed it from Wal-Mart, I was not " .
      "only carded, but I also apparently had a buying limit.  That " .
      "minor hassle aside, this was one of the better cleaners out " .
      "there.  It didn't really do much to the ink, but the rest " .
      "of the marks came off with only a little work.",
      "If you intend to use this as a cleaner indoors, make sure " .
      "that you do your cleaning away from flame and turn on the " .
      "fans!  The major drawback of this cleaner is that you get a nasty " .
      "chemical smell.  Acetone is also the primary ingredient " .
      "in <a href=\"#nail_polish_remover\">nail polish remover</a>."),
   array('Alcohol, Isopropyl', 'Generic', 4, 5, 'alcohol',
      'Easy to get, good results, fumes',
      'isopropyl.jpg',
      "Rubbing alcohol is cheaper and produces a bit less fumes than " .
      "acetone, but its cleaning power is nearly the same.  It worked " .
      "marvelously on the whiteboard marker and even removed the dull " .
      "sheen that a whiteboard may accumulate.  I have heard that " .
      "some brands of marker don't clean as easily with alcohol and " .
      "leaving marker on the board for a very long time can make " .
      "it harder to erase, but the " .
      "Expo brand of markers apparently use something very similar " .
      "as a solvent in their markers because it works very well for me."),
   array('Baby Oil', 'Johnson & Johnson', 1, 1, 'baby_oil',
      'Worse than water, oily residue',
      'baby_oil.jpg',
      "I got this suggestion from a reader to my web site.  This was " .
      "about the worst thing in the world that you can do to your " .
      "whiteboard.  It removed about as much as water, but it also left " .
      "an oily film that needed to be cleaned before the board could " .
      "be used.",
      "I do want to note that I did not want to actually try something " .
      "like this because I saw no merit in the cleaner.  However, I " .
      "wanted to be very thorough, and that's the <i>only</i> reason " .
      "it is included in the test."),
   array('Cleaner', 'Lift Off 2', 2, 3, 'lift_off',
      'Removed some marks',
      'lift_off.jpg',
      "This cleaner removed crayon and a couple of the marker streaks, " .
      "but I feel that it is very ineffective.  It is no better than " .
      "soapy water when it comes to whiteboard marker marks and several " .
      "other cleaners outperform it when compared on how well it " .
      "cleaned the other types of marks."),
   array('Cleaner', 'Lysol Kitchen Cleaner', 2, 3, 'lysol',
      'Removed some marks',
      'lysol.jpg',
      "Though it is not designed for whiteboards nor for the types of " .
      "marks we were trying, this cleaner still performed adequately.  " .
      "I was disappointed that the whiteboard didn't glisten when we " .
      "were done cleaning it, and it left a " .
      "thin film of cleaner on the surface."),
   array('Cleaner', 'Oil Eater', 4, 4, 'oil_eater',
      'Removed most marks',
      'oil_eater.jpg',
      "My mother swears by this cleaner ... well, at least at the " .
      "time we did the test.  She likes to try new cleaners and only the " .
      "most powerful and effective ones stay.",
      "Of course, her \"champion\" of cleaners did quite well.  It " .
      "did not seem to really take away all of the whiteboard markers, " .
      "but it made up for that with the permanent marker, ink, and " .
      "other things."),
   array('Cloth, Dry', 'Generic', 1, 3, 'cloth_dry',
      'Took away only the dry erase',
      'cloth_dry.jpg',
      "Worked as well as expected.  Mostly wiped away the markers that " .
      "were designed to be wiped away."),
   array('Cloth, Wet (Water)', 'Generic', 1, 3, 'cloth_wet',
      'Removed wet and dry erase',
      '',
      "One should not hope that just water will remove ink, crayon, " .
      "and the other things with which I coated my board.  Worked " .
      "as well as we thought it would.",
      "Sorry about the lack of a picture.  Just look at the one for " .
      "<a href=\"#vinegar\">vinegar</a> instead; they have the " .
      "exact same cleaning power."),
   array('Dish Soap', 'Dawn', 1, 3, 'soap',
      'Removed wet and dry erase',
      'soapy_water.jpg',
      "It worked about the same as <a href=\"#cloth_wet\">plain " .
      "water</a>.  Well, just a tiny " .
      "bit better, but the difference was minimal."),
   array('Eraser Pad', 'Mr. Clean', 1, 3, 'eraser',
      'Same as soapy water',
      'eraser.jpg',
      "It was advertised to remove crayon, marker, and a slew of " .
      "other things.  We had to throw it away because it smeared the ink " .
      "and it got into the sponge.  Don't waste your money on this " .
      "product."),
   array('Graffiti Remover MB-10', 'Solutions MB', 5, 5, 'mb_10',
      'The best cleaner tested, mild irritant',
      'mb10.jpg',
      "I am unable to say enough good things about this product",
      "<a href=\"http://solutionsmb.com\">Solutions MB</a> contacte me " .
      "and let me know about a whiteboard paint that they produce, and " .
      "they told me about the cleaner.  They talked me into it and I " .
      "purchased a bottle (without any discount or anything!).  " .
      "When I first got it in the mail, I smelled it and it just smelled " .
      "like soapy water.  Immediatly, I thought it would fail.  When it " .
      "came time to do the test, we waited a bit before testing this " .
      "product.  I sprayed the whiteboard, waited the full amount of time, " .
      "and I didn't see much change in the marks.  I was still skeptical " .
      "before I started wiping, but after the very first wipe, a good " .
      "portion of the square was already clean.  Three or four more wipes, " .
      "and I was done.",
      "My testing partner let out a \"Wow\" and I wanted to test it " .
      "again.  A couple spritz over on another section of the board, " .
      "wait five seconds, then wiped.  Again, almost everything came off.",
      "If you are going to buy a product to clean your board, I strongly " .
      "suggest this one!  After the test, we cleaned the whole 4' x 8' " .
      "board with just a few tablespoons of the cleaner and it removed " .
      "the <a href=\"#baby_oil\">baby oil</a>, <a href=\"#lysol\">Lysol " .
      "Kitchen Cleaner</a> film, and other residues that remained.",
      "The product does produce some sort of irritation.  It isn't like " .
      "the fumes that some cleaners have.  Instead, when you use the " .
      "spray bottle and the fine mist is sprayed out, one might inhale " .
      "a tiny bit of that mist and it just feels irritating in your " .
      "throat.  I'm sure that breathing any cleaner is a bad thing, " .
      "and I only noticed the sensation when I got my head close " .
      "to the cleaning surface.  It did not happen when I first opened " .
      "up the bottle and stuck my nose an inch above the opening.",
      "I have been told that MB10 and MB10w are the same product, but " .
      "MB10 is gelled so it will cling to vertical surfaces longer to " .
      "help remove heavy residue.  MB10w is more of a liquid form " .
      "for packaging in a fingre pump sprayer, which is what I tested."),
   array('Hair Spray', 'Suave Naturals', 3, 2, 'hair_spray',
      'Cleaned well, left residue',
      'hair_spray.jpg',
      "This did pull up some of the permanent marks, but also was very " .
      "ineffective on other marks.  The sticky residue brought the score " .
      "down for whiteboard markers, plus you can find many better ways " .
      "to remove the marks.  I would not suggest this one."),
   array('Lacquer Thinner', 'Kleen-Strip', 3, 2, 'lacquer_thinner',
      'Cleaned well, left residue',
      'lacquer_thinner.jpg',
      "Most of the marks were removed or lightened, but the ink was " .
      "smeared around and there was this residue; a glossy substance " .
      "that didn't let the whiteboard markers work again."),
   array('Lubricant', 'WD-40', 2, 2, 'wd_40',
      'Cleaned well, left residue',
      'wd40.jpg',
      "I thought that this would be down there with " .
      "<a href=\"#baby_oil\">Baby Oil</a> and it " .
      "basically ended up there.  It did remove some more of the marks, " .
      "but it didn't remove the ink nor really work well on the permanent " .
      "marker.  This is made as a lubricant, not as a cleaning product."),
   array('Marker, Dry Erase', 'Expo 2', 2, 3, 'dry_erase',
      'Removed some marks, not worth the hassle',
      'marker_dry.jpg',
      "The marker did almost nothing to the marks that were on the board, " .
      "and I would suggest you try any cleaner instead of a marker.  " .
      "It did pick up most of the dry erase marker that was difficult " .
      "to remove, but it also is not something that I would use to " .
      "clean an entire board.  If you need to get rid of small whiteboard " .
      "marks from a whiteboard surface, this may be a good option for you."),
   array('Marker, Wet Erase', 'Vis-A-Vis', 1, 1, 'wet_erase',
      'Did not add any cleaning power',
      'marker_wet.jpg',
      "I ruined a marker in order to show everyone that it worked just as " .
      "well as a wet cloth.  You don't need to replicate this particular " .
      "cleaning experiment."),
   array('Mineral Spirits', 'Klean-Strip', 3, 4, 'mineral_spirits',
      'Cleaned well',
      'mineral_spirits.jpg',
      "The permanent marker was lightened, the ink was removed instead of " .
      "being smeared, and a few of the marks came up.  Although this was " .
      "not the best option for cleaning off the non-whiteboard tests, " .
      "it did do a pretty good job with whiteboard markers."),
   array('Mixture', 'Vinegar & Fantastik', 2, 3, 'mix_1',
      'Worse than Fantastik',
      'vinegar_fantastik.jpg',
      "This acted just like a slightly stronger " .
      "<a href=\"#vinegar\">vinegar</a>.  The amount " .
      "removed was minimal."),
   array('Mixture', 'Vinegar & Orange Glow', 2, 3, 'mix_2',
      'Worse than Orange Glow',
      'vinegar_glow.jpg',
      "After scrubbing on the marks, they were barely lightened.  I am " .
      "not even sure that the wet-erase marks were removed properly."),
   array('Nail Polish Remover', 'Generic', 4, 5, 'nail_polish_remover',
      'Smeared ink, fumes',
      'nail_polish_remover.jpg',
      "When I say \"<a href=\"#acetone\">acetone</a>,\" people think " .
      "it is a nasty chemical.  " .
      "When I say \"nail polish remover,\" people get a different " .
      "impression and they think it isn't as harsh.  Well, nail polish " .
      "remover is basically acetone, and the two performed similarly.  " .
      "Nail polish remover is a bit easier to find, and they both " .
      "removed most of the marks and slightly smeared the ink.  They " .
      "also both evaporated away, leaving a clean whiteboard surface.  " .
      "It did completely remove the dull sheen that whiteboard markers " .
      "can leave on the surface."),
   array('Orange Cleaner', 'Fantastik', 3, 4, 'fantastik',
      'Removed most marks, smeared ink',
      'fantastik.jpg',
      "This orange cleaner did do its best when it came to cleaning, but " .
      "my test was more stubborn and the marks persisted.  You can see " .
      "the streaks left by the globs of ink that was on the board.  Out " .
      "of the three orange cleaners I tested, this one performed the " .
      "best."),
   array('Orange Cleaner', 'Goo Gone', 2, 4, 'goo_gone',
      'Did not perform well',
      'goo_gone.jpg',
      "When I added this to my list of cleaners, I initially had very high " .
      "hopes for it.  I have had some amazing results with Goo Gone, but " .
      "today it failed me.  It did smear the ink the least of the three " .
      "orange cleaners, but that was the end of it's powers."),
   array('Orange Cleaner', 'Orange Glow', 2, 4, 'orange_glow',
      'Slightly better than soapy water',
      'glow.jpg',
      "I am not sure if rubbing an orange on the table would have been " .
      "better, but it certainly would not have been worse.  As far as " .
      "cleaners go, this one was pleasant to work with and very average " .
      "in results."),
   array('Paint Stripper', 'Klean-Strip', 1, 1, 'paint_stripper',
      'Removed board surface, fumes',
      'stripper.jpg',
      "If you are looking at the picture and you see a white board, you " .
      "might ask yourself why I ranked this cleaner so poorly.  If you " .
      "are ranking this product solely on the ability to remove ink, " .
      "marker, and the rest of the substances, then this one is one " .
      "of the best.  The ink smeared a little, but it is probable " .
      "that further applications would make the rest of the ink come " .
      "right off the board.",
      "What you do not see is that this damaged the board.  If left on, " .
      "even for a minute, the board surface started to bubble up and could " .
      "have been wiped away with the cloth I was using.  I'm sure that it " .
      "dissolved some of the board in my brief test and that makes me " .
      "wonder how many times I could \"clean\" the board with paint " .
      "stripper before the board could no longer be cleaned.  " .
      "As if that is not enough, this stuff is not nice to your hands.  " .
      "Avoid use if at all possible.  Be very careful if you have no " .
      "other option besides paint stripper."),
   array('Stain Remover', 'Greased Lightning', 4, 5, 'greased_lightning',
      'Removed most marks',
      'lightning.jpg',
      "Nearly everything was removed by this stain remover.  My mom " .
      "uses it to get stains (oil, pizza, tar, etc.) off of clothing.  " .
      "It looks like you can use it nicely on the board as well.  It " .
      "did not have instant results like the " .
      "<a href=\"#paint_stripper\">paint stripper</a> or " .
      "<a href=\"#mb_10\">MB-10</a>, " .
      "but we didn't need to work too hard to make most of the marks " .
      "come off the board."),
   array('Stain Remover', 'Tech', 3, 4, 'tech',
      'Did not remove permanent markers',
      'tech.jpg',
      "This worked for whiteboard marker and dry erase marker, but " .
      "merely lightened the rest of the stuff.  It did work better " .
      "than soapy water, and it may do what you need if this cleaner " .
      "is available in your house."),
   array('Tape, Clear', '3M - Scotch', 1, 2, 'tape',
      'Only removed dry erase',
      'tape.jpg',
      "It was suggested that clear tape could remove stubborn marks.  " .
      "That may be true, but it only works for dry erase marker, and " .
      "the stubborn ones may not be removed unless you keep the tape on " .
      "the board for a week or more.  Plus, pulling off the tape could " .
      "damage the board."),
   array('Vinegar', 'Heinz', 1, 3, 'vinegar',
      'The same as water',
      'vinegar.jpg',
      "As you can see, it only lightened the marks and really didn't " .
      "remove anything except the dry and wet erase marker.  Unless " .
      "you really like the smell of vinegar, use soapy water instead."),
   array('Whiteboard Cleaner', 'Expo', 2, 4, 'whiteboard_cleaner',
      'Lightened most marks, removed few',
      'whiteboard_cleaner.jpg',
      "I was hoping for more.  Here is a cleaner that is designed " .
      "for whiteboards by a company that made some of the markers that " .
      "I was using.  While it did actually work better than water, " .
      "it did not remove the dull sheen, nor did it remove all of " .
      "the stubborn whiteboard marks.  It really didn't touch the rest " .
      "of the marks I had on the board.  Use it if you have it, but " .
      "I threw mine away after this test."),
);

MakeBoxTop('center');

?>

<table class="sortable" id="cleaners" border=1 cellpadding=2 cellspacing=0>
<caption>Whiteboard Cleaner Results &ndash; Click a Heading to Sort</caption>
<thead>
	<tr>
		<th>Cleaner</th>
		<th>Brand</th>
		<th><span title="How well did it do with everything?">Overall<br>Score</span></th>
		<th><span title="Did it clean the whiteboard marker lines?">Whiteboard<br>Score</span></th>
		<th>Notes</th>
	</tr>
</thead>
<tbody>
<?PHP

foreach ($Cleaners as $k => $Cleaner) {
?>
	<tr>
		<td><a href="#<?= $Cleaner[4] ?>"><?= htmlspecialchars($Cleaner[0]) ?></a></td>
		<td><?= htmlspecialchars($Cleaner[1]) ?></td>
		<td><?= Rate($Cleaner[2]) ?></td>
		<td><?= Rate($Cleaner[3])  ?></td>
		<td><?= htmlspecialchars($Cleaner[5]) ?></td>
	</tr>
<?PHP
}
?>
</tbody>
</table>
<?PHP

MakeBoxBottom();


foreach ($Cleaners as $k => $Cleaner)
{
   $SecName = $Cleaner[0] . ' :: ' . $Cleaner[1];
   Section($SecName, $Cleaner[4]);
   
   if (! empty($Cleaner[6]))
   {
      echo '<img src="images/' . $Cleaner[6] . '" align=right>' . "\n";
   }
   
   echo '<p>Overall Score: ' . Rate($Cleaner[2]) . ' &ndash; ';
   echo 'Whiteboard Marker Only Score: ' . Rate($Cleaner[3]) . "</p>\n";
   
   array_shift($Cleaner);
   array_shift($Cleaner);
   array_shift($Cleaner);
   array_shift($Cleaner);
   array_shift($Cleaner);
   array_shift($Cleaner);
   array_shift($Cleaner);
   
   echo '<p>' . implode("</p>\n<p>", $Cleaner) . "</p>\n";
}

StandardFooter();
