<?php


// -*- text -*-
include '../../functions.inc';
StandardHeader(array(
		'title' => 'Password Generator',
		'topic' => 'tools',
		'callback' => 'Insert_Javascript'
	));

?>
	
<p>Sorry, this page is under construction -- It should be operational by
later today (Feb 9, 2004).</p>

<p>This page will let you generate random passwords based on the characters
you want to use.  This is great for totally secure passwords for sensitive
systems, wireless encryption keys, and as source data for other programs.</p>

<p>If you want to make WEP keys, click on "Hex" and then on the length of
the WEP key you want to make (10, 26, 58).</p>

<form method=post action="javascript:" name=f onSubmit="return GeneratePW()">
<table align=center border=1>
<tr>
  <th align=right>Letters to Use:</th>
  <td><input type=text name="src" value="" size=60><br>
      <a href="" onclick="return UseLetters('')">Clear</a> -
      <a href="" onclick="return UseLetters('0123456789ABCDEF')">Hex</a> -
      <a href="" onclick="return AddLetters('0123456789')">+Num</a> -
      <a href="" onclick="return AddLetters('abcdefghijklmnopqrstuvwxyz')">+alpha</a> -
      <a href="" onclick="return AddLetters('ABCDEFGHIJKLMNOPQRSTUVWXYZ')">+ALPHA</a>
  </td>
</tr>
<tr>
  <th align=right>Length:</th>
  <td><input type=text name="len" value="10" size=5><br>
      <a href="" onclick="return SetLength(5)">5</a> -
      <a href="" onclick="return SetLength(10)">10</a> -
      <a href="" onclick="return SetLength(13)">13</a> -
      <a href="" onclick="return SetLength(26)">26</a> -
      <a href="" onclick="return SetLength(29)">29</a> -
      <a href="" onclick="return SetLength(58)">58</a> -
      <a href="" onclick="return SetLength(64)">64</a>
  </td>
</tr>
<tr>
  <th align=right>Generate:<br>
      <input type=button value="Clear" onclick="document.f.dest.value=''"><br>
      <input type=submit value="Generate">
  </th>
  <td><textarea name="dest" rows=10 cols=60></textarea>
  </td>
</tr>
</table>
</form>
	
<?php

StandardFooter();


function Insert_Javascript() {
	
	?>
<script language="javascript">
<!--

function GeneratePW() {
   Letters = document.f.src.value;
   
   if (Letters.length < 1)
   {
      alert("You must have letters to generate the password from.");
      return false;
   }

   if (isNaN(document.f.len.value))
   {
      alert("The length appears to not be a valid number.");
      return false;
   }
   
   addchars = parseInt(document.f.len.value, 10);
   
   if (addchars < 1)
   {
      alert("You need at least 1 character to be generated.");
      return false;
   }

   if (addchars > 256)
   {
      alert("The most I will generate at one time is 256 characters.");
      return false;
   }
   
   newpass = "";
   while (addchars --)
   {
      newpass += Letters.charAt(Math.floor(Math.random() * Letters.length));
   }
   
   newpass += "\n" + document.f.dest.value;
   document.f.dest.value = newpass.substr(0, 2048);
   return false;
}

function SetLength(l) {
   document.f.len.value = l;
   return false;
}

function UseLetters(letters) {
   document.f.src.value = letters;
   return false;
}

function AddLetters(letters) {
   document.f.src.value += letters;
   return false;
}

// -->
</script>
<?php
}

