<?php

ini_set('display_errors', 'on');
ini_set('error_reporting', E_ALL | E_NOTICE | E_DEPRECATED);

$repositories = array(
	'phpunit' => array(
		'name' => 'PHPUnit',
		'rest' => 'http://pear.phpunit.de/rest/',
	),
	'symfony' => array(
		'name' => 'Symfony',
		'rest' => 'http://pear.symfony-project.com/rest/',
	),
);

if (! empty($_SERVER['PATH_INFO'])) {
	$pathInfo = $_SERVER['PATH_INFO'];
} else {
	$pathInfo = '/';
}

$pathInfo = explode('/', $pathInfo);
array_shift($pathInfo);

$myself = $_SERVER['SCRIPT_NAME'];  // No trailing slash

if (empty($pathInfo[0])) {
	serverList($repositories, $myself);
} elseif (empty($repositories[$pathInfo[0]])) {
	error404('Repository not found');
} else {
	$repo = $repositories[$pathInfo[0]];
	$myselfRepo = $myself . '/' . urlencode($pathInfo[0]);

	if (empty($pathInfo[1])) {
		packageList($repo, $myselfRepo);
	} else {
		$myselfPackage = $myselfRepo . '/' . urlencode($pathInfo[1]);

		if (empty($pathInfo[2])) {
			packageVersions($repo, $myselfPackage, $pathInfo[1]);
		} else {
			downloadVersion($repo, $pathInfo[1], $pathInfo[2]);
		}
	}
}


function downloadVersion($repo, $package, $version) {
	$version = preg_replace('/^v/', '', $version);
	$version = preg_replace('/\\.tar\\.gz$/', '', $version);
	$dom = rest($repo, 'r/' . strtolower($package) . '/' . urlencode($version) . '.xml');

	if (! $dom) {
		error404('Version-specific information not found');
		return;
	}

	$child = null;

	foreach ($dom->childNodes as $node) {
		if ($node->nodeName == 'r') {
			$child = $node;
		}
	}

	if (! $child) {
		error404('Malformed allreleases XML');
		return;
	}

	$get = null;

	foreach ($child->childNodes as $node) {
		if ($node->nodeName == "g") {
			$get = $node->nodeValue;
		}
	}

	if (is_null($get)) {
		error404('No URL listed in XML for getting package');
		return;
	}

	header('Location: ' . $get . '.tgz');
}


function error404($message) {
	header('Status: 404 ' . $message);
	pageStart($message);
	echo htmlentities($message);
	pageStop();
}


function packageList($repo, $myself) {
	$dom = rest($repo, 'p/packages.xml');

	if (! $dom) {
		error404('Repository has no packages');
		return;
	}

	$child = null;

	foreach ($dom->childNodes as $node) {
		if ($node->nodeName == 'a') {
			$child = $node;
		}
	}

	if (! $child) {
		error404('Malformed package XML');
		return;
	}

	pageStart('Package list for ' . $repo['name']);
	echo "<ul>\n";

	foreach ($child->childNodes as $node) {
		if ($node->nodeName == "p") {
			echo "<li><a href=\"$myself/" . urlencode($node->nodeValue) . "\">" . htmlentities($node->nodeValue) . "</a></li>\n";
		}
	}

	echo "</ul>\n";
	pageStop();
}


function packageVersions($repo, $myself, $package) {
	$versions = array();

	$dom = rest($repo, 'r/' . strtolower($package) . '/allreleases.xml');

	if (! $dom) {
		error404('Package release information not found');
		return;
	}

	$child = null;

	foreach ($dom->childNodes as $node) {
		if ($node->nodeName == 'a') {
			$child = $node;
		}
	}

	if (! $child) {
		error404('Malformed allreleases XML');
		return;
	}

	pageStart($repo['name'] . ' ' . $package . ': Stable versions');
	echo "<ul>\n";

	foreach ($child->childNodes as $node) {
		if ($node->nodeName == "r") {
			$stability = null;
			$version = null;

			foreach ($node->childNodes as $releaseNode) {
				switch ($releaseNode->nodeName) {
					case 'v':
						$version = $releaseNode->nodeValue;
						break;

					case 's':
						$stability = $releaseNode->nodeValue;
						break;
				}
			}

			if (! is_null($version) && $stability == 'stable') {
				echo "<li><a href=\"$myself/v" . urlencode($version) . ".tar.gz\">" . htmlentities($version) . "</a></li>\n";
			}
		}
	}

	echo "<ul>\n";
	pageStop();
}


function pageStart($title) {
	echo "<html><head><title>" . htmlentities($title) . "</title></head>\n";
	echo "<body>\n";
	echo "<h2>" . htmlentities($title) . "</h2>\n";
}

function pageStop() {
	echo "<hr>\n";
	echo "<p>This redirector is free for you to use and is intended to be consumed by uscan to make sure packages are up to date on Debian-based systems.  It allows you to use debian/watch files for custom PEAR and PECL repositories.</p>";
	echo "</body></html>\n";
}

function rest($repo, $url) {
	$xml = @file_get_contents($repo['rest'] . $url);

	if (empty($xml)) {
		return null;
	}

	$dom = new DOMDocument();
	$dom->loadXML($xml);
	return $dom;
}


function serverList($repositories, $myself) {
	pageStart('Repository List');
	echo "<ul>\n";

	foreach ($repositories as $name => $repoInfo) {
		echo "<li><a href=\"$myself/" . urlencode($name) . "\">" . htmlentities($name) . "</a></li>\n";
	}

	echo "</ul>\n";
	pageStop();
}
