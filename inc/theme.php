<?PHP  // -*- php -*-

// A theme name, not a page name
$GLOBALS['DefaultTheme'] = 'normal';

// Theme (the .css file name) => User-readable name
$GLOBALS['ThemeNames'] = array('christmas' => 'Christmas',
			       'easter' => 'Easter',
			       'halloween' => 'Halloween',
			       'normal' => 'Normal',
			       'print' => 'Print',
			       'thanksgiving' => 'Thanksgiving',
			       'valentine' => 'Valentine');

$Month = date('n');
$ThemesByDate = array();

// Only include themes that could apply to the current month in order to save
// calculation time.  Also, finding the date for easter and thanksgiving
// could be skipped if we are nowhere near them.

if ($Month == 2)
  $ThemesByDate['valentine'] = mktime(0, 0, 0, 2, 14);
if ($Month == 3 || $Month == 4)
  $ThemesByDate['easter'] = easter_date();
if ($Month == 10)
  $ThemesByDate['halloween'] = mktime(0, 0, 0, 10, 31);
if ($Month == 11)
{
    include_once('dom.php');
    // Thanksgiving is the 4th Thursday (not necessarily the last) in Nov.
    $ThemesByDate['thanksgiving'] = mktime(0, 0, 0, 11, 23 +
					   DayOfMonth(12, date('Y'), 4));
}
if ($Month == 12)
  $ThemesByDate['christmas'] = mktime(0, 0, 0, 12, 25);
		
$now = mktime();
$DaysPrior = 3600 * 24 * 7;
$DaysAfter = 3600 * 24;
$Earliest = 0;
foreach ($ThemesByDate as $t => $data)
{
    if ($now >= $data - $DaysPrior && $now <= $data + $DaysAfter &&
	($Earliest == 0 || $Earliest > $data))
    {
	$GLOBALS['DefaultTheme'] = $t;
	$Earliest = $data;
    }
}


$GLOBAL['HeaderOpts'] = array();		

