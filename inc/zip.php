<?php
/* -*- php -*-
 * / * Zip file creation class.
 * Makes zip files.
 * 
 * Based on :
 * 
 *  http://phpmyadmin.sourceforge.net/
 *  The libraries/zip.lib.php3 file
 * 
 *  http://www.zend.com/codex.php3?id=535&single=1
 *  By Eric Mueller <eric@themepark.com>
 * 
 *  http://www.zend.com/codex.php3?id=470&single=1
 *  by Denis125 <webmaster@atlant.ru>
 * 
 *  a patch from Peter Listiak <mlady@users.sourceforge.net> for last modified
 *  date and time of the compressed file
 * 
 * Official ZIP file format: http://www.pkware.com/appnote.txt
 * 
 * If you plan on sending this to the browser, make sure that you do not
 * have zlib output compression turned on.  If you do have it turned on for
 * your site, you need to turn it off for a directory (the one that your PHP
 * script runs in) with a .htaccess file.
 *    php_flag zlib.output_compression off
 * Otherwise the output will be compressed and the extra 25 bytes will make
 * the zipfile be corrupt.
 * 
 * Something is screwy with the zip file that is created.  Windows XP (the
 * piece of crap that is) has a hard time opening the generated file.
 * / */
class zipfile {
	public
	public $datasec = array();  // Stores compressed data
	public
	public $ctrl_dir = array();  // Central directory
	public
	public $eof_ctrl_dir = "\x50\x4b\x05\x06\x00\x00\x00\x00";
	
	
	// End of central directory record
	public
	public $old_offset = 0;
	
	
	/* Last offset position
	 * / * Converts an Unix timestamp to a four byte DOS date and time format
	 * (date in high two bytes, time in low two bytes allowing magnitude
	 * comparison).
	 * / */
	public function unix2DosTime($unixtime = 0) {
		$timearray = ($unixtime == 0) ? getdate() : getdate($unixtime);
		
		if ($timearray['year'] < 1980) {
			$timearray['year'] = 1980;
			$timearray['mon'] = 1;
			$timearray['mday'] = 1;
			$timearray['hours'] = 0;
			$timearray['minutes'] = 0;
			$timearray['seconds'] = 0;
		}
		
		return (($timearray['year'] - 1980) << 25) | ($timearray['mon'] << 21) | ($timearray['mday'] << 16) | ($timearray['hours'] << 11) | ($timearray['minutes'] << 5) | ($timearray['seconds'] >> 1);
	}
	
	
	/* Adds "dir" to archive
	 * 
	 * $name = the directory name, ending in '/'
	 * $time = [Optional] The directory timestamp
	 */
	public function addDir($name, $time = 0) {
		$name = str_replace('\\', '/', $name);
		$dtime = dechex($this->unix2DosTime($time));
		$hexdtime = '\x' . $dtime[6] . $dtime[7] . '\x' . $dtime[4] . $dtime[5] . '\x' . $dtime[2] . $dtime[3] . '\x' . $dtime[0] . $dtime[1];
		eval('$hexdtime = "' . $hexdtime . '";');
		$fr = "\x50\x4b\x03\x04";
		$fr .= "\x0a\x00";
		$fr .= "\x00\x00";
		$fr .= "\x00\x00";
		$fr .= $hexdtime;
		$fr .= pack('V', 0);
		$fr .= pack('V', 0);
		$fr .= pack('V', 0);
		$fr .= pack('v', strlen($name));
		$fr .= pack('v', 0);
		$fr .= $name;
		$fr .= pack('V', 0);
		$fr .= pack('V', 0);
		$fr .= pack('V', 0);
		$this->datasec[] = $fr;
		$new_offset = strlen(implode('', $this->datasec));
		$cdrec = "\x50\x4b\x01\x02";
		$cdrec .= "\x00\x00";
		$cdrec .= "\x0a\x00";
		$cdrec .= "\x00\x00";
		$cdrec .= "\x00\x00";
		$cdrec .= "\x00\x00\x00\x00";
		$cdrec .= pack('V', 0);
		$cdrec .= pack('V', 0);
		$cdrec .= pack('V', 0);
		$cdrec .= pack('v', strlen($name));
		$cdrec .= pack('v', 0);
		$cdrec .= pack('v', 0);
		$cdrec .= pack('v', 0);
		$cdrec .= pack('v', 0);
		$ext = "\x00\x00\x10\x00";
		$ext = "\xff\xff\xff\xff";
		$cdrec .= pack('V', 16);
		$cdrec .= pack('V', $this->old_offset);
		$cdrec .= $name;
		$this->ctrl_dir[] = $cdrec;
		$this->old_offset = $new_offset;
	}
	
	
	/* Adds "file" to archive
	 * 
	 * $data = file contents
	 * $name = the name of the file (may contain the path, use addDir() to
	 *         first add the directory entry)
	 * $time = [Optional] the current timestamp (e.g. filemtime() function)
	 */
	public function addFile($data, $name, $time = 0) {
		$name = str_replace('\\', '/', $name);
		$dtime = dechex($this->unix2DosTime($time));
		$hexdtime = '\x' . $dtime[6] . $dtime[7] . '\x' . $dtime[4] . $dtime[5] . '\x' . $dtime[2] . $dtime[3] . '\x' . $dtime[0] . $dtime[1];
		eval('$hexdtime = "' . $hexdtime . '";');
		$fr = "\x50\x4b\x03\x04";
		$fr .= "\x14\x00";  // ver needed to extract
		$fr .= "\x05\x00";  // gen purpose bit flag
		$fr .= "\x08\x00";  // compression method
		$fr .= $hexdtime;
		
		/* last mod time and date
		 * "local file header" segment */
		$unc_len = strlen($data);
		$crc = crc32($data);
		
		// $zdata   = gzcompress($data);  // using gzdeflate instead
		$zdata = gzdeflate($data, 9);
		$c_len = strlen($zdata);
		$fr .= pack('V', $crc);  // crc32
		$fr .= pack('V', $c_len);  // compressed filesize
		$fr .= pack('V', $unc_len);  // uncompressed filesize
		$fr .= pack('v', strlen($name));  // length of filename
		$fr .= pack('v', 0);  // extra field length
		$fr .= $name;
		
		// "file data" segment
		$fr .= $zdata;
		
		/* "data descriptor" segment (optional but necessary if archive is not
		 * served as file)
		 * $fr .= pack('V', $crc);                 // crc32
		 * $fr .= pack('V', $c_len);               // compressed filesize
		 * $fr .= pack('V', $unc_len);             // uncompressed filesize
		 * Optional and appears to cause problems in some cases
		 * add this entry to array */
		$this->datasec[] = $fr;
		$new_offset = strlen(implode('', $this->datasec));
		
		// now add to central directory record
		$cdrec = "\x50\x4b\x01\x02";
		$cdrec .= "\x00\x00";  // version made by
		$cdrec .= "\x14\x00";  // version needed to extract
		$cdrec .= "\x00\x00";  // gen purpose bit flag
		$cdrec .= "\x08\x00";  // compression method
		$cdrec .= $hexdtime;  // last mod time & date
		$cdrec .= pack('V', $crc);  // crc32
		$cdrec .= pack('V', $c_len);  // compressed filesize
		$cdrec .= pack('V', $unc_len);  // uncompressed filesize
		$cdrec .= pack('v', strlen($name));  // length of filename
		$cdrec .= pack('v', 0);  // extra field length
		$cdrec .= pack('v', 0);  // file comment length
		$cdrec .= pack('v', 0);  // disk number start
		$cdrec .= pack('v', 0);  // internal file attributes
		$cdrec .= pack('V', 32);
		
		/* external file attributes - 'archive' bit set
		 * relative offset of local header */
		$cdrec .= pack('V', $this->old_offset);
		$this->old_offset = $new_offset;
		$cdrec .= $name;
		
		/* optional extra field, file comment goes here
		 * save to central directory */
		$this->ctrl_dir[] = $cdrec;
	}
	
	
	/* Dumps out file
	 * 
	 * Returns the zipped file
	 */
	public function file() {
		$data = implode('', $this->datasec);
		$ctrldir = implode('', $this->ctrl_dir);
		return $data . $ctrldir . $this->eof_ctrl_dir . pack('v', sizeof($this->ctrl_dir)) .  // total # of entries "on this disk"
		pack('v', sizeof($this->ctrl_dir)) .  // total # of entries overall
		pack('V', strlen($ctrldir)) .  // size of central dir
		pack('V', strlen($data)) .  // offset to start of central dir
		"\x00\x00";  // .zip file comment length
	}
}


/* end of the 'zipfile' class
 * Displays the appropriate headers to download the zip file
 * to the browser. */
function ShowZipFileHeaders($zipname) {
	header('Pragma: ');
	header('Cache-Control: cache');
	$badIE = 0;
	
	if (strstr($HTTP_USER_AGENT, 'compatible; MSIE ') !== false && strstr($HTTP_USER_AGENT, 'Opera') === false && strstr($HTTP_USER_AGENT, 'compatible; MSIE 6') === false) {
		$badIE = 1;
	}
	
	$zipname = ereg_replace('[^-a-zA-Z0-9\.]', '_', $zipname);
	
	if ($badIE) {
		header("Content-Disposition: inline; filename=$zipname");
		header("Content-Type: application/zip; name=\"$zipname\"");
	} else {
		header("Content-Disposition: attachment; filename=\"$zipname\"");
		header("Content-Type: application/zip; name=\"$zipname\"");
	}
}


/* Makes a quick zip file
 * Files is an array of directory names and files */
function MakeZipFile($zipname, $files, $FilenameIsKeys = false) {
	$zipname = ereg_replace('[^-a-zA-Z0-9\.]', '_', $zipname);
	$zip = new zipfile();
	
	foreach ($files as $k => $file) {
		if ($FilenameIsKeys)$filename = $k;
		else $filename = $file;
		
		if (substr($file, - 1, 1) == '/') {
			$zip->addDir($file);
		} elseif (file_exists($filename)) {
			$fp = fopen($filename, 'rb');
			
			if ($fp) {
				$data = fread($fp, filesize($filename));
				$zip->addFile($data, $file);
				fclose($fp);
			}
		}
	}
	
	ShowZipFileHeaders($zipname);
	echo $zip->file();
}

