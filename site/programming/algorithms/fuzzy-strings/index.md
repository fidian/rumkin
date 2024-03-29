---
title: Fuzzy String Matching
summary: How to determine the degree of similarity for two different strings.  I cover Levenshtein's and Oliver's methods along with soundex.
---

Fuzzy matching and confidence levels is what this exercise is all about.  It is tough to match two strings and say that they are quite similar, but not exact.  There are a few ways you can achieve this goal.


Levenshtein Distance
--------------------

This calculates the minimum number of insertions, deletions, and substitutions necessary to convert one string into another.  A low distance between two strings means that the strings are more similar.  The best site I have found is [Levenshtein Distance, in Three Flavors](levenshtein/), which I mirrored locally because the original site went down.

I have modified their algorithm and created [C](levenshtein.c.txt), [FoxPro](levenshtein.prg.txt) and [JavaScript](levenshtein.js.txt) versions.  My methods do not use a huge matrix and instead merely use a one-dimensional array that's the same length as one of the strings.  They also keep the values in the array incremented by 1 so that the comparisons in the loop do not need to perform additional math.  The goal was to tweak the loop and try to keep math to a minimum in there.


Gestalt
-------

I stumbled across this algorithm in [PHP's](http://php.net/) documentation about the [similar_text()](http://php.net/manual/en/function.similar-text.php) function.  The best source for the algorithm that I found was in PHP's source code for the string functions.  Look for the `php_similar_str`, `php_similar_char`, and `PHP_FUNCTION(similar_text)` functions.

I have created [C](gestalt.c.txt) and [FoxPro](gestalt.prg.txt) versions of the code.  They are both recursive, so be careful with large strings on limited devices.  [Eduardo Curtolo](mailto:ecurtolo@gmail.com) provided a [Pascal](gestalt.pas.txt) version.  Someone (sorry, I don't have this information any longer) contributed a [Ruby](gestalt.rb.txt) implementation.


SoundEx
-------

This algorithm was once used on many U.S. driver's licenses.  Its goal is to group letters that sound alike, then convert the name into a series of numbers that can represent the name.  [Understanding Classic Soundex Algorithms](http://www.creativyst.com/Doc/Articles/SoundEx1/SoundEx1.htm) provides a very nice description of how SoundEx is used and generated.
