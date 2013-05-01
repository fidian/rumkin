---
title: Onloads and Alternatives
template: page.jade
---
Let's just say that you have a script that you want to distribute or that could be loaded with other scripts and you really don't want them to conflict with each other.  If you need an `onload` event, things can get a bit weird.  You'll maybe wonder why your pull-down menus don't work and your background changing does work.  These snippets of code will help you out.

Overloading `window.onload`
===========================
In order to use this, you will need to slightly edit your JavaScript.  You'll likely add these lines at the bottom of your code.  Make sure to change the XXXX to something unique for your program.

    (function () {
        var old_onload = window.onload;
        
        function new_onload() {
            // Insert your code here to initialize your program
            // Then, this little bit calls the old onload function
    
            if (old_onload) {
               old_onload();
            }
        }
    
        window.onload = new_onload;
    }());


With the above code, you can ensure that your JavaScript will not interfere with another person's JavaScript, especially if yours is loaded after the other person's code.  If the other person's code is loaded after yours, and they don't use code like what is above, you can obviously alter their program to do your bidding and make sure it won't interfere with other things you have going for yourself.

As a general rule, you should never code JavaScript that sets `window.onload` unless you handle the scenario where `window.onload` was already set.  Also, using `window.onload` is now considered the *really old way*.


jQuery
======

jQuery has a great way to run code when you load the page.  Pass a function to `$` and it will be called when `window.onload` would fire.

    $(function () {
        // Insert your code here to initialize your program
    });


`window.setTimeout()`
=====================

Are you living in a world without jQuery?  You can also use `window.setTimeout` but be warned that your code might run before things are fully loaded.

    (function () {
        function startup() {
           // This is your startup function.
           // You'd do stuff in here.
        }
        
        // Set the startup function to run.
        window.setTimeout(startup, 100);
    }());


If you have external JavaScript files that you need to load before your
function runs, you just add a couple lines.

Polling
=======

You can periodically check to see if an element has been loaded in the dom.  Here's a method that uses `document.getElementById`.

    // Polling for an element with a specific ID
    (function () {
        var interval = window.setInterval(function () {
            if (!document.getElementById('someIdYouNeed')) {
                return;
            }
            window.clearInterval(interval);
            // Do your stuff here
        });
    }());

You can also see when a script has loaded by checking for a function to be defined.

    // Polling for the existence of a function
    (function () {
        var interval = window.setInterval(function () {
            if (!someNecessaryFunction) {
                return;
            }
            window.clearInterval(interval);
            // Do your stuff here
        });
    }());


How About A Library?
====================

This little bit of code will take over the `window.onload`, and then all you need to do is call `onloadAdd()` with your function to add more and more behaviors that should be executed when the page loads.

    (function () {
        var queue = [], oldOnload = window.onload;
                
        function runQueue() {
            var i;
            
            for (i = 0; i < queue.length; i += 1) {
                queue[i]();
            }
            
            if (oldOnload) {
               oldOnload();
            }
        }
    
        window.onload = runQueue;
        
        window.onloadAdd = function (callback) {
            queue.push(callback);
        };
    }());

With this, all you need to do is keep calling onloadAdd() and hundreds of things can run without them stepping on each other's toes.

Yet Another Way
===============

Sometimes the above code will not work for you or you prefer to use newer techniques to register your onload behavior.  The below code is what I came up with.  It uses the browser-specific extensions to automatically work with Firefox 2+, IE 7+, or fall back and work with the `window.onload` that most of the older versions and other browsers support.

Personally, I like the easier window.onload methods as detailed above.  They work splendidly for me, and I only put this up here because people asked nicely.  Keep in mind that newer frameworks like jQuery do something a lot more concise and suited for those newer browsers.

    // We use these variables to see if the onload code ran,
    // to possibly store the old window.onload function, and to see
    // if we have been set up.
    // Make sure to change the names in your script to something unique!
    var onload_ran = 0;
    var onload_old = null;
    var onload_init = 0;
    
    // Here is our onload function.  Note:  We can call it multiple times,
    // and that's why there is that 'if' statement right away
    function my_onload() {
        if (onload_ran) return;
        onload_ran = 1;
        
        // Do your other onload stuff here
        // ...
        // Now we may need to handle other onloads
        
        if (onload_old && onload_old != null) {
            onload_old();
        }
    }
    
    // This line is required for the code to work with IE
    document.write('&lt;script id="__init_script" defer="true" src="//[]"&gt;&lt;\/script&gt;');
    
    if (document.addEventListener) {
        // Mozilla
        document.addEventListener("DOMContentLoaded", my_onload, false);
        onload_init = 1;
    }
    if (! onload_init && document.getElementById) {
        // IE
        var deferScript = document.getElementById('__init_script');
        if (deferScript) {
            deferScript.onreadystatechange = function() {
            if (this.readyState == 'complete') {
                // Needed to add tiny delay for IE
            window.setTimeout('my_onload()', 100);
            this.onreadystatechange = '';
            }
        };
        
        // Check if the script has already been completed
        deferScript.onreadystatechange();
        
        // Clear reference to prevent IE memory leaks
        deferScript = null;
        
        onload_init = 1;
        }
    }
    if (! onload_init) {
        // Older and different browsers
        onload_old = window.onload;
        window.onload = my_onload;
        onload_init = 1;
    }
