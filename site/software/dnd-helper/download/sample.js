n = 1;
function ShowSample(D, T)
{
   eval("window.open('sample.php?db=" + escape(D) + "&type=" +
      escape(T) + "', '" + n +
      "', 'toolbar=0,scrollbars=1,location=0,statusbar=0," +
      "menubar=0,resizable=1,width=300,height=300');");
   n ++;
}
