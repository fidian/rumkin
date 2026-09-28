/**
 * The marquee code generator.
 *
 * Composes a standalone JavaScript snippet from the chosen show and hide
 * effects: each effect contributes a function, which is stringified into
 * the output along with whatever helpers it declares it depends on.
 *
 * Ported from the Mithril version, whose view has been replaced by
 * marquee-generator.ts. The generation itself is unchanged.
 */

import DependsRandomTs from './depends/random.ts';
import DependsRandomIntTs from './depends/random-int.ts';
import DependsRangeTs from './depends/range.ts';
import DependsRepeatTs from './depends/repeat.ts';
import ShowCryptographyTs from './show/cryptography.ts';
import ShowImplodeTs from './show/implode.ts';
import ShowNoneTs from './show/none.ts';
import ShowSlamTs from './show/slam.ts';
import ShowSlideLeftTs from './show/slide-left.ts';
import ShowSlideRightTs from './show/slide-right.ts';
import ShowTypingTs from './show/typing.ts';
import HideBackspaceTs from './hide/backspace.ts';
import HideExplodeTs from './hide/explode.ts';
import HideFlyOffTs from './hide/fly-off.ts';
import HideNoneTs from './hide/none.ts';
import HideSlideLeftTs from './hide/slide-left.ts';
import HideSlideRightTs from './hide/slide-right.ts';

const depends = {
    random: DependsRandomTs,
    randomInt: DependsRandomIntTs,
    range: DependsRangeTs,
    repeat: DependsRepeatTs
};

export const showEffects = {
    cryptography: ShowCryptographyTs,
    implode: ShowImplodeTs,
    none: ShowNoneTs,
    slam: ShowSlamTs,
    slideLeft: ShowSlideLeftTs,
    slideRight: ShowSlideRightTs,
    typing: ShowTypingTs
};

export const hideEffects = {
    backspace: HideBackspaceTs,
    explode: HideExplodeTs,
    flyOff: HideFlyOffTs,
    none: HideNoneTs,
    slideLeft: HideSlideLeftTs,
    slideRight: HideSlideRightTs
};

import Timeout from './timeout.ts';

export default class Generator {
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
        // Set by the component; called with each frame of the preview.
        this.onPreview = null;
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
            show: showEffects[this.showMethod],
            showVariables: this.getVariables(showEffects[this.showMethod]),
            readDelay: this.readDelay,
            hide: hideEffects[this.hideMethod],
            // The original looked this up in showEffects with the hide
            // method's name, so any hide effect not also present as a show
            // effect - backspace, explode, fly off - threw here.
            hideVariables: this.getVariables(hideEffects[this.hideMethod]),
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
            this.onPreview?.(message);
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
}