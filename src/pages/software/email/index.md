---
layout: "@/layouts/software-layout.astro"
title: Email Validation Done Right
summary: JavaScript and PHP code that checks whether SMTP could deliver to an email address, following the current RFCs, internationalized addresses included.
breadcrumbs:
    - name: Rumkin.com
      href: /
    - name: Software Projects
      href: /software/
---

I have a problem with most email validators on the web.  They let through things that are completely wrong.  They mark good email addresses as invalid.

Like a plethora of people before me, I have decided to write my own validators.  In fact, I decided to write more than one to make sure that they are right and to have an algorithm that will likely work with my language of choice at the moment.

The rule they follow is easy to say:  an address is valid if SMTP could deliver mail to it.  RFC 5321 defines SMTP, and RFC 6531 extends it to internationalized addresses like `josé@example.com`, so between them they decide.  Anything looser is rejected, even when another RFC allows it, because no mail server would take it.  That includes the obsolete forms RFC 5322 still lets a message carry.  The validators check the address itself; they do not look up whether the domain actually accepts mail.


Try It Yourself
---------------

Enter an email below and it will validate the email address as you type.

<email-validator></email-validator>


See a mistake?  First, confirm with [the rules](rules/) and see where I have gone wrong, then email me!  Be forewarned: the rules can be a bit overwhelming.


Download
--------

Here are the email validation rules as source code.  Licensing information
for each one is included at the top of the file.

* [JavaScript](is-valid-email.js) - What this page uses for the live form.
* [PHP with patterns](email-regexp.php.txt) - Uses PCRE functions to perform email matches.
* [PHP without patterns](email-test.php.txt) - Same thing, only without any regular expressions.
* [Test cases](scenarios.json) - Every address the three are tested against, whether it is valid, and why.
