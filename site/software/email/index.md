----
title: Email Validation Done Right
template: index.jade
js: is-valid-email.js valid-email.js
module: valid-email
----

I have a problem with most email validators on the web.  They let through things that are completely wrong.  They mark good email addresses as invalid.

Like a plethora of people before me, I have decided to write my own validators.  In fact, I decided to write more than one to make sure that they are right and to have an algorithm that will likely work with my language of choice at the moment.


Try It Yourself
===============

<div valid-email>

Enter an email: <input ng-model="email" type="text" size="60"/><br/>
<span ng-show="valid">VALID!</span><span ng-show="!valid">Invalid email address.</span>

</div>


See a mistake?  First, confirm with [the rules](rules/) and see where I have gone wrong, then email me!  Be forewarned: the rules can be a bit overwhelming.


Download
========

Here's the email validation rules as source code.  Licensing information
for each one is included at the top of the file.

* [JavaScript](is-valid-email.js) - What this page uses for the live form.
* [PHP with patterns](email-regexp.php.txt) - Uses PCRE functions to perform email matches.
* [PHP without patterns](email-test.php.txt) - Same thing, only without any regular expressions.
