<?PHP

require '../../../functions.inc';

StandardHeader(array('title' => 'Linked Lists',
		     'topic' => 'algorithms'));

?>

<p>I came across an article in <i>Linux Journal</i> that discussed an
interesting method of making a doubly-linked list while only using one
pointer.  In <a href="http://www.linuxjournal.com/article/6828">Issue
129</a>, Prokash Sinha discussed the method in detail.  I had been bouncing
around a similar idea for binary search trees, but never could make anything
useful.  I suppose that's because I was starting in the wrong area.</p>

<p>On this page, I will show two blocks of code side by side.  On the left
is the code for a normal doubly-linked list.  On the right is a modified
version that is more memory efficient.</p>

<p>The premise is simple.  Instead of storing the <tt>next</tt> and
<tt>prev</tt> memory addresses, you merely store the XOR difference between
them.  See the article (and subscribe <i>today</i> to <i>Linux Journal</i>)
for an explanation that is more in-depth ... or just leave me a comment and
pester me and I will explain it more in here.</p>

<p>You can cut your header information in half, since your struct only needs
to store the difference between the pointers.  Let me show you what I 
mean, assuming that we are storing integers in our linked list.</p>

<?PHP ShowExampleFile('listdef.h'); ?>

<p>Yep, that's right.  A doubly-linked list with just the space for one
pointer.  How do you do it?  Well, it's not that hard, but first let's get
into the "Why".</p>

<p>I program for Palm OS.  I like to code in C and tweak things until they
are faster, smaller, and better.  I also would like to see perhaps a kernel
option to have memory-efficient doubly linked lists (among other things) if
possible because I want to get my <a href="/reference/aquapad/">Aquapad</a>
running a lean, mean, optimized kernel.  For these reasons, at times memory
is a concern.  For those times, this version of a doubly-linked list could
be beneficial.  Most of the time it will not be the smartest, especially if
you absolutely need the most speed you can squeeze out of the machine.  That
isn't to say that the memory efficient technique is slow; it just consumes a
tiny bit of more CPU cycles.  Tiny.  How many?  Let's find out.</p>

<p>The best way to judge how much time an algorithm takes is to do an
analysis of the code.  I'll try to do that for you.  The easiest way is to 
torture test a reference implementation.  I'll certainly do that for you too.
To do either, I will need a few functionions.  Keep in mind that my code
isn't optimized for speed or size at this point.  It is just a good working 
implementation.</p>

<?PHP ShowExample(
'// sizeof((node *)) == 8
// sizeof(int) == 8

#define PTRTYPE int
#define XOR(a,b) ((node *) ((PTRTYPE)(a)^(PTRTYPE)(b)))
#define XOR3(a,b,c) ((node *) ((PTRTYPE)(a)^(PTRTYPE)(b)^(PTRTYPE)(c)))');
?>

<p>These special #define macros will help me out.  On my system, the size of
the pointer is the same as the 'int' data type.  You may need to use
unsigned long, long long, short, or something else.  The XOR() and XOR3()
macros just save me tons of typing.  I could have made an actual function
for that, but it would have been silly to do that because the lines are so
darn small; setting up the call to the function, passing the parameters, and
passing back the return value would have chewed up more code than I would
have liked.</p>

<p>Basically the XOR() macro just does a bitwise XOR of two pointers.  If
you recall from your binary math class, 01010000 xor 11000011 results in
10010011.  Xor just flips bits in the first value as specified in the
second.  So, if you start with 000 and xor it by 010, you get 010 as your
result.  If you xor it again by 010, you return back to your original 000
value.  Enough of that &ndash; let's see some code!</p>

<?PHP ShowExampleFile('countnodes.c'); ?>

<p>Aha!  A simple function that just shows you how to count the number of
nodes in the doubly linked list.  On the left, if you recall, is the normal
version.  The right contains the modified version, which is a bit longer.
There are two extra variables and an extra assignment before the while
loop.  Negligable performance hit.  Inside the while loop, there are two
more assignments and one xor.</p>

<?PHP ShowExampleFile('insertvalue.c'); ?>

<P>The code really isn't all that different for the two styles of linked
lists.  There is one extra line inside the while loop that contains an XOR,
a dereference, and an assignment.  That may, in my best guess, nearly double
the amount of code in the loop.  People who like assembler might want to
argue on this point.  Updating the pointers takes almost the same amount of
code &ndash; there are merely a couple more XOR commands.</p>

<?PHP ShowExample(

"temp = prev ^ curr->diff;
prev = curr;
curr = temp;",

"prev ^= curr ^ curr->diff;
curr ^= prev;
prev ^= curr;") ?>

<p>If you don't want the 'temp' pointer ever to be used, you can instead
use something like this neat little trick.  Same number of lines, and nearly
the same number of compiled commands, but the end result may not justify
the untidy code unless you are only being graded on bytes or interesting 
techniques instead of readabiliy.</p>

<?PHP ShowExampleFile('deletenode.c') ?>

<p>This function just deletes the Nth node in the list.  It can easily be
adapted to deleting a specific value, if you so desire.  There's one more
assignment in the beginning two extra assignments in the while loop and that
XOR in there too.  Likely, it will be 1/2 the speed, just like above, merely
because we have to pass double the amount of assembler instructions around
(depending on how it gets compiled).  The rest of the function just contains
an extra XOR here and there, nothing to really worry about.

<p>Now comes the fun part.  Testing.  I wrote a tiny little program that is
identical for each list structure.  I've coded the algorithms in separate
files.  When I compile them and strip them, this is the sizes that I see:

<?PHP ShowExample(trim(
'for F in countnodes deletenode insertvalue; do (
   gcc -Os -Wall -o ${F}.o ${F}.c; strip ${F}.o; ); done

ls -l normal_version/*.o
-rw-r--r--  1 root root  496 Jan 22 21:01 countnodes.o
-rw-r--r--  1 root root  560 Jan 22 21:01 deletenode.o
-rw-r--r--  1 root root  548 Jan 22 21:01 insertvalue.o

ls -l xor_version/*.o
-rw-r--r--  1 root root  504 Jan 22 21:01 countnodes.o
-rw-r--r--  1 root root  580 Jan 22 21:01 deletenode.o
-rw-r--r--  1 root root  564 Jan 22 21:01 insertvalue.o
')); ?>

<p>As you can see, only very minor changes in size, the largest is a
difference of 20 bytes.  However it all depends on where those bytes are,
because if they are in the time-consuming <tt>while</tt> loops, then those
extra instructions could consume a lot of time.</p>

<p>I ran my test program five times on each list, altertating between
them, and tallied the amount of user time each one took.  I have two tests.
The insert test just seeds the random number generator with a static value,
make a node with a random number, and insert the node into the ordered list
with the insert function above.  The delete function just inserts a bunch of
numerically descending values (very fast to insert them) and deletes the Nth
node, determined "randomly" using the statically seeded random number
generator.  I ran each test for both versions with 10,000, 20,000, and
30,000 inserts and deletes.  The average times are listed below.

<?PHP ShowExample(
'ITERATIONS   INSERT   DELETE
  10,000      0.306    0.382
  20,000      3.566    3.834
  30,000     13.988   14.092',
'ITERATIONS   INSERT   DELETE
  10,000      0.350    0.484
  20,000      3.244    4.312
  30,000     14.282   14.124'); ?>

<p>The normal linked list should be faster than the XOR version, but since I
tested the program on my web server (the nicest machine I have available to
me for testing), and it could be doing stuff in the background, I tried to
alternate the tests and then run them multiple times to average things out.
I don't know why the insertion of 20,000 values for the normal list takes
less time than with the XOR version.  Let's just mark that up to a fluke.
The rest all expectedly bigger, but not a standard percentage &ndash; it
ranges from 0.2% to 26.7% longer for the XOR version.  Maybe all of the data
I've collected is a fluke?</p>

<p>Anyway, this is a very interesting idea and if you can handle the minor
drawback of the extra time, it can save a lot of space.  For about 10%
longer, you can have a list of 20,000 entries save you 160k in memory (8
bytes per pointer, 20,000 pointers).  It could also make allocation easier
for the OS since you need smaller structures.</p>

<p>There is nothing bad about trying something out to see if it suits your
needs better.  I'm not saying this is the end-all best solution.  It just
can help out a lot.</p>

<ul>
<li><a href="lists.tar.gz">Download the Code</a> - Code for all of the above
examples, the testing program, and list definitions.  Just change to the
appropriate directory and issue a "make" command.  This was compiled under
Linux, but most other platforms should be able to handle it with minor (if
any) changes.
<li><a href="http://www.linuxjournal.com/article/6828">Linux Journal
Article</a> - Where the idea was described, but since it requires
subscription or something to get the code ....  Besides, it didn't do a good
enough job in my opinion.  Everyone needs more code ... <i>more code</i> ...
MORE CODE!
</ul>

<?PHP

StandardFooter();


function ShowExampleFile($fn)
{
   $a = file('normal/' . $fn);
   while ($a[0][0] == '#')
      array_shift($a);
   $a = implode('', $a);
   $a = trim($a);
      
   $b = file('diff/' . $fn);
   while ($b[0][0] == '#')
      array_shift($b);
   $b = implode('', $b);
   $b = trim($b);
      
   ShowExample($a, $b);
}


function ShowExample($a, $b = false)
{
?><table align=center cellpadding=0 cellspacing=0><tr><td><?PHP
MakeBoxTop();
?><pre style="font-size:85%"><?= htmlspecialchars($a) . "\n" ?></pre><?PHP
MakeBoxBottom();
?></td><?PHP if ($b !== false ) { ?><td>&nbsp;&nbsp;&nbsp;&nbsp;</td><td><?PHP
MakeBoxTop();
?><pre style="font-size:85%"><?= htmlspecialchars($b) . "\n" ?></pre><?PHP
MakeBoxBottom();
?></td><?PHP } ?></tr></table><?PHP
}
	