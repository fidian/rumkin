/* global m */

const marked = require("marked");

module.exports = class Question {
    view(vnode) {
        const question = vnode.attrs.question;
        const result = [m.trust(marked.parse(question.text))];

        if (question.selected) {
            result.push(m("p", m("em", m.trust(marked.parse(question.selected)))));
            result.push(
                m(
                    "p",
                    m(
                        "strong",
                        m.trust(marked.parse(question.answers[question.selected]))
                    )
                )
            );
            result.push(
                m(
                    "p",
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
                                m.trust(marked.parse(answer))
                            )
                        );
                    })
                )
            );
        }

        return result;
    }
};
