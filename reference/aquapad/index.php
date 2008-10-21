<?PHP

include './functions.inc';

AquaStart();

?>

<p>The AquaPad is a light web tablet that can run Windows CE, 2000, ME, and
Midori Linux.  I'm not really one for words, so here's some stats.</p>

<table border=1 cellpadding=5 cellspacing=0>
<?PHP

$Data = array(
   array('Processor', 'Transmeta Crusoe 5400 at 500 Mhz'),
   array('Display', '8.4" TFT, 800x600, touchscreen.  PenMount DMC9000.'),
   array('Memory', '128 Mb<br>Some have 64?  The Windows 2000 ones say they ' .
	 'have 256.<br>' .
       'SO-DIMM SDRAM, Non-ECC, PC133<br>256 Mb max (see Upgrades)'),
   array('Storage', '32 Mb CompactFlash, Type II (see note below<br>' .
       'Windows variants (not CE) get a 1 Gb MicroDrive instead'),
   array('Video', 'Silicon Motion Lynx EM+ SM712<br>' .
       '2MB integrated frame buffer'),
   array('Audio', 'Crystal CS4297A'),
   array('Communication', '802.11b only with optional PCMCIA card<br>' .
       'IRDA'),
   array('Midori\'s Software', 'Todo, notepad, web browser, <b>very</b> ' .
       'basic stuff<br>1/2 screen pop-up keyboard, handwriting recognition ' .
       '(not good)'),
   array('Battery &amp; Power', '4-cell Lithium-ion, 3200mA<br>' .
       'ACPI compliant, support suspend/sleep modes<br>' .
       'Approximately 2-3 hour battery life<br>' .
       'Power jack (12V 3A) and cradle port'),
   array('BIOS', 'AMI'),
   array('I/O', 'PCMCIA PC-Card Type II w/ 32-bit CardBus support<br>' .
       'Type II Compact Flash slot<br>' .
       'Bluetooth provision (?)<br>' .
       '2 USB 1.1 ports, Fast Infrared (FIR) at 4 Mbps<br>' .
       'Internal microphone and speaker, headphone jack'),
   array('Misc', 'Digital contrast and volume<br>' .
       '(no on-screen indicators)'),
   array('Dimensions and Weight', '10.6" x 6.3" x 1.1"<br>1.5 Lb'),
   array('Optional Cradle', 'Powers AquaPad, charges current battery, ' .
       'and can charge another simultaneously.'),
);

foreach ($Data as $v)
{
   echo "<tr><td align=right valign=center>$v[0]</td>";
   echo "<td valign=center>$v[1]</td></tr>\n";
}

?>
</table>

<p>The CompactFlash slots accept type I and type II cards.  The only snag is
that the opening in the case to access the CF slot is too thin to allow
CompactFlash type II cards, like a microdrive.  Either you need to mount
your microdrive inside the tablet, or you are going to get creative with a
Dremel tool.</p>
	
<p>As far as wireless networking goes, Midori on the AquaPad only comes with
drivers for a limited number of PCMCIA cards.  Make sure you get a Cisco
350 series, Cisco 340 series, Lucent Agere, or Orinoco Silver.</p>

<?PHP

AquaStop();
