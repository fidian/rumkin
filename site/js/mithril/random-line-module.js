/* global window */

/* Set up a Mithril module that will read a text file and return a random line.
 *
 * In metadata:
 *
 *     js:
 *         - ../../js/mithril/random-line-module
 *     components:
 *         -
 *             className: module
 *             component: RandomLine
 *         -
 *             className: control
 *             component: RandomLineController
 *
 * In HTML:
 *
 *     <div class="module" text-file="./file-with-lines.txt"></div>
 *     <div class="control" label="Get another random line"></div>
 */

"use strict";

window.randomLineTriggers = [];
window.RandomLine = require("./random-line");
window.RandomLineController = require("./random-line-controller");
