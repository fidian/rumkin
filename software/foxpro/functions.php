<?php

include '../../functions.inc';
StandardHeader(array(
		'title' => 'FoxPro Functions',
		'topic' => 'foxpro'
	));

?>

<p>These utility functions are just designed to do a little task correctly.
They really don't need to be functions, but since I use them all of the
time, I thought that they would be better off in a file that I can use with
"<tt>set procedure to ... additive</tt>".</p>

<ul>
<li><a href="#files">Files</a>
  <ul>
  <li>Delete a file
  <li>Delete a table
  <li>Quickly alter a Visual FoxPro table into a Fox2x (dBase III) table
  </ul>
<li><a href="#status">Status Display</a>
  <ul>
  <li>Say a message
  <li>Have a "progress meter"
  <li>Conditional "SET TALK OFF" and "SET TALK ON"
  </ul>
<li><a href="#strings">Strings</a>
  <ul>
  <li>Random string
  <li>Split a string into an array
  <li>Convert date string into date
  </ul>
<li><a href="#sql">SQL Server</a>
  <ul>
  <li>Upload table to SQL Server from FoxPro
  </ul>
<li><a href="#tables">Tables</a>
  <ul>
  <li>Close a table
  <li>Open a table
  <li>Build a cursor
  <li>See if a tag exists
  <li>List all tags
  <li>Shrink fields to minimum required length
  </ul>
</ul>

<?php Section('<a name="files">Files</a>'); ?>

<p>Here are two functions that delete files.  The first deletes a file if it
exists.  That's nice, since I no longer have to care if a temporary index
file exists or not; I just try to delete it and away I go.  The second will
delete a table, the index file, and the memo file if they exist.</p>

<?php MakeBoxTop('center') ?>
<pre>* Delete a file if it exists.  Returns 1 if file deleted, 0 if not found
function DeleteFile
lparameter m.fn
    if file(m.fn) then
        delete file (m.fn)
	return 1
    endif
    return 0
endfunc

* Deletes a table, index, and memo files if they exist
* Pass in the BASENAME only, do not pass in ".dbf" on the file name
function DeleteTable
lparameter m.fn
    DeleteFile(m.fn + ".dbf")
    DeleteFile(m.fn + ".cdx")
    DeleteFile(m.fn + ".fpt")
endfunc
</pre>
<?php MakeBoxBottom() ?>

<p>If you work in a mixed environment, where some of your tools read and
write Visual FoxPro tables and others only read and write the older style
(fox2x / dBase III), this function will work wonderfully for you.  Just
don't use it on a database that has a memo field.</p>

<p>The function does its job by changing the first byte in the file to 0x03,
which designates that the file is a dbase III table.  Use of this function
on Access databases, text files, or anything else will likely corrupt the
data a bit.</p>

<?php MakeBoxTop('center') ?>
<pre>* Converts a file from Visual FoxPro to a fox2x / dBase III table
* Do not use it if the table has a memo field!
* Returns .T. on success, .F. on error
function fox2x
lparam m.filename
    local m.hndl, m.bbyte
       
    m.hndl = fopen(m.filename, 2)
    if m.hndl <= 0
        wait "ERROR:  Could not open file " + allt(m.filename)
        return .F.
    endif
    =fseek(m.hndl, 0, 0)
    m.bbyte = fread(m.hndl, 1)
    if m.bbyte != chr(3)
        =fseek(m.hndl, 0, 0)
        =fwrite(m.hndl, chr(3))
    endif
    =fclose(m.hndl)
    return .T.
endfunc
</pre>
<?php MakeBoxBottom() ?>
	
<?php Section('<a name="status">Status</a>'); ?>

<p>When I write long programs, I like to know what they are doing and how
soon I can expect when they finish.  This first function, Say(), will write
a message to the console and potentially append a line to the specified
logfile.  That way, you can keep track of where you were even if your
computer locks up.</p>

<p>The next three functions are for when you are iterating through a table.
Before your <tt>scan</tt> or <tt>do while</tt> loop, call ProgressStart().
Then, with every iteration through your records, call ProgressMeter().  When
you are done, ProgressStop().  The ProgressMeter() function will only update
once a second, making sure your program doesn't slow down.  It also
estimates the amount of time left, so you are always "in the know."</p>

<?php MakeBoxTop('center') ?>
<pre>
function Say
lparameters m.Message, m.LogFile
    local m.writeStr, m.logFp
    
    m.writeStr = '[' + transform(datetime()) + ']  ' + m.Message
    
    if type('m.LogFile') == 'C'
        m.logFp = fopen(m.LogFile, 12) && Try to open the file
	if m.logFp == -1
	    m.logFp = FCreate(m.LogFile) && Try to create it
	else
	    fseek(m.logFp, 0, 2) && Go to the end of the file
	endif
	if m.logFp >= 0 && If no error, write to file
	    =fputs(m.logFp, m.writeStr)
	endif
	=fclose(m.logFp)
    endif
    
    ? m.writeStr
endfunc


function ProgressStart
    public m.ProgressLastUpdate
    public m.ProgressFirstTime
    m.ProgressLastUpdate = int(seconds())
    m.ProgressFirstTime = seconds()
    wait "Working:  " + allt(str(recno())) + "/" + allt(str(reccount())) + "  " + ;
        allt(str(100 * recno() / reccount(), 10, 1)) + "%" window nowait
endfunc


function ProgressMeter
lparam m.recno
	public m.ProgressLastUpdate
	public m.ProgressFirstTime
	local m.mesg, m.timediff
	if m.ProgressLastUpdate == int(seconds())
		return
	endif
	m.ProgressLastUpdate = int(seconds())
	m.timediff = int(((seconds() - ProgressFirstTime) / recno()) * (reccount() - recno()))
	m.mesg = ':' + padl(allt(str(mod(m.timediff, 60))), 2, '0')
	m.timediff = int(m.timediff / 60)
	if (m.timediff >= 60) then
		m.mesg = ':' + padl(allt(str(mod(m.timediff, 60))), 2, '0') + m.mesg
		m.timediff = int(m.timediff / 60)
	endif
	m.mesg = allt(str(m.timediff)) + m.mesg
	if type('m.recno') != 'N'
		m.recno = recno()
	endif
	m.mesg = "Working:  " + allt(str(m.recno)) + "/" + allt(str(reccount())) + "  " + ;
        allt(str(100 * m.recno / reccount(), 10, 1)) + "%  ETA: " + m.mesg
        
    wait m.mesg window nowait
endfunc


function ProgressStop
	wait clear
endfunc
</pre>
<?php MakeBoxBottom() ?>

<p>I find it annoying to have to "SET TALK ON", "SET TALK OFF", "SET TALK
ON", etc.  I also find it irritating that I need to sometimes check the
status of TALK, then possibly turn it off and process and turn it back on.
These two functions will help you out.  Do not call Hush() again until after
you call UnHush() &ndash; the functions won't work well that way.</p>

<?php MakeBoxTop('center') ?>
<pre>* Equivalent to a "SET TALK OFF"
function Hush
    public m.UnHushTalkOn
	
    if sys(103) = "ON"
        set talk off
        m.UnHushTalkOn = .T.
    endif
endfunc


* Checks if TALK used to be ON.  If so, turns it back on
function UnHush
    public m.UnHushTalkOn

    if type('m.UnHushTalkOn') = 'L'
        if m.UnHushTalkOn == .T.
            m.UnHushTalkOn = .F.
            set talk on
        endif
        release m.UnHushTalkOn
    endif
endfunc
</pre>
<?php MakeBoxBottom() ?>

<?php Section('<a name="strings">Strings</a>'); ?>

<p>Ever need to generate a random ID?  Try this code out.</p>

<?php MakeBoxTop('center') ?>
<pre>* Initialize the random number generator
rand(-1)

* Print a random string.
? RandomString(10)  && 10 letters long, 0-9 and A-Z
? RandomString(32, '0123456789ABCDEF')  && 32 long, hexadecimal characters
? RandomString(8, '01') && Looks like a byte in binary

function RandomString
parameters m.n, m.letters
	m.q = ""
	if type('m.letters') != 'C' or len(m.letters) == 0
		m.letters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	endif
	do while len(m.q) < m.n
		m.q = m.q + substr(m.letters, int(rand() * len(m.letters)) + 1, 1)
	enddo
	return m.q
endfunc
</pre>
<?php MakeBoxBottom() ?>

<p>I felt saddened that FoxPro didn't have a built-in split() or explode()
function to turn a string into an array.  Since I wrote this function, I am
sad no longer!</p>

<?php MakeBoxTop('center') ?>
<pre>* First, declare an array
dimension m.arr(1)

* Now split a string on spaces
split(' ', 'Break this up into individual words.', @m.arr)

function Split
lparam m.delim, m.str, m.arr
    local m.i, m.c, m.pos

    * Count the delimeters in the string to make the array the right size
    m.c = 1
    do while at(m.delim, m.str, m.c) != 0
        m.c = m.c + 1
    enddo

    dimension m.arr(m.c)

    for m.i = 1 to m.c
        m.pos = at(m.delim, m.str)
        if m.pos == 0
            m.pos = len(m.str) + 1
        endif
        m.arr(m.i) = substr(m.str, 1, m.pos - 1)
        m.str = substr(m.str, m.pos + len(m.delim), len(m.str))
    next
	
    return m.arr
endfunc
</pre>
<?php MakeBoxBottom() ?>

<p>If you looked at dtos(), you will realize that there is no opposite!
There is no stod() and from what I can tell, there is no easy transform() to
convert it back into a date.  The function below is the opposite of
dtos().</p>

<?php MakeBoxTop('center') ?>
<pre>* The opposite of dtos(m.date) or dtoc(m.date, 1)
function stod
lparam m.c
    local m.d, m.m, m.y

    m.c = allt(m.c)
    if type('m.c') != 'C' or len(m.c) != 8
        return {//}
    endif

    m.d = val(right(m.c, 2))
    m.m = val(substr(m.c, 5, 2))
    m.y = val(left(m.c, 4))
    if m.d < 1 or m.m < 1 or m.y < 100
        return {//}
    endif

    return date(m.y, m.m, m.d)
endfunc
</pre>
<?php MakeBoxBottom() ?>

<?php Section('<a name="sql">SQL Server</a>'); ?>

<p><b>Upload Fox to SQL Server</b> - Creates a table and copies the data
to SQL Server via an ODBC connection.  It is slightly slower than BCP, but
it massages the data better, especially if your table is giving you
problems.</p>

<p><a href="functions/upload_fox_to_sql.prg">upload_fox_to_sql.prg</a></p>

<?php Section('<a name="tables">Tables</a>'); ?>

<p>Sometimes, I write code that could close a table in one instance and will
keep it open in another.  I wrote a function to close a table by name if it
is open.  At other times, I will want to open a table with a specific name
when I already have one open.  In this instance, let's close the old one and
open the new one.</p>

<?php MakeBoxTop('center') ?>
<pre>* Closes a table if it is open
function CloseTable
lparameter m.Name
    if used(m.Name) then
       use in (m.Name)
    endif
endfunc

* Opens a table (potentially closing one with the same name)
* Opens exclusively if you like
function OpenTable
lparameters m.fn, m.name, m.ex
    CloseTable(m.name)
    if (m.ex) then
        use (m.fn) in 0 alias (m.name) excl
    else
        use (m.fn) in 0 alias (m.name) shar
    endif
endfunc
</pre>
<?php MakeBoxBottom() ?>

<p>One thing you can do if your data set is really large is to break it into
sections.  Then, you just run your "select * from TABLE into cursor NAME"
repeatedly and append the results into a writeable cursor.  This is also
great if you need to change the default read-only cursor into a read-write
cursor.</p>

<?php MakeBoxTop('center') ?>
<pre>scan for ...
    * The "NOFILTER" is mandatory for build_cursor()
    select * from TABLE where ... into cursor temp nofilter
    build_cursor('everything', 'temp')
    use in temp
endscan
* Now you have all of the records in the cursor "everything"

* Turn a read-only cursor into a read-write cursor
select * from TABLE into cursor ReadOnly nofilter
build_cursor('ReadWrite', 'ReadOnly')

* Create a writeable cursor or append to a cursor
function build_cursor
lparameters m.dest, m.src
	local m.orig_alias, m.build_tmp
	
	m.build_tmp = sys(2015)
	m.orig_alias = alias()
	
	if ! used(m.dest)
		select * from alias(m.src) where .F. into cursor (m.build_tmp) nofilter
		use dbf(m.build_tmp) again in 0 alias (m.dest) excl
		use in (m.build_tmp)
	endif
	
	select (m.dest)
	append from dbf(m.src)
	
	if ! empty(m.orig_alias)
		select (m.orig_alias)
	endif
endfunc
</pre>
<?php MakeBoxBottom() ?>

<p>Can't remember if you added that tag to the table?  Need to reindex table
"B" with the same indexes as table "A"?</p>

<?php MakeBoxTop('center') ?>
<pre>use SOME_TABLE
if ! TagExists('itemNo')
    index on itemno tag itemno
endif

* Copy "index on ..." statements to clipboard
use THE_TABLE
ListIndexes()

* Returns .T. if the named tag exists in the currently open table
function TagExists
lparam m.nam
    local m.i, m.tnam
    
    m.nam = allt(upper(m.nam))
    m.i = 1
    m.tnam = tag(m.i)
    do while len(m.tnam) > 0
        if (m.nam == m.tnam and m.tnam == m.nam)
            return .T.
        endif
        m.i = m.i + 1
        m.tnam = tag(m.i)
    enddo
    return .F.
endfunc

* Displays a list of "index on ..." statements that were used
* to build all of the indexes on the current table.  Also copies
* them to the clipboard so you can paste them into whatever you like.
function ListIndexes
    m.taglist = ""
    for i = 1 to tagcount()
        m.singletag = "index on " + sys(14, i) + " tag " + tag(i)
        m.taglist = m.taglist + m.singletag + chr(13) + chr(10)
    next
    ? m.taglist
    _CLIPTEXT = m.taglist
    ? "Index dump done - copied to clipboard"
endfunc
</pre>
<?php MakeBoxBottom() ?>

<p>If you have a table with character fields that is taking up a lot of
space, you can shrink the character fields to be just the size of the
longest field with <a
href="functions/shrink_fields.prg">shrink_fields.prg</a>.  It only works
with character fields, but can easily be extended to work with other types,
such as numeric fields.</p>

<?php

StandardFooter();
