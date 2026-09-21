---
title: Favicon
summary: A shortcut icon or favicon is a little image that shows up in the address bar of your browser.  These instructions show how to set one.
---

A "favicon" is a type of icon used for shortcuts.  This little image is usually shown in the address bar when you are visiting a website and sometimes in bookmarks or favorites.  It is a good idea to always have a favicon defined so your web server isn't pummeled for hits for a nonexistent image.

Some browsers let you use `.gif` files or `.png`, but to be completely safe and have all browsers see your picture, you should use a `.ico` file.  The words "SHORTCUT ICON" are not case-sensitive (you are able to use lowercase if you want).  Also, you can use a relative address instead of a fully qualified URL.

Use just one of these, whichever one looks like what you want.

    <!-- Example #1 -->
    <link rel="SHORTCUT ICON" href="http://your.site.com/the_icon.ico">

    <!-- Example #2 -->
    <link rel="shortcut icon" href="/my_icon.ico">

If you do not define one, many browsers just automatically fetch `/favicon.ico` in the hopes that they will find one.
