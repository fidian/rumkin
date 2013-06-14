---
title: The Great JavaScript Marquee Generator
template: page.jade
js: generator.js depends/random.js depends/range.js depends/repeat.js hide/backspace.js hide/explode.js hide/fly-off.js hide/none.js hide/slide-left.js hide/slide-right.js show/cryptography.js show/implode.js show/none.js show/slam.js show/slide-left.js show/slide-right.js show/typing.js
css: generator.css
module: generator
---

This JavaScript marquee generator will create the JavaScript for you to include into your web pages.  It is fairly painless.  Just select your method and fill in the boxes.  When you press "Generate" it will show you the results and also perform the marquee in your browser.

The places you can send the marquee are an element, any input area, the window's title or the status bar of the window.  Currently the status bar is pretty much obsolete and browsers do not let you change it.

Delays are in milliseconds.  There are 1000 in a single second.  A value of 10 is *very* fast and 2000 seconds is really slow.

<div generator>
BUILD A FORM HERE
<p>Example:<br><div id="example"></div>
</div>


	include '../../functions.inc';
	$GLOBALS['Scripts'] = array(
		'Automatic Typing' => array(
			'Desc' => 'Letters are typed into the status line with the ' . 'same delay between each character.',
			'Func' => 'autotype',
			'Repeat' => 2,  // Optionally repeat
			'Multi' => false,
			'Keys' => array(
				'ScrollDelay' => array(
					'Delay between each letter',
					200
				),
				'PauseTime' => array(
					'Time to pause before repeating<br>' . '(Only if repeating)',
					8000
				),
			),
		),
		'Bounce' => array(
			'Desc' => 'Similar to the Display method, but makes the ' . 'message bounce back and forth on the status bar.',
			'Func' => 'bounce',
			'Repeat' => 2,  // Optionally repeat
			'Multi' => false,
			'Keys' => array(
				'Bounces' => array(
					'How many "bounces"?<br>' . '(Only if not repeating)',
					3
				),
				'ScrollDelay' => array(
					'Delay between movements',
					50
				),
			),
		),
		'Cryptography' => array(
			'Desc' => 'Random letters are put into the status line.  They ' . 'continue to change until they are the right letter for that ' . 'position in your message, or until the maximum number of ' . 'loops occur.  The correct message is always the result.',
			'Func' => 'crypt',
			'Repeat' => 2,  // Optionally repeat
			'Multi' => false,
			'Keys' => array(
				'Loops' => array(
					'How many guesses until the the correct ' . 'message is shown?',
					200
				),
				'ScrollDelay' => array(
					'Delay between movements',
					50
				),
				'RepeatDelay' => array(
					'Delay between repeats<br>' . '(Only if repeating)',
					8000
				),
			),
		),
		'Display' => array(
			'Desc' => 'Really simple.  You likely want to use another one.  If ' . 'you desperately want something like this, it might be better ' . 'if you edit your <tt>body</tt> tag with the <tt>onload=</tt> ' . 'part resembling this:<br><tt>onload="window.status=\'Your' . '&nbsp;Message\'"</tt>',
			'Func' => 'display',
			'Repeat' => 0,  // Does not repeat
			'Multi' => false,
			'Keys' => array(),
		),
		'Display Multiple' => array(
			'Desc' => 'Rotates through a set of messages by merely setting the ' . 'status bar to the message (there is no animation of any sort).  ' . 'Time will pass and your second/third/etc. message will show.',
			'Func' => 'display_multi',
			'Repeat' => 2,  // Optionally repeat
			'Multi' => true,
			'Keys' => array(
				'WaitTime' => array(
					'How long to wait between messages',
					5000
				),
			),
		),
		'Implode' => array(
			'Desc' => 'Your message, spread out with spaces between each letter, ' . 'gradually have the spaces removed, leaving your message ' . 'complete.  The process can optionally repeat.',
			'Func' => 'implode',
			'Repeat' => 2,  // Optionally repeat
			'Multi' => false,
			'Keys' => array(
				'ScrollDelay' => array(
					'Delay between movements',
					50
				),
				'PauseTime' => array(
					'Delay before repeating<br>' . '(Only if repeating)',
					8000
				),
			),
		),
		'In-Out' => array(
			'Desc' => 'Scrolls your text in, from the left, pauses a bit and ' . 'then scrolls it away.',
			'Func' => 'in-out',
			'Repeat' => 2,  // Optionally repeat
			'Multi' => false,
			'Keys' => array(
				'PauseTime' => array(
					'How long to show the message',
					8000
				),
				'ScrollDelay' => array(
					'Delay between movements',
					50
				),
				'HideTime' => array(
					'How long the message should be hidden<br>' . '(Only if repeating)',
					4000
				),
			),
		),
		'In-Out Multi' => array(
			'Desc' => 'Scrolls your message, a line at a time, just like the ' . 'In-Out method.',
			'Func' => 'in-out_multi',
			'Repeat' => 2,  // Optionally repeat
			'Multi' => true,
			'Keys' => array(
				'PauseTime' => array(
					'How long to show the message',
					8000
				),
				'ScrollDelay' => array(
					'Delay between movements',
					50
				),
				'HideTime' => array(
					'How long the message should be hidden<br>' . '(Only if repeating)',
					2000
				),
			),
		),
		'Realistic Typing' => array(
			'Desc' => 'It looks somewhat like someone is actually typing ' . 'the message on the status bar.  The delay is actually ' . 'a random number between 1 and the maximum delay.',
			'Func' => 'type',
			'Repeat' => 2,  // Optionally repeat
			'Multi' => false,
			'Keys' => array(
				'ScrollDelay' => array(
					'Maximum delay for typing',
					500
				),
				'WaitTime' => array(
					'Delay between repeats<br>' . '(Only if repeating)',
					8000
				),
			),
		),
		'Scroll' => array(
			'Desc' => 'Scrolls your text from the far right of your ' . 'browser window to the far left and off the status bar.',
			'Func' => 'scroll',
			'Repeat' => 2,  // Optionally repeat
			'Multi' => false,
			'Keys' => array(
				'ScrollDelay' => array(
					'Delay between movements',
					50
				),
				'WaitTime' => array(
					'Delay between repeats<br>' . '(Only if repeating)',
					8000
				),
			),
		),
		'Slam' => array(
			'Desc' => 'Slams the letters, one by one, from the far right ' . 'of the status bar into a complete message at the left of ' . 'the bar.',
			'Func' => 'slam',
			'Repeat' => 2,  // Optionally repeat
			'Multi' => false,
			'Keys' => array(
				'ScrollDelay' => array(
					'Delay between movements',
					20
				),
				'Pause' => array(
					'Pause after each "slammed" letter',
					100
				),
				'WaitTime' => array(
					'Delay between repeats<br>' . '(Only if repeating)',
					8000
				),
			),
		),
	);

	if (isset($_GET['JS']))$JS = $_GET['JS'];

	if (isset($_POST['JS']))$JS = $_POST['JS'];

	if (isset($JS) && isset($Scripts[$JS]))PrintJSPage($JS);
	else PrintIndex();

	// //////////////////////////////////////////////////////////////////////////
	function PrintIndex() {
		StandardHeader(array(
				'title' => 'The Great JavaScript Marquee Generator',
				'heading' => 'Marquee Generator',
				'topic' => 'marquee'
			));
		
		?><script language="JavaScript">
	<!-- Hide
	function marquee()
	{
	  window.status = "This is the status bar";
	  window.setTimeout('marquee()', 1000);
	}
	marquee();
	// unhide -->
	</script>
	<p>This JavaScript Marquee Generator will create the JavaScript
	for you to include into your web pages.  It is fairly painless.
	Just fill in all of the boxes for the type of Marquee you want,
	and hit the Generate button.  Not only will the JavaScript be
	created, but it will also be stuck into that page, so you can
	see exactly what that would look like.  All of the messages
	scroll on your status bar, so make sure to look there now.
	In fact, you should see "<b>This is the status bar</b>"
	there now.</p>
	<p>Make sure that you do fill in every field with proper
	information, so that the times and the delays are numbers.
	Time is in milliseconds, so 10 is VERY fast, and 2000 is two
	seconds.</p>

	<?php
		
		ksort($GLOBALS['Scripts']);
		
		foreach ($GLOBALS['Scripts'] as $Name => $Data) {
			PrintIndexTable($Name, $Data);
		}
		
		StandardFooter();
	}


	function PrintIndexTable($Name, $Data) {
		if ($Data['Repeat'] > 1) {
			$repeatInfo = '<input type=checkbox name=Repeat CHECKED> ' . 'Repeat Message';
		} elseif ($Data['Repeat'] == 1) {
			$repeatInfo = 'Repeating';
		} else {
			$repeatInfo = 'Not repeating';
		}
		
		?><form method=post action=index.php>
	<input type=hidden name=JS value="<?php echo htmlspecialchars($Name) ?>">
	<table width=\"100%\" border=1>
	<tr><td width=240 bgcolor="#5050FF"><b><?php echo htmlspecialchars($Name) ?></b><br>
	<?php echo $repeatInfo ?></td><td bgcolor="#8F8FFF"><?php echo $Data['Desc'] ?></td></tr>
	<?php
		
		if ($Data['Multi']) {
			
			?>
	<tr><td bgcolor="#FF8F8F">Multiple line message:</td>
	<td bgcolor="#8FFF8F">
	<textarea name="Message" COLS=40 ROWS=3 WRAP=off></textarea></td></tr>
	<?php
		} else {
			
			?>
	<tr><td bgcolor="#FF8F8F">Single line message:</td>
	<td bgcolor="#8FFF8F"><input type=text name="Message" size=40></td></tr>
	<?php
		}
		
		foreach ($Data['Keys'] as $FormName => $Desc) {
			
			?>
	<tr><td bgcolor="#FF8F8F"><?php echo $Desc[0] ?></td>
	<td bgcolor="#8FFF8F"><input type=text name="<?php echo $FormName
			
			?>" size=40 value="<?php echo $Desc[1] ?>"></td></tr>
	<?php
		}
		
		?>
	<tr><td colspan=2 align=center bgcolor="#000000"><center>
	<input type=submit value="Generate"></center></td></tr>
	</table></form>
	<?php
	}

	// /////////////////////////////////////////////////////////////////////////
	function PrintJSPage($Name) {
		StandardHeader(array(
				'title' => 'Marquee Example Page',
				'topic' => 'marquee'
			));
		$JS = Load_Javascript($GLOBALS['Scripts'][$Name]['Func']);
		
		?>
	<h1>JavaScript Code Generated</h1>
	<p>The Great JavaScript Marquee Generator has generated your code.  If you
	look at the status bar on your browser, you will see how your code will look.
	You can hit the "Reload" or "Refresh" button to see it again in case you 
	missed it.</p>
	<p>If you like it, you can copy the code into your web page.  Below is the
	pretty good (not too sloppy) JavaScript code.  To insert it into your web 
	page, just copy the below stuff (starting with the <tt>&lt;script
	language="JavaScript"&gt;</tt> and ending with <tt>&lt;/script&gt;</tt>)
	into your web page.  This is usually stuck immediately after the 
	<tt>&lt;head&gt;</tt> tag.</p>
	<?php MakeBoxTop('center'); ?>
	<xmp><script language="JavaScript">
	<!-- Begin hide from old browsers
	<?php echo $JS ?>

	// End hide -->
	</script>
	</xmp>
	<?php MakeBoxBottom() ?>
	<script language="JavaScript">
	<!-- Begin hide from old browsers
	<?php echo $JS ?>
	// End hide -->
	</script>
	<?php
		
		StandardFooter();
	}


	function Load_Javascript($FName) {
		if ($_POST['Repeat'])$FName .= '_repeat';
		$FName .= '.js';
		$String = '';
		$fp = fopen($FName, 'r');
		
		while (! feof($fp) && $Line = fgets($fp, 4096)) {
			$String .= ProcessLine($Line);
		}
		
		fclose($fp);
		return $String;
	}


	function ProcessLine($String) {
		$String = str_replace("\r\n", "\n", $String);
		$String = str_replace("\r", "\n", $String);
		$String = preg_replace('/^(.*)##(.+)##(.*)$/e', 'ProcessKey(\'\\1\', \'\\2\', \'\\3\')', $String);
		return $String;
	}


	function ProcessKey($First, $String, $Second) {
		if (preg_match('/^MULTI_SETUP:(.*),(.*)$/', $String, $Matches)) {
			$MultiString = $Matches[1];
			$MultiNum = $Matches[2];
			$s = $_POST['Message'];
			$s = str_replace("\r\n", "\n", $s);
			$s = str_replace("\r", "\n", $s);
			$MultiTemp = explode("\n", $s);
			$String = "$MultiNum = " . count($MultiTemp) . ";\n";
			$String .= $First . $MultiString . " = new Array($MultiNum);";
			$MultiNum = 0;
			
			foreach ($MultiTemp as $k) {
				$String .= "\n" . $First . $MultiString . "[$MultiNum] = \"" . $k . '";';
				$MultiNum ++;
			}
		} elseif ($String == 'RANDOM') {
			$String = JavaScript_Random();
		} elseif ($String == 'BROWSER_OK') {
			$String = JavaScript_Browser_Ok();
		} elseif (isset($_POST[$String])) {
			$String = $_POST[$String];
			
			while (strpos($String, '##') !== false) {
				$String = str_replace('##', '#', $String);
			}
		}
		
		$First = str_replace('\\"', '"', $First);
		$Second = str_replace('\\"', '"', $Second);
		return $First . $String . $Second;
	}


