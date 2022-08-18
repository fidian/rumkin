/* global sessionStorage */

const p = 'cryptogramSolver.';
const s = sessionStorage;

module.exports = {
    get cipherText() {
        return s.getItem(`${p}cipherText`) || '';
    },

    set cipherText(v) {
        s.setItem(`${p}cipherText`, v);
    },

    get wordlist() {
        return s.getItem(`${p}wordlist`) || 'american-50-medium.txt';
    },

    set wordlist(v) {
        s.setItem(`${p}wordlist`, v);
    }
};
