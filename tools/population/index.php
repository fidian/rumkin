<?PHP

include '../../functions.inc';
include 'population.inc';

StandardHeader(array('title' => 'Population Counter - Country Index',
                     'header' => 'Population Clock Index',
		     'topic' => 'population'));

$conn = OpenDBConnection('Population');

// The number of columns in the resulting list.
$Columns = 3;

?>

<P ALIGN="center">Click on one of the
following countries to see its current population statistics.</P>

<?PHP

echo "<table border=0 cellpadding=0 cellspacing=0 width=\"100%\">\n";

$sql = 'select CCODE, CNAME from idbctys order by CNAME';
$result = mysql_query($sql, $conn);

$Country = array();
while ($row = mysql_fetch_assoc($result))
{
    $Country[$row['CCODE']] = $row['CNAME'];
}
mysql_free_result($result);

$Keys = array_keys($Country);
$CountriesTotal = count($Country);
$CountryIndex = 0;
$CountryBase = (int) $CountriesTotal / $Columns;

while ($CountryBase > $CountryIndex)
{
    echo "  <tr>\n";
    $ColumnNumber = 0;
    while ($ColumnNumber < $Columns)
    {
        echo "    <td width=\"" . (100 / $Columns) . "%\">";
        if ($CountryIndex + ($CountryBase * $ColumnNumber) < $CountriesTotal)
        {
            echo "<a href=\"country.php?CCODE=" .
                urlencode($Keys[$CountryIndex + 
                    ($CountryBase * $ColumnNumber)]) .
                "\">" .
                $Country[$Keys[$CountryIndex + ($CountryBase * $ColumnNumber)]] .
                "</a>";
        }
        $ColumnNumber ++;
        echo "\n";
    }
    $CountryIndex ++;
    echo "  </tr>\n";
}

?>
</table>

<P ALIGN="center"><FONT SIZE="-1">Information about how we perform our
<A HREF="info.php">calculations</A>.<BR> Census Bureau information last
updated <?= $LastUpdated ?></FONT></P>

<?PHP
StandardFooter();
