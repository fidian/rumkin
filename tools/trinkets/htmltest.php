<?php

include '../../functions.inc';
StandardHeader(array(
		'title' => 'HTML Code Tester',
		'topic' => 'trinkets',
		'callback' => 'insert_js'
	));

?>

<form name=fout method=get action="#" 
onsubmit="return showit();">
<textarea name=res rows=5 cols=80 onkeydown="showit()"
        onkeyup="showit()" onkeypress="showit()" onchante="showit()"></textarea>
</form>
<div id="show"></div>
<?php

StandardFooter();


function insert_js() {
	
	?>
<script language="JavaScript">
<!--

var lastText = '';
function showit()
{
   if (lastText == document.fout.res.value)
      return false;

   id = document.getElementById('show');
   id.innerHTML = document.fout.res.value;
   lastText = document.fout.res.value;
   return false;
}
//--></SCRIPT>
<?php
}

