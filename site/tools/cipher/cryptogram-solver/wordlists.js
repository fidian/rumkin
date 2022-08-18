/* global m */

let requestPromise = null;

module.exports = {
    getWordlists() {
        if (!requestPromise) {
            requestPromise = m.request({
                extract: (x) => JSON.parse(x.responseText),
                url: '../wordlists/wordlists.json'
            });
        }

        return requestPromise;
    },

    getWordlist(fn) {
        return m.request({
            extract: (x) => x.responseText.trim().split(/[\r\n]+/),
            url: `../wordlists/${fn}`
        });
    }
};
