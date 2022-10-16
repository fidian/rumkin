/* global m */

const AdvancedInputArea = require("../advanced-input-area");
const Dropdown = require('../../../js/mithril/dropdown');
const LetterMapping = require("./letter-mapping");

module.exports = class Cryptogram {
    constructor() {
        this.input = {
            alphabet: this.alphabet,
            value: "",
            oninput: () => {
                this.buildLetterMaps();
            }
        };
        this.buildLetterMaps();
    }

    buildLetterMaps() {
        const oldLetterMaps = this.letterMaps || {};
        this.letterMaps = {};

        for (const letter of this.input.value.split('')) {
            if (!this.letterMaps[letter]) {
                if (oldLetterMaps[letter]) {
                    this.letterMaps[letter] = oldLetterMaps[letter];
                } else {
                    this.letterMaps[letter] = new LetterMapping(letter);
                }
            }
        }
    }

    isWhitespace(c) {
        return ' \n\r\t\v'.indexOf(c) >= 0;
    }

    view() {
        return [
            m(AdvancedInputArea, this.input),
            this.viewLetterMaps(),
            this.viewTranslation()
        ];
    }

    viewLetterMaps() {
        const sorted = Object.values(this.letterMaps).filter(a => {
            return !this.isWhitespace(a.from);
        }).sort((a, b) => {
            const aCode = a.from.charCodeAt(0);
            const bCode = b.from.charCodeAt(0);

            return aCode - bCode;
        });

        return m('div', {
            class: 'D(f) Fxw(w) Jc(c)'
        }, sorted.map((letterMapping) => {
            return this.viewLetterMap(letterMapping);
        }));
    }

    viewLetterMap(letterMapping) {
        return m('div', {
            class: `P(0.5em) Bdw(1px) D(f) Fxd(c) Ai(c) Fz(1.2em) M(0.5em) ${letterMapping.value}`
        }, [
            m('div', letterMapping.from),
            m('input', {
                type: 'text',
                class: 'W(2em) Ta(c) Fz(1.2em)',
                value: letterMapping.to,
                oninput: (e) => {
                    letterMapping.to = e.target.value;
                }
            }),
            m(Dropdown, letterMapping)
        ]);
    }

    viewTranslation() {
        return m('div', {
            class: 'D(f) Fxw(w) Jc(c)'
        }, this.input.value.split(/[ \t]/).map(w => this.viewTranslationWord(w)));
    }

    viewTranslationWord(w) {
        return m('div', {
            class: 'Mx(0.25em) D(f) My(0.1em)'
        }, w.split('').map(c => this.viewTranslationLetter(c)));
    }

    viewTranslationLetter(c) {
        const letterMapping = this.letterMaps[c];
        const to = letterMapping.to;

        if (to === '\r' || to === '\n' || to === '\v') {
            return m('div', {
                class: 'W(100%) H(0px)'
            });
        }

        return m('div', {
            class: 'D(f) Fxd(c) Ai(c)'
        }, [
            m('tt', c),
            m('tt', {
                class: `${letterMapping.value}`
            }, to)
        ]);
    }
};
