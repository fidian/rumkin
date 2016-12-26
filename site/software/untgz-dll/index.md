----
title: untgz dll
template: index.jade
----

I needed a DLL file that would decompress `.tar.gz` files.  I found the [UnTGZ](http://nsis.sourceforge.net/UnTGZ_plug-in) plug-in for [NSIS](http://nsis.sourceforge.net/) and it fit my needs perfectly ... well, perfectly except for the fact that it needed NSIS.

Luckily, they supplied the source code and I then modified it to remove all NSIS-related things.  I also removed some of the other code that reports errors, and slightly altered the exported functions.

All hail open source!

To run it, you just use the `untgz()` function.

    untgz(char *path_to_tgz_file, char *output_directory);


Download
========

* [untgz-dll.zip](untgz-dll.zip) - Source code for the DLL
* [untgz.dll](untgz.dll) - Just the DLL file, UPX compressed for the absolute minimum size.
