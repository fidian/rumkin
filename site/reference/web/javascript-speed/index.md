---
title: JavaScript Speed Enhancements
template: index.jade
---

Programmers should strive to make their code run fast when possible.
The exact same result in JavaScript can take vastly different amounts of
time when achieved by different means.


Dereferencing
=============

If you are looking at document.my_form.some_input_element.value often, it
will be best to store the value to a local variable.  A visitor to my site
pointed out that my code would be sped up by a factor of 10 if I used this
particular change.  He was absolutely right.

	// Avoid
	for (var i = 0; i < 100; i ++) {
		a = document.testform.testtext.value;
		b = document.testform.testtext.value.length;
		c = document.testform.testtext.value.substr(2, 1);
	}

	// Faster
	v = document.testform.testtext.value;
	for (var i = 0; i < 100; i ++) {
		a = v;
		b = v.length;
		c = v.substr(2, 1);
	}

Internet Explorer usually provided me with a 20-25x speed increase, but
sometimes it plummetted down to a mere 4 or 5x speed increase.  No matter
what, it is clear that it is far faster to use a local variable.


String Concatenation
====================

One other tip that I get a lot is that I should avoid lots of little
string concatenations.  I also read that string concatenations get worse
with the size of the string being concatenated.  Instead, the little
substrings should be placed into an array and then joined together to make
one big string in the end.

	// Normal concatenation
	a = '';
	b = 'abcdefghijklmnopqrstuvwxyz';
	b += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	for (var i = 0; i < 500; i ++) {
		a += b + b + b + b + b;
	}

	// Using an Array
	a = [];
	b = 'abcdefghijklmnopqrstuvwxyz';
	b += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	for (var i = 0; i < 500; i ++) {
		a.push(b);
		a.push(b);
		a.push(b);
		a.push(b);
		a.push(b);
	}
	a = a.join('');

Internet Explorer gets another huge boost with this one.  Other browsers run these both equally and Firefox actually may run it slower as an array.  Chrome is faster when you deal with strings directly.  The size of the strings matter greatly and longer strings typically make the speed boost worth something.


Additonal Resources
===================

* [Efficient JavaScript](http://dev.opera.com/articles/view/efficient-javascript/) - Tips from the developers of Opera on how to write good code.
* [JavaScript String Concatenation] - Shows how string concatenation is slow and the use of `Array.join()` can save you lots of time.
