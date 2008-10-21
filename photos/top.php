<?PHP

require_once('main.php');

ShowHeader('Top ' . $top_picture_count . ' Pictures');

$ImageInfo = SearchImageTop($top_picture_count);
if (count($ImageInfo)) {
    DisplayImageSet($ImageInfo);
} else {
    echo "<p>No images exist.</p>\n";
}

ShowFooter(-2, -1);
