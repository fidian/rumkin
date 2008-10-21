<?PHP

include '../../functions.inc';

StandardHeader(array('title' => 'Base Converter',
                     'topic' => 'trinkets',
		     'callback' => 'insert_js'));

$change = 'onChange="upd()" onKeyPress="upd()" onKeyUp="upd()"';

?>

<p>Sometimes, one needs to convert a base-10 number into hexadecimal,
binary, octal, or another number system.  It gets annoying when you need to
convert a base-6 number into a base-20 number for whatever reason you have.
This will make things easy for you.</p>

<form name=fout method=get action="#" onsubmit="return false">
Input base: <select name=inbase <?= $change ?>>
<?PHP

   for ($i = 2; $i < 33; $i ++)
   {
      echo "<option value=$i";
      if ($i == 10)
         echo ' SELECTED';
      echo ">$i</option>\n";
   }

?>
</select><br>
Input number: <input type=text name=src <?= $change ?>><br>
Output base: <select name=outbase <?= $change ?>>
<?PHP

   for ($i = 2; $i < 33; $i ++)
   {
      echo "<option value=$i";
      if ($i == 10)
         echo ' SELECTED';
      echo ">$i</option>\n";
   }

?>
</select>
</form>
<div id="show"></div>
<?PHP
  
StandardFooter();

function insert_js()
{
?>
<script language="JavaScript">
<!--

var Old_BaseIn = 0;
var Old_BaseOut = 0;
var Old_Number = '';

NumList = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	
function upd()
{
   var i, n, s, id, idx;
   
   if (Old_BaseIn == document.fout.inbase.value &&
       Old_BaseOut == document.fout.outbase.value &&
       Old_Number == document.fout.src.value)
   {
      return;
   }
   
   Old_BaseIn = document.fout.inbase.value;
   Old_BaseOut = document.fout.outbase.value;
   Old_Number = document.fout.src.value;
   
   n = 0;
   i = 0;
   while (i < Old_Number.length)
   {
      var idx;
      
      idx = NumList.indexOf(Old_Number.charAt(i));
      if (idx >= 0)
      {
         n *= Old_BaseIn;
         n += idx;
      }
      i ++;
   }
   
   s = '';
   while (n)
   {
      var idx;
      
      idx = n % Old_BaseOut;
      s = NumList.charAt(idx) + s;
      n -= idx;
      n /= Old_BaseOut;
   }
	
   if (s == '')
   {
      s = '0';
   }
   
   id = document.getElementById('show');
   id.innerHTML = s;
	
   return false;
}
//--></SCRIPT>
<?PHP
}
