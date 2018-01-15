"use strict";

var config;

config = require("./acss-config.json");


/**
 * Adds a helper class to Atomizer for the styles used for the site theme.
 *
 * @param {string} name
 * @param {Object} styles
 * @throws {Error} When the styles argument is not an object
 */
function addStyle(name, styles) {
    if (!styles || typeof styles !== "object" || Array.isArray(styles)) {
        throw new Error("Styles is not an object.");
    }

    module.exports.push({
        type: "helper",
        id: name,
        name,
        matcher: name,
        noParams: true,
        styles
    });
}

module.exports = [];

addStyle("text-normal", {
    color: config.custom.textColorNormal,
    "font-family": "Arial, Helvetica Neue, Helvetica, sans-serif",
    "letter-spacing": ".05em"
});
addStyle("text-special", {
    "font-family": "Work Sans, Helvetica Neue, Helvetica, Arial, sans-serif",
    "font-weight": 400,
    "letter-spacing": ".025em"
});
addStyle("no-select", {
    "-webkit-touch-callout": "none",
    "-webkit-user-select": "none",
    "-khtml-user-select": "none",
    "-moz-user-select": "none",
    "-ms-user-select": "none",
    "user-select": "none"
});
addStyle("no-wrap", {
    "white-space": "nowrap"
});
