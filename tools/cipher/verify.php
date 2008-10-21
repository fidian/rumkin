<?PHP

include '../../functions.inc';

$GLOBALS['Tests'] = array(
   'Base64 Encode' => array('"MTIzIFRlc3Rpbmc="',
      'Base64(1, "123 Testing")'),
   'Base64 Decode' => array('"Pari"',
      'Base64(-1, "UGFyaQ==")'),
			  
   'Bifid Encode' => array('"AABO"',
      'Bifid(1, "ABCD")'),
   'Bifid Keyed Encode' => array('"UAEO lw rins"',
      'Bifid(1, "FLEE at once", "J", "I", "BGWKZQPNDSIOAXEFCLUMTHYVR")'),
   'Bifid Decode' => array('"secretmessage"',
      'Bifid(-1, "qddltbcxkrxlk")'),
   'Bifid Keyed Decode' => array('"THISI SMYSE CRETM ESSAG E"',
      'Bifid(-1, "TIIUS CNMIY NAEOW FIVSE P", "Q", "O", "TXVHRLKMUPNZOJECGWYAFBSDI")'),

   'Caesar Encode (4)' => array('"Xiwxmrk EFGHIJKlmnopqrSTUVWXYzabcd 12345"',
      'Caesar(1, "Testing ABCDEFGhijklmnOPQRSTUvwxyz 12345", 4)'),
   'Caesar Encode (13)' => array('"Oruvaq Gur 37gu Gerr"',
      'Caesar(1, "Behind The 37th Tree", 13)'),
   'Caesar Keyed Encode (8)' => array('"Ekttwc Bapire"',
      'Caesar(1, "Yellow Sticky", 8, "Bananas")'),
   'Caesar Decode (7)' => array('"Testing 123"',
      'Caesar(-1, "Alzapun 123", 7)'),
   'Caesar Decode (13)' => array('"turn the crank"',
      'Caesar(-1, "ghea gur penax", 13)'),
   'Caesar Keyed Decode (14)' => array('"Iusnrvzfov P.X."',
      'Caesar(-1, "Washington D.C.", 14, "Rhode Island")'),
   
   'Columnar Transposition (1 4 2 5 3)' => array('"TspsiSeaImeehAlssaMg"',
      'ColTrans(1, "ThisIsASampleMessage", "1 4 2 5 3")'),
   'Columnar Transposition (1 2 3)' => array('"Ttg 3ei 2.sn1 "',
      'ColTrans(1, "Testing 1 2 3.", "1 2 3")'),
   'Columnar Detransposition (4 2 5 3 1)' => array('"WHICHWRISTWATCHESARESWISSWRISTWATCHES"',
      'ColTrans(-1, "HTHESTHHRASWRASCSCRSSCWWWESWWEIITAIIT", "4 2 5 3 1")'),
   'Columnar Detransposition (1 2 3 4)' => array('"companyhasreachedprimarygoal"',
      'ColTrans(-1, "ahgarydahplpcyneocrmsimaroea", "7 10 9 5 1 6 3 4 2 8")'),
   
   'Friedman I.C.' => array('26',
      'Friedman("aa", "ABCDEFGHIJKLMNOPQRSTUVWXYZ")'),
   'Friedman I.C.' => array('5.2',
      'Friedman("moose moose", "ABCDEFGHIJKLMNOPQRSTUVWXYZ")'),

   'One Time Pad Encrypt' => array('"15 Qzxgemx Iq Juy"',
      'OneTimePad(1, "15 Bottles Of Rum", "Plentiful Sam")'),
   'One Time Pad Decrypt' => array('"Qpetialhdr"',
      'OneTimePad(-1, "Ramshackle", "Blizzarding")'),
      
   'Playfair Encrypt' => array('"KCNVMPPOABOCFQNV"',
      'Playfair(1, "HELXLOONEANDALLX")'),
   'Playfair Keyed Encrypt' => array('"BmndZbxDkybEjVdmUixMmNuvif"',
      'Playfair(1, "HideTheGoldInTheTreXeStump", "Q", "O", "playfair example")'),
   'Playfair Decrypt' => array('"SillyMeX"',
      'Playfair(-1, "ThssxOcZ", "N", "M")'),
   'Playfair Keyed Decrypt' => array('"PT BOAT ONE OWE NINE LOST"',
      'Playfair(-1, "KX JEYU REB EZW EHEW RYTU", "J", "I", "Royal New Zealand Navy")'),
      
   'Railfence Encrypt (3,0)' => array('"WlFBktafe o rafsfsrea"',
      'Railfence(1, "Waffles For Breakfast", 3, 0)'),
   'Railfence Encrypt (5,6)' => array('"ttaAsrEteaMRutyn"',
      'Railfence(1, "EatAtMyRestraunt", 5, 6)'),
   'Railfence Decrypt (4,0)' => array('"railfence"',
      'Railfence(-1, "rnaecifel", 4, 0)'),
   'Railfence Decrypt (2,1)' => array('"Wandering Moose"',
      'Railfence(-1, "adrn osWneigMoe", 2, 1)'),
   'Railfence Decrypt (5,6)' => array('"EatAtMyRestraunt"',
      'Railfence(-1, "ttaAsrEteaMRutyn", 5, 6)'),

   'Rotate Encode' => array('"chmbglafk"',
      'Rotate(1, "abcfghklm", 3)'),
   'Rotate Decode' => array('"tTXeXs"',
      'Rotate(-1, "Test", 3)'),

   'Skip Encode (1,0)' => array('"Hello Baby"',
      'Skip(1, "Hello Baby", 1, 0)'),
   'Skip Encode (3,5)' => array('"b lyBlHaoe"',
      'Skip(1, "Hello Baby", 3, 6)'),
   'Skip Encode (8,8)' => array('"lacizziuQ"',
      'Skip(1, "Quizzical", 8, 8)'),
   'Skip Decode (1,0)' => array('"Hello Baby"',
      'Skip(-1, "Hello Baby", 1, 0)'),
   'Skip Decode (3,5)' => array('"Hello Baby"',
      'Skip(-1, "b lyBlHaoe", 3, 6)'),
   'Skip Decode (8,8)' => array('"lacizziuQ"',
      'Skip(-1, "Quizzical", 8, 8)'),

   'Ubchi Encode' => array('"BBononiZooigg"',
      'Ubchi(1, "BoingoBoingo", "Wallace", "ahpla")'),
   'Ubchi Decode' => array('"FirstArmyXPlanFiveActivatedXCrossMarneAtSetHour"',
      'Ubchi(-1, "rArHZiAdareiosauFrtmltvteCnMtXsStoeersXAyvnciPaF", "herrschaft", "alpha")'),

   'Vigenere Encrypt (Simple)' => array('"Vhaz Ks Uvql."',
      'Vigenere(1, "This Is Cool.", "Cash")'),
   'Vigenere Encrypt (Autokey)' => array('"IymMykhriyWtbLiSueqXmnzZlcmglmm"',
      'Vigenere(1, "TheAutokeyCanBeUsedWithVigenere", "PRIMER", "", 1)'),
   'Vigenere Encrypt (Keyed)' => array('"Rf Gsd qla Dkhb"',
      'Vigenere(1, "Mr Pig and Toto", "porky", "Samuel")'),
   'Vigenere Decrypt (Simple)' => array('"hereishowitworks"',
      'Vigenere(-1, "citxwjcsybhnjvml", "vector")'),
   'Vigenere Decrypt (Autokey)' => array('"DEATH TOSAT ANIST S"',
      'Vigenere(-1, "GSOFK XOLHM OFILT F", "doom", "", 1)'),
   'Vigenere Decrypt (Keyed)' => array('"BETWEENSUBTLESHADINGANDTHEABSENC"',
      'Vigenere(-1, "EMUFPHZLRFAXYUSDJKZLDKRNSHGNFIVJ", "palimpsest", "kryptos")'),
);
   

StandardHeader(array('title' => 'Cipher Tools',
		     'topic' => 'cipher',
		     'callback' => 'insert_js'));

?>

<p>This page merely performs a test of all of the algorithms with known
results.  It is used to make sure that any changes I make do not invalidate
the algorithm.</p>

<div id=result></div>
<?PHP

StandardFooter();


function insert_js()
{
   foreach (array('base64', 'bifid', 'caesar', 'coltrans', 'otp', 'playfair',
		  'railfence', 'rotate', 'skip', 'ubchi', 'util', 
		  'vigenere') as $F)
   {
      echo '<script language=JavaScript src="js/' . $F . ".js\"></script>\n";
   }
?><script language="JavaScript"><!--

function start()
{
   var e, s = '';
   
   e = document.getElementById('result');
   if (! e)
   {
      window.setTimeout('start()', 100);
      return;
   }
   
<?PHP
   foreach (array('Base64', 'Bifid', 'Caesar', 'ColTrans', 
		  'OneTimePad', 'Playfair',
                  'Railfence', 'Rotate', 'Skip', 'Ubchi', 
		  'Util', 'Vigenere') as $F)
   {
      echo '   if (! document.' . $F . 
         '_Loaded) s += "Loading ' . $F . ' ...<br>\\n";' . "\n";
   }
?>

   if (s != '')
   {
      e.innerHTML = s;
      window.setTimeout('start()', 100);
      return;
   }
   
   e.innerHTML = 'Running Commands';
   
   s = "<table cellpadding=3 cellspacing=0 border=1>\n";

<?PHP
   foreach ($GLOBALS['Tests'] as $n => $t)
   {
?>
   if (<?= $t[0] ?> == <?= $t[1] ?>)
   {	
      s += "<tr bgcolor=#BBFFBB><th><?= $n 
         ?></th><td align=center>Pass</td></tr>\n";
   }	
   else
   {	
      s += "<tr bgcolor=#FFBBBB><th><?= $n
         ?></th><td align=center>FAIL -- Want : <b>" + <?= $t[0] 
	 ?> + "</b><br>Got : <b>" + <?= $t[1] ?> + "</b></td></tr>\n";
   }
<?PHP
   }
?>
   
   s += "</table>";
   
   e.innerHTML = s;
}

window.setTimeout('start()', 100);

// --></script>
<?PHP
}
