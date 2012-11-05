<?php

include '../../functions.inc';
StandardHeader(array(
		'title' => 'Degree Converter',
		'topic' => 'gps',
		'callback' => 'AddJavascript'
	));

?>

<p>This degree converter will let you change your latitude and longitude
values between degrees (D); degrees and minutes (DM); and degrees, minutes,
seconds (DMS).  They are used for various different software packages and
with a GPS.</p>

<p>The calculations are very simple and already exist on other web sites,
but I decided to make my own so I could have it be small, fast, and
feature-packed.</p>

<form name=deg method=get action="#" onsubmit="return false;">
<table align=center border=1 cellpadding=3 cellspacing=0>
<tr><th>Convert From</th>
  <td><input name=d type=text size=30 onchange="upd(this.value)"
       onkeyup="upd(this.value)" onkeydown="upd(this.value)"
       onkeypress="upd(this.value)"></td></tr>
<tr><th>Result:</th>
  <td><span id="deg_out">Degrees<br>Degrees Minutes<br>
       Degrees Minutes Seconds</span></td>
</table>
</form>

<p><b>How do I use this thing?</b></p>

<p>Enter any type of coordinates into the white box and you will get the
coordinates converted to decimal degrees, degrees and minutes, or DMS
(degrees, minutes, seconds).  You can enter coordinates in practically any
format.  For instance, you can use:</p>

<table align=center border=1 cellpadding=3 cellspacing=0>
<tr><td>N 45.12345</td><td>N45.12345</td><td>N 45 12.345</td><td>N45 12
34.5</td></tr>
<tr><Td>W 93.87654</td><td>-093 87.654</td><td>93
12.987W</td><td>-093&deg; 12' 34.89"</td></tr>
<tr><td colspan=4>The converter is not picky.  Just copy &amp; paste
and it will work.</td></tr>
</table>

<p>If you can find a type of coordinate that it does not handle correctly,
just leave me a message in the shoutbox below and I will figure out how to
parse that style too.</p>

<?php

StandardFooter();


function AddJavascript() {
	
	?>
<script language="JavaScript">
<!--

// This JavaScript was written by Tyler Akins and is licensed under
// the GPL v3 -- http://www.gnu.org/copyleft/gpl.html
// See it on the original site -- http://rumkin.com/tools/gps/degrees.php
// Feel free to copy it to your site as long as you leave this header
// pretty much intact and as long as you are complying with the GPL.

function GetDegreeValue(v)
{
    var vv = "";
    var good = "0123456789.";
    var sign = 1;
    var factor = 1;
    var d = 0;
    var c, oldc;
    
    // Change non-numbers into spaces.
    oldc = ' ';
    for (i = 0; i < v.length; i ++)
    {
        var c = v.charAt(i).toUpperCase();
	if (c == 'W' || c == 'S' || c == '-')
	{
	    sign = -1;
	}
	if (good.indexOf(c) < 0)
	{
	    c = ' ';
	}
	if (oldc != ' ' || c != ' ')
	{
	    vv += c;
	    oldc = c;
        }	
    }

    v = new Array();
    v = vv.split(' ');
    
    for (i = 0; i < v.length; i ++)
    {
	d += v[i] * factor;
	factor /= 60;
    }
    
    return d * sign;
}


function DoPrecision(v, p)
{
    return Math.round(v * Math.pow(10, p)) / Math.pow(10, p);
}


function upd(v)
{
    var d, m, sign = '', str;
    
    v = GetDegreeValue(v);
    if (v < 0)
    {
        sign = '-';
	v = - v;
    }
    
    str = sign + DoPrecision(v, 6);
    str += '<br>';
	
    d = Math.floor(v);
    v = (v - d) * 60;
    str += sign + d.toString() + '&deg; ' + DoPrecision(v, 3) + "'";
    str += '<br>';
    
    m = Math.floor(v);
    v = (v - m) * 60;
    str += sign + d.toString() + '&deg; ' + m.toString() + "' " + 
        DoPrecision(v, 2) + '"';
	
    id = document.getElementById('deg_out');
    id.innerHTML = str;
}

// -->
</script>
<?php
}

