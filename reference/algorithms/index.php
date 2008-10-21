<?PHP

require '../../functions.inc';

StandardHeader(array('title' => 'Algorithms',
		     'header' => 'Algorithms I\'ve Collected',
		     'topic' => 'algorithms'));

?>

<p>This page is devoted to the various algorithms that I have collected over
the years.  Here, you will find a description of the algorithm, what it is
used for, and links to code that I wrote and related off-site links.  I like
to keep things organized, so pick your favorite topic below:

<?PHP

$GLOBALS['WebLinks'] = array(
   array('Name' => 'Doubly-Linked List',
	 'Desc' => 'Interesting idea (backed with code) about how you ' .
	    'can save memory by using XOR to store the difference ' .
	    'between the previous and next nodes in the list.',
	 'URL' => 'linked_list'),
   array('Name' => 'Escaping',
	 'Desc' => 'Proper escaping of strings when converting from one ' .
	    'language/system to another.  So far, this has a function ' .
	    'to take a PHP variable and write it as a safe JavaScript ' .
	    'string.',
	 'URL' => 'escaping/'),
   array('Name' => 'Fuzzy String Matching',
         'Desc' => 'How to determine the similarity of two different ' .
	    'strings.  I cover Levenshtein\'s and Oliver\'s methods ' .
	    'along with soundex.',
	 'URL' => 'fuzzy_strings/'),
   array('Name' => 'HTPasswd File Functions',
	 'Desc' => 'PERL functions to help manipulate a .htpasswd ' .
	    'file.',
	 'URL' => 'htpasswd/'),
   array('Name' => 'Lockfile',
         'Desc' => 'PERL functions that allow you to use a lockfile ' .
	    'on systems that other methods may not work.',
	 'URL' => 'lockfile/'),
   array('Name' => 'Textfile Database',
	 'Desc' => 'PERL functions that will allow you to store ' .
	    'data in a text file.  Only good if you have a very ' .
	    'limited subset of data.',
	 'URL' => 'dbclerk/'),
);

MakeLinkList($GLOBALS['WebLinks']);

StandardFooter();
