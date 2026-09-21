/* global m */

const marked = require("marked");

const trees = {
    "diablo-ii": {
        label: "Diablo II",
        file: "diablo-ii.json"
    },
    uploader: {
        label: "Phone Uploader",
        file: "uploader.json"
    }
};

const ROUTE = "/:treeName/:id";

module.exports = class DecisionTree {
    constructor() {
        this.loading = false;
        this.loadedTree = null;
        this.treeData = {};
    }

    marked(text) {
        return m.trust(marked.parse(text));
    }

    setNode(id) {
        m.route.set(ROUTE, {
            treeName: m.route.param("treeName"),
            id
        });
    }

    view() {
        const treeName = m.route.param("treeName");

        if (!treeName || !trees[treeName]) {
            return this.viewTreeList();
        }

        if (this.loading) {
            return this.viewLoading();
        }

        if (this.loadedTree !== treeName) {
            this.loadedTree = null;
            this.loading = true;
            m.request({
                url: trees[treeName].file
            }).then((result) => {
                this.loading = false;
                this.loadedTree = treeName;
                this.treeData = result;
            });

            return this.viewLoading();
        }

        let nodeId = m.route.param("id");
        let node = this.treeData.tree[nodeId];

        if (!this.treeData.tree[nodeId]) {
            nodeId = this.treeData.start;
            node = this.treeData.tree[nodeId];
            this.setNode(nodeId);
        }

        return this.viewTreeNode(node);
    }

    viewLoading() {
        return m("p", "Loading");
    }

    viewTreeList() {
        return m(
            "ul",
            {
                class: "Mt(1.5em)"
            },
            Object.entries(trees).map(([k, v]) => {
                return m(
                    "li",
                    m(
                        m.route.Link,
                        {
                            href: k
                        },
                        v.label
                    )
                );
            })
        );
    }

    viewTreeNode(node) {
        return [
            m("h2", this.marked(this.treeData.title)),
            m("div", this.marked(node.text)),
            m(
                "div",
                {
                    class: "M(1em)",
                },
                Object.entries(node.answers || {}).map((answer) =>
                    this.viewTreeAnswer(answer)
                )
            ),
            m("hr"),
            m("p", m(m.route.Link, {
                href: '/'
            }, 'Start over'))
        ];
    }

    viewTreeAnswer([id, text]) {
        return m('p', m(
            m.route.Link,
            {
                href: ROUTE,
                params: {
                    treeName: m.route.param("treeName"),
                    id
                }
            },
            this.marked(text)
        ));
    }
};
