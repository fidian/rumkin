<?PHP

include '../../functions.inc';

StandardHeader(array('title' => 'Population Counter',
		     'header' => 'Information About Population Clock',
		     'topic' => 'population'));

?>

<p>&lt;&ndash Back to the <a href="index.php">Population Clock</a></p>
	
<p>The figures presented are based on information from the U.S. 
Census Bureau.  Data was collected for the population births and deaths,
for the most recent year available.  The numbers presented are not real
figures, but merely estimates.  The notes are also simulated, but are
properly dispersed according to the percentages found.</p>

<p>The older the data is that I am basing the figures on, the more likely
that the population clock is not accurate.  It performs a straight-line
estimate for the populations, instead of a curve.  People who migrate out
of the country or into the country are also not counted.</p>

<p>The numbers and notes will automatically update with new
information whenever a new simulated birth or death occurs.  New
births and deaths are checked for every two seconds.</p>

<p>You do not need your computer's time properly set to view this
correctly, since we automatically compensate for any time difference
between our computer and yours.</p>

<?PHP

StandardFooter();