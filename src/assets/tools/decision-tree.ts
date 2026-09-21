/**
 * The decision tree walker: <decision-tree></decision-tree>
 *
 * Pick a tree, answer questions, arrive somewhere. Each node's text and its
 * answers are Markdown, which the trees use for links and emphasis.
 *
 * The Mithril version drove this with its router, putting the tree name and
 * node id in the URL. That is kept, as a hash, so a step can still be
 * linked to and the back button still works.
 */
import { component, css, html } from 'fudgel';
import { marked } from 'marked';

interface TreeNode {
    text: string;
    answers?: Record<string, string>;
}

interface TreeData {
    title: string;
    start: string;
    tree: Record<string, TreeNode>;
}

const TREES = [
    { name: 'diablo-ii', label: 'Diablo II', file: 'diablo-ii.json' },
    { name: 'uploader', label: 'Phone Uploader', file: 'uploader.json' },
];

/** "#diablo-ii/start" -> { tree, node } */
export const parseHash = (hash: string) => {
    const [tree = '', node = ''] = hash.replace(/^#\/?/, '').split('/');
    return { tree, node };
};

export const buildHash = (tree: string, node?: string) =>
    node ? `#${tree}/${node}` : `#${tree}`;

component(
    'decision-tree',
    {
        style: css`
            :host {
                display: block;
            }

            .answers {
                margin: 1em;
            }

            .answers p {
                margin: 0.5em 0;
            }

            button {
                background: none;
                border: 0;
                color: inherit;
                cursor: pointer;
                font: inherit;
                padding: 0;
                text-align: start;
                text-decoration: underline;
            }
        `,
        template: html`
            <ul *if="!treeName">
                <li *for="tree of trees">
                    <button type="button" @click="openTree(tree.name)">
                        {{tree.label}}
                    </button>
                </li>
            </ul>

            <p *if="treeName && loading">Loading</p>
            <p *if="problem">{{problem}}</p>

            <div *if="node">
                <h2 #ref="titleEl"></h2>
                <div #ref="textEl"></div>
                <div class="answers" #ref="answersEl"></div>
                <hr />
                <p>
                    <button type="button" @click="startOver()">
                        Start over
                    </button>
                </p>
            </div>
        `,
    },
    class {
        trees = TREES;
        treeName = '';
        loading = false;
        problem = '';
        node: TreeNode | null = null;
        titleEl?: HTMLElement;
        textEl?: HTMLElement;
        answersEl?: HTMLElement;

        private data: TreeData | null = null;
        private loaded = '';
        private onHashChange = () => this.readHash();

        onInit() {
            window.addEventListener('hashchange', this.onHashChange);
        }

        onViewInit() {
            this.readHash();
        }

        onDestroy() {
            window.removeEventListener('hashchange', this.onHashChange);
        }

        openTree(name: string) {
            location.hash = buildHash(name);
        }

        openNode(id: string) {
            location.hash = buildHash(this.treeName, id);
        }

        startOver() {
            location.hash = '';
        }

        private async readHash() {
            const { tree, node } = parseHash(location.hash);
            const known = TREES.find((t) => t.name === tree);

            if (!known) {
                this.treeName = '';
                this.node = null;
                return;
            }

            this.treeName = tree;

            if (this.loaded !== tree) {
                this.loading = true;
                this.problem = '';
                try {
                    const response = await fetch(known.file);
                    this.data = (await response.json()) as TreeData;
                    this.loaded = tree;
                } catch {
                    this.problem = 'Could not load that decision tree.';
                    this.loading = false;
                    return;
                }
                this.loading = false;
            }

            this.show(node);
        }

        private show(id: string) {
            const data = this.data;
            if (!data) return;

            // An unknown id, including none at all, starts at the top.
            const nodeId = data.tree[id] ? id : data.start;
            if (nodeId !== id) {
                location.hash = buildHash(this.treeName, nodeId);
                return;
            }

            const node = data.tree[nodeId];
            this.node = node;

            // The tree's text is Markdown, written by this site's author and
            // served from this site, so it is rendered rather than escaped -
            // which is what the Mithril version did with m.trust.
            //
            // The answers are built here rather than bound in the template
            // because each one is Markdown too, and a binding cannot set a
            // button's content as markup.
            queueMicrotask(() => {
                if (this.titleEl) {
                    this.titleEl.innerHTML = String(
                        marked.parseInline(data.title)
                    );
                }
                if (this.textEl) {
                    this.textEl.innerHTML = String(marked.parse(node.text));
                }
                if (this.answersEl) {
                    this.answersEl.replaceChildren(
                        ...Object.entries(node.answers ?? {}).map(
                            ([answerId, text]) => {
                                const paragraph = document.createElement('p');
                                const button = document.createElement('button');
                                button.type = 'button';
                                button.innerHTML = String(
                                    marked.parseInline(text)
                                );
                                button.addEventListener('click', () =>
                                    this.openNode(answerId)
                                );
                                paragraph.append(button);
                                return paragraph;
                            }
                        )
                    );
                }
            });
        }
    }
);
