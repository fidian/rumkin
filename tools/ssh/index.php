<?php

require '../../functions.inc';
StandardHeader(array(
		'title' => 'MindTerm SSH Applet',
		'topic' => 'ssh'
	));

?>
<p>This Java applet is "signed" by Appgate Aktiebolag.  You may see:</p>
<ul>
<li>a license agreement (say Yes if you want to use SSH)
<li>warnings about local directories and files (your option for yes/no)
<li>the SSH window itself (Yeay!)
</ul>
<p>The applet is about 350k for IE and 550k for Netscape or Sun's Java plugin.
It could take a while to download if you are over a dialup (56k or less) line.
	NOTE:  You will likely see nothing for a bit - the download does
	not have a status display in most browsers.</p>

<applet code="com.mindbright.application.MindTerm.class"
        archive="media/mindterm_ns.jar"
        width=0 height=0>
<param name="cabinets" value="media/mindterm_ie.cab"
<param name="debug" value="true">
<param name="verbose" value="true">
<param name="sepframe" value="true">
<param name="autoprops" value="both">
<param name="fn" value="Courier">
<param name="fs" value="10">
</applet>

<?php

StandardFooter();
