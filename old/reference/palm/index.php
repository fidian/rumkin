<?php

include '../../functions.inc';
StandardHeader(array(
		'title' => 'Palm OS Programming',
		'topic' => 'palmos'
	));

?>

<?php Section('Assumptions'); ?>

<p>When using these tips, know these facts:</p>

<ul>
<li>I program in C.  All program code will be in C.
<li>I use gcc.  That shouldn't be a problem for any of these snippets for
you CodeWarrior folk.
<li>I use Linux, so the shell scripts will be using bash and perl.
</ul>

<?php Section('The Info'); ?>

<dl>

<dt><a href="gotchyas.php">Palm OS Programming Gotchyas and Pitfalls</a>
<dd>A slide show converted to text, then to HTML.  Easier to print out this
way.  Lots of good ideas and information is summed up.

<dt><a href="advanced.php">Advanced UI Topics</a>
<dd>A great look at what's going on inside the Palm.  Another slide show
that was converted to HTML.

<dt><a href="pilrc.php">PilRC</a>
<dd>Tips for using PilRC

<dt><a href="c.php">C Code</a>
<dd>Ways to speed up and slim down your program's size.  Includes examples
so you can see what I mean.

<dt><a href="events.txt">Events</a>
<dd>My small list of events and the hex codes relating to the event.

</dl>
	
<?php Section('Books'); ?>

<dl>

<dt>Palm OS Programming Bible
<dd>Fairly good book.  I like it.  It has tons of examples, and they seem to
cover everything.  There are minor things that it misses, such as the fact
that you should return true if you have a custom draw function for a popup
list and you need to set the trigger's label, but overall it is a good book.
The only downfall is that it is quite expensive.

<dt>Palm Programming, The Developer's Guide (O'Reilly)
<dd>First off, let me mention that I don't like O'Reilly books.  Not my
style.  This book is certainly no exception.  It has typograhical errors,
poor code, and skips over topics that I want information about.  If I didn't
buy this book, I could have spent it on something useful ... like gas money.

</dl>

<?php Section('Off-Site Links'); ?>

<dl>

<dt><a href="http://flippinbits.com/twiki/bin/view/FAQ/WebHome">
Palm OS Development FAQ</a></dt>
<dd>Lots of information about programming for the Palm.  If a subject is
already covered there, it certainly won't go into this page.</dd>

<dt><a href="http://www.palmopensource.com/">PalmOpenSource.com</a></dt>
<dd>Software that is not only free, but it also lets you download and modify
the source code in order to make improvements.  Unfortunately, the site is a
bit on the small side and doesn't have loads and loads of software.</dd>

<dt><a href="http://prc-tools.sourceforge.net/">
PRC-Tools</a><dt>
<dd>Open source, free compiler for making Palm OS programs.  This is the
alternative to CodeWarrior, and what I use.  I highly recommend it.</dd>

<dt><a href="http://www.ardiri.com/index.php?redir=palm&cat=pilrc">
Pilrc</a></dt>
<dd>Pilot resource compiler.  If you use PRC-Tools to make programs, you
will need pilrc to compile your resources for the program.</dd>

<dt><a href="http://www.isaac.cs.berkeley.edu/pilot/GLib/GLib.html">
GLib Shared Libraries</a></dt>
<dd>When you want to share code between multiple programs, you should make
it into a library.  This web site explains the benefit of making a GLib
style shared library.  You make it with gcc and the PRC-Tools package, so
you CodeWarrior people are kinda SOL.</dd>

</dl>

<?php

StandardFooter();
