// passchk.js is free software; you can redistribute it and/or modify it
// under the terms of the GNU General Public License as published by the
// Free Software Foundation; either version 3 of the License, or (at your
// option) any later version.
//
// passchk.js is distributed in the hope that it will be useful but
// WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
// General Public License for more details.
//
// The passchk.js archive has a copy of the GNU General Public License,
// but if you did not get it, see <http://www.gnu.org/licenses/>
//
// passchk.js is available from http://rumkin.com/tools/password/passchk.php
//
// Javascript functions for the password checker form

var Common_Words = new Array();
var Frequency_Table = new Array();

// The compression algorithm is very basic - the first letter is upper case,
// and it means to copy X letters from the previous word.  A = 0, B = 1, etc.
// So, if I had "apple apricot banana", it would compress to
// "AappleCricotAbanana". 
function Parse_Common_Word()
{
   var i, c, word;
   
   i = 1;
   c = Common_List.substr(i, 1);
   while (c == c.toLowerCase() && i < Common_List.length)
   {
      i ++;
      c = Common_List.substr(i, 1);
   }
   
   word = Common_List.substr(0, i);
   Common_List = Common_List.substr(i, Common_List.length);
   
   if (word.substr(0, 1) == 'A')
   {
      word = word.substr(1, word.length);
   }
   else
   {
      i = word.charCodeAt(0) - 'A'.charCodeAt(0);
      word = Common_Words[Common_Words.length - 1].substr(0, i) +
         word.substr(1, word.length);
   }
   
   Common_Words[Common_Words.length] = word;
}

function Parse_Common()
{
   for (var i = 0; i < 100 && Common_List.length > 0; i ++)
   {
      Parse_Common_Word();
   }
   if (Common_List.length)
   {
      window.setTimeout('Parse_Common()', 20);
   }
   else
   {
      document.Common_Parsed = 1;
   }
}

// The frequency thing is a bit more interesting, but still not too complex.
// Each three letters are base-95 encoded number representing the chance that
// this combination comes next.  Subtract the value of ' ' from each of the
// three, then ((((first_value * 95) + second_value) * 95) + third_value) will
// give you the odds that this pair is grouped together.  The first is "  "
// (non-alpha chars), then " a", " b", etc. " y", " z", "a ", "aa", "ab", and
// so on.  If you decrypt the table successfully, you should see a really large
// number for "qu".
function Parse_Frequency_Token()
{
   var c;
   
   c = Frequency_List.charCodeAt(0) - ' '.charCodeAt(0);
   c /= 95;
   c += Frequency_List.charCodeAt(1) - ' '.charCodeAt(0);
   c /= 95;
   c += Frequency_List.charCodeAt(2) - ' '.charCodeAt(0);
   c /= 95;
   
   Frequency_List = Frequency_List.substr(3, Frequency_List.length);
   
   Frequency_Table[Frequency_Table.length] = c;
}


function Parse_Frequency()
{
   for (var i = 0; i < 100 && Frequency_List.length > 0; i ++)
   {
      Parse_Frequency_Token();
   }
   if (Frequency_List.length)
   {
      window.setTimeout('Parse_Frequency()', 20);
   }
   else
   {
      document.Frequency_Parsed = 1;
   }
}


function Get_Index(c)
{
   c = c.charAt(0).toLowerCase();
   if (c < 'a' || c > 'z')
   {
      return 0;
   }
   return c.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
}


function Get_Charset_Size(pass)
{
   var a = 0, u = 0, n = 0, ns = 0, r = 0, sp = 0, s = 0, chars = 0;
   
   for (var i = 0 ; i < pass.length; i ++)
   {
      var c = pass.charAt(i);
      
      if (a == 0 && 'abcdefghijklmnopqrstuvwxyz'.indexOf(c) >= 0)
      {
         chars += 26;
	 a = 1;
      }
      if (u == 0 && 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(c) >= 0)
      {
         chars += 26;
	 u = 1;
      }
      if (n == 0 && '0123456789'.indexOf(c) >= 0)
      {
         chars += 10;
	 n = 1;
      }
      if (ns == 0 && '!@#$%^&*()'.indexOf(c) >= 0)
      {
         chars += 10;
	 ns = 1;
      }
      if (r == 0 && "`~-_=+[{]}\\|;:'\",<.>/?".indexOf(c) >= 0)
      {
         chars += 22;
	 r = 1;
      }
      if (sp == 0 && c == ' ')
      {
         chars += 1;
	 sp = 1;
      }
      if (s == 0 && (c < ' ' || c > '~'))
      {
         chars += 32 + 128;
	 s = 1;
      }
   }
   
   return chars;
}


function Set_Text(s)
{
   var e;
   
   if (! document.getElementById)
   {
      return;
   }
   
   e = document.getElementById('passchk_result');
   if (! e)
   {
      return;
   }
   
   if (e.innerHTML == s)
   {
      return;
   }
   
   e.innerHTML = s;
}


var OldPass = -1;
function ShowStats()
{
   var pass = document.passchk_form.passchk_pass.value;
   var plower = pass.toLowerCase();
   var r = "";
   
   if (pass == OldPass)
   {
      window.setTimeout('ShowStats();', 200);
      return;
   }
   OldPass = pass;
   
   if (pass.length == 0)
   {
      Set_Text("Enter a password to see its strength.");
      window.setTimeout('ShowStats();', 200);
      return;
   }
   
   if (pass.length <= 4)
   {
      r += "<b>WARNING:  <font color=red>Very short password!</font></b><br>\n";
   }
   else if (pass.length < 8)
   {
      r += "<b>WARNING:</b>  <font color=red>Short password!</font><br>\n";
   }
   
   // First, see if it is a common password.
   for (var i = 0; i < Common_Words.length; i ++)
   {
      if (Common_Words[i] == plower)
      {
         i = Common_Words.length;
	 r += "<b>WARNING:  <font color=red>Common password!</font></b><br>\n";
      }
   }
   
   r += "<b>Length:</b>  " + pass.length + "<br>\n";
   
   // Calculate frequency chance
   if (pass.length > 1)
   {
      var c, aidx = 0, bits = 0, charSet;
      charSet = Math.log(Get_Charset_Size(pass)) / Math.log(2);
      aidx = Get_Index(plower.charAt(0));
      for (var b = 1; b < plower.length; b ++)
      {
	 var bidx = Get_Index(plower.charAt(b));
	 c = 1.0 - Frequency_Table[aidx * 27 + bidx];
	 bits += charSet * c * c;  // Squared = assmume they are good guessers
	 aidx = bidx;
      }
      
      if (bits < 28)
      {
         r += "<b>Strength:  <font color=red>Very Weak</font></b> - ";
	 r += "Try making your password longer, including CAPITALS, or ";
	 r += "adding symbols.<br>\n";
      }
      else if (bits < 36)
      {
         r += "<b>Strength:</b>  <font color=red>Weak</font> - ";
	 r += "Usually good enough for computer login passwords and to ";
	 r += "keep out the average person.<br>\n";
      }
      else if (bits < 60)
      {
         r += "<b>Strength:</b>  <font color=brown>Reasonable</font> - ";
	 r += "This password is fairly secure cryptographically and ";
	 r += "skilled hackers may need some good computing power to ";
	 r += "crack it.  (Depends greatly on implementation!)<br>\n";
      }
      else if (bits < 128)
      {
         r += "<b>Strength:</b>  <font color=green>Strong</font> - ";
	 r += "This password is typically good enough to safely guard ";
	 r += "sensitive information like financial records.<br>\n";
      }
      else
      {
         r += "<b>Strength:</b>  <font color=blue>Very Strong</font> - ";
	 r += "More often than not, this level of security is overkill.<br>\n";
      }
      r += "<b>Entropy:</b>  " + (Math.round(bits * 10) / 10) + " bits<br>\n";
      r += "<b>Charset Size:</b>  " + Get_Charset_Size(pass) + 
         " characters<br>\n";
   }
   
   Set_Text(r);
   
   window.setTimeout('ShowStats();', 200);
}


function CheckIfLoaded()
{
   var s = "";
   if (! document.Common_Loaded)
   {
      s += "Loading common passwords...<br>\n";
   }
   else if (! document.Common_Parsed)
   {
      if (! document.Common_Parsed_Started)
      {
         window.setTimeout('Parse_Common()', 50);
	 document.Common_Parsed_Started = 1;
      }
      s += "Parsing common passwords... " + 
         Common_List.length + "<br>\n";
   }
   if (! document.Frequency_Loaded)
   {
      s += "Loading letter frequency table...<br>\n";
   }
   else if (! document.Frequency_Parsed)
   {
      if (! document.Frequency_Parsed_Started)
      {
         window.setTimeout('Parse_Frequency()', 50);
	 document.Frequency_Parsed_Started = 1;
      }
      s += "Parsing frequency table... " + 
         Frequency_List.length + "<br>\n";
   }
   if (s != "")
   {
      Set_Text(s + "Loading ...");
      window.setTimeout('CheckIfLoaded()', 200);
      return;
   }
   
   // Loaded. Do initialization thingies.
   Set_Text("Finished Loading.");
   window.setTimeout('ShowStats();', 1000);
}

window.setTimeout('CheckIfLoaded()', 100);
