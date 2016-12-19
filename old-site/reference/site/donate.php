<?php

require '../../functions.inc';
StandardHeader(array(
		'title' => 'Donations',
		'topic' => 'rumkin'
	));

?>
<p>I am really glad that you found something on my web site worthy enough for
you to donate some of your funds my way!  I have set up a PayPal account so
you can use a credit card to send me whatever amount you'd like.  Just press
the button below to get started.</p>

<p>The money that is donated to me does go back into the site.  I pay for my
hosting and hardware upgrades primarily out of my own pocket, so the money
I get in from this site helps to just offset those costs.  When people send
me even a dollar, I really appreciate it.</p>

<p>I would greatly prefer amounts over 2 dollars or maybe just 0.99 &ndash;
PayPal charges about a 33% fee for $1 and it drops down to an 18% fee for $2.
However, I leave the amount up to you.</p>

<form action="https://www.paypal.com/cgi-bin/webscr" method="post">
<input type="hidden" name="cmd" value="_xclick">
<input type="hidden" name="business" value="fidian@rumkin.com">
<input type="hidden" name="item_name" value="Rumkin - Phone Uploader">
<input type="hidden" name="no_shipping" value="1">
<input type="hidden" name="return" value="http://rumkin.com/">
<input type="hidden" name="cancel_return" value="http://rumkin.com/">
<input type="hidden" name="no_note" value="1">
<input type="hidden" name="currency_code" value="USD">
<input type="hidden" name="tax" value="0">
<input type="hidden" name="lc" value="US">
<input type="hidden" name="bn" value="PP-DonationsBF">

<p align=center>
<input type="image" src="https://www.paypal.com/en_US/i/btn/x-click-but21.gif" border="0" 
name="submit" alt="Donate securely with PayPal"></p>
</form>

<p>You can also donate anonymously with BitCoin:  1EX7txZ62fddiKRcw7L3QjPNHyN4PxUtaH</p>

<p>I sincerely thank you for anything you provide.</p>

<?php

StandardFooter();