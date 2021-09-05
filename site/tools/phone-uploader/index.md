---
title: Rumkin Phone Uploader
summary: Software that allows you to upload files to older phones.
----

This project allowed people to upload files to older cell phones, ones that are not Android, iPhone nor any other kind of "smart" cell phone. These phones didn't even have USB nor a wireless connection, so people had a heck of a time getting custom backgrounds.

The software was taken offline for many reasons. Lack of funding, lack of users, lack of interest, and a whole bunch of potential exposure to new risks that my insurance company didn't like.

Do you want to host this uploader yourself?  That's great!  I'm releasing the source code and you're welcome to get it running.

* [midlets](midlets.zip) - Simplified version that lets people host midlets (jar files) and download them to their phone. Does not require a database, but it also needs you to manually modify a file in order to see it listed and allow it to be downloaded. Requires PHP on the server. `debug.php` can test if things are mostly working correctly. `index.php` is what needs to get modified to start hosting your own files. Comes with `mgmaps` for two platforms and another program so you can see how this set of files work.
* [2015-07-10](20150710.zip) - Snapshot of the files right before I took the site down.  The database was removed and now the filesystem is used again, but in a much better way.
* [2005-10-19](20051019.zip) - Earlier snapshot.  Refined the database and the code.
* [2004-02-03](20040203.zip) - Even earlier.  Added a database.
* [Super Old](older.zip) - This one is so old that it didn't even use a database to store the files.
