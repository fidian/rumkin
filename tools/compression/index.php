<?PHP

require '../../functions.inc';

StandardHeader(array('title' => 'Web Page Compression',
		     'topic' => 'compression'));

?>

<p>It is often a goal to compress web pages to that they take less
bandwidth, less hard drive space, and are difficult for people to reverse
engineer.  Some companies have products that supposedly compress web pages,
but they almost always merely remove whitespace, comments, and perform other
HTML tweaks to get the file's size down.  Few of them actually "compress"
the data so that you get exactly what you put in when you decompress it.</p>

<p>Compression is better performed at the server level -- if your web server
can load a module (mod_gzip perhaps) or can compress dynamic web pages
(PHP's ob_gzhandler), that is <b>far</b> better.  Those compression algorithms
will beat anything designed here.  However, if you plan on distributing
documents on CD and you want to decompress them with only the local browser,
you are stuck with using JavaScript to decompress your web pages, or maybe
using Java to stick everything in a .jar file and get really good 
compression.</p>

<p>I felt like taking on the challenge of making compressed web pages.
Below are the tests that I have performed with any success.  You can use
them to compress your own web pages if you like -- just copy your HTML code
into them and they will generate compressed output for you.</p>

<p>There isn't much to see yet.  This is a project I rarely work on, but I
do touch back to it every year or so.  If this helps you out, let me know.</p>

<?PHP
$Links = array(
   array('Name' => 'LZ78',
         'Desc' => 'LZ78 compression builds a dictionary with from ' .
            'your input source, and compression is pretty good ' .
            'even though the resulting data is re-encoded in text.',
         'URL' => 'compress_lz78.php'),
   array('Name' => 'Huffman Encoding + UUE with JavaScript',
	 'Desc' => 'Character re-encoding with shorter codes for ' .
	    'letters that appear more frequently.  Then, it has to ' .
	    'encode the data so the binary data can be stored in ' .
	    'a text file (like HTML or a JavaScript file).',
	 'URL' => 'compress_huff.php'),
   array('Name' => 'Base64 Encoding',
         'Desc' => 'A common method of encoding binary data with just ' .
	    'text.  It increases the size of the information by 33%, ' .
	    'but it is needed sometimes ... like when sending attachments ' .
	    'in email.',
	 'URL' => 'base64.php'),
);

MakeLinkList($Links);

StandardFooter();
