<?php

require '../../functions.inc';
StandardHeader(array(
		'title' => 'Passing Data To/From Popup Window',
		'topic' => 'web'
	));

?>

<p>The time may come when you want to open up some sort of popup window,
pass data into it, and pass data out of it back to the window opener.
This task can be accomplished in three easy steps.</p>

<p>First, make a ghost form that will be used to pass data into the popup.</p>

<?php MakeBoxTop('center'); ?>
&lt;form name=ghost method=post target="the_target_window" action="/the/destination.php"&gt;<br>
&lt;input type=hidden name="data" value=""&gt;<br>
&lt;/form&gt;
<?php MakeBoxBottom(); ?>

<p>Mix in a little JavaScript.</p>

<?php MakeBoxTop('center'); ?>
function submit_form()<br>
{<br>
&nbsp; &nbsp; document.ghost.data.value = document.other_form.text_area.value;<br>
&nbsp; &nbsp; TgtWindow = window.open('', 'the_target_window', 'attributes=go_here');<br>
&nbsp; &nbsp; TgtWindow.focus();<br>
&nbsp; &nbsp; document.ghost.submit();<br>
}
<?php MakeBoxBottom(); ?>

<p>Now you can use window.opener to get back to the parent.  Set whatever data
you want, like the JavaScript example I have below.  I used it when I pressed
a "Save" style of button to send the reformatted text back to the original
form.</p>

<?php MakeBoxTop('center'); ?>
window.opener.document.other_form.text_area.value = "altered state";<br>
window.opener.focus();<br>
window.close();
<?php MakeBoxBottom('center'); ?>

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

