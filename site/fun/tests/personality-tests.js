/* global m, marked */

const tests = [
    {
        id: "candybar",
        name: "What candy bar are you?"
    },
    {
        id: "iq-test",
        name: "How smart are you?"
    },
    {
        id: "love",
        name: "Your opinions about marriage and your significant other."
    },
    {
        id: "priorities",
        name: "How do you rank different priorities?"
    },
    {
        id: "world-leader",
        name: "Pick the next world leader."
    }
];

// eslint-disable-next-line
class Introduction {
    view() {
        return [
            m(
                "p",
                "These personality tests are designed only to amuse and potentially provide insight into your mind. The results are not intended to be accurate, but they could bring a smile to your face. If you know of more tests like this that you would like to see here, send them to me!"
            ),
            m(
                "ul",
                tests.map((test) =>
                    m(
                        "li",
                        m(
                            m.route.Link,
                            {
                                href: "/test/" + test.id
                            },
                            test.name
                        )
                    )
                )
            ),
            m("p", "Don't worry. You are not graded.")
        ];
    }
}

class Question {
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
}

// eslint-disable-next-line
class Test {
    constructor() {
        this.setId(null);
    }

    setId(id) {
        this.id = id;
        this.loading = true;
        this.error = false;
        this.data = {};

        if (id) {
            m.request({
                url: id + ".json"
            }).then(
                (data) => {
                    this.loading = false;
                    this.data = data;
                },
                () => {
                    this.loading = false;
                    this.error = "Unable to load test data.";
                }
            );
        } else {
            this.loading = false;
            this.error = "No test specified.";
        }
    }

    view(vnode) {
        const result = [];

        if (this.id !== vnode.attrs.id) {
            this.setId(vnode.attrs.id);
        }

        result.push(
            m(
                m.route.Link,
                {
                    href: "/"
                },
                "Back to the list of tests."
            )
        );

        if (this.loading) {
            result.push(m("div", "Loading the test ..."));
        } else if (this.error) {
            result.push(m("div", "Error with test: " + this.error));
        } else {
            result.push(m("div", m.trust(marked("# " + this.data.title))));
            this.data.questions.forEach((question) => {
                result.push(m(Question, { question: question }));
            });
        }

        return result;
    }
}
