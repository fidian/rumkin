#!/usr/bin/env node

const classifications = {};
const blocks = require("ucd-full/Blocks.json");
const derivedCoreProperties = require("ucd-full/DerivedCoreProperties.json");
const scripts = require("ucd-full/Scripts.json");
const emojiData = require("ucd-full/emoji/emoji-data.json");

function addClassification(name, range) {
    if (!classifications[name]) {
        classifications[name] = [];
    }

    if (range.length === 1) {
        classifications[name].push(parseInt(range[0], 16));
    } else {
        const end = parseInt(range[1], 16);

        for (let n = parseInt(range[0], 16); n <= end; n += 1) {
            classifications[name].push(n);
        }
    }
}

function injest(arr, label, prop, skip) {
    for (const item of arr) {
        if (!skip.includes(item[prop])) {
            addClassification(
                `${label}: ${item[prop].replace(/_/g, " ")}`,
                item.range
            );
        }
    }
}

injest(blocks.Blocks, "Block", "block", []);
injest(scripts.Scripts, "Script", "script", []);
injest(derivedCoreProperties.DerivedCoreProperties, "Property", "property", [
    "Changes_When_Lowercased",
    "Changes_When_Uppercased",
    "Changes_When_Titlecased",
    "Changes_When_Casefolded",
    "Changes_When_Casemapped",
    "ID_Start",
    "ID_Contine",
    "XID_Start",
    "XID_Continue",
    "Default_Ignorable_Code_Point",
    "Grapheme_Extend",
    "Grapheme_Base",
    "Grapheme_Link"
]);
injest(emojiData["emoji-data"], "Emoji Data", "property", []);

const squashed = {};

for (const [k, v] of Object.entries(classifications)) {
    const ranges = [];
    v.sort((a, b) => a - b);

    for (const code of v) {
        if (ranges.length) {
            const prev = ranges[ranges.length - 1];

            if (prev[1] + 1 === code) {
                prev[1] = code;
            } else {
                ranges.push([code, code]);
            }
        } else {
            ranges.push([code, code]);
        }
    }

    squashed[k] = ranges.map((range) => {
        if (range[0] === range[1]) {
            return range[0];
        }

        return range;
    });
}

require("fs").writeFileSync(
    "character-properties.json",
    JSON.stringify(squashed)
);
