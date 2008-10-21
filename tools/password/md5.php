<?PHP  // -*- text -*-

include '../../functions.inc';

StandardHeader(array('title' => 'MD5 Generator',
		     'topic' => 'password',
		     'callback' => 'Insert_Javascript'));

?>

<p>If you ever need to generate a MD5 checksum of a phrase, bit of text, or
whatever, just paste it into this box and you'll get what you want.  It may
not work well for high characters and multi-byte characters.</p>

<form method=post action="javascript:" name=f>
<table align=center border=1>
<tr>
  <th align=right>Input:</th>
  <td><textarea name="src" rows=5 cols=50 onChange="UpdateMD5()"
     onKeyDown="UpdateMD5()" onKeyUp="UpdateMD5()"></textarea></td>
</tr>
<tr>
  <th align=right>MD5:</th>
  <td><span id="md5">d41d8cd98f00b204e9800998ecf8427e</span></td>
</tr>
</table>
</form>

<?PHP

StandardFooter();

function Insert_Javascript()
{
?>
<script language="JavaScript" src="/inc/js/md5.js"></script>
<script language="javascript">
<!--

lasttext = '';
function UpdateMD5()
{
   var el = document.getElementById('md5');
   
   if (! el)
   {
      return;
   }
   
   if (document.f.src.value == lasttext)
   {
      return;
   }
   
   lasttext = document.f.src.value;
   
   el.innerHTML = md5(lasttext);
   return false;
}

// -->
</script>
<?PHP
}