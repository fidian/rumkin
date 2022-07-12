/* global m, rumkinCipher */

const AlphabetSelector = require("./alphabet-selector");
const Checkbox = require("../../js/mithril/checkbox");
const TextInput = require("../../js/mithril/text-input");

// FIXME - add keymaker

module.exports = class KeyedAlphabet {
    constructor(vnode) {
        const attrs = vnode.attrs;

        if (!attrs.alphabet) {
            attrs.alphabet = new rumkinCipher.alphabet.English();
        }

        if (!attrs.alphabetKey) {
            attrs.alphabetKey = "";
        }

        const update = (e) => {
            this.value = attrs.value = attrs.alphabet.keyWord(attrs.alphabetKey, {
                useLastInstance: this.useLastInstance.value,
                reverseKey: this.reverseKey.value,
                reverseAlphabet: this.reverseAlphabet.value,
                keyAtEnd: this.keyAtEnd.value
            });

            if (attrs.onchange) {
                return attrs.onchange(e);
            }

            return true;
        };

        this.alphabet = {
            value: attrs.alphabet,
            onchange: (e) => {
                attrs.alphabet = this.alphabet.value;

                return update(e);
            }
        };
        this.alphabetKey = {
            label: "Alphabet key",
            value: attrs.alphabetKey,
            oninput: (e) => {
                attrs.alphabetKey = e.target.value;

                return update(e);
            }
        };
        this.useLastInstance = {
            label: "Use the last occurrence of a letter instead of the first",
            value: false,
            onchange: (e) => {
                return update(e);
            }
        };
        this.reverseKey = {
            label: "Reverse the key before keying",
            value: false,
            onchange: (e) => {
                return update(e);
            }
        };
        this.reverseAlphabet = {
            label: "Reverse the alphabet before keying",
            value: false,
            onchange: (e) => {
                return update(e);
            }
        };
        this.keyAtEnd = {
            label: "Put the key at the end instead of the beginning",
            value: false,
            onchange: (e) => {
                return update(e);
            }
        };
        update(null);
    }

    view() {
        return [
            m(AlphabetSelector, this.alphabet),
            m('br'),
            m(TextInput, this.alphabetKey),
            m('br'),
            m('label', [
                m(Checkbox, this.useLastInstance)
            ]),
            m('br'),
            m('label', [
                m(Checkbox, this.reverseKey)
            ]),
            m('br'),
            m('label', [
                m(Checkbox, this.reverseAlphabet)
            ]),
            m('br'),
            m('label', [
                m(Checkbox, this.keyAtEnd)
            ]),
            m('br'),
            'Resulting alphabet: ',
            this.viewAlphabet()
        ];
    }

    viewAlphabet() {
        return this.value.letterOrder.upper;
    }
};
