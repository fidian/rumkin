/* global document */

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
    const elem = document.createElement("pre");
    elem.innerText = input;

    return elem.innerHTML;
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
                letters =
                    letters.slice(0, index) +
                    letter +
                    letters.slice(index, letters.length);
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
function shuffledObfuscate(input) {
    var indexes, shuffledLetters;

    shuffledLetters = shuffleAndUnique(input);
    indexes = "";
    input.split("").forEach((letter) => {
        indexes += String.fromCharCode(48 + shuffledLetters.indexOf(letter));
    });

    return `<script>ML=${JSON.stringify(shuffledLetters)};
MI=${JSON.stringify(indexes)};
OT="";for(j=0;j<MI.length;j++){
OT+=ML.charAt(MI.charCodeAt(j)-48);
}document.write(OT);</script>`;
}

/**
 * Break the text up and write it with document.write.
 *
 * @param {string} input
 * @return {string}
 */
function breakObfuscate(input) {
    var arr, count;

    arr = [];

    while (input.length) {
        count = Math.floor(Math.random() * 6) + 1;
        arr.push(input.slice(0, count));
        input = input.slice(count, input.length);
    }

    return `<script>document.write(${JSON.stringify(arr)}.join())</script>`;
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

    const opts = encoderOpts.linkExtra ? `${encoderOpts.linkExtra} ` : '';

    return `<a ${opts}href="mailto:${url}">${htmlencode(
        encoderOpts.linkText || ""
    )}</a>`;
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
            return breakObfuscate(text);

        case "shuffled":
            return shuffledObfuscate(text);

        default:
            return text;
    }
}

module.exports = function emailEncoder(encoderOpts) {
    return obfuscate(makeLink(encoderOpts), encoderOpts);
};
