<?php

function DB_Update($db, $id, $values)
{
    foreach ($values as $k => $v)
    {
	mysql_query("update $db set $k='$v' where id=$id");
    }
}

function ShowSelectList($name, $data, $default = 0)
{
    echo "<select name=\"$name\">\n";
    foreach ($data as $k => $v)
    {
        $data_rev[$v] = $k;
    }
    ksort($data_rev);
    foreach ($data_rev as $v => $k)
    {
        echo "<option value=\"$k\"";
	if ($k == $default)
	    echo ' SELECTED';
	echo ">" . htmlspecialchars($v) . "</option>\n";
    }
    echo "</select>\n";
}


$DB_MonthNumToName[1] = 'January';
$DB_MonthNumToName[2] = 'February';
$DB_MonthNumToName[3] = 'March';
$DB_MonthNumToName[4] = 'April';
$DB_MonthNumToName[5] = 'May';
$DB_MonthNumToName[6] = 'June';
$DB_MonthNumToName[7] = 'July';
$DB_MonthNumToName[8] = 'August';
$DB_MonthNumToName[9] = 'September';
$DB_MonthNumToName[10] = 'October';
$DB_MonthNumToName[11] = 'November';
$DB_MonthNumToName[12] = 'December';

$DB_Todo_Categories[0] = 'Unknown';
$DB_Todo_Categories[1] = 'Website';
$DB_Todo_Categories[2] = 'Marco';


// News updates
$DB_Projects[0] = 'Unknown';
$DB_Projects[1] = 'All';
$DB_Projects[2] = 'Marco';
$DB_Projects[3] = 'Handhelds';


$DB_Handheld_Manufacturer[0] = 'Unknown';
$DB_Handheld_Manufacturer[1] = 'Palm / 3Com';
$DB_Handheld_Manufacturer[2] = 'Handspring';
$DB_Handheld_Manufacturer[3] = 'HandEra';
$DB_Handheld_Manufacturer[4] = 'IBM';
$DB_Handheld_Manufacturer[5] = 'Symbol';
$DB_Handheld_Manufacturer[6] = 'Sony';

$DB_Handheld_IR[0] = 'Unknown';
$DB_Handheld_IR[1] = 'Yes';
$DB_Handheld_IR[2] = 'No';

$DB_Handheld_Battery_Type[0] = 'Unknown';
$DB_Handheld_Battery_Type[1] = '2 AAA';
$DB_Handheld_Battery_Type[2] = 'Lithium-Ion';

$DB_Handheld_Processor[0] = 'Unknown';
$DB_Handheld_Processor[1] = 'Dragonball (16 mhz)';
$DB_Handheld_Processor[2] = 'Dragonball EZ (16 mhz)';
$DB_Handheld_Processor[3] = 'Dragonball EZ (20 mhz)';
$DB_Handheld_Processor[4] = 'Dragonball VZ (33 mhz)';

$DB_Handheld_Processor_Long[0] = 'Unknown';
$DB_Handheld_Processor_Long[1] = 'Motorola Dragonball ????????? (16 mhz)';
$DB_Handheld_Processor_Long[2] = 'Motorola Dragonball MC68328EZ (16 mhz)';
$DB_Handheld_Processor_Long[3] = 'Motorola Dragonball MC68328EZ (20 mhz)';
$DB_Handheld_Processor_Long[4] = 'Motorola Dragonball MC?????VZ (33 mhz)';

$DB_Handheld_Ram[0] = 'Unknown';
$DB_Handheld_Ram[1] = '< 1 MB';
$DB_Handheld_Ram[2] = '1 MB';
$DB_Handheld_Ram[3] = '2 MB';
$DB_Handheld_Ram[4] = '4 MB';
$DB_Handheld_Ram[5] = '8 MB';

$DB_Handheld_Flashrom[0] = 'Unknown';
$DB_Handheld_Flashrom[1] = 'Yes';
$DB_Handheld_Flashrom[2] = 'No';

$DB_Handheld_ScreenDepth[0] = 'Unknown';
$DB_Handheld_ScreenDepth[1] = 'Black & White or Grays (unknown bpp)';
$DB_Handheld_ScreenDepth[2] = 'Black & White (1 bpp)';
$DB_Handheld_ScreenDepth[3] = '4 Grays (2 bpp)';
$DB_Handheld_ScreenDepth[4] = '16 Grays (4 bpp)';
$DB_Handheld_ScreenDepth[5] = '256 Grays (8 bpp)';
$DB_Handheld_ScreenDepth[6] = 'Color (unknown bpp)';
$DB_Handheld_ScreenDepth[7] = '256 Colors (8 bpp)';
$DB_Handheld_ScreenDepth[8] = '65536 Colors (16 bpp)';

$DB_Handheld_Cradle[0] = 'Unknown';
$DB_Handheld_Cradle[1] = 'Yes';
$DB_Handheld_Cradle[2] = 'Yes, Charger';
$DB_Handheld_Cradle[3] = 'No';

$DB_Handheld_Connection[0] = 'Unknown';
$DB_Handheld_Connection[1] = 'None';
$DB_Handheld_Connection[2] = 'Serial (RS232)';
$DB_Handheld_Connection[3] = 'USB';

$DB_Handheld_Expansion[0] = 'Unknown';
$DB_Handheld_Expansion[1] = 'None';
$DB_Handheld_Expansion[2] = 'Springboard';
$DB_Handheld_Expansion[3] = 'CompactFlash';
$DB_Handheld_Expansion[4] = 'CompactFlash Type I/II, SD/MMC';
$DB_Handheld_Expansion[5] = 'Memory Stick';

?>
