<?PHP

include '../../../functions.inc';

StandardHeader(array('title' => 'Textfile DB',
		     'topic' => 'algorithms'));

?>

<p>This set of functions for PERL implement a simple flat-file database.  It
isn't fast.  It isn't complex.  It works, and is easy.  I call it DBClerk.
It is best if you only use this on small data sets &ndash; as the data 
grows, processing time grows exponentially.</p>

<p>The functions are configured with a few variables in the beginning.  The
defaults should be pretty good for most use.</p>

<p>The database has a header line followed by 0 or more data lines.  The
header line defines the fields.  A sample database looks like this:</p>

<?PHP MakeBoxTop('center') ?>

User::Pass::LName::FName<br>
Tyler::password::Tyler::Akins<br>
JDoe::who?::John::Doe

<?PHP MakeBoxBottom() ?>

<p>The "key" field is the first one defined.  In the example, it is "User".
Field names are case sensitive.  Invalid characters are stripped, so this is
only good for data that can be represented textually without newlines and
without the delimeter.  If you pass in data that has the delimeter (by
default it is "::"), it will be silently changed to another value (by
default it is ":").</p>

<p>Download <a href="dbclerk.txt">dbclerk.txt</a> and rename it to
dbclerk.pl.  You will also need to download the <a
href="../lockfile/">lockfile</a> function on this web site (or alter this to
suit your own locking needs).</p>

<p><b>DBClerk_Add($DB_File, %Data)</b> - Adds a record to the database (at
the end).  $DB_File is the name of the database file, %Data contains the
information needed.  Returns 0 on success, 1 on error.</p>

<p><b>DBClerk_Delete($DB_File, $Key)</b> - Deletes the record with the
specified key if it exists.  $DB_File is the name of the database file, $Key
is the key that is looked for.  Returns 0 on success, 1 if the ID didn't
exist.</p>

<p><b>%Data = DBClerk_Get($DB_File, $Key)</b> - Retrieves the record from
the database with the specified key.  $DB_File is the name of the database
file, $Key is the key that is looked for.  Returns the hash with the data,
or an empty hash if the ID was not found.</p>

<p><b>@Keys = DBClerk_KeyList($DB_File)</b> - Returns an array of the keys
(column names) in the database.  $DB_File is the name of the database file.
The first one in the returned array is the ID field.</p>

<p><b>DBClerk_Update($DB_File, %Data)</b> - Updates the specified record.
$DB_File is the database file, %Data is the data that it should contain.
Returns 0 if the ID existed and the record was changed, 0 if the ID didn't
exist in the file.</p>

<p><b>@IDs = DBClerk_FindAll($DB_File)</b> - Returns a list of all of the
IDs for all of the records in the database.  $DB_File is the name of the
database to scan.</p>

<p><b>@FilteredIDs = DBClerk_Refine($Field, $Condition, $Data, $DB_File, @IDs)</b> -
Returns a list of all keys that match the condition.  Used to remove entries
from the @IDs array that don't match the criteria.  All of the records that
do match are returned to @FilteredIDs.  $Field is the name of the database
field to use, $Condition is how to match (described later), $Data is what
you are comparing to, $DB_File is the name of the database file and @IDs is
the list of IDs that you want to whittle down a bit.</p>

<ul>
<li><b>&lt;</b> - Less than (numerical)
<li><b>&lt;=</b> - Less than or equal to (numerical)
<li><b>==</b> - Equal to (numerical)
<li><b>!=</b> - Not equal to (numerical)
<li><b>&gt;=</b> - Greater than or equal to (numerical)
<li><b>&gt;</b> - Greater than (numerical)
<li><b>ne</b> - Not equal to (string)
<li><b>eq</b> - Equal to (string)
<li><b>lt</b> - Less than (string)
<li><b>gt</b> - Greater than (string)
<li><b>=~</b> - Regular expression equals case sensitive (string)
<li><b>!~</b> - Regular expression not equals case sensitive (string)
<li><b>=~i</b> - Regular expression equals case insensitive (string)
<li><B>!~i</b> - Regular expression not equals case insensitive (string)
</ul>

<p>If you want to find all people in the sample database with a last name
starting with A, you can use DBClerk_Refine('LName', '=~i', 'a.*', $DB_File,
@IDs).

<?PHP

StandardFooter();