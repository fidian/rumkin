<?PHP

include '../functions.inc';

CheckForLogin('restricted');

if (! isset($theme) || ! isset($GLOBALS['ThemeNames'][$theme]))
{
    $theme = array_keys($GLOBALS['ThemeNames']);
    $theme = $page[0];
}

if (! isset($math))
{
    $math = 0;
}

if ($math)
  include '../inc/math.php';

StandardHeader(array('title' => 'Theme Tester',
		     'topic' => 'restricted',
		     'theme' => $theme));

?>
<p>This is a theme tester.  It is supposed to be able to show you
the different themes and how they would look with a sample web
page.  Blah blah blah blah blah.  In here I will also have sample things,
such as superscript (12<sup>th</sup>) and subscript (H<sub>2</sub>O) so that
the paragraph spacing can be better observed.
Moses supposes his toeses are roses but Moses supposes erroneously.
Moses supposes his toeses are roses but Moses supposes erroneously.
</p>
	
<ul>
<li><font color="<?= $GLOBALS['MyTheme']['link'] ?>"><u>Link color</u></font>
<li><font color="<?= $GLOBALS['MyTheme']['alink'] ?>"><u>Active color</u></font>
<li><font color="<?= $GLOBALS['MyTheme']['vlink'] ?>"><u>Visited color</u></font>
</ul>

<?PHP Section('Section Break') ?>
	
<p>If you could not tell by the obvious wording, this is a new section.</p>

<?PHP MakeBoxTop('center') ?>
<p>Select a new theme from the box below:	</p>
<form method=get action=theme.php name="theform">
<input type=hidden name=math value=<?= $math ?>>
<select name=theme onchange="theform.submit()">
<?PHP

foreach ($GLOBALS['ThemeNames'] as $k => $v)
{
   echo '<option value="' . urlencode($k) . '"';
   if ($k == $theme)
      echo ' SELECTED';
   echo '>' . $k  . "\n";
}

?></select>
</form>
	
<p>Mary had a little lamb, little lamb, little lamb.<br>
Mary had a little lamb; its fleece as white as snow.<br>
Everywhere that Mary went, Mary went, Mary went &ndash;<br>
Everywhere that Mary went the lamb was sure to go.</p>
<?PHP

MakeBoxBottom();

?>
	
<form method=get action=theme.php name="form2">
<input type=hidden name=theme value="<?= $theme ?>">
<p><input type=checkbox name=math<?PHP if ($math) echo " CHECKED"; 
?> onchange="form2.submit();"> - Math</p>
</form>

<?PHP if ($math) { ?>
<p><font class=math>R = I - 2 {V \times V ^ T\over V ^ T \times V}</font> is
<?PHP MathFormulaInline('R = I - 2 {V \times V ^ T\over V ^ T \times V}') ?></p>

<?PHP
MathFormulaBox('R = I - 2 {V \times V ^ T\over V ^ T \times V}');
MathFormulaBox('R = I - 2 {V \times V ^ T\over V ^ T \times V}', 1);

} ?>

<p>End of text.</p>

<?PHP

StandardFooter();