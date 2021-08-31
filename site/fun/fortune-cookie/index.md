---
title: Fortune Cookie
js:
    - ../../js/mithril/random-line-module.js
css:
    - style.css
components:
    -
        className: module
        component: RandomLine
    -
        className: control
        component: RandomLineController
summary: Did you just eat a meal and now you need a fortune?  I collect mine and randomly give them back out to website visitors.
---

I collect fortune cookie sayings whenever I find them.  Here's one that has been picked just for you.

<div class="fortuneCookie"><span contenteditable="true" class="module" text-file="fortunes.txt"></span></div>

<div class="control Ta(c)" label="Get another random fortune"></div>

If you would prefer, you are allowed to just change the fortune cookie yourself.  It's editable.  Click on the fortune cookie and start typing!
