---
title: FoxPro
template: index.jade
---

FoxPro is a wonderful database system that lets you get away with basically anything.  It can access external `DLL` files, can be compiled into (almost) standalone executables, has a simple and powerful language, and has a command window where fluent developers can get things done quickly.

I have a page that chock full of [libraries and packages](packages/), where the bigger chunks of code live.  On this page you will find a short index of trivial functions and links for additional resources.  To use the ones on this page, you would `set procedure to <FILENAME> additive`.

* Files

    * [delete-file.prg](delete-file.prg) - Deletes a file if it exists.  Returns 1 if the file was deleted.

    * [delete-table.prg](delete-table.prg) - Delete a table, index, memo.  Requires delete-file.prg.

    * [fox2x.prg](fox2x.prg) - Downgrade a Visual FoxPro table to fox2x / dBase III.  Do not use it on a database with memo fields.  This will corrupt any other type of file.

* Status

    * [say.prg](say.prg) - Write a message to the console and a logfile.

    * [progress.prg](progress.prg) - Start, stop and update a progress meter.  This limits screen updates to improve the speed of your program.

    * [hush.prg](hush.prg) - Manage `SET TALK ON` and `SET TALK OFF`.  Call `Hush()` to silence something (it detects if TALK is ON/OFF) and `Unhush()` when done.

* Strings

    * [random-string.prg](random-string.prg) - Generate a random string with the length and characters you desire.

    * [split.prg](split.prg) - Chop a string into an array.

    * [stod.prg](stod.prg) - The opposite of `dtos()`, because FoxPro didn't have one.

* Conversions

    * [upload-fox-to-sql.prg](upload-fox-to-sql.prg) - Creates a table and copies the data to SQL Server fia an ODBC connection.  It's slower than BCP but massages the data better.

    * [csv-to-dbf.pl](csv-to-dbf.pl) - Perl script to convert a CSV file to a DBF.

* Tables

    * [table-names.prg](table-names.prg) - Opens and closes a table by name.  Automatically will close other tables with the same name.

    * [build-cursor.prg](build-cursor.prg) - Lets you build a table from results.  When working with chunks of data, you can keep appending to an existing cursor with this method.

    * [list-indexes.prg](list-indexes.prg) - Get a list of indexes on a table.

    * [tag-exists.prg](tag-exists.prg) - Determine if a tag is set on a table.
    
    * [shrink-fields.prg](shrink-fields.prg) - Reduce the size of the database file by shrinking character fields to longest value.  Only works with character fields but could be extended to handle other types.

* Utilities

    * [dupe-field-find.prg](dupe-field-find.prg) - It causes problems when you name multiple fields with the same name.  This function helps you find your error.

    * [dump-form.prg](dump-form.prg) - Sample script that dumped a form to an HTML document for analysis.  Could be useful when decompiling or regenerating lost source code.

Seeking more?  There's a bit more on the [libraries and packages](packages/) page.


Links
=====

Where would I be if I did not list the useful sites out there that had FoxPro code available for public consumption?

* [Ed Leafe's Downloads](http://www.leafe.com/dls/vfp) - Many other forms, applications, and other FoxPro samples are available here.
* [FoxPro Wiki](http://fox.wikis.com/wc.dll?Wiki~FoxProWiki) - Most likely, someone before you had the same problem that you are facing.  This wiki houses some of the best information available for FoxPro.
