---
title: Passing Data To/From Popup Window
template: index.jade
---

The time may come when you want to open up some sort of popup window, pass data into it, and pass data out of it back to the window opener.  This task can be accomplished in three easy steps.

First, make a ghost form that will be used to pass data into the popup.

    <form name=ghost method=post target="the_target_window" action="/the/destination.php">
    <input type=hidden name="data" value="">
    </form>

Mix in a little JavaScript.

    function submit_form() {
        document.ghost.data.value = document.other_form.text_area.value;
        window.open('', 'the_target_window', 'attributes=go_here').focus();
        document.ghost.submit();<br>
    }

Now you can use `window.opener` to get back to the parent.  Set whatever data you want, like the JavaScript example I have below.  I used it when I pressed a "Save" style of button to send the reformatted text back to the original form.

    window.opener.document.other_form.text_area.value = "altered state";
    window.opener.focus();
    window.close();

