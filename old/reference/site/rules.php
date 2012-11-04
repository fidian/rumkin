<?php

require('../../functions.inc');
StandardHeader(array(
		'title' => 'Rumkin.com Site Rules'
	));

?>

<p>If you are going to have access to this machine, you need to abide by these rules.</p>

<ul>
<li>Be nice.
	<ul>
	<li>No spamming people from this machine.</li>
	<li>No spamming people to go to this machine.</li>
	<li>No hacking the system unless you tell me if you succeed.  I don't want my machine left in a broken state.</li>
	<li>Don't suck up too much disk space.  I don't have a quota system and I hope I don't ever need one.</li>
	</ul></li>
<li>Don't get my internet feed cut off.
	<ul>
	<li>Web content must be socially acceptable.  If you have naughty content, make people click an "over 18" button or do something similar.
	<li>If you cuss profusely, that could be frowned upon.  You'll need to make sure people are warned before entering your site.
	<li>No selling services or products with your web site.  This is a condition of my DSL line.
	<li>As long as my ISP won't take away my line and as long as you don't think I'll mind the content, anything else goes.
	</ul></li>
<li>Email must get to you.
	<ul>
	<li>If you use email here, you need to check it at least on a weekly basis.</li>
	<li>If you <a href="/reference/email/">forward your email</a>, you need to check that mailbox at least once a week.</li>
	</ul></li>
<li>Shell access rules.
	<ul>
	<li>No running bots or other background processes without prior approval.  I need to know about what is running so I don't kill it with my paranoid process audits.</li>
	<li>No hacking my machine unless you share your results with me.  Again, I don't want a broken system.</li>
	<li>No hacking outside machines from my machine.  I don't want the Feds after me.</li>
	</ul></li>
<li>Sharing files.
	<ul>
	<li>If you are legally distributing large files, you can serve them from your web site.  Lots of download managers support resume via http.</li>
	<li>If you intend on sharing a few files with a select group, use a password protected directory.  I don't intend to be a file distribution point for the masses for your MP3 collection.</li>
	</ul></li>
<li>Services.
	<ul>
	<li>If you need a message board or database access or something similar, let me know.</li>
	<li>Don't go installing phpbb and a text-based database backend when I already may have something similar up and running on my system.  Don't use phpbb &ndash; too many security holes.</li>
</ul>

<p>Features:</p>

<ul>
<li>Linux 2.6 (Gentoo)</li>
<li>Apache web server</li>
<li>MySQL 5.0</li>
<li>PHP 5.x</li>
<li>Web-based email</li>
<li>Nightly backup scheme - If something goes wrong, I can pull a file from a recent backup.  This does not cover the database system.</li>
<li>Weekly backups too.  This does cover the database.</li>
</ul>

<?php

StandardFooter();
