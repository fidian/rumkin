<?PHP

include '../../functions.inc';

StandardHeader(array('title' => 'FoxPro',
		     'topic' => 'foxpro'));

?>

<p>FoxPro is a wonderful database system that lets you get away with
basically anything.  It can access external DLL files, can be compiled into
(almost) standalone executables, has a simple and powerful language, and has
a command window where you can get things done quickly.</p>

<p>Here is a list of downloads and sample code that will assist you with
various tasks.  It's just stuff that I found useful and I hope that you do
too.</p>

<?PHP

$Links = array(
   array('Name' => 'Functions',
	 'Desc' => 'Usually very short snippets of code that assist ' .
	    'with repetitious tasks.',
	 'URL' => 'functions.php'),
   array('Name' => 'Links',
         'Desc' => 'Various off-site links that have valuable tips and ' .
	    'more things that you can download.',
	 'URL' => 'links.php'),
   array('Name' => 'Packages',
         'Desc' => 'Groups of files that I have found on the internet.  ' .
	    'Each one includes whatever I was able to download and there ' .
	    'is at least one example showing how to use the code.',
	 'URL' => 'packages.php'),
);

MakeLinkList($Links);

StandardFooter();