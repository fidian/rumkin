/**
 * Scoreboard System
 * Copyright 2013 Tyler Akins
 * http://rumkin.com/license/
 */
/*global angular*/
(function () {
    'use strict';

    var tallies, scores;

    // Add points for everyone in the order that the points were
    // received.
    tallies = [
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
        'Lady Z'];

    function countScores(tallies) {
        var talliesByName = {};

        // Count tallies
        tallies.forEach(function (val) {
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
        scores = [];
        Object.keys(talliesByName).forEach(function (val) {
            scores.push(val);
        });

        return scores;
    }

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

    scores = countScores(tallies);

    angular.module('scoreboard', []).directive("scoreboard", function () {
        return {
            link: function ($scope) {
                $scope.pickLink = function (n) {
                    $scope.top10 = false;
                    $scope.full = false;
                    $scope.name = false;
                    $scope[n] = true;
                };

                $scope.top10 = true;
                $scope.full = false;
                $scope.name = false;
                $scope.tallies = tallies;

                $scope.fullList = scores.sort(sortByCount).slice();
                $scope.top10List = $scope.fullList.slice(0, 10);
                $scope.nameList = scores.sort(sortByName).slice();
            }
        };
    });
}());
