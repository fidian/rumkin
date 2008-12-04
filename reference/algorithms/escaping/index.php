<?php

require '../../../functions.inc';
StandardHeader(array(
		'title' => 'Escaping',
		'topic' => 'algorithms'
	));

?>

<p>Taking a string in one language and converting it into a string in another
is sometimes annoying.  One that is annoying, but yet possible, is converting
a PHP string of maybe a web page or maybe an error message or whatever, and
passing the string through to JavaScript to be manipulated in some way or
another.</p>

<?php MakeBoxTop('center') ?>
<pre>function QuoteForJavaScript($str, $SkipQuotes = false) {
    $R = array("/(&lt;scr)(ipt)/i" =&gt; "$1\"+\"$2",  // Break up "&lt;script" tags
	       '/\\\\/' =&gt; '\\\\',               // Escape backslashes
	       '/"/' =&gt; '\\"',                   // Escape quotes
	       '/\'/' =&gt; '\\\'',                 // Escape single quotes
	       "/\r\n/" =&gt; "\n",                 // Convert DOS newlines into Unix
	       "/\r/" =&gt; "\n",                   // Convert Mac newlines into Unix
	       "/\n/" =&gt; "\\n\"+\n\"");          // Convert Unix newlines
	       
    $str = preg_replace(array_keys($R), array_values($R), $str);
    
    if (! $SkipQuotes)
      return '"' . $str . '"';
      
    return $str;
}
</pre>
<?php MakeBoxBottom(); ?>

<p>To use this glorious function, you need to merely pass it a string and
optionally use the $SkipQuotes parameter.  Here are a few examples of PHP
writing some JavaScript.</p>

<?php MakeBoxTop('center'); ?>
<pre><B>$str = "12345 abcde";
echo "js_var = " . QuoteForJavaScript($str) . ";\n";</b>

// Produces:
//
// <i>js_var = "12345 abcde";</i>


<b>$str = "It's a \"quoted\" thing!\nAnd a backslash \ on a second line!";
echo "js_var = " . QuoteForJavaScript($str) . ";\n";</b>

// This result is a bit more interesting:
//
// <i>js_var = "It\'s a \"quoted\" thing!\n" +</i>
// <i>"And a backslash \\ on a second line!";</i>
//
// Everything is escaped properly, the newline is preserved, and the string
// splits on the newline for readability.


// If you need to use it in the middle of some other JavaScript, you can
// turn off the addition of the outer double quotes.

<b>// Leave PHP code and go to the HTML (which should be in the middle of 
// a &gt;script&lt; tag...
?&gt;
js_var = "This is string number &lt;?= QuoteForJavaScript(1234, true) ?&gt;";
&lt;?PHP
// Return to PHP to complete the example</b>

// That produces this following line, without the extra quotes around
// the number.
//
// <i>js_var = "This is string number 1234";</i>
<?php MakeBoxBottom(); ?>

<p>Have fun using this function!  Just keep in mind that it isn't designed
for binary data.  Well, for that matter, JavaScript really isn't either.</p>

<?php

StandardFooter();
