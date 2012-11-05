<?php

include '../../functions.inc';
StandardHeader(array(
		'title' => 'Transparency',
		'topic' => 'web',
		'callback' => 'InsertJS'
	));

?>

<p>Transparency works for NN6+, Firefox 0.9+, and Internet Explorer 5+.
It's awesome.  First off, you will need to use CSS with whatever you need to
make transparent.  Here's the attributes you need to set.  80% opaque
(mostly there) is defined nearly the same way for the different attributes.</p>

<?php MakeBoxTop('center'); ?>
<pre>filter:alpha(opacity=80);
-moz-opacity: .80;
opacity: .80;
</pre>
<?php MakeBoxBottom(); ?>

<p>You can set an object's opacity with JavaScript as well.  However, if you
want to use JavaScript to change the opacity in Internet Explorer, you still
need to use CSS to set the alpha filter, otherwise it just won't work.  How
stupid.  Also, there is a flicker in some browsers when an object changes
from 99% opacity to 100% opacity.  Just don't use anything over 99%.  Yet
another dorky workaround.</p>

<p>To use this function, just set the 'id' attribute in an HTML tag (image,
form, table, div, etc.) and and pass the 'id' name along with the opacity
(50 = &frac12; opaque, 99 = nearly completely opaue).</p>

<?php MakeBoxTop('center') ?>
<pre><?php ShowSetOpacityFunction() ?>
</pre>
<?php MakeBoxBottom(); ?>

<?php Section('Examples'); ?>

<p>Here is a textarea and a pulldown list.  To get the pulldown list to work,
you need to specify the style for each option.  I set the style attribute in
the option, but you could do this more appropriately with a class or style
sheet instead.</p>

<?php MakeBoxTop('center'); ?>
<form>
<p>20% opaque text area:<br>
<textarea style="filter:alpha(opacity=20); -moz-opacity:0.2; opacity:0.2"
rows=1 cols=30>This "textarea" is 20% opaque.</textarea>
</p>
<p>50% opaque drop-down list with different<br>
opacity settings for the options:<br>
<select style="filter:alpha(opacity=50); -moz-opacity:0.5; opacity:0.5;">
<option>This list is 50% opaque.
<option style="filter:alpha(opacity=25); -moz-opacity:0.25;
opacity:0.25;">Option 2 - 25% opaque
<option style="filter:alpha(opacity=50); -moz-opacity:0.5;
opacity:0.5;">Option 3 - 50% opaque
<option style="filter:alpha(opacity=75); -moz-opacity:0.75;
opacity:0.75;">Option 4 - 75% opaque
<option>Option 5 - default opaqueness
</select>
</p>
</form>
<?php MakeBoxBottom(); ?>

<p>Moving your mouse over this image will make it fade away (almost
completely) and moving your mouse away will let it come back again.</p>

<form name=imgform action="#" method="get">
<img name="testImage" src="world.gif" id='testImage'
 style="filter:alpha(opacity=99); -moz-opacity: 0.99; opacity=0.99"
 onmouseover="SetOpacityStep(11)" onmouseout="SetOpacityStep(99)">
<br>
Opacity:  <input type=text value="" name=imgopacity size=2>%
</form>

<?php Section('Links'); ?>

<ul>
<li><a href="http://www.faqts.com/knowledge_base/view.phtml/aid/7375/fid/122">Faqts</a>
<li><a href="http://www.macromedia.com/v1/documents/css2/css015.html">CSS guide</a>
</ul>


<?php

StandardFooter();


function InsertJS() {
	
	?>
<SCRIPT language="javascript">
var CurrentOpacity = 99;
function SetOpacityStep(target)
{
   if (window.ImageFade)
   {
      clearTimeout(ImageFade);
   }
   
   if (CurrentOpacity == target)
   {
      return;
   }
   
   if (CurrentOpacity > target)
   {
      CurrentOpacity -= 4;
   }
   else
   {
      CurrentOpacity += 4;
   }
   
   SetObjectOpacity('testImage', CurrentOpacity);
   document.imgform.imgopacity.value = CurrentOpacity;
   ImageFade = setTimeout('SetOpacityStep(' + target + ')', 50);
} 

<?php ShowSetOpacityFunction() ?>
</SCRIPT>
<?php
}


function ShowSetOpacityFunction() {
	
	?>function SetObjectOpacity(obj_name, percent)
{
   var the_obj;
  
   // Compensate for odd parameters and flicker bug
   if (percent > 99)
   {
      percent = 99;
   }
   
   if (percent < 0)
   {
      percent = 0;
   }
   
   if (document.all)
   {
      // Internet Explorer
      menuobj = document.all[obj_name];
      menuobj.filters.alpha.opacity = percent;
   }
   else if (document.getElementById)
   {
      // The rest
      menuobj = document.getElementById(obj_name);
      menuobj.style.MozOpacity = percent / 100;
      menuobj.style.opacity = percent / 100;
   }
}
<?php
}

