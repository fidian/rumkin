/* global m */

const AdvancedInputArea = require('../advanced-input-area');
const session = require('./session');

module.exports = class CryptogramStart {
    constructor() {
        this.input = {
            label: 'The cipher text to decode',
            value: session.cipherText
        };
    }

    view() {
        return [
            m('p', m(AdvancedInputArea, this.input)),
            m('p', m('button', {
                disabled: this.input.value.trim().length === 0,
                onclick: () => {
                    session.cipherText = this.input.value.trim();
                    m.route.set('/wordlist');
                }
            }, 'Next step'))
        ];
    }
};
