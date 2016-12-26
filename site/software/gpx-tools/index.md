---
title: GPX Tools for Geocaching
summary: Command-line utilities that will alter the GPX files retrieved from a geocaching pocket query.
---

This is a collection of free tools that will manipulate a GPX file that you can get from [Geocaching.com](http://www.geocaching.com) when you are a premium member.  You can create "Pocket Queries" and get a listing of caches all bundled into a GPX file.

With these tools you can change the names, descriptions, and symbols for the waypoints in a very flexibile manner.  It is similar to how [GPX Spinner](http://www.gpxspinner.com) and [GSAK](http://gsak.net) will alter waypoints before sending them to your GPS receiver.  You are also able to filter out waypoints to have a certain sizes, types, difficulty, and terrain.  Coupled with [GPSBabel](http://www.gpsbabel.org), you have a powerful system that can narrow waypoints geographically and send them to your GPS receiver as well.


`gpxinfo`
---------

`gpxinfo` lets you know some information about the waypoints contained in a GPX file.  You can find out the number of waypoints, the different difficulty levels, the number of caches with a specific container size, and more.

    gpxinfo gpx_file_in.gpx

It's pretty self-explanatory.  You can use "-" instead of "gpx_file_in.gpx` to read the GPX file from stdin.  If that sounds too geeky, that's ok.  In the end, you will get something like this:

    Waypoints:  439
    Available:  439
    Archived:  0
    ID Range:  662 - 95094
    Latitude Range:  43.500717 - 48.603901
    Longitude Range:  -96.623802 - -90.014969
    Difficulty Counts:
            1:  113
            1.5:  110
            2:  135
            2.5:  45
            3:  26
            3.5:  5
            4:  4
            4.5:  1
    Terrain Counts:
            1:  103
            1.5:  107
            2:  100
            2.5:  45
            3:  39
            3.5:  27
            4:  7
            4.5:  1
            5:  10
    Type Counts:
            Traditional Cache:  356
            Virtual Cache:  49
            Multi-cache:  19
            Unknown Cache:  13
            Letterbox Hybrid:  2
    Size Counts:
            Regular:  324
            Virtual:  44
            Micro:  22
            Small:  18
            Other:  16
            Not chosen:  12
            Large:  3

There really isn't much to say about this tool.  I wrote it to make sure that `gpxfilter` was really doing its job.


`gpxfilter`
-----------

Removes waypoints from a GPX file that do not meet your specific requirements.  It can be used to filter out caches based on difficulty, terrain, size, or cache type.

    gpxfilter gpx_in.gpx gpx_out.gpx [filter [filter [...]]]

    # Example
    gpxfilter my_query.gpx filtered_list.gpx -maxterr 2 -mindiff 3.5 \
        -size MSRL -type TU

You can use `-` instead of `gpx_in.gpx` and `gpx_out.gpx` to use stdin or stdout instead of an actual file.

Available filters:

* `-mindiff ###` - Sets the minimum difficulty level to keep.  Example to keep all caches with at least a difficulty of 1.5:  `-mindiff 1.5`
* `-maxdiff ###` - Sets the maximum difficulty level that should be kept.  Example to eliminate caches with a 4.5 or 5 difficulty:  `-maxdiff 4`
* `-minterr ###` - Sets the minimum allowable terrain value for geocaches.  Example to keep terrains that are over a 2:  `-minterr 3.5`
* `-maxterr ###` - Removes all caches with a terrain rating greater than the value specified.  Example to eliminate terrains over a 4: `-maxterr 4`
* `-size ....` - Sets what sizes are allowed.  If you do not specify a size code here, geocaches of that size *will not* make it through the filter.  Example to keep only physical caches with a listed size (micro through large): `-size MSRL`
    * `U` = Unknown
    * `M` = Micro
    * `S` = Small
    * `R` = Regular
    * `L` = Large
    * `V` = Virtual
    * `O` = Other
* `-type ....` - Keeps only geocaches with the listed container types.  Example to keep only traditionals, multi-caches, and webcams: `-type TMW`
    * `X` = Benchmark
    * `C` = Cache In Trash Out Event
    * `G` = Earthcache
    * `E` = Event Cache
    * `B` = Letterbox Hybrid
    * `L` = Locationless (Reverse) Cache
    * `E` = Mega-Event Cache
    * `M` = Multi-cache
    * `A` = Project APE Cache
    * `T` = Traditional Cache
    * `U` = Unknown Cache
    * `V` = Virtual Cache
    * `W` = Webcam Cache


`gpxrewrite`
------------

Rewrite a GPX file so that you change the name, description, and symbol tags for the caches.  This can provide more information at your fingertips by giving geocaches custom symbols for different sizes and add extra information to the name and description of your geocaches.

    gpxrewrite settings_file [gpx_in.gpx [gpx_out.gpx]]

    # Example
    gpxrewrite settings.ini my_query.gpx reformatted.gpx

`settings_file` - This is where all of the formats, symbols, and other settings are kept.  It is the only parameter that must be specified on the command line.

`gpx_in.gpx` - The source of the data, which must be in the GPX format that is returned from a Geocaching Pocket Query.  Unknown things can happen if you try to reformat a standard GPX file that is lacking the extra groundspeak attributes.  Unknown things are bad.  If you do not specify a file, you can instead pass one in with stdin.  (If you're not sure what that means, just specify the file on the command line.)

`gpx_out.gpx` - The rewritten GPX file will be either written out to the file name that you specify or to screen.  If you do specify a filename, it will write without prompting.  It will not even ask if you want to overwrite an existing file, so be careful.  If you do not specify a filename, you can redirect output as you so see fit.

The settings file controls every aspect of the rewrite.  In my examples, I have chosen to call it `settings.ini` but you can pick any name you prefer. Settings are specified in a `key=value` pair, one per line.  Keys are case insensitive, and the last one specified in the file is the one that is used.

* Prefixes for caches are typically single-letter codes assigned for each type of cache.  This is what's used for the `%C` format code.
    * `Benchmark_Prefix`
    * `CITO_Event_Prefix`
    * `Earthcache_Prefix`
    * `Event_Prefix`
    * `Letterbox_Hybrid_Prefix`
    * `Locationless_Prefix`
    * `Mega_Prefix`
    * `Multi_Prefix`
    * `Project_APE_Prefix`
    * `Traditional_Prefix`
    * `Unknown_Prefix`
    * `Virtual_Prefix`
    * `Webcam_Prefix`
* These format control how the name and description tags are rewritten in the GPX file.  If one is not specified, no change will be made for that one tag.  The name of the waypoint when you load it on your GPS is the `name` tag and that is changed with `Waypoint_Format`.  Likewise, the `Desc_Format` changes the `desc` tag, which is used for the waypoint description in your GPS.  The format layout supports the format codes as detailed below.
* `Waypoint_Max_Length` and `Desc_Max_Length` will set a maximum size for those two tags.  If not specified, the fields are not trunkated.  Every character counts, including spaces.  That means "ab cd" is 5 characters.
* `Waypoint_Allowed_Chars` and `Desc_Allowed_Chars` are used to filter out invalid characters.  If not specified, no characters will be excluded.  Lettters, numbers and some symbols (space and period) are always allowed.
* The yes/no character used for different cache states is able to be changed.  This is what's used when `%a`, `%b` and `%f` are used for format codes.
    * Active_No
    * Active_Yes
    * Bug_No
    * Bug_Yes
    * Found_No
    * Found_Yes
* Cache states are also able to be changed with `Found` and `Not_Found`.  If you want geocaches for a specific type to use different strings you may use `TYPE_Found` and `TYPE_Not_Found`.  Likewise, you can break up your codes by type and size: `TYPE_SIZE_Found` and `TYPE_SIZE_Not_Found`.
    * Types: `Benchmark`, `CITO_Event`, `Earthcache`, `Event`, `Letterbox`, `Locationless`, `Mega`, `Multi`, `Project_APE`, `Traditional`, `Unknown`, `Virtual`, `Webcam`.
    * Sizes: `Large`, `Micro`, `Other`, `Regular`, `Small`, `Unknown`, `Virtual`.
    * Rules are checked from most specific to least specific, so if you have a traditional micro cache that was not yet found, it will check for "Traditional_Micro_Not_Found", then "Traditional_Not_Found" and finally "Not_Found".  If none of those settings are in the settings file, the symbol will not change.


Formats for waypoint names and descriptions can use the following special codes.  When you use a % symbol as specified below, you will get it swapped out with a different value.  You can also specify a maximum width or that this field should be automatically resized to fit into the name or description field.  See the Format Examples for an explanation.

|     Code    |     Example    | Description                                                                                                           |
|:-----------:|:--------------:|-----------------------------------------------------------------------------------------------------------------------|
|     `%a`    |       `Y`      | Replaced with `Active_Yes` or `Active_No`. (Default: Y/N)                                                             |
|     `%b`    |       `Y`      | Replaced with `Bug_Yes` or `Bug_No`. (Default: Y/N)                                                                   |
|     `%C`    |       `T`      | Prefix for the cache from the `*_Prefix` settings.  `T` is the default for a traditional cache.                       |
|     `%D`    |      `2.5`     | The difficulty of the cache, 1 - 5 with decimals.                                                                     |
|     `%d`    |       `4`      | The difficulty of the cache converted to a single digit, 1 - 9.                                                       |
|     `%f`    |       `N`      | This is replaced by the Found_Yes or Found_No settings if specified, or Y/N otherwise.                                |
| `%H` / `%h` | `Under bench.` | The hint from the geocache.  Both the uppercase H and the lowercase h will work.                                      |
|     `%I`    |     `1234`     | The code after the "GC" in the waypoint ID.  If the waypoint doesn\'t start with GC, the entire code remains.         |
|     `%i`    |     `1234`     | The code after the first two characters in the waypoint ID.  Similar to `%I` but always removes first two characters. |
|     `%L`    |     `FFDFW`    | The first letters of the log types.  This is Found, Found, Didn't find, Found, Wrote note.                            |
|     `%N`    | `Termiteproof` | The name of the geocache.                                                                                             |
|     `%O`    |  `King Boreas` | The owner of the cache.                                                                                               |
|     `%P`    |   `KB & Crew`  | Who placed the cache.                                                                                                 |
|     `%p`    |      `GC`      | The first two characters of the waypoint code.                                                                        |
|     `%S`    |     `Small`    | The size of the container.                                                                                            |
|     `%s`    |       `S`      | The first letter of the size of the container.                                                                        |
|     `%T`    |       `3`      | The terrain rating of the geocache, 1 - 5 with decimals.                                                              |
|     `%t`    |       `5`      | The terrain rating of the cache as a single digit, 1 to 9                                                             |
|     `%Y`    |  `Micro Cache` | The cache type, spelled out.                                                                                          |
|     `%y`    |       `T`      | The prefix for the cache as determined by the *_Prefix settings.  T is the default for a traditional cache.           |
|     `%%`    |       `%`      | Adds a literal %.                                                                                                     |
| `%0` - `%9` |    `0` - `9`   | Adds a literal number.                                                                                                |

For the following examples, we will assume we are dealing with the following configuration settings and geocache.

    # Settings file.  Mostly this is using the defaults.
    Waypoint_Max_Length=10

    # A-Z, a-z, 0-9, period and space are
    # allowed automatically if
    # we specify this value
    Waypoint_Allowed_Chars=!@#$%^&*()

    Bug_Yes=B
    Bug_No=_

Geocache information:

    * Name: GCTEST
    * Desc: It's An Example - Test
    * Difficulty: 1.5
    * Terrain: 2
    * Logs: FFDFW
    * Type: Multi-cache
    * Size: Large
    * Travel Bugs: None

Below are a few examples so you can understand how things are working with the format layouts.

* No format
    * Name: `GCTEST`
    * Description: `It's An Example - Test`
    * Notes: If you do not specify a `Waypoint_Format` or `Desc_Format`, they will not be changed.  Also, since there is no format, the illegal characters will not be removed.

* `WAYPOINT_FORMAT=%I %b`<br />`Desc_Format=%N`
    * Name: `TEST _`
    * Description: `It's An Example - Test`
    * Notes: The name has had the "GC" from the waypoint ID removed, and then the `_` was added since there were no bugs in the cache.  The description is not changed because no `Desc_Allowed_Chars` was specified.

* `WAYPOINT_FORMAT=%N`<br />`Desc_Format=%a%C %d=%D %t=%T`
    * Name: `Its An Exa`
    * Description: `YT 2=1.5 3=2`
    * Notes: The apostrophe from the name is removed from the waypoint name because Waypoint_Allowed_Chars is set and does not contain the apostrophe as an allowed character.  It is also truncated to Waypoint_Max_Length characters (10).

* `WAYPOINT_FORMAT=%I %Y0 %s`<br />`Desc_Format=%L3 - %%L3 - %L%3`
    * Name: `TEST Tra S`
    * Description: `FFD - %%L3 - FFDFW3`
    * Notes: The waypoint name has `%Y0`, which means we should try to fit as much of the cache type into the allowed space, and will always display at least 1 character.  In this example, `TEST ` takes 5 characters (one for the space) and ` S` uses up 2 (a leading space).  The maximum length is 10, which leaves at most 3 letters for the cache type.  The description shows three similar formats with three very different results.  `%L3` means to show at most 3 letters from the cache logs.  The double `%%` means to show a literal `%`.  The last example shows how to put a literal number after another format code.

* `WAYPOINT_FORMAT=garbage in`<br />`Desc_Format=%G%A%R%B%A%G%E out`
    * Name: `garbage i`
    * Description: `%G%A%R%B%A%G%E out`
    * Notes: The name is truncated to 10 letters, and invalid codes are copied verbatim to the output.

This is a sample settings file that shows the default settings for all of the options.

    # Sample settings file showing default settings.

    # This is the default code that is used when you use the %C format code.
    Benchmark_Prefix=X
    CITO_Event_Prefix=C
    Earthcache_Prefix=G
    Event_Prefix=E
    Letterbox_Hybrid_Prefix=B
    Locationless_Prefix=L
    Mega_Prefix=E
    Multi_Prefix=M
    Project_APE_Prefix=A
    Traditional_Prefix=T
    Unknown_Prefix=U
    Virtual_Prefix=V
    Webcam_Prefix=W

    # My own personal waypoint name and description formats, lengths,
    # and allowed characters.  This is tweaked for my own personal preferences
    # and what is allowed by my Garmin GPSMAP 60CSx.  Change for your GPS and
    # alter to what you like to see.
    Waypoint_Format=%I %s%d%t
    Waypoint_Max_Length=14
    Waypoint_Allowed_Chars=+-

    Desc_Format=%C%b%L
    Desc_Max_Length=30
    Desc_Allowed_Chars=+-

    # I want to see a B or a - in my description instead of Y/N like Active and
    # Found
    Bug_Yes=B
    Bug_No=-

    # The defaults for Active and Found are fine
    Active_Yes=Y
    Active_No=N
    Found_Yes=Y
    Found_No=N

    # Default symbols
    Found=Geocache Found
    Not_Found=Geocache_Found


Links
-----

<?php

include '../../functions.inc';
StandardHeader(array(
		'title' => 'GPX Tools for Geocaching',
		'topic' => 'gpx_tools'
	));

?>

<p>Here are a list of resources that could be useful for geocaching and
that relate to the tools on this web site.</p>

* [GPSBabel](http://www.gpsbabel.org) - Convert to and from many different types of waypoint files, filter points by advanced filters, and even send your points to a GPS.  Freeware (open source) for Windows, Linux, OS X, others.

* [GPX Spinner](http://www.gpxspinner.com) - Writes out a GPX file as a set of HTML files or alters it like the `gpxrewrite` tool for loading into your GPS.  Shareware for Windows.

* [GSAK](http://gsak.net) - A very versatile tool that lets you filter, convert, and modify waypoints.  Shareware for Windows.

* [Working with Custom Waypoints](http://www.elsinga.net/208.html) - How to set up custom waypoints for Garmin GPS units.  The article is geared towards geocaching, and shows you how to use `ximage`, step by step.


Downloading
-----------

You're going to download the tools?  Awesome!  Let me know what you like
and what you do not like.  Below are the release download links, or you can clone the git repository on [GitHub](https://github.com/fidian/gpx_tools).

* Version 1.2 - December 2011.  Bugs were found thanks to helpful feedback. [Win32](gpx-tools-win32-1.2.zip), [Linux](gpx-tools-linux-static-1.2.tar.gz), [Source Code](gpx-tools-1.2.tar.gz)


Compiling
---------

These programs require the `expat` library, but then should compile cleanly by executing your traditional `./configure` followed by `make`.  Running `make install` copies the files to `/usr/local/bin` unless you define an alternate path with the configure command.

There is sometimes a slight hang-up with the `expat` library.  On one of my systems I have to include `expat.h` and the `expat` library (Debian).  On another, I have to include `xmlparse.h` and the `xmlparse` + `xmltok` libraries.  Since I have switched over to the automake system, I have not yet determined if this works well.  If it does not detect the expat library automatically, you should be able to use a configure option to specify where the library is located.


License
-------

The gpx_tools package is released under the GNU General Public License, as published by the Free Software Foundation; either version 3 of the License, or (at your option) any later version.  See the GNU GPL [Licenses Page](http://www.gnu.org/licenses/) for more information.

I have also relicensed this code under an [MIT License](../../license/).
