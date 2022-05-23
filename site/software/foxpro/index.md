---
title: FoxPro
summary: Useful things that I have written.  Maybe it could help you out too?
---

FoxPro is a wonderful database system that lets you get away with basically anything.  It can access external `DLL` files, can be compiled into (almost) standalone executables, has a simple and powerful language, and has a command window where fluent developers can get things done quickly.

I have a page that chock full of [libraries and packages](packages/), where the bigger chunks of code live.  On this page you will find a short index of trivial functions and links for additional resources.  To use the ones on this page, you would `set procedure to <FILENAME> additive`.

* Files
    * [delete-file.prg.txt](delete-file.prg.txt) - Deletes a file if it exists.  Returns 1 if the file was deleted.
    * [delete-table.prg.txt](delete-table.prg.txt) - Delete a table, index, memo.  Requires delete-file.prg.txt.
    * [fox2x.prg.txt](fox2x.prg.txt) - Downgrade a Visual FoxPro table to fox2x / dBase III.  Do not use it on a database with memo fields.  This will corrupt any other type of file.
* Status
    * [say.prg.txt](say.prg.txt) - Write a message to the console and a logfile.
    * [progress.prg.txt](progress.prg.txt) - Start, stop and update a progress meter.  This limits screen updates to improve the speed of your program.
    * [hush.prg.txt](hush.prg.txt) - Manage `SET TALK ON` and `SET TALK OFF`.  Call `Hush()` to silence something (it detects if TALK is ON/OFF) and `Unhush()` when done.
* Strings
    * [random-string.prg.txt](random-string.prg.txt) - Generate a random string with the length and characters you desire.
    * [split.prg.txt](split.prg.txt) - Chop a string into an array.
    * [stod.prg.txt](stod.prg.txt) - The opposite of `dtos()`, because FoxPro didn't have one.
* Conversions
    * [upload-fox-to-sql.prg.txt](upload-fox-to-sql.prg.txt) - Creates a table and copies the data to SQL Server fia an ODBC connection.  It's slower than BCP but massages the data better.
    * [csv-to-dbf.pl.txt](csv-to-dbf.pl.txt) - Perl script to convert a CSV file to a DBF.
* Tables
    * [table-names.prg.txt](table-names.prg.txt) - Opens and closes a table by name.  Automatically will close other tables with the same name.
    * [build-cursor.prg.txt](build-cursor.prg.txt) - Lets you build a table from results.  When working with chunks of data, you can keep appending to an existing cursor with this method.
    * [list-indexes.prg.txt](list-indexes.prg.txt) - Get a list of indexes on a table.
    * [tag-exists.prg.txt](tag-exists.prg.txt) - Determine if a tag is set on a table.
    * [shrink-fields.prg.txt](shrink-fields.prg.txt) - Reduce the size of the database file by shrinking character fields to longest value.  Only works with character fields but could be extended to handle other types.
* Utilities
    * [dupe-field-find.prg.txt](dupe-field-find.prg.txt) - It causes problems when you name multiple fields with the same name.  This function helps you find your error.
    * [dump-form.prg.txt](dump-form.prg.txt) - Sample script that dumped a form to an HTML document for analysis.  Could be useful when decompiling or regenerating lost source code.

Seeking more?  There's a bit more on the [libraries and packages](packages/) page.


Links
-----

Where would I be if I did not list the useful sites out there that had FoxPro code available for public consumption?

* [Ed Leafe's Downloads](http://www.leafe.com/dls/vfp) - Many other forms, applications, and other FoxPro samples are available here.
* [FoxPro Wiki](http://fox.wikis.com/wc.dll?Wiki~FoxProWiki) - Most likely, someone before you had the same problem that you are facing.  This wiki houses some of the best information available for FoxPro.
