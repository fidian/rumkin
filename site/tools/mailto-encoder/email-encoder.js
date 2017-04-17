/* global angular */

"use strict";

angular.module("emailEncoder", []);

angular.module("emailEncoder").factory("emailEncoder", () => {
    /**
     * Encode something so it is safe in a URI.
     *
     * @param {string} input
     * @return {string}
     */
    function urlencode(input) {
        return encodeURI(input);
    }


    /**
     * Encode something so it is safe to display as HTML.
     *
     * @param {string} input
     * @return {string}
     */
    function htmlencode(input) {
        return angular.element("<pre/>").text(input).html();
    }


    /**
     * Shuffles and deduplicates the characters in the supplied string.
     *
     * Avoid PHP and ASP problems by putting the "<" character at the end.
     *
     * @param {string} input
     * @return {string}
     */
    function shuffleAndUnique(input) {
        var letters, lt;

        letters = "";
        lt = false;
        input.split("").forEach((letter) => {
            var index;

            if (letters.indexOf(letter) === -1) {
                if (letter === "<") {
                    lt = true;
                } else {
                    index = Math.floor(Math.random() * letters.length);
                    letters = letters.slice(0, index) + letter + letters.slice(index, letters.length);
                }
            }
        });

        if (lt) {
            letters += "<";
        }

        return letters;
    }


    /**
     * Encodes text as a bunch of indexes into a shuffled list of characters.
     *
     * @param {string} input
     * @return {string} output JavaScript
     */
    function shuffledEncode(input) {
        var indexes, shuffledLetters;

        shuffledLetters = shuffleAndUnique(input);
        indexes = "";
        input.split("").forEach((letter) => {
            indexes += String.fromCharCode(48 + shuffledLetters.indexOf(letter));
        });

        return `<script>ML=${angular.toJson(shuffledLetters)};
MI=${angular.toJson(indexes)};
OT="";for(j=0;j<MI.length;j++){
OT+=ML.charAt(MI.charCodeAt(j)-48);
}document.write(OT);</script>`;
    }


    /**
     * Generate link text. Supports "none" (to address only) and "html".
     *
     * @param {Object} encoderOpts
     * @return {string}
     */
    function makeLink(encoderOpts) {
        var query, url;

        if (encoderOpts.encoding === "none") {
            return encoderOpts.to;
        }

        url = urlencode(encoderOpts.to);
        query = [];

        if (encoderOpts.subject) {
            query.push(`subject=${urlencode(encoderOpts.subject)}`);
        }

        if (encoderOpts.cc) {
            query.push(`cc=${urlencode(encoderOpts.cc)}`);
        }

        if (encoderOpts.bcc) {
            query.push(`bcc=${urlencode(encoderOpts.bcc)}`);
        }

        if (encoderOpts.body) {
            query.push(`body=${urlencode(encoderOpts.body)}`);
        }

        if (query.length) {
            url += `?${query.join("&")}`;
        }

        return `<a href="mailto:${url}">${htmlencode(encoderOpts.linkText || "")}</a>`;
    }


    /**
     * Obfuscates the text using the given mechanism.
     *
     * @param {string} text
     * @param {Object} encoderOpts
     * @return {string}
     */
    function obfuscate(text, encoderOpts) {
        switch (encoderOpts.obfuscation) {
        case "break":
            return "TODO";

        case "double":
            return "TODO";

        case "shuffled":
            return shuffledEncode(text);

        default:
            return text;
        }
    }


    return (encoderOpts) => {
        return obfuscate(makeLink(encoderOpts), encoderOpts);
    };
});

angular.module("emailEncoder").directive("emailEncoderSimple", (emailEncoder) => {
    return {
        link: ($scope) => {
            /**
             * Encodes an email address and optionally a link text
             */
            function recode() {
                if ($scope.email) {
                    $scope.result = emailEncoder({
                        to: $scope.email,
                        encoding: "html",
                        linkText: $scope.text || $scope.email,
                        obfuscation: "shuffled"
                    });
                } else {
                    $scope.result = null;
                }
            }

            $scope.$watch("email", recode);
            $scope.$watch("text", recode);
        },
        scope: true
    };
});

angular.module("emailEncoder").directive("emailEncoderCustom", (emailEncoder) => {
    return {
        link: ($scope) => {
            /**
             * Encodes an email address and optionally a link text
             */
            function recode() {
                if ($scope.email) {
                    $scope.result = emailEncoder({
                        to: $scope.email,
                        cc: $scope.cc,
                        bcc: $scope.bcc,
                        subject: $scope.subject,
                        body: $scope.body,
                        encoding: $scope.encoding,
                        linkText: $scope.linkText,
                        obfuscation: $scope.obfuscation
                    });
                } else {
                    $scope.result = null;
                }
            }

            $scope.encoding = "html";
            $scope.obfuscation = "shuffled";
            [
                "email",
                "cc",
                "bcc",
                "subject",
                "body",
                "encoding",
                "linkText",
                "obfuscation"
            ].forEach((field) => {
                $scope.$watch(field, recode);
            });
        },
        scope: true
    };
});
