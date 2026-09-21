"use strict";

export default function (what, howMany) {
    let i = 0;
    let result = "";

    while (i < howMany) {
        result += what;
        i += 1;
    }

    return result;
};
