---
title: Restoring Novell SDIF Encapsulated Files
summary: You can restore Novell backups to a non-Novell system, but the files appear to be corrupt when restored.
---

I used to work at a company where they ran a Novell network.  We needed to restore some data from a Novell tape backup.  This is an undocumented format, unfortunately, but I was able to work out enough information to get the files we needed.


Symptoms
--------

You backed up some files on a Novell server.  Your server died or was migrated away.  You now need to restore files off the Novell backup, but when you do, they appear corrupt.  If you were to use a hex editor, a good majority of them will have this file "magic header":

    Byte Ordered: 0E 02 A5 5A 0E 00
    Byte Swapped / Word Ordered:  02 0E 5A A5 00 0E


Causes
------

Backups from a Novell server will send the data to the tape SDIF encapsulated and often times already compressed using Novell's undocumented compression algorithm.


Solution
--------

The easiest way to get the data back is to find a Novell system or reinstall Novell yourself.  You'll be (theoretically) able to get back all of your data.  If that isn't possible, you could use my [SDIF tool](../../../software/sdif/) to extract the data stream from the SDIF encapsulated file.  However, this tool can not decompress any files that were compressed at the time of backup because Novell did not publish the compression format.

With luck, problem solved.


Shortcomings
------------

Novell's compression method is proprietary and is not disclosed.  Because of this, I don't know of any tool that can decode compressed data, and I am unable to write one.  If you get your hands on the algorithm, and if Novell doesn't mind, I would love to modify my [SDIF tool](../../../software/sdif/) to allow decompression of compressed files.
