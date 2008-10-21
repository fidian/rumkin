<?PHP

include '../../functions.inc';

StandardHeader(array('title' => 'Mailto Encoder',
		     'header' => 'Email Address Encoder',
		     'topic' => 'mailto'));

?>

<p>Junk email (a.k.a. spam) is a part of everyone's life if they ever put
their email address on the web.  For HTML authors, site admins, and for
people who want a little credit on the page that they put online, it is a
constant problem.  You want to include your email address on the page, but
you don't want your email address to be harvested by spambots.</p>

<p>The best thing you can do is encode your email address so that browsers
can see it and spambots can not.  This is what this tool attempts to do. I
have created two different versions of the address encoder.  Please pick the
one that is appropriate:</p>

<?PHP MakeBoxTop('center'); ?>
<a href="simple.php">Simple</a> - <tt>Easy, quick, effective.</tt><br>
<a href="custom.php">Custom</a> - <tt>For really technically-minded
people.</tt><br>
<a href="encode.php">HTML Encode</a> - <tt>Encode any text or HTML code
that you want (power users only)</tt>
<?PHP MakeBoxBottom() ?>

<ul>
<li><a href="http://www.pascalirma.org/masquage_email.php">French
version</a> - Thanks to Pascal for translating this email address encoder!
</ul>

<p>These tools do not steal your email addresses.  Nothing is sent back to
my server, and everything runs in JavaScript in your browser.  If you don't
believe me, check out this <a
href="http://www.dslreports.com/forum/remark,7309390~root=spam~mode=flat">
independent review</a> of a mirror the tools provided here.
Keep in mind that this is not the end-all.  There are other solutions out
there, such as:</p>

<ul>
<li>Java applet that shows the address and lets you click on it, but will
foil spambots because they don't have a Java interpreter.</li>
<li>CGI scripts to send you mail directly without ever giving your address
out -- make sure you don't specify the target email address in the feedback
form!</li>
<li>A form button that will pop up a javascript window.</li>
<li>Generic JavaScript that will decode your address and forward you to the
proper mailto: link.</li>	
<li>A public guestbook/forum.</li>
</ul>

<p>Remember -- creativity is the key when playing against spammers.  They
eventually adapt their techniques in order to make another $.05.  That's why
there is no single solution.  If there is ever a single awesome way of doing
this, then spammers will adapt their programs and we'll all need to find
another method.  So, if you like something you see, you may want to alter it
just a bit so that spammers have a harder time reaping your email address.</p>

<p>This program can be further enhanced to do the following neat ideas:</p>

<ul>
<li>Work with imagemaps and links better (you can use it now with imagemaps -- 
see these <a href="imagemaps.php">instructions</a>).
<li>Make the JavaScript put up a link that, when clicked, will pop open a
window and automatically roll-over to the right email address.</li>
<li>Generate the code necessary for a form button that will take appropriate
action when clicked.</li>
<li>Generate code for a java applet to display your email address.</li>
<li>Use this <a href="example.phps">PHP code</a> to make any email addresses
on your site encrypted.  It's the same stuff I use on my site.</li>
</ul>

<p>And here's a few links that I found useful.</p>

<ul>
<li><a href="http://www.metaprog.com/samples/encoder.htm">Email Encoder</a>
- A lot more on using links to call JavaScript functions that take your
browser to the email link.</li>
<li><a href="http://www.webmasterworld.com/forum91/492.htm">Experiences
with using Javascript ...</a> - Lots of great information.  Just don't use
window.navigate(); instead use window.location.replace().</li>
<li><a href="http://www.emailaddresses.com/forum/showthread.php?threadid=39170">CSS
Methods</a> - Alternate methods of hiding an email address, primarily using 
CSS.  They don't actually make links.
</ul>

<?PHP

StandardFooter();