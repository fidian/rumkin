<?PHP

include './functions.inc';

AquaStart('Locally Hosted Files');

$Links = array(
   array('Name' => 'Audio Drivers',
         'Desc' => 'Windows audio drivers.',
	 'URL' => 'media/drivers_audio.zip'),
   array('Name' => 'VGA Drivers',
         'Desc' => 'Windows VGA drivers.',
	 'URL' => 'media/drivers_vga.zip'),
   array('Name' => 'Touch Screen Drivers',
         'Desc' => 'Windows touch screen drivers.',
	 'URL' => 'media/drivers_audio.zip'),
   array('Name' => 'BIOS Flash Hard Drive Image',
	 'Desc' => 'A hard drive image that you can stick on your ' .
	    'CompactFlash card and boot to in order to flash your BIOS.  ' .
	    'Contains DOS USB drivers in case your BIOS does not supprot ' .
	    'USB Legacy Mode and comes equipped with all of the BIOS ' .
	    'ROMs that I can find.',
	 'URL' => 'media/bios_flash.img.gz'),
   array('Name' => 'MS-DOS Hard Drive Image',
	 'Desc' => 'A blank, bootable FAT12 hard drive image that you ' .
	    'can stick ' .
	    'on the CompactFlash card in order to upgrade the BIOS.',
	 'URL' => 'media/blank.hd0.gz'),
   array('Name' => 'FreeDOS Hard Drive Image',
	 'Desc' => 'Similar to above, but it is based off of FreeDOS and ' .
	    'includes many tools.  You won\'t be able to use them without ' .
	    'adding the USB keyboard driver (ohci from the bios flash ' .
	    'image) or turning on USB Legacy support.',
	 'URL' => 'media/freedos.img.bz2'),
   array('Name' => 'packcramfs.txt',
         'Desc' => 'Instructions for using packcramfs.  Provided here just ' .
	    'in case you just grabbed the binary from the AquaPad instead ' .
	    'of compiling it yourself.',
	 'URL' => 'media/packcramfs.txt'),
   array('Name' => 'Midori Linux Manual',
         'Desc' => 'My AquaPad didn\'t come with a manual, so I am very ' .
	    'glad that I found this.',
	 'URL' => 'media/AquaPAD_Midori_Manual.pdf'),
   array('Name' => 'Midori Config File',
         'Desc' => 'My current attempt at a Midori configuration.  Was ' .
	    'not working when I last tried it.',
	 'URL' => 'media/midori.config'),
   array('Name' => 'Lilo Configuration',
         'Desc' => 'Directory structure and sample lilo.conf to get you ' .
	    'started when installing a Knoppix boot CD to a CF card.',
	 'URL' => 'media/lilo-conf.zip'),
   array('Name' => 'Midori Linux BIOS',
	 'Desc' => 'This is the original BIOS that came with the Midori ' .
	    'Linux Aquapad.  It\'s also available on the BIOS Flash Hard ' .
	    'Drive Image.',
	 'URL' => 'media/taa61w.zip'),
   array('Name' => 'CF to IDE Adaptor',
	 'Desc' => 'Spec file for the ADA-COMPACTFLASH-ATA-IDE40 adaptor, ' .
	    'which will let you hook up an IDE hard drive to a ' . 
	    'CompactFlash slot.',
	 'URL' => 'media/ADA-COMPACTFLASH-ATA-IDE40.pdf'),
   array('Name' => 'CF Spec 3.0',
	 'Desc' => 'The official spec, which lists the pinouts and exact ' .
	    'characteristics of CompactFlash stadard.',
	 'URL' => 'media/'),
   array('Name' => 'CF to IDE Schematic',
	 'Desc' => 'Are you good with a soldering iron?  More info on the ' .
	    'Hacking page.',
	 'URL' => 'media/CFtoIDE.pdf'),
);

MakeLinkList($Links);

AquaStop();
