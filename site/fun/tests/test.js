/* global m */

const marked = require("marked");
const Question = require("./question");

module.exports = class Test {
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
            result.push(m("p", "Loading the test ..."));
        } else if (this.error) {
            result.push(m("p", "Error with test: " + this.error));
        } else {
            result.push(m("p", m.trust(marked.parse("# " + this.data.title))));
            this.data.questions.forEach((question) => {
                result.push(m(Question, { question: question }));
            });
        }

        return result;
    }
};
