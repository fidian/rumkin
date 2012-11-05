<?php


// -*- text -*-
include'../../functions.inc';
StandardHeader(array(
		'title' => 'Database Format',
		'topic' => 'dnd_helper'
	));

?>

<p>This page will give you a detailed, extra geeky definition of the format
of the Palm OS database that D&amp;D Helper uses.  If you are not a computer
nut, turn back!</p>

<?php Section('General Database Format'); ?>

<p>Below is the format for the general database.  Records are numbered
sequentially, starting at 0.  The database has a "header" record (#0),
then is followed by different sections that contain the data.</p>

<ul>
<li>Record 0:  Database header
  <ul>
  <li>Version [2 bytes]:  Version number of database.  Currently 1.  Version
    0 was depreciated.</li>
  <li>Flags [2 bytes]:  Flags for the database.
    <ul>
    <li>0x0001 : Generate multiple entries (good for word generators)</li>
    </ul>
  </li>
  <li>Section Record Counts [2 bytes per section]:  Number of records for
    each section.  Minimum of 1.</li>
  </ul>
</li>
<li>Records 1-n:  Sections  (one or more of the following)
  <ul>
  <li>Random Entry</li>
  <li>Letter Pairing</li>
  <li>Phrase-Structure Rule Grammar</li>
  </ul>
</li>
</ul>

<?php Section('Random Entry section'); ?>

<p>This type of section is a "pick one of the following" type of list.  Good
for lists of riddles, random situations, etc.</p>

<ul>
<li>First Record:  Header
  <ul>
  <li>Type [2 bytes]:  0</li>
  <li>Flags [2 bytes]:
    <ul>
    <li>0x0001 : Use random chances (see Chances below)</li>
    </ul>
  </li>
  <li>Items [2 bytes]:  Number of items in this section.  This shouldn't
    match the number of records unless you only put one entry in each 
    record.</li>
  </ul>
</li>
<li>All the rest in the section:  Data records
  <ul>
  <li>Number of entries in this record [2 bytes]:  Multiple entries can be
    combined into a single record, saving space and making the database much
    faster when transferring to the Palm.  This works better with smaller
    data, such as wordlists, but doesn't really lose anything with larger
    records.</li>
  <li>Chance and Offset Array [2 or 4 bytes per entry]:
    <ul>
    <li>Chance [2 bytes]:  The chance for this entry.  If chances are not
      used, these two bytes are omitted from the record.  Entries are sorted
      in ascending chance order.  (see Chances below)</li>
    <li>Offset [2 bytes]:  The offset from the beginning of the record 
      where this entry starts.  The entry must be terminated with a NULL.</li>
    </ul>
  </li>
  <li>Entries:  Each entry is a null-terminated string.  This contains the 
    riddle, situation, word, or whatever data the entry contains.  Max size 
    is unknown, but is probably limited by the OS to whatever you can fit in
    a single record, which is a little under 64k.</li>
  </ul>
</li>
</ul>

<?php Section('Letter Pairs section'); ?>

<p>One method of building words is to analyze a list of words from a
language and figuring out what two letters start words.  Then you see what
letters possibly follow those two letters and add the third letter.  You
repeat until you end the word by randomly picking two letters at the end of
the word or until a maximum word length is reached.</p>

<p>It is strongly suggested that you use random chances with this method of
word creation.  One good example of why is in the English language, the
letter Q is almost always followed by U.  So, let's assume that our rules
have Q always followed by U.  With chances enabled, you'll see the letter U
after every Q unless the word is just too long and had to be stopped.
Without chances in the database, the letter U has a 50% chance of showing
up.  If U is not picked, the word will be ended.  This is not exactly what
people would like.  However, adding chance data increases the database size
a lot (over doubles the size), but produces much better results.</p>

<ul>
<li>First Record:  Header
  <ul>
  <li>Type [2 bytes]:  1</li>
  <li>Flags [2 bytes]:
    <ul>
    <li>0x0001 : Use random chances (see Chances below)
    </ul>
  </li>
  <li>Maximum Length:  The maximum length of the word.  <i>Note:  I'd like to
    have the length taper instead of just snipping it right now.</i></li>
  <li>Starting Pairs:  (one or more of these)
    <ul>
    <li>Chance [2 bytes]:  The chance that this letter pair is used.  If
      not using random chances, these two bytes are omitted from the record.
      (see Chances below)</li>
    <li>Starting pair [2 bytes]:  Two letters that words could start
      with.</li>
    </ul>
  </li>
  </ul>
</li>
<li>All the rest in the section:  Data records
  <ul>
  <li>Starting Letter [1 byte]:  The first letter of the pair.</li>
  <li>Entries [1 byte]:  Number of entries of letters that can follow the
    starting letter.</li>
  <li>Second Letter Definition: (one of these per Entries)
    <ul>
    <li>Second letter [1 byte]:  The second letter of the pair</li>
    <li>Third letter options [1 byte]:  Number of potential third letters
      that follow the letter pair.</li>
    </ul>
  </li>
  <li>Third Letter Definition: (one of these per Third letter options per
    Entries):
    <ul>
    <li>Chance [2 bytes]:  The chance for this ending.  If chances are not 
      used, these two bytes are omitted from the record.
      If chances are used and the is no chance high enough, the word is
      considered finished (just like adding 0xFFFF for the chance and 0x00
      for the character, but it saves 3 bytes).  (see Chances below)</li>
    <li>Next Letter [1 byte]:  A letter that could follow the letter 
      pairs.  If not using chances, you should use 0x00 to signify that the
      next "letter" is actually the end of the word.</li>
    </ul>
  </li>
  </ul>
</li>
</ul>

<?php Section('Phrase-Structure Rule Grammar section'); ?>

<p>Based on phrase-structure rules, this section has the potential to create
words, sentences, phrases, spell names, and darn near everything else and
can be a lot smaller than the letter pairing section or the random entry
section.</p>

<p>This is based on trees, where one rule can expand into multiple rules.
Search for <a
href="http://www.google.com/search?q=%22phrase+structure+rules%22+examples">phrase
structure rules examples</a> on <a
href="http://www.google.com/">Google</a>.  If you are not a good programmer
and you have generated a PSR tree that you want made into a database for
this application, I'd be happy to do that for you.  You can even check out
my <a href="psr.php">PSR Format</a> page to see how to make a file that I
can read.  It has examples and describes the process.  Still, if that seems
daunting, just give me one or more tables that a DM can roll on to see what
happens, and I can easily take care of converting it to PSR.</p>

<p>For a good description of what PSR is and how I use it, take a look at my
<a href="psr.php">PSR Format</a> page.  If you are not a good programmer and
the description page doesn't do it for you, I'd be happy to help out.  Just
provide for me a table that a DM would roll on to see what happens, and I'll
make it PSR.  If you want to expand it a little, I'm sure we can work things
out.</p>

<p>If you are trying to create a database from scratch or with an
application (not using the format illustrated <a href="psr.php">here</a> and
not using the <a href="download/dnd_helper.inc">PHP class</a>), then you
will need to get into these gory details.  Sorry, but it is hard to describe
this format without some really bad examples.</p>

<p>Imagine that W is a rule that is define to generate a word, such as
"desk" or "book."  Now, let's say that we want to generate a compound
word with rule C.  The rule C would expand to WW, which means to place
two words together.  This could generate useful words like homework,
bookend, and freemason.  Unfortunately, it could just as easily generate
diskdisk, bubbleslime, and phonetube.  It all depends on how you make 
the rules.</p>

<p>Let's say that we want to generate last names.  Rule L (for Last name)
could potentially expand to WW, just like how C expanded to WW.  We would
want the first letter capitalized.  Also, let's refer to rule W as the 
9th rule in the database...  The record would be (in hex) 
01 03 09 01 01 09 00 (&lt;-- null terminated).  Confusing?  Probably.</p>

<p>The main rule that is always expanded is the first record (#1).</p>

<ul>
<li>First Record:  Header
  <ul>
  <li>Type [2 bytes]:  2</li>
  <li>Flags [2 bytes]:  (none defined yet)</li>
  </ul>
</li>
<li>All the rest in the section:  Data records
  <ul>
  <li>Flags [2 bytes]:
    <ul>
    <li>0x0001 : Use random chances for this rule (see Chances below)
    </ul>
  </li>
  <li>Items [2 bytes]:  Number of possible rules to expand to</li>
  <li>Expanded Rules:  (one or more of the following)
    <ul>
    <li>Chance [2 bytes]:  The chance for this rule.  If chances are not 
      used, these two bytes are omitted from the record.  (see Chances 
      below)</li>
    <li>Expanded rule:  Null-terminated string of data.  Command characters
      may be embedded in the text.  Please see Command Codes.</li>
    </ul>
  </li>
  </ul>
</li>
</ul>

<?php Section('Chances'); ?>

<p>For entries with chances, you wish to assign higher and lower chances to
particular things.  One example is if you are generating a word and you
have a Q.  You would most likely want a U after it and rarely want the word
to stop with just the Q at the end.</p>

<p>A random number is generated (unsigned int, from 0x0000 to 0xFFFF) and
all of the records are scanned with the following algorithm.  The first rule
or option that is available should have the lowest chance number, and the
last one should have the highest (otherwise you'll always get the first 
one).</p>

<ul>
<li>Is this entry's chance number >= my random chance number?
  <ul>
  <li>Yes:  Use this entry.
  <li>No:  Continue on.  If there is nothing else possible, end word/phrase
generation.
  </ul>
</li>
</ul>

<p>(For speed purposes, I use a binary search, but the above algorithm does
the exact same job.)</p>

<?php Section('Command Codes'); ?>

<p>These strings can be embedded into some types (see above) of records.
They tell the program to seek data from elsewhere or to expand to further
rules.</p>

<p>If you are a programmer, you'll notice that indexes start with 1 instead
of 0.  This is because the end of string code is a null, and I want to be
able to easily count the number of records by merely counting the nulls.

<ul>
<li>Command char [1 byte]
  <ul>
  <li>0x01 - Data contains a single byte, which is a number of a rule to
    expand to in the current section.  Rules are numbered starting at 1 
    for the first rule after the header record.</li>
  <li>0x02 - Data contains a single byte, which is a number of a section 
    to expand to.  Sections are numbered starting at 1 for the first 
    section in the file.</li>
  <li>0x03 through 0x06 - Reserved.</li>
  <li>0x07 - There is a flags byte, but no data bytes.  Don't use
    this in your rules.  It is used internally only to help carry the
    flags through the transformations.</li>
  <li>0x08 - There is no flags byte.  The next character (non-null) is
    used literally.  This is only if you absolutely need to add a 0x01 -
    0x08 character in your rules.</li>
  </ul>
</li>
<li>Flags [1 byte]:
  <ul>
  <li>0x01 - Must be set.</li>
  <li>0x02 - Capitalize first letter of generated data</li>
  </ul>
</li>
<li>Data [varies]:  Defined by the command character.  Currently just one
  byte or none at all.</li>
</ul>

<?php

StandardFooter();
