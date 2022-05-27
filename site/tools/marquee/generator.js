/* global document, m */

const depends = {
    random: require("./depends/random"),
    randomInt: require("./depends/random-int"),
    range: require("./depends/range"),
    repeat: require("./depends/repeat")
};

const show = {
    cryptography: require("./show/cryptography"),
    implode: require("./show/implode"),
    none: require("./show/none"),
    slam: require("./show/slam"),
    slideLeft: require("./show/slide-left"),
    slideRight: require("./show/slide-right"),
    typing: require("./show/typing")
};

const hide = {
    backspace: require("./hide/backspace"),
    explode: require("./hide/explode"),
    flyOff: require("./hide/fly-off"),
    none: require("./hide/none"),
    slideLeft: require("./hide/slide-left"),
    slideRight: require("./hide/slide-right")
};

const Timeout = require("./timeout");

module.exports = class Generator {
    constructor() {
        this.message = ""; // Message currently being worked on
        this.betweenDelay = 0.5;
        this.readDelay = 1.5;
        this.showMethod = "none";
        this.hideMethod = "none";
        this.animationList = [];
        this.repeat = true;
        this.functionExtra = "";
        this.jQueryExtra = "";
        this.timeout = new Timeout();
        this.generatedCode = this.generateCode();
        this.preview = this.makePreview();
    }

    generateCode() {
        if (this.animationList.length === 0) {
            return "// No animations in list";
        }

        return `(function () {
    ${this.indent(this.generateCodeDepends())}

    ${this.indent(this.generateCodeMethod("show"))}

    ${this.indent(this.generateCodeMethod("hide"))}

    ${this.indent(this.generateCodeDelay())}

    ${this.indent(this.generateCodeSteps())}

    ${this.indent(this.generateCodeWriter())}

    ${this.indent(this.generateCodeAnimate())}
})()`;
    }

    generateCodeAnimate() {
        const pushBack = this.repeat ? "\n    steps.push(step);" : "";

        return `function nextStep() {
    const step = steps.shift();${pushBack}

    if (step) {
        runFunction(step);
    }
}

function runFunction(fn) {
    const result = fn();

    if (result[0] !== null) {
        writer(result[0]);
    }

    if (result[2]) {
        setTimeout(function () {
            runFunction(result[2]);
        }, result[1]);
    } else {
        nextStep();
    }
}

window.addEventListener('load', nextStep)`;
    }

    generateCodeDelay() {
        for (const anim of this.animationList) {
            if (anim.readDelay || anim.betweenDelay) {
                return `// Delay function between animations
function delay(seconds) {
    return [null, seconds * 1000, function () {
        return [null];
    }];
}`;
            }
        }

        return "// Delay function not needed";
    }

    generateCodeDepends() {
        const dependsNeeded = {};

        for (const anim of this.animationList) {
            for (const key of anim.show.depends || []) {
                dependsNeeded[key] = depends[key];
            }

            for (const key of anim.hide.depends || []) {
                dependsNeeded[key] = depends[key];
            }
        }

        if (!Object.keys(dependsNeeded).length) {
            return "// No dependencies";
        }

        const list = Object.entries(dependsNeeded)
            .map((e) => `${e[0]}: ${this.generateCodeFunction(e[1])}`)
            .join(",\n");

        return `// Dependencies
const depends = {
    ${this.indent(list)}
};`;
    }

    generateCodeFunction(fn) {
        let fnStr = fn.toString();
        const lines = fnStr.split(/\n/g);
        lines.shift();
        let minIndent = lines.length ? fnStr.length : 0;

        while (lines.length) {
            const line = lines.shift();

            if (line.length) {
                const indent = line.match(/^ */)[0].length;
                minIndent = Math.min(indent, minIndent);
            }
        }

        if (minIndent) {
            const r = new RegExp(`^${depends.repeat(" ", minIndent)}`, "gm");
            fnStr = fnStr.replace(r, "");
        }

        return fnStr;
    }

    generateCodeMethod(type) {
        const needed = {};

        for (const anim of this.animationList) {
            needed[anim[type].key] = anim[type].method;
        }

        if (!Object.keys(needed).length) {
            return `// No methods: ${type}`;
        }

        const lines = Object.entries(needed)
            .map((e) => `${e[0]}: ${this.generateCodeFunction(e[1])}`)
            .join(",\n");

        return `// Methods: ${type}
const ${type} = {
    ${this.indent(lines)}
};`;
    }

    generateCodeSteps() {
        const segments = [];

        for (const anim of this.animationList) {
            // Show
            segments.push(
                this.generateCodeStepsMethod(
                    anim,
                    "show",
                    anim.show,
                    anim.showVariables
                )
            );

            // Read Delay
            if (anim.readDelay) {
                segments.push(this.generateCodeStepsDelay(anim.readDelay));
            }

            // Hide
            segments.push(
                this.generateCodeStepsMethod(
                    anim,
                    "hide",
                    anim.hide,
                    anim.hideVariables
                )
            );

            // Between Delay
            if (anim.betweenDelay) {
                segments.push(this.generateCodeStepsDelay(anim.betweenDelay));
            }
        }

        return `const steps = [
    ${this.indent(segments.join(",\n"))}
];`;
    }

    generateCodeStepsDelay(delay) {
        return `function () { return delay(${delay}); }`;
    }

    generateCodeStepsMethod(anim, type, def, variables) {
        const args = [JSON.stringify(anim.message)];

        for (const variable of variables) {
            args.push(JSON.stringify(variable));
        }

        for (const depend of def.depends || []) {
            args.push(`depends.${depend}`);
        }

        return `function () { return ${type}.${def.key}(${args.join(", ")}); }`;
    }

    generateCodeWriter() {
        switch (this.writeMethod) {
            case "window.status":
                return `function writer(msg) {
    window.status = msg;
}`;

            case "jQuery.text":
                return `function writer(msg) {
    $(${JSON.stringify(this.jQueryExtra)}).text(msg);
}`;

            default:
                return `function writer(msg) {
    ${this.functionExtra}(msg);
}`;
        }
    }

    indent(lines) {
        return lines.replace(/\n/g, "\n    ");
    }

    makePreview() {
        return {
            message: this.message,
            show: show[this.showMethod],
            showVariables: this.getVariables(show[this.showMethod]),
            readDelay: this.readDelay,
            hide: hide[this.hideMethod],
            hideVariables: this.getVariables(show[this.hideMethod]),
            betweenDelay: this.betweenDelay
        };
    }

    getVariables(def) {
        const result = [];

        for (const variable of def.variables || []) {
            const v =
                variable.currentValue === undefined
                    ? variable.default
                    : variable.currentValue;
            result.push(v);
        }

        return result;
    }

    updateDemo() {
        this.timeout.clear();

        const writer = (message) => {
            document.getElementById("generator-demo").value = message;
        };

        const steps = [];
        const nextStep = () => {
            const s = steps.shift();
            steps.push(s);
            s();
        };
        steps.push(
            this.stepCallMethod(
                this.preview.show,
                this.preview.showVariables,
                this.preview.message,
                writer,
                nextStep
            )
        );

        if (this.preview.readDelay) {
            steps.push(this.stepDelayFn(nextStep, this.preview.readDelay));
        }

        steps.push(
            this.stepCallMethod(
                this.preview.hide,
                this.preview.hideVariables,
                this.preview.message,
                writer,
                nextStep
            )
        );

        if (this.preview.betweenDelay) {
            steps.push(this.stepDelayFn(nextStep, this.preview.betweenDelay));
        }

        nextStep();
    }

    stepCallMethod(def, variables, message, writer, nextStep) {
        const makeCall = (fn) => {
            const result = fn();

            if (!Array.isArray(result)) {
                nextStep();
            }

            writer(result[0]);

            if (result[2]) {
                this.timeout.set(result[1], () => {
                    makeCall(result[2]);
                });
            } else {
                nextStep();
            }
        };

        return () => {
            const args = [message, ...variables];

            for (const depend of def.depends || []) {
                args.push(depends[depend]);
            }

            makeCall(function () {
                return def.method(...args);
            });
        };
    }

    stepDelayFn(nextStep, delay) {
        return () => {
            this.timeout.set(delay * 1000, nextStep);
        };
    }

    update() {
        this.preview = this.makePreview();
        this.updateDemo();
        this.generatedCode = this.generateCode();
    }

    addConfig(animData) {
        this.animationList.push(animData);
        this.update();
    }

    writeSelect(property, list, label) {
        return m("p", [
            label,
            m(
                "select",
                {
                    onchange: (e) => {
                        this[property] = e.target.value;
                        this.update();
                    }
                },
                Object.entries(list).map(([k, v]) =>
                    m(
                        "option",
                        {
                            value: k,
                            selected: this[property] === k
                        },
                        v.title
                    )
                )
            )
        ]);
    }

    viewMethodDetail(method) {
        const variables = method.variables || [];

        for (const variable of variables) {
            if (variable.currentValue === undefined) {
                variable.currentValue = variable.default;
            }
        }

        return m(
            "div",
            {
                style: "padding-left: 3em; margin-bottom: 0.5em;"
            },
            [
                m("p", method.description),
                ...variables.map((variable) => {
                    return m("div", [
                        `${variable.name}: `,
                        m("input", {
                            type: "text",
                            style: "width: 5em;",
                            value: variable.currentValue,
                            oninput: (e) => {
                                if (variable.isNumeric) {
                                    variable.currentValue = +e.target.value;
                                } else {
                                    variable.currentValue = e.target.value;
                                }

                                this.update();
                            }
                        }),
                        ` ${variable.description}`
                    ]);
                })
            ]
        );
    }

    viewDelay(prop, label) {
        return m("div", [
            label,
            m("input", {
                type: "text",
                value: this[prop],
                style: "width: 5em;",
                oninput: (e) => {
                    this[prop] = +e.target.value;
                    this.update();
                }
            })
        ]);
    }

    viewWriteMethodAdditional() {
        switch (this.writeMethod) {
            case "window.status":
                return m(
                    "p",
                    "Warning: this method is blocked by most browsers."
                );

            case "jQuery.text":
                return m("p", [
                    "Element selector: ",
                    m("input", {
                        type: "text",
                        value: this.jQueryExtra,
                        onkeyup: (e) => {
                            this.jQueryExtra = e.target.value;
                            this.update();
                        },
                        onchange: (e) => {
                            this.jQueryExtra = e.target.value;
                            this.update();
                        }
                    }),
                    m("br"),
                    "Result: ",
                    m(
                        "tt",
                        m(
                            "code",
                            `$(${JSON.stringify(
                                this.jQueryExtra
                            )}).text("message goes here");`
                        )
                    )
                ]);

            default:
                return m("p", [
                    "Name of function to call: ",
                    m("input", {
                        type: "text",
                        value: this.functionExtra,
                        onkeyup: (e) => {
                            this.functionExtra = e.target.value;
                            this.update();
                        },
                        onchange: (e) => {
                            this.functionExtra = e.target.value;
                            this.update();
                        }
                    }),
                    m("br"),
                    "Sample call: ",
                    m(
                        "tt",
                        m("code", `${this.functionExtra}("message goes here");`)
                    )
                ]);
        }
    }

    viewAnimationList() {
        if (!this.animationList.length) {
            return "";
        }

        return [
            m("h2", "Animations"),
            m(
                "ul",
                this.animationList.map((anim) => m("li", anim.message))
            )
        ];
    }

    viewGeneratedCode() {
        if (!this.generatedCode) {
            return "";
        }

        return m("pre", m("code", this.generatedCode));
    }

    view() {
        return [
            m("h2", "Customize your message"),
            m(
                "p",
                m("input", {
                    type: "text",
                    placeholder: "Write your message here",
                    style: "width: 100%;",
                    value: this.message,
                    oninput: (e) => {
                        this.message = e.target.value;
                        this.update();
                    }
                })
            ),
            this.writeSelect("showMethod", show, "Method for showing: "),
            this.viewMethodDetail(show[this.showMethod]),
            this.viewDelay("readDelay", "Delay after showing, in seconds: "),
            this.writeSelect("hideMethod", hide, "Method for hiding: "),
            this.viewMethodDetail(hide[this.hideMethod]),
            this.viewDelay("betweenDelay", "Delay after hiding, in seconds: "),
            m("h2", "Demo of this message (loops continually)"),
            m(
                "p",
                m("input#generator-demo", {
                    type: "text",
                    disabled: "disabled",
                    style: "width: 100%"
                })
            ),
            m("h2", "Build a sequence of messages"),
            m(
                "p",
                m(
                    "button",
                    {
                        onclick: () => this.addConfig(this.preview)
                    },
                    "Add This Message"
                )
            ),
            this.viewAnimationList(),
            m("h2", "Generated Code Options"),
            this.writeSelect(
                "repeat",
                {
                    true: { title: "loop forever." },
                    false: { title: "display only once." }
                },
                "The generated code should "
            ),
            this.writeSelect(
                "writeMethod",
                {
                    function: { title: "a function call" },
                    "jQuery.text": { title: "using jQuery.text." },
                    "window.status": { title: "setting window.status." }
                },
                "Write the message using "
            ),
            this.viewWriteMethodAdditional(),
            m("h2", "Result"),
            this.viewGeneratedCode()
        ];
    }
};
