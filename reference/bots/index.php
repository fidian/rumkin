<?PHP

require '../../functions.inc';

StandardHeader(array('title' => 'Bots',
		     'header' => 'Programming Bots',
		     'topic' => 'bots'));

?>

<p>I'm a self-proclaimed computer geek.  As such, I like to have games where
you make a strategy, program a robot to follow the strategy, and kill
everyone else on the playing field.</p>

<?PHP Section('<a href="garbots.php">GarBots</a>'); ?>

<p>I don't have a lot of time right now to invest in different programs, and
what time I do have is just a few minutes waiting here and there for things
to get done.  Garbots is a great little Palm program if you want a little 
killing on the go.  Fore more information, see my 
<a href="garbots.php">GarBots page</a>.</p>

<?PHP Section('WarBots') ?>

<p>This was my first bot programming game that I ever played.  Since it is
so hard to find, I have a <a href="media/warbots.zip">local copy</a> laying
around.  Warbots was programmed by Chris Busch in Turbo Pascal.  The program
runs in DOS and requires an EGA/VGA screen (everyone has these now,
right?).</p>

<p>I wrote a bot that drove around backwards.  If it found another robot, it
would cream the area, move forward, turn around, and shoot four or five
times in a row.  Worked quite well.</p>

<p>I also wrote a crack (some time back -- can't find it anymore) that would
decrypt the .war files that were password encrypted.  The encryption method
used is just a simple XOR stream cipher.</p>

<?PHP Section('Links') ?>

<ul>
<li><a href="http://tpga.virtualave.net/game-links.htm">AIForge</a>
(<a href="http://www.gammax.net/aiforge/game-links.htm">alternate</a>)
- Listing of different programming games</li>
<li><a href="http://www.gamerz.net/c++robots/">C++Robots</a>
- Write your bot in C++, play by email, king of the hill competitions</li>
<li><a 
href="http://directory.google.com/Top/Games/Video_Games/Genres/Simulation/Programming_Games/">
Google's List</a> - Lots and lots of programming games</a></li>
<li><a href="http://www.iit.edu/~wardjon/robots.html">Evolving Virtual
Robots</a> - How one person started to evolve robots</li>
<li><a href="http://realtimebattle.sourceforge.net/">RealTimeBattle</a>
- Program your robot in whatever language you wish</li>
<li><a href="http://www.cs.mcgill.ca/~stever/games/">Programming Games</a>
- A list of different programming games with descriptions</a>
</ul>

<?PHP

StandardFooter();
