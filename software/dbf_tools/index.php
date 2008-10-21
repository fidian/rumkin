<?PHP

include '../../functions.inc';

StandardHeader(array('title' => 'DBF Tools',
	'topic' => 'dbf_tools'));
	
?>

<p>At one point I dealt with DBF files.  A lot of them.  In order to process
them faster, I wrote a couple tools that others may enjoy.  They are GPL v3
and I don't really support them any longer.  I may help out if you ask nicely
though!</p>

<?PHP Section('dbfagg'); ?>

<p><strong>Download:</strong> <a href="media/dbfagg.zip">dbfagg.zip</a></p>

<p>This program's misison in life is to aggregate data so you have fewer records
to parse.  It can sum, produce an average, and do much more.  You pass it the
input file (or it can read from standard input), the name of the script
to use, and the result database file that should be created.</p>

<p>The magic is primarily in the script file.  You list the different fields
in the result dbf file, and only certain data types are allowed for some
functions.  The script file is not case sensitive.  It also does not do a lot
of checking of field names, so make sure to not use the same name twice in
your results.</p>

<p>This list is a complete list of functions that you can use in
your script file.  The function name is followed by what data types it works
with.  For more information, see the scripts.txt file in the archive.</p>

<dl>

<dt>KEY (C, N)</dt>
<dd>When any key field changes, one record is written to the results.  For
best results, you will want your key fields grouped together in the database.
You must have at least one KEY in your script.  All of the other functions
are optional.</dd>

<dt>SUBKEY (C, N)</dt>
<dd>This acts like another grouping, similar to key, but the groups are not
written out to disk when a SUBKEY changes.  The information just keeps gathering
until a KEY field changes.  Multiple SUBKEYS are allowed.</dd>

<dt>MAX (N)</dt>
<dd>Stores the largest value encountered for the group.  Numeric fields
only.</dd>

<dt>MIN (N)</dt>
<dd>Stores the smallest value encountered for the group.  Numeric fields
only.</dd>

<dt>SUM (N)</dt>
<dd>Stores the summed values for the group.  Numeric fields only.</dd>

<dt>AVG (N)</dt>
<dd>Stores the median value (summed values divided by the number of values).
This works only with numeric fields.</dd>

<dt>MODE (C, N)</dt>
<dd>Stores the value that was encountered the most times in the group.</dd>

<dt>COUNT</dt>
<dd>Returns the number of records that were grouped together as a new field
in the resulting table.  Creates a N(9) field, so have no more than
999,999,999 records in a single group (but you can specify a different size
if you like).</dd>

</dl>

<p>The aggregation process can rename and resize fields.  Each line in the
script file should follow one of these formats:</p>

<?PHP MakeBoxTop('center'); ?>
FUNC_NAME INPUT_FIELD<br>
FUNC_NAME INPUT_FIELD OUTPUT_FIELD<br>
FUNC_NAME INPUT_FIELD OUTPUT_FIELD OUTPUT_FIELD_LEN<br>
FUNC_NAME INPUT_FIELD OUTPUT_FIELD OUTPUT_FIELD_LEN OUTPUT_FIELD_PREC
<?PHP MakeBoxBottom(); ?>

<dl>

<dt>FUNC_NAME</dt>
<dd>The name of the function, as detailed above.</dd>

<dt>INPUT_FIELD</dt>
<dd>The name of the field in the input table</dd>

<dt>OUTPUT_FIELD (optional)</dt>
<dd>The name that the resulting field should be called in the output file.
If not specified, it defaults to INPUT_FIELD</dd>

<dt>OUTPUT_FIELD_LEN</dt>
<dd>The size the field should be in the resulting table.  If you are summing
values and you might need more digits, you should specify this value.</dd>

<dt>OUTPUT_FIELD_PREC</dt>
<dd>The new precision of the output field.  Useful for averaging and showing
additional digits.  If you make OUTPUT_FIELD_PREC larger, you should probably
make OUTPUT_FIELD_LEN longer as well.  Only use this with numeric fields.</dd>

<?PHP Section('dbfcat'); ?>

<p><strong>Download:</strong> <a href="media/dbfcat.zip">dbfcat.zip</a></p>

<p>I had to aggregate several databases.  They were so large that they were
first broken into chunks, then aggregated.  The down side is that I didn't have
a tool to combine them together for further aggregation.  That is, I didn't
have a tool until I wrote dbfcat.</p>

<p>dbfcat will open and read several dbf files and write out a single, combined
dbf file.  You can easily go beyond the 2 gb limit that lots of dbf software
has, so keep that in mind.</p>

<p>dbfcat is also linked against libz, letting you read directly from a
gzipped dbf file (*.dbf.gz), saving you disk space and actually speeding up
the process.  It's faster because you are not waiting for the disk reads and
potentially the network traffic in order to get the information.</p>

<p>The merged .dbf file is written to stdout, so you can pipe that into a file
or into gzip to recompress it and save the file somewhere.</p>

<?php

StandardFooter();
