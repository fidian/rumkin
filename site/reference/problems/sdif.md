----
title: Corrupt Novell Restores
template: page.json
----

Symptoms
========

You backed up some files on a Novell server.  Your server died or was migrated away.  You now need to restore files off the Novell backup, but when you do, they are corrupt.  If you were to use a hex editor, a good majority of them will have this file "magic header":

    Byte Ordered: 0E 02 A5 5A 0E 00
    Byte Swapped / Word Ordered:  02 0E 5A A5 00 0E


Causes
======

Backups from a Novell server will send the data to the tape SDIF encapsulated, and often times pre-compressed.


Solution
========

The easiest way to get the data back is to find a Novell system or reinstall Novell yourself.  You'll be (theoretically) able to get back all of your data.  If that isn't possible, you could use my [SDIF tool](../../software/sdif/) to extract the data stream from the SDIF encapsulated file.  However, if the file was compressed by Novell, it won't be able to decompress it because Novell won't publish the comopression format.

With luck, problem solved.


Shortcomings
============

Novell's compression method is proprietary and is not disclosed.  Because of this, I don't know of any tool that can decode compressed data, and I am unable to write one.  If you get your hands on the algorithm, and if Novell doesn't mind, I would love to modify my [SDIF tool](../../software/sdif/) to allow decompression of compressed files.