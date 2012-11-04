<?php

include '../../functions.inc';
StandardHeader(array(
		'title' => 'Shortcut Icon',
		'topic' => 'web'
	));

?>

<p>The shortcut icon is a tiny little picture that is usually shown up in
the address bar.  Sometimes it is also used in your Bookmarks/Favorites.
Some browsers let you use .gif files, but to be completely safe and have all
browsers see your picture, you should use a .ico file.  The words "SHORTCUT
ICON" are not case sensitive (you are able to use lowercase if you want).
Also, you can use a relative address instead of a fully qualified URL.</p>

<p>Use just one of these, whichever one looks like what you want.</p>

<?php MakeBoxTop('center'); ?>
<pre>&lt;link rel="SHORTCUT ICON" href="http://your.site.com/the_icon.ico"&gt;
&lt;link rel="shortcut icon" href="/my_icon.ico"&gt;</pre>
<?php MakeBoxBottom(); ?>

<p>Also, if you get mysterious hits for a "/favicon.ico" or similar on your
web site, that is because the default image for a shortcut icon.  If you
include this tag and point to a valid icon, then your web server logs won't
show the 404 errors for favicon.ico anymore.</p>
	
<?php

StandardFooter();
