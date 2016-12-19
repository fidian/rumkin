var wnum = 0;

function MakeCopyWindow()
{
   var w = window.open('', 'window' + wnum, 
      'height=300,location=0,toolbar=0,width=500');
   wnum ++;
   
   w.document.write('<html><head><title>Cache Stats HTML View</title>');
   w.document.write('</head><body style="height: 100%">');
   w.document.write('<p>Here is the HTML code:</p>');
   w.document.write('<form method=post action="#" onsubmit="return false" style="3px solid red">');
   w.document.write('<textarea name=html style="width: 100%; height: 100%">');
   w.document.write(document.getElementById('analyze_html').innerHTML);
   w.document.write('</textarea>');
   w.document.write('</form>');
   w.document.write('</body></html>');
   
   w.document.close();
}
