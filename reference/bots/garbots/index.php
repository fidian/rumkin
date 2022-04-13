<?php

require '../../../functions.inc';
require '../../../inc/php/php-pdb.inc';
$Message = 'If you upload a .pdb file that contains one or more bots, I will
send you back a file with all of them marked as viewable.  Sweet, eh?';

if (isset($HTTP_POST_FILES) && is_array($HTTP_POST_FILES) && count($HTTP_POST_FILES) > 0) {
    foreach ($HTTP_POST_FILES as $File) {
        $pdb = new PalmDB();
        $fp = fopen($File['tmp_name'], 'r');
        
        if (! $fp) {
            $Message = 'Weird.  I can\'t read the file you just uploaded.';
        } else {
            $pdb->ReadFile($fp);
            $RecordNumbers = $pdb->GetRecordIDs();
            
            foreach ($RecordNumbers as $RecNo) {
                $pdb->GoToRecord($RecNo);
                $data = $pdb->GetRecordRaw();
                $m = pack('H', $data);
                
                if ($m & 0x02)$m = $m ^ 0x02;
                $m = $pdb->Int8($m);
                $data[0] = $m[0];
                $data[1] = $m[1];
                $pdb->SetRecordRaw($data);
            }
            
            copy($File['tmp_name'], 'upload/' . time() . '-' . $File['name']);
            $pdb->DownloadPDB($File['name']);
            exit;
        }
    }
}

StandardHeader(array(
		'title' => 'GarBots Hacker',
		'topic' => 'bots'
	));

if ($Message != '') {
	MakeBoxTop('center');
	echo '<p>' . htmlspecialchars($Message) . "</p>\n";
	MakeBoxBottom();
}

?>
<p>... Back to the <a href="../garbots.php">Garbots Page</a></p>
<form method=post action=index.php enctype="multipart/form-data">
The file to upload:  <input name="the_file" type="file"><br>
<input type=submit value="Upload file!">
</form>
<?php

StandardFooter();
