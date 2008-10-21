<?PHP

require '../../functions.inc';

StandardHeader(array('title' => 'Feedback Box',
		     'topic' => 'feedback'));

?>
	
<p>This is the live chat box at the bottom of the pages here.  You can type
a message or two, but then you need to wait a bit.  This prevents spamming,
using the box as an actual chat client, and stops the people from thinking
that they will get a live response.  Contrary to popular belief, this is
designed for people to post discussions about the page, such as questions
about the content or corrections.  It is not hooked up to my phone/pager and
I don't stare at my computer screen waiting for more people to post
messages.</p>

<p>You can download the PHP scripts here:  <a
href="makezip.php/feedback.zip">feedback.zip</a></p>

<p>This is a live copy of the scripts that I am using, including the words
that I am filtering (avert thine eyes!) and the rules that I employ.  It is
designed to go with a theme system, but that section isn't included.  So, if
you see references to $theme, you now know why that's there.</p>

<p>There is a simple <tt>readme.txt</tt> file that discusses how to set it
up.  Really, the documentation for this thing is utter crap, but if you post
comments below, I will attend to your issues and try to help work things
out.</p>

<p>Server Requirements:  PHP 4.x (or so), MySQL<br>
Browser Requirements:  None.  Works with Mozilla, Netscape, IE, Opera, 
Links, Lynx, and even the web browsers on cell phones.</p>

<?PHP
StandardFooter();
