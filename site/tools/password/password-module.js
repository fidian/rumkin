/* global angular */

"use strict";

angular.module("password", [
    "autoGrow"
]).controller("password", ($http, $q, $scope) => {
    var promises;


    /**
     * Issues an AJAX request for a file, adding the file to the given
     * property on $scope.
     *
     * @param {string} property
     * @param {string} uri
     * @return {Promise.<*>}
     */
    function loadFile(property, uri) {
        return $http.get(uri).then((response) => {
            $scope[property] = response.data;
        });
    }

    $scope.ready = false;
    promises = [
        loadFile("dicewareWordlists", "diceware-wordlists.json"),
        loadFile("commonPasswords", "common-passwords.json"),
        loadFile("trigraphs", "trigraphs.json")
    ];

    $q.all(promises).then(() => {
        $scope.dicewareWordlists.forEach((item) => {
            item.optionLabel = `${item.code} - ${item.description}`;
        });
        $scope.dicewareWordlist = $scope.dicewareWordlists.filter((item) => {
            return item.default;
        })[0];
        $scope.ready = true;
    });
}).directive("passwordStrength", ($window) => {
    return {
        link($scope, element, $attrs) {
            var passwordStrength;

            passwordStrength = new $window.PasswordStrength();
            passwordStrength.addCommonPasswords($scope.commonPasswords);
            passwordStrength.addTrigraphMap($scope.trigraphs);
            $scope.$watch($attrs.passwordStrength, (newValue) => {
                if (newValue) {
                    $scope.strengthScore = passwordStrength.check(newValue);
                } else {
                    $scope.strengthScore = null;
                }
            });
        }
    };
}).directive("diceware", ($http) => {
    return {
        link($scope, element, $attrs) {
            var initialLoad, words;

            /**
             * Creates a new word and adds it to the result.
             */
            function addWord() {
                if ($scope.dicewareResult) {
                    $scope.dicewareResult += " ";
                }

                $scope.dicewareResult += words[Math.floor(Math.random() * words.length)];
            }


            $scope.dicewareReady = false;
            words = [];
            initialLoad = true;
            $scope.dicewareResult = "";
            $scope.$watch($attrs.diceware, (newVal) => {
                $scope.dicewareReady = false;
                $http.get(newVal.uri).then((response) => {
                    words = response.data.trim().split("\n");
                    $scope.dicewareReady = true;

                    if (initialLoad) {
                        addWord();
                        addWord();
                        addWord();
                        addWord();
                        addWord();
                        initialLoad = false;
                    }
                });
            });
            $scope.addWord = addWord;
            $scope.clear = () => {
                $scope.dicewareResult = "";
            };
        }
    };
}).directive("md5", ($window) => {
    return {
        link($scope, element, $attrs) {
            $scope.$watch($attrs.md5, (newValue) => {
                $scope.md5 = $window.md5(newValue);
            });
        }
    };
});
