<?php

include '../../functions.inc';
StandardHeader(array(
		'title' => 'FoxPro Packages',
		'topic' => 'foxpro'
	));
$mediaDir = getenv('MEDIABASE') . 'software/foxpro/';

?>

<p>These are all zip files that usually contain a form and likely a library
that performs the task.</p>
	
<ul>
<li><a href="#command">Command Window Simulator</a> (Form)
<li><a href="#exceldde">Excel DDE</a> (Code)
<li><a href="#fiscal">Fiscal Date Functions</a> (Code)
<li><a href="#fuzzy">Fuzzy String Matching</a> (Code)
<li><a href="#getdate">GetDate</a> (Form)
<li><a href="#md5">MD5</a> (Library)
<li><a href="#prompter">Prompter</a> (Form)
<li><a href="#zlib">zlib</a> (Library + Code)
</ul>

<?php Section('<a name="command">Command Window Simulator</a> (Form, ' . FidianFileSize($mediaDir . 'media/command.zip') . ' - <a href="media/command.zip">command.zip</a>)') ?>

<p>Did you ever want to distribute an application but keep the command
window?  Do you have advanced FoxPro users out there that like to type in
their own commands to fix data instead of having them bother IT all of the
time?  Now, you can have your developer with one licenced copy of FoxPro and
distribute your application with this command window emulator.</p>

<p>I found a command window simulator written by Walter Meester and modified
by Eric den Doop at 
<a href="http://www.foxite.com/downloads/default.aspx?id=11">Foxite</a>.  I
altered it a bit more to not require the "READ EVENTS" stuff and handle
"BROWSE" commands a bit better.  These changes were necessary for the
application I was adding it to.  Now, you just need one line to pop open the
form and get the command window simulator running.</p>

<?php MakeBoxTop('center') ?>
<pre>do form Command
* Simple, eh?
</pre>
<?php MakeBoxBottom() ?>

<?php Section('<a name="exceldde">Excel DDE</a> (Code, ' . FidianFileSize($mediaDir . 'media/exceldde.zip') . ' - <a href="media/exceldde.zip">exceldde.zip</a>)'); ?>

<p>You can always use "<tt>copy to FILENAME type xl5</tt>" in order to get
your table in an Excel-ready format, but the formatting sucks.  Actually, it
is a complete and total lack of formatting that sucks.</p>

<p>You can open up Excel, set up a DDE link to it, and then send data to the
spreadsheet with DDEPoke().  To make this job a bit easier, I made a few
utility functions.  An explanation of the DDE functions is available in a
separate help file (<?php echo FidianFileSize($mediaDir . 'media/xlmacr8.zip')

?> - <a href="media/xlmacr8.zip">xlmacr8.zip</a>).</p>

<?php MakeBoxTop('center') ?>
<pre>* Include the program
set procedure to exceldde.prg additive

* Open Excel and set up a DDE link to it.
* This searches the registry for the handler for "XLS" files and opens
* that program.
m.mc = StartExcelDDE()

* To send data, use DDEPoke().  MakeRC(row, col) returns a "RxCx" style
* row/column.  So, you can do it yourself or use MakeRC(1, 10) to get "R1C10"
DDEPoke(m.mc, MakeRC(1, 1), "My Header")

* To add formatting, use DDEExecute()
DDEExecute(m.mc, '[SELECT("' + MakeRC(1, 1) + ':' + MakeRC(1, 5) + '")]' + ;
    '[ALIGNMENT(3)][FONT.PROPERTIES(,"Bold")][BORDER(,,,,6)]')

* Change the paper layout
ExcelLandscape(m.mc)
ExcelLegal(m.mc)

* Pull data, remove newlines, trim
m.info_from_spreadsheet = DDERequest2(m.mc, 1, 2) && 1 = row, 2 = col
</pre>
<?php MakeBoxBottom() ?>

<p>The second script, exceldump, will take your table and dump it to Excel
via DDE with formatting.  Pretty handy.</p>

<?php MakeBoxTop('center') ?>
<pre>* Include both files
set procedure to exceldump.prg additive
set procedure to exceldde.prg additive

* Open your table
use YOUR_TABLE

* Dump to Excel  (read ExcelDump.prg for explanation of optional parameters)
DumpToExcel()
</pre>
<?php MakeBoxBottom() ?>

<p>DumpToExcel takes many parameters.  See ExcelDump.prg for a list of them
and how to specify them.  You are able to select the database to dump,
specify the starting row on the Excel spreadsheet, force a particular
format for the fields (numeric, currency, character, etc), have it
call special functions if you want to insert breaks and subtotals,
and just dump the raw data without titles.  It is a very nice and powerful
function.</p>

<p>You will also find list_stru.prg in the archive.  It has some simple
code that uses the exceldde functions to perform a nicer "list stru"
equivalent, but puts the output in Excel.  The old DOS FoxPro had a useful
"list stru to print" command, but the Windows varieties all have really poor
output when you try that exact same command.  Printing it from Excel makes
it look nice again.</p>

<?php Section('<a name="fiscal">Fiscal Date Functions</a> (Code, ' . FidianFileSize($mediaDir . 'media/fiscal.zip') . ' - <a href="media/fiscal.zip">fiscal.zip</a>)'); ?>

<p>I am not sure if anyone else out there has to work with fiscal dates in
FoxPro, but I did.  This set of functions will help you out immensely.  With
them, you can query for fiscal years, get just specific fiscal months, and
much more.

<?php MakeBoxTop('center') ?>
<pre>* Add in the fiscal functions
set procedure to fiscal.prg additive

* Get the fiscal week number/month number/year of a date
? FiscalDateToWeek({^2004-10-31})
? FiscalDateToMonth({^2004-10-31})
? FiscalDateToYear({^2004-10-31})

* Get the first day in a fiscal year or a fiscal month
* Fiscal month means 1 = February, 12 = January
? FiscalFirstDayOfMonth(2004, 10)
? FiscalFirstDayInYear({^2001-12-27})

* Get the number of weeks in a fiscal month or a fiscal year
* Again, a fiscal month has 1 = February, 12 = January
? FiscalWeeksInMonth(2004, 12)
? FiscalWeeksInYear(2004)

* Convert a fiscal week to a fiscal month and a year week number to a
* month's week number
? FiscalWeekToMonth(34)
? FiscalWeekToMonthWeek(10) && returns 1 -- first fiscal week of April)

* Get the number of fiscal weeks before a specific month
? FiscalWeeksBeforeMonth(1)
</pre>
<?php MakeBoxBottom() ?>

<p>The code has slightly better comments before each function, and explains
the data types going in and returned from each function a bit better.</p>

<?php Section('<a name="fuzzy">Fuzzy String Matching</a> (Code)'); ?>

<p>I have expanded the fuzzy string matching for FoxPro to handle two
different algorithms, and they are also coded for other languages.  They are
explained in detail on my <a href="../algorithms/fuzzy_strings/">fuzzy
string matching</a> page.</p>

<?php Section('<a name="getdate">GetDate</a> (Form, ' . FidianFileSize($mediaDir . 'media/getdate.zip') . ' - <a href="media/getdate.zip">getdate.zip</a>)'); ?>

<p>Tired of asking the user to type in a date?  Use this form to pop open a
calendar.  I modified this one to remove extra weird code, make it more
portable, and (of course) make the form's background color purple.  To
include it on your forms, add a button (width 23, height 22) of the calendar
(getdate.bmp in the zip file) and set the <tt>Click</tt> event to something
like what is shown below.  You can also set the date text field's
<tt>DblClick</tt> event to what is shown to make it even easier for the user
to enter dates.</p>

<?php MakeBoxTop('center') ?>
<pre>* These snippets of code assume that your form has a text field on it
* that is called txtdDate1

* This is the code for the button's Click event
with thisform
    do form GetDate name ofrmGetDate ;
        with .txtdDate1.value, "Enter date for WHATEVER" ;
	to .txtdDate1.value
    .txtdDate1.refresh()
endwith

* This code can be placed on the date field's DblClick event
with this
    do form GetDate name ofrmGetDate ;
        with .value, "Enter date for WHATEVER"
	to .value
    .refresh()
endwith
</pre>
<?php MakeBoxBottom() ?>

<?php Section('<a name="md5">MD5</a> (Library, ' . FidianFileSize($mediaDir . 'media/md5.zip') . ' - <a href="media/md5.zip">md5.zip</a>)'); ?>
	
<p>Did you ever need to make a MD5 checksum of a file or a string?
This will certainly be exactly what you need.  I found this code out on
the net and immediately thought that it should be on my web site.  In this
zip file you will find the original documentation and the library.  The text
file says that the source to the library was included, but it was not in
the zip file that I found.</p>

<p>To use, you merely include the library and then run the MD5Hash()
function.</p>

<?php MakeBoxTop('center') ?>
<pre>set library to MD5.FLL additive
HashCode = MD5Hash(any_string) && returns 16-byte result

? MD5Version() && tells you what version of the library you are using
HashCode = MD5HashFile("C:\test_file.dat") && 16-byte result

if (MD5VerifyFile("C:\the_file.zip", m.Old_Hash) == .F.) then
   ? "MD5 did not match"
endif

* This will generate a 32-character hex-encoded MD5 string.
m.md = MD5Hash("Some String")
? HexEncode(m.md)

function HexEncode
lparam m.binary
    local m.out
    m.out = ""
    do while len(m.binary) > 0
        m.out = m.out + right(transform(asc(m.binary), "@0"), 2)
        m.binary = substr(m.binary, 2)
    enddo
    return m.out
endfunc
</pre>
<?php MakeBoxBottom(); ?>

<?php Section('<a name="prompter">Prompter</a> (Form, ' . FidianFileSize($mediaDir . 'media/prompter.zip') . ' - <a href="media/prompter.zip">prompter.zip</a>)'); ?>

<p>I don't know why FoxPro did not include a message box that could prompt
the user for information.  They have MessageBox(), but nothing like prompt()
or ask() or whatever.  At least, they don't in FoxPro 6, which is what I use
at work.</p>

<?php MakeBoxTop('center') ?>
<pre>
m.result = .F.

* Prompt with an empty input box
do form Prompter with "What is your name?" to m.result
if type('m.result') != 'C' or len(allt(m.result)) == 0
   ? "User pressed cancel, hit escape, or just hit enter (empty value)"
else
   ? "Something was actually entered."
endif

* Or have a default value specified
do form Prompter with "What is 2 * 3?", "6" to m.result2
</pre>
<?php MakeBoxBottom() ?>

<?php Section('<a name="zlib">zlib</a> (Library + Code, ' . FidianFileSize($mediaDir . 'media/zlib.zip') . ' - <a href="media/zlib.zip">zlib.zip</a>)') ?>

<p>I have found that it is often to my advantage to compress my stray
.dbf files that I rarely use.  I have written code to detect if my file
exists, and if it does not it will fall over to a gzipped version if that is
available.  To facilitate easy extraction and compression, I searched and
found a zlib.dll that will do what I need it to do.</p>

<p>The code I wrote employs the thermometer class that is part of the FoxPro
Foundation Classes.  You will certainly need to edit zlib.prg and change it
(it was at about line 180) to work for your installation.  You will also
need to change the path to zlib.dll &ndash; it is in the GZDefine()
function.</p>

<?php MakeBoxTop('center') ?>
<pre>* Include the zlib routines
set procedure to zlib.prg additive

* Now you have the three functions from the DLL added
gzcompress(@dest, @destlen, source, sourcelen)
gzcompress(@dest, @destlen, source, sourcelen, level)
gzuncompress(@dest, @destlen, source, sourcelen)

* But, since they can be a pain to call, I've added some helper functions
* For these three functions, COMPR is a string that has the size of
* the decompressed data, a space, and then the gzipped data.
compr = compressit(data) && default compression (level 6)
compr = compressit(data, level) && level is from 0 (min) to 9 (max)
data = decompressit(compr) && decompresses

* Compress and decompress files.
* If TALK is ON, you will get a progress bar (thermometer) on the screen.
* They all return 0 if there was no error.
gzip("in.dbf", "out.dbf.gz") && Compresses a file (level 6)
gzip_nobar("in.dbf", "out.dbf.gz") && No progress bar
gzip("in.dbf", "out.dbf.gz", level) && Pick your own compression level
* There is no gzip_nobar() that accepts a compression level parameter
gunzip("in.dbf.gz", "out.dbf") && Decompresses a file
gunzip_nobar("in.dbf.gz", "out.dbf") && Never shows progress bar
</pre>
<?php MakeBoxBottom() ?>

<?php

StandardFooter();
