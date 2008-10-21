<?PHP

session_start();

include '../../functions.inc';

StandardHeader(array('title' => 'College Life'));

$PageData = array(
    0 => array("
Your first day of college!  Through hard work and dedication, you've
been accepted into the college of your dreams, and, boy, you can't wait
to begin! Not only will you be getting a first rate education, but
you'll be exposed to new experiences and cultures, and make friends that
will last you a lifetime, as well.  You'll expand your mind, and your
horizons, since that is what college is all about!  Aah, the sky is
bright blue, the air crisp as a Macintosh apple, and the beautiful fall
campus covered with brilliant ambers, golds, and vermillons.  There'll
be plenty of time to enjoy the splendors of the campus later, however.
Now you have to check into your room.  Boy, are you excited!  You unload
your things, say good-bye to your parents, and head off to find your
dorm.  On your way, you run into a group of your future classmates, who
offer you a beer.  What do you do?",
	       array(1 => 'Continue to your dorm',
		     2 => 'Drink beer'),
	       -10),
   1 => array("
You find your residence hall, and are about start moving in your stuff,
when you discover the entranceway to the dorm is locked.  You don't have
a key!  Checking into your room is apparently harder than you'd thought
it would be.  What do you do?",
	      array(3 => "Ask for help",
		    4 => "Sit around and wait for help",
		    8 => "Head for the housing office"),
	      0),
   2 => array("
You have chosen to drink beer.  Unless you played high school football,
this is probably your first beer, and, to be honest, you really don't
see what is so great about it.  Everybody else seems to be enjoying
themselves, however, so you decide to play along for the time being.
You're sure that you'll be able to avoid these kind of people once
you've settled in. You're about to continue your search for your dorm,
when someone offers you another beer for the road.  What do you do?",
	      array(1 => "Decline and head for your room",
		    2 => "Drink beer"), 
	      1),
   3 => array("
You search desperately for some help, but no one seems to be available.
You wonder if this overwhelming feeling of uncertainty is a common
occurance in college life.",
	      array(4 => "Wait for help",
		    5 => "Return to the people who offered you beer"),
	      0),
   4 => array("
You wait around for some help, but none arrives.  You sit down next to
your stuff.  Hours pass.  Boy, you're getting tired.  Tired...",
	      array(7 => "Next ..."),
	      -100),
   5 => array("
Unfortunately, the group who first offered you beer has left, no doubt
resting up for tomorrow's classes.  However, there just happens to be a
similar group of people in the same spot, also drinking beer.  Lucky
you. \"Hey, guys,\" you say, \"I'm having some trouble getting into my...\"
Suddenly, an open beer is thurst into your hand.  \"DRINK UP, MAN!!!\"
Your pleas for help seem to be unheard, drowned out by the pounding bass
of a nearby radio.  What do you do?",
	      array(2 => "Drink beer",
		    4 => "Go back to your hall and wait for some help",
		    8 => "Head to the housing office"),
	      0),
   6 => array("
You're beginning to feel a little whoozy, but, boy, you're having fun.
College is GREAT!  You've already made tons of friends, and all you had
to do was drink beer.  You begin to howl in a pure bacchanal frenzy.
\"COLLEGE RULES!!  AAAAOOOOO!!....\"",
	      array(7 => "Next ..."),
	      -100),
   7 => array("
You wake up enshrouded in duct-tape, wedged between the boughs of a
mighty oak tree.  A thin layer of morning dew coats your body.  OH NO!!
You've slept through your morning classes, and on your first day of
school! You haven't even checked into your room yet!!",
	      array(8 => "Head to the housing office",
		    9 => "Run to your next class"),
	      -10),
   8 => array("
After searching the campus for about an hour, you stumble across the
housing office in the back of the administration building.  Three hours
and fifteen minutes later, you are off to your dorm room, key in hand.
Boy, I wonder what your roommate will be like.  Hopefully he'll have
some of the same classes as you.  Who knows, maybe you can even study
together!
<br><br>
As you walk down the hall of your dorm room, country music permeates the
air.  It seems to be coming from your room.  You're about to
investigate, when a door opens, and a fellow student emerges, surrounded
by a cloud of smoke.  He says hello, and invites you in.  What do you
do?",
	      array(10 => "Decline and continue to your room",
		    11 => "Accept invitation"),
	      -4),
   9 => array("
Your first class is Astronomy 101, staple of all freshman science
courses.  Your professor is swarthy gentleman in a turban, and you have
trouble understaning the lecture through his thick foreign accent.
You're about to ask him to slow down, when you notice that none of your
classmates have Astronomy texts.  You check your schedule and discover
you've gone to the wrong class.  What do you do?",
	      array(12 => "Sit through the class to avoid embarrassment",
		    13 => "Discretely leave"),
	      0),
   10 => array("
When you reach your room, you discover that your roommate has already
taken the best side of the room, generally arranging the furniture to
his liking.  Country music does indeed come from his stereo.  Oh well,
you only have to put up with it for the rest of the year.  After a few
minutes of talking, you discover that your roommate is going out for the
football team and likes beer.  He offers you one (a beer).  What do you
do?",
	       array(14 => "Decline",
		     15 => "Drink beer"),
	       0),
   11 => array("
You step into the fog, ready to make a new friend.  Gee, this sure is
funny-smelling smoke.  It should be, it comes from an 11-foot long
purple dragon!  You're about to flee, when the dragon covers you in a
burst of flame, melting the skin from your bones.  Remember, college is
full of unfamiliar and dangerous things.  Trust no one.
<br><br>
<center><font size=+2>The End</font></center>",
	       array(0 => "Start over"),
	       -1),
  12 => array("
After about twenty minutes of the unintelligible lecture, you begin
feeling drowsy.  YAWN.  If you can only make it another half hour,
you're home free.  YAWN.  Just another half hour...
<br><br>
OH NO!  You've fallen asleep in class.  You're professor is standing
above you, condemning your laziness on the first day of class..  You try
to explain that this was not even your class, but he refuses to listen.",
	      array(16 => "Next ..."),
	      -1),
   13 => array("
You stand up, quickly walking behind the back of the class and towards
the door.  You hear a few cruel snickers.  The people at college don't
seem to be any kinder than those in high school.  You almost through the
door, when the professor stops you and tells you to meet with him after
class.",
	       array(16 => "Next ..."),
	       0),
   14 => array("
\"What are you, some kind of faggot?  Everybody drinks beer at college!\"
Your roommate must be having some problems adjusting to the college
life.  You understand how he feels.  You're beginning to feel pretty
nervous yourself.",
	       array(16 => "Go to your classes",
		     17 => "Try calling your parents"),
	       0),
   15 => array("
You accept the beer, quickly finishing it off.  You're about to go to
class when your roommate offers you another for the road.  What do you
do?",
	       array(9 => "Decline and go to class",
		     15 => "Drink beer"),
	       1),
   16 => array("
\"There is no excuse for your actions, especially when you consider today
is the first day of classes.  If you have problems with my lecturing,
come in and talk to me about it privately.\"  He begins to wink at you.
What do you do?",
	       array(20 => "Apologize and head to your next class",
		     21 => "Call the dean of students, pretending to be " .
		        "a high-priced lawyer"),
	       0),
   17 => array("
You dial your parents, but nobody is home.  It doesn't look like you'll
be finding any help there.  You choke back tears in a futile attempt to
salvage your hopes of college being the best years of your life.",
	       array(15 => "Drink beer after all",
		     18 => "Kill yourself"),
	       0),
   18 => array("
You join the ranks of thousands of college students who have decided to
end it all.  Congratulations...to your roommate.  He gets a 4.0 this
semester, and a room all to himself.  Funny how college works.
<br><br>
<center><font size=+2>The End</font></center>",
	       array(0 => "Start over"),
	       -100),
   19 => array("
Whoo!  At first you didn't think you'd get along with your roommate very
well, but now he seems to be a pretty cool guy.  You're fitting right in
at college.  This is GREAT!!  WHOOO....
<br><br>
You wake up on the floor, your head pounding.  Strange whimpering sounds
come from your roommate's jiggling bed.  What do you do?",
	       array(22 => "Pretend to be asleep",
		     23 => "See what's happening",
		     24 => "Crawl out in the hall and throw up"),
	       -100),
   20 => array("
On your way to your next class, some strange people approach you,
strange in that they are offering you pamphlets, not beer!  How odd.
They seem to be trying to recruit you into some sort of club.  What do
you do?",
	       array(25 => "See what this club is about",
		     26 => "Recognize these people as the Christian " .
		        "lunatics they are"),
	       -1),
   21 => array("
Congratulations!!  You've figured out the easiest way to get through
college.  The school settles with you out of court, awarding you
$3,000,000 and the degree of your choice if you keep your sexual
harassment case. Go directly to graduate school -- you've already
learned all that college can teach you.
<br><br>
<center><font size=+2>The End</font></center>",
	       array(0 => "Start over"),
	       -100),
   22 => array("
Strangely enough, the sounds end and only your roommate leaves the room.
I wonder what he was doing?  Oh well.  You check the clock and discover
it's melting.  How surreal.
<br><br>
<center><font size=+2>The End</font></center>",
	       array(0 => "Start over"),
	       -100),
   23 => array("
You stand up and see your roommate mounting a young co-ed.  This must be
what they call \"making love.\"  You'd like to hang out in your room for a
while, but you feel kind of awkward with your roommate and his
girlfriend in the room.  You hope this sort of thing won't be happening
all the time.
<br><br>
You head out into the hallway, stepping into a shallow puddle of chunky
grey-green liquid.  It is vomit.  Hmm, some sort of virus must be
floating around campus.  Oh well.  You've heard about a shin-dig at one
of the fraternal society houses.  It sounds like fun, so you decide to
go.",
	       array(27 => "Next ..."),
	       -2),
   24 => array("
After expelling the contents of your stomach across the residence-hall
floor, you stand and find yourself face to face with one of your
neighbors. \"Hey, man, wanna go to a kegger?\"  You're not sure what a
kegger is -- maybe some kind of British lawn game.  Since you don't have
much of anything else to do, you decide to go.",
	       array(27 => "Next ..."),
	       -2),
   25 => array("
You're still not quite sure what these people are all about, but they
invite you on some sort of retreat.  Since you're not doing much of
anything else tonight, you decide to go.",
	       array(28 => "Next ..."),
	       -2),
   26 => array("
Congratulations!!  Although some Christians are alright, most are
lunatics.  You've successfully avoided their indoctrination techniques.
You're about to go to class when it suddenly dawns on you:  ATTENDANCE
IS NOT MANDATORY IN COLLEGE. Instead, you decide to head for a party
you've heard about being held at one of the local fraternity houses.",
	       array(27 => "Next ..."),
	       -2),
   27 => array("
You arrive at the party.  Music is playing loudly.  People seem to be
performing some sort of Greek theatre.  You're unfamiliar with the play,
although, judging from the degree of audience participation, it
definitely isn't Aristophanes' Lysistrata.  In one corner, you see what
appears to be a hot-tub.  In another, a clump of high-spirited lovers of
life.  The clump is emitting smoke.  And, in the the center of the room,
occupying most of your field of view, is a large silver barrel, with
very many people gathered around it.  It all looks very interesting.
What do you do?",
	       array(29 => "Find out what the hot-tubbers are up to",
		     30 => "Investigate the source of the smoke",
		     31 => "Check out the barrel"),
	       -2),
   28 => array("
When you arrive at the retreat site, people are standing around,
drinking what appears to be Kool-Aid.  You are offered some.  You drink
it. It is poisoned.  You're dead.  Remember:  <i>When at college,
alcoholic beverages are your only safe bet!</i>
<br><br>
<center><font size=+2>The End</font></center>",
	       array(0 => "Start over"),
	       -100),
   29 => array("
You wander over to the hot-tub.  You realize that the occupants have
shed their authentic Greek garb.  In fact, they are not clad at all!
They ask if you care to join them.  What do you do?",
	       array(32 => "Join the hot-tubbers and jump in",
		     30 => "Go investigate the mysterious smoke",
		     31 => "Check out the barrel instead"),
	       0),
   30 => array("
You slip over to the clump of people where the smoke appears to be
coming from.  You soon realize that the smoke is coming from cigarettes.
Yuck!  You hate smokers!  But, as you turn to leave, the odor becomes
more friendly.  You like this smoke.  Hmm, you wonder if you could
possibly try one of those funky little cigarettes.  You are handed one
and take a puff. Suddenly, things get scary.  People around you start
talking in fractions! \"1/8th\" seems to be  the topic of the
conversation.  This is weird!  You are very scared, so you decide to
leave, before this concentrated sin gets a hold of you.  Maybe those
people over by the strange keg can help you.",
	       array(31 => "Next ..."),
	       0),
   31 => array("
You reach the strange barrel, and see that it is the source of the
cupfulls of beer that everyone is holding.  Someone hands you one.  What
do you do?",
	       array(33 => "Drink beer",
		     34 => "Dump it on the floor"),
	       0),
   32 => array("
You jump right into the tub.  Big mistake.  The various bodily
secretions floating around in the water contain enough agents of V.D. to
kill Manhattan.  You are infected with so many STDs, that doctors refuse
to treat you.  Having nothing else left, you eventually become a nasty
cracked mass of scab.  You die.  Bummer, but then again, we warned you;
<i>college is dangerous!</i>
<br><br>
<center><font size=+2>The End</font></center>",
	       array(0 => "Start over"),
	       -100),
   33 => array("
Woo Hoo!  You have chosen to drink beer!!! This is the real college
experience!  Drink and be merry, my college-loving friend!  You slam a
beer with the skill of Michael Jordan!  Yeah!  This is SOOO GREAT!  What
do you do next?",
	       array(33 => "Drink beer",
		     35 => "Down one last beer then stagger home"),
	       1),
   34 => array("
You have just made the worst mistake of your life.  You hear someone in
the crowd shout \"Hey, that guy just dumped beer on the floor!!!\"  The
crowd frenzies.  Your feeble attempts to beg for mercy are ignored, as
the crowd shreds you into a thousand bloody pieces.
<br><br>
<center><font size=+2>The End</font></center>",
	       array(0 => "Start over"),
	       -100),
   35 => array("
After slamming yet another beer, you stagger home, open your door, and
lie down on your bed.  Just as you decide that the room is indeed
spinning, a hot chick walks in.  She says \"Hi, pleased to meetcha.  
My name's...\"  She slumps to the floor, passed out cold.  What do you do?",
	       array(37 => "Try to get her to her room, wherever it is",
		     38 => "Try to place her on your bed so she can " .
		        "sleep and maybe feel better",
		     39 => "Let her lie there while you try to sleep"),
	       1),
   36 => array("
Yes!  You have consumed more than twelve beers!  You wake up on the
floor of the headquarters of the fraternal society.  People are standing
around you, saying stuff like, \"Man, you are <B>so</b> wasted!  That stuff you
did was wild!\"  A beautiful young lady catches your eye.  You pass out.",
	       array(43 => "Next ..."),
	       -100),
   37 => array("
You bend over to grab the girl's arms so you can get her into the
hallway.  As you get a hold of her, she wakes up.  She screams,
\"RAPE!!!!,\" and kicks you between the legs.  You fall over, and as you
are getting up, campus security officers appear at your door.  They grab
you and take you with them.",
	       array(40 => "Next ..."),
	       0),
   38 => array("
As you are tucking the girl into your bed, she wakes up.  She places her
lips against yours, and you feel her stick her tongue into your mouth.
It kind of tickles!  What do you do?",
	       array(43 => "Let her keep doing what she is doing",
		     42 => "Run screaming from the room"),
	       0),
   39 => array("
You eventually go to sleep.  When you wake up, the girl is no longer on
your floor.  You hear interesting noises coming from your roommate's
bed. What do you do?",
	       array(41 => "Lie there and try to appear asleep",
		     42 => "Run screaming from the room"),
	       -4),
   40 => array("
After being taken to jail, you are charged with sexual assault.  In
other words, date rape.  It doesn't look good.  You eventually get sent
to prison and become the lover of a rather large man named Larry.  Too
bad; you lose.
<br><br>
<center><font size=+2>The End</font><center>",
	       array(0 => "Start over"),
	       -100),
   41 => array("
The noises continue for three more hours.  You begin to quiver
uncontrollably.  After two more hours of the strange noises, you freak
out, and run screaming from the room.",
	       array(42 => "Next ..."),
	       -5),
   42 => array("
After running for more than half a mile, you realize that you are
finally off the college campus.  You collapse.  College is obviously
much more than you can handle.  You never go back.  Too bad, you lose.
<br><br>
<center><font size=+2>The End</font></center>",
	       array(0 => "Start over"),
	       -100),
   43 => array("
You wake up with the attractive young lady in bed with you.  You notice
that neither of you are wearing clothes.  She nuzzles your neck, and
mumbles something about how great last night was.  Suddenly, you
realize; you have just gotten laid!  Congratulations!  You have both
gotten laid, and have done your fair share of drinking beer!  You are
obviously cut out for whatever challenges college can offer.  Hooray!
<br><br>
<center><font size=+2>You Win!</font></center>",
	       array(0 => "Start over"),
	       -100)
);


if (! isset($_GET['page']))
  $page = 0;
else
  $page = $_GET['page'];

if (! isset($PageData[$page]))
  $page = 0;

if (! isset($_SESSION['Beers']))
  $_SESSION['Beers'] = 0;
if (! isset($_SESSION['BeerCount']))
  $_SESSION['BeerCount'] = 0;

$P = $PageData[$page];

$_SESSION['Beers'] += $P[2];
if ($_SESSION['Beers'] < 0)
  $_SESSION['Beers'] = 0;
if ($P[2] > 0)
  $_SESSION['BeerCount'] ++;

$oldpage = $page;

if ($_SESSION['Beers'] > 6 && $page == 2)
  $page = 6;
if ($_SESSION['Beers'] > 7 && $page == 15)
  $page = 19;
if ($_SESSION['Beers'] > 12 && $page == 33)
  $page = 36;

if ($oldpage != $page)
{
    $P = $PageData[$page];
    $_SESSION['Beers'] += $P[2];
    if ($_SESSION['Beers'] < 0)
      $_SESSION['Beers'] = 0;
    if ($P[2] > 0)
      $_SESSION['BeerCount'] ++;
}

echo $P[0];

echo "<ul>\n";
foreach ($P[1] as $pnew => $desc)
{
    echo "<li><a href=\"" . $PHP_SELF . '?page=' . $pnew .
      '">' . $desc . "</a>\n";
}
echo "</ul>\n";

echo "<br><br>Beer Count:  "  . $_SESSION['BeerCount'];

StandardFooter();