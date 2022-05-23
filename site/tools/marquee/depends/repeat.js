"use strict";

module.exports = function(what, howMany) {
    var i = 0, result = "";

    while (i < howMany) {
        result += what;
        i += 1;
    }

    return result;
};
