<?php

$Incoming = array('InitCode');

foreach ($Incoming as $v)
{
    if (!isset($$v))
        $$v = '';
    elseif (get_magic_quotes_gpc())
        $$v = stripslashes($$v);
}

?><html><head><title>Test</title></head>
<body>
<form method=post action="<?= $PHP_SELF ?>">
<table>
  <tr>
    <td colspan=2>Code to run:<br>
      <textarea name="InitCode" cols=50 rows=5><?=
      htmlspecialchars(trim($InitCode)) ?></textarea></td>
  </tr>
  <tr>
    <td colspan=2 align=center>
      <input type=submit name=submit value="Run Snippet">
    </td>
  </tr>
</table>
</form>
<?php

if (isset($submit))
{

?>
<hr>
<p>Running the test code.</p>
<pre>
<?php

    ob_start();
    DoEvaluation();
    $c = ob_get_contents();
    ob_end_clean();
    echo nl2br(htmlspecialchars($c));
    
    echo "\n</pre><p>Complete.</p>\n";
}



function DoEvaluation()
{
    global $InitCode;
    
    eval($InitCode);
}

?>
</body></html>
