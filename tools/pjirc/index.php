<?PHP

include '../../functions.inc';

StandardHeader(array('title' => 'PJIRC',
		     'heading' => 'Free Java IRC Client',
		     'topic' => 'irc'));

?>
<applet code=IRCApplet.class archive="media/irc.jar,media/pixx.jar" width=640 height=400>
<param name="CABINETS" value="media/irc.cab,media/securedirc.cab,media/pixx.cab">
<param name="nick" value="Anonymous">
<param name="name" value="PJIRC User">
<param name="host" value="liberty.nj.us.dal.net">
<param name="gui" value="pixx">
</applet>

<p>Powered by <a href="http://www.pjirc.com/">PJIRC</a>.</p>

<?PHP

StandardFooter();
