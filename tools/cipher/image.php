<?PHP

$Letters = array('pigpen' => array('A' => '_]',
				   'B' => '[_]',
				   'C' => '[_',
				   'D' => '~]_',
				   'E' => '[]~_',
				   'F' => '[~_',
				   'G' => '~]',
				   'H' => '[~]',
				   'I' => '[~',
				   'J' => 'V',
				   'K' => '>',
				   'L' => '<',
				   'M' => '^',
				   'N' => '_].',
				   'O' => '[_].',
				   'P' => '[_.',
				   'Q' => '~]_.',
				   'R' => '[]~_.',
				   'S' => '[~_.',
				   'T' => '~].',
				   'U' => '[~].',
				   'V' => '[~.',
				   'W' => 'V.',
				   'X' => '>.',
				   'Y' => '<.',
				   'Z' => '^.'),
		 'dancingmen' => array('A' => '111B',
				       'B' => '22BB',
				       'C' => '10BB',
				       'D' => '0111F',
				       'E' => '1111',
				       'F' => '010B',
				       'G' => '1011F',
				       'H' => '1100',
				       'I' => '1120',
				       'J' => '10B0',
				       'K' => '0111',
				       'L' => 'BDBB',
				       'M' => '11BB',
				       'N' => 'DBBB',
				       'O' => '11B0',
				       'P' => '1020',
				       'Q' => '1002',
				       'R' => '1102',
				       'S' => 'BBBB',
				       'T' => '1111F',
				       'U' => '100B',
				       'V' => '0120',
				       'W' => '01B0',
				       'X' => '1011',
				       'Y' => '01BB',
				       'Z' => '0102',
				       '0' => '13BB',
				       '1' => '3111',
				       '2' => '30BB',
				       '3' => '3311',
				       '4' => '03BB',
				       '5' => '1311',
				       '6' => '31BB',
				       '7' => '3011',
				       '8' => '33BB',
				       '9' => '0311',
				       // '.' => 'DD22', // D -> Down
				       // ',' => 'DD22R', // R = Rotate CCW 90
				       // '!' => 'UU00', // U -> Up, like shouting at you
				       // '?' => 'SS00', // S = Shrug
				       ),
		 'bionicle' => array('A' => 'C4',
				     'B' => 'C0C4',
				     'C' => 'C2',
				     'D' => 'C2L0L4',
				     'E' => 'B0B4',
				     'F' => 'B0',
				     'G' => 'L0L2L4',
				     'H' => 'B2B6C0C4',
				     'I' => 'L0L4',
				     'J' => 'L0L4C5',
				     'K' => 'L1L3L6',
				     'L' => 'L0L4C3',
				     'M' => 'B2B6',
				     'N' => 'L3L7',
				     'O' => '',
				     'P' => 'L0L4C1',
				     'Q' => 'C3',
				     'R' => 'C1L0L2L4',
				     'S' => 'C1C5',
				     'T' => 'L2L4L6',
				     'U' => 'C0',
				     'V' => 'C0L1L3L5L7',
				     'W' => 'C2C6L1L3L5L7',
				     'X' => 'L1L3L5L7',
				     'Y' => 'L1L3L7',
				     'Z' => 'L1L5',
				     '0' => 'c1',
				     '1' => '-090c1',
				     '2' => '-090-270c1',
				     '3' => '-090-210-330c1',
				     '4' => '-000-090-180-270c1',
				     '5' => '-018-090-162-234-306c1',
				     '6' => 'c2',
				     '7' => '-090c2',
				     '8' => '-090-270c2', 
				     '9' => '-090-210-330c2'),
		 );

$Letters['pigpen2'] = $Letters['pigpen'];
foreach (explode(' ', 'JN KO LP MQ NR OS PT QU RV SJ TK UL VM') as $l)
{
    $Letters['pigpen2'][$l[0]] = $Letters['pigpen'][$l[1]];
}

$Letters['braille'] = false;

foreach (explode(' ', 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z')
	 as $l)
{
    $Letters['dancingmen'][$l . '_'] = $Letters['dancingmen'][$l] . '_';
}

$set = '';
$want = '';
if (isset($_SERVER['PATH_INFO']) && strlen($_SERVER['PATH_INFO']) > 1)
{
    $info = explode('/', $_SERVER['PATH_INFO']);
    $set = $info[1];
    $want = $info[2];
}

if (isset($Letters[$set]))
{
    if (isset($Letters[$set][$want]))
    {
	$want = $Letters[$set][$want];
    }
}
else
{
    $set = '';
    $want = '';
}


if ($set != '')
{
    $set = 'MakeImage_' . $set;
    $image = $set($want);
}
else
{
    die('Wrong image set.');
}

WriteImage($image);


function MakeImage_pigpen2($D)
{
    return MakeImage_pigpen($D);
}


function MakeImage_pigpen($Definition)
{
    $width = 30;
    $height = 30;
    $thickness = 5;
    $Lines = array();
    $Dot = false;
    
    while ($Definition)
    {
	$D = $Definition[0];
	$Definition = substr($Definition, 1);
	
        if ($D == '.')
	  $Dot = true;
	else
	  $Lines[$D] = 1;
    }

    $image = imagecreate($width, $height);
    imagecolorallocate($image, 255, 255, 255);
    $color = imagecolorallocate($image, 0, 0, 0);
    
    if (isset($Lines['[']))
      ThickRoundedLine($image, $thickness, $thickness, 
		       $thickness, $height - $thickness, 
		       $thickness, $color);
    if (isset($Lines[']']))
      ThickRoundedLine($image, $width - $thickness, $thickness, 
		       $width - $thickness, $height - $thickness, 
		       $thickness, $color);
    if (isset($Lines['_']))
      ThickRoundedLine($image, $thickness, $height - $thickness,
		       $width - $thickness, $height - $thickness, 
		       $thickness, $color);
    if (isset($Lines['~']))
      ThickRoundedLine($image, $thickness, $thickness,
		       $width - $thickness, $thickness, 
		       $thickness, $color);
    if (isset($Lines['_']) || isset($Lines['[']) || isset($Lines[']']) ||
	isset($Lines['~']))
    {
	if (! $Dot)
	  return $image;
	
	$DotX = $width / 2;
	$DotY = $height / 2;
	
	if (! isset($Lines['~']))
	  $DotY = $height - ($thickness * 2.5);
	if (! isset($Lines['_']))
	  $DotY = $thickness * 2.5;
	if (! isset($Lines['[']))
	  $DotX = $width - ($thickness * 2.5);
	if (! isset($Lines[']']))
	  $DotX = $thickness * 2.5;

	FilledCircle($image, $DotX, $DotY, $thickness, $color);
	
	return $image;
    }
	
    if (isset($Lines['<']))
    {
	ThickRoundedLine($image, $thickness, $height / 2,
			 $width - $thickness, $thickness,
			 $thickness, $color);
	ThickRoundedLine($image, $thickness, $height / 2,
			 $width - $thickness, $height - $thickness,
			 $thickness, $color);
	$DotX = $width - ($thickness * 2);
	$DotY = $height / 2;
    }
    if (isset($Lines['>']))
    {
	ThickRoundedLine($image, $thickness, $thickness,
			 $width - $thickness, $height / 2,
			 $thickness, $color);
	ThickRoundedLine($image, $thickness, $height - $thickness,
			 $width - $thickness, $height / 2,
			 $thickness, $color);
	$DotX = $thickness * 2;
	$DotY = $height / 2;
    }
    if (isset($Lines['V']))
    {
	ThickRoundedLine($image, $thickness, $thickness,
			 $width / 2, $height - $thickness,
			 $thickness, $color);
	ThickRoundedLine($image, $width / 2, $height - $thickness,
			 $width - $thickness, $thickness,
			 $thickness, $color);
	$DotX = $width / 2;
	$DotY = $thickness * 2;
    }
    if (isset($Lines['^']))
    {
	ThickRoundedLine($image, $thickness, $height - $thickness,
			 $width / 2, $thickness,
			 $thickness, $color);
	ThickRoundedLine($image, $width / 2, $thickness,
			 $width - $thickness, $height - $thickness,
			 $thickness, $color);
	$DotX = $width / 2;
	$DotY = $height - ($thickness * 2);
    }
    
    if ($Dot)
    {
	FilledCircle($image, $DotX, $DotY, $thickness, $color);
    }
    
    return $image;
}


function MakeImage_dancingmen($def)
{
    $width = 34;
    $height = 50;
    $armleg = 16; // length
    $armlegsqrt = round(sqrt(($armleg * $armleg) / 2));
    $thickness = 3;
    $footsize = 0.2;
    $flagpole = 0.5;
    $flagwave = 0.2;
    $flagthickness = 1;
    $flagwavethickness = 3;
    $headthickness = 8;
    $Lines = array();
    $Head = array($width / 2, $height * .2);
    $ArmStart = array($width / 2, $height * 0.4);
    $LegStart = array($width / 2, 7 * ($height / 12));
    $DoFlip = false;
    $DoFlag = false;
    
    // Right arm definitions (diffX, diffY, [diffX, diffY])
    $Arms = array('1' => array($armlegsqrt, - $armlegsqrt),
		  '2' => array(floor($armleg * 0.8), 0),
		  '3' => array($armlegsqrt, $armlegsqrt),
		  'B' => array(floor($armleg * 0.6), 0, 
			       0, - ceil($armleg * 0.4)),
		  'D' => array(floor($armlegsqrt * 0.6), 
			       floor($armlegsqrt * 0.6), 
			       - ceil($armlegsqrt * 0.4), 
			       ceil($armlegsqrt * 0.4)));
    
    // Flag definitions
    $Flags = array('1' => array(- floor($armlegsqrt * $flagpole), 
				- floor($armlegsqrt * $flagpole),
				- floor($armlegsqrt * $flagwave),
				floor($armlegsqrt * $flagwave)),
		   '2' => array(0, - floor($armleg * $flagpole),
				- floor($armleg * $flagwave), 0),
		   'B' => array(0, - floor($armleg * $flagpole),
				- floor($armleg * $flagwave), 0));
    
    // Right leg definitions
    $Legs = array('0' => array(0, $armleg,
			       floor($armleg * $footsize), 0),
		  '1' => array($armlegsqrt, $armlegsqrt,
			       floor($armlegsqrt * $footsize), 
			       - floor($armlegsqrt * $footsize)),
		  '2' => array($armleg, 0, 
			       0, - floor($armleg * $footsize)),
		  'B' => array(floor($armlegsqrt * 0.6), 
			       floor($armlegsqrt * 0.6),
			       - ceil($armlegsqrt * 0.4), 
			       ceil($armlegsqrt * 0.4),
			       floor($armlegsqrt * $footsize), 
			       floor($armlegsqrt * $footsize)));
    
    while (strlen($def) > 4)
    {
	$c = substr($def, strlen($def) - 1);
	$def = substr($def, 0, strlen($def) - 1);
	if ($c == 'F')
	  $DoFlip = true;
        elseif ($c == '_')
	  $DoFlag = true;
    }
    
    // Body
    $Lines[] = array($thickness, 1, $Head[0], $Head[1], 
		     $LegStart[0], $LegStart[1]);
    
    // Right Arm
    if (isset($Arms[$def[1]]))
    {
	$p = $ArmStart;
	$pp = $Arms[$def[1]];
	while (count($pp))
	{
	    $ptemp = array($p[0] + $pp[0], $p[1] + $pp[1]);
	    $Lines[] = array($thickness, 1, $p[0], $p[1], 
			     $ptemp[0], $ptemp[1]);
	    $p = $ptemp;
	    array_shift($pp);
	    array_shift($pp);
	}
	if ($DoFlag && isset($Flags[$def[1]]))
	{
	    $DoFlag = false;
	    $pp = $Flags[$def[1]];
	    $ptemp = array($p[0] + $pp[0], $p[1] + $pp[1]);
	    $Lines[] = array($flagthickness, 0, $p[0], $p[1], 
			     $ptemp[0], $ptemp[1]);
	    $p = $ptemp;
	    $ptemp = array($p[0] + $pp[2], $p[1] + $pp[3]);
	    $Lines[] = array($flagwavethickness, 0, $p[0], $p[1],
			     $ptemp[0], $ptemp[1]);
	}
    }
	    
    // Left Arm
    if (isset($Arms[$def[0]]))
    {
	$p = $ArmStart;
	$pp = $Arms[$def[0]];
	while (count($pp))
	{
	    $ptemp = array($p[0] - $pp[0], $p[1] + $pp[1]);
	    $Lines[] = array($thickness, 1, $p[0], $p[1], 
			     $ptemp[0], $ptemp[1]);
	    $p = $ptemp;
	    array_shift($pp);
	    array_shift($pp);
	}
	if ($DoFlag && isset($Flags[$def[0]]))
	{
	    $DoFlag = false;
	    $pp = $Flags[$def[0]];
	    $ptemp = array($p[0] - $pp[0], $p[1] + $pp[1]);
	    $Lines[] = array($flagthickness, 0, $p[0], $p[1], 
			     $ptemp[0], $ptemp[1]);
	    $p = $ptemp;
	    $ptemp = array($p[0] - $pp[2], $p[1] + $pp[3]);
	    $Lines[] = array($flagwavethickness, 0, $p[0], $p[1],
			     $ptemp[0], $ptemp[1]);
	}
    }

    // Left Leg
    if (isset($Legs[$def[2]]))
    {
	$p = $LegStart;
	$pp = $Legs[$def[2]];
	while (count($pp))
	{
	    $ptemp = array($p[0] - $pp[0], $p[1] + $pp[1]);
	    $Lines[] = array($thickness, 1, $p[0], $p[1], 
			     $ptemp[0], $ptemp[1]);
	    $p = $ptemp;
	    array_shift($pp);
	    array_shift($pp);
	}
    }

    // Right Leg
    if (isset($Legs[$def[3]]))
    {
	$p = $LegStart;
	$pp = $Legs[$def[3]];
	while (count($pp))
	{
	    $ptemp = array($p[0] + $pp[0], $p[1] + $pp[1]);
	    $Lines[] = array($thickness, 1, $p[0], $p[1], 
			     $ptemp[0], $ptemp[1]);
	    $p = $ptemp;
	    array_shift($pp);
	    array_shift($pp);
	}
    }
    
    if ($DoFlip)
    {
	foreach ($Lines as $k => $v)
	{
	    $Lines[$k] = array($v[0], $v[1], $v[2], $height - $v[3],
			       $v[4],  $height - $v[5]);
	}
	$Head = array($Head[0], $height - $Head[1]);
    }

    $image = imagecreate($width, $height);
    imagecolorallocate($image, 255, 255, 255);
    $color = imagecolorallocate($image, 0, 0, 0);

    // Draw head
    FilledCircle($image, $Head[0], $Head[1], $headthickness, $color);
    
    // Draw all of the lines
    foreach ($Lines as $l)
    {
	if ($l[1])
	{
	    ThickRoundedLine($image, $l[2], $l[3], $l[4], $l[5], $l[0],
			     $color);
	}
	else
	{
	    ThickLine($image, $l[2], $l[3], $l[4], $l[5], $l[0], $color);
	}
    }
    
    return $image;
}


function MakeImage_braille($dots)
{
    $width = 18;
    $height = 23;
    $thickness = 5;
    $Lines = array();
    $Third = ($width - ($thickness * 2)) / 3 + $thickness / 2;
    $Quarter = ($height - ($thickness * 3)) / 4 + $thickness / 2;
    $DotPos = array('1' => array($Third, $Quarter),
		    '2' => array($Third, $height / 2),
		    '3' => array($Third, $height - $Quarter),
		    '4' => array($width - $Third, $Quarter),
		    '5' => array($width - $Third, $height / 2),
		    '6' => array($width - $Third, $height - $Quarter));
    
    $image = imagecreate($width, $height);
    imagecolorallocate($image, 255, 255, 255);
    $color = imagecolorallocate($image, 0, 0, 0);
    $color2 = imagecolorallocate($image, 228, 228, 228);
    
    foreach ($DotPos as $v)
    {
	FilledCircle($image, $v[0], $v[1], $thickness * .75, $color2);
    }
    
    for ($i = 0; $i < strlen($dots); $i ++)
    {
	if (isset($DotPos[$dots[$i]]))
	{
	    FilledCircle($image, $DotPos[$dots[$i]][0], 
			 $DotPos[$dots[$i]][1], $thickness, $color);
	}
    }
    return $image;
}


function MakeImage_bionicle($def)
{
    $size = 49;
    $thickness = 2;
    $radius = ($size / 2) - $thickness * 2;
    $radius2 = 4;
    $circledist = $radius - $radius2 - ($thickness * 1.5);
    $thickness2 = 2;
    $center = ($size - 1) / 2;
    
    $image = imagecreate($size, $size);
    $white = imagecolorallocate($image, 255, 255, 255);
    $black = imagecolorallocate($image, 0, 0, 0);
    
    ThickCircle($image, ($size - 1) / 2, ($size - 1) / 2, $thickness, $radius, $black);
    
    while ($def)
    {
	$cmd = substr($def, 0,  1);
	$def = substr($def, 1);
	
	// Translate L into - commands
	if ($cmd == 'L')
	{
	    $cmd = '-';
	    $dest = substr($def, 0, 1);
	    $def = substr($def, 1);
	    $dest = DirToAngle($dest);
	    settype($dest, 'string');
	    while (strlen($dest) < 3)
	    {
		$dest = '0' . $dest;
	    }
	    $def = $dest . $def;
	}
	
	switch ($cmd)
	{
	 case 'C':
	    // Circle near edge
	    $dest = substr($def, 0, 1);
	    $def = substr($def, 1);
	    $dest = DirToAngle($dest);
	    $dest = deg2rad($dest);
	    $x = $center + (cos($dest) * $circledist);
	    $y = $center - (sin($dest) * $circledist);
	    ThickCircle($image, $x, $y, $thickness2, $radius2, $black);
	    break;
	    
	 case '-':
	    // Line from center to edge
	    $dest = substr($def, 0, 3);
	    $def = substr($def, 3);
	    $x = $center;
	    $y = $center;
	    $dest = deg2rad($dest);
	    $x = $center + (cos($dest) * $radius);
	    $y = $center - (sin($dest) * $radius);
	    ThickLine($image, $center, $center, $x, $y, $thickness2, $black);
	    break;
	    
	 case 'B':
	    // Bar perpendicular to center-to-edge, bisecting the line
	    $dest = substr($def, 0, 1);
	    $def = substr($def, 1);
	    $dest = DirToAngle($dest);
	    $dest = deg2rad($dest);
	    $destoff = pi() * 0.33;
	    $x1 = $center + (cos($dest + $destoff) * $radius);
	    $x2 = $center + (cos($dest - $destoff) * $radius);
	    $y1 = $center - (sin($dest + $destoff) * $radius);
	    $y2 = $center - (sin($dest - $destoff) * $radius);
//	    echo "dest $dest off $destoff<br>\n";
//	    echo "$x1, $y1 -- $x2, $y2<br>\n";
	    ThickLine($image, $x1, $y1, $x2, $y2, $thickness2, $black);
	    break;
	    
	 case 'c':
	    // One or two circles in center
	    $dest = substr($def, 0, 1);
	    $def = substr($def, 1);
	    if ($dest > 1)
	    {
		// Draw outer circle
		FilledCircle($image, $center, $center, $radius2 * 4, $black);
		FilledCircle($image, $center, $center, $radius2 * 3, $white);
	    }
	    FilledCircle($image, $center, $center, $radius2 * 2, $black);
	    FilledCircle($image, $center, $center, $radius2, $white);
	    break;
	}
    }
//    exit();
    
    return $image;
}


function ThickLine($image, $x1, $y1, $x2, $y2, $w, $color)
{
    FixPoints($x1, $y1, $x2, $y2);
    
    // Yeay Vectors!
    $d = array($x2 - $x1, $y2 - $y1);
    $v_scale = $w / (2 * sqrt($d[0] * $d[0] + $d[1] * $d[1]));
    $v = array($d[0] * $v_scale, $d[1] * $v_scale);
    if ($d[0] > 0 && $d[1] != 0)
    {
	$v[0] = round($v[0]);
	$v[1] = round($v[1]);
    }
    else
    {
	$v[0] = floor($v[0]);
	$v[1] = floor($v[1]);
    }
    
    $points = array($x1 + $v[1], $y1 - $v[0],
		    $x1 - $v[1], $y1 + $v[0],
		    $x2 - $v[1], $y2 + $v[0],
		    $x2 + $v[1], $y2 - $v[0]);
    
    imagefilledpolygon($image, $points, 4, $color);
    return imagepolygon($image, $points, 4, $color);
}


function ThickRoundedLine($image, $x1, $y1, $x2, $y2, $w, $color)
{
    FixPoints($x1, $y1, $x2, $y2);
    
    // The rounded part will stick out beyond the line defined by
    // (x1,y1)(x2,y2)
    ThickLine($image, $x1, $y1, $x2, $y2, $w, $color);
    
    FilledCircle($image, $x1, $y1, $w, $color);
    return FilledCircle($image, $x2, $y2, $w, $color);
}


function ThickCircle($image, $x, $y, $w, $r, $color)
{
    for ($i = 0; $i <= $w; $i += 0.25)
    {
	$radius = $r + $w - $i;
	imageellipse($image, $x, $y, $radius * 2, $radius * 2, $color);
    }
    return $image;
}


function FilledCircle($image, $x, $y, $w, $color)
{
    imagefilledellipse($image, $x, $y, $w, $w, $color);
    return imageellipse($image, $x, $y, $w, $w, $color);
}


function FixPoints(&$x1, &$y1, &$x2, &$y2)
{
    $x1 = round($x1, 10);
    $x2 = round($x2, 10);
    $y1 = round($y1, 10);
    $y2 = round($y2, 10);
    if ($x2 < $x1 || ($x1 == $x2 && $y1 > $y2))
    {
	$x = $x1;
	$x1 = $x2;
	$x2 = $x;
	
	$y = $y1;
	$y1 = $y2;
	$y2 = $y;
    }
}


function WriteImage($Image)
{
    if (function_exists('imagegif'))
    {
	header('Content-type: image/gif');
	imagegif($Image);
    }
    elseif (function_exists('imagejpeg'))
    {
	header('Content-type: image/jpeg');
	imagejpeg($Image);
    }
    elseif (function_exists('imagepng'))
    {
	header('Content-type: image/png');
	imagepng($Image);
    }
    else
    {
	die('This PHP server can not write gif, jpeg, nor png files.');
    }
}


// Convert a 0-7 direction (0 = N, 2 = E) into a decimal angle
function DirToAngle($dir)
{
    $angle = 90 - (45 * $dir);
    while ($angle < 0)
    {
	$angle += 360;
    }
    return $angle;
}