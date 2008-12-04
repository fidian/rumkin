<?php

include '../../functions.inc';
StandardHeader(array(
		'title' => 'Rainbow Text Generator',
		'topic' => 'trinkets',
		'callback' => 'insert_js'
	));

?>

<P>Enter in anything that you want converted into a rainbow.  It will gently
fade from letter to letter.  Then, you can copy the generated HTML into your
web page.</p>

<form name=fout method=get action="#" 
onsubmit="return DoRainbow()">
<input type=text name=src> - Type here and press Enter<br>
<textarea name=res rows=5 cols=80></textarea>
</form>
<div id="show"></div>
<?php

StandardFooter();


function insert_js() {
	
	?>
<script language="JavaScript">
<!--

hx = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F');

function convertToHex(x)
{
   if (x < 0)
      x += 255;
   x = Math.floor(x);
   return hx[Math.floor(x/16)] + "" + hx[x%16]
}

function makeRainbow(text)
{
   var S = "<b>";
   color_d1=255;
   mul=color_d1/text.length;
   pi = 3.141592653
   for(i=0;i < text.length;i++)
   {
      sv = i / (text.length / pi);
      color_d1 = Math.sin(sv + (pi / 3))
      color_h1 = convertToHex(color_d1 * color_d1 * 255);
      color_d2 = Math.sin(sv);
      color_h2 = convertToHex(color_d2 * color_d2 * 255);
      color_d3 = Math.sin(sv - (pi / 3));
      color_h3 = convertToHex(color_d3 * color_d3 * 255);
//      color_h1 = "00";
//      color_h2 = "00";
//      color_h3 = "00";
      if (text.substring(i, i+1) != " ")
      {	
         S += "<span style=\"color: #" + color_h1 + color_h2 + color_h3 +
	    "\">" + text.substring(i,i+1) + "</span>";
      }	
      else
      {	
	 S += ' ';
      }	
   }
   return S + "</b>";
}
	
function DoRainbow()
{	
   document.fout.res.value = makeRainbow(document.fout.src.value);
   id = document.getElementById('show');
   id.innerHTML = document.fout.res.value;
   return false;
}
//--></SCRIPT>
<?php
}

