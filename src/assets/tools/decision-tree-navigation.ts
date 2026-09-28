/**
 * Moving around a decision tree: the URL hash, and which node it names.
 *
 * Kept apart from decision-tree.ts because that file registers a custom
 * element, which a Node test cannot import. See src/assets/README.md.
 */

export interface TreeNode {
    text: string;
    /**
     * The node an answer leads to, mapped to the answer's own text. The id
     * is the key, not the value, which is the way round decision-tree.ts
     * reads it when building the buttons.
     */
    answers?: Record<string, string>;
}

export interface TreeData {
    title: string;
    start: string;
    tree: Record<string, TreeNode>;
}

/** "#diablo-ii/start" -> { tree: "diablo-ii", node: "start" } */
export const parseHash = (hash: string) => {
    const [tree = '', node = ''] = hash.replace(/^#\/?/, '').split('/');

    return { tree, node };
};

export const buildHash = (tree: string, node?: string) =>
    node ? `#${tree}/${node}` : `#${tree}`;

/**
 * The node to show for an id. An id the tree does not have, including no id
 * at all, starts at the top rather than showing nothing.
 */
export const resolveNodeId = (data: TreeData, id: string) =>
    data.tree[id] ? id : data.start;

/**
 * Every answer that leads somewhere the tree does not have, as
 * "node -> answer". A tree with any of these is a dead end for a reader, and
 * nothing at run time would say so.
 */
export const findBrokenLinks = (data: TreeData): string[] => {
    const broken: string[] = [];

    if (!data.tree[data.start]) {
        broken.push(`start -> ${data.start}`);
    }

    for (const [nodeId, node] of Object.entries(data.tree)) {
        for (const target of Object.keys(node.answers ?? {})) {
            if (!data.tree[target]) {
                broken.push(`${nodeId} -> ${target}`);
            }
        }
    }

    return broken;
};

/** Node ids no answer leads to, other than the start. Usually a typo. */
export const findUnreachableNodes = (data: TreeData): string[] => {
    const reached = new Set([data.start]);

    for (const node of Object.values(data.tree)) {
        for (const target of Object.keys(node.answers ?? {})) {
            reached.add(target);
        }
    }

    return Object.keys(data.tree).filter((id) => !reached.has(id));
};
