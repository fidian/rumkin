<?php

include '../../functions.inc';
StandardHeader(array(
		'title' => 'Query Analyzer to Excel',
		'topic' => 'Problems'
	));

?>
	
<p><b><font size="+1">Symptom:</font></b>  You are running Microsoft SQL
Server's Query Analyzer and you want to copy your results grid to Excel.
Copying the grid and pasting it in Excel does not work well because you
are missing column headings.

<p><b><font size="+1">Causes:</font></b>  Well, it's simply because Query
Analyzer thinks you want the data - not the column headers also.  Some say
that Query Analyzer that comes with SQL Server 2003 has an option to also
copy the column headers.  I don't have it, so I can't confirm.

<p><b><font size="+1">Solution:</font></b>  This is somewhat a quick
workaround, but it works well for me.  I am using SQL Server 2000's Query
Analyzer.

<ol>
<li>Tools &rarr; Options
<li>General Tab:  Change result file extension to .csv
<li>Results Tab:  Change results output format to "Comma Delimited (CSV)"
<li>Results Tab:  Make sure that "print column headers" is checked.
</ol>

<p>Now, you just run Query Analyzer like before with no problems.  When you
want a CSV file, change the results target from Grid (or Text) to File and
execute your query again.

<p>Problem solved.</p>

<p><b><font size="+1">Shortcomings:</font></b>  If you get back multiple
data sets, they will all be in the same .csv file.  Also, messages are in
the .csv file.  So, open up the .csv file and scroll around.  At the end of
a single-result query, you will see a line that says there were X records
returned.  You'll likely want to delete this line.

<p>Some people say that this does not work well with numbers that have leading
zeros, dates, and other things.  You might need to perform additional tweaks
to get the results to display in the .csv file exactly how you need it.

<?php

StandardFooter();
