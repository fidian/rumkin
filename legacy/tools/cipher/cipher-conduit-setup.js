/* global rumkinCipher */
const Alphabet = rumkinCipher.util.Alphabet;
const conduitEvents = require("../../js/module/conduit-events");

function overload(obj, method, callback) {
    const prev = obj[method];
    obj[method] = (...args) => {
        if (prev) {
            prev.apply(obj, args);
        }

        callback(args);
    };
}

function setAlphabet(dest, value) {
    const parts = value.split(" ");

    for (const p of parts) {
        const split = p.split(":");
        let AlphabetConstructor;

        switch (split[0]) {
            case "useLastInstance":
            case "reverseKey":
            case "reverseAlphabet":
            case "keyAtEnd":
                dest[split[0]] = split[1] === "true";
                break;

            case "alphabetKey":
                dest.alphabetKey = split[1];
                break;

            default:
                AlphabetConstructor = rumkinCipher.alphabet[split[0]];

                if (AlphabetConstructor) {
                    dest.value = new AlphabetConstructor();
                }
        }
    }
}

function applyPayloadProperty(obj, k, v) {
    const dest = obj[k];

    if (!dest || typeof dest !== "object" || dest.value === undefined) {
        return;
    }

    const current = dest.value;

    if (typeof current === "number") {
        dest.value = +v;
    } else if (typeof current === "string") {
        dest.value = v;
    } else if (typeof current === "boolean") {
        dest.value = v === "true";
    } else if (current instanceof Alphabet) {
        setAlphabet(dest, v);
    }
}

function applyPayload(obj, msg) {
    for (const [k, v] of Object.entries(msg)) {
        applyPayloadProperty(
            obj,
            k.replace(/-(.)/g, (x) => x[1].toUpperCase()),
            v
        );
    }
}

module.exports = function cipherConduitSetup(obj, topic, changeCallback) {
    let unsubscribe = null;

    overload(obj, "oninit", () => {
        unsubscribe = conduitEvents.on(topic, (msg) => {
            applyPayload(obj, msg);

            if (changeCallback) {
                changeCallback();
            }
        });
    });
    overload(obj, "onbeforeresume", () => {
        if (unsubscribe) {
            unsubscribe();
        }
    });
};
