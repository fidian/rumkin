// Javascript functions for the form


var Diceware_Words = new Array();

function Parse_Word()
{
   var i, c, word;
   
   i = 1;
   c = Diceware_List.substr(i, 1);
   while (c == c.toLowerCase() && i < Diceware_List.length)
   {
      i ++;
      c = Diceware_List.substr(i, 1);
   }
   
   word = Diceware_List.substr(0, i);
   Diceware_List = Diceware_List.substr(i, Diceware_List.length);
   
   if (word.substr(0, 1) == 'A')
   {
      word = word.substr(1, word.length);
   }
   else
   {
      i = word.charCodeAt(0) - 'A'.charCodeAt(0);
      word = Diceware_Words[Diceware_Words.length - 1].substr(0, i) +
         word.substr(1, word.length);
   }
   
   Diceware_Words[Diceware_Words.length] = word;
}

function Parse_Diceware()
{
   for (var i = 0; i < 100 && Diceware_List.length > 0; i ++)
   {
      Parse_Word();
   }
   if (Diceware_List.length)
   {
      window.setTimeout('Parse_Diceware()', 20);
   }
   else
   {
      document.Diceware_Parsed = 1;
   }
}

function Set_Text(s)
{
   var e;
   
   if (! document.getElementById)
   {
      return;
   }
   
   e = document.getElementById('diceware_result');
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

var OldRolls = -1;
function ShowStats()
{
   var index = 0, good_digits = 0, rolls;
   var r = "";
   
   // Burn a random number
   Math.random();
   
   if (! document.diceware_form)
   {
      window.setTimeout('ShowStats();', 2000);
      return;
   }
   
   rolls = document.diceware_form.rolls.value;
   
   if (rolls == OldRolls)
   {
      window.setTimeout('ShowStats();', 200);
      return;
   }
   OldRolls = rolls;
   
   if (rolls.length == 0)
   {
      Set_Text("Enter your die rolls to see the passphrase.");
      window.setTimeout('ShowStats();', 200);
      return;
   }
   
   for (var i = 0; i < rolls.length; i ++)
   {
      var c = rolls.substr(i, 1);
      if (c >= '1' && c <= '6')
      {
         good_digits ++;
	 index *= 6;
	 index += c.charCodeAt(0) - '1'.charCodeAt(0);
	 
	 if (good_digits == 5)
	 {
	    r += " " + Diceware_Words[index]
	    good_digits = 0;
	    index = 0;
	 }
      }
   }
   
   Set_Text(r);
   
   window.setTimeout('ShowStats();', 200);
}

function GetRoll()
{
   return getRandomNumber(5) + 1;
}

function AddDieRolls()
{
   document.diceware_form.rolls.value += '' + GetRoll() +
      GetRoll() + GetRoll() + GetRoll() + GetRoll();
}

function CheckIfLoaded()
{
   var s = "";
   if (! document.Diceware_Loaded)
   {
      s += "Loading word list ...<br>\n";
   }
   else if (! document.Diceware_Parsed)
   {
      if (! document.Diceware_Parsed_Started)
      {
         window.setTimeout('Parse_Diceware()', 50);
	 document.Diceware_Parsed_Started = 1;
      }
      s += "Parsing word list ... " + 
         Diceware_List.length + "<br>\n";
   }
   if (s != "")
   {
      Set_Text(s + "Loading ...");
      window.setTimeout('CheckIfLoaded()', 200);
      return;
   }
   
   // Loaded. Do initialization thingies.
   if (document.diceware_form)
   {
      document.diceware_form.rolls.focus();
   }
   Set_Text("Finished Loading.");
   window.setTimeout('ShowStats();', 1000);
}

window.setTimeout('CheckIfLoaded()', 100);
