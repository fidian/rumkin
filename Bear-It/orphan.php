<?PHP

require_once('main.inc');

if (! $IsAdmin)
  Location('index.php');

ShowHeader('Show Image Orphans');

$MaxMatches = $max_search_results;

$ImageInfo = SearchImageOrphans($max_search_results);
if (count($ImageInfo)) {
    DisplayImageSet($ImageInfo);
} else {
    echo "<p>No orphaned images exist.</p>\n";
}

ShowFooter(-2, -1);
