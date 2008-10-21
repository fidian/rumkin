<?PHP

include('functions.inc');

$redirects = array('/tools/cipher/elonka.html' => '/reference/kryptos/elonka.html', // 2007-07-08
		   // 2007-07-10 '/reference/diabloii/' => '/software/diabloii/',  // 2004-12-31
		   // 2008-08-07 '/projects/' => '/software/',  // 2004-12-18
		   // 2007-07-10 '/software/diabloii/' => 'http://forum.rumkin.com/?action=vtopic&forum=1', // 2006-07-24
		   );

$keywords = array(
   array('Trivia', '/fun/trivia/',
	 'trivia'),
		  
   array('Aquapad', '/reference/aquapad/',
	 'aquapad'),
   array('D&D Things', '/reference/dnd/',
	 'dnd d&d d&amp;d'),
   array('LEGO USB', '/reference/lego/',
         'lego'),
   array('Mouseover Descriptions', '/reference/web/desc.php',
	 'description'),  // 2005 02 19
   array('PHP Contest Site - Codewalkers', '/reference/php_contest/',
         'php_contest'),
   array('Whiteboard Construction and Cleaning', '/reference/whiteboard/',
	 'whiteboard'),
		  
   array('Binky - Email Autoresponder', '/software/binky/',
	 'binky email autoresponder'),
   array('D&D Helper', '/software/dnd_helper/',
	 'd&d dnd d&amp;d helper'),
   array('Diablo II Hack Pack', 'http://forum.rumkin.com/?action=vtopic&forum=1',
         'diablo'),
   array('Java Puzzle Applet', '/software/puzzle/',
	 'java puzzle'),
   array('Kits - Palm OS software bundler', '/software/kits/',
	 'kit'),
   array('Marco - Palm OS Survey Software', '/software/marco/',
	 'marco'),

   array('Caesar Shift', '/tools/cipher/caesar.php',
	 'rotn'),
   array('Cryptogram Solver', '/tools/cipher/cryptogram.php',
	 'crypto'),
   array('ROT13 Encryption', '/tools/cipher/rot13.php',
	 'rot13'),
   array('Java IRC Client', '/tools/pjirc/',
	 'darkerirc'),
   array('Email Mailto Encoder', '/tools/mailto_encoder/',
         'mailto encoder'),
   array('Sprint PCS Vision Uploader', '/tools/sprint/',
         'sprint'),
		  
   array('Fun Stuff - Content Listing', '/fun/',
	 'fun'),
   array('Reference - Content Listing', '/reference/',
	 'reference'),
   array('Software - Content Listing', '/software/',
	 'project software'),
   array('Tools - Content Listing', '/tools/',
	 'tools'),
);

foreach ($redirects as $from => $to)
{
    if (strtolower(substr($_SERVER['REDIRECT_URL'], 0, strlen($from)))
	== $from)
    {
	$new_path = $to . substr($_SERVER['REDIRECT_URL'], strlen($from));
	Redirect($new_path, array('permanent' => 1));
    }
}


$new_url = array();

foreach ($keywords as $info)
{
    foreach (split(' ', $info[2]) as $w)
    {
	if (preg_match('/' . $w . '/i', $_SERVER['REDIRECT_URL']))
	{
	    $new_url[$info[0]] = $info[1];
	}
    }
}

$new_url['Main Page'] = '/';

StandardHeader(array('title' => '404 Error',
		     'topic' => '404'));

?>

<p>The page you are looking for has, for one reason or another,
dissapeared.  It could have been moved, or just flat-out deletd.  Sorry
for the inconvenience.  If I moved the page, I probably did it because
it belonged in a different spot on this site.  My apologies for this 
problem.</p>

<p>Based on what you were looking for, I have these possible alternate
pages.  Perhaps one of them can get you to what you want.</p>

<ul>
<?PHP
foreach ($new_url as $k => $v)
{
    echo "<li><a href=\"$v\">" . htmlspecialchars($k) . "</a>\n";
}
?></ul>

<?PHP

StandardFooter();
