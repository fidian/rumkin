---
title: Developer Information
---

If you do not write Palm programs, you might want to head over to the [main D&D Helper page](../) now.  This information gets quite technical.


Database Format Overview
------------------------

D&D helper uses different types of databases to generate words, riddles, names, and more.  To see what a particular type of database something is, just refer to this list:


### Pick

Instead of "generating" something, this file contains a really big list of words, names, or whatever.  It then just picks one from the list.

*Advantage:*  The results are really nice.  They are actual words/names instead of ones that were assembled.  This also works for other things, like random riddles.

*Disadvantage:*  The database is larger.  Usually much larger than the Gen or Small types.  It also has a very finite number of names that can be generated.  Gen and Small can generate a lot more using a smaller database.


### Gen

Using a letter pair algorithm, this will assemble a word for you.  It also knows what letters should be added onto the word while it is building it.  For example, in English, the letter 'q' is almost always followed by 'u'.  Gen keeps track of that information.

*Advantage:*  Words and names that are generated in this fashion look like they belong to the language.

*Disadvantage:*  Even though it is usually smaller than Pick, the database can still be larger than Small.


### Small

This is the same as Gen, except it doesn't keep track of the likelihood that a specific letter follows the first one.  It just keeps track of whether it happened at all.

Small can also produce wilder results because it has less restrictions.

*Advantage:*  The database is smaller than Gen.

*Disadvantage:*  The words are sometimes not able to be pronounced, don't look like they belong to the intended language, and frequently give really odd results.

*Special Notes:*  This database format usually produces very poor results and will only be used if I can not get enough data to use a Gen style database.


### **PSR**

This takes a tree of rules and expands each branch in order to come up with the result.  If written properly, this can make extremely realistic names without the size of Gen or Small.  It can create sentences, paragraphs, plots, and much more without the size of Pick.

*Advantage:*  The database is usually significantly smaller than an equivalent Small or Pick database.

*Disadvantage:*  It takes time to create the complicated rules, which must be created by hand.


PSR Format
----------

This is what I start with when making PSR database entries.  This is the most flexible database format that D&D Helper supports.  Briefly, it expands a rule into text and other rules.

For example, let's try to make a database say "Jack is going to the store."  All examples are real and do work in my parser.  The files are all simple text files.  The source file to generate the sentence is quite simple:

    * MAIN
    Jack is going to the store.

The first rule in the file is considered the starting rule.  So, we start with `[MAIN]` and we pick a random rule.  Since there is only one, we pick that one.  Let's make this a little more complex by changing the name and the destination.

    * MAIN
    [NAME] is going to the [PLACE].

    * NAME
    Timothy
    Jack
    Greg

    * PLACE
    library
    store
    shed

With the above rules, we can get "Timothy is going to the shed.", "Jack is going to the library.", "Greg is going to the shed." and others.  In fact, by having 3 names and 3 destinations, we can get a total of 9 different sentences.

Let's make this a bit more interesting and add more description.

    * MAIN
    [NAME] is [JOINER] the [PLACE].
    At the [PLACE], you will find [NAME].

    * NAME
    Timothy
    Jack
    Greg
    Steve

    * PLACE
    library
    store
    shed

    * JOINER
    [WALK] [TO_FROM]
    going to
    coming from

    * WALK
    running
    walking
    skipping
    hopping
    hobbling
    crawling

    * TO_FROM
    to
    from
    towards
    away from
    nearby

With this lengthy example, you can get a bunch of different possibilities.  "Jack is coming from the shed."  "Timothy is crawling nearby the library."  "Steve is walking away from the store."  You can see a bunch of possibilities.

By adding another five names or other places, you get the possibility to create many other phrases.  By adding more variances, you can get more flavor in your statements.

With the above example, you will notice that the `JOINER` only expands to three possible rules.  The first rule, "`[WALK] [TO_FROM]`" can expand to many possibilities, but it only has a 1/3 chance of being picked if `JOINER` is used.  To make the output look better, we should have the "`[WALK] [TO_FROM]`" rule get used more often.

    * JOINER
    10:[WALK] [TO_FROM]
    1:going to
    1:coming from

With a `JOINER` section like this, we give preference to the first rule.  Essentially, we add the numbers on all of the rules.  Then, we pick a random number, then check to see which rule gets it.  10 + 1 + 1 = 12.  Picking a random number, 4, means that we use the first rule.  If I pick 11 or 12, we use the boring "going to" or "coming from" rules.  Essentially, the first rule is 10 times more likely to get picked than either of the "average" rules.

    # This is a completely different example.
    # Do not just add this to the above PSR rules
    #
    # Also, any line starting with a # is considered
    # a comment and will be ignored.

    * NEW_EXAMPLE
    Pick up [OBJECT].  [^OBJECT] is over there.

    * OBJECT
    the sword
    an apple
    a kitten

This example illustrates how you can capitalize the first letter in an expanded rule.  The first rule picks two objects (they may be different or the same) and the second object has its first letter capitalized.  "Pick up the sword.  A kitten is over there."  "Pick up an apple.  An apple is over there."  "Pick up a kitten.  An apple is over there."  Additionally, it shows how you can add comments to your PSR files.

The file format also supports long lines -- just use something like this:

    This is one really big line.  I continue it to \
    the next line by having a single backslash at \
    the end.

Lastly, if you have `[[]`, `[]]`, `[*]`, or `[#]` in your rules, it will convert that into just the `[`, `]`, `*`, or `#` character, respectively.  Newlines can be added by using `\n`.


Database Format
---------------


Below is the format for the general database.  Records are numbered
sequentially, starting at 0.  The database has a "header" record (#0),
then is followed by different sections that contain the data.


* Record 0:  Database header
    * Version [2 bytes]:  Version number of database.  Currently 1.  Version 0 was depreciated.
    * Flags [2 bytes]:  Flags for the database.
        * 0x0001 : Generate multiple entries (good for word generators)
    * Section Record Counts [2 bytes per section]:  Number of records for each section.  Minimum of 1.
* Records 1-n:  Sections  (one or more of the following)
    * Random Entry
    * Letter Pairing
    * Phrase-Structure Rule Grammar


Random Entry Section
--------------------

This type of section is a "pick one of the following" type of list.  Good
for lists of riddles, random situations, etc.

* First Record:  Header
    * Type [2 bytes]:  0
    * Flags [2 bytes]:
        * 0x0001 : Use random chances (see Chances below)
    * Items [2 bytes]:  Number of items in this section.  This shouldn't match the number of records unless you only put one entry in each record.
* All the rest in the section:  Data records
    * Number of entries in this record [2 bytes]:  Multiple entries can be combined into a single record, saving space and making the database much faster when transferring to the Palm.  This works better with smaller data, such as wordlists, but doesn't really lose anything with larger records.
        * Chance and Offset Array [2 or 4 bytes per entry]:
        * Chance [2 bytes]:  The chance for this entry.  If chances are not used, these two bytes are omitted from the record.  Entries are sorted in ascending chance order.  (see Chances below)
        * Offset [2 bytes]:  The offset from the beginning of the record where this entry starts.  The entry must be terminated with a NULL.
    * Entries:  Each entry is a null-terminated string.  This contains the riddle, situation, word, or whatever data the entry contains.  Max size is unknown, but is probably limited by the OS to whatever you can fit in a single record, which is a little under 64k.


Letter Pairs Section
--------------------

One method of building words is to analyze a list of words from a language and figuring out what two letters start words.  Then you see what letters possibly follow those two letters and add the third letter.  You repeat until you end the word by randomly picking two letters at the end of the word or until a maximum word length is reached.

It is strongly suggested that you use random chances with this method of word creation.  One good example of why is in the English language, the letter Q is almost always followed by U.  So, let's assume that our rules have Q always followed by U.  With chances enabled, you'll see the letter U after every Q unless the word is just too long and had to be stopped.  Without chances in the database, the letter U has a 50% chance of showing up.  If U is not picked, the word will be ended.  This is not exactly what people would like.  However, adding chance data increases the database size a lot (over doubles the size), but produces much better results.

* First Record:  Header
    * Type [2 bytes]:  1
    * Flags [2 bytes]:
        * 0x0001 : Use random chances (see Chances below)
    * Maximum Length:  The maximum length of the word.  *Note:  I'd like to have the length taper instead of just snipping it right now.*
    * Starting Pairs:  (one or more of these)
        * Chance [2 bytes]:  The chance that this letter pair is used.  If not using random chances, these two bytes are omitted from the record.  (see Chances below)
        * Starting pair [2 bytes]:  Two letters that words could start with.
* All the rest in the section:  Data records
    * Starting Letter [1 byte]:  The first letter of the pair.
    * Entries [1 byte]:  Number of entries of letters that can follow the starting letter.
    * Second Letter Definition: (one of these per Entries)
        * Second letter [1 byte]:  The second letter of the pair
        * Third letter options [1 byte]:  Number of potential third letters that follow the letter pair.
    * Third Letter Definition: (one of these per Third letter options per Entries):
        * Chance [2 bytes]:  The chance for this ending.  If chances are not used, these two bytes are omitted from the record.  If chances are used and the is no chance high enough, the word is considered finished (just like adding 0xFFFF for the chance and 0x00 for the character, but it saves 3 bytes).  (see Chances below)
        * Next Letter [1 byte]:  A letter that could follow the letter pairs.  If not using chances, you should use 0x00 to signify that the next "letter" is actually the end of the word.


Phrase-Structure Rule Grammar Section
-------------------------------------

Based on phrase-structure rules, this section has the potential to create words, sentences, phrases, spell names, and darn near everything else and can be a lot smaller than the letter pairing section or the random entry section.

This is based on trees, where one rule can expand into multiple rules.  Search for [phrase structure rules examples](http://www.google.com/search?q=%22phrase+structure+rules%22+examples) on Google.

If you are trying to create a database from scratch or with an application (not using the format illustrated here and not using the [PHP class](../download/), then you will need to get into these gory details.  Sorry, but it is hard to describe this format without some really bad examples.

Imagine that W is a rule that is define to generate a word, such as "desk" or "book."  Now, let's say that we want to generate a compound word with rule C.  The rule C would expand to WW, which means to place two words together.  This could generate useful words like homework, bookend, and freemason.  Unfortunately, it could just as easily generate diskdisk, bubbleslime, and phonetube.  It all depends on how you make the rules.

Let's say that we want to generate last names.  Rule L (for Last name) could potentially expand to WW, just like how C expanded to WW.  We would want the first letter capitalized.  Also, let's refer to rule W as the 9th rule in the database...  The record would contain the following sequence of bytes as its "expanded rule" (in hex) 01 03 09 01 01 09 00 (&lt;-- null terminated).  Confusing?  Probably.

The main rule that is always expanded is the first record (#1).

* First Record:  Header
    * Type [2 bytes]:  2
    * Flags [2 bytes]:  (none defined yet)
* All the rest in the section:  Data records
    * Flags [2 bytes]:
        * 0x0001 : Use random chances for this rule (see Chances below)
    * Items [2 bytes]:  Number of possible rules to expand to
    * Expanded Rules:  (one or more of the following)
        * Chance [2 bytes]:  The chance for this rule.  If chances are not used, these two bytes are omitted from the record.  (see Chances below)
        * Expanded rule:  Null-terminated string of data.  Command characters may be embedded in the text.  Please see Command Codes.


Chances
-------

For entries with chances, you wish to assign higher and lower chances to particular things.  One example is if you are generating a word and you have a Q.  You would most likely want a U after it and rarely want the word to stop with just the Q at the end.

A random number is generated (unsigned int, from 0x0000 to 0xFFFF) and all of the records are scanned with the following algorithm.  The first rule or option that is available should have the lowest chance number, and the last one should have the highest (otherwise you'll always get the first one).

* Is this entry's chance number >= my random chance number?
    * Yes:  Use this entry.
    * No:  Continue on.  If there is nothing else possible, end word/phrase generation.

(For speed purposes, I use a binary search, but the above algorithm does the exact same job.)


Command Codes
-------------

These strings can be embedded into some types (see above) of records.  They tell the program to seek data from elsewhere or to expand to further rules.

If you are a programmer, you'll notice that indexes start with 1 instead of 0.  This is because the end of string code is a null, and I want to be able to easily count the number of records by merely counting the nulls.

* Command char [1 byte]
    * 0x01 - Data contains a single byte, which is a number of a rule to expand to in the current section.  Rules are numbered starting at 1 for the first rule after the header record.
    * 0x02 - Data contains a single byte, which is a number of a section to expand to.  Sections are numbered starting at 1 for the first section in the file.
    * 0x03 through 0x06 - Reserved.
    * 0x07 - There is a flags byte, but no data bytes.  Don't use this in your rules.  It is used internally only to help carry the flags through the transformations.
    * 0x08 - There is no flags byte.  The next character (non-null) is used literally.  This is only if you absolutely need to add a 0x01 - 0x08 character in your rules.
* Flags [1 byte]:
    * 0x01 - Must be set.
    * 0x02 - Capitalize first letter of generated data
* Data [varies]:  Defined by the command character.  Currently just one byte or none at all.
