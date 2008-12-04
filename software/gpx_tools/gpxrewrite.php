<?php

include '../../functions.inc';
StandardHeader(array(
		'title' => 'GPX Tools for Geocaching',
		'header' => 'GPX Tools: gpxrewrite',
		'topic' => 'gpx_tools'
	));

?>

<p>Rewrite a GPX file so that you change the name, description, and symbol
tags for the caches.  This can provide more information at your fingertips
by giving geocaches custom symbols for different sizes and add extra
information to the name and description of your geocaches.</p>

<?php Section('Command Line Syntax'); ?>

<?php MakeBoxTop('center'); ?>
<tt>gpxrewrite settings_file [gpx_in.gpx [gpx_out.gpx]]</tt><br>
<br>
<i>Example:</i><br>
<tt>gpxrewrite settings.ini my_query.gpx reformatted.gpx</tt>
<?php MakeBoxBottom(); ?>

<p><tt>settings_file:</tt>  This is where all of the formats, symbols, and
other settings are kept.  It is the only parameter that must be specified on
the command line.</p>

<p><tt>gpx_in.gpx:</tt>  The source of the data, which must be in the GPX
format that is returned from a Geocaching Pocket Query.  Unknown things can
happen if you try to reformat a standard GPX file that is lacking the extra
groundspeak attributes.  Unknown things are bad.  If you do not specify a
file, you can instead pass one in with stdin.  (If you're not sure what that
means, just specify the file on the command line.)</p>

<p><tt>gpx_out.gpx:</tt>  The rewritten GPX file will be either written out
to the file name that you specify or to screen.  If you do specify a
filename, it will write without prompting.  It will not even ask if you want
to overwrite an existing file, so be careful.  If you do not specify a
filename, you can redirect output as you so see fit.</p>

<?php Section('Settings File'); ?>

<p>gpxrewrite requires a settings file, which I have called settings.ini,
but you are free to name it whatever you like.  Settings are specified in a
key=value pair, one per line.  Keys are case insensitive, and the last one
specified in the file is the one that is used.</p>

<table align=center cellspacing=0 cellpadding=2 border=1>
<tr><th>Key</th><th>Description</th></tr>
<tr><td valign=top><tt>
  Benchmark_Prefix<br>
  CITO_Event_Prefix<br>
  Earthcache_Prefix<br>
  Event_Prefix<br>
  Letterbox_Hybrid_Prefix<br>
  Locationless_Prefix<br>
  Mega_Prefix<br>
  Multi_Prefix<br>
  Project_APE_Prefix<br>
  Traditional_Prefix<br>
  Unknown_Prefix<br>
  Virtual_Prefix<br>
  Webcam_Prefix
</tt></td><td valign=top>
  These codes specify what will replace %C format codes.  If you do not
change them, a default one-leter code is assigned for each prefix.  See the
sample settings file below.
</td></tr>
<tr><td valign=top><tt>
  Waypoint_Format<br>
  Desc_Format
</tt></td><td valign=top>
  This determines the format used to rewrite the name and description tags
in the GPX file.  If one is not specified, no change will be made for that
one tag.  The name of the waypoint when you load it on your GPS is the
"name" tag, and that is changed with Waypoint_Format.  Likewise, the
Desc_Format changes the "desc" tag, and that is used for the waypoint
description in your GPS.  The format layout supports the format codes as 
described below.
</td></tr>
<tr><td valign=top><tt>
  Waypoint_Max_Length<br>
  Desc_Max_Length
</tt></td><td valign=top>
  If specified, the waypoint name and description will be truncated/autofit
to be at most this many characters long.  If not specified the name or the 
description will not be truncated.
</td></tr>
<tr><td valign=top><tt>
  Waypoint_Allowed_Chars<br>
  Desc_Allowed_Chars
</tt></td><td valign=top>
  Filter the waypoint name and description to only contain some characters.
If you do not include this line in your config file, no characters will be
stripped.  You do not need to specify letters (a-z and A-Z), numbers (0-9),
and some symbols (space and period).  Every character counts, including
spaces, so "ab cd" is 5 characters: a, b, space, c, d.
</td></tr>
<tr><td valign=top><tt>
  Active_No<br>
  Active_Yes<br>
  Bug_No<br>
  Bug_Yes<br>
  Found_No<br>
  Found_Yes
</tt></td><td valign=top>
  Specifies the strings used when you use the %a, %b, and %f format codes,
depending on whether or not the specific cache is active, if it has at least
one travel bug, or if you have found the cache already.
</td></tr>
<tr><td valign=top><tt>
  Found<br>
  Not_Found<br>
  <br>
  TYPE_Found<br>
  TYPE_Not_Found<br>
  <br>
  TYPE_SIZE_Found<br>
  TYPE_SIZE_Not_Found
</tt></td><td valign=top>
  <table border=1 cellpadding=2 cellspacing=0 align=right>
  <tr><th>Types</th><th>Sizes</th></tr>
  <tr><td valign=top>
    Benchmark<br>
    CITO_Event<br>
    Earthcache<br>
    Event<br>
    Letterbox<br>
    Locationless<br>
    Mega<br>
    Multi<br>
    Project_APE<br>
    Traditional<br>
    Unknown<br>
    Virtual<br>
    Webcam
  </td><td valign=top>
    Large<br>
    Micro<br>
    Other<br>
    Regular<br>
    Small<br>
    Unknown<br>
    Virtual
  </td></tr></table>
  Specifies the default symbols for geocaches that are found and ones that
are not found.  Rules are checked from most specific to least specific, so
if you have a traditional micro cache that was not yet found, it will check 
for "Traditional_Micro_Not_Found", then "Traditional_Not_Found" and finally
"Not_Found".  If none of those settings are in the settings file, the
symbol will not change.
</td></tr>
</table>

<?php Section('Format Codes'); ?>

<p>Formats for waypoint names and descriptions can use the following special
codes.  When you use a % symbol as specified below, you will get it swapped
out with a different value.  You can also specify a maximum width or that
this field should be automatically resized to fit into the name or
description field.  See the Format Examples for an explanation.</p>

<table align=center cellspacing=0 cellpadding=2 border=1>
<tr><th>Code</th><th>Example</th><th>Description</th></tr>
<?php

$Codes = array(
	array(
		'%a',
		'Y',
		'This is replaced with the Active_Yes or Active_No ' . 'settings if specified, or Y/N otherwise.'
	),
	array(
		'%b',
		'Y',
		'This is replaced with the Bug_Yes or Bug_No ' . 'settings if specified, or Y/N otherwise.'
	),
	array(
		'%C',
		'T',
		'The prefix for the cache, as determined by ' . 'the *_Prefix settings.  T is the default for a ' . 'traditional cache.'
	),
	array(
		'%D',
		'2.5',
		'The difficulty of the cache.'
	),
	array(
		'%d',
		'4',
		'The difficulty of the cache as a single number ' . 'from 1 to 9, from the formula (difficulty * 2) - 1.'
	),
	array(
		'%f',
		'N',
		'This is replaced by the Found_Yes or Found_No ' . 'settings if specified, or Y/N otherwise.'
	),
	array(
		'%H<br>%h',
		'Under the log by the stream.',
		'The hint from ' . 'the geocache.  Both the uppercase H and the lowercase h will ' . 'work.'
	),
	array(
		'%I',
		'1234',
		'The code after the "GC" in the waypoint ID.  ' . 'This is an example for a waypoint GC1234.'
	),
	array(
		'%L',
		'FFDFW',
		'The first letters of the log types.  The ' . 'example is for a cache where the last five logs were "Found it," ' . '"Found it," "Didn\'t find it,", "Found it", "Write note."'
	),
	array(
		'%N',
		'Some&nbsp;Fake&nbsp;Cache',
		'The name of the geocache.  ' . 'This may change in the future to be "smart truncated" if anyone ' . 'wants to get the name automatically shortened.'
	),
	array(
		'%O',
		'King&nbsp;Boreas',
		'The owner of the cache.'
	),
	array(
		'%P',
		'KB&nbsp;&amp;&nbsp;Crew',
		'Who placed the cache.'
	),
	array(
		'%S',
		'Small',
		'The size of the container.'
	),
	array(
		'%s',
		'S',
		'The first letter of the size of the container.'
	),
	array(
		'%T',
		'3',
		'The terrain rating of the geocache.'
	),
	array(
		'%t',
		'5',
		'The terrain rating of the cache as a single number ' . 'from 1 to 9, based on the formula (terrain * 2) - 1.'
	),
	array(
		'%Y',
		'Traditional&nbsp;Cache',
		'The cache type, spelled out.'
	),
	array(
		'%y',
		'T',
		'The prefix for the cache as determined by the ' . '*_Prefix settings.  T is the default for a traditional cache.'
	),
	array(
		'%%',
		'%',
		'Adds a literal %.  Implemented in case you want to ' . 'really use % somewhere.'
	),
	array(
		'%0<br>through<br>%9',
		'0<br>through<br>9',
		'Adds a literal number.  These are available if you wanted to ' . 'add a number after a format code when you do not want to ' . 'specify a length to the format code.'
	),
);

foreach ($Codes as $C) {
	
	?>
<tr><td valign=top align=center><tt><?php echo $C[0] ?></tt></td>
<td valign=top align=center><?php echo $C[1] ?></td>
<td valign=top><?php echo $C[2] ?></td></tr>
<?php
}

?>
</table>

<?php Section('Format Examples'); ?>

<p>For the following examples, we will assume we are dealing with the
following configuration settings and geocache.</p>

<?php MakeBoxTop('center'); ?>
<table border=1 cellspacing=0 cellpadding=2>
<tr><th>Settings</th><th>Geocache</th></tr>
<tr><td>
<pre># Mostly we will use the defaults
Waypoint_Max_Length=10

# A-Z, a-z, 0-9, period and space are 
# allowed automatically if
# we specify this value
Waypoint_Allowed_Chars=!@#$%^&*()

Bug_Yes=B
Bug_No=_
</pre></td><td>
<b>Name:</b> GCTEST<br>
<b>Desc:</b> It's An Example - Test<br>
<b>Difficulty:</b> 1.5<br>
<b>Terrain:</b> 2</br>
<b>Logs:</b> FFDFW<br>
<b>Type:</b> Multi-cache<br>
<b>Size:</b> Large<br>
<b>Travel Bugs:</b> None
</td></tr>
</table>
<?php MakeBoxBottom(); ?>

<p>Below are a few examples so you can understand how things are working
with the format layouts.  For the format and result, the top line is the
waypoint name and the bottom is the description.</p>

<?php MakeBoxTop('center'); ?>
<table border=1 cellspacing=0 cellpadding=3>
<tr><th>Format</th><th>Result</th><th>Notes</th></tr>
<?php

$Formats = array(
	array(
		' ',
		"GCTEST\nIt's An Example - Test",
		'If you do not specify a Waypoint_Format or ' . 'Desc_Format, they will not be changed.  Also, since there is no ' . 'format, the illegal characters will not be removed.'
	),
	array(
		"%I %b\n%N",
		"TEST _\nIt's An Example - Test",
		'The name has had the "GC" from the waypoint ID removed, and then ' . 'the "_" was added since there were no bugs in the cache.  ' . 'The description is not changed because no Desc_Allowed_Chars was ' . 'specified.'
	),
	array(
		"%N\n%a%C %d=%D %t=%T",
		"Its An Exa\nYT 2=1.5 3=2",
		'The apostrophe from the name is removed from the waypoint name ' . 'because Waypoint_Allowed_Chars is set and does not contain the ' . 'apostrophe as an allowed character.  It is also truncated to ' . 'Waypoint_Max_Length characters (10).'
	),
	array(
		"%I %Y0 %s\n%L3 - %%L3 - %L%3",
		"TEST Tra S\nFFD - %%L3 - FFDFW3",
		'The waypoint name has <tt>%Y0</tt>, which means we should try to ' . 'fit as much of the cache type into the allowed space, and will ' . 'always display at least 1 character.  In this example, "TEST " ' . 'takes 5 characters and " S" uses up 2.  The maximum length is 10, ' . 'which leaves at most 3 letters for the cache type.  ' . 'The description shows three similar formats with three very ' . 'different results.  <tt>%L3</tt> means to show at most 3 letters ' . 'from the cache logs.  The double <tt>%%</tt> means to show a ' . 'literal %.  The last example shows how to put a literal number ' . 'after another format code.'
	),
	array(
		"garbage in\n%G%A%R%B%A%G%E out",
		"garbage i\n%G%A%R%B%A%G%E out",
		'The name is truncated to 10 letters, and invalid codes are copied ' . 'verbatim to the output.'
	),
);

foreach ($Formats as $F) {
	$F[0] = str_replace(' ', '&nbsp;', $F[0]);
	$F[0] = nl2br($F[0]);
	$F[1] = str_replace(' ', '&nbsp;', $F[1]);
	$F[1] = nl2br($F[1]);
	
	?>
<tr><td valign=top><tt><?php echo $F[0] ?></tt></td>
<td valign=top><tt><?php echo $F[1] ?></tt></td>
<td><?php echo $F[2] ?></td></tr>
<?php
}

?>
</table>
<?php MakeBoxBottom(); ?>

<?php Section('Sample Settings File'); ?>

<?php MakeBoxTop('center'); ?>
<pre># This is a sample settings file that shows the default settings
# for all of the options.

# This is the default code that is used when you use the %C format code.
Benchmark_Prefix=X
CITO_Event_Prefix=C
Earthcache_Prefix=G
Event_Prefix=E
Letterbox_Hybrid_Prefix=B
Locationless_Prefix=L
Mega_Prefix=E
Multi_Prefix=M
Project_APE_Prefix=A
Traditional_Prefix=T
Unknown_Prefix=U
Virtual_Prefix=V
Webcam_Prefix=W

# My own personal waypoint name and description formats, lengths,
# and allowed characters.  This is tweaked for my own personal preferences
# and what is allowed by my Garmin GPSMAP 60CSx.  Change for your GPS and
# alter to what you like to see.
Waypoint_Format=%I %s%d%t
Waypoint_Max_Length=14
Waypoint_Allowed_Chars=+-

Desc_Format=%C%b%L
Desc_Max_Length=30
Desc_Allowed_Chars=+-

# I want to see a B or a - in my description instead of Y/N like Active and
# Found
Bug_Yes=B
Bug_No=-

# The defaults for Active and Found are fine
Active_Yes=Y
Active_No=N
Found_Yes=Y
Found_No=N

# Default symbols
Found=Geocache Found
Not_Found=Geocache_Found

</pre>
<?php MakeBoxBottom(); ?>

<?php

StandardFooter();
