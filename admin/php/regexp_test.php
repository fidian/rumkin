<?php

$Incoming = array(
	'string',
	'regexp',
	'replacement',
	'function'
);

foreach ($Incoming as $v) {
	if (! isset($$v))$$v = '';
	elseif (get_magic_quotes_gpc())$$v = stripslashes($$v);
}

?><html><head><title>Test</title></head>
<body>
<form method=post action="<?php echo $PHP_SELF ?>">
<table>
  <tr>
    <td colspan=2>Your regexp:<br>
      <textarea name="regexp" cols=50 rows=3><?php echo htmlspecialchars(trim($regexp)) ?></textarea></td>
  </tr>
  <tr>
    <td colspan=2>Your string:<br>
      <textarea name="string" cols=50 rows=3><?php echo htmlspecialchars(trim($string)) ?></textarea></td>
  </tr>
  <tr>
    <td colspan=2>Replacement (optional):<br>
      <textarea name="replacement" cols=50 rows=3><?php echo htmlspecialchars(trim($replacement)) ?></textarea></td>
  </tr>
  <tr>
    <td align=right>Function to call:</td>
    <td><select name="function">
      <option value="ereg"<?php echo ($function == 'ereg') ? ' SELECTED' : ''

?>>ereg($regexp, $string, $regs)</option>
      <option value="eregi"<?php echo ($function == 'eregi') ? ' SELECTED' : ''

?>>eregi($regexp, $string, $regs)</option>
      <option value="ereg_replace"<?php echo ($function == 'ereg_replace') ? ' SELECTED' : ''

?>>ereg_replace($regexp, $string, $replacement)</option>
      <option value="eregi_replace"<?php echo ($function == 'eregi') ? ' SELECTED' : ''

?>>eregi_replace($regexp, $string, $replacement)</option>
      <option value="preg_match"<?php echo ($function == 'preg_match') ? ' SELECTED' : ''

?>>preg_match($regexp, $string, $replacement)</option>
      <option value="preg_replace"<?php echo ($function == 'preg_replace') ? ' SELECTED' : ''

?>>preg_replace($regexp, $string, $replacement)</option>
      </select></td>
  </tr>
  <tr>
    <td colspan=2 align=center>
      <input type=submit name=submit value="Run Test">
    </td>
  </tr>
</table>
</form>
<?php

if (isset($submit)) {
	
	?>
<hr>
<p>Results from your last test:</p>
<?php
	
	if ($function == 'ereg') {
		$result = ereg($regexp, $string, $regs);
		DumpValue('result', $result);
		DumpValue('regs', $regs);
	} elseif ($function == 'eregi') {
		$result = eregi($regexp, $string, $regs);
		DumpValue('result', $result);
		DumpValue('regs', $regs);
	} elseif ($function == 'ereg_replace') {
		$result = ereg_replace($regexp, $replacement, $string);
		DumpValue('result', $result);
	} elseif ($function == 'eregi_replace') {
		$result = eregi_replace($regexp, $replacement, $string);
		DumpValue('result', $result);
	} elseif ($function == 'preg_match') {
		$result = preg_match($regexp, $string, $regs);
		DumpValue('result', $result);
		DumpValue('regs', $regs);
	} elseif ($function == 'preg_replace') {
		$result = preg_replace($regexp, $replacement, $string);
		DumpValue('result', $result);
	}
}


function DumpValue($Name, $Val) {
	echo "<table border=1><tr><td>$Name</td><td>";
	
	if (is_array($Val)) {
		echo '<table border=1>';
		
		foreach ($Val as $k => $v) {
			$k = htmlspecialchars($k);
			$v = nl2br(htmlspecialchars($v));
			echo "<tr><td>$k</td><td>$v</td></tr>\n";
		}
		
		echo '</table>';
	} else {
		echo htmlspecialchars($Val);
	}
	
	echo "</td></tr></table>\n";
}

?>
</body></html>
