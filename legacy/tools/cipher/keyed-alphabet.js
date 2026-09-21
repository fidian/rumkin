/* global m, rumkinCipher */

const AlphabetSelector = require("./alphabet-selector");
const Checkbox = require("../../js/mithril/checkbox");
const keyAlphabet = require("./key-alphabet");
const TextInput = require("../../js/mithril/text-input");

/**
 * Attributes
 * @typedef KeyedAlphabetAttributes
 * @property {KeyedAlphabetOnchange} onchange
 * @property {string} alphabetKey
 * @property {boolean} keyAtEnd
 * @property {Alphabet} keyed The result of the keying
 * @property {boolean} reverseAlphabet
 * @property {boolean} reverseKey
 * @property {boolean} useLastInstance
 * @property {Alphabet} value
 */

/**
 * @callback KeyedAlphabetOnchange
 * @param {Event} event
 */

module.exports = class KeyedAlphabet {
    constructor(vnode) {
        const attrs = vnode.attrs;
        const update = (e) => {
            attrs.keyed = keyAlphabet(attrs);

            if (attrs.onchange) {
                return attrs.onchange(e);
            }

            return true;
        };
        this.initialize(attrs);
        this.alphabet = {
            onchange: (e) => {
                attrs.value = this.alphabet.value;

                return update(e);
            }
        };
        this.alphabetKey = {
            label: "Alphabet key",
            oninput: (e) => {
                attrs.alphabetKey = e.target.value;

                return update(e);
            }
        };
        this.useLastInstance = {
            label: "Use the last occurrence of a letter instead of the first",
            onchange: (e) => {
                attrs.useLastInstance = !attrs.useLastInstance;

                return update(e);
            }
        };
        this.reverseKey = {
            label: "Reverse the key before keying",
            onchange: (e) => {
                attrs.reverseKey = !attrs.reverseKey;

                return update(e);
            }
        };
        this.reverseAlphabet = {
            label: "Reverse the alphabet before keying",
            onchange: (e) => {
                attrs.reverseAlphabet = !attrs.reverseAlphabet;

                return update(e);
            }
        };
        this.keyAtEnd = {
            label: "Put the key at the end instead of the beginning",
            onchange: (e) => {
                attrs.keyAtEnd = !attrs.keyAtEnd;

                return update(e);
            }
        };
        this.checkValues(attrs);
    }

    initialize(attrs) {
        if (!attrs.value) {
            attrs.value = new rumkinCipher.alphabet.English();
        }

        if (!attrs.alphabetKey) {
            attrs.alphabetKey = "";
        }

        for (const prop of [
            "useLastInstance",
            "reverseKey",
            "reverseAlphabet",
            "keyAtEnd"
        ]) {
            attrs[prop] = !!attrs[prop];
        }
    }

    checkValues(attrs) {
        let changed = false;

        for (const [attrProp, classProp] of [
            ["value", "alphabet"],
            ["alphabetKey", "alphabetKey"],
            ["useLastInstance", "useLastInstance"],
            ["reverseKey", "reverseKey"],
            ["reverseAlphabet", "reverseAlphabet"],
            ["keyAtEnd", "keyAtEnd"]
        ]) {
            if (this[classProp].value !== attrs[attrProp]) {
                this[classProp].value = attrs[attrProp];
                changed = true;
            }
        }

        if (changed) {
            attrs.keyed = keyAlphabet(attrs);
        }
    }

    view(vnode) {
        const attrs = vnode.attrs;
        this.checkValues(attrs);

        return [
            m(AlphabetSelector, this.alphabet),
            m("br"),
            m(TextInput, this.alphabetKey),
            m("br"),
            m("label", [m(Checkbox, this.useLastInstance)]),
            m("br"),
            m("label", [m(Checkbox, this.reverseKey)]),
            m("br"),
            m("label", [m(Checkbox, this.reverseAlphabet)]),
            m("br"),
            m("label", [m(Checkbox, this.keyAtEnd)]),
            m("br"),
            "Resulting alphabet: ",
            this.viewAlphabet(attrs)
        ];
    }

    viewAlphabet(attrs) {
        return attrs.keyed.letterOrder.upper;
    }
};
