// The Quagmire page's own code, lifted out of the page it used to sit
// inline in.
//
// This code was written by Tyler Akins and placed in the public domain.
// It would be nice if you left this header intact.  http://rumkin.com


function start_update()
{
   if (! document.getElementById)
   {
      alert('Sorry, you need a newer browser.');
      return;
   }

   if ((! document.Quagmire_Loaded) || (! document.Util_Loaded) ||
       (! document.Keymaker_Loaded) ||
       (! document.getElementById('output')))
   {
      window.setTimeout('start_update()', 100);
      return;
   }
   Keymaker_Start();
   upd();
}


function upd()
{
   var e, plainkeyunchanged;
   
   plainkeyunchanged = IsUnchanged(document.encoder.plainKey);
   cipherkeyunchanged = IsUnchanged(document.encoder.cipherKey);
   biasunchanged = IsUnchanged(document.encoder.biasTableau);
   passunchanged = IsUnchanged(document.encoder.pass);
   alignunchanged = IsUnchanged(document.encoder.passAlign);
   
   if (plainkeyunchanged * cipherkeyunchanged * 
       IsUnchanged(document.encoder.text) *
       IsUnchanged(document.encoder.encdec) *
       passunchanged * biasunchanged * alignunchanged)
   {
      window.setTimeout('upd()', 200);
      return;
   }
	
   ResizeTextArea(document.encoder.text);
   
   if (! plainkeyunchanged)
   {
      e = document.getElementById('plainAlphabet');
      e.innerHTML = MakeKeyedAlphabet(document.encoder.plainKey.value);
   }

   if (! cipherkeyunchanged)
   {
      e = document.getElementById('cipherAlphabet');
      e.innerHTML = MakeKeyedAlphabet(document.encoder.cipherKey.value);
   }

   if (! plainkeyunchanged || ! cipherkeyunchanged || ! biasunchanged || ! passunchanged || ! alignunchanged)
   {
      e = document.getElementById('tableau');
      e.innerHTML = (document.encoder.biasTableau.checked ?
         BuildTableau(document.encoder.plainKey.value, document.encoder.cipherKey.value, document.encoder.passAlign.value, document.encoder.pass.value) :
         BuildTableau(document.encoder.plainKey.value, document.encoder.cipherKey.value, document.encoder.passAlign.value) );
   }

   e = document.getElementById('output');
   
   if (document.encoder.text.value == '')
   {
      e.innerHTML = 'Type in a message and see the results here!';
   }
   else
   {
      e.innerHTML = SwapSpaces(HTMLEscape(Quagmire(document.encoder.encdec.value * 1, 
         document.encoder.text.value, document.encoder.pass.value, document.encoder.passAlign.value, 
	 document.encoder.plainKey.value, document.encoder.cipherKey.value)));
   }
   window.setTimeout('upd()', 200);
}


toggle = 0;
function ToggleTableau()
{
   var Link, Vis;
   
   if (toggle == 0)
   {
      toggle = 1;
      Link = "Hide Tableau";
      Vis = "block";
   }
   else
   {
      toggle = 0;
      Link = "Show Tableau";
      Vis = "none";
   }
   
   e = document.getElementById('tableau_link');
   e.innerHTML = Link;
   
   e = document.getElementById('tableau');
   e.style.display = Vis;
}

function fill_q1()
{
   document.encoder.encdec.value = -1;
   document.encoder.plainKey.value = "SPRINGFEVER";
   document.encoder.cipherKey.value = "";
   document.encoder.pass.value = "FLOWER";
   document.encoder.passAlign.value = "A";
   document.encoder.text.value = "QPMGQRBUJUYIFDMPYAIFQYYJJJHJYCJLUUTPIDVWYMFSGAESDWHIZRBLIRVCFCZPELBPZYYJJJHWLJJLPUP";
}

function fill_q2()
{
   document.encoder.encdec.value = -1;
   document.encoder.plainKey.value = "";
   document.encoder.cipherKey.value = "SPRINGFEVER";
   document.encoder.pass.value = "FLOWER";
   document.encoder.passAlign.value = "A";
   document.encoder.text.value = "JICICOSLYKILFVCHEBDXCCORJIOEWAFMWKKTXBGWHRJIBKEDBJWZABUXWHEHUXOXCU";
}

function fill_q3()
{
   document.encoder.encdec.value = -1;
   document.encoder.plainKey.value = "AUTOMOBILE";
   document.encoder.cipherKey.value = "AUTOMOBILE";
   document.encoder.pass.value = "HIGHWAY";
   document.encoder.passAlign.value = "A";
   document.encoder.text.value = "KRSLWMITJDVIABMRGQMTMLLIVIFUIXRHTNYONVRHHIIIRMCAOVEI.";
}

function fill_q4()
{
   document.encoder.encdec.value = -1;
   document.encoder.plainKey.value = "SENSORY";
   document.encoder.cipherKey.value = "PERCEPTION";
   document.encoder.pass.value = "EXTRA";
   document.encoder.passAlign.value = "S";
   document.encoder.text.value = "VBMRFCYISPMPBRRHEICXRREIGDX.";
}

window.setTimeout('start_update()', 100);

