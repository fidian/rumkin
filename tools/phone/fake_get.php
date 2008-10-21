<?PHP

if (! isset($_REQUEST['sid']) || ! isset($_REQUEST['url']) ||
    $_REQUEST['sid'] == '' || $_REQUEST['url'] == '') {
    echo "SID or URL missing or blank";
    exit();
}

$sid = preg_replace('/[^a-z]/', '', strtolower($_REQUEST['sid']));
$url = $_REQUEST['url'];
$old_sid = session_id($sid);
session_start();

if (! isset($_SESSION['fake_info'])) {
    session_id($old_sid);
    echo "Misspelled sid";
    exit();
}

$i = $_SESSION['fake_info'];
session_write_close();
session_id($old_sid);

if (! preg_match('~^http://([^/]*)(/.*)$~', $url, $matches)) {
    echo "Bad / unsupported url";
    exit();
}

if (isset($i['headers']['Connection'])) {
    $i['headers']['Connection'] = 'close';
}
if (isset($i['headers']['Cookie'])) {
    unset($i['headers']['Cookie']);
}
if (isset($i['headers']['Keep-Alive'])) {
    unset($i['headers']['Keep-Alive']);
}
if (isset($i['headers']['Host'])) {
    $i['headers']['Host'] = $matches[1];
}
$i['uri'] = $matches[2];

//print_r($i);

$req = "GET {$i['uri']} {$i['protocol']}\r\n";
foreach ($i['headers'] as $k => $v) {
    $req .= "$k: $v\r\n";
}
$req .= "\r\n";

//echo $req;

$fp = fsockopen($matches[1], 80, $errno, $errstr, 20);
if (! $fp) {
    echo "Unable to open connection to server.";
    exit();
}

fwrite($fp, $req);
while (! feof($fp)) {
    echo fgets($fp, 1024);
}
fclose($fp);
