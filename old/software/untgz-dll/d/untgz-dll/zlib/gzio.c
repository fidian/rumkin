/* gzio.c -- IO on .gz files
 * Copyright (C) 1995-2003 Jean-loup Gailly.
 * For conditions of distribution and use, see copyright notice in zlib.h
 *
 * Compile this file with -DNO_GZCOMPRESS to avoid the compression code.
 */

/* @(#) $Id$ */

#include "zutil.h"

#ifdef NO_DEFLATE       /* for compatiblity with old definition */
#  define NO_GZCOMPRESS
#endif

#ifndef NO_DUMMY_DECL
struct internal_state {int dummy;}; /* for buggy compilers */
#endif

#ifndef Z_BUFSIZE
#  ifdef MAXSEG_64K
#    define Z_BUFSIZE 4096 /* minimize memory usage for 16-bit DOS */
#  else
#    define Z_BUFSIZE 16384
#  endif
#endif
#ifndef Z_PRINTF_BUFSIZE
#  define Z_PRINTF_BUFSIZE 4096
#endif

#ifdef __MVS__
#  pragma map (fdopen , "\174\174FDOPEN")
   FILE *fdopen(int, const char *);
#endif

#ifndef STDC
extern voidp  malloc OF((uInt size));
extern void   free   OF((voidpf ptr));
#endif

#define ALLOC(size) malloc(size)
#define TRYFREE(p) {if (p) free(p);}

static int const gz_magic[2] = {0x1f, 0x8b}; /* gzip magic header */

/* gzip flag byte */
#define ASCII_FLAG   0x01 /* bit 0 set: file probably ascii text */
#define HEAD_CRC     0x02 /* bit 1 set: header CRC present */
#define EXTRA_FIELD  0x04 /* bit 2 set: extra field present */
#define ORIG_NAME    0x08 /* bit 3 set: original file name present */
#define COMMENT      0x10 /* bit 4 set: file comment present */
#define RESERVED     0xE0 /* bits 5..7: reserved */

typedef struct gz_stream {
    z_stream stream;
    int      z_err;   /* error code for last stream operation */
    int      z_eof;   /* set if end of input file */
    FILE     *file;   /* .gz file */
    Byte     *inbuf;  /* input buffer */
    Byte     *outbuf; /* output buffer */
    uLong    crc;     /* crc32 of uncompressed data */
    char     *msg;    /* error message */
    char     *path;   /* path name for debugging only */
    int      transparent; /* 1 if input file is not a .gz file */
    char     mode;    /* 'w' or 'r' */
    z_off_t  start;   /* start of compressed data in file (header skipped) */
    z_off_t  in;      /* bytes into deflate or inflate */
    z_off_t  out;     /* bytes out of deflate or inflate */
    int      back;    /* one character push-back */
    int      last;    /* true if push-back is last character */
} gz_stream;


local gzFile gz_open      OF((const char *path, const char *mode, int  fd));
local int do_flush        OF((gzFile file, int flush));
local int    get_byte     OF((gz_stream *s));
local void   check_header OF((gz_stream *s));
local int    destroy      OF((gz_stream *s));
local void   putLong      OF((FILE *file, uLong x));
local uLong  getLong      OF((gz_stream *s));

/* ===========================================================================
     Opens a gzip (.gz) file for reading or writing. The mode parameter
   is as in fopen ("rb" or "wb"). The file is given either by file descriptor
   or path name (if fd == -1).
     gz_open returns NULL if the file could not be opened or if there was
   insufficient memory to allocate the (de)compression state; errno
   can be checked to distinguish the two cases (if errno is zero, the
   zlib error is Z_MEM_ERROR).
*/
local gzFile gz_open (path, mode, fd)
    const char *path;
    const char *mode;
    int  fd;
{
    int err;
    int level = Z_DEFAULT_COMPRESSION; /* compression level */
    int strategy = Z_DEFAULT_STRATEGY; /* compression strategy */
    char *p = (char*)mode;
    gz_stream *s;
    char fmode[80]; /* copy of mode, without the compression level */
    char *m = fmode;

    if (!path || !mode) return Z_NULL;

    s = (gz_stream *)ALLOC(sizeof(gz_stream));
    if (!s) return Z_NULL;

    s->stream.zalloc = (alloc_func)0;
    s->stream.zfree = (free_func)0;
    s->stream.opaque = (voidpf)0;
    s->stream.next_in = s->inbuf = Z_NULL;
    s->stream.next_out = s->outbuf = Z_NULL;
    s->stream.avail_in = s->stream.avail_out = 0;
    s->file = NULL;
    s->z_err = Z_OK;
    s->z_eof = 0;
    s->in = 0;
    s->out = 0;
    s->back = EOF;
    s->crc = crc32(0L, Z_NULL, 0);
    s->msg = NULL;
    s->transparent = 0;

    s->path = (char*)ALLOC(strlen(path)+1);
    if (s->path == NULL) {
        return destroy(s), (gzFile)Z_NULL;
    }
    strcpy(s->path, path); /* do this early for debugging */

    s->mode = '\0';
    do {
        if (*p == 'r') s->mode = 'r';
        if (*p == 'w' || *p == 'a') s->mode = 'w';
        if (*p >= '0' && *p <= '9') {
            level = *p - '0';
        } else if (*p == 'f') {
          strategy = Z_FILTERED;
        } else if (*p == 'h') {
          strategy = Z_HUFFMAN_ONLY;
        } else if (*p == 'R') {
          strategy = Z_RLE;
        } else {
            *m++ = *p; /* copy the mode */
        }
    } while (*p++ && m != fmode + sizeof(fmode));
    if (s->mode == '\0') return destroy(s), (gzFile)Z_NULL;

    if (s->mode == 'w') {
        err = Z_STREAM_ERROR;
        return destroy(s), (gzFile)Z_NULL;
    } else {
        s->stream.next_in  = s->inbuf = (Byte*)ALLOC(Z_BUFSIZE);

        err = inflateInit2(&(s->stream), -MAX_WBITS);
        /* windowBits is passed < 0 to tell that there is no zlib header.
         * Note that in this case inflate *requires* an extra "dummy" byte
         * after the compressed stream in order to complete decompression and
         * return Z_STREAM_END. Here the gzip CRC32 ensures that 4 bytes are
         * present after the compressed stream.
         */
        if (err != Z_OK || s->inbuf == Z_NULL) {
            return destroy(s), (gzFile)Z_NULL;
        }
    }
    s->stream.avail_out = Z_BUFSIZE;

    errno = 0;
    s->file = fd < 0 ? F_OPEN(path, fmode) : (FILE*)fdopen(fd, fmode);

    if (s->file == NULL) {
        return destroy(s), (gzFile)Z_NULL;
    }
    check_header(s); /* skip the .gz header */
    s->start = ftell(s->file) - s->stream.avail_in;

    return (gzFile)s;
}

/* ===========================================================================
     Opens a gzip (.gz) file for reading or writing.
*/
gzFile ZEXPORT gzopen (path, mode)
    const char *path;
    const char *mode;
{
    return gz_open (path, mode, -1);
}


/* ===========================================================================
     Read a byte from a gz_stream; update next_in and avail_in. Return EOF
   for end of file.
   IN assertion: the stream s has been sucessfully opened for reading.
*/
local int get_byte(s)
    gz_stream *s;
{
    if (s->z_eof) return EOF;
    if (s->stream.avail_in == 0) {
        errno = 0;
        s->stream.avail_in = fread(s->inbuf, 1, Z_BUFSIZE, s->file);
        if (s->stream.avail_in == 0) {
            s->z_eof = 1;
            if (ferror(s->file)) s->z_err = Z_ERRNO;
            return EOF;
        }
        s->stream.next_in = s->inbuf;
    }
    s->stream.avail_in--;
    return *(s->stream.next_in)++;
}

/* ===========================================================================
      Check the gzip header of a gz_stream opened for reading. Set the stream
    mode to transparent if the gzip magic header is not present; set s->err
    to Z_DATA_ERROR if the magic header is present but the rest of the header
    is incorrect.
    IN assertion: the stream s has already been created sucessfully;
       s->stream.avail_in is zero for the first time, but may be non-zero
       for concatenated .gz files.
*/
local void check_header(s)
    gz_stream *s;
{
    int method; /* method byte */
    int flags;  /* flags byte */
    uInt len;
    int c;

    /* Assure two bytes in the buffer so we can peek ahead -- handle case
       where first byte of header is at the end of the buffer after the last
       gzip segment */
    len = s->stream.avail_in;
    if (len < 2) {
        if (len) s->inbuf[0] = s->stream.next_in[0];
        errno = 0;
        len = fread(s->inbuf + len, 1, Z_BUFSIZE >> len, s->file);
        if (len == 0 && ferror(s->file)) s->z_err = Z_ERRNO;
        s->stream.avail_in += len;
        s->stream.next_in = s->inbuf;
        if (s->stream.avail_in < 2) {
            s->transparent = s->stream.avail_in;
            return;
        }
    }

    /* Peek ahead to check the gzip magic header */
    if (s->stream.next_in[0] != gz_magic[0] ||
        s->stream.next_in[1] != gz_magic[1]) {
        s->transparent = 1;
        return;
    }
    s->stream.avail_in -= 2;
    s->stream.next_in += 2;

    /* Check the rest of the gzip header */
    method = get_byte(s);
    flags = get_byte(s);
    if (method != Z_DEFLATED || (flags & RESERVED) != 0) {
        s->z_err = Z_DATA_ERROR;
        return;
    }

    /* Discard time, xflags and OS code: */
    for (len = 0; len < 6; len++) (void)get_byte(s);

    if ((flags & EXTRA_FIELD) != 0) { /* skip the extra field */
        len  =  (uInt)get_byte(s);
        len += ((uInt)get_byte(s))<<8;
        /* len is garbage if EOF but the loop below will quit anyway */
        while (len-- != 0 && get_byte(s) != EOF) ;
    }
    if ((flags & ORIG_NAME) != 0) { /* skip the original file name */
        while ((c = get_byte(s)) != 0 && c != EOF) ;
    }
    if ((flags & COMMENT) != 0) {   /* skip the .gz file comment */
        while ((c = get_byte(s)) != 0 && c != EOF) ;
    }
    if ((flags & HEAD_CRC) != 0) {  /* skip the header crc */
        for (len = 0; len < 2; len++) (void)get_byte(s);
    }
    s->z_err = s->z_eof ? Z_DATA_ERROR : Z_OK;
}

 /* ===========================================================================
 * Cleanup then free the given gz_stream. Return a zlib error code.
   Try freeing in the reverse order of allocations.
 */
local int destroy (s)
    gz_stream *s;
{
    int err = Z_OK;

    if (!s) return Z_STREAM_ERROR;

    TRYFREE(s->msg);

    if (s->stream.state != NULL) {
        if (s->mode == 'w') {
            err = Z_STREAM_ERROR;
        } else if (s->mode == 'r') {
            err = inflateEnd(&(s->stream));
        }
    }
    if (s->file != NULL && fclose(s->file)) {
#ifdef ESPIPE
        if (errno != ESPIPE) /* fclose is broken for pipes in HP/UX */
#endif
            err = Z_ERRNO;
    }
    if (s->z_err < 0) err = s->z_err;

    TRYFREE(s->inbuf);
    TRYFREE(s->outbuf);
    TRYFREE(s->path);
    TRYFREE(s);
    return err;
}

/* ===========================================================================
     Reads the given number of uncompressed bytes from the compressed file.
   gzread returns the number of bytes actually read (0 for end of file).
*/
int ZEXPORT gzread (file, buf, len)
    gzFile file;
    voidp buf;
    unsigned len;
{
    gz_stream *s = (gz_stream*)file;
    Bytef *start = (Bytef*)buf; /* starting point for crc computation */
    Byte  *next_out; /* == stream.next_out but not forced far (for MSDOS) */

    if (s == NULL || s->mode != 'r') return Z_STREAM_ERROR;

    if (s->z_err == Z_DATA_ERROR || s->z_err == Z_ERRNO) return -1;
    if (s->z_err == Z_STREAM_END) return 0;  /* EOF */

    next_out = (Byte*)buf;
    s->stream.next_out = (Bytef*)buf;
    s->stream.avail_out = len;

    if (s->stream.avail_out && s->back != EOF) {
        *next_out++ = s->back;
        s->stream.next_out++;
        s->stream.avail_out--;
        s->back = EOF;
        s->out++;
        if (s->last) {
            s->z_err = Z_STREAM_END;
            return 1;
        }
    }

    while (s->stream.avail_out != 0) {

        if (s->transparent) {
            /* Copy first the lookahead bytes: */
            uInt n = s->stream.avail_in;
            if (n > s->stream.avail_out) n = s->stream.avail_out;
            if (n > 0) {
                zmemcpy(s->stream.next_out, s->stream.next_in, n);
                next_out += n;
                s->stream.next_out = next_out;
                s->stream.next_in   += n;
                s->stream.avail_out -= n;
                s->stream.avail_in  -= n;
            }
            if (s->stream.avail_out > 0) {
                s->stream.avail_out -= fread(next_out, 1, s->stream.avail_out,
                                             s->file);
            }
            len -= s->stream.avail_out;
            s->in  += len;
            s->out += len;
            if (len == 0) s->z_eof = 1;
            return (int)len;
        }
        if (s->stream.avail_in == 0 && !s->z_eof) {

            errno = 0;
            s->stream.avail_in = fread(s->inbuf, 1, Z_BUFSIZE, s->file);
            if (s->stream.avail_in == 0) {
                s->z_eof = 1;
                if (ferror(s->file)) {
                    s->z_err = Z_ERRNO;
                    break;
                }
                if (feof(s->file)) {        /* avoid error for empty file */
                    s->z_err = Z_STREAM_END;
                    break;
                }
            }
            s->stream.next_in = s->inbuf;
        }
        s->in += s->stream.avail_in;
        s->out += s->stream.avail_out;
        s->z_err = inflate(&(s->stream), Z_NO_FLUSH);
        s->in -= s->stream.avail_in;
        s->out -= s->stream.avail_out;

        if (s->z_err == Z_STREAM_END) {
            /* Check CRC and original size */
            s->crc = crc32(s->crc, start, (uInt)(s->stream.next_out - start));
            start = s->stream.next_out;

            if (getLong(s) != s->crc) {
                s->z_err = Z_DATA_ERROR;
            } else {
                (void)getLong(s);
                /* The uncompressed length returned by above getlong() may be
                 * different from s->out in case of concatenated .gz files.
                 * Check for such files:
                 */
                check_header(s);
                if (s->z_err == Z_OK) {
                    inflateReset(&(s->stream));
                    s->crc = crc32(0L, Z_NULL, 0);
                }
            }
        }
        if (s->z_err != Z_OK || s->z_eof) break;
    }
    s->crc = crc32(s->crc, start, (uInt)(s->stream.next_out - start));

    return (int)(len - s->stream.avail_out);
}


/* ===========================================================================
      Reads one byte from the compressed file. gzgetc returns this byte
   or -1 in case of end of file or error.
*/
int ZEXPORT gzgetc(file)
    gzFile file;
{
    unsigned char c;

    return gzread(file, &c, 1) == 1 ? c : -1;
}


/* ===========================================================================
      Push one byte back onto the stream.
*/
int ZEXPORT gzungetc(c, file)
    int c;
    gzFile file;
{
    gz_stream *s = (gz_stream*)file;

    if (s == NULL || s->mode != 'r' || c == EOF || s->back != EOF) return EOF;
    s->back = c;
    s->out--;
    s->last = (s->z_err == Z_STREAM_END);
    if (s->last) s->z_err = Z_OK;
    s->z_eof = 0;
    return c;
}


/* ===========================================================================
      Reads bytes from the compressed file until len-1 characters are
   read, or a newline character is read and transferred to buf, or an
   end-of-file condition is encountered.  The string is then terminated
   with a null character.
      gzgets returns buf, or Z_NULL in case of error.

      The current implementation is not optimized at all.
*/
char * ZEXPORT gzgets(file, buf, len)
    gzFile file;
    char *buf;
    int len;
{
    char *b = buf;
    if (buf == Z_NULL || len <= 0) return Z_NULL;

    while (--len > 0 && gzread(file, buf, 1) == 1 && *buf++ != '\n') ;
    *buf = '\0';
    return b == buf && len > 0 ? Z_NULL : b;
}


/* ===========================================================================
      Sets the starting position for the next gzread or gzwrite on the given
   compressed file. The offset represents a number of bytes in the
      gzseek returns the resulting offset location as measured in bytes from
   the beginning of the uncompressed stream, or -1 in case of error.
      SEEK_END is not implemented, returns error.
      In this version of the library, gzseek can be extremely slow.
*/
z_off_t ZEXPORT gzseek (file, offset, whence)
    gzFile file;
    z_off_t offset;
    int whence;
{
    gz_stream *s = (gz_stream*)file;

    if (s == NULL || whence == SEEK_END ||
        s->z_err == Z_ERRNO || s->z_err == Z_DATA_ERROR) {
        return -1L;
    }

    if (s->mode == 'w') {
        return -1L;
    }
    /* Rest of function is for reading only */

    /* compute absolute position */
    if (whence == SEEK_CUR) {
        offset += s->out;
    }
    if (offset < 0) return -1L;

    if (s->transparent) {
        /* map to fseek */
        s->back = EOF;
        s->stream.avail_in = 0;
        s->stream.next_in = s->inbuf;
        if (fseek(s->file, offset, SEEK_SET) < 0) return -1L;

        s->in = s->out = offset;
        return offset;
    }

    /* For a negative seek, rewind and use positive seek */
    if (offset >= s->out) {
        offset -= s->out;
    } else if (gzrewind(file) < 0) {
        return -1L;
    }
    /* offset is now the number of bytes to skip. */

    if (offset != 0 && s->outbuf == Z_NULL) {
        s->outbuf = (Byte*)ALLOC(Z_BUFSIZE);
        if (s->outbuf == Z_NULL) return -1L;
    }
    if (offset && s->back != EOF) {
        s->back = EOF;
        s->out++;
        offset--;
        if (s->last) s->z_err = Z_STREAM_END;
    }
    while (offset > 0)  {
        int size = Z_BUFSIZE;
        if (offset < Z_BUFSIZE) size = (int)offset;

        size = gzread(file, s->outbuf, (uInt)size);
        if (size <= 0) return -1L;
        offset -= size;
    }
    return s->out;
}

/* ===========================================================================
     Rewinds input file.
*/
int ZEXPORT gzrewind (file)
    gzFile file;
{
    gz_stream *s = (gz_stream*)file;

    if (s == NULL || s->mode != 'r') return -1;

    s->z_err = Z_OK;
    s->z_eof = 0;
    s->back = EOF;
    s->stream.avail_in = 0;
    s->stream.next_in = s->inbuf;
    s->crc = crc32(0L, Z_NULL, 0);
    if (!s->transparent) (void)inflateReset(&s->stream);
    s->in = 0;
    s->out = 0;
    return fseek(s->file, s->start, SEEK_SET);
}

/* ===========================================================================
     Returns the starting position for the next gzread or gzwrite on the
   given compressed file. This position represents a number of bytes in the
   uncompressed data stream.
*/
z_off_t ZEXPORT gztell (file)
    gzFile file;
{
    return gzseek(file, 0L, SEEK_CUR);
}

/* ===========================================================================
     Returns 1 when EOF has previously been detected reading the given
   input stream, otherwise zero.
*/
int ZEXPORT gzeof (file)
    gzFile file;
{
    gz_stream *s = (gz_stream*)file;

    /* With concatenated compressed files that can have embedded
     * crc trailers, z_eof is no longer the only/best indicator of EOF
     * on a gz_stream. Handle end-of-stream error explicitly here.
     */
    if (s == NULL || s->mode != 'r') return 0;
    if (s->z_eof) return 1;
    return s->z_err == Z_STREAM_END;
}

/* ===========================================================================
   Outputs a long in LSB order to the given file
*/
local void putLong (file, x)
    FILE *file;
    uLong x;
{
    int n;
    for (n = 0; n < 4; n++) {
        fputc((int)(x & 0xff), file);
        x >>= 8;
    }
}

/* ===========================================================================
   Reads a long in LSB order from the given gz_stream. Sets z_err in case
   of error.
*/
local uLong getLong (s)
    gz_stream *s;
{
    uLong x = (uLong)get_byte(s);
    int c;

    x += ((uLong)get_byte(s))<<8;
    x += ((uLong)get_byte(s))<<16;
    c = get_byte(s);
    if (c == EOF) s->z_err = Z_DATA_ERROR;
    x += ((uLong)c)<<24;
    return x;
}

/* ===========================================================================
     Flushes all pending output if necessary, closes the compressed file
   and deallocates all the (de)compression state.
*/
int ZEXPORT gzclose (file)
    gzFile file;
{
    gz_stream *s = (gz_stream*)file;

    if (s == NULL) return Z_STREAM_ERROR;

    if (s->mode == 'w') {
        return Z_STREAM_ERROR;
    }
    return destroy((gz_stream*)file);
}

#if 0
/* ===========================================================================
     Returns the error message for the last error which occured on the
   given compressed file. errnum is set to zlib error number. If an
   error occured in the file system and not in the compression library,
   errnum is set to Z_ERRNO and the application may consult errno
   to get the exact error code.
*/
const char * ZEXPORT gzerror (file, errnum)
    gzFile file;
    int *errnum;
{
    char *m;
    gz_stream *s = (gz_stream*)file;

    if (s == NULL) {
        *errnum = Z_STREAM_ERROR;
        return (const char*)ERR_MSG(Z_STREAM_ERROR);
    }
    *errnum = s->z_err;
    if (*errnum == Z_OK) return (const char*)"";

    m = (char*)(*errnum == Z_ERRNO ? zstrerror(errno) : s->stream.msg);

    if (m == NULL || *m == '\0') m = (char*)ERR_MSG(s->z_err);

    TRYFREE(s->msg);
    s->msg = (char*)ALLOC(strlen(s->path) + strlen(m) + 3);
    if (s->msg == Z_NULL) return (const char*)ERR_MSG(Z_MEM_ERROR);
    strcpy(s->msg, s->path);
    strcat(s->msg, ": ");
    strcat(s->msg, m);
    return (const char*)s->msg;
}
#endif
