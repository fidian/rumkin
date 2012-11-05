<?php

include '../../functions.inc';
StandardHeader(array(
		'title' => 'Uninstalling CSNW',
		'topic' => 'problems'
	));

?>

<p><b><font size="+1">Symptom:</font></b>  When you open a DOS shell or if
you run some programs in the DOS shell, you will get an error:  <tt>Cannot
load VDM IPX/SPX support</tt></p>

<p><b><font size="+1">Causes:</font></b>  On Windows 2000 (maybe Windows XP
and others), when you install CSNW and Novell's Netware client, it adds
extra stuff to your autoexec.nt file.  When you uninstall the client, it
leaves a few turds around on your system (don't they all?) that could cause
problems.</p>

<p><b><font size="+1">Solution:</font></b>  Edit your
%SystemRoot%\system32\autoexec.nt file and delete three lines.</p>

<ul>
<li>Double-click on my computer
<li>Double-click on C:
<li>Look for "WINNT" or "WINDOWS".  Remember which one you saw.
<li>Start -&gt; Run
<li>Type in <tt>notepad c:\winnt\system32\autoexec.nt</tt><br>
If you saw "WINDOWS" instead of "WINNT" use <tt>notepad
c:\windows\system32\autoexec.nt</tt>
<li>Look for these lines:
<blockquote><pre>REM Install network redirector
lh %SystemRoot%\system32\nw16
lh %SystemRoot%\system32\vwipxspx
</pre></blockquote>
<li>Delete those three lines, and only those three lines.
<li>File -&gt; Save
<li>Close Notepad &ndash; You are done!
</ul>

<p>Problem solved.</p>

<?php

StandardFooter();
