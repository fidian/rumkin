<?php

include '../../functions.inc';
StandardHeader(array(
		'title' => 'Population Counter',
		'header' => $NAME,
		'topic' => 'population'
	));

if (! isset($_REQUEST['CCODE'])) {
	Redirect('index.php');
}

$conn = OpenDBConnection('Population');


/* We want to grab today's year plus the year after or before depending on
 * if we are after or before the middle of the current year. */
$now = time();
$midyear = mktime(0, 0, 0, 7, 1);

if ($now >= $midyear) {
	$start_year = date('Y');
	$end_year = $start_year + 1;
	$start_time = $midyear;
	$end_time = mktime(0, 0, 0, 7, 1, $end_year);
} else {
	$start_year = date('Y') - 1;
	$end_year = $start_year + 1;
	$start_time = mktime(0, 0, 0, 7, 1, $start_year);
	$end_time = $midyear;
}

$time_diff_year = $end_time - $start_time;
$time_diff_now = $now - $start_time;
$pct_time = $time_diff_now / $time_diff_year;
$ccode = $_REQUEST['CCODE'];


/* Calculate death rates by getting stats for current year and five years ago
 * Age groups are in 5 year increments, except last number.
 * It may be wrong, but for simplicity we assume that everyone in the
 * last group dies in the 5 years. */
$curr_pop = GetPopulationBreakdown($conn, $ccode, $start_year, $end_year, $pct_time);
$prev_pop = GetPopulationBreakdown($conn, $ccode, $start_year - 5, $end_year - 5, $pct_time);
$deaths = array();
$age_start = 0;
$death_total = 0;

while (isset($curr_pop[$age_start])) {
	/* We need to get the number of infant deaths or something to correctly
	 * calculate the death rate of the 0-4 age group. */
	if ($age_start == 0) {
		// Get infant mortality rate
		$deaths[$age_start] = GetInfantMortalityRate($conn, $ccode, $start_year, $end_year, $pct_time, $curr_pop[ - 1]);
	} else {
		$deaths[$age_start] = array();
		
		for ($i = 0; $i < 3; $i ++) {
			$deaths[$age_start][$i] = $prev_pop[$age_start - 5][$i] - $curr_pop[$age_start][$i];
			
			if ($deaths[$age_start][$i] < 0) {
				$deaths[$age_start][$i] = 0;
			}
		}
	}
	
	$death_total += $deaths[$age_start][0];
	$age_start += 5;
}


// Get the [births], [deaths], [migration]
$current_stats = GetCurrentStats($conn, $ccode, $start_year, $end_year, $pct_time, $curr_pop[ - 1]);


// array(min_age, max_age, tot_pop, male_pop
$age_groups = array(
	'Infant / Toddler' => array(
		0,
		4,
		0,
		0
	),
	'Child' => array(
		5,
		9,
		0,
		0
	),
	'Adolescent' => array(
		10,
		14,
		0,
		0
	),
	'Teenager' => array(
		15,
		19,
		0,
		0
	),
	'Young Adult' => array(
		20,
		29,
		0,
		0
	),
	'Adult' => array(
		30,
		49,
		0,
		0
	),
	'Older Adult' => array(
		50,
		64,
		0,
		0
	),
	'Senior' => array(
		65,
		999,
		0,
		0
	),
);

foreach ($curr_pop as $k => $v) {
	foreach ($age_groups as $group_name => $group_attr) {
		if ($k >= $group_attr[0] && $k <= $group_attr[1]) {
			$age_groups[$group_name][2] += $v[0];
			$age_groups[$group_name][3] += $v[1];
		}
	}
}

?><SCRIPT LANGUAGE="JavaScript">

// Copyright 1998-1999, 2007, Tyler Akins
// Do not use, copy, modify, steal, or anything!

// ----------------------------------------------------
// Initialization
// ----------------------------------------------------

function StartUp()
{
    DateNow = new Date();
    
    // Display cute "working" values in each of the form entries
    UpdateID('Days', 'Working &hellip;');
    UpdateID('Births', 'Working &hellip;');
    UpdateID('BNotes', 'Working &hellip;');
    UpdateID('Deaths', 'Working &hellip;');
    UpdateID('DNotes', 'Working &hellip;');
    UpdateID('Population', 'Working &hellip;');
 
    // Set up some initial values
    StartTime = <?php echo mktime(0, 0, 0, 7, 1, $start_year) - time();

?> + (DateNow.getTime() / 1000);
        // Seconds at July 1, for the starting year,
	// with automatic correction for your machine
    CurrBirths = 0;  // Current birth number
    CurrDeaths = 0;  // Current death number
    OldBirths = -1;  // Birth number after last update
    OldDeaths = -1;  // Death number after last update

    // Start the updates
    setTimeout('UpdateAll()', 1);
}

// ----------------------------------------------------
// Other Functions
// ----------------------------------------------------

function UpdateAll()
{
    DateNow = new Date();
    Seconds = DateNow.getTime() / 1000 - StartTime;
    CurrBirths = Math.floor(<?php echo $current_stats['births'] / $time_diff_year;

?> * Seconds);
    CurrDeaths = Math.floor(<?php echo $current_stats['deaths'] / $time_diff_year;

?> * Seconds);

    if (CurrBirths != OldBirths) { UpdateBirths(); }
    if (CurrDeaths != OldDeaths) { UpdateDeaths(); }
    UpdatePopulation();

    setTimeout('UpdateAll()', 2000);
}

function UpdatePopulation()
{
    UpdateIDNumber('Population', <?php echo $curr_pop[ - 1][0];

?> + CurrBirths - CurrDeaths);

    SecondsSinceStart = DateNow.getTime() / 1000 - StartTime;
    UpdateIDNumber('Days', Math.floor(SecondsSinceStart / 86400));
}

function UpdateBirths()
{
    OldBirths = CurrBirths;
    UpdateIDNumber('Births', CurrBirths);

    if (Math.random() <= <?php


// Birth gender approximated from current 0-4 population
echo $curr_pop[0][1] / $curr_pop[0][0];

?>)
    {
        UpdateID('BNotes', 'Male');
    }
    else
    {
        UpdateID('BNotes', 'Female');
    }
}

function UpdateDeaths()
{
    OldDeaths = CurrDeaths;
    UpdateIDNumber('Deaths', CurrDeaths);
    AgeGroup = Math.random();
<?php

$cumulative = 0.000;

foreach ($age_groups as $name => $attrib) {
	$cumulative += $attrib[2] / $curr_pop[ - 1][0];
	$male_pct = $attrib[3] / $attrib[2];
	echo '    ';
	
	if ($attrib[0] == 0) {
		echo 'if (AgeGroup <= ' . $cumulative . ')';
		$years = $attrib[0] . ' - ' . $attrib[1];
	} elseif ($attrib[1] == 999) {
		echo 'else';
		$years = 'at least ' . $attrib[0];
	} else {
		echo 'else if (AgeGroup <= ' . $cumulative . ')';
		$years = $attrib[0] . ' - ' . $attrib[1];
	}
	
	echo " {\n";
	echo '        Type = "' . $name . "\";\n";
	echo '        Years = "' . $years . "\";\n";
	echo '        Percentage = ' . $male_pct . ";\n";
	echo "    }\n";
}

?>
    DNotesTxt = Type + ", " + Years + " years old ";
    if (Math.random() <= Percentage)
    {
        DNotesTxt += "(Male)";
    }
    else
    {
        DNotesTxt += "(Female)";
    }
    UpdateID('DNotes', DNotesTxt);
}

function UpdateIDNumber(name, value)
{
    value = value.toString();
    var value2 = '';
    while (value.length > 3)
    {
       value2 = ',' + value.slice(-3) + value2;
       value = value.slice(0, value.length - 3);
    }
    UpdateID(name, value + value2);
}

function UpdateID(name, value)
{
    var id = document.getElementById(name);
    
    if (! id) {
        return;
    }
    
    id.innerHTML = value;
}

</SCRIPT>
      <TABLE>
        <TR> 
          <TD><FONT FACE="Times New Roman, Times">Days since July 1, <?php echo $start_year ?>:</FONT></TD>
          <TD><span id="Days">You need JavaScript</span></td>
        </TR> 
        <TR> 
          <TD><FONT FACE="Times New Roman, Times">Births since July 1, <?php echo $start_year ?>:<BR>
            Notes about last birth:</FONT></TD>
          <TD>
	    <span id="Births">You need JavaScript</span><br>
	    <span id="BNotes">You need JavaScript</span><br></td>
        </TR> 
        <TR> 
          <TD><FONT FACE="Times New Roman, Times">Deaths since July 1, <?php echo $start_year ?>:<BR>
            Notes about last death:</FONT></TD> 
          <TD>
	    <span id="Deaths">You need JavaScript</span><br>
	    <span id="DNotes">You need JavaScript</span><br></td>
        </TR> 
        <TR> 
          <TD><FONT FACE="times new roman, times">Current Population:</FONT></TD> 
          <TD>
	    <span id="Population">You need JavaScript</span></td>
        </TR> 
      </TABLE>
<HR WIDTH="80%"> 
    <P><FONT SIZE="-1">For information about how the populations are
      calculated, please see our <A HREF="info.php">Information Page</A>. JavaScript
      pages automatically update every two seconds.</FONT></P>

<SCRIPT LANGUAGE="JavaScript">
StartUp();
</script>

<?php

StandardFooter();


function GetPopulationBreakdown($conn, $ccode, $start_year, $end_year, $pct) {
	$sql = 'select * from idb094 where CTY = "' . $ccode . '" and YR in (' . $start_year . ', ' . $end_year . ')';
	$result = mysql_query($sql, $conn);
	$ageInfo = array(
		$start_year => array(),
		$end_year => array()
	);
	
	while ($row = mysql_fetch_assoc($result)) {
		if ($row['A'] == 0 && $row['E'] == 0) {
			$row['A'] = - 1;
		}
		
		$ageInfo[$row['YR']][$row['A']] = array(
			$row['BSEX'],
			$row['MALE'],
			$row['FEMALE']
		);
	}
	
	mysql_free_result($result);
	$keylist = array_merge(array_keys($ageInfo[$start_year]), array_keys($ageInfo[$end_year]));
	sort($keylist, SORT_NUMERIC);
	$return_arr = array();
	
	foreach ($keylist as $key) {
		if (! isset($return_arr[$key])) {
			$from = $ageInfo[$start_year][$key];
			$to = $ageInfo[$start_year][$key];
			$current = array();
			$current[0] = $from[0] * (1 - $pct) + $to[0] * $pct;
			$current[1] = $from[1] * (1 - $pct) + $to[1] * $pct;
			$current[2] = $from[2] * (1 - $pct) + $to[2] * $pct;
			$return_arr[$key] = $current;
		}
	}
	
	return $return_arr;
}


function GetInfantMortalityRate($conn, $ccode, $start_year, $end_year, $pct_time, $population_total) {
	$sql = 'select YR, IMRB, IMRM, IMRF from idb010 where CTY = "' . $ccode . '" and YR in (' . $start_year . ', ' . $end_year . ')';
	$res = mysql_query($sql, $conn);
	$rates = array(
		$start_year => array(
			0,
			0,
			0
		),
		$end_year => array(
			0,
			0,
			0
		)
	);
	
	while ($row = mysql_fetch_assoc($res)) {
		$rates[$row['YR']] = array(
			$row['IMRB'],
			$row['IMRM'],
			$row['IMRF']
		);
	}
	
	$deaths = array(
		0,
		0,
		0
	);
	
	for ($i = 0; $i < 3; $i ++) {
		$rate = $rates[$start_year][$i] * (1 - $pct) + $rates[$end_year][$i] * $pct;
		$deaths[$i] = $population_total[$i] * $rate;
		settype($deaths[$i], 'integer');
	}
	
	return $deaths;
}


function GetCurrentStats($conn, $ccode, $start_year, $end_year, $pct_time, $population_total) {
	$keys = array(
		'births' => 'CBR',
		'deaths' => 'CDR',
		'migration' => 'NMR'
	);
	
	// Crude birth rate, crude death rate, net migration rate
	$sql = 'select YR, ' . implode(', ', $keys) . ' from idb008 where CTY = "' . $ccode . '" and YR in (' . $start_year . ', ' . $end_year . ')';
	$res = mysql_query($sql, $conn);
	$rates = array(
		$start_year => array(
			0,
			0,
			0
		),
		$end_year => array(
			0,
			0,
			0
		)
	);
	
	while ($row = mysql_fetch_assoc($res)) {
		$rates[$row['YR']] = array();
		
		foreach ($keys as $k => $v) {
			$rates[$row['YR']][$k] = $row[$v];
		}
	}
	
	$stats = array();
	
	foreach ($keys as $k => $v) {
		$per_k = $rates[$start_year][$k] * (1 - $pct) + $rates[$end_year][$k] * $pct;
		$stats[$k] = ($population_total[0] / 1000) * $per_k;
		settype($stats[$k], 'integer');
	}
	
	return $stats;
}

