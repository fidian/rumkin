Sprint File Uploader

Copyright (C) 2003-2005 - Tyler Akins
Licensed under the GNU GPL software license.
See the LEGAL file for legal information
See http://rumkin.com/tools/sprint/ for more information about these tools



INSTALLATION

Well, see the install.txt file.  Lots of information there.


DELETING OF OLD UPLOADS

This happens automatically as people view pages, upload files, or download
them to their phone.  Look in common.inc for CleanDatabase().  Right now, it
is configured to a 1 in 500 chance of the database being cleaned.  That
works great for my site, but may not work as well for yours.  You have
several options:

1)  Make 500 a smaller number.  I'd not suggest smaller than 20 or 50.

2)  Get more traffic.  I can send some your way if you like.  :-)

3)  Don't care.  Really, if you aren't getting that much traffic, you
shouldn't be uploading that much stuff, and then your database shouldn't be
getting that full.

4)  Open up browse.php in your favorite web browser.  Log in and it will
force a thorough cleaning with status messages showing up.  Neat little tool.


UPDATING PHONE INFO

I manually handle people with new phones when they come to my site.  Why
should you need to repeat my work?  So, I included the ability to have your
site update its phone information from mine.  First, a few rules:

1)  Don't hit my site every day.  Weekly updates should be good enough.
Heck, monthly updates are probably fine.  I don't update the database that
much.

2)  I would appreciate any corrections that you make to the database.

3)  If you use this information, I would *really* like it if you would drop
me a line telling me where you are using this information.

You see, it is a pain in the butt for me to update the information all of
the time.  If a pay site is using my information to better their lives,
that's ok, but I would like to know about it.  The data is not under the
GPL, so I have no actual obligation to distribute it.  If need be, I will
make the data transfer require a password or something.  That's a bit harsh;
I know.  However, a simple email telling me that you are charging people $50
per upload would make me smile.

Ok, enough of that.

If you open up upload.php in your web browser, the phone information will be
automatically updated from my server.  It is possible to set up an automatic
job to do this for you, but you are on your own if you go that route.


POTENTIAL PROBLEMS

If you have safe mode enabled, you likely won't be able to do one or more of
the following things:

* Create temporary files -- this affects the automatic resizing of images.
It is on my "TODO" list to use imagecreatefromstring() if possible, but the
script will still fall back on creating temporary files if needed.

* Run command-line programs -- impacts uploading .jar files and gif image
resizing.  When a .jar is uploaded, the .jad is created from the META-INF
file, which is obtained by running 'unzip' on the .jar.  Search upload.inc
for 'unzip' to see where it happens.  Loading gif images is not supported by
some versions of gd.  If you can't run command-line programs, you will not
be able to upload .jar files and resize .gif files.  If you don't have
unzip.exe in your path, copy the one from the utils directory into your
c:\windows\system or c:\windows directory.

Also, if you run PHP on a host other than Linux, you might have the
following issues:

* PATH_INFO -- For some reason, IIS+PHP/Apache+PHP has a hard time setting
PATH_INFO, so you will not be able to download anything unless this works.
No information yet about how to make it work.

* Command-line programs -- I use 'unzip' to extract the meta information in
.jar files to generate a .jad file.  I also use a couple commands to resize
gif images to make thumbnails and make the image fit on a phone.  You'll
likely experience problems there.  I have a compatible unzip program in the
utils directory.  Copy it into your path (you can try c:\windows\system or
c:\windows) and it should work.