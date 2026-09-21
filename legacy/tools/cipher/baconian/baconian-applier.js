/* global m */

module.exports = function baconianApplier(alphabet, code, message, bClasses) {
    code = code
        .toString()
        .replace(/[0A]/g, "a")
        .replace(/[1B]/g, "b")
        .replace(/[^ab]/g, "");
    message = message.toString();
    let codeIndex = 0;
    const letterIndexes = alphabet.findLetterIndexes(message);
    const letterTypes = Object.entries(letterIndexes).map(
        ([messageIndex, letterIndex]) => {
            let type = "a";

            if (letterIndex >= 0) {
                const codeLetter = code.charAt(codeIndex);
                codeIndex += 1;

                if (codeLetter === "b") {
                    type = "b";
                }
            }

            return {
                type,
                chars: message.charAt(messageIndex)
            };
        }
    );
    const consolidatedTypes = [];
    let last = null;

    for (const letterType of letterTypes) {
        if (last && last.type === letterType.type) {
            last.chars += letterType.chars;
        } else {
            last = letterType;
            consolidatedTypes.push(last);
        }
    }

    const elements = consolidatedTypes.map((item) => {
        if (item.type === "b") {
            return m(
                "span",
                {
                    class: bClasses
                },
                item.chars
            );
        }

        return item.chars;
    });

    return {
        result: elements,
        encodedMessageFits: codeIndex >= code.length
    };
};
