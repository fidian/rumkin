<?PHP

require '../../functions.inc';

StandardHeader(array('title' => 'Substitution Cipher',
		     'topic' => 'cipher',
		     'callback' => 'insert_js'));
?>

<p>A substitution cipher is a pretty basic type of code.  You replace every
letter with a drawing, color, picture, number, symbol, or another type of
letter.  This means, if you have your first "E" encoded as a square, all of
your other "E"s in the message will also be squares.</p>

<p>This tool has been created specifically to allow for as much flexibility
as possible.  You'll see what I mean when you start playing with it.</p>

<form name="encoder" method=post action="#" onsubmit="return false;">
<p>Key for alphabet:  <input type=text size=30 name=key> - 
<span id="Keymaker0" target="document.encoder.key.value"></span>
<br>Keyed alphabet: <span id="alphabet"></span></p>
<p>Method of Encoding:  <select name="method" onchange="upd_method()">
<option value="">--- Pick one ---</option>
<option value="I_bionicle">Image:  Bionicle</option>
<option value="I_braille">Image:  Braille - Grade 1</option>
<option value="I_braille2">Image:  Braille - Shorthand</option>
<option value="I_dancingmen">Image:  Dancing Men</option>
<option value="I_pigpen">Image:  Pigpen #X#X</option>
<option value="I_pigpen2">Image:  Pigpen ##XX</option>
<option value="T_goldbug">Text:	 Gold Bug</option>
<option value="TI_hex">Text:  Hexadecimal</option>
<option value="TI_octal">Text:  Octal</option>
<option value="T_spirit">Text:  Spirit DVD Code</option>
<option value="T_phone">Text:  Telephone</option>
</select></p>
<p><div id="moreinput"></div></p>

<p><textarea name="text" rows="5" cols="80"></textarea></p>
</form>
<?PHP MakeBoxTop('center') ?>
<div id="result"></div>
<?PHP MakeBoxBottom() ?>

<?PHP Section('Notes') ?>

<p>The "Dancing Men" images are based on the Sherlock Holmes story of <i>The
Dancing Men</i>.  Only 17 of the 26 letters were shown in the text, and
there were inconsistancies between messages.  Aage Rieck S&oslash;rensen
published a paper where he analyzed the dancing men and created a workable
alphabet, and needed to slightly change some existing stick figures to make
everything work out well.  My dancing men are based upon the <a
href="http://www.algonet.se/~osarkab/mart_1/dancingmen/damen.html">Dancingmen</a>
TrueType font, which is based upon S&oslash;rensen's work.  If there
is a demand, I will use alternate stick men figures, but email me with a key
showing the stick men and the arm/leg positions you wish to see.</p>

<p>The "Gold Bug" symbols never had symbols for J, K, Q, X, and Z.  In their
place, I decided upon the symbols based on others that I saw in the code
(there was a ] but not a [ symbol) and what I saw on pictures of old
typewriters.</p>

<p>Braille supports upper case, numbers, punctuation, and abbreviations, but
"Grade 1" just supports a direct character-for-character translation with
number encoding, decimal point vs. period, and left vs. right quote.  It
does not know how to handle everything &ndash; just the most basic things.
"Grade 2" allows abbreviations and shorthand, which is beyond the scope of
this web page.  If you know how to abbreviate Braille, you can enter the
shorthand with "Braille - Shorthand" and get the full range of possible
Braille symbols.</p>

<p>The Bionicle images are based off the alphabet used by <a
href="http://lego.com">Lego's</a> <a href="http://bionicle.com">Bionicle</a>
toy line.</p>

<?PHP

StandardFooter();



function insert_js()
{
?><script language="JavaScript" src="js/util.js"></script>
<script language="JavaScript" src="js/caesar.js"></script>
<script language="JavaScript" src="js/keymaker.js"></script>
<script language="JavaScript"><!--
// This code was written by Tyler Akins and placed in the public domain.
// Feel free to use this code if you so desire.
// It would be nice if you left this header intact.  http://rumkin.com


force_run = 0;
	
function upd_method()
{
   var elem = document.getElementById('moreinput');
   
   if (document.encoder.method.value.charAt(0) == 'I')
   {
      elem.innerHTML = ShowImages(document.encoder.method.value);
   }
   else if (document.encoder.method.value.charAt(0) == 'T')
   {
      elem.innerHTML = ShowText(document.encoder.method.value);
      elem.innerHTML += ShowDecodeBox();
   }
   else
   {
      elem.innerHTML = "";
   }
   
   force_run = 1;
}


function Tel_upd()
{
   var slash1 = HTMLEscape(document.encoder.slash1.value);
   var slash2 = HTMLEscape(document.encoder.slash2.value);
   var slash3 = HTMLEscape(document.encoder.slash3.value);
   var tel_q = HTMLEscape(document.encoder.tel_q.value);
   var tel_z = HTMLEscape(document.encoder.tel_z.value);
   var lett = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
   var letn = '1231231231231231 23123123 ';
   var letb = '2223334445556667 77888999 ';
   
   for (var i = 0; i < lett.length; i ++)
   {
      var elem = document.getElementById('Text_Link_' + lett.charCodeAt(i));
      if (letn.charAt(i) == '1')
      {
         elem.innerHTML = letb.charAt(i) + slash1;
      }
      else if (letn.charAt(i) == '2')
      {
         elem.innerHTML = letb.charAt(i) + slash2;
      }
      else if (letn.charAt(i) == '3')
      {
         elem.innerHTML = letb.charAt(i) + slash3;
      }
      else if (lett.charAt(i) == 'Q')
      {
         elem.innerHTML = tel_q;
      }
      else
      {
         elem.innerHTML = tel_z;
      }
   }
   
   force_run = 1;
}


function start_update()
{
   if (! document.getElementById)
   {
      alert('Sorry, you need a newer browser.');
      return;
   }

   if ((! document.Caesar_Loaded) || (! document.Util_Loaded) ||
       (! document.Keymaker_Loaded) ||
       (! document.getElementById('result')))
   {
      window.setTimeout('start_update()', 100);
      return;
   }
   Keymaker_Start();
   upd_method();
   upd();
}


function upd()
{
   var alpha, elem, isunchanged, t;
   
   isunchanged = IsUnchanged(document.encoder.text) *
      IsUnchanged(document.encoder.key);
   if (isunchanged && force_run == 0)
   {
      window.setTimeout('upd()', 100);
      return;
   }
   
   force_run = 0;
	
   ResizeTextArea(document.encoder.text);

   elem = document.getElementById('alphabet');
   if (document.encoder.key.value != '')
   {
      alpha = MakeKeyedAlphabet(document.encoder.key.value);
      elem.innerHTML = alpha;
      t = Caesar(1, document.encoder.text.value, 0, alpha);
   }
   else
   {
      elem.innerHTML = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      t = document.encoder.text.value;
   }
   
   Encode(t);
   
   window.setTimeout('upd()', 100);
}


function Encode(t)
{
   var elem;
   
   elem = document.getElementById('result');

   if (t == "")
   {
      elem.style.fontSize = "20px";
      elem.innerHTML = "Type a message and it will be encoded here!";
   }
   else if (document.encoder.method.value.charAt(0) == 'I')
   {
      elem.style.fontSize = "30px";
      elem.innerHTML = EncodeImage(document.encoder.method.value, t);
   }
   else if (document.encoder.method.value.charAt(0) == 'T' &&
      document.encoder.method.value != 'T_spirit')
   {
      elem.style.fontSize = "30px";
      elem.innerHTML = EncodeText(document.encoder.method.value, t);
   }
   else if (document.encoder.method.value.charAt(0) == 'T')
   {
      elem.style.fontSize = "1em";
      elem.innerHTML = EncodeText(document.encoder.method.value, t);
   }
   else
   {
      elem.style.fontSize = "20px";
      elem.innerHTML = t;
   }
}


function EncodeImage(set, t)
{
   var pos = set.indexOf('_');
   if (pos >= 0)
      set = set.slice(pos + 1, set.length);
   
   var s = "";
   
   if (set == 'braille')
   {
      t = Braille_Translate(t);
      for (var i = 0; i < t.length; i ++)
      {
         s += Braille_Image(t.charAt(i));
      }
      return s;
   }
   
   if (set == 'braille2')
   {
      for (var i = 0; i < t.length; i ++)
      {
         s += Braille_Image(t.charAt(i).toLowerCase());
      }
      return s;
   }
   
   t = t.toUpperCase();
   
   for (var i = 0; i < t.length; i ++)
   {
      var thisChar = t.charAt(i);
      var isAlpha = (thisChar >= 'A' && thisChar <= 'Z')? 1 : 0;
      var isNum = (thisChar >= '0' && thisChar <= '9')? 1 : 0;
      var validChar = isAlpha
      if (set == 'bionicle' || set == 'dancingmen')
      {
         validChar = (isNum || isAlpha)? 1 : 0;
      }
      if (validChar)
      {
	 if (set == 'dancingmen' && ! isNum && 
	     (t.charAt(i + 1) == ' ' || t.length == i + 1))
	 {
	    s += "<img src=\"media/" + set + "/" + thisChar +
	       "_.gif\">";
	    i ++;
	 }
	 else
	 {
            s += "<img src=\"media/" + set + "/" + thisChar + 
	       ".gif\">";
	 }
      }
      else
      {
	 if (thisChar == "\n")
	 {
	    s += "<br>\n";
         }
	 else
	 {
            s += HTMLEscape(thisChar);
         }
      }
   }
   
   return s;
}


function EncodeText(set, t)
{
   var pos = set.indexOf('_')
   var flags = '';
   if (pos >= 0)
   {
      flags = set.slice(0, pos);
      set = set.slice(pos + 1, set.length);
   }
   
   var s = '';
   
   for (var i = 0; i < t.length; i ++)
   {
      var c = t.charAt(i);
      if (flags.indexOf('I') < 0)
      {
         c = c.toUpperCase();
      }
      
      var e = document.getElementById('Text_Link_' + c.charCodeAt(0))
      if (e)
      {
         s += e.innerHTML;
      }
      else
      {
         s += t.charAt(i);
      }
   }
   
   return HTMLEscape(s);
}


function ShowImages(set)
{
   var pos = set.indexOf('_');
   if (pos >= 0)
      set = set.slice(pos + 1, set.length);

   var s = "Click on the images to add them to the message.<br>";
   var lett = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
   
   if (set == 'bionicle' || set == 'dancingmen')
   {
      lett += '0123456789';
   }
   
   for (var i = 0; i < lett.length; i ++)
   {
      s += "<a href=\"#\" onclick=\"return L('" + lett.charAt(i) +
         "');\"><img src=\"media/" + set + "/" + lett.charAt(i) + 
         ".gif\" border=0></a>";
   }

   if (set == 'dancingmen')
   {
      s += "<br>";
      flaglett = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      for (var i = 0; i < flaglett.length; i ++)
      {
         s += "<a href=\"#\" onclick=\"return L('" + flaglett.charAt(i) +
            " ');\"><img src=\"media/" + set + "/" + flaglett.charAt(i) + 
            "_.gif\" border=0></a>";
      }
   }
   
   if (set == 'braille' || set == 'braille2')
   {
      // Start over.
      s = "";
      if (set == 'braille')
      {
         lett = lett.toLowerCase();
      }
      else
      {
         lett = Braille_LetterSet();
      }
      for (var i = 0; i < lett.length; i ++)
      {
         // No need to use Braille_Recode() on just A-Z
	 s += "<a href=\"#\" onclick=\"return L('";
	 if (lett.charAt(i) == '\'' || lett.charAt(i) == '\\')
	 {
	    s += '\\';
	 }
	 s += lett.charAt(i) +
            "');\">" + Braille_Image(lett.charAt(i)) + "</a>";
	 if (i == 31)
	 {
	    s += '<br>';
	 }
      }
   }

   
   return s;
}


function ShowText(set)
{
   var lett = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
   var pos = set.indexOf('_');
   var flags = '';
   if (pos >= 0)
   {
      flags = set.slice(0, pos);
      set = set.slice(pos + 1, set.length);
   }
   
   if (set == 'goldbug' || set == 'spirit')
   {
      var s = '';

      if (set == 'goldbug')
      {
         var patt = '0 1 2 3 4 5 6 7 8 9 . , : ; ( ) [ ] &dagger; &Dagger; ' + 
            '$ &cent; - * ? &para;';
         var alph = 'L F B G H A I K E M P J Y T R S Z W D O ' +
            'Q X C N U V';
      } 
      else if (set == 'spirit')
      {
         var patt = '--- --1 -1- -11 1-- 1-1--- 1-1--1 1-1-1- 1-1-11 ' +
	    '1-11-- 1-11-1 1-111- 1-1111--- 1-1111--1 1-1111-1- 1-1111-11 ' +
	    '1-11111-- 1-11111-1 11---- 11---1 11--1- 11--11 11-1-- 11-1-1 ' +
	    '11-11- 11-111 111';
	 var alph = '&nbsp; E A O R M W F G Y P B V K J X Q Z T I N H D L ' +
	    'C U S';
      }
      
      while (patt.length > 0 && alph.length > 0)
      {
         var letter, token, i;
	 
         if (s.length > 0)
	 {
	    s += ' &nbsp; ';
	 }
	 
	 i = patt.indexOf(' ')
	 if (i >= 0)
	 {
	    token = patt.slice(0, i);
	    patt = patt.slice(i + 1, patt.length);
	 }
	 else
	 {
	    token = patt;
	    patt = '';
	 }
	 
	 i = alph.indexOf(' ');
	 if (i >= 0)
	 {
	    letter = alph.slice(0, i);
	    alph = alph.slice(i + 1, alph.length);
	 }
	 else
	 {
	    letter = alph;
	    alph = '';
	 }
	 
	 
	 s += '<a onclick="return L(\'' + letter + '\')" id="Text_Link_';
	 if (letter == '&nbsp;')
	 {
	    s += ' '.charCodeAt(0);
	 }
	 else
	 {
	    s += letter.charCodeAt(0);
	 }
	 s += '" href="#" style="text-decoration: none">' + token + '</a>';
      }
      
      return "<font size=+2><b>" + s + "</b></font>"
   }

   if (set == 'phone')
   {
      var s = '';
      var patt = "2\\2|2/3\\3|3/4\\4|4/5\\5|5/6\\6|6/7\\0\\" +
         "7|7/8\\8|8/9\\9|9/0/"
      var c = 'onkeypress="Tel_upd()" onkeyup="Tel_upd()" ' + 
         'onchange="Tel_upd()"';
      s += 'Left: <input type="text" name="slash1" size=1 value="\\" ' +
         c + '> &nbsp; ';
      s += 'Middle: <input type="text" name="slash2" size=1 value="|" ' + 
         c + '> &nbsp; ';
      s += 'Right: <input type="text" name="slash3" size=1 value="/" ' + 
         c + '> &nbsp; ';
      s += 'Q: <input type="text" name="tel_q" size=3 value="0\\" ' +
         c + '> &nbsp; ';
      s += 'Z: <input type="text" name="tel_z" size=3 value="0/" ' +
         c + '><br>';
      
      for (var i = 0; i < lett.length; i ++)
      {
         if (i > 0)
	 {
	    s += ' &nbsp; ';
	 }
         s += '<a onclick="return L(\'' + lett.charAt(i) + 
	    '\')" id="Text_Link_' +
	    lett.charCodeAt(i) + '" href="#">';
	 s += patt.charAt(2 * i) + patt.charAt((2 * i) + 1);
	 s += '</a>'; 
      }
      
      return s;
   }
   
   if (set == 'hex')
   {
      var s = '';
      var hexchars = '0123456789ABCDEF';
      
      for (var i = 32; i < 127; i ++)
      {
         if (s != '')
	 {
	    s += ' &nbsp; ';
	 }
	 
         var c = String.fromCharCode(i);
	 if (c == "'" || c == "\\")
	 {
	    c = "\\" + c;
	 }
	 c = "'" + c + "'";
	 if (c == "\'\"\'")
	 {
	    c = "String.fromCharCode(" + i + ")";
	 }
	 s += '<a onclick="return L(' + c + ')" id="Text_Link_' +
	    i + '" href="#">';
	    
	 var h = i;
	 s += hexchars.charAt(Math.floor(h / 16));
	 h -= Math.floor(h / 16) * 16;
	 s += hexchars.charAt(h);
	 s += '</a>';
      }
      
      return s;
   }
   
   if (set == 'octal')
   {
      var s = '';
      
      for (var i = 32; i < 127; i ++)
      {
         if (s != '')
	 {
	    s += ' &nbsp; ';
	 }
	 
         var c = String.fromCharCode(i);
	 if (c == "'" || c == "\\")
	 {
	    c = "\\" + c;
	 }
	 c = "'" + c + "'";
	 if (c == "\'\"\'")
	 {
	    c = "String.fromCharCode(" + i + ")";
	 }
	 s += '<a onclick="return L(' + c + ')" id="Text_Link_' +
	    i + '" href="#">';

	 var o = i;
	 s += Math.floor(o / 64);
	 o -= Math.floor(o / 64) * 64;
	 s += Math.floor(o / 8);
	 o -= Math.floor(o / 8) * 8;
	 s += o;
	 s += '</a>';
      }
      
      return s;
   }
	
   return "Insert " + set + " text info here.";
}


function ShowDecodeBox()
{
   return '<p>Enter a message to decode: ' +
      '<textarea name=decodeBox width=40 height=1>' +
      '</textarea> ' +
      '<span id=decodeBoxLink>[<a href="#" onclick="ProcessDecodeBox(0); return false">' +
      'Add To Message Box</a>]</span>' +
      '<span id=decodeBoxWorking style="display: none">[WORKING]</span>';
}


function GetSeconds()
{
   var d = new Date();
   
   return d.getSeconds();
}


var Process_Text_Done;
var Process_Text_Lookup;
function ProcessDecodeBox(work)
{
   var t = document.encoder.decodeBox.value;
   var d = GetSeconds();
   var Lookup = new Array();
   
   if (! work)
   {
      document.getElementById('decodeBoxLink').style.display = "none";
      document.getElementById('decodeBoxWorking').style.display = "inline";
      Process_Text_Done = document.encoder.text.value;
       
      Process_Text_Lookup = new Array();
      for (var i = 0; i < 256; i ++)
      {
         var e = document.getElementById('Text_Link_' + i.toString());
         if (e)
         {
            Process_Text_Lookup[e.innerHTML] = String.fromCharCode(i);
         }
      }
      
      window.setTimeout('ProcessDecodeBox(1)', 1);
      return;
   }
   
   while (t.length && d == GetSeconds())
   {
      var c = '';
      
      for (var code in Process_Text_Lookup)
      {
         if (code == t.slice(0, code.length))
	 {
	    c += Process_Text_Lookup[code];
	    t = t.slice(code.length);
	 }
      }
      
      if (c != '')
      {
         Process_Text_Done += c;
      }
      else
      {
         Process_Text_Done += t.charAt(0);
         t = t.slice(1, t.length);
      }
   }
   
   document.encoder.decodeBox.value = t;
   
   if (t.length)
   {
      window.setTimeout('ProcessDecodeBox(1)', 1);
      return;
   }
   
   document.getElementById('decodeBoxWorking').style.display = "none";
   document.getElementById('decodeBoxLink').style.display = "inline";
   document.encoder.text.value = Process_Text_Done;
}


// If I get adventurous enough, rules about Braille substitutions and
// abbreviations are at
//   http://www.brl.org/formats/
//   http://brl.org/refdesk/rules/index.html

// Changes quotes, decimal points, numbers, and caps to be escaped
// appropriately.
function Braille_Translate(input)
{
   var output = '';
   var words = input.split(' ');
   for (var wordnum = 0; wordnum < words.length; wordnum ++)
   {
      var word = words[wordnum];
      var word2 = Braille_Remap(word), word3;
      var i, flag;
      
      if (wordnum > 0)
         output += ' ';
      
      // This violates Rule 1 (General Rules), section B (Contractions
      // are not to be used when ...  This is due to the complexity of
      // determining where word syllables are in just a tiny bit of code.
      
      // Close quotes
      i = word.length - 1;
      while (i >= 0)
      {
         var c = word.charAt(i);
	 if (c == '"')
	 {
	    word2 = word2.slice(0, i) + '0' +
	       word2.slice(i + 1, word2.length);
	    i = -1;
	 }
	 if ((c >= 'a' && c <= 'z') ||
	     (c >= 'A' && c <= 'Z') ||
	     (c >= '0' && c <= '9'))
	 {
	    i = -1;
	 }
	 
	 i --;
      }
      
      // Decimal point vs. period.  If a number is to either side,
      // assume decimal point.
      for (i = 0; i < word.length; i ++)
      {
         if (word.charAt(i) == '.')
	 {
	    if ((i > 0 && word.charAt(i - 1) >= '0' && 
	         word.charAt(i - 1) <= '9') ||
		(i < word.length - 1 && word.charAt(i + 1) >= '0' &&
		 word.charAt(i + 1) <= '9'))
	    {
	       word2 = word2.slice(0, i) + '.' + 
	          word2.slice(i + 1, word2.length);
	    }
	 }
      }
      
      // Escape numbers
      // This is the first place things could get inserted.
      flag = 0;  // Is in alpha mode
      word3 = '';
      for (i = 0; i < word2.length; i ++)
      {
         var c = word.charAt(i).toUpperCase();
	 if (flag == 0)
	 {
	    if (c >= '0' && c <= '9')
	    {
	       flag = 1;
	       word3 += '#';
	    }
	 }
	 else if (flag == 1)
	 {
	    if (c >= 'A' && c <= 'Z')
	    {
	       flag = 0;
	       word3 += ';';
	    }
	    else if (c != ',' && c != ':' && c != '-' && c != '.')
	    {
	       // All other punctuation stops number encoding.
	       flag = 0;
	    }
	 }
       	 word3 += word2.charAt(i);
      }
      word2 = word3;
      
      // Escape caps
      // Things could have been inserted before here, so we need to base
      // everything on word2.
      flag = 0;
      word3 = word.toLowerCase();
      if (word != word3 && word3 != word.toUpperCase())
      {
         if (word == word.toUpperCase())
	 {
	    // Escape whole word.  If only 1 alpha, 1 symbol.
	    // If more than one letter, 2 symbols.
	    flag = 0;
	    for (i = 0; i < word3.length; i ++)
	    {
	       if (word3.charAt(i) >= 'a' && word.charAt(i))
	       {
	          flag ++;
	       }
	    }
	    if (flag > 1)
	    {
	       word2 = ',,' + word2;
	    }
	    else
	    {
	       word2 = ',' + word2;
	    }
	 }
	 else
	 {
	    // Escape just before caps letters
	    word3 = '';
	    for (i = 0; i < word2.length; i ++)
	    {
	       var c = word2.charAt(i);
	       if (c >= 'A' && c <= 'Z')
	       {
	          word3 += ',';
	       }
	       word3 += c;
	    }
	    word2 = word3;
	 }
      }
      word2 = word2.toLowerCase();
      
      output += word2;
   }
   
   return output;
}


function Braille_Remap(c)
{
   // Not 100% perfect.
   // Mostly taken from http://www.omniglot.com/writing/braille.htm
   var From = '1234567890,:.?!"[]()';
   var To =   'abcdefghij1245687777';
   var c2 = '';
   
   for (var i = 0; i < c.length; i ++)
   {
      var p = From.indexOf(c.charAt(i));
      if (p >= 0)
      {
         c2 += To.charAt(p);
      }
      else
      {
         c2 += c.charAt(i);
      }
   }
   
   return c2;
}


function Braille_LetterSet()
{
   return " a1b'k2l@cif/msp\"e3h9o6r^djg>ntq,*5<-u8v.%[$+x!&;:4\\0z7(_?w]#y)=";
}


function Braille_Image(c)
{
   // Character mapping taken from
   // http://interglacial.com/~sburke/braille/table.html
   // This has differences when compared to Wikipedia
   //   Char   Notes
   // --------------------------------------------------
   //    .     Decimal point.  A normal period is '4'.
   //    #     Number follows
   //    ,     Capital follows.  Normal comma is '1'.
   //          ',,' means the whole word is capitalized.
   //    ?     'th' contraction.  Normal question mark is '5'.
   //    :     'wh' contraction.  Normal semicolon is '2'.
   //    !     'the-' prefix or 'the' word.  Normal exclamation is '6'.
   //    8     'his' or open quotation mark.
   //    0     'was' or close quotation mark.
   //    7     Bracket or parenthesis.
   // Also, numbers should be remapped to a-j (a=1, i=9, j=0)

   var LL = Braille_LetterSet();
   var p = LL.indexOf(c);
   if (p >= 0)
   {
      var bf = '';
      if (p >= 32)
      {
         p -= 32;
	 bf = '6' + bf;
      }
      if (p >= 16)
      {
         p -= 16;
	 bf = '5' + bf;
      }
      if (p >= 8)
      {
         p -= 8;
	 bf = '4' + bf;
      }
      if (p >= 4)
      {
         p -= 4;
	 bf = '3' + bf;
      }
      if (p >= 2)
      {
         p -= 2;
	 bf = '2' + bf;
      }
      if (p >= 1)
      {
         p -= 1;
	 bf = '1' + bf;
      }
      if (bf == '')
      {
         bf = '_';
      }
      return '<img src="media/braille/' + bf + '.gif" border=0>';
   }
   return HTMLEscape(c);
}


function L(l)
{
   var alpha;
   alpha = MakeKeyedAlphabet(document.encoder.key.value);
   for (var i = 0; i < l.length; i ++)
   {
      var idx = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(l.charAt(i));
      if (idx >= 0)
      {
         idx = alpha.charAt(idx);
      }
      else
      {
         idx = l.charAt(i);
      }
      document.encoder.text.value += idx;
   }
   return false;
}


window.setTimeout('start_update()', 100);


// --></script>
<?PHP
}
