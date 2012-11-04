<?php
/* Could return array(0, 0) if it had problems finding the width/height
 * Returns array(width, height)
 * Try to use this one since it is faster */
function & GetImageSize_Custom($filename, $keep_loaded = false) {
	$ret = array(
		0,
		0
	);
	
	// Try to use the GetImageSize() function since it is so fast.
	$data = GetImageSize($filename);
	
	if ($data) {
		$ret = array(
			$data[0],
			$data[1]
		);
		return $ret;
	}
	
	/* We need to load the picture to find out the dimensions.
	 * Try GD.  This could take quite a bit of memory. */
	$gd = ImageLoadWithGD($filename);
	
	if ($gd) {
		$Width = imagesx($gd);
		$Height = imagesy($gd);
		
		if ($keep_loaded) {
			$ret = array(
				$Width,
				$Height,
				'gd', &$gd
			);
			return $ret;
		}
		
		imagedestroy($gd);
		$ret = array(
			$Width,
			$Height
		);
		return $ret;
	}
	
	/* Still no luck.  Try ImageMagick.  This also could take quite
	 * a bit of memory. */
	$handle = ImageLoadWithImageMagick($filename);
	
	if ($handle) {
		$Width = imagick_get_attribute($handle, 'width');
		$Height = imagick_get_attribute($handle, 'height');
		
		if ($keep_loaded) {
			$ret = array(
				$Width,
				$Height,
				'im', &$handle
			);
			return $ret;
		}
		
		imagick_free($handle);
		$ret = array(
			$Width,
			$Height
		);
		return $ret;
	}
	
	/* If you have GD and ImageMagick installed, you're likely not dealing
	 * with an image if you get this far. */
	return $ret;
}


/* Scales the image to fit within ($maxX, $maxY)
 * If current size is less than the max, it will not inflate the image
 * $ResizeMethod is one of the defined resize methods in common.php */
function ImageBestFit($currentX, $currentY, $maxX, $maxY, $ResizeMethod = 0) {
	$scaleFactorX = $maxX / $currentX;
	$scaleFactorY = $maxY / $currentY;
	
	// This one always returns a skewed image to the size of the phone.
	if ($ResizeMethod == RESIZE_STRETCH)return array(
		$maxX,
		$maxY
	);
	
	/* Clip makes some of the image dissapear.  Otherwise we keep all
	 * of the image */
	if ($ResizeMethod == RESIZE_CLIP)$scaleFactor = max($scaleFactorX, $scaleFactorY);
	else $scaleFactor = min($scaleFactorX, $scaleFactorY);
	
	// Do not enlarge
	if ($scaleFactor > 1)$scaleFactor = 1;
	
	// Set the new image's width and height
	$newWidth = $currentX * $scaleFactor;
	$newHeight = $currentY * $scaleFactor;
	settype($newWidth, 'integer');
	settype($newHeight, 'integer');
	return array(
		$newWidth,
		$newHeight
	);
}

/* Resize an image to fit within specific bounds.
 * Skews an image if asked to do so - This doesn't care.
 * Returns the resized file data as a string */
function ResizeImage($filename, $width, $height, $format = 'jpg') {
	// Attempt to load it with ImageMagick
	$handle = ImageLoadWithImageMagick($filename);
	
	if ($handle) {
		imagick_resize($handle, $width, $height, IMAGICK_FILTER_QUADRATIC, 1);
		ob_start();
		
		if (imagick_dump($handle, strtoupper($format)) == false)imagick_dump($handle, 'JPG');
		return ob_get_clean();
	}
	
	// Attempt to load it with GD
	$gd = ImageLoadWithGD($filename);
	
	if ($gd) {
		$gd2 = imagecreatetruecolor($width, $height);
		imagecopyresampled($gd2, $gd, 0, 0, 0, 0, $width, $height, imagesx($gd), imagesy($gd));
		imagedestroy($gd);
		ob_start();
		
		if ($format == 'bmp' && function_exists('imagebmp')) {
			$format = false;
			imagebmp($gd2);
		}
		
		if ($format == 'gif' && function_exists('imagegif')) {
			$format = false;
			imagegif($gd2);
		}
		
		if ($format == 'png' && function_exists('imagepng')) {
			$format = false;
			imagepng($gd2);
		}
		
		if ($format == 'wbmp' && function_exists('imagewbmp')) {
			$format = false;
			imagewbmp($gd2);
		}
		
		if ($format) {
			imagejpeg($gd2);
		}
		
		imagedestroy($gd2);
		return ob_get_clean();
	}
	
	/* Unresizeable or unknown format
	 * Return data verbatim */
	return file_get_contents($filename);
}

/* Loads a file with ImageMagic
 * Returns false if ImageMagick extension is not loaded
 * Returns false if ImageMagick can not load the file
 * Returns an ImageMagick handle if it works */
function ImageLoadWithImageMagick($filename) {
	if (! function_exists('imagick_new'))return false;
	$handle = imagick_new();
	
	if (imagick_create($handle, $filename))return $handle;
	
	foreach (array(
			'BMP',
			'GIF',
			'GIF87',
			'JPG',
			'PCD',
			'PNG',
			'WBMP'
		) as $format) {
		if (imagick_create($handle, $format . ':' . $filename))return $handle;
	}
	
	imagick_free($handle);
	return false;
}

/* Loads a file with GD
 * Returns false if GD extension is not loaded
 * Returns false if GD can not load the file
 * Returns a GD handle if it works */
function ImageLoadWithGD($filename) {
	if (! function_exists('imagecreatefromstring'))return false;
	$gd = imagecreatefromstring(file_get_contents($filename));
	
	if ($gd)return $gd;
	
	// Just make sure
	$gd = imagecreatefromgif($filename);
	
	if ($gd)return $gd;
	$gd = imagecreatefromjpeg($filename);
	
	if ($gd)return $gd;
	$gd = imagecreatefrompng($filename);
	
	if ($gd)return $gd;
	$gd = imagecreatefromwbmp($filename);
	
	if ($gd)return $gd;
	return false;
}

