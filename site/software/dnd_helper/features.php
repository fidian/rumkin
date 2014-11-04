<?php
/* -*- html -*-
 * / * Documentation for D&D Helper
 * / */
include('../../functions.inc');
StandardHeader(array(
		'title' => 'Features',
		'topic' => 'dnd_helper'
	));

?>

<p>Nearly every feature of the program is listed here, by category.  If you
want other features, feel free to ask.</p>

<?php Section('Calculators'); ?>

<dl>
<dt><b>Die Roller</b></dt>
<dd>Yes, nearly every D&amp;D program has one, but mine is
statistically corrected to produce random numbers that don't have the 0.1%
bias that others have.  This same random number generation is used whenever
a random number is needed throughout the program.  (Maybe I went a little 
out of my mind -- 0.1% bias is hardly worth caring about.)</dd>

<dt><b>Experience Calculator</b></dt>
<dd>Enter average party level, number of monsters, and monster level.
You'll get the total experience for the encounter and the amount per
person.</dd>

<dt><b>Movement Calculator</b></dt>
<dd>How many miles can a monk travel over hilly ground on a clear day
without a trail to follow?  Well, a 18th level monk with boots of speed can
go approximately 82 mph.</dd>

<dt><b>Turning undead</b></dt>
<dd>Rolls all of the dice and does all of the math for you.  Just enter the
charisma modifier and the character level.</dd>
</dl>

<?php Section('Reference Tables'); ?>

<dl>
<dt><b>Ability Modifiers</b></dt>
<dd>What is the modifier for your giant with a Str of 23?  Find out
quickly.</dd>

<dt><b>Experience Points</b></dt>
<dd>A quick reference to see if your characters have leveled yet or not.</dd>

<dt><b>Treasure Per Encounter</b></dt>
<dd>Keeping in mind that this is an average, it helps you to make sure your
characters are as powerful as they should be.  This is per character,
assuming there are four players in your party.</dd>

<dt><b>Character Wealth Gain</b><dt>
<dd>How much each character's wealth should increase with each level.</dd>

<dt><b>Party Treasure From Encounters</b></dt>
<dd>Very similar to the Treasure Per Encounter table, but this applies to
the party as a whole.</dd>

<dt><b>Average Treasure</b></dt>
<dd>This should let you know if you are letting too many magic items and too
much money slip away to your players.  Keeping the players near their level
on this chart will help balance game play.</dd>

<dt><b>Character Wealth</b></dt>
<dd>How much gold and assets your characters should have each accumulated in
the course of their travels.</dd>
</dl>

<?php Section('Random Generators'); ?>

<p>For more information on the types of databases that D&amp;D Helper uses,
check out <a href="gen_type.php">Database Types</a>.  Below is a list of
things that the program can generate by installing another databse.</p>

<ul>
<li>Gems with gp values and descriptions</li>
<li>Magic items (minor, medium, and major)</li>
<li>Words that look like they belong to a particual language.</li>
<li>Riddles</li>
<li>Business names</li>
<li>Critical hit and fumble descriptions</li>
<li>Wild surges and wild surge fumbles</li>
<li>Player character names from a wide variety of sources</li>
</ul>

<?php Section('And All The Rest'); ?>

<dl>
<dt><b>Context-Sensitive Help</b></dt>
<dd>When you pick the "Help" menu option, it will display help for that
particular screen -- not a generic help message.</dd>

<dt><b>Easy Number Entry</b></dt>
<dd>When you enter a number, a separate screen pops up so you can just tap
the numbers, change the sign (where applicable), and increment/decrement the
number by 1.  The buttons are big enough for you to use your fingertip.<dd>

<dt><b>Freeware</b></dt>
<dd>The program and all databases for D&amp;D Helper that are distributed on
this site are freeware.  Well, actually the program is open-source (GPL).</dd>
</dl>

<?php

StandardFooter();
