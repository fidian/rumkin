/* global m, rumkinCipher */

const morseData = rumkinCipher.codeTree.morseData;

const betterLabel = {
    " ": "Space"
};

module.exports = class MorseTable {
    textToLabel(text) {
        if (betterLabel[text]) {
            return betterLabel[text];
        }

        if (text.length < 2) {
            return text.toUpperCase();
        }

        return text;
    }

    textsToLabels(texts, labelFilter) {
        const result = [];
        const resultMap = {};

        for (const text of texts) {
            const label = this.textToLabel(text);

            if (labelFilter(label) && !resultMap[label]) {
                resultMap[label] = true;
                result.push(label);
            }
        }

        return result;
    }

    view() {
        return [
            m(
                "ul",
                {
                    class: "Colmc(5) Colmc(4)--l Colmc(3)--m Colmc(2)--s"
                },
                morseData.map((item) =>
                    // "CH" is two letters
                    this.viewItem(item, (text) => text.length < 3)
                )
            ),
            m(
                "ul",
                {
                    class: "Colmc(2) Colmc(1)--sm"
                },
                morseData.map((item) =>
                    this.viewItem(item, (text) => text.length > 2)
                )
            )
        ];
    }

    viewItem(item, labelFilter) {
        const labels = this.textsToLabels(item.text, labelFilter);

        if (labels.length === 0) {
            return [];
        }

        return m("li", [
            labels.join(", "),
            " → ",
            m("span", { class: "Whs(nw)" }, item.code)
        ]);
    }
};
