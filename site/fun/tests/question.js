/* global m */

const marked = require("marked");

module.exports = class Question {
    view(vnode) {
        const question = vnode.attrs.question;
        const result = [m.trust(marked(question.text))];

        if (question.selected) {
            result.push(m("div", m("em", m.trust(marked(question.selected)))));
            result.push(
                m(
                    "div",
                    m(
                        "strong",
                        m.trust(marked(question.answers[question.selected]))
                    )
                )
            );
            result.push(
                m(
                    "div",
                    m(
                        "a",
                        {
                            href: "#",
                            onclick: () => {
                                question.selected = null;
                                return false;
                            }
                        },
                        "Reset question?"
                    )
                )
            );
        } else {
            result.push(
                m(
                    "ul",
                    Object.keys(question.answers).map((answer) => {
                        return m(
                            "li",
                            m(
                                "a",
                                {
                                    href: "#",
                                    onclick: () => {
                                        question.selected = answer;
                                        return false;
                                    }
                                },
                                m.trust(marked(answer))
                            )
                        );
                    })
                )
            );
        }

        return m("div", result);
    }
};
