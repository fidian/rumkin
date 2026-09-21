/* global m, navigator */

"use strict";

module.exports = class TestKeyboardEvents {
    constructor() {
        this.log = [];
        this.isEnabled = {
            onchange: true,
            oninput: true,
            onkeydown: true,
            onkeypress: true,
            onkeyup: true
        };
        this.handlers = {};
        this.timer = Date.now();

        for (const name of Object.keys(this.isEnabled)) {
            this.handlers[name] = (e) => {
                this.addEvent(name, e);
                return true;
            };
        }
    }

    addEvent(type, e) {
        let log = `[${type} ${Date.now() - this.timer}ms]`;

        for (const attr of ["keyCode", "which", "charCode"]) {
            if (e[attr] !== undefined) {
                log += ` ${attr}=${this.keyval(e[attr])}`;
            }
        }

        for (const attr of [
            "shiftKey",
            "ctrlKey",
            "altKey",
            "metaKey",
            "key",
            "char",
            "location",
            "repeat",
            "keyIdentifier",
            "keyLocation"
        ]) {
            if (e[attr] !== undefined) {
                log += ` ${attr}=${e[attr]}`;
            }
        }

        if (e.srcElement !== undefined && e.srcElement.nodeName !== undefined) {
            log += ` srcElement.nodeName=${e.srcElement.nodeName}`;
        }

        if (e.target && e.target.value !== undefined) {
            log += ` target.value=${e.target.value}`;
        }

        this.log.unshift(
            m(
                "div",
                {
                    class: "My(0.5em)"
                },
                log
            )
        );
    }

    keyval(n) {
        if (n === null) {
            return "null";
        }

        if (n === undefined) {
            return "undefined";
        }

        let s = n.toString();

        if (n >= 32 && n < 127) {
            s += ` (${String.fromCharCode(n)})`;
        }

        return s;
    }

    view() {
        return [
            m("p", [
                m(
                    "span",
                    {
                        class: "Fw(b)"
                    },
                    "Your browser:"
                ),
                " ",
                navigator.userAgent
            ]),
            m(
                "ul",
                Object.keys(this.isEnabled).map((name) => {
                    return m(
                        "li",
                        m("label", [
                            m("input", {
                                type: "checkbox",
                                value: this.isEnabled[name],
                                onchange: () => {
                                    this.isEnabled[name] =
                                        !this.isEnabled[name];

                                    return true;
                                }
                            }),
                            ` Log ${name} events`
                        ])
                    );
                })
            ),
            m(
                "div",
                m(
                    "input",
                    Object.assign(
                        {
                            type: "text"
                        },
                        this.handlers
                    )
                )
            ),
            m("div", m("textarea", this.handlers)),
            m("h3", "Log of Events (newest at top)"),
            this.log
        ];
    }
};
