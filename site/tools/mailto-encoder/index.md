---
title: Email Address (Mailto:) Encoder
js:
    - mailto-encoder-module.js
components:
    - className: moduleSimple
      component: MailtoEncoderSimple
    - className: moduleCustom
      component: MailtoEncoderCustom
---

Junk email (a.k.a. spam) is a part of everyone's life if they ever put their email address on the web. For HTML authors, site admins, and for people who want a little credit on the page that they put online, it is a constant problem. You want to include your email address on the page, but you don't want your email address to be harvested by spambots.

The best thing you can do is encode your email address so that browsers can see it and spambots can not. This is what this tool attempts to do. I have created two different versions of the address encoder. Please pick the one that is appropriate:

## Simple Email Encoder

<div class="moduleSimple"></div>

## Custom Email Encoder

Did you need a bit more control? This one is far fancier, but that means it is also more complex and could generate something invalid. Make sure to test the generated code.

Not all fields work well with all combinations of browsers and email clients. It is best if you only use the "To" field, but the others are available.

<div class="moduleCustom"></div>

## About The Encoder

These tools do not steal your email addresses. Nothing is sent back to my server, and everything runs in JavaScript in your browser. If you don't believe me, check out this [independent review](http://www.dslreports.com/forum/remark,7309390~root=spam~mode=flat) of a mirror the tools provided here.

Keep in mind that this is not the end-all. There are other solutions out there, such as:

-   Java applet that shows the address and lets you click on it, but will foil spambots because they don't have a Java interpreter.
-   CGI scripts to send you mail directly without ever giving your address out. Make sure you don't specify the target email address in the feedback form itself!
-   A form button that will pop up a JavaScript window.
-   Generic JavaScript that will decode your address and forward you to the proper `mailto:` link.
-   A public guestbook or forum.

Remember that creativity is the key when playing against spammers. They eventually adapt their techniques in order to make another $.05. That's why there is no single solution. If there is ever a single awesome way of doing this, then spammers will adapt their programs and we'll all need to find another method. So, if you like something you see, you may want to alter it just a bit so that spammers have a harder time reaping your email address.

If there is much demand, this program can be further enhanced to do the following neat ideas:

-   Work with imagemaps and links better (you can use it now with imagemaps -- see [these instructions](imagemaps/).
-   Make the JavaScript put up a link that, when clicked, will pop open a window and automatically roll-over to the right email address. This doesn't appear to have more security than the JavaScript code already in place.
-   Generate the code necessary for a form button that will take appropriate action when clicked. This also doesn't appear to be better and browsers can have difficulty showing or submitting the form.
-   Generate code for a Java applet or Flash to display your email address, but Java and Flash are on the way out.
-   Use some server-side software (like this [PHP code](example-php.txt)) to make any email addresses on your site encrypted.

## Links

-   [French version](http://www.pascalirma.org/masquage_email.php) - Thanks to Pascal for translating a previous version of this email address encoder!
-   [Email Encoder](http://www.metaprog.com/samples/encoder.htm) - A lot more on using links to call JavaScript functions that take your browser to the email link.
-   [Experiences with using JavaScript ...](http://www.webmasterworld.com/forum91/492.htm) - Lots of great information. Just don't use `window.navigate();` instead use `window.location.replace()`.
-   [CSS Methods](http://www.emailaddresses.com/forum/showthread.php?threadid=39170) - Alternate methods of hiding an email address, primarily using CSS. They don't make clickable links.
