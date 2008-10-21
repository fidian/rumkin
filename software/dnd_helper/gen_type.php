<?PHP // -*- text -*-

include("../../functions.inc");

StandardHeader(array('title' => 'Generation Types',
                     'topic' => 'dnd_helper'));

?>

<p>D&amp;D helper uses different types of databases to generate words,
riddles, names, and more.  To see what a particular type of database
something is, just refer to this chart:</p>

<dl>

<dt><b>Pick</b></dt>
<dd>Instead of "generating" something, this file contains a really big 
list of words, names, or whatever.  It then just picks one from the list.</dd>
<dd><i>Advantage:</i>  The results are really nice.  They are actual
words/names instead of ones that were assembled.  This also works for other
things, like random riddles.</dd>
<dd></i>Disadvantage:</i>  The database is larger.  Usually much larger than
the <b>Gen</b> or <b>Small</b> types.  It also has a very finite number of
names that can be generated.  <b>Gen</b> and <b>Small</b> can generate a lot
more using a smaller database.</dd>

<dt><b>Gen</b></dt>
<dd>Using a letter pair <a href="format.php">algorithm</a>, this will
assemble a word for you.  It also knows what letters should be added onto
the word while it is building it.  For example, in English, the letter 'q'
is almost always followed by 'u'.  <b>Gen</b> keeps track of that
information.</dd>
<dd><i>Advantage:</i>  Words and names that are generated in this fashion
look like they belong to the language.</dd>
<dd><i>Disadvantage:</i>  Even though it is usually smaller than
<b>Pick</b>, the database can still be larger than <b>Small</b>.

<dt><b>Small</b></dt>
<dd>This is the same as <b>Gen</b>, except it doesn't keep track of the
likelyhood that a specific letter follows the first one.  It just keeps
track of wheter it happened at all.
<dd><i>Advantage:</i>  The database is smaller than <b>Gen</b>.
<b>Small</b> can also produce wilder results because it has less
restrictions.</dd>
<dd><i>Disadvantage:</i>  The words are sometimes unpronouncable, don't look
like they belong to the intended language, and frequently give really odd
results.</dd>
<dd><i>Special Notes:</i>  This database format usually produces very poor
results and will only be used if I can not get enough data to use a
<b>Gen</b> style database.</dd>

<dt><b>PSR</b></dt>
<dd>This takes a tree of rules and expands each branch in order to come up
with the result.  If written properly, this can make extremely realistic
names without the size of <b>Gen</b> or <b>Small</b>.  It can create
sentences, paragraphs, plots, and much more without the size of
<b>Pick</b>.</dd>
<dd><i>Advantage:</i>  The database is usually significantly smaller than an
equivalent <b>Small</b> or <b>Pick</b> database.</dd>
<dd><i>Disadvantage:</i>  It takes time to create the complicated rules,
which must be created by hand.</dd>

</dl>

<?PHP

StandardFooter();
