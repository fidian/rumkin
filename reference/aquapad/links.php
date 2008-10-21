<?PHP

include './functions.inc';

AquaStart('Useful Links');

?>
<p>If you find other useful web sites that I should link to from this
page, just let me know.</p>
<?PHP

$Links = array(
   array('Name' => 'FIC AquaPad',
         'Desc' => 'The maker of these fine devices.  Never mind the typo ' .
	    'on their main page\'s title saying AquadPad.',
	 'URL' => 'http://www.fica.com/site/html/' .
	    'products/internet/detail.asp?cat_id=240000054&C_ID=240000090'),
   array('Name' => 'FIC AquaPad (Taiwan)',
         'Desc' => 'A different description of the same thing.',
	 'URL' => 'http://www.fic.com.tw/product/mobile/aquapad/'),
   array('Name' => 'PCStats Review - FIC AquaPad',
	 'Desc' => 'A detailed look at the machine.  Nicely written.',
	 'URL' => 'http://www.pcstats.com/articleview.cfm?articleid=958'),
   array('Name' => 'TransmetaZone.com - Extensive Review',
         'Desc' => 'An extremely nice review on the AquaPad, delving into ' .
	    'most aspects about the tablet computer.  A good read.',
	 'URL' => 'http://www.transmetazone.com/articleview.cfm?' .
	    'articleid=958'),
);

Section('Product Information');
MakeLinkList($Links);

$Links = array(
   array('Name' => 'Patching the AquaPad',
         'Desc' => 'Useful information on how to upgrade the Compact ' .
	    'Flash in the unit to hold tons more data, and how to add ' .
	    'more programs to the device.',
	 'URL' => 'http://www.geocities.com/ptkatch/aquapad.htm'),
   array('Name' => 'PenMount Drivers',
	 'Desc' => 'Drivers for the PenMount DMC9000 touchscreen.',
	 'URL' => 'http://www.salt.com.tw/down_2_1_2.php'),
);

Section('Community Sites');
MakeLinkList($Links);

$Links = array(
   array('Name' => 'InfoCater',
         'Desc' => '$1179 for the Midori Linux version.  Prices are not ' .
	    'available on their web site.  [2003-04-11]',
	 'URL' => 'http://infocater.com/aquapad.shtml'),
);

Section('Where to Purchase');
MakeLinkList($Links);

AquaStop();
