---
title: DBF Tools
summary: Some utilities I whipped up to boil down a `.dbf` file by aggregating the records and another to concatenate multiple database files together.
---

At one point I dealt with `.dbf` files.  A lot of them.  In order to process them faster, I wrote a couple tools that others may enjoy.  They are GPL v3 and I don't support them any longer.


`dbfagg`
--------

**Download:** [dbfagg.zip](dbfagg.zip)

This program's mission in life is to aggregate data so you have fewer records to parse.  It can sum, produce an average, and do much more.  You pass it the input file (or it can read from standard input), the name of the script to use, and the result database file that should be created.

The magic is primarily in the script file.  You list the different fields in the result `.dbf` file, and only certain data types are allowed for some functions.  The script file is not case sensitive.  It also does not do a lot of checking of output field names, so make sure to not use the same name twice in your results.


### Available Functions

This list is a complete list of functions that you can use in your script file.  The function name is followed by what data types it works with (*C* means it works with character fields, *N* means the function works with numeric fields).  For more information, see the `scripts.txt` file in the archive.


#### `KEY` (C, N)

When any key field changes, one record is written to the results.  For best results, you will want your key fields grouped together in the database.  You must have at least one `KEY` in your script.  All of the other functions are optional.


#### `SUBKEY` (C, N)

This acts like another grouping, similar to key, but the groups are not written out to disk when a `SUBKEY` changes.  The information just keeps gathering until a `KEY` field changes.  Multiple `SUBKEYS` are allowed.


#### `MAX` (N)

Stores the largest value encountered for the group.  Numeric fields only.


#### `MIN` (N)

Stores the smallest value encountered for the group.  Numeric fields only.


#### `SUM` (N)

Stores the summed values for the group.  Numeric fields only.


#### `AVG` (N)

Stores the median value (summed values divided by the number of values).  This works only with numeric fields.


#### `MODE` (C, N)

Stores the value that was encountered the most times in the group.


#### `COUNT`

Returns the number of records that were grouped together as a new field in the resulting table.  Creates a N(9) field, so have no more than 999,999,999 records in a single group (but you can specify a different size if you like).


### About Aggregation

The aggregation process can rename and resize fields.  Each line in the script file should follow one of these formats:

    FUNC_NAME INPUT_FIELD
    FUNC_NAME INPUT_FIELD OUTPUT_FIELD
    FUNC_NAME INPUT_FIELD OUTPUT_FIELD OUTPUT_FIELD_LEN
    FUNC_NAME INPUT_FIELD OUTPUT_FIELD OUTPUT_FIELD_LEN OUTPUT_FIELD_PREC


#### `FUNC_NAME`

The name of the function, as detailed above.


#### `INPUT_FIELD`

The name of the field in the input table.


#### `OUTPUT_FIELD` (optional)

The name that the resulting field should be called in the output file.  If not specified, it defaults to `INPUT_FIELD`.


#### `OUTPUT_FIELD_LEN`

The size the field should be in the resulting table.  If you are summing values and you might need more digits, you should specify this value.

#### `OUTPUT_FIELD_PREC`

The new precision of the output field.  Useful for averaging and showing additional digits.  If you make `OUTPUT_FIELD_PREC` larger, you should probably make `OUTPUT_FIELD_LEN` longer as well.  Only use this with numeric fields.


`dbfcat`
--------

**Download:** [dbfcat.zip](dbfcat.zip)

I had to aggregate several databases.  They were so large that they were first broken into chunks, then aggregated.  The down side is that I didn't have a tool to combine them together for further aggregation.  That is, I didn't have a tool until I wrote `dbfcat`.

`dbfcat` will open and read several `.dbf` files and write out a single, combined `.dbf` file.  You can easily go beyond the 2 gb limit that lots of `.dbf` software has, so keep that in mind.

`dbfcat` is also linked against libz, letting you read directly from a gzipped `.dbf` file (`*.dbf.gz`), saving you disk space and actually speeding up the process.  It's faster because you are not waiting for the disk reads and potentially the network traffic in order to get the information.

The merged `.dbf` file is written to stdout, so you can pipe that into a file or into gzip to recompress it and save the file somewhere.


`dbfcut`
--------

**Download:** [dbfcut.zip](dbfcut.zip)

Split a large `.dbf` file into smaller portions.  This takes a file that is over 2 gigabytes (which is amazingly difficult for some software to open) and chunks it into files that are roughly 1 gigabyte in size.

`dbfcut` is also linked against libz, letting you read directly from a gzipped `.dbf` file (`*.dbf.gz`), saving you disk space and actually speeding up the process.  It's faster because you are not waiting for the disk reads and potentially the network traffic in order to get the information.

The output files are named `out0000.dbf`, `out0001.dbf`, etc.


`dbffix`
--------

**Download:** [dbffix.zip](dbffix.zip)

Corrects the file header to list the real amount of records in a file.  Useful if you need to recover a file and you have the beginning or most of a file but it stops abruptly.


`dbfstats`
----------

**Download:** [dbfstats.zip](dbfstats.zip)

Calculate a table of statistics that relate to the contents of a `.dbf` file.  You can use this to get a field-by-field summary of the contents of the data.  I used this a lot to determine date ranges and other groupings when I didn't know where a file originated.
