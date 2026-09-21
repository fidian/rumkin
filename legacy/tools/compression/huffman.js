/* global m */

const rumkinCompression = require('@fidian/rumkin-compression');

module.exports = class Huffman {
    constructor() {
        this.compressed = '';
        this.includeJs = false;
        this.text = '';
        this.encodedBytesPerLine = 60;
    }

    compress() {
        const iface = rumkinCompression.huffmanAscii;
        const textBuffer = Buffer.from(this.text);
        let result = iface.compressSync(textBuffer);

        if (this.includeJs) {
            result = this.includeDecompressor(iface, result);
        }

        this.compressed = result;
    }

    includeDecompressor(iface, data) {
        let result = `((${iface.decompressTiny.toString()})
((`;

        while (data.length > this.encodedBytesPerLine) {
            result += `${JSON.stringify(data.substr(0, this.encodedBytesPerLine))}+
`;
            data = data.substr(this.encodedBytesPerLine);
        }

        result += JSON.stringify(data);
        result += '))';

        return result;
    }

    view() {
        return [
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
