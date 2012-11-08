<?PHP

require_once(__DIR__ . '/../setup.php');
WebResponse::showErrors();
require(__DIR__ . '/lib.php');

$data = json_validate_input('wcn.json');

// Start to build a zip file
$zip = new ZipBuilder();

if ($data->autorun) {
	$zip->addFile('AUTORUN.INF', 'files/AUTORUN.INF');
}

if ($data->batch) {
	$zip->addFile('Install_Wireless.bat', 'files/Install_Wireless.bat');
}

$zip->addFile('setupSNK.exe', 'files/setupSNK.exe');
$zip->addDir('SMRTNTKY/', filemtime('files/SMRTNTKY/'));

if ($data->autorun) {
	$zip->addFile('SMRTNTKY/fcw.ico', 'files/SMRTNTKY/fcw.ico');
}

$zip->addFile('SMRTNTKY/MessageB.txt', 'files/SMRTNTKY/MessageB.txt');
$zip->addFileData(buildWsettingXml($data), 'SMRTNTKY/WSETTING.WFC');
$zip->addFileData(buildWsettingTxt($data), 'SMRTNTKY/WSETTING.TXT');
$zip->outputToBrowser('wcd-usb.zip');
