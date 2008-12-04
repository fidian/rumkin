<?php

include '../../functions.inc';
StandardHeader(array(
		'title' => 'Scoreboard',
		'topic' => 'trinkets',
		'callback' => 'insert_js'
	));

?>
<p><font style="font-size: 1.7em; font-weight: bold">King Boreas' Hall of 
Fame</font><br>
<font style="font-size: 0.8em">Last Updated:
June 1<sup>st</sup>, 2006 with number 194</font></p>

<p><a
href="http://www.geocaching.com/profile/?guid=3434ebbf-7b30-42c0-a876-24249b7c495e">King
Boreas</a> has a <a
href="http://websports.8m.com/HTML/hall_of_fame-maintenance.html">scoreboard</a>
that lists people who have helped him out with his various <a
href="http://www.geocaching.com/">geocaches</a>.  He modeled it after the <a
href="http://www.9key.com/hall_of_fame.asp">9Key Hall of Fame</a>, but he
didn't have that cool image thing at the bottom, so I decided to see if I
could write something similar without using any images.  If anyone wants
to use this, feel free!</p>

<div id=scoreboard class=scoreboard></div>
	
<?php

StandardFooter();


function insert_js() {
	
	?>
<script language=JavaScript src="scoreboard.js"></script>
<script language=JavaScript>
AddPoint('15Tango');
AddPoint('Silent Bob');
AddPoint('arcticabn');
AddPoint('Kitch');
AddPoint('DragonSlay');
AddPoint('Vanman');
AddPoint('tomslusher');
AddPoint('Scott Johnson');
AddPoint('RINO SHAWN');
AddPoint('Moe the Sleaze');  AddPoint('Silent Bob');
// 10
AddPoint('KC0GRN');
AddPoint('timbrewlf');
AddPoint('Silent Bob');
AddPoint('s4xton');
AddPoint('kc0kep');
AddPoint('QwertyToo');
AddPoint('SaeSew');
AddPoint('Astrogazer');
AddPoint('Cathunter');
AddPoint('Minnesota');
// 20
AddPoint('JJJeffr');
AddPoint('Astrogazer');
AddPoint('kc0kep');
AddPoint('Reding');
AddPoint('Astrogazer');
AddPoint('Reding');
AddPoint('Vermadon');
AddPoint('TECGeoJim');
AddPoint('Ecorangers');  // Lowercase r
AddPoint('towlebooth');
// 30
AddPoint('FSU*Noles');
AddPoint('DragonSlay');  // Removed the space
AddPoint('Paklid');
AddPoint('kleiner');
AddPoint('GustoBob');  AddPoint('Paklid');
AddPoint('MN Lost Boy');
AddPoint('arcticabn');
AddPoint('Pto');
AddPoint('Pear Head');
AddPoint('TECGeoJim');
// 40
AddPoint('Polar Express');
AddPoint('BB&D');
AddPoint('"Nic"');
AddPoint('teamvista');
AddPoint('Peter and Gloria');
AddPoint('Longway Lowing');
AddPoint('Minnesota');
AddPoint('Marsha');  AddPoint('Silent Bob');  // Split them up
AddPoint('BB&D');
AddPoint('Jonas and Julia');
// 50
AddPoint('Cross-Country');
AddPoint('TECGeoJim');
AddPoint('KC0GRN');
AddPoint('cfob');
AddPoint('Silent Bob');
AddPoint('s4xton');
AddPoint('zoejam72');
AddPoint('KC0GRN');
AddPoint('KC0GRN');
AddPoint('sui generis');
// 60
AddPoint('zoejam72');
AddPoint('Moe the Sleaze');  // Changed "The" to "the"
AddPoint('KC0GRN');
AddPoint('s4xton');
AddPoint('kleiner');
AddPoint('towlebooth');
AddPoint('pogopod');
AddPoint('The Cow Spots');
AddPoint('rickrich');
AddPoint('rickrich');
// 70
AddPoint('Team TACK');
AddPoint('rickrich');
AddPoint('zoejam72');
AddPoint('BB&D');
AddPoint('arcticabn');
AddPoint('Grey Wolf and Wild Rice');
AddPoint('Banana Force');
AddPoint('Irvingdog');
AddPoint('Grey Wolf and Wild Rice');
AddPoint('JoelCam');
// 80
AddPoint('kmmnnd');
AddPoint('mucluck');
AddPoint('FSU*Noles');  AddPoint('ArcticFox');  AddPoint('OrangePeril');
AddPoint('gengen');
AddPoint('arcticabn');
AddPoint('rickrich');
AddPoint('rickrich');
AddPoint('KC0GRN');
AddPoint('mucluck');
AddPoint('Rubber Toes');
// 90
AddPoint('whatsagps');
AddPoint('Minnesota');
AddPoint('Minnesota');
AddPoint('Minnesota');
AddPoint('Minnesota');
AddPoint('Minnesota');
AddPoint('team-deadhead');
AddPoint('spamhead');
AddPoint('Team TACK');
AddPoint('Hnts2Mch');
// 100
AddPoint('Ramsey63');
AddPoint('dgauss');
AddPoint('Minnesota');
AddPoint('mucluck');
AddPoint('GSPr');
AddPoint('dachebo');
AddPoint('dachebo');
AddPoint('loneeagle_24');
AddPoint('Pike 1973');
AddPoint('media601');
// 110
AddPoint('Marsha');  AddPoint('Silent Bob');  // Split them up
AddPoint('EskoClimber');
AddPoint('Pear Head');
AddPoint('Team TACK');  // "Tack" changed into "TACK"
AddPoint('jREST');
AddPoint('TECGeoJim');
AddPoint('Vermadon');
AddPoint('Vermadon');
AddPoint('EskoClimber');  // No space
AddPoint('ka9tge');
// 120
AddPoint('Pear Head');
AddPoint('lizs');
AddPoint('Winglady');
AddPoint('twras');
AddPoint('Kitch');
AddPoint('jimho');
AddPoint('motherhen647');
AddPoint('VectorHound');
AddPoint('Vermadon');
AddPoint('Wee Willy');  AddPoint('Hikeaday');
// 130
AddPoint('B3Fiend');
AddPoint('johnc98');
AddPoint('carcon');
AddPoint('cachemaster2000');
AddPoint('fireman121');
AddPoint('Oneied Cooky');
AddPoint('MNMizzou');
AddPoint('Vermadon');
AddPoint('spamhead');  // Lowercase s
AddPoint('spamhead');  // Lowercase s
// 140
AddPoint('Zuma!');
AddPoint('jonsom');
AddPoint('tomslusher');
AddPoint('fireman121');
AddPoint('Zuma!');
AddPoint('Zuma!');
AddPoint('Zuma!');
AddPoint('Zuma!');
AddPoint('EskoClimber');
AddPoint('Pear Head');
// 150
AddPoint('team-deadhead');
AddPoint('jREST');
AddPoint('TheGilby3');
AddPoint('CamoCacher');
AddPoint('fidian');
AddPoint('Posen');
AddPoint('bobcatw98');
AddPoint('fidian');
AddPoint('bflentje');
AddPoint('Ecorangers');
// 160
AddPoint('Ecorangers');
AddPoint('fidian');
AddPoint('fidian');
AddPoint('fidian');
AddPoint('KC0GRN');
AddPoint('Korsikan');
AddPoint('Korsikan');
AddPoint('Korsikan');
AddPoint('Sokratz');
AddPoint('jREST');
// 170
AddPoint('Sokratz');
AddPoint('Sokratz');
AddPoint('Scuba Al');
AddPoint('jambro');
AddPoint('pogopod');
AddPoint('acromander');
AddPoint('zoejam72');
AddPoint('rickrich');
AddPoint('arcticabn');  // Lowercase a
AddPoint('Team Dogs');
// 180
AddPoint('Minnesota');
AddPoint('fishcachers');
AddPoint('kleiner');
AddPoint('Team Dogs');
AddPoint('Toby Tyler');
AddPoint('caverdoc');
AddPoint('caverdoc');
AddPoint('GeoPierce');
AddPoint('geomatrix');
AddPoint('doohickey');
// 190
AddPoint('CamoCacher');
AddPoint('TeamVE');
AddPoint('PharmTeam');
AddPoint('Sokratz');

ScoreboardSetup('scoreboard');
</script>
<link rel="stylesheet" type="text/css" href="scoreboard.css">
<?php
}

