---
title: Escaping Strings
template: index.jade
---

There is a lot of confusion out there about the proper way to escape strings in different languages for different purposes.  Escaping strings once is easy, but escaping them so they pass through a series of systems is tricky.  The difficult part is that using invalid syntax often works ... for a while.

If you would like to jump straight to the code, here's some stuff I have.  It is all organized by the executing programming language.

* [PHP](php.html)

The Discussion
--------------

Let's pretend we want to write a regular expression to remove all periods.  I'm using only a couple languages to better illustrate my point, and please don't mention that the JavaScript one doesn't really need a RegExp object.  Remember, this code is designed to show you a tricky part about escaping.

    // Version 1

    // PHP
    $result = preg_replace("/./", "", $input);

    // JavaScript
    var regexp = new RegExp(".");
    var result = input.replace(regexp, "");

There, done.  Oh wait, I forgot to escape the period in the string!  Regular expressions will match any character on a period, so we need to put a backslash before the period so the engine knows we want to match just periods.

    // Version 2

    // PHP
    $result = preg_replace("/\./", "", $input);

    // JavaScript
    var regexp = new RegExp("\.");
    var result = input.replace(regexp, "");

There, done.

Or am I?  When doing escaping in strings, the backslash character is often the indicator that the next character is treated differently.  For instance, `\n` translates to a newline character, `\t` becomes a tab character and `\\` means to put in a literal backslash character.  The real string that we want passed into the Regular Expression engine is literally, `\.` (a backslash and a period = an escaped period).  We need to take that string and then escape it again to embed it in our code properly.

    // Version 3

    // PHP
    $result = preg_replace("/\\./", "", $input);

    // JavaScript
    var regexp = new RegExp("\\.");
    var result = input.replace(regexp, "");

Finally our code is correct.  I've received several questions during my career about the multiple levels of escaping, so let's anticipate some questions and provide useful answers right away!

Why are we escaping the period twice?
=====================================

It's because the string goes through two levels of unescaping before being used - first it goes through PHP's string unescaping and then through the regular expression engine's string unescaping.

Why does Version 2 still work?
==============================

Great question, and I think this is the source of the confusion about string escaping.  Version 2 still works because `\.` doesn't unescape to anything.  Instead of choking and dying, the software will just let the two characters go through.  Better yet is this list of strings after they get unescaped.  Let's assume you used the following code

    // PHP
    echo "INPUT_STRING";
    
    // JavaScript
    console.log("INPUT_STRING");
    
When you pass in the following strings under the "Input" column, then the result will be the "Output" column.

    Input   Output
    \       \
    \\      \
    \"      "
    \\"     Won't Work
    \n      Newline
    \\n     \n

You'll see that using `\n` for the input gets you a newline and `\\n` indicates an escaped backslash followed by the `n` character.  The `\\"` input won't work because your code would look like this:

    // PHP
    echo "\\"";
    
    // JavaScript
    console.log("\\"");
    
The parser will see the first `"`, then the double backslashes that indicate an escaped backslash, the second `"`, and then freak out because of the third `"` on that line.

If Version 2 works, why worry about proper escaping?
====================================================

It is doubtful that the string processing engine of the different languages will change much in the future.  However, it could help you avoid problems, especially when you change your code.  Let's pretend you wanted to match a literal backslash and any character.  You'd want the pattern `\\.` and in both of the example languages it should be escaped as `"\\\\."` Yeah, four backslashes in the string = 2 backslashes sent to the regular expression engine = 1 literal backslash.  The string gets unescaped twice.  If you get your escaping messed up or don't know how many levels of unescaping will happen, you would get unexpected results.  If you only used the string `"\\."` in either language, it would match only periods, not a backslash followed by any character.

In PHP there are these single-quoted strings where you don't need to escape ...
===============================================================================

Sorry, that's wrong.  You must still escape there.  Try `echo '\\'` or `echo '\''` (that's two single-quotes, not a double quote at the end).  Without the escaping in single-quoted strings, you would not be able to embed an apostrophe.  Most of the other escape characters are disabled, so sequences like `\n` and `\t` will not produce a newline nor a tab.

In conclusion ...
=================

So, armed with this knowledge, I could ask you to escape the regular expression that looks for a backslash, a period, a double quote, and a slash.  You'd be able to produce the following:

    // Looking for these literal characters:  \."/
    // Escaped for a regular expression:  \\\."/ 

    // PHP - Escape backslashes, slash, double quote
    $result = preg_replace("/\\\\\\.\"\\//", "", $input);

    // JavaScript - Escape backslashes and double quote
    var regexp = new RegExp("\\\\\\.\"/");
    var result = input.replace(regexp, "");
