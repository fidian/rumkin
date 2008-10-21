#!/usr/bin/php -d allow_url_fopen=On
<?PHP

require 'movies.php';

$fetched = 0;

foreach ($GLOBALS['Movies'] as $name => $movieInfo) {
	$imageName = $name;
	$replacements = array(
		'/ /' => '_',
		'/&amp;/' => '',
		'/[^-a-zA-Z0-9_]/' => '',
		'/__+/' => '_',
		'/_The$/' => '',
	);
	$imageName = preg_replace(array_keys($replacements), $replacements, $imageName);
	$fullImageName = '/var/www/rumkin-media/reference/dvd/' . $imageName . '.';

	if (isset($movieInfo['imdb'])) {
		if (file_exists($fullImageName . 'gif')) {
			$GLOBALS['Movies'][$name]['image'] = $imageName . '.gif';
		} elseif (file_exists($fullImageName . 'jpg')) {
			$GLOBALS['Movies'][$name]['image'] = $imageName . '.jpg';
		}
	}
}

require '/home/fidian/laptop/php_debug/dump.inc';
$movies = '<?PHP' . "\n\n" . dump($GLOBALS['Movies'], '$GLOBALS[\'Movies\']', false, false);
file_put_contents('movies2.php', $movies);
