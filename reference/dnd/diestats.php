<?php

include '../../functions.inc';
StandardHeader(array(
		'title' => 'Die Roll Stats',
		'topic' => 'dnd',
		'callback' => 'insert_js'
	));

?>

<p>I have often wondered the statistical differences between
<a href="#" onclick="SetRoll('2d6')">2d6</a> and
<a href="#" onclick="SetRoll('3d4')">3d4</a>.  They both have a maximum of
12, but both the minimums and the averages are higher with 3d4.  This is
especially applicable for character generation.  As a DM/GM/super-powerful
narrator, I decide how the characters get to roll up their attributes.  Do
they use <a href="#" onclick="SetRoll('3d6')">3d6</a> like 2nd edition, or
perhaps <a href="#" onclick="SetRoll('4d6D1')">4d6, dropping the lowest</a>?
My old method even let you <a href="#" onclick="SetRoll('4d5D1+3')">reroll
ones</a> and that left you with an even higher average with more of a
tendency of higher numbers.</p>

<p>I wrote this analyzer so you can see the differences between whatever
type of rolling method you pick.  I don't suggest you use a high number of
dice, otherwise it will take significantly longer to generate statistics.
My machine bombs out at about 10 dice.</p>

<p>Sample rolls for character generation:
<a href="#" onclick="SetRoll('3d6')">3d6</a>,
<a href="#" onclick="SetRoll('4d4+2')">4d4 + 2</a>,
<a href="#" onclick="SetRoll('6d3')">6d3</a>,
<a href="#" onclick="SetRoll('4d6D1')">4d6, drop lowest</a>,
<a href="#" onclick="SetRoll('4d5D1+3')">4d6, reroll 1s, drop lowest</a>
<form method="GET" action="#" onSubmit="return false;">
Dice Roll String:
<input type="text" name="dice" value="" onKeyUp="roll()" onChange="roll()"
id="rollString">
</form>
<p>Feel free to try out your own die rolling strings, like "5d4 + 3" or
"6d8".  The "d" must be lowercase.  To drop the lowest x dice, use an
uppercase D, like "4d6D1" means to roll 4d6 and drop the lowest 1 die.</p>
<script language="JavaScript">
document.getElementById('rollString').focus();
</script>
<div id="rollResults"></div>

<p>Besides the links above, I have also seen these ideas:</p>

<ul>
<li>4d6, drop lowest, reroll if max &lt; 14 or reroll if the sum of the
modifiers is &lt; 1
<li>5d6D2 (5d6, drop the two lowest rolls)
<li>Roll up 12 characters using the 3d6 method, then pick the best character
<li>Roll 3d6 six times, then pick the best result.  Roll each attribute in
order &ndash; do not assign numbers to stats as you see fit.
<li>Roll a pool of 12 scores using 3d6, pick the best 6 scores.
</ul>

<p>I have also been contacted about making some stats that would be useful for Legend of the Five Rings (L5R).  In there, you have a stat and a skill.  when you roll against that, you keep a number of 10-sided dice equal to your stat.  You can also "roll up" by rolling again when you roll a ten and adding the new roll to the ten.  You can continue rolling up as long as you keep rolling tens.</p>

<p>I wrote up a small <a href="dice/l5r.c">c program</a> to only do the rolling of 1-10 10 sided dice and keeping just the highest digit, then averaging the rolls.  Let me know if you would like alternate die roll stats and I will see what I can do to help out.</p>

<ol>
<li>Rolling 1d10, keeping the highest:  average roll of 5.5</li>
<li>Rolling 2d10, keeping the highest:  average roll of 7.15</li>
<li>Rolling 3d10, keeping the highest:  average roll of 7.975</li>
<li>Rolling 4d10, keeping the highest:  average roll of 8.4667</li>
<li>Rolling 5d10, keeping the highest:  average roll of 8.79175</li>
<li>Rolling 6d10, keeping the highest:  average roll of 9.021595</li>
<li>Rolling 7d10, keeping the highest:  average roll of 9.1919575</li>
<li>Rolling 8d10, keeping the highest:  average roll of 9.32268667</li>
<li>Rolling 9d10, keeping the highest:  average roll of 9.425695015</li>
<li>Rolling 10d10, keeping the highest:  average roll of 9.5085658075</li>
</ol>

<?php

StandardFooter();


function insert_js() {
	
	?>
<script language="JavaScript"
<!--

lastStr = false;
function roll() {
   var rollStr = document.getElementById('rollString').value;
   var out = '<b>Roll:</b> ' + rollStr + '<br>';
   
   if (lastStr == rollStr) {
      return;
   }
   lastStr = rollStr;
   var resultsDiv = document.getElementById('rollResults');
   
   rollData = parseStr(rollStr);
   
   if (typeof(rollData) != 'object') {
      out += rollData;
   } else {
      out += genStats(rollData);
      out += genTable(rollData);
   }
   
   resultsDiv.innerHTML = out;
}

function rollDice(times, dieMax) {
	var rolls = new Array();
	while (times --) {
		if (rolls.length == 0) {
			for (var die = 1; die <= dieMax; die ++) {
				var rollSet = new Array();
				rollSet.push(die);
				rolls[rolls.length] = rollSet;
			}
		} else {
			var newRolls = new Array();
			for (var die = 1; die <= dieMax; die ++) {
				for (var i in rolls) {
					var rollSet = rolls[i].slice();
					rollSet.push(die);
					newRolls[newRolls.length] = rollSet;
				}
			}
			rolls = newRolls;
		}
	}

	return rolls;
}

function dropDice(drop, rolls) {
	for (var i in rolls) {
		var rollSet = rolls[i];
		rollSet.sort(sortNumeric);
		var drops = drop;
		while (drops --) {
			rollSet.pop();
		}
		rolls[i] = rollSet;
	}
	return rolls;
}

function sortNumeric(a, b) {
	return (b * 1) - (a * 1);
}

function tallyResults(results, rolls, sign) {
	var newResults = new Array();
	for (var roll in rolls) {
		var rollSet = rolls[roll];
		var sum = 0;
		for (var i in rollSet) {
			sum += rollSet[i] * 1;
		}
		sum *= sign;
		for (var i in results) {
			var idx = (i * 1) + sum;
			if (newResults[idx]) {
				newResults[idx] += results[i];
			} else {
				newResults[idx] = results[i];
			}
		}
	}
	return newResults;
}

function parseStr(rollStr) {
	var results = new Array();

	rollStr = rollStr.replace(/[ \t]/, '');
	rollStr = rollStr.replace(/-/, '+-');
	rollStr = rollStr.split('+');
	results[0] = 1;
   
	while (rollStr.length) {
		var thisBit = rollStr.shift();
		var sign = 1;
		if (thisBit.slice(0, 1) == '-') {
			sign = -1;
			thisBit = thisBit.slice(1);
		}
		if (thisBit == '') {
			thisBit = '0';
		}
		if (thisBit.indexOf('d') < 0) {
			thisBit = parseInt(thisBit);
			if (results.length) {
				var newResults = new Array();
				for (var i in results) {
					newResults[(i * 1) + (sign * thisBit)] = results[i];
				}
				results = newResults;
			}
		} else {
			thisBit = thisBit.split('d');
			var times = thisBit[0] * 1;
			thisBit = thisBit[1].split('D');
			var dieMax = thisBit[0] * 1;
			var drop = thisBit[1] * 1;
			if (times < 1) {
				times = 1;
			}
			if (dieMax < 1) {
				dieMax = 1;
			}
			if (drop < 1) {
				drop = 0;
			}
			if (drop >= times) {
				drop = times - 1;
			}
	
			var rolls = rollDice(times, dieMax);
			if (drop) {
				rolls = dropDice(drop, rolls);
			}
			results = tallyResults(results, rolls, sign);
		}
	}

	if (results.length == 1 && results[0] == 1) {
		return '';
	}
	return results;
}

function genStats(rollData) {
   var min, max, count, sum, init = 0;
   for (var i in rollData) {
      var die = i * 1;
      var freq = rollData[i] * 1;
      if (! init) {
         init = 1;
	 min = die;
	 max = die;
	 count = freq;
	 sum = die * freq;
      } else {
         if (die < min) {
	    min = die;
	 }
	 if (die > max) {
	    max = die;
	 }
	 count += freq;
	 sum += (die * freq);
      }
   }
   var deviationSquareSum = 0;
   var avg = sum / count;
   for (var i in rollData) {
      var die = i * 1;
      var freq = rollData[i] * 1;
      var dev = die - avg;
      dev *= dev;
      deviationSquareSum += (dev * freq);
   }
   if (! init) {
      return;
   }
   var standardDeviation = Math.sqrt(deviationSquareSum / count);
   
   var out = '<b>Statistics</b>';
   out += '<br>Min: ' + min;
   out += '<br>Max: ' + max;
   out += '<br>Avg: ' + avg.toFixed(2);
   out += '<br>Std Dev: ' + standardDeviation.toFixed(3);
   
   return out;
}


function genTable(rollData) {
   var max = 0;
   var count = 0;
   var out = '';
   
   if (rollData.length == 0) {
      return '';
   }
   
   for (var i in rollData) {
      if (max < rollData[i]) {
      	 max = rollData[i];
      }
      count += rollData[i];
   }
   
   out = '<table border=1 cellpadding=0 cellspacing=2 width="100%">';
   out += "\n";
   out += '<tr><th>Roll</th><th>Freq</th><th>Prob</th>'
   out += '<th align="center">Bar</th></tr>';
   out += "\n";
   
   for (var i in rollData) {
      var wid = 100 * rollData[i] / max;
      wid = Math.ceil(wid);
      out += '<tr><td align="right" width="1%">' + i
      out += '</td><td align="right" width="1%">' + rollData[i]
      out += '</td><td align="right" width="1%">'
      out += (100 * rollData[i] / count).toFixed(1);
      out += '%</td><td valign="center">'
      out += '<div style="background-color: blue; width:' + wid
      out += '%; height: 0.8em">&nbsp;'
      out += '</div>';
      out += '</td></tr>'
      out += "\n";
   }
   
   out += '</table>';
   
   return out;
}

function SetRoll(txt) {
   document.getElementById('rollString').value = txt;
   roll();
}

// --></script>
<?php
}

