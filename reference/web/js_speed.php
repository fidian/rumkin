<?php

require '../../functions.inc';
StandardHeader(array(
		'title' => 'JavaScript Speed Enhancements',
		'topic' => 'web',
		'callback' => 'insert_js'
	));

?>

<form method=get action="" name="testform" style="display: none">
<input type=hidden name="testtext" value="">
</form>

<p>Programmers should strive to make their code run fast when possible.
The exact same result in JavaScript can take vastly different amounts of
time when achieved by different means.  In order to help out JavaScript
programmers everywhere, I have set up this demo page.  You will see
different versions of code and the amount of time each one takes.  These
times are calculated live by your browser.  A quick pass will calculate
really rough numbers, then they will be updated by a second loop that takes
longer and calculates a somewhat more accurate average.</p>

<p>One key aspect of this page that will likely set it apart from others
along the same vein is that this one is actually performing the good and bad
versions of the code and will give you the live results of the tests as they
are performed.</p>

<?php Section('Dereferencing'); ?>

<p>If you are looking at document.my_form.some_input_element.value often, it
will be best to store the value to a local variable.  This tip was given to
me by a reader of my <a href="/tools/compression/compress_huff.php">Huffman
JavaScript Compression</a> page.  He said that my code would be sped up by a
factor of 10 when I made this change.  He was right.  This particular
example is similar and you can obviously tell that using a local variable is
far more efficient.</p>

<?php

$code = array(
	'for (var i = 0; i < 100; i ++) {
    a = document.testform.testtext.value;
    b = document.testform.testtext.value.length;
    c = document.testform.testtext.value.substr(2, 1);
}',
	'v = document.testform.testtext.value;
for (var i = 0; i < 100; i ++) {
    a = v;
    b = v.length;
    c = v.substr(2, 1);
}'
);
$results = array(
	array(
		'Firefox 2.0.0.1',
		'Windows XP',
		'5x faster'
	),
	array(
		'Internet Explorer 7',
		'Windows XP',
		'5x to 25x faster'
	),
	array(
		'Opera 9.10',
		'Windows XP',
		'6x faster'
	),
);
ShowExample($code, $results);

?>

<p>Internet Explorer usually provided me with a 20-25x speed increase, but
sometimes it plummetted down to a mere 4 or 5x speed increase.  No matter
what, it is clear that it is far faster to use a local variable.</p>

<?php Section('String Concatenation'); ?>

<p>One other tip that I get a lot is that I should avoid lots of little
string concatenations.  I also read that string concatenations get worse
with the size of the string being concatenated.  Instead, the little
substrings should be placed into an array and then joined together to make
one big string in the end.</p>

<?php

$code = array(
	'a = \'\';
b = \'abcdefghijklmnopqrstuvwxyz\';
b += \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\';
for (var i = 0; i < 500; i ++) {
    a += b + b + b + b + b;
}',
	'a = new Array();
b = \'abcdefghijklmnopqrstuvwxyz\';
b += \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\';
for (var i = 0; i < 500; i ++) {
    a.push(b);
    a.push(b);
    a.push(b);
    a.push(b);
    a.push(b);
}
a = a.join(\'\');'
);
$results = array(
	array(
		'Firefox 2.0.0.1',
		'Windows XP',
		'Questionable'
	),
	array(
		'Internet Explorer 7',
		'Windows XP',
		'6x faster'
	),
	array(
		'Opera 9.10',
		'Windows XP',
		'2x faster'
	),
);
ShowExample($code, $results);

?>

<p>You will notice that FireFox says "Questionable" for the speed increase.
For littler string concatenations, it is actually slower to put the strings
into an array and concatenate them.  For larger strings, the speed savings
are negligable.</p>

<?php Section('Additional Resources'); ?>

<ol>

<li><a
href="http://dev.opera.com/articles/view/efficient-javascript/">Efficient
JavaScript</a> - Tips from the developers of Opera on how to write good
code.</li>

<li><a
href="http://www.softwaresecretweapons.com/jspwiki/Wiki.jsp?page=JavascriptStringConcatenation">Javascript
String Concatenation</a> - Shows how string concatenation is slow and using
join() can save you lots of time.

</ol>
	

<?php

StandardFooter();


function insert_js() {
	
	?>
<script language="JavaScript">
var js_speed_num = 1;
var js_cont = 1;
var js_count = 0;
var js_loop = 0.2;


function js_speed_test(js)
{
	var js_cont, js_count, js_timer, js_timer2, js_max_time;

	js = js.replace(/&amp;/ig, '&');
	js = js.replace(/&lt;/ig, '<');
	js = js.replace(/&gt;/ig, '>');
	js = js.replace(/<br>/ig, '');
	js = js.replace(/&nbsp;/ig, ' ');
	
	js_cont = 1;
	js_count = -1;
	js_timer = new Date();
	js_timer2 = new Date();
	js_max_time = 1000 * js_loop;

	while (js_timer2 - js_timer < js_max_time)
	{
		eval(js);
		js_count ++;
		js_timer2 = new Date();
	}

	return Math.floor(js_count / js_loop) + " per second";
}


function js_speed_work()
{
	e = document.getElementById('example' + js_speed_num);
	f = document.getElementById('result' + js_speed_num);
	if (e && f)
	{
		if (js_loop == 1)
		{
			f.innerHTML = 'Working...';
		}
		f.innerHTML = js_speed_test(e.innerHTML);
		js_speed_num ++;
		js_speed_loader();
	}
	else if (js_loop <= 1)
	{
		js_loop = 4;
		js_speed_num = 1;
		js_speed_loader();
	}
}


function js_speed_loader()
{
	if (js_speed_old_onload)
	{
		js_speed_old_onload();
		js_speed_old_onload = null;
	}
	if (js_loop <= 1)
	{
		window.setTimeout('js_speed_work()', 1);
	}
	else
	{
		window.setTimeout('js_speed_work()', 1000);
	}
}


js_speed_old_onload = window.onload;
window.onload = js_speed_loader;
</script>
<?php
}


function ShowExample($code, $res) {
	global $ShowExampleNum;
	
	if (! isset($ShowExampleNum))$ShowExampleNum = 0;
	MakeBoxTop('center');
	
	foreach ($code as $c) {
		$ShowExampleNum ++;
		echo "<table border=1 cellpadding=5 cellspacing=0><tr>\n";
		echo "<td><div id='example$ShowExampleNum'>";
		$c = htmlspecialchars($c);
		$c = nl2br($c);
		$c = str_replace('  ', '&nbsp; ', $c);
		echo $c . "</div></td>\n";
		echo "</tr><tr>\n";
		echo "<td><div id='result$ShowExampleNum'>No results yet</div></td>\n";
		echo "</tr></table>\n";
	}
	
	echo '<table border=1 cellpadding=2 cellspacing=0 align=center ' . "style='font-size:0.8em'>\n";
	echo "<tr><th>Browser</th><th>Operating System</th><th>Result</th></tr>\n";
	
	foreach ($res as $r) {
		echo '<tr><td>' . htmlspecialchars($r[0]) . '</td><td>' . htmlspecialchars($r[1]) . '</td><td>' . htmlspecialchars($r[2]) . '</td></tr>' . "\n";
	}
	
	echo "</table>\n";
	MakeBoxBottom();
}

