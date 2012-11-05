/*
  untgz - unzip like replacement plugin, except for tarballs
  KJD <jeremyd@computer.org> 2002-2005

  Initial plugin and TAR extraction logic derived from untgz.c
  included with zlib.
  * written by "Pedro A. Aranda Guti\irrez" <paag@tid.es>
  * adaptation to Unix by Jean-loup Gailly <jloup@gzip.org>

  Copyright and license:
  I personally add no additional copyright, so the license is the
  combination of NSIS exDLL (example plugin) and decompression
  libraries used.  For basic gzip'd tarballs (which rely on zlib),
  this is essentially MIT/BSD licensed.  Support for lzma compressed
  tarballs requires the LZMA files and their LGPL/CPL with exception
  license.  Please see the included readme and/or libraries for
  complete copyright and license information.
  
  This software is provided 'as-is', without any express or implied
  warranty.  In no event will the authors (or copyright holders) be
  held liable for any damages arising from the use of this software.

*/


// plugin specific headers
#include "untar.h"

// standard headers
#include <stdarg.h>  /* va_list, va_start, va_end */


/* The exported API without name mangling */
extern "C" {

__declspec(dllexport) int untgz(char *tgz_fn, char *dest);


/* DLL entry function, needs to be __stdcall, but must be extern "C" for proper decoration (name mangling) */
BOOL WINAPI _DllMainCRTStartup(HANDLE _hModule, DWORD ul_reason_for_call, LPVOID lpReserved);

}


// global variables
HINSTANCE g_hInstance;

//HWND g_hwndParent;
//HWND g_hwndList;


// DLL entry point
BOOL WINAPI _DllMainCRTStartup(HANDLE _hModule, DWORD ul_reason_for_call, LPVOID lpReserved)
{
  g_hInstance=(HINSTANCE)_hModule;
  mCRTinit();	/* init out mini clib, mostly just stdin/stdout/stderr */
  return TRUE;
}


int untgz(char *tgz_fn, char *dest)
{
	gzFile tgzFile = NULL;

	if ((tgzFile = gzopen(tgz_fn, "rb")) == NULL)
		return -1;

	if (dest)
	{
		if (! makedir(dest))
			return -2;
		SetCurrentDirectory(dest);
	}

	return tgz_extract(tgzFile);
}

