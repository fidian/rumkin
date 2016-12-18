<?php


// -*- php -*-
function BadSQL($sql, $error = '') {
	$error = dbi_error();
	
	if (strlen($sql) > 1024) {
		$sql = substr($sql, 0, 1024);
		$sql .= '... [trimmed]';
	}
	
	die("<B>Error with query:</b><br><tt>$sql</tt><br><i>$error</i>");
}


function ThumbnailSize($width, $height, $towidth = 0, $toheight = 0) {
	if ($towidth == 0)$towidth = $GLOBALS['thumbnail_max_width'];
	
	if ($toheight == 0)$toheight = $GLOBALS['thumbnail_max_height'];
	$scaleFactor = $towidth / $width;
	
	if ($toheight / $height < $scaleFactor)$scaleFactor = $toheight / $height;
	
	if ($scaleFactor > 1)$scaleFactor = 1;
	$newWidth = $width * $scaleFactor;
	$newHeight = $height * $scaleFactor;
	settype($newWidth, 'integer');
	settype($newHeight, 'integer');
	return array(
		$newWidth,
		$newHeight
	);
}


function HumanReadableSize($bytes) {
	$tags = array(
		'b',
		'k',
		'meg',
		'gig',
		'terra'
	);
	$index = 0;
	
	while ($bytes > 999 && isset($tags[$index + 1])) {
		$bytes /= 1024;
		$index ++;
	}
	
	$rounder = 1;
	
	if ($bytes < 10)$rounder *= 10;
	
	if ($bytes < 100)$rounder *= 10;
	$bytes *= $rounder;
	settype($bytes, 'integer');
	$bytes /= $rounder;
	return $bytes . ' ' . $tags[$index];
}


function OpenTempFile() {
	$try = 0;
	
	do {
		$try ++;
		$Filename = $GLOBALS['temp_dir'];
		
		if (substr($Filename, - 1) != '/')$Filename .= '/';
		$Filename .= md5($GLOBALS['PHP_SELF'] . '-' . time() . '-' . $try . '-' . rand());
		
		if (file_exists($Filename)) {
			// Don't clobber
			$fp = false;
		} else {
			$fp = fopen($Filename, 'wb');
		}
	} while ($try <= 10 && ! $fp);
	
	if ($try > 10) {
		// Hope that the caller handles this exception
		return false;
	}
	
	return array(
		$fp,
		$Filename
	);
}

/* Return number of month (1-12)
 * from it's abbreviation like 'Apr'. */
function MonthToNumber($a) {
	$m = array(
		'Jan' => 1,
		'Feb' => 2,
		'Mar' => 3,
		'Apr' => 4,
		'May' => 5,
		'Jun' => 6,
		'Jul' => 7,
		'Aug' => 8,
		'Sep' => 9,
		'Oct' => 10,
		'Nov' => 11,
		'Dec' => 12
	);
	
	if (isset($m[$a]))return $m[$a];
	$a = substr($a, 0, 3);
	$a = ucfirst(strtolower($a));
	
	if (isset($m[$a]))return $m[$a];
	return 0;
}

/* Returns date formatted according to RFC 2616.
 * e.g. Tue, 01 Aug 2000 18:08:06 GMT */
function timet2httpdate($t) {
	setlocale(LC_TIME, 'C');
	return gmstrftime('%a, %d %b %Y %H:%M:%S GMT', $t);
}

/* This function parses date as it
 * defined in rfc 2616
 * 3 basic formats are understood:
 * 
 * Sun, 06 Nov 1994 08:49:37 GMT  ; RFC 822, updated by RFC 1123
 * Sunday, 06-Nov-94 08:49:37 GMT ; RFC 850, obsoleted by RFC 1036
 * Sun Nov  6 08:49:37 1994       ; ANSI C's asctime() format
 * 
 * Returns value as unix timestamp or -1 is parsing failed.
 * */
function HTTP11DateParser($s) {
	if (preg_match("/^[A-Z][a-z][a-z]\, (\d\d) ([A-Z][a-z][a-z]) (\d\d\d\d) (\d\d):(\d\d):(\d\d) GMT$/", $s, $p)) {
		$m = MonthToNumber($p[2]);
		
		if (! isset($m))return - 1;
		return gmmktime($p[4], $p[5], $p[6], $m, $p[1], $p[3]);
	} else
	
	if (preg_match("/^[A-Z][a-z]+\, (\d\d)-([A-Z][a-z][a-z])-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/", $s, $p)) {
		$m = MonthToNumber($p[2]);
		
		if (! isset($m))return - 1;
		return gmmktime($p[4], $p[5], $p[6], $m, $p[1], $p[3]);
	} else
	
	if (preg_match("/^[A-Z][a-z][a-z] ([A-Z][a-z][a-z]) \s?(\d+) (\d\d):(\d\d):(\d\d) (\d\d\d\d)$/", $s, $p)) {
		$m = MonthToNumber($p[1]);
		
		if (! isset($m))return - 1;
		return gmmktime($p[3], $p[4], $p[5], $m, $p[2], $p[6]);
	} else {
		return - 1;
	}
}


function QuoteForJavascript($str, $SkipOutsideQuotes = false) {
	$Replacements = array(
		'/(<scr)(ipt)/i' => "$1\"+\"$2",
		'/\\\\/' => '\\\\',
		'/"/' => '\\"',
		'/\'/' => '\\\'',
		"/\r\n/" => "\n",
		"/\r/" => "\n",
		"/\n/" => "\"+\n\""
	);
	$str = preg_replace(array_keys($Replacements), array_values($Replacements), $str);
	
	if (! $SkipOutsideQuotes)return '"' . $str . '"';
	return $str;
}


function ShowPopComment($comment) {
	
	?><script language="javascript">
    alert(<?php echo QuoteForJavascript($comment) ?>);
</script>
<?php
}


function ScaleImage($im, $fromW, $fromH, $toWmax, $toHmax) {
	$thumbWH = ThumbnailSize($fromW, $fromH, $toWmax, $toHmax);
	$thumb = ImageCreateTrueColor($thumbWH[0], $thumbWH[1]);
	ImageCopyResampled($thumb, $im, 0, 0, 0, 0, $thumbWH[0], $thumbWH[1], $fromW, $fromH);
	return $thumb;
}


function Location($File = '') {
	$Hdr = 'Location: http://' . $_SERVER['HTTP_HOST'] . dirname($_SERVER['PHP_SELF']);
	
	if (substr($Hdr, - 1) != '/')$Hdr .= '/';
	header($Hdr . $File);
	header('Connection: close');
	exit();
}


function ShotAtString($Y, $M, $D) {
	$MonthArr = array(
		1 => 'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	);
	
	if ($Y) {
		if ($M) {
			if ($D)return $MonthArr[$M] . ' ' . $D . ', ' . $Y;
			return $MonthArr[$M] . ' ' . $Y;
		}
		
		return $Y;
	}
	
	return '';
}


function ClearOB() {
	$l = ob_get_level();
	
	while ($l --) {
		ob_end_flush();
	}
}


function ProcessImage($fn, $mime = false, $id) {
	$ImageInfo = FetchImageInfo($id);
	
	if ($id != $ImageInfo[0]) {
		return array(
			'error' => true,
			'msg' => 'Unable to load Image record.'
		);
	}
	
	$Dim = getimagesize($fn);
	$im = false;
	
	if ($mime == 'image/jpeg' || $mime == 'image/pjpeg') {
		$im = @ImageCreateFromJPEG($fn);
		$mime = 'image/jpeg';
		$ext = 'jpg';
	} elseif ($mime == 'image/gif') {
		$im = @ImageCreateFromGIF($fn);
		$ext = 'gif';
	} elseif ($mime == 'image/x-png') {
		$im = @ImageCreateFromPNG($fn);
		$ext = 'png';
	}
	
	/* Try harder by ignoring the MIME type and see if any of
	 * the image handlers can use it */
	if (! $im) {
		$im = @ImageCreateFromJPEG($fn);
		$mime = 'image/jpeg';
		$ext = 'jpg';
	}
	
	if (! $im) {
		$im = @ImageCreateFromGIF($fn);
		$mime = 'image/gif';
		$ext = 'gif';
	}
	
	if (! $im) {
		$im = @ImageCreateFromPNG($fn);
		$mime = 'image/x-png';
		$ext = 'png';
	}
	
	if (! $im) {
		return array(
			'error' => true,
			'msg' => 'Unknown image format or damaged image file.'
		);
	}
	
	// Build out the small image if need be
	if ($Dim[0] > $GLOBALS['big_image_w'] || $Dim[1] > $GLOBALS['big_image_h']) {
		$small = ScaleImage($im, $Dim[0], $Dim[1], $GLOBALS['big_image_w'], $GLOBALS['big_image_h']);
		imagejpeg($small, $GLOBALS['small_image_path'] . $id . '.jpg', 85);
		imagedestroy($small);
	}
	
	// Build out the thumbnail
	$thumb = ScaleImage($im, $Dim[0], $Dim[1], $GLOBALS['thumbnail_max_width'], $GLOBALS['thumbnail_max_height']);
	imagejpeg($thumb, $GLOBALS['thumb_image_path'] . $id . '.jpg', 85);
	imagedestroy($thumb);
	ImageDestroy($im);
	
	// Write or update the Image record
	$NewImageInfo = array(
		'Width' => $Dim[0],
		'Height' => $Dim[1],
		'Bytes' => filesize($fn),
	);
	
	// Read EXIF data to get the year, month, day
	$exif = exif_read_data($fn, 0, true);
	$msg = '';
	$YMD = false;
	
	if (is_array($exif) && isset($exif['EXIF']) && isset($exif['EXIF']['DateTimeOriginal'])) {
		$tempYMD = $exif['EXIF']['DateTimeOriginal'];
		
		if (preg_match('/^([0-9]{4}):([0-9]{2}):([0-9]{2}) /', $tempYMD, $matches)) {
			$YMD = array(
				$matches[1],
				$matches[2],
				$matches[3]
			);
		}
	}
	
	// Do not update the date if we already had one there.
	if ($YMD) {
		if ($ImageInfo['ShotAtYear'] == 0 && $ImageInfo['ShotAtMonth'] == 0 && $ImageInfo['ShotAtDay'] == 0) {
			$NewImageInfo['ShotAtYear'] = $YMD[0];
			$NewImageInfo['ShotAtMonth'] = $YMD[1];
			$NewImageInfo['ShotAtDay'] = $YMD[2];
		} else {
			if ($ImageInfo['ShotAtYear'] != $YMD[0] || $ImageInfo['ShotAtMonth'] != $YMD[1] || $ImageInfo['ShotAtDay'] != $YMD[2]) {
				$msg = 'Warning:  Old date (' . $ImageInfo['ShotAtYear'] . '-' . $ImageInfo['ShotAtMonth'] . '-' . $ImageInfo['ShotAtDay'] . ') does not match new date (' . $YMD[0] . '-' . $YMD[1] . '-' . $YMD[2] . ')';
			}
		}
	}
	
	$sql = array();
	
	foreach ($NewImageInfo as $k => $v) {
		$sql[] = $k . '=' . $v;
	}
	
	$sql = 'UPDATE Images SET ' . implode(', ', $sql) . ' WHERE Id = ' . $id;
	$res = dbi_query($sql);
	
	if (! $res)BadSQL($sql);
	return array(
		'error' => false,
		'width' => $Dim[0],
		'height' => $Dim[1],
		'mime' => $mime,
		'ext' => $ext,
		'id' => $id,
		'msg' => $msg,
	);
}

