<?php

include '../../functions.inc';
StandardHeader(array(
		'title' => 'Email Denied',
		'header' => 'Fixing Email Bounces',
		'topic' => 'email'
	));

?>
	
<p>Rumkin.com uses some pretty strict spam filters to try to make email
reading pleasurable for its users.  If your email gets "bounced" back to
you, and you are positive that you have the right email address, then we
need to figure out why you were banned.</p>

<?php Section('Step 1:  Look at bounce message'); ?>

<p>You likely received something like this:</p>

<?php MakeBoxTop('center', 'width: 80%')

?><pre><tt>Hi. This is the qmail-send program at rumkin.com.
I'm afraid I wasn't able to deliver your message to the following addresses.
This is a permanent error; I've given up. Sorry it didn't work out.

&lt;some_user@rumkin.com&gt;:
mail denied, based on relay 4.10.205.248

--- Below this line is a copy of the message.

.... your email is here ....</tt>
</pre><?php MakeBoxBottom() ?>

<?php Section('Step 2:  Find the reason your message was bounced'); ?>

<p>This is the "<i>mail denied, based on relay 4.10.205.248</i>" part.  This
means that the email that you sent was blocked by the anti-spam filters
because the mail host you use is known to send spam.  That set of numbers at
the end is vital.  Write them down.</p>

<?php Section('Step 3:  Check out the mail relay'); ?>

<p>This may give you more information on why the server was denied and it
will tell you what particular filter is giving you problems.  Go to the <a
href="rblcheck.php">RBL Check</a> page and type in the set of numbers,
including the decimal points.  (For the above example, you will want to type
in "4.10.205.248" without the quotes.)</p>

<p>When you get the results, you will see something like this:</p>

<?php MakeBoxTop('center', 'width: 80%'); ?>
 IP:  4.10.205.248<br><br><b>sbl.spamhaus.org</b>:  Ok<br>
<b>bl.spamcop.net</b>:  Ok<br>
<b>relays.ordb.org</b>:  Ok<br>

<b>dnsbl.antispam.or.id</b>:  Ok<br>
<b>ndsbl.njabl.org</b>:  Ok<br>
<b>list.dsbl.org</b>:  AAAA248.205.10.4.list.dsbl.org text
&quot;http://dsbl.org/listing?ip=4.10.205.248&quot;<br />
<br>
<b>blackholes.easynet.nl</b>:  Ok<br>
<b>opm.blitzed.org</b>:  Ok<br>

<b>dnsbl.net.au</b>:  Ok<br>
<b>blackholes.five-ten-sg.com</b>:  Ok<br>
<?php MakeBoxBottom(); ?>

<p>According to those results, the only one that is not "Ok" is list.dsbl.org.
Now you know which particular filter bounced your message.</p>

<?php Section('Step 4:  Tell me'); ?>

<p>The general anti-spam policy at Rumkin.com is to let all good messages in
and as few spam messages in.  If your messages are being blocked, you now
need to let me know and include the following.</p>

<ul>
<li>Who you are emailing
<li>The reason your mail was blocked (mail denied, based on relay
4.10.205.208)
<li>The spam filter that is blocking you (list.dsbl.org)
</ul>

<p>When I get to your email, I will unblock your host and possibly stop
using that particular filter so that your future emails will get through
properly.</p>

<?php

StandardFooter();
