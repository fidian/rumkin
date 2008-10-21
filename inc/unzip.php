<?php  // -*- php -*-

// http://www.pkware.com/business_and_developers/developer/popups/appnote.txt
//
// Want something better?  Look at pclzip


/* Pure PHP unzip functions
 * Decompresses zip files.
 *
 * Requires zlib, but that's it.
 */


// Unzip a file, returns the file contents.
// $zip = name of zip file to open
// $file = name of the file to decompress
function unzip($zip, $file, $insen = false)
{
    // Get the list of files in the zip file
    $Files = unzip_list($zip);
    
    // Find a match
    foreach ($Files as $F)
    {
	if ($F['Name'] == $file || 
	    ($insen && strtoupper($F['Name']) == strtoupper($file)))
	{
	    // Match
	    
	    // Open file
	    $fp = fopen($zip, 'rb');
	    if (! $fp)
	      return false;
	    
	    // Go to local file header
	    fseek($fp, $F['Offset'], SEEK_SET);
	    if (fread($fp, 4) != "\x50\x4b\x03\x04")
	    {
		fclose($fp);
		return false;
	    }
	    
	    // Read a few things
	    // Get past stuff already in central directory
	    fseek($fp, 22, SEEK_CUR);
	    $NameLen = unpack('v', fread($fp, 2));
	    $ExtraLen = unpack('v', fread($fp, 2));
	    fseek($fp, $NameLen[1] + $ExtraLen[1], SEEK_CUR);
	    
	    $data = fread($fp, $F['CompLen']);
	    fclose($fp);
	    
	    // Decompress
	    if ($F['CompMethod'] == 0x08)
	    {
		$data = gzinflate($data);
	    }
	    
	    return $data;
	}
    }
    
    return false;
}


// Get a list of files in a zip file
// $zip = name of zip file to open (actual file, not a string nor URL)
// Returns an array of associative arrays of information
function unzip_list($zip)
{
    $files = array();
    
    $fp = fopen($zip, 'rb');
    
    // Open the file
    if (! $fp)
      return $files;
    
    // Go to the end.  If there is an optional comment, make sure to
    // skip to just before it.
    fseek($fp, -2, SEEK_END);
    $len = 0;
    $clen = unpack('v', fread($fp, 2));
    while ($clen[1] != $len && ftell($fp) > 2)
    {
	$len ++;
	fseek($fp, -3, SEEK_CUR);
	$clen = unpack('v', fread($fp, 2));
    }
    
    // Really broken zip file
    if (ftell($fp) == 2)
    {
	fclose($fp);
	return $files;
    }
    
    // Seek to beginning of "end of central directory" record
    fseek($fp, - ($len + 22), SEEK_END);
    
    // 1)  Make sure we are at the right spot by looking for the
    // header.
    // 2)  We don't support multi-disk archives, so the next
    // four bytes must be NULL
    if (fread($fp, 8) != "\x50\x4b\x05\x06\x00\x00\x00\x00")
    {
	fclose($fp);
	return $files;
    }
    
    // Skip this number (# of central directory entries on this disk)
    fseek($fp, 2, SEEK_CUR);
    
    // Number of entries in the central directory
    $entries = unpack('v', fread($fp, 2));
    $entries = $entries[1];

    // Size of central directory
    $cd_size = unpack('V', fread($fp, 4));
    $cd_size = $cd_size[1];
    
    // Seek to beginning of central directory
    fseek($fp, - (16 + $cd_size), SEEK_CUR);
    
    while ($entries -- && fread($fp, 4) == "\x50\x4b\x01\x02")
    {
	// Read one entry
	// Skip version made by & version needed to extract
	fseek($fp, 4, SEEK_CUR);
	$BitFlag = unpack('v', fread($fp, 2));
	$CompMeth = unpack('v', fread($fp, 2));
	// Skip last modification time & last modification date
	fseek($fp, 4, SEEK_CUR);
	$CRC = unpack('V', fread($fp, 4));
	$CompLen = unpack('V', fread($fp, 4));
	$UncLen = unpack('V', fread($fp, 4));
	$NameLen = unpack('v', fread($fp, 2));
	$ExtLen = unpack('v', fread($fp, 2));
	$CommentLen = unpack('v', fread($fp, 2));
	// Skip disk # start, internal attributes, external attributes
	fseek($fp, 8, SEEK_CUR);
	$Offset = unpack('V', fread($fp, 4));
	
	$BitFlag = $BitFlag[1];
	$CompMeth = $CompMeth[1];
	$CRC = $CRC[1];
	$CompLen = $CompLen[1];
	$UncLen = $UncLen[1];
	$NameLen = $NameLen[1];
	$ExtLen = $ExtLen[1];
	$CommentLen = $CommentLen[1];
	$Offset = $Offset[1];
	
	$name = fread($fp, $NameLen);
	
	// Just in case, change all backslashes into slashes
	$name = str_replace('\\', '/', $name);
	
	// Skip extra field + file comment
	if ($ExtLen + $CommentLen)
	  fseek($fp, $ExtLen + $CommentLen, SEEK_CUR);

	if ($BitFlag & 0x28 != 0)
	{
	    // 0x08
	    // CRC-32, compressed size, uncompressed size are all zero
	    // Correct values are put in the data descriptor immediately
	    // following the compressed data.
	    // -- I am not set up to handle this yet.
	    //
	    // 0x20
	    // File is compressed patched data
	    // -- Not sure what it is, so not handling it yet.
	    
	    fclose($fp);
	    return $files;
	}
	
	// Make sure file is not encrypted and that we can decompress it
	if (($BitFlag & 0x3041) == 0 &&
	    ($CompMeth == 0 || $CompMeth == 8))
	{
	    $files[] = array('Name' => $name, 
			     'BitFlags' => $BitFlag, 
			     'CompMethod' => $CompMeth, 
			     'CompLen' => $CompLen, 
			     'UncompLen' => $UncLen,
			     'CRC' => $CRC,
			     'Offset' => $Offset);
	}
    }
    fclose($fp);
    
    return $files;
}
