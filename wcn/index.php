<?PHP

require(__DIR__ . '/lib.php');

$request = new WebRequest();
$data = getRequestData();

// Start to build a zip file
$zip = new ZipBuilder();

if ($data['autorun']) {
	$zip->addFile('AUTORUN.INF', 'files/AUTORUN.INF');
}

if ($data['batch']) {
	$zip->addFile('Install_Wireless.bat', 'files/Install_Wireless.bat');
}

$zip->addFile('setupSNK.exe', 'files/setupSNK.exe');
$zip->addDir('SMRTNTKY/', filemtime('files/SMRTNTKY/'));

if ($data['autorun']) {
	$zip->addFile('SMARTNTKY/fcw.ico', 'files/SMARTNTKY/fcw.ico');
}

$zip->addFile('SMRTNTKY/MessageB.txt', 'files/SMRTNTKY/MessageB.txt');
$zip->addFileData(buildWsettingXml(), 'SMRTNTKY/WSETTING.WFC');
$zip->addFileData(buildWsettingTxt(), 'SMRTNTKY/WSETTING.TXT');
$zip->outputToBrowser('wcd-usb.zip');
