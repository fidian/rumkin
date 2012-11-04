<?php

require '../../functions.inc';
StandardHeader(array(
		'title' => 'Onloads and Alternatives',
		'topic' => 'web'
	));

?>

<p>Let's just say that you have a script that you want to distribute or that
could be loaded with other scripts and you really don't want them to
conflict with each other.  If you need an onload event, things can get a bit
weird.  You'll maybe wonder why your pull-down menus don't work and your
background changing does work.  This snippet of code will help you out.</p>

<p>In order to use this, you will need to slightly edit your JavaScript.
You'll likely add these lines at the bottom of your code.  Make sure to
change the XXXX to something unique for your program.</p>

<?php MakeBoxTop('center') ?>
<pre>function XXXX_onload()
{
    // Insert your code here to initialize your program
    // Then, this little bit calls the old onload function
    
    if (XXXX_old_onload != null)
    {
       XXXX_old_onload();
    }
}
	
XXXX_old_onload = window.onload;
window.onload = XXXX_onload;
</PRE>
<?php MakeBoxBottom() ?>

<p>With the above code, you can ensure that your JavaScript will not
interfere with another person's JavaScript, especially if yours is loaded
after the other person's code.  If the other person's code is loaded after
yours, and they don't use code like what is above, you can obviously alter
their program to do your bidding and make sure it won't interfere with other
things you have going for yourself.</p>

<p>As a general rule, you should never code JavaScript that sets
window.onload unless you handle the scenario where window.onload was already
set.</p>

<?php Section('window.setTimeout()'); ?>

<p>If you want to avoid this problem completely, you can use the
window.setTimeout() function.</p>

<?php MakeBoxTop('center') ?>
<pre>function XXXXXXX_startup()
{
   // This is your startup function.
   // You'd do stuff in here.
}

// Set the startup function to run.
window.setTimeout('XXXXXXX_startup()', 100);
</pre><?php MakeBoxBottom(); ?>

<p>If you have external javascript files that you need to load before your
function runs, you just add a couple lines.  If you interact with a named
div or span tag, you can also make sure that it is loaded.  I just use
document.getElementById(), but you can use whatever method you prefer.</p>

<?php MakeBoxTop('center') ?>
<pre>// In your other .js files, make sure to add lines similar to this:
document.JS_File_Loaded = 1;
// Just change the JS_File_Loaded to be a unique variable for each
// of the different external files you need to load.

<pre>function XXXXXXX_startup()
{
   // Check to make sure that everything is loaded
   // Make sure to add one check per external javascript file and
   // one check per div/span tag you require.
   if (! document.JS_File_Loaded ||
       ! document.getElementById('required_div_id'))
   {
      // Something is not yet loaded, so try again in 250 ms
      window.setTimeout('XXXXXXX_startup()', 250);
      return;
   }
   
   // This is your startup function.
   // You'd do stuff in here.
}

// Set the startup function to run.
if (document.getElementById())
   window.setTimeout('XXXXXXX_startup()', 100);
</pre><?php MakeBoxBottom(); ?>

<?php Section('How about a library?'); ?>

<p>This little bit of code will take over the window.onload, and then all you
need to do is call onloadAdd() with your function to add more and more
behaviors that should be executed when the page loads.</p>

<?php MakeBoxTop('center'); ?><pre>
var onloadQueue = [];

// Pass your function or function name
function onloadAdd(func) {
    if (typeof(func) == 'function') {
        onloadQueue.push(func);
    } else {
        onloadQueue.push(function() {
            eval(func);
        });
    }
}

// Take over window.onload
if (window.onload) {
	onloadAdd(window.onload);
}

window.onload = function() {
	while (onloadQueue.length) {
		var loadFunc = onloadQueue.shift();
		loadFunc();
	}
}
</pre><?php MakeBoxBottom(); ?>

<p>With this, all you need to do is keep calling onloadAdd() and hundreds of
things can run without them stepping on each other's toes.</p>

<?php Section('Yet Another Way'); ?>

<p>Sometimes the above code will not work for you or you prefer to use newer
techniques to register your onload behavior.  The below code is what I came
up with.  It uses the browser-specific extensions to automatically work with
Firefox 2+, IE 7+, or fall back and work with the window.onload that most of
the older versions and other browsers support.</p>

<p>Personally, I like the easier window.onload methods as detailed above.
They work splendidly for me, and I only put this up here because people asked
nicely.</p>

<?php MakeBoxTop('center') ?>
<pre>// We use these variables to see if the onload code ran,
// to possibly store the old window.onload function, and to see
// if we have been set up.
// Make sure to change the names in your script to something unique!
var onload_ran = 0;
var onload_old = null;
var onload_init = 0;

// Here is our onload function.  Note:  We can call it multiple times,
// and that's why there is that 'if' statement right away
function my_onload() {
    if (onload_ran) return;
    onload_ran = 1;
    
    // Do your other onload stuff here
    // ...
    // Now we may need to handle other onloads
    
    if (onload_old && onload_old != null) {
        onload_old();
    }
}

// This line is required for the code to work with IE
document.write('&lt;script id="__init_script" defer="true" src="//[]"&gt;&lt;\/script&gt;');

if (document.addEventListener) {
    // Mozilla
    document.addEventListener("DOMContentLoaded", my_onload, false);
    onload_init = 1;
}
if (! onload_init && document.getElementById) {
    // IE
    var deferScript = document.getElementById('__init_script');
    if (deferScript) {
        deferScript.onreadystatechange = function() {
	    if (this.readyState == 'complete') {
	        // Needed to add tiny delay for IE
		window.setTimeout('my_onload()', 100);
		this.onreadystatechange = '';
	    }
	};
	
	// Check if the script has already been completed
	deferScript.onreadystatechange();
	
	// Clear reference to prevent IE memory leaks
	deferScript = null;
	
	onload_init = 1;
    }
}
if (! onload_init) {
    // Older and different browsers
    onload_old = window.onload;
    window.onload = my_onload;
    onload_init = 1;
}
</pre>
<?php MakeBoxBottom(); ?>

<p>Feel free to expand these methods as you see fit.  It is used on my site
for several of the <a href="/tools/cipher/">cipher tools</a> and the <a
href="/tools/password/passchk.php">password strength checker</a>.</p>


<?php

StandardFooter();
