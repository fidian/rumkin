---
title: Escaping in PHP
---

I write a lot of PHP code and often have to generate strings for use inside other languages.  Instead of continually reinventing the wheel, here's a page that provides generic solutions.


PHP to HTML
-----------

This is built into the language.  You may see `htmlspecialchars()`, but it is now preferred to use `htmlentities()` to convert a string that is to be embedded in HTML.  Here's how one can use this when you mix HTML and PHP.

    <p>My name is
    <?php
        echo htmlentities($name);
    ?>
    </p>


PHP to URL
----------

The standard way is to use the built-in function `urlencode()`.  It works well.

    <a href="/redirect.php?site=<?php
        echo urlencode($url);
    ?">Go to the URL you wanted.</a>


PHP to JavaScript
-----------------

[php_to_js.php](php_to_js.php.txt) contains a function that will let you write out a string that is safe to embed into JavaScript.  It handles all sorts of escaping as well as worrying about splitting `<script>` tags.

To use this glorious function, you need to merely pass it a string and optionally use the `$SkipQuotes` parameter.  Here are a few examples of PHP writing some JavaScript inside of your HTML markup.  By default, this will add quotes surrounding the string.  If you plan on doing that yourself you can pass `true` as a second parameter.

    <script>
    var myJavaScriptString = <?php
        echo php_to_js($someString)
    ?>;
    var embeddingSomething = "Hello, <?php
        echo php_to_js($name)
    ?>! How are you?"
    </script>


PHP to JSON
-----------

JSON encoding is very similar to JavaScript.  It differs in only a few ways:

* We don't need to worry about `<script>` tags.
* Only double-quoted strings are allowed.
* Only properly escaped text is permitted.

The easy way to convert anything into JSON is with `json_encode()`, but that will fail you if you try to encode strings that are not UTF encoded.  For that reason, you should first detect if the string is in UTF-8.  If not, encode it and you now may may safely call `json_encode()` on the result.
