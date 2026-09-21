/* global m */

const Dropdown = require("../../js/mithril/dropdown");

/**
 * Attributes
 * @typedef TranspositionOperatingModeAttributes
 * @property {DirectionSelectorOnchange} onchange
 * @property {string} value 'NORMAL', 'MOVE_CAPS', 'ALL_CHARS'
 */

/**
 * @callback DirectionSelectionOnchange
 * @param {Event} event
 */

module.exports = class DirectionSelector {
    constructor(vnode) {
        const attrs = vnode.attrs;

        if (!attrs.value) {
            attrs.value = "NORMAL";
        }

        this.operatingMode = {
            options: {
                NORMAL: "Move only letters, keep capitalization in-place",
                MOVE_CAPS: "Move only letters, move capitalization with the letter",
                ALL_CHARS: "Move spaces, punctuation, and move capitalization"
            },
            label: "Transposition Operating mode",
            value: attrs.value,
            onchange: (e) => {
                attrs.value = this.operatingMode.value;

                if (attrs.onchange) {
                    return attrs.onchange(e);
                }

                return true;
            }
        };
    }

    view(vnode) {
        if (this.operatingMode.value !== vnode.attrs.value) {
            this.operatingMode.value = vnode.attrs.value;
        }

        return m(Dropdown, this.operatingMode);
    }
};
