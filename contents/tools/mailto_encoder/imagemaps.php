<?php

include '../../functions.inc';
StandardHeader(array(
		'title' => 'Mailto Encoder',
		'header' => 'Email Address Encoder',
		'topic' => 'mailto'
	));

?>

<p>Imagemaps, custom links, and other places can use the Mailto Encoder, but
you need to follow a few special steps.</p>

<ul>
<li>Use the <a href="custom.php">Custom Encoder</a>
  <ul>
  <li>Step 1:  Enter your email address
  <li>Step 2:  You can skip this step if you like
  <li>Step 3:  Don't make a link
  <li>Step 4:  Use "normal"
  <li>Step 5:  Use the javascript encoding and pick the double-escaped encoding or the substitution encoding
  <li>Step 6:  Encode
  </ul>
	
<li>Copy the generated Javascript code into whatever you need it (notepad,
your web page editor, etc.).  Remove some lines from the top and bottom.
It should look similar to one of these.

<?php

MakeBoxTop('center');

?>
<p><b>Double-Escaped</b></p>

<pre>
MaIlMe=new Array();
MaIlMe[0]="165163145162045064060150157163164056156";
MaIlMe[1]="141155145";
OutString="";for(i=0;i&lt;MaIlMe.length;i++){
for(j=0;j&lt;MaIlMe[i].length;j+=3){
OutString+=eval("\"\\"+MaIlMe[i].slice(j,j+3)+"\"");
}}document.write(unescape(OutString));
</pre>

<hr>
<p><b>Substitution</b></p>

<pre>
ML="e.hsnrtmau@o";
MI="9305:2;3614870";
OT="";
for(j=0;j&lt;MI.length;j++){
OT+=ML.charAt(MI.charCodeAt(j)-48);
}document.write(OT);
</pre>

<?php MakeBoxBottom(); ?>

<li>Alter the last line and remove the document.write portion.  Add a
"return" line after your modified last line.  Put this in a function.
The script should now look like one of these.

<?php

MakeBoxTop('center');

?>
<p><b>Double-Escaped</b></p>

<pre>
function SendMeEmail()
{
   MaIlMe=new Array();
   MaIlMe[0]="165163145162045064060150157163164056156";
   MaIlMe[1]="141155145";
   OutString="";for(i=0;i&lt;MaIlMe.length;i++){
   for(j=0;j&lt;MaIlMe[i].length;j+=3){
   OutString+=eval("\"\\"+MaIlMe[i].slice(j,j+3)+"\"");
   }}
   location.href = "mailto:" + unescape(OutString);
   return false;
}
</pre>

<hr>
<p><b>Substitution</b></p>

<pre>
function SendMeEmail()
{
   ML="e.hsnrtmau@o";
   MI="9305:2;3614870";
   OT="";
   for(j=0;j&lt;MI.length;j++){
   OT+=ML.charAt(MI.charCodeAt(j)-48);
   }
   location.href = "mailto:" + OT;
   return false;
}
</pre>

<?php MakeBoxBottom(); ?>

<li>Now, test it with your imagemap or a regular link:
<pre>
&lt;a href="" onclick="return SendMeEmail()"&gt;Test Link&lt;/a&gt;
</pre>
<li>That should work for you.  If not, I would love to know.</li>
</ul>

<?php

StandardFooter();
