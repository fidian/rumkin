title: Base Converter
template: page.jade
js: /js/jquery.watchdog.js base-n.js

Sometimes, one needs to convert a base-10 number into hexadecimal, binary, octal, or another number system.  It gets annoying when you need to convert a base-6 number into a base-20 number for whatever reason you have.  This will make things easy for you.

Input base: <select class="watch" name="inbase"></select><br>
Input number: <input class="watch" type="text" name="src"><br>
Output base: <select class="watch" name="outbase"></select>

<div class="output outline"></div>
