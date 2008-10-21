<?PHP

if (stristr($GLOBALS['PHP_SELF'], 'faq.php') !== false)
    $is_manual = false;
else
    $is_manual = true;

if ($is_manual)
    $faq_url = '#faq';
else
    $faq_url = 'faq.php';

?>
<p>Marco is now "end of life" software, which means I no longer will support
it.  Because it is no longer supported, I have opened up the registration
page and it will generate you a working code automatically.</p>

<p>If you were asking about a problem, make sure to check the <a
href="<?= $faq_url ?>">FAQ</a> (Frequently Asked Questions).  Also,
if a particular feature has you stumped, try checking the
<a href="manual.php">manual</a> and see if the answer is there.</p>

