<?PHP

$Base_Dir = getenv('WEBBASE');

// Don't bother listing things where '_' is changed into spaces
// and the first letters are capitalized.
$GLOBALS['DirToName'] = 
  array('admin' => 'Administration',
	'fun' => 'Fun Stuff',
	'fun/clutter' => 'Miscellaneous Junk',
	'fun/ttwisters' => 'Tongue Twisters',
	'reference/dakota' => 'Dakota Digital Camera',
	'reference/dnd' => 'Dungeons &amp; Dragons',
	'reference/dvd' => 'DVD List',
	'reference/email' => 'Rumkin Email',
	'reference/foxpro' => 'FoxPro',
	'reference/gutenberg' => 'Project Gutenberg',
	'reference/ms_db' => 'Microsoft Databases',
	'reference/palm' => 'Palm Programming',
	'reference/web' => 'Web-Based Technologies',
	'software/dbftool' => 'DBFTool',
	'software/diabloii' => 'Diablo II',
	'software/dnd_helper' => 'D&amp;D Helper',
	'software/floater' => 'Floating Menu',
	'software/gpx_tools' => 'GPX Tools',
	'software/kits' => 'Kits (Palm Packages)',
	'software/marco' => 'Marco (Surveyor Software)',
	'software/palm' => 'Palm OS Software',
	'software/puzzle' => 'Java Puzzle',
	'software/sdif' => 'SDIF Parsing',
	'software/slhelper' => 'Santa\'s Little Helper',
	'software/tapes' => 'Linux Tape Tools',
	'software/untgz' => 'UnTGZ',
	'tools' => 'Web-Based Tools',
	'tools/cipher' => 'Ciphers and Codes',
	'tools/darkerirc' => 'Darker IRC',
	'tools/gps' => 'GPS and Mapping',
	'tools/marquee' => 'Marquee Generator',
	'tools/password' => 'Passwords',
	'tools/population' => 'Population Counter',
	'tools/sprint' => 'Phone Uploader',
	'tools/ssh' => 'Java SSH Client',
	'tools/weeble' => 'Weeble FTP Client',
	);

?><HTML<?= $GLOBALS['HeaderOpts']['html'] ?>><HEAD><TITLE><?= $GLOBALS['HeaderOpts']['title'] ?></TITLE>
<link REL="SHORTCUT ICON" HREF="<?= $GLOBALS['HeaderOpts']['icon'] ?>">
<!-- These pages are (C)opyright 2002-2008, Tyler Akins -->
<!-- Fake email for spambots: <?= HoneypotEmail() ?> -->
<?PHP
if (isset($GLOBALS['HeaderOpts']['callback']))
  $GLOBALS['HeaderOpts']['callback']();
?>
<link rel="stylesheet" type="text/css" href="/inc/css/base.css">
<link rel="stylesheet" type="text/css" media="screen,projection" href="/inc/css/<?=
$GLOBALS['CurrentTheme'] ?>.css">
<link rel="stylesheet" type="text/css" media="print" href="/inc/css/print.css">
<?PHP 
if (isset($GLOBALS['Include jsMath']) || isset($GLOBALS['HeaderOpts']['jsmath']))
{
?><link rel="stylesheet" type="text/css" href="/inc/css/math.css">
<script src="/inc/media/jsMath/easy/load.js"></script>
<?PHP 
}
if (isset($GLOBALS['HeaderOpts']['sorttable']))
{
?>
<script src="/inc/js/sorttable.js"></script>
<?PHP 
}
?>
<script src="/inc/js/site.js?1" type="text/javascript"></script>
</head>
<body>
<table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%">
<tr><Td valign=top>
<div class="r_header"><?= $GLOBALS['HeaderOpts']['header'] ?></div>
<div class="r_headbar">
<div class="r_headbarlinks">
<span id="r_dropdown"><a class="r_link" href="/">Rumkin.com</a></span><?PHP

$chunks = explode('/', $_SERVER['REQUEST_URI']);

$arrow = '&nbsp;<span class="r_arr">&gt;&gt;</span>&nbsp;';

if ($chunks[1] == '' || $chunks[1] == 'index.php')
{
    echo $arrow . 'Main Site Index';
}
elseif (is_dir($Base_Dir . $chunks[1]))
{
    echo $arrow . '<a class="r_link" href="/' . $chunks[1] .
      '/">' . ChangeNameCase($chunks[1], $chunks[1]) . '</a>';
    
    if ($chunks[2] == '' || $chunks[2] == 'index.php')
    {
	echo $arrow . 'Section Index';
    }
    elseif (is_dir($Base_Dir . $chunks[1] . '/' . $chunks[2]))
    {
	echo $arrow . '<a class="r_link" href="/' .
	  $chunks[1] . '/' . $chunks[2] . '/">' .
	  ChangeNameCase($chunks[1] . '/' . $chunks[2], $chunks[2]) .
	  '</a>';
    }
}
?>
</div>
<form method=GET action="http://www.google.com/search" name="googlesearch">
<div class="r_headbarsearch">
Search:
<input type=text name=q size=25 maxlength=255 value="" class="r_headsearch">
<input type=hidden name=domains value="rumkin.com">
<input type=hidden name=sitesearch value="rumkin.com">
</div>
</form>
</div>
<?PHP

if ($GLOBALS['HeaderOpts']['Backlinks'] !== false)
{
    echo '<table cellpadding=0 cellspacing=0 border=0 width=100%>';
    echo '<tr><td valign=top width="99%">';
}

?>
<div class="r_main">
<?PHP


function ChangeNameCase($dir, $def_name)
{
    if (isset($GLOBALS['DirToName'][$dir]))
    {
	return $GLOBALS['DirToName'][$dir];
    }
    
    $def_name = str_replace('_', ' ', $def_name);
    return ucwords($def_name);
}