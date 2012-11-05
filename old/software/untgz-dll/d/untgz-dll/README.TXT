Simple untgz dll

Based on the untgz plugin for NSIS v2 from KJD <jeremyd@computer.org>


Only one function is available:

  untgz("source.tgz", "d:\Dest_Dir\")
  
Returns 0 on success.  This will work with tarballs and gzipped
tarballs.  This would be *.tgz/*.tar.gz/*.tar files.

Only regular files and directories are processed and it only supports
filenames up to 100 characters.

All NSIS stuff was removed, so the code is basically just zlib's
license.

  This software is provided 'as-is', without any express or implied
  warranty.  In no event will the authors (or copyright holders) be
  held liable for any damages arising from the use of this software.

To build:
Use Microsoft Visual Studio 6, open untgz.dsw, press F7.

For makefiles or generating your own project, the important settings
are no default libraries (-nodefaultlib), but do link with Windows
Kernel32 and User32 (kernel32.lib user32.lib), and may still be
necessary to keep from needing helper function (-Gs16000).
The include path must also be updated to include the zlib subdirectory
(-I./zlib).
E.g. -opt:nowin98 -machine:I386 -nodefaultlib -Gs16000 kernel32.lib
     user32.lib -I./zlib
Then just include all the C/C++ files in the archive (.\untgz.cpp, 
.\nsisUtils.c, .\miniclib.c, .\untar.c, .\zlib\*.c, .\lzma\*.c,
and .\untgz.rc).


/*
 * This dll is largely based on untgz sample included with zlib:
 *
 * untgz.c -- Display contents and/or extract file from
 * a gzip'd TAR file
 * written by "Pedro A. Aranda Guti\irrez" <paag@tid.es>
 * adaptation to Unix by Jean-loup Gailly <jloup@gzip.org>
 */

--- Large Portions from ZLIB general purpose compression library ---
    version 1.2.2, October 3rd, 2004
    Copyright (C) 1995-2004 Jean-loup Gailly and Mark Adler

    version 1.1.4, March 11th, 2002
    Copyright (C) 1995-2002 Jean-loup Gailly and Mark Adler

  This software is provided 'as-is', without any express or implied
  warranty.  In no event will the authors be held liable for any damages
  arising from the use of this software.

  Permission is granted to anyone to use this software for any purpose,
  including commercial applications, and to alter it and redistribute it
  freely, subject to the following restrictions:

  1. The origin of this software must not be misrepresented; you must not
     claim that you wrote the original software. If you use this software
     in a product, an acknowledgment in the product documentation would be
     appreciated but is not required.
  2. Altered source versions must be plainly marked as such, and must not be
     misrepresented as being the original software.
  3. This notice may not be removed or altered from any source distribution.


NOTES:
- does not require a c runtime library (important if say you compile with
  MS VC 7 and don't want to require its runtime present during install [or
  Windows 95 and compiled with MS VC 5 or 6])
- zlib included is modifed from released versions to trim down its
  size and use included mini-c-library.  For exact differences, diff with
  files from zlib version 1.2.2 archive.
