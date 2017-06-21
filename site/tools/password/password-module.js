/* global angular */

"use strict";

angular.module("password", [
    "autoGrow",
    "random"
]).controller("password", ($http, $q, $scope, random) => {
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
    $scope.generatedPasswords = [];

    $q.all(promises).then(() => {
        $scope.dicewareWordlists.forEach((item) => {
            item.optionLabel = `${item.code} - ${item.description}`;
        });
        $scope.dicewareWordlist = $scope.dicewareWordlists.filter((item) => {
            return item.default;
        })[0];
        $scope.ready = true;
    });
    $scope.$watch("generateWith", () => {
        var hash, set;

        set = $scope.generateWith.other || "";

        if ($scope.generateWith.uppercase) {
            set += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        }

        if ($scope.generateWith.lowercase) {
            set += "abcdefghijklmnopqrstuvwxyz";
        }

        if ($scope.generateWith.numbers) {
            set += "0123456789";
        }

        if ($scope.generateWith.hex) {
            set += "0123456789ABCDEF";
        }

        if ($scope.generateWith.symbols) {
            set += "`~!@#$%^&*()-_=+[{]}\\|;:'\",<.>/?";
        }

        hash = {};
        set.split("").forEach((value) => {
            hash[value] = true;
        });
        $scope.generateSet = Object.keys(hash).sort().join("");
    }, true);
    $scope.generateNewPassword = () => {
        var index, pass;

        pass = "";

        while (pass.length < $scope.generatePasswordLength) {
            index = random.number($scope.generateSet.length);
            pass += $scope.generateSet[index];
        }

        $scope.generatedPasswords.unshift(pass);
    };
    $scope.preset = (size, options) => {
        $scope.generatePasswordLength = size;
        $scope.generateWith = {
            hex: !!options.hex,
            lowercase: !!options.lowercase,
            numbers: !!options.numbers,
            other: options.other || "",
            symbols: !!options.symbols,
            uppercase: !!options.uppercase
        };
    };
    $scope.preset(24, {
        lowercase: true,
        numbers: true,
        uppercase: true
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
}).directive("diceware", ($http, random) => {
    return {
        link($scope, element, $attrs) {
            var words;

            /**
             * Creates a new word and adds it to the result.
             */
            function addWord() {
                if ($scope.dicewareResult) {
                    $scope.dicewareResult += " ";
                }

                $scope.dicewareResult += words[random.number(words.length)];
            }


            $scope.dicewareReady = false;
            words = [];
            $scope.dicewareResult = "";
            $scope.$watch($attrs.diceware, (newVal) => {
                $scope.dicewareReady = false;
                $http.get(newVal.uri).then((response) => {
                    words = response.data.trim().split("\n");
                    $scope.dicewareReady = true;
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
