<pre><?
//  $pat = "/[\\200-\\377]/";
//  $func = 'preg_match';
  $pat = "[\\200-\\377]";
  $func = 'ereg';
  
  echo "Pattern is $pat\n";
  echo "Function is $func\n";

  $lastResult = false;
  $MatchChars = array();
  for ($i = 0; $i < 256; $i ++) {
     $c = chr($i);
     $result = $func($pat, $c);
     if ($result)
        $MatchChars[] = $i;
     if ($result != $lastResult) {
        if ($result) {
	   echo "$i - ";
	} else {
	   echo ($i - 1) . "\n";
	}
	$lastResult = $result;
     }
  }
  if ($lastResult) {
     echo "255\n";
  }
  echo "\n\n";
  $spot = 0;
  echo "<table border=1><tr><th>Char</th><th>Int</th>
  <th>Hex</th><th>Oct</th></tr>\n";
  foreach ($MatchChars as $i) {
     $c = htmlspecialchars(chr($i));
     $h = dechex($i);
     $o = decoct($i);
     echo "<tr><td>$c</td><td>$i</td><td>$h</td><td>$o</td></tr>\n";
  }
  echo "</table>\n";
?>
