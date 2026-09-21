/* global m */

module.exports = class Base64 {
    constructor() {
        this.encoded = '';
        this.text = '';
    }

    encode() {
        this.encoded = Buffer.from(this.text).toString('base64');
    }

    view() {
        return [
            m('textarea', {
                placeholder: 'Enter text here',
                class: 'W(100%) H(8em)',
                value: this.text,
                onchange: (e) => {
                    this.text = e.target.value;
                    this.encode();
                }
            }),
            this.viewResult()
        ];
    }

    viewResult() {
        const textLength = this.text.length;

        if (!textLength) {
            return m('div', 'Enter some text to encode and the result will be shown here.');
        }

        return [
            m('pre', this.encoded)
        ];
    }
};
