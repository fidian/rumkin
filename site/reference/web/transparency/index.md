---
title: Transparency
js: transparency.js
summary: How to fade elements in and out.  Complete with a live example and tips to avoid flickers in the browser.
----

Transparency works for NN6+, Firefox 0.9+, and Internet Explorer 5+.  It's awesome.  First off, you will need to use CSS with whatever you need to make transparent.  Here's the attributes you need to set.  80% opaque (mostly there) is defined nearly the same way for the different attributes.

    filter:alpha(opacity=80);
    -moz-opacity: .80;
    opacity: .80;
    zoom: 1;

The `zoom: 1;` line is there to force Internet Explorer to have a magical "hasLayout" property.  Just a workaround.

You can set an object's opacity with JavaScript as well.  However, if you want to use JavaScript to change the opacity in Internet Explorer, you still need to use CSS to set the alpha filter, otherwise it just won't work.  How stupid.  Also, there is a flicker in some browsers when an object changes from 99% opacity to 100% opacity.  Just don't use anything over 99%.  Yet another dorky workaround.

Take a look at [transparency.js](transparency.js) to see a function that sets the opacity of an element.  To use this function, just set the 'id' attribute in an HTML tag (image, form, table, div, etc.) and and pass the 'id' name along with the opacity (50 = half opaque, 99 = nearly completely opaue).


Examples
--------

Here is a textarea and a pulldown list.  To get the pulldown list to work, you need to specify the style for each option.  I set the style attribute in the option, but you could do this more appropriately with a class or style sheet instead.

<form>
    <p>20% opaque text area:<br>
        <textarea style="filter:alpha(opacity=20); -moz-opacity:0.2; opacity:0.2; zoom:1" rows=1 cols=30>This "textarea" is 20% opaque.</textarea>
    </p>
    <p>50% opaque drop-down list with different<br>
opacity settings for the options:<br>
        <select style="filter:alpha(opacity=50); -moz-opacity:0.5; opacity:0.5; zoom:1">
            <option>This list is 50% opaque.</option>
            <option style="filter:alpha(opacity=25); -moz-opacity:0.25; opacity:0.25; zoom:1">Option 2 - 25% opaque</option>
            <option style="filter:alpha(opacity=50); -moz-opacity:0.5; opacity:0.5; zoom:1">Option 3 - 50% opaque</option>
            <option style="filter:alpha(opacity=75); -moz-opacity:0.75; opacity:0.75; zoom:1">Option 4 - 75% opaque</option>
            <option>Option 5 - default opaqueness</option>
        </select>
    </p>
</form>

Moving your mouse over this image will make it fade away almost completely.  Moving your mouse away will let it come back again.

<form name=imgform action="#" method="get">
    <img name="testImage" src="world.gif" id='testImage' style="filter:alpha(opacity=99); -moz-opacity: 0.99; opacity:0.99; zoom:1" onmouseover="SetOpacityStep(11)" onmouseout="SetOpacityStep(99)">
    <br>
    Opacity:  <input type=text value="" name=imgopacity size=2>%
</form>

Links
-----

* [Faqts](http://www.faqts.com/knowledge_base/view.phtml/aid/7375/fid/122)
* [CSS Guide](http://www.macromedia.com/v1/documents/css2/css015.html)
