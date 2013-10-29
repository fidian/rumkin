---
title: GarBots
template: page.jade
---

Program tanks to wipe out the opposition.  This is a great little game for teaching the fundamentals of programming.  Make sure you visit the [Official Site] to download the program and so you can contact Scott and tell him what a good program this is.


Notes on Protection
===================

I don't get a link off the [Official Site], and it is probably because I have released the following information.  You can unprotect any bot's `.pdb` file by opening it up in a hex editor and changing just a byte.  If the first byte of a record has the bit flag 0x02 turned on, just flip that one bit.  Done.

I had a tool online that flipped that bit for every record in the database (each bot is one record), but it never got used and I stopped maintaining it.

Bots I Wrote
============

I left all of these unprotected as there's no point in trying to hide the code.

* [Wal-Mart](Wal-Mart.pdb) - Just shoots the walls.  When I first started playing GarBots, too many bots hung out around the walls.
* [Maz](Maz.pdb) - Drives around and shoots randomly around the arena.  Also tends to pick on things hanging out near walls.
* [Path](Path.pdb) A pool vacuum gave me the idea to create a robot that just drove in straight lines, killing things in front of it.  It turns when it hits a wall.  Sometimes it gets hung up near corners, but it usually gets out before dying.

Testing Robots
==============

These are just simple robots that you can use to spruce things up or to help you out with finding information.

* [Bugbot](Bugbot.pdb) - Illustrates the FIRE bug.  It just shoots off the screen and everyone dies.
* [Count](Count.pdb) and [Count2](Count2.pdb) - These work in conjunction to provide timing information.  Replace the comment in Count with the code you want to test, then run Count and Count2 in a battle with the Battle Speed at 1.  The last line you see is the amount of time the command took.
* [Minimum Radius](Minimum_Radius.pdb) - Checks to see what radius truly can kill you.  DAMAGERAD is just a bit too small when dealing with integer math.  See the Code Snippets for my calculation.
* [Moving Drone](Moving_Drone.pdb) - Hmmm.  A moving drone.

Other "Open" Bots
=================

* [K-Drone](K-Drone.pdb) - Emailed to the GarBots mailing list by cozmikforz.  Provided here as a file so that nobody needs to actually type in the code by hand.  Drives around and shoots.  Very similar to Fleeter by Rudi.</dd>

Modified Bots
=============

These are bots that I modified to run faster and be more aggressive.  Some I also fixed a bit.  Code is protected (as they were originally).

* [Cruiser2](Cruiser2.pdb) - Originally from [Rudi's Site].  I combined multiple assignments and moved some math into the scan line.
* [Death Tank 4](Death_Tank_4.pdb) - Originally from the [Official Site].  I removed GOSUB functions, and made the scan randomly pick the direction to get some
robots that would have been missed.
* [Fleeter 2](Fleeter_2.pdb) er 2</a> - Originally from [Rudi's Site].  Very hard to improve on this little guy.  I made it so that it couldn't hurt itself, and I made the first shot come off a little faster.
* [Lord of the Rings 2](Lord_of_the_Rings_2.pdb) - Originally from [Rudi's Site].  A very nice robot.  I made it not ever be able to damage itself, removed GOSUB functions, had it initially drive to its starting spot without starting in the center, and sped it up a bit.  Excellent concept!
* [Smack Down 2](Smack_Down_2.pdb) - Originally from the [Official Site].  I removed the GOSUB functions, unnecessary assignments, and made the first shot fire faster.
* [Sniper 2](Sniper_2.pdb) - Originally from [Rudi's Site].  I made it pick a random direction, removed the WHILE loop around the program, combined assignments, removed GOTOs (which were used like GOSUBs), and corrected the program to think that the target is on the other side if a sub-scan missed its mark.  Works great against non-moving drones.

Even More Links
===============

* [Official Site] - You have to go here.
* [Rudi's Site] - Several tough bots to kill.  Only a few were modified by me to be a bit faster.
* [Yahoo GarBots Group] - Some messages, some files, some links.  Nothing too fancy, but you have to be a member before you can even see the message archive.
* [All of the above bots](bots.zip) - Here is a single zip file that has every bot on this page.

Bugs
====

As much as I don't want there to be any bugs in the program, there are a few.  However, Scott told me that several of these will be addressed in the next release and more will be fixed later.

Scanning
--------

Scan should scan a full radius, not just a triangle.  I don't care if the picture just shows a triangle, I want to actually scan the full distance.  I submitted some code to do this, and it should be fixed in the next release.

Shooting
--------

Shoot off the screen.  Everyone dies.  See "Bugbot." Problem is fixed in the next release.

Random Numbers
--------------

The RAND function doesn't work as expected.  To counter the problem, I have a snippet of code in my Code Snippets section.  This should be fixed in the next release after 1.4.1.

Damage Radius
-------------

This works fine when you shoot in a N/S/E/W direction.  If you do any other angle, you're going to get hurt.  To counter this problem, I have another snippet of code that will work for you.  This is due to integer math.  This should maybe get fixed in the code, so that bots that are 6.00001 away don't get hurt.  That just relies upon a better distance function, which I submitted.

Logic
-----

It would be nice if `>=`, `<=`, and `!=` (or `<>`) were supported.  This should be implemented in the next release after 1.4.1.

Auto Off
--------

Not only is there a spelling error next to the "Disable Auto Off" checkbox, but it also doesn't work.  Scott is working on this.

Editor
------

The scrolling in the editor only scrolls one line at a time.  Additionally, the scroll bar is not updated properly after pasting in information, causing a headache when I put in large amounts of code and then I want to go to the end of the program.  Scott is working on this.  I also suggested an optional smaller font so that I could see more code on the screen.

Math Functions
--------------

SIN, COS, TAN, and ATAN are provided.  It would be nice to have the inverse of these functions available as well.  That way I could figure out how wide of an area to scan based on DAMAGERAD.  `a = 2 * (INVSIN (DAMAGERAD / SCANRAD))`.  This may be implemented in the next release after 1.4.1.

Command Timing Mechanics
========================

Each robot is processed in the game alphabetically.  Therefore, if your robot comes alphabetically before the other robots, you have an advantage.  From there, each robot has five ticks, for a lack of a better term.  A tick is like a second.  It's the smallest unit of measurable time that I found.

What              | Ticks | Notes
----------------- | ----: | -----------------------------------------
Linefeeds         |     1 | Try to not have blank lines in your code.
Comments          |     0 | Comments sharing a line are good.  Separate comments with a newline still count against you.
FIRE              |    10 | Maybe just shoot instead of scanning?
SCAN              |    10 |
PRINT             |     0 | The only cost comes from newlines.
Assignments       |     0 | The "x =" part of an assignment is free.  It's the other side that costs you.
Calculations      |     1 | "5-7", "2*areax", "3" all cost the same.
WHILE, IF, FOR    |     1 | "IF x > 0" and "IF x < 1" cost twice.
ELSE, NEXT, ENDIF |     0 | "IF x > 0 ... ELSE ..." costs only 1 for the IF.
Errors            |     1 | Test your code thoroughly.
GOTO, Labels      |     1 | Just having labels costs time.
GOSUB, RETURN     |     1 | Better structured code costs you time.
RTOP, PTOR        |     1 | Conversion to/from polar costs time.
POSX(), POSY()    |     1 |
DAMAGE()          |     2 | Nearly useless; see below.
DRIVE             | 5 + x | x is `(distance / drivestep)` rounded up.

Tips:

* If you want to return to your beginning WHILE loop in your program, you can optimize the loop by making a label at the beginning and then just GOTO the label at the end of the loop and at wherever you want to return to the beginning of the loop.  It is better to skip logic entirely when possible.

* Conversion to/from polar coordinates costs time.  Perhaps you can keep everything in one unit instead of doing any conversion.  Also, POSX and POSY are a bit expensive, so perhaps keep track of your position.  Maybe just move N/S/E/W to make the whole movement thing easier.

* Determining your damage is not worth your time.  By the time you realize that you're hit and your motor starts moving from the expensive startup cost of DRIVE, you're likely to be hit again, and therefore dead.  Also, since you can't say `if z < DAMAGE()` to shorten things up, you're stuck spending another couple ticks before you can realize that you're hurting.

* Driving short distances is extremely spendy.  For peak performance, I suggest driving a multiple of drivestep with each DRIVE command.

Each tank gets 5 ticks to do whatever they can, then the other tanks get their turn.  If a command goes over your 5 tick boundary, it does get executed, but it will take you a while before you can go again.  Let's say a `FIRE` command is the first line in your program.  When your tank gets control back, you will be able to eventually run 4 `PRINT` commands or something of equal cost.

When figuring out the cost for a line, take 1 for the linefeed, plus the cost for whatever else is on that line.

A list of things that I have learned (via trial and error) is provided here for your amusement.

* Comments and functions are good, but use up time.
* Having a counter to decide which way to scan works well, but it uses up time.  You can randomly pick a side to scan faster.
* X and Y coordinates are great for driving and shooting, but polar don't need to be converted.
* Good coding techniques are punished.  Cut and paste instead of having functions.
* Shoot fast, shoot often.
* Damage extends past DAMAGERAD at angles.
* SCANning an area is faster than trying to shoot the entire area.
* Two direct hits at the default settings will wipe out a robot.
* Blank lines are your enemy.
* A lingering robot is a dead robot.

Code Snippets
=============

	' Code snippets -- Feel free to use

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

[Official Site]: http://www.hares.net/bot.htm
[Rudi's Site]: http://dl3rud.gmxhome.de/garbots.htm
