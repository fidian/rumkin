<?PHP

require '../../functions.inc';
require 'alltests.inc';

StandardHeader(array('title' => 'Personality Tests', 
		     'topic' => 'tests'));

?>

<p>These personality tests are designed only to amuse and potentially provide
insight into your mind.  The results may not be 100% accurate, but if they
bring a smile to your face, then they did their job.  If you know of more
tests like this that you would like to see here, email them to me!</p>

<?PHP

$Links = array();

foreach ($Tests as $TName => $T) {
    $a = array();
    $a['Name'] = $TName;
    $a['Desc'] = $T['Summary'];
    $a['URL'] = 'give.php?Test=' . urlencode($TName);
    
    $Links[] = $a;
}


MakeLinkList($Links);

StandardFooter();
