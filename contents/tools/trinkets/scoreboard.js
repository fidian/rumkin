/**
 * Create a scoreboard
 *
 * Copyright 2012 Tyler Akins
 * http://rumkin.com/license.html
 *
 * Requires jQuery
 */
/*global window, module, jQuery, util*/
jQuery(function () {
	'use strict';

	var $ = jQuery;

	function scoreboard(target, tallies) {
		var i, talliesByName = {}, $menu, $content, $linkTop10, $linkFull, $linkAlpha;

		// Count tallies
		util.each(tallies, function (val) {
			if (!talliesByName[val]) {
				talliesByName[val] = {
					name: val,
					count: 1
				};
			} else {
				talliesByName[val].count += 1;
			}
		});

		// Convert to array
		tallies = [];
		util.each(talliesByName, function (val) {
			tallies.push(val);
		});

		function sortByCount(a, b) {
			if (a.count < b.count) {
				return 1;
			}

			if (a.count > b.count) {
				return -1;
			}

			return 0;
		}

		function sortByName(a, b) {
			if (a.name.toUpperCase() > b.name.toUpperCase()) {
				return 1;
			}

			if (a.name.toUpperCase() < b.name.toUpperCase()) {
				return -1;
			}

			return 0;
		}


		function switchTo($link) {
			if ($link.hasClass('scoreboard_active')) {
				return false;
			}

			$('.scoreboard_link.scoreboard_active').removeClass('scoreboard_active');
			$link.addClass('scoreboard_active');
			return true;
		}

		function displayList(type, list) {
			var i, $result;
			$result = $(type);
			util.each(list, function (val) {
				$result.append($('<li/>').text(val.name + ' = ' + val.count));
			});
			$content.append($result);
			$content.empty().append($result);
			return $result;
		}

		function top10() {
			var list, $result;

			if (switchTo($linkTop10)) {
				list = tallies.sort(sortByCount);
				list = list.slice(0, 10);
				$result = displayList('<ol/>', list);
				$result.addClass('scoreboard_top10');
			}

			return false;
		}

		function full() {
			var list;

			if (switchTo($linkFull)) {
				list = tallies.sort(sortByCount);
				displayList('<ol/>', list);
			}

			return false;
		}

		function alpha() {
			var list;

			if (switchTo($linkAlpha)) {
				list = tallies.sort(sortByName);
				displayList('<ul/>', list);
			}

			return false;
		}

		$linkTop10 = $('<span/>').click(top10).addClass('scoreboard_link').text('Top 10');
		$linkFull = $('<span/>').click(full).addClass('scoreboard_link').text('Full List');
		$linkAlpha = $('<span/>').click(alpha).addClass('scoreboard_link').text('By Name');
		$menu = $('<div/>').addClass('scoreboard_menu');
		$menu.append($linkTop10).append($linkFull).append($linkAlpha);
		$content = $('<div/>').addClass('scoreboard_content');
		$(target).append($menu).append($content);

		top10();
	}

	if (typeof module === 'object' && module.exports) {
		module.exports = scoreboard;
	}

	// Add points for everyone in the order that the points were
	// received.
	scoreboard('#scoreboard', [
		'15Tango',
		'Silent Bob',
		'arcticabn',
		'Kitch',
		'DragonSlay',
		'Vanman',
		'tomslusher',
		'Scott Johnson',
		'RINO SHAWN',
		'Moe the Sleaze', 'Silent Bob',
		// 10
		'KC0GRN',
		'timbrewlf',
		'Silent Bob',
		's4xton',
		'kc0kep',
		'QwertyToo',
		'SaeSew',
		'Astrogazer',
		'Cathunter',
		'Minnesota',
		// 20
		'JJJeffr',
		'Astrogazer',
		'kc0kep',
		'Reding',
		'Astrogazer',
		'Reding',
		'Vermadon',
		'TECGeoJim',
		'Ecorangers',  // Lowercase r
		'towlebooth',
		// 30
		'FSU*Noles',
		'DragonSlay',  // Removed the space
		'Paklid',
		'kleiner',
		'GustoBob', 'Paklid',
		'MN Lost Boy',
		'arcticabn',
		'Pto',
		'Pear Head',
		'TECGeoJim',
		// 40
		'Polar Express',
		'BB&D',
		'"Nic"',
		'teamvista',
		'Peter and Gloria',
		'Longway Lowing',
		'Minnesota',
		'Marsha', 'Silent Bob',  // Split them up
		'BB&D',
		'Jonas and Julia',
		// 50
		'Cross-Country',
		'TECGeoJim',
		'KC0GRN',
		'cfob',
		'Silent Bob',
		's4xton',
		'zoejam72',
		'KC0GRN',
		'KC0GRN',
		'sui generis',
		// 60
		'zoejam72',
		'Moe the Sleaze',  // Changed "The" to "the"
		'KC0GRN',
		's4xton',
		'kleiner',
		'towlebooth',
		'pogopod',
		'The Cow Spots',
		'rickrich',
		'rickrich',
		// 70
		'Team TACK',
		'rickrich',
		'zoejam72',
		'BB&D',
		'arcticabn',
		'Grey Wolf and Wild Rice',
		'Banana Force',
		'Irvingdog',
		'Grey Wolf and Wild Rice',
		'JoelCam',
		// 80
		'kmmnnd',
		'mucluck',
		'FSU*Noles', 'ArcticFox', 'OrangePeril',
		'gengen',
		'arcticabn',
		'rickrich',
		'rickrich',
		'KC0GRN',
		'mucluck',
		'Rubber Toes',
		// 90
		'whatsagps',
		'Minnesota',
		'Minnesota',
		'Minnesota',
		'Minnesota',
		'Minnesota',
		'team-deadhead',
		'spamhead',
		'Team TACK',
		'Hnts2Mch',
		// 100
		'Ramsey63',
		'dgauss',
		'Minnesota',
		'mucluck',
		'GSPr',
		'dachebo',
		'dachebo',
		'loneeagle_24',
		'Pike 1973',
		'media601',
		// 110
		'Marsha', 'Silent Bob',  // Split them up
		'EskoClimber',
		'Pear Head',
		'Team TACK',  // "Tack" changed into "TACK"
		'jREST',
		'TECGeoJim',
		'Vermadon',
		'Vermadon',
		'EskoClimber',  // No space
		'ka9tge',
		// 120
		'Pear Head',
		'lizs',
		'Winglady',
		'twras',
		'Kitch',
		'jimho',
		'motherhen647',
		'VectorHound',
		'Vermadon',
		'Wee Willy', 'Hikeaday',
		// 130
		'B3Fiend',
		'johnc98',
		'carcon',
		'cachemaster2000',
		'fireman121',
		'Oneied Cooky',
		'MNMizzou',
		'Vermadon',
		'spamhead',  // Lowercase s
		'spamhead',  // Lowercase s
		// 140
		'Zuma!',
		'jonsom',
		'tomslusher',
		'fireman121',
		'Zuma!',
		'Zuma!',
		'Zuma!',
		'Zuma!',
		'EskoClimber',
		'Pear Head',
		// 150
		'team-deadhead',
		'jREST',
		'TheGilby3',
		'CamoCacher',
		'fidian',
		'Posen',
		'bobcatw98',
		'fidian',
		'bflentje',
		'Ecorangers',
		// 160
		'Ecorangers',
		'fidian',
		'fidian',
		'fidian',
		'KC0GRN',
		'Korsikan',
		'Korsikan',
		'Korsikan',
		'Sokratz',
		'jREST',
		// 170
		'Sokratz',
		'Sokratz',
		'Scuba Al',
		'jambro',
		'pogopod',
		'acromander',
		'zoejam72',
		'rickrich',
		'arcticabn',  // Lowercase a
		'Team Dogs',
		// 180
		'Minnesota',
		'fishcachers',
		'kleiner',
		'Team Dogs',
		'Toby Tyler',
		'caverdoc',
		'caverdoc',
		'GeoPierce',
		'geomatrix',
		'doohickey',
		// 190
		'CamoCacher',
		'TeamVE',
		'PharmTeam',
		'Sokratz',
		'TheGilby3',
		'Lady Z']);
});
