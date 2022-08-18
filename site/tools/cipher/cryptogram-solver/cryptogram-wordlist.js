/* global m */

const cryptogramShared = require('./cryptogram-shared');
const Dropdown = require('../../../js/mithril/dropdown');
const session = require('./session');
const wordlists = require('./wordlists');

module.exports = class CryptogramWordlist {
    constructor() {
        this.wordlists = {
            label: 'Wordlist',
            value: session.wordlist,
            options: {}
        };
        this.ready = false;

        if (!session.cipherText) {
            m.route.set("/");
        }

        wordlists.getWordlists().then((wordlistsMeta) => {
            const dest = this.wordlists.options;
            let first = null;
            let found = false;

            for (const wordlist of wordlistsMeta) {
                const fn = wordlist.filename;

                if (!first) {
                    first = fn;
                }

                if (fn === this.wordlists.value) {
                    found = true;
                }

                dest[fn] = `${wordlist.name}, ${wordlist.wordCount} words`;
            }

            if (!found) {
                this.wordlists.value = first;
            }

            this.ready = true;
        });
    }

    view() {
        return [
            cryptogramShared.viewCipherText(),
            m('p', this.viewWordlist()),
            m('p', this.viewButtons())
        ];
    }

    viewWordlist() {
        if (!this.ready) {
            return 'Loading list of wordlists';
        }

        return m(Dropdown, this.wordlists);
    }

    viewButtons() {
        return [
            m('button', {
                onclick: () => {
                    m.route.set('/');
                }
            }, 'Go back'),
            m('button', {
                disabled: !this.ready,
                onclick: () => {
                    session.wordlist = this.wordlists.value;
                    m.route.set('/solve');
                }
            }, 'Next step')
        ];
    }
};
