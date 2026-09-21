/* global m */

const rumkinCompression = require('@fidian/rumkin-compression');

module.exports = class Lz77 {
    constructor() {
        this.ascii = false;
        this.compressed = '';
        this.includeJs = false;
        this.text = '';
        this.encodedBytesPerLine = 60;
    }

    compress() {
        let iface;
        let result;

        if (this.ascii) {
            iface = rumkinCompression.lz77Ascii;
            result = iface.compressSync(this.text);
        } else {
            iface = rumkinCompression.lz77;
            const textBuffer = Buffer.from(this.text);
            result = iface.compressSync(textBuffer).toString('base64');
        }

        if (this.includeJs) {
            result = this.includeDecompressor(iface, result);
        }

        this.compressed = result;
    }

    includeDecompressor(iface, data) {
        let result = `((${iface.decompressTiny.toString()})
(`;

        if (!this.ascii) {
            result += `(c => {
                const o = [];

                while (c.length > 1) {
                    o.push(c.shift() << 2 | c[0] >> 4);

                    if (c.length > 1) {
                        o.push((c.shift() << 4 | c[0] >> 2) & 0xff);
                    }

                    if (c.length > 1) {
                        o.push((c.shift() << 6 | c.shift()) & 0xff);
                    }
                }

                return o;
            })((`;
        }

        while (data.length > this.encodedBytesPerLine) {
            result += `${JSON.stringify(data.substr(0, this.encodedBytesPerLine))}+
`;
            data = data.substr(this.encodedBytesPerLine);
        }

        result += JSON.stringify(data);

        if (!this.ascii) {
            result += `
).split('').map(l => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(l)).filter(c => c !== -1))`;
        }

        result += `))`;

        return result;
    }

    view() {
        return [
            m('div', m('label', [
                m('input', {
                    type: 'checkbox',
                    checked: this.ascii,
                    onchange: () => {
                        this.ascii = !this.ascii;
                        this.compress();
                    }
                }),
                ' Use ASCII encoding instead of Base64'
            ])),
            m('div', m('label', [
                m('input', {
                    type: 'checkbox',
                    checked: this.includeJs,
                    onchange: () => {
                        this.includeJs = !this.includeJs;
                        this.compress();
                    }
                }),
                ' Include necessary JavaScript for decompression'
            ])),
            m('textarea', {
                placeholder: 'Enter text here',
                class: 'W(100%) H(8em)',
                value: this.text,
                onchange: (e) => {
                    this.text = e.target.value;
                    this.compress();
                }
            }),
            this.viewResult()
        ];
    }

    viewResult() {
        const textLength = this.text.length;

        if (!textLength) {
            return m('div', 'Enter some text to compress and the result will be shown here.');
        }

        const compressedLength = this.compressed.length;
        const percent = ((compressedLength / textLength) * 100).toFixed(2);
        const removeOrAdd = percent <= 100 ? 'removing' : 'adding';
        const diffBytes = Math.abs(textLength - compressedLength);

        return [
            m('div', `${textLength} → ${compressedLength} bytes, using ${percent}% of the uncompressed size by ${removeOrAdd} ${diffBytes} bytes.`),
            m('pre', this.compressed)
        ];
    }
};
