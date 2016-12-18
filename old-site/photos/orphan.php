<?php

require_once('main.php');

if (! $IsAdmin)Location('index.php');
ShowHeader('Show Image Orphans');
$MaxMatches = $max_search_results;
$ImageInfo = SearchImageOrphans($max_orphan_results);

if (count($ImageInfo)) {
	DisplayImageSet($ImageInfo);
} else {
	echo "<p>No orphaned images exist.</p>\n";
}

ShowFooter(- 2, - 1);
