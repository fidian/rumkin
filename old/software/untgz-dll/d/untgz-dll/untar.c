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
 * various fixes by Cosmin Truta <cosmint@cs.ubbcluj.ro>
*/

/*
  For tar format see
  http://www.fokus.gmd.de/research/cc/glone/employees/joerg.schilling/private/man/star.4.html
  http://www.mkssoftware.com/docs/man4/tar.4.asp 
  http://www.delorie.com/gnu/docs/tar/tar_toc.html

  TODO:
    without -j there is a security issue as no checking is done to directories
    change to better support -d option, presently we just chdir there
*/


#include "untar.h"


/** the rest mostly is untgz.c from zlib **/

/* Values used in typeflag field.  */

#define REGTYPE  '0'		/* regular file */
#define AREGTYPE '\0'		/* regular file */
#define LNKTYPE  '1'		/* link */
#define SYMTYPE  '2'		/* reserved */
#define CHRTYPE  '3'		/* character special */
#define BLKTYPE  '4'		/* block special */
#define DIRTYPE  '5'		/* directory */
#define FIFOTYPE '6'		/* FIFO special */
#define CONTTYPE '7'		/* reserved, for compatibility with gnu tar,
                               treat as regular file, where it represents
                               a regular file, but saved contiguously on disk */

/* GNU tar extensions */

#define GNUTYPE_DUMPDIR  'D'    /* file names from dumped directory */
#define GNUTYPE_LONGLINK 'K'    /* long link name */
#define GNUTYPE_LONGNAME 'L'    /* long file name */
#define GNUTYPE_MULTIVOL 'M'    /* continuation of file from another volume */
#define GNUTYPE_NAMES    'N'    /* file name that does not fit into main hdr */
#define GNUTYPE_SPARSE   'S'    /* sparse file */
#define GNUTYPE_VOLHDR   'V'    /* tape/volume header */


/* tar header */

#define BLOCKSIZE 512
#define SHORTNAMESIZE 100

struct tar_header
{                       /* byte offset */
  char name[100];       /*   0 */
  char mode[8];         /* 100 */
  char uid[8];          /* 108 */
  char gid[8];          /* 116 */
  char size[12];        /* 124 */
  char mtime[12];       /* 136 */
  char chksum[8];       /* 148 */
  char typeflag;        /* 156 */
  char linkname[100];   /* 157 */
  char magic[6];        /* 257 */ /* older gnu tar combines magic+version = 'uname  \0' */
  char version[2];      /* 263 */ /* posix has magic = 'uname\0' and version = '00' */
  char uname[32];       /* 265 */
  char gname[32];       /* 297 */
  char devmajor[8];     /* 329 */
  char devminor[8];     /* 337 */
  char prefix[155];     /* 345 */
                        /* 500 */
};

union tar_buffer {
  char               buffer[BLOCKSIZE];
  struct tar_header  header;
};


/* help functions */

unsigned long getoct(char *p,int width)
{
  unsigned long result = 0;
  char c;
  
  while (width --)
    {
      c = *p++;
      if (c == ' ') /* ignore padding */
        continue;
      if (c == 0)   /* ignore padding, but also marks end of string */
        break;
      if (c < '0' || c > '7')
        return result; /* really an error, but we just ignore invalid values */
      result = result * 8 + (c - '0');
    }
  return result;
}

/* regular expression matching */

#define ISSPECIAL(c) (((c) == '*') || ((c) == '/'))

int ExprMatch(char *string,char *expr)
{
  while (1)
    {
      if (ISSPECIAL(*expr))
	{
	  if (*expr == '/')
	    {
	      if (*string != '\\' && *string != '/')
		return 0;
	      string ++; expr++;
	    }
	  else if (*expr == '*')
	    {
	      if (*expr ++ == 0)
		return 1;
	      while (*++string != *expr)
		if (*string == 0)
		  return 0;
	    }
	}
      else
	{
	  if (*string != *expr)
	    return 0;
	  if (*expr++ == 0)
	    return 1;
	  string++;
	}
    }
}


/* returns 0 on failed checksum, nonzero if probably ok 
   it was noted that some versions of tar compute
   signed chksums, though unsigned appears to be the
   standard; chksum is simple sum of all bytes in header
   as integers (using at least 17 bits) with chksum
   values treated as ASCII spaces.
*/
int valid_checksum(struct tar_header *header)
{
  unsigned hdrchksum = (unsigned)getoct(header->chksum,8);
  signed schksum = 0;
  unsigned uchksum = 0;
  int i;

  for (i=0; i < sizeof(struct tar_header); i++)
  {
    unsigned char val = ((unsigned char *)header)[i];
    if ((i >= 148) && (i < 156)) /* chksum */
    {
      val = ' ';
    }
    schksum += (signed char)val;
    uchksum += val;
  }

  if (hdrchksum == uchksum) return 1;
  if ((int)hdrchksum == schksum) return 2;
  return 0;
}


/* recursive make directory */
/* abort if you get an ENOENT errno somewhere in the middle */
/* e.g. ignore error "mkdir on existing directory" */
/* */
/* return 1 if OK */
/*        0 on error */

int makedir (char *newdir)
{
  char *buffer = strdup(newdir);
  char *p;
  int  len = strlen(buffer);
  
  if (len <= 0) {
    free(buffer);
    return 0;
  }
  if (buffer[len-1] == '/') {
    buffer[len-1] = '\0';
  }
  if (CreateDirectory(buffer, NULL) != 0 || GetLastError() == ERROR_ALREADY_EXISTS)
    {
      free(buffer);
      return 1;
    }

  p = buffer+1;
  while (1)
    {
      char hold;
      
      while(*p && *p != '\\' && *p != '/')
        p++;
      hold = *p;
      *p = 0;
      //if ((mkdir(buffer, 0775) == -1) && (errno == ENOENT /* != EEXIST */))
      if (! CreateDirectory(buffer, NULL) && GetLastError() != ERROR_ALREADY_EXISTS)
      {
        free(buffer);
	    return 0;
      }
      if (hold == 0)
        break;
      *p++ = hold;
    }
  free(buffer);
  return 1;
}

/* NOTE: This should be modified to perform whatever steps
   deemed necessary to make embedded paths safe prior to
   creating directory or file of given [path]filename.
   Must modify fname in place, always leaving either
   same or smaller strlen than current string.
   Current version (if not #defined out) removes any
   leading parent (..) or root (/)(\) references.
*/
void safetyStrip(char * fname)
{
#if 0
  /* strip root from path */
  if ((*fname == '/') || (*fname == '\\'))
  {
    MoveMemory(fname, fname+1, strlen(fname+1) + 1 );
  }

  /* now strip leading ../ */
  while ((*fname == '.') && (*(fname+1) == '.') && ((*(fname+2) == '/') || (*(fname+2) == '\\')) )
  {
    MoveMemory(fname, fname+3, strlen(fname+3) + 1 );
  }
#endif
}



/* returns a pointer to a static buffer
 * containing fname after removing all but
 * path_sep_cnt path separators
 * if there are less than path_sep_cnt
 * separators then all will still be there.
 */
char * stripPath(int path_sep_cnt, char *fname)
{
  static char buffer[1024];
  char *fname_use = fname + strlen(fname);
  register int i=path_sep_cnt;
  do
  {
    if ( (*fname_use == '/') || (*fname_use == '\\') ) 
	{ 
      i--;
	  if (i < 0) fname_use++;
	  else fname_use--;
    }
	else
      fname_use--;
  } while ((i >= 0) && (fname_use > fname));
  
  strcpy(buffer, fname_use);
  return buffer;
}

typedef unsigned long time_t;

#ifdef __GNUC__
#define HUNDREDSECINTERVAL 116444772000000000LL
#else
#define HUNDREDSECINTERVAL 116444772000000000i64
#endif
void cnv_tar2win_time(time_t tartime, FILETIME *ftm)
{
#ifdef HAS_LIBC_CAL_FUNCS
		  FILETIME ftLocal;
		  SYSTEMTIME st;
		  struct tm localt;
 
		  localt = *localtime(&tartime);
		  
		  st.wYear = (WORD)localt.tm_year+1900;
		  st.wMonth = (WORD)localt.tm_mon+1;    /* 1 based, not 0 based */
		  st.wDayOfWeek = (WORD)localt.tm_wday;
		  st.wDay = (WORD)localt.tm_mday;
		  st.wHour = (WORD)localt.tm_hour;
		  st.wMinute = (WORD)localt.tm_min;
		  st.wSecond = (WORD)localt.tm_sec;
		  st.wMilliseconds = 0;
		  SystemTimeToFileTime(&st,&ftLocal);
		  LocalFileTimeToFileTime(&ftLocal,ftm);
#else
	// avoid casts further below
    LONGLONG *t = (LONGLONG *)ftm;

	// tartime == number of seconds since midnight Jan 1 1970 (00:00:00)
	// convert to equivalent 100 nanosecond intervals
	*t = UInt32x32To64(tartime, 10000000UL);

	// now base on 1601, add number of 100 nansecond intervals between 1601 & 1970
	*t += HUNDREDSECINTERVAL;  /* 116444736000000000i64; */
#endif
}


gzFile infile;


/* Reads in a single TAR block
 */
long readBlock(void *buffer)
{
  long len = -1;
  len = gzread(infile, buffer, BLOCKSIZE);

  /* check for read errors and abort */
  if (len < 0)
  {
	gzclose(infile);
    return -1;
  }
  /*
   * Always expect complete blocks to process
   * the tar information.
   */
  if (len != BLOCKSIZE)
  {
	gzclose(infile);
    return -1;
  }

  return len; /* success */
}


/* Tar file extraction
 * gzFile in, handle of input tarball opened with gzopen
 */
int tgz_extract(gzFile in)
{
  int           getheader = 1;
  HANDLE        outfile = INVALID_HANDLE_VALUE;

  union         tar_buffer buffer;
  unsigned long remaining;
  char          fname[BLOCKSIZE]; /* must be >= BLOCKSIZE bytes */
  time_t        tartime;
  char			*p;

  infile = in;
  
  while (1)
  {
    if (readBlock(&buffer) < 0)
		return -4;
      
    /*
     * If we have to get a tar header
     */
    if (getheader >= 1)
    {
      /*
       * if we met the end of the tar
       * or the end-of-tar block,
       * we are done
       */
      if (buffer.header.name[0]== 0)
		  break;

      /* compute and check header checksum, support signed or unsigned */
      if (!valid_checksum(&(buffer.header)))
      {
		gzclose(infile);
        return -5;
      }

      /* store time, so we can set the timestamp on files */
      tartime = (time_t)getoct(buffer.header.mtime,12);

      /* copy over filename chunk from header, avoiding overruns */
      if (getheader == 1) /* use normal (short) filename from header */
      {
        /* NOTE: prepend buffer.head.prefix if tar archive expected to have it */
        lstrcpyn(fname,buffer.header.name, sizeof(buffer.header.name));
        fname[SHORTNAMESIZE-1] = '\0'; /* ensure terminated */
      }
      else /* use (GNU) long filename that preceeded this header */
      {
        /* if (strncmp(fname,buffer.header.name,SHORTNAMESIZE-1) != 0) */
        char fs[SHORTNAMESIZE];   /* force strings to same max len, then compare */
        lstrcpyn(fs, fname, SHORTNAMESIZE);
        fs[SHORTNAMESIZE-1] = '\0';
        buffer.header.name[SHORTNAMESIZE-1] = '\0';
        if (lstrcmp(fs, buffer.header.name) != 0)
        {
 	      gzclose(infile);
          return -6;
        }
      }
      /* LogMessage("buffer.header.name is:");  LogMessage(fname); */


      switch (buffer.header.typeflag)
      {
        case DIRTYPE:
            dirEntry:
               safetyStrip(fname);
               makedir(fname);
	      break;
		case CONTTYPE:  /* contiguous file, for compatibility treat as normal */
        case REGTYPE:
        case AREGTYPE:
	      /* Note: a file ending with a / may actually be a BSD tar directory entry */
	      if (fname[lstrlen(fname)-1] == '/')
	        goto dirEntry;

	      remaining = getoct(buffer.header.size,12);
	              /* try creating directory */
	              p = strrchr(fname, '/');
	              if (p != NULL) 
	              {
	                *p = '\0';
	                makedir(fname);
	                *p = '/';
	              }
	          if (*fname) /* if after stripping path a fname still exists */
	          {
	            safetyStrip(fname);
	            outfile = CreateFile(fname,GENERIC_WRITE,FILE_SHARE_READ,NULL,CREATE_ALWAYS,FILE_ATTRIBUTE_NORMAL,NULL);
	          }

	      /*
	       * could have no contents, in which case we close the file and set the times
	       */
	      if (remaining > 0)
	          getheader = 0;
		  else
	      {
	          getheader = 1;
	          if (outfile != INVALID_HANDLE_VALUE)
	          {
	              HANDLE hFile;
	              FILETIME ftm;
 
	              CloseHandle(outfile);
	              outfile = INVALID_HANDLE_VALUE;

	              hFile = CreateFile(fname, GENERIC_READ | GENERIC_WRITE,
	      		     0, NULL, OPEN_EXISTING, 0, NULL);
	              cnv_tar2win_time(tartime, &ftm);
	              SetFileTime(hFile,&ftm,NULL,&ftm);
	              CloseHandle(hFile);
	          }
	      }

	      break;
		case GNUTYPE_LONGLINK:
		case GNUTYPE_LONGNAME:
		{
	      remaining = getoct(buffer.header.size,12);
	      if (readBlock(fname) < 0) return -1;
	      fname[BLOCKSIZE-1] = '\0';
	      if ((remaining >= BLOCKSIZE) || ((unsigned)strlen(fname) > remaining))
	      {
	          gzclose(infile);
	          return -7;
	      }
	      getheader = 2;
	      break;
		}
        default:
	      break;
      }
    }
    else  /* (getheader == 0) */
    {
      unsigned int bytes = (remaining > BLOCKSIZE) ? BLOCKSIZE : remaining;
	  unsigned long bwritten;

      if (outfile != INVALID_HANDLE_VALUE)
      {
          WriteFile(outfile,buffer.buffer,bytes,&bwritten,NULL);
		  if (bwritten != bytes)
          {
              CloseHandle(outfile);
              DeleteFile(fname);
          }
      }
      remaining -= bytes;
      if (remaining == 0)
      {
          getheader = 1;
          if (outfile != INVALID_HANDLE_VALUE)
          {
              HANDLE hFile;
              FILETIME ftm;
 
              CloseHandle(outfile);
              outfile = INVALID_HANDLE_VALUE;

              hFile = CreateFile(fname, GENERIC_READ | GENERIC_WRITE,
				     0, NULL, OPEN_EXISTING, 0, NULL);
              cnv_tar2win_time(tartime, &ftm);
              SetFileTime(hFile,&ftm,NULL,&ftm);
              CloseHandle(hFile);
          }
      }
    }
  } /* while(1) */
  
  if (gzclose(infile) != Z_OK)
	  return -3;

  return 0;
}
