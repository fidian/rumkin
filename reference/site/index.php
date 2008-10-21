<?PHP

require '../../functions.inc';

StandardHeader(array('title' => 'About This Site', 
		     'topic' => 'site'));

$Links = array(
   array('Name' => 'Contact',
	 'Desc' => 'Use this form if you need to contact me.  It goes to the ' .
		'same place as the email address below.', 
	 'URL' => 'contact.php'),
   array('Name' => 'Donate',
	 'Desc' => 'Do you think that I could use a little extra cash for my ' .
		'troubles?  Great!  Use this form to pull funds from a ' .
		'card or a PayPal account.',
	 'URL' => 'donate.php'),
   array('Name' => 'Legal',
         'Desc' => 'Legal information about this site.  Boring.',
	 'URL' => 'legal.php'),
   array('Name' => 'Rumkin - The Name',
	 'Desc' => 'Ever wonder how I came to name my site "rumkin.com"?',
	 'URL' => 'rumkin.php'),
);

MakeLinkList($Links);

StandardFooter();
