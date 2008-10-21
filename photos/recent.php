<?PHP

require_once('main.php');

ShowHeader('Most Recent Additions');

$ImageInfo = SearchImageRecent($most_recent_count);
if (count($ImageInfo)) {
    DisplayImageSet($ImageInfo);
} else {
    echo "<p>No images exist.</p>\n";
}

ShowFooter(-2, -1);
