---
title: Java Puzzle Applet
---

Did you ever want to play a puzzle on your web page, or put one on to entertain others? This applet is probably just what you want. It was inspired by a CGI script which essentially did the same thing, but not nearly as fast (especially on a 14.4 modem). Right now, people who play the puzzle only have to download the applet (only about 14k), download the image, and download any optional sound to play when you solve the puzzle.

If you think these two puzzles don't work, please try to make sure that you have Java enabled in your browser. This puzzle relies upon it.


Examples
--------

Just for your amusement, you can test out the applet here. This is proof that Mickey frightens young children! Keep him away, that mean, evil villain!  This example has no sound, and uses the swap style of puzzle. The *website* parameter is also set on this example to `Rumkin Puzzle <email@example.com>` in order to demonstrate how that will appear.

To play, just find two squares you want to swap. Click on one. It will receive a red highlight. Click on the other and the two pieces shall be swapped. Continue to swap until you solve the puzzle.

<applet code="puzzle.class" width="512" height="405" class="center">
    <param name="numx" value="6">
    <param name="website" value="rumkin puzzle <email@example.com>">
    <param name="numy" value="4">
    <param name="src" value="example-swap/mickey.jpg">
    <param name="prefixurl" value="moves=">
    <param name="url" value="example-swap/">
    Sorry, your browser doesn't support Java, or has disabled it.
</applet>


And here is a scrambled picture of the Tyler's wife, Sarah. It is her high school senior picture.  This puzzle has sound if you properly solve it, and it uses the slide type of puzzle and a different status bar and the bold, red X's for the Reveal button.

The slide type of puzzle is also known as a 15-puzzle, where there's a 4x4 grid of numbers and one tile is missing (thus the numbers 1-15 are shown).  You need to slide the tiles around in order to get them in order.  In my version, you fix the puzzle by sliding the tiles.

<applet code="puzzle.class" width="208" height="353" class="center">
    <param name="numx" value="3">
    <param name="numy" value="4">
    <param name="src" value="example-slide/sarah.jpg">
    <param name="soundsrc" value="example-slide/puzzle.au">
    <param name="type" value="1">
    <param name="prefixurl" value="moves=">
    <param name="bar" value="0471">
    <param name="xstyle" value="1">
    <param name="url" value="example-slide/">
    Yes, you still need Java here too.
</applet>


Usage
-----

To begin, you will need to download [puzzle-full.zip] and have the `puzzle.class` file located on a web server.  To include the applet in your web page, you must include some special tags.  Several are optional and others are difficult to explain but should be simple to use once understood.

    <applet code="puzzle.class" width="___" height="___">
        <param name=num value="___">
        <param name=numx value="___">
        <param name=numy value="___">
        <param name=src value="___">
        <param name=soundsrc value="___">
        <param name=type value="___">
        <param name=url value="___">
        <param name=prefixurl value="___">
        <param name=postfixurl value="___">
        <param name=xstyle value="___">
        <param name=bar value="___">
        <param name=resize value="___">
        <param name=website value="___">
        Sorry, your browser doesn't support Java, or has disabled it.
    </applet>


### Explanation of Attributes and Parameters

If there is any issue or configuration problem, the applet will generate an error code (explained later).  **All error codes are shown on the Java Console** along with some debugging information.


#### code

This is the relative URL where the `puzzle.class` file is placed.  The file `puzzle.class` must not be renamed. It's a weird Java thing.


#### num, numx, numy

These refer to the number of pieces in the puzzle.  numx is the amount across (horizontally) and numy is the amount up and down (vertically).  num is the total number of pieces.

Only two of these can specified. I'd suggest numx and numy.  If all three are specified, and numx times numy doesn't equal num, an error will be generated and the puzzle won't work.  If two are specified, and num is one of them, and if num isn't evenly divisible by numx or numy (whichever one was specified), an error will be generate and the puzzle won't work.


#### width, height

The width and height of the applet in pixels, respectively.

It is recommended, for less image distortion, to multiply the image's width and height by some number to make the applet's width and height.  If you have the bar on the applet (enabled by default), add 20 to the height to avoid distortion of the image.


#### src

Relative URL of the image to load. This must be on the same site as the `puzzle.class` file. It's a weird Java thing.


#### soundsrc

Relative URL of a sound file (in `.au` format) to play when the puzzle has been completed. If not specified, no sound will be played. Must be on the same site as `puzzle.class`.


#### type

Type of puzzle. If not specified, it defaults to 0.

* 0 = Swap
* 1 = Slide type, with the 'empty' square starting in a random position
* 2 = Slide type, with the 'empty' square starting in the lower right-hand corner


#### url, prefixurl, postfixurl

Relative URL of the web page to display when the puzzle has been completed. Convenient if you want to allow the user to be able to download the whole picture or if you want to do something special with the number of moves it took.

If url is specified, the page will be shown (and some extra information will be appended to the URL). If not, no page will be shown.

The URL that is generated looks like this: `url?prefixurlMOVESpostfixurl`. You can safely omit prefixurl and postfixurl if you so desire. MOVES will be replaced with an integer, being the number of moves it took to solve the puzzle.

For simple entry to a CGI script, an example would have url set to "my_results.cgi", prefixurl set to "moves=", and postfixurl left unset. If I solved the puzzle in 12 moves, the resulting URL generated would be "my_results.cgi?moves=12".

The sample CGI script in [puzzle-full.zip] should give a bit more detail.  Also, there's scripts in there that will deter cheating, or at least make it a bit more difficult to do.


#### xstyle

When someone presses the Reveal button, this will determine how the incorrect pieces get marked. If not specified, the default is 0.

* 0 = Thin blue lines making an X over the incorrect pieces
* 1 = Big, bold, red X over the incorrect pieces


#### bar

This tells the applet where to draw select portions of the bar. By default, it is set to 1357. If you set it to 0, you will not have a bar displayed on top of the puzzle. Whether or not you have this bar affects the height setting.

The first number is the position of the "Moves" field, then comes the number correct, the Reveal button and lastly the Mix button. Each field uses the following numbers for placement. They can easily overlap or cover each other, so be careful when deciding where things go.

* 0 = Not displayed
* 1 = Left aligned
* 2 = Centered 1/4 from left side
* 3 = Centered 1/3 from left side
* 4 = Centered in middle
* 5 = Centered 1/3 from right side
* 6 = Centered 1/4 from right side
* 7 = Right aligned

#### resize

If the image specified doesn't fit into the applet's displayable area (the width and height - the size of the status bar, if any), then the image is resized to fit. This will mess up the proportions of the image, so make sure that you specify the width and height of the applet properly! If not specified, this defaults to 0.

Since resizing is based on the implementation of Java (I have no control over it), and all I get are these silly names for how resizing is done, that's all I can provide to you. If you use this option, test out the different resize methods until you find one that you like.

* 0 = Do not resize (whew!)
* 1 = Use the 'default' resize method
* 2 = Use the 'fast' resize method
* 3 = Use the 'smooth' resize method
* 4 = Use the 'area averaging' resize method


#### website

Due to the number of messages I have received over the years pertaining to a messed up puzzle installation on a web site, I have realized that adding a contact at the web site to my puzzle display would be a good idea. If you set this, the entire value will be displayed on the puzzle screen while it is loading and if there is an error.

Since this message comes after a line saying "Direct comments about this website to:", I would suggest you put `Your Name <your email address>` as the value of this applet parameter.


Errors
------

Make sure you are at the Java Console in order to view these messages.  If you aren't there, you can't debug why the software is messing up.


### Number of pieces not correctly specified

You didn't specify only two of the three values needed for number of pieces (num>, numx, numy).


### Total pieces != pieces across * pieces down

You must follow the format num = numx * numy. All must be integers (whole numbers) and num either must not be specified, or must be divisible evenly by the numx or the numy that you specified.


### Image filename not defined

You must specify the src parameter.

### Interrupted

Something interrupted the applet. I don't know what it could be, otherwise I would have used a better error message.


Known Bugs
----------

I hate to say this, but there are known bugs. However, I can't do anything more about them, so I consider them resolved.

* It trims off at most (total pieces across - 1) pixels from the right side and (total pieces down - 1) pixels from the bottom so the picture will work well for chopping into little pieces. Hope you don't mind. The only way to fix this is to scale the image, so that when it cuts the pieces into equal widths, there are no extra pixels laying around. Fortunately, you can scale either before you use it in the applet, or have the applet scale for you.

* The puzzle may sometimes display blank pieces where there should be puzzle pieces. This is a really strange error, and I don't think it is my fault. Now, the mix button clears the screen before mixing the pieces, to hopefully get the pieces to show. This may be caused by a low memory problem...  Not sure.

* If you choose to resize the image in the applet, the applet will think that the image is all done being resized and try to draw the pieces on the screen. This looks quite weird until the image is done being drawn. There's really nothing I can do. I suggest using the fast scaling method or only sending the applet to people with really fast computers.


Stopping Cheating
-----------------

So, you want to have a "high score list", but people figure out that the
number of moves is immediately after the `?` in the URL. Well, there were a lot
of suggestions that were given to me, and here is a list of the various things
that can be done to stop those annoying cheaters.

* Use POST instead of GET, that way the user doesn't see the number that is submitted to the CGI. Thanks to Tom Scheper, I was directed to a site that [explains everything](http://www.javaworld.com/javaworld/javatips/jw-javatip34.html) about how to add it to your Java program.  I won't be adding it, but if someone does, I would certainly accept changes.

* Use a simple formula to get a different number, like [moves] * 15 + 23, but then people would figure that out too (I tested this theory in 1998).

* Have the puzzle page generated by a script, and include a unique key that will get returned with the number of moves. Add the key to a file. When the solution page is loaded, check if the key is in the file. If so, delete the key and keep the number of moves. If not, the person is trying the puzzle again and could be trying to modify their number of moves (or they maybe just hit "back" and tried it again).

* As an extension of the previous idea, have the key be all numbers and a somewhat random length. Add another key to the very end, so the query might look like `solution.cgi?moves=174512439872146272651493482629420862`, with the number of moves hidden inside.  You do this by setting prefixurl and postfixurl to large random numbers.  You could possibly implement this without the file of keys, but then it is feasible that people would bypass the meager amount of security. I have sample scripts in the full package of the puzzle.

* You can get an HTML encoder, which would really make people think twice. This is trivially implemented with the above solution, but I didn't do it so you could still read the HTML. With the HTML encoded, it takes a newer browser to decode it, but it is quite secure.

* You can alter the source of the applet to do the actions you specify,


Download
--------

This puzzle (without modifications) is freeware. I will not charge for this version, and I will not charge for future versions. With any version of the puzzle I write, it is free to be used by anyone. I do not require a link from your puzzle page. You can generate money using the puzzle and you are not obliged to pay me. I accept donations, if you feel the need to pay someone.  You do not need my permission to use this program -- I have already given it.

I have abandoned this software.  I don't maintain it but I will accept patches if you want to implement something.

Java source to the puzzle is [available][puzzle-full] under a GPL license. This applet should be simple enough for people who know Java to program, or for semi-talented beginners to start with.

The current version is **Version 4.4 - 2001-02-28**:

* [puzzle-full.zip][puzzle-full] - The full puzzle package with the documentation and examples
* [puzzle.class](puzzle.class) - Just the one class file


History
-------


### 4.4 (current release)

* Finally released the source to the program.
* Added xstyle, bar, website, and resize parameters.
* Even cleaned some code to try to make it more efficient.
* Added about 4k to the size, unfortunately.
* Updated web page and email addresses to my new home.
* Changed name to 'puzzle.class' instead of 'Puzzle.class'


### 4.3

* Fixed the email addresses.
* Fixed web page URL.


### 4.2

* Took the feature added in version 4.1 and made a separate button for it.


### 4.1

* When you click on "Correct", you toggle the ShowX mode on and off for helping you to determine which pieces are out of place.


### 4.0

* Uses "implements runnable".
* Fixed annoying update bug finally!
* Attempts to resize applet to size of picture


### 3.8

* Netscape doesn't work with this.
* My applet tester from Sun does work.


### 3.7

* Redownloads image if it is messed up.
* Better memory management.
* Mixing routine sped up a little.


### 3.6

* The "Mix" button now paints the applet black before drawing the pieces on the screen.


### 3.5

* Rewrote the mixing routine for sliding type puzzles so that they are always able to be solved.
* Fixed a bug with "null" showing up in the url for the second page.


### 3.4

* Added the prefixurl and postfixurl parameters.
* Correctly made url be a relative URL, which means that you can not put "http://server.name.com/path" in url, but you can still put in "/path/to/page.html".


### 3.3

* There was a problem with the sound file downloading and playing when there was no sound file specified.


### 3.2

* Optimized one routine
* Hopefully eliminated a delay bug when the puzzle was finished.


### 3.1

* Made the Mix button green with blue background
* Now, when you have lots of pieces and you swap two pieces (or slide one), only the two pieces which changed are updated instead of the entire puzzle.
* Added warning if the image is too big for the applet.


### 3.0

* I finally killed a pesky bug where the image cropping was hanging the system.
* Made the Mix button blue.
* I think I solved a problem with the URL loading incorrectly.
* Did a lot of small internal changes.
* Added a second swap puzzle type.
* Display a lot more information to the status bar (the thing at the bottom of the screen) and to the Java Console.


### 2.4

* Restructured some code to hopefully get rid of a problem (I failed)
* Squished another minor bug.
* Now, if you go "back" after the puzzle moved you to a new URL, the puzzle won't move you again.


### 2.3

* Fixed a bug where you click before it is loaded and it crashes.
* Sped up graphic displays a little.
* Sped up cropping a little.
* Uses less memory.
* Faster routines.
* Added a status display to the status bar (the bottom thing)
* Now counts the columns it has to count instead of each individual picture.


### 2.2

* Sped up cropping of images.
* Now uses much less memory when chopping pieces.
* Taken out a couple of minor bugs.


### 2.1

* Allow usage of another type of puzzle -- the slide puzzle!


### 2.0

* Only uses one image file.
* Specify where image is.
* Specify where sound is.
* Display is much faster (no flickering anymore).


### 1.0

* Doesn't display images until all pieces are loaded.
* Display is faster.
* Does not load sound until images have been loaded.


[puzzle-full]: puzzle-full.zip
