<?php

/**
 * This function was created by Erik McDonald and donated back to the
 * uploader as "public domain as far as I'm concerned"
 *
 * Thanks Erik!
 *
 * Note:  This won't work on Win32 machines.
 */

function unzip($archive, $file, $boo) {
	return shell_exec("`which unzip` -pC $archive $file");
}
