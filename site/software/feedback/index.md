----
title: Feedback Box
template: page.jade
----

I once wrote a live chat system that was featured at the bottom of the pages on my site.  It included bad word filtering and rate limiting.  The PHP source is available in [feedback.zip](feedback.zip).

Be warned - this includes the most recent copy of my scripts, which lists the words I am filtering (*avert thine eyes!*) and the rules that I previously employed.  It was designed to go with any theme system on your site, but the theming is not included.  Thus, if you see references to `$theme`, you now know why that's there.

There is a simple <tt>readme.txt</tt> file that discusses how to set it up.  Really, the documentation for this thing is quite sparse, but this tool is extremely simple as well and it doesn't need much.

* Server Requirements:  PHP 4.x (and probably newer versions), MySQL
* Browser Requirements:  None.  Works with Mozilla, Netscape, IE, Opera, Links, Lynx, and even the web browsers on cell phones.
