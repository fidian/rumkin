/* global m */

const tests = require("./tests");

module.exports = class Introduction {
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
};
