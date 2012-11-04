/*
 * tgz_extract functions based on code within zlib library
 * No additional copyright added, KJD <jeremyd@computer.org>
 *
 *   This software is provided 'as-is', without any express or implied
 *   warranty.  In no event will the authors be held liable for any damages
 *   arising from the use of this software.
 *
 * untgz.c -- Display contents and/or extract file from
 * a gzip'd TAR file
 * written by "Pedro A. Aranda Guti\irrez" <paag@tid.es>
 * adaptation to Unix by Jean-loup Gailly <jloup@gzip.org>
 */

#ifdef __cplusplus
extern "C" {
#endif

/* mini Standard C library replacement */
#include "miniclib.h"

/* library upon which all this work based on/requires */
#include "zlib/zlib.h"

/* actual extraction routines */
int tgz_extract(gzFile tgzFile);

/* recursive make directory */
/* abort if you get an ENOENT errno somewhere in the middle */
/* e.g. ignore error "mkdir on existing directory" */
/* */
/* return 1 if OK */
/*        0 on error */

int makedir (char *newdir);


#ifdef __cplusplus
}
#endif
