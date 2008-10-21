<?PHP

require '../../functions.inc';

StandardHeader(array('title' => 'GarBots',
		     'topic' => 'garbots'));

?>

<p>Program tanks to wipe out the opposition.  This is a great little game 
for teaching the fundamentals of programming.  Make sure you visit the <a
href="http://www.hares.net/bot.htm">Official Site</a> to download the
program and so you can contact Scott and tell him what a good program this
is.</p>
	
<p>Since I still don't get a link off of the Official Site, I have decided
to put my <a href="garbots/">hacking tool</a> online!  Feel free to decrypt
other people's robots!</p>

<dl>

<dt><b>Bots that I Wrote</b></dt>
<dd>I left them all unprotected.  There's no point in hiding the code.</dd>
<dd><a href="garbots/Wal-Mart.pdb">Wal-Mart</a> - Just shoots the walls.
When I first started playing GarBots, too many bots hung out around the
walls.</dd>
<dd><a href="garbots/Maz.pdb">Maz</a> - Drives around and shoots randomly
around the arena.  Also tends to pick on things hanging out near walls.</dd>
<dd><a href="garbots/Path.pdb">Path</a> - A pool vacuum gave me the idea to
create a robot that just drove in straight lines, killing things in front of
it.  It turns when it hits a wall.  Sometimes it gets hung up near corners,
but it usually gets out before dying.</dd>

<dt><b>Testing Robots</b></dt>
<dd>These are just simple robots that you can use to spruce things up or to
help you out with finding information.</dd>
<dd><a href="garbots/Bugbot.pdb">Bugbot</a> - Illustrates the FIRE bug.  It
just shoots off the screen and everyone dies.</a>
<dd><a href="garbots/Count.pdb">Count</a> and <a
href="garbots/Count2.pdb">Count2</a> - They work in conjunction to provide
timing information.  Replace the comment in Count with the code you want to
test, then run Count and Count2 in a battle with the Battle Speed at 1.  The
last line you see is the amount of time the command took.</dd>
<dd><a href="garbots/Minimum_Radius.pdb">Minimum Radius</a> - Checks to see
what radius truly can kill you.  DAMAGERAD is just a bit too small when
dealing with integer math.  See the code snippet above for my calculation.</dd>
<dd><a href="garbots/Moving_Drone.pdb">Moving Drone</a> - Hmmm.  A moving
drone.</dd>

<dt><b>Other "Open" Bots</b></dt>
<dd><a href="garbots/K-Drone.pdb">K-Drone</a> - Emailed to the GarBots
mailing list by cozmikforz.  Provided here as a file so that nobody needs 
to actually type in the code by hand.  Drives around and shoots.  Very
similar to Fleeter by Rudi.</dd>

<dt><b>Modified Bots</b></dt>
<dd>These are bots that I modified to run faster and be more aggressive.
Some I also fixed a bit.  Code is protected (as they were originally).</dd>
<dd><a href="garbots/Cruiser2.pdb">Cruiser2</a> - Originally from <a
href="http://dl3rud.gmxhome.de/garbots.htm">Rudi's Site</a>.  I combined
multiple assignments and moved some math into the scan line.</dd>
<dd><a href="garbots/Death_Tank_4.pdb">Death Tank 4</a> - Originally from the
<a href="http://www.garlic.com/scott/bot.htm">Official Site</a>.  I removed
GOSUB functions, and made the scan randomly pick the direction to get some
robots that would have been missed.</dd>
<dd><a href="garbots/Fleeter_2.pdb">Fleeter 2</a> - Originally from <a
href="http://dl3rud.gmxhome.de/garbots.htm">Rudi's Site</a>.  Very hard to
improve on this little guy.  I made it so that it couldn't hurt itself, and
I made the first shot come off a little faster.</dd>
<dd><a href="garbots/Lord_of_the_Rings_2.pdb">Lord of the Rings 2</a> - 
Originally from <a href="http://dl3rud.gmxhome.de/garbots.htm">Rudi's 
Site</a>.  A very nice robot.  I made it not ever be able to damage itself,
removed GOSUB functions, had it initially drive to its starting spot without
starting in the center, and sped it up a bit.  Excellent concept!</dd>
<dd><a href="garbots/Smack_Down_2.pdb">Smack Down 2</a> - Originally from the
<a href="http://www.garlic.com/scott/bot.htm">Official Site</a>.  I removed
the GOSUB functions, unnecessary assignments, and made the first shot fire
faster.</dd>
<dd><a href="garbots/Sniper_2.pdb">Sniper 2</a> - Originally from <a
href="http://dl3rud.gmxhome.de/garbots.htm">Rudi's Site</a>.  I made it pick
a random direction, removed the WHILE loop around the program, combined
assignments, removed GOTOs (which were used like GOSUBs), and corrected the
program to think that the target is on the other side if a sub-scan missed
its mark.  Works great against non-moving drones.</dd>

<dt><b>Off-Site Links</b></dt>
<dd><a href="http://www.garlic.com/scott/bot.htm">Official Site</a> - You
have to go here.</dd>
<dd><a href="http://dl3rud.gmxhome.de/garbots.htm">Rudi's Site</a> - Several
tough bots to kill.  A few were modified by me to be a bit faster.</dd>
<dd><a href="http://groups.yahoo.com/group/GarBots/">Yahoo GarBots Group</a>
- Some messages, some files, some links.  Nothing too fancy, but you have to
be a member before you can even see the message archive.</dd>

</dl>

<p>If you want, you can also download all of the above robots in one <a
href="garbots/bots.zip">zip file</a>.</p>

<p>As much as I don't want there to be any bugs in the program, there are a
few.  However, Scott told me that several of these will be addressed in the
next release and more will be fixed later.</p>

<dl>

<dt><b>Scanning</b></dt>
<dd>Scan should scan a full radius, not just a triangle.  I
don't care if the picture just shows a triangle, I want to actually scan the
full distance.  I submitted some code to do this, and it should be fixed in
the next release.</dd>

<dt><b>Shooting</b></dt>
<dd>Shoot off the screen.  Everyone dies.  See "Bugbot."
Problem is fixed in the next release.</dd>

<dt><b>Random Numbers</b></dt>
<dd>The RAND function doesn't work as expected.  To
counter the problem, I have a snippet of code in my Code Snippets section.
This should be fixed in the next release after 1.4.1.</dd>

<dt><b>Damage Radius</b></dt>
<dd>This works fine when you shoot in a N/S/E/W direction.
If you do any other angle, you're going to get hurt.  To counter this
problem, I have another snippet of code that will work for you.  This is due
to integer math.  This should maybe get fixed in the code, so that bots
that are 6.00001 away don't get hurt.  That just relies upon a better
distance function, which I submitted.</dd>

<dt><b>Logic</b></dt>
<dd>It would be nice if &gt;=, &lt;=, and != (or &lt;&gt;) 
were supported.  This should be implemented in the next release after
1.4.1.</dd>
	
<dt><b>Auto Off</b></dt>
<dd>Not only is there a spelling error next to the "Disable
Auto Off" checkbox, but it also doesn't work.  Scott is working on this.</dd>

<dt><b>Editor</b></dt>
<dd>The scrolling in the editor only scrolls one line at a
time.  Additionally, the scroll bar is not updated properly after pasting in
information, causing a headache when I put in large amounts of code and then
I want to go to the end of the program.  Scott is working on this.  I also
suggested an optional smaller font so that I could see more code on the
screen.</dd>

<dt><b>Math Functions</b></dt>
<dd>SIN, COS, TAN, and ATAN are provided.  It would
be nice to have the inverse of these functions available as well.  That way
I could figure out how wide of an area to scan based on DAMAGERAD.  <tt>a = 2 *
(INVSIN (DAMAGERAD / SCANRAD))</tt>  This may be implemented in the next
release after 1.4.1.</dd>

<hr>

<p>I have tested the various commands and figured out how long they take to
run and how long each tank has for each turn.  Below are my findings.</p>

<p>Each robot is processed in the game alphabetically.
Therefore, if your robot comes alphabetically before the other robots, you
have an advantage.  From there, each robot has five ticks, for a lack of a
better term.  A tick is like a second.  It's the smallest unit of measurable
time that I found.</p>

<table align=center border=1 cellpadding=0 cellspacing=0>
<tr><th>What</th><th>Ticks</th><th>Notes</th></tr>

<tr><td>Linefeeds</td><td>1</td><td><i>Try to not have blank lines in your
code.</i></td></tr>

<tr><td>Comments</td><td>0</td><td><i>Comments sharing a line are good.  If
they are on a separate line, the linefeed counts against them.</i></td></tr>

<tr><td>FIRE</td><td>10</td>
<td rowspan=2><i>Equal amounts of time.  Maybe just lobbing bombs is
good enough, if you just want to possibly hit a target.  Scanning an area might
get you a robot, but the robot could move before you get a shot 
off.</i></td></tr>
<tr><td>SCAN, A = SCAN</td><td>10</td></tr>

<tr><td>PRINT "anything"</td><td>0</td>
<td><i>Print statements cost you time because of the linefeed.</i></td></tr>

<tr><td>Assignments (A = ...)</td><td>0</td>
<td rowspan=2><i>The "A =" part is free.  It's the other side that gets
you.  So, for <tt>A = 2</tt>, the "A =" is free, the "2" costs you 1.</td></tr>
<tr><td>Calculations (2, 5-7, 2*arenax)</td><td>1</td></tr>

<tr><td>WHILE, IF, FOR</td><td>1</td>
<Td rowspan=2><i>It takes an equal amount of time to jump to the true
secion of an IF statement as it does to jump to the ELSE section or to jump
directly to the ENDIF section.  Mmmmm.  Logic good.</i></td></tr>
<tr><td>ELSE, NEXT, ENDIF</td><td>0</td></tr>

<tr><td>Errors</td><td>1</td>
<Td><i>Test your code thoroughly.  Make sure you keep logging
on to catch errors and fix them before battling your bot against
others.</i></td></tr>

<tr><td>GOTO, GOSUB, RETURN, Labels</td><td>1</td>
<td><i>GOSUB and RETURN each cost time, so it is better for
your time if you just copy and paste instead of calling a subroutine.  I
understand that it is easier to call a subroutine.  Just optimise it before
you distribute it.  Because labels also cost time, you should avoid them.
If I want to return to my beginning WHILE loop in my program, I replace the
WHILE with a label and just GOTO it at the end of the loop and at wherever I
want to return to the beginning of the loop.</i></td></tr>

<tr><td>RTOP, PTOR</td><td>1</td>
<td rowspan=2><i>Conversion to/from polar costs time.  Perhaps you 
could keep everything in polar instead of using coordinates.  Also, using
POSX and POSY are a bit expensive, so maybe you could keep track of your
position and just move N/S/E/W to make the whole movement thing
easier.</i></td></tr>
<tr><td>POSX(), POSY()</td><td>3</td></tr>

<tr><td>DAMAGE()</td><td>2</td>
<td><i>Nearly useless.  By the time you realize that you're hit and your
motor starts moving from the expensive startup cost of DRIVE, you're likely
to be hit again, and therefore dead.  Also, since you can't say <tt>if z <
DAMAGE()</tt> to shorten things up, you're stuck spending another couple
ticks before you can realize that you're hurting.</i></td></tr>

<tr><td>DRIVE</td><td>5 + (dist / drivestep)</td>
<Td colspan=2><i>The (dist / drivestep) is rounded up. 
Driving short distances is REALLY spendy.  For peak
performance, I'd suggest you drive a multiple of drivestep with each DRIVE
command.</i></td></tr>

</table>

<p>Each tank gets 5 ticks to do whatever they can, then the other tanks get
their turn.  If a command goes over your 5 tick boundary, it does get
executed, but it will take you a while before you can go again.  Let's say a
<tt>FIRE</tt> command is the first line in your program.  When your tank
gets control back, you will be able to eventually run 4 <tt>PRINT</tt>
commands or something.</p>

<p>When figuring out the cost for a line, take 1 for the linefeed, plus the
cost for whatever else is on that line.</p>

<p>A list of things that I have learned (via trial and error) is provided
here for your amusement.</p>

<ul>
<li>Comments and functions are good, but use up time.</li>
<li>Having a counter to decide which way to scan works well, but it uses up
time.  You can randomly pick a side to scan faster.</li>
<li>X and Y coordinates are great for driving and shooting, but polar don't
need to be converted.</li>
<li>Good coding techniques are punished.  Cut and paste instead of having
functions.</li>
<li>Shoot fast, shoot often.</li>
<li>Damage extends past DAMAGERAD at angles.</li>
<li>SCANning an area is faster than trying to shoot the entire area.</li>
<li>Two direct hits at the default settings will wipe out a robot.</li>
<li>Blank lines are your enemy.</li>
<li>A lingering robot is a dead robot.</li>
</ul>

<p>Below are a few code snippets that you can use in your programs if they
help you out.</p>

<?PHP

MakeBoxTop('center');

?><pre>' Code snippets -- Feel free to use

' Get a random 1 or 0 -- counters the RAND issue mentioned above
r = (rand 100) / 50

' Due to integer math, this is the closest you can fire
' at an arbitrary angle and not get damaged at all.
' I usually add one to this number, just in case.
' See Minimum Radius bot below for proof
d = sqrt (2 * damagerad * damagerad))

' To use it, you can do something like this
s = scan (a - 10) (a + 10)
if s > 0 then
    f = fire a (max s d)
    while f > 0
        f = fire a (max s d)
    next
endif

' How to fire at robots.  A comparison.  The good way is
' just a little faster and a little safer.  Remember to
' remove comments in your program for the sake of speed.
' Bad way                ' Good way
a = rand 360             a = rand 360
b = a - 10               s = scan (a - 10) (a + 10)
c = a + 10               if s > 0 then
s = scan b c                 f = fire a (max damagerad s)
if s > 0 then                while f > 0
   f = s                        f = fire a (max damagerad s)
   while f > 0               next
      fire a s           endif
   next                  ' You can replace damagerad with d
endif                    ' if you use the snippet above
</pre>
<?PHP

MakeBoxBottom();

StandardFooter();
