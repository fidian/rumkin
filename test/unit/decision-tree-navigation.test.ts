import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
    buildHash,
    findBrokenLinks,
    findUnreachableNodes,
    parseHash,
    resolveNodeId,
    type TreeData,
} from '@/assets/tools/decision-tree-navigation.ts';

const tree: TreeData = {
    title: 'Example',
    start: 'top',
    tree: {
        // The key is the node an answer leads to; the value is its label.
        top: { text: 'Which way?', answers: { west: 'Go left', east: 'Go right' } },
        west: { text: 'You went west.' },
        east: { text: 'You went east.', answers: { top: 'Back' } },
    },
};

describe('parseHash', () => {
    it('reads a tree and a node', () => {
        expect(parseHash('#diablo-ii/start')).toEqual({
            tree: 'diablo-ii',
            node: 'start',
        });
    });

    it('reads a tree on its own', () => {
        expect(parseHash('#diablo-ii')).toEqual({ tree: 'diablo-ii', node: '' });
    });

    // The Mithril router wrote "#/tree/node"; those links are still out there.
    it('tolerates the old slash after the hash', () => {
        expect(parseHash('#/diablo-ii/start')).toEqual({
            tree: 'diablo-ii',
            node: 'start',
        });
    });

    it('reads an empty hash as nothing at all', () => {
        expect(parseHash('')).toEqual({ tree: '', node: '' });
        expect(parseHash('#')).toEqual({ tree: '', node: '' });
    });
});

describe('buildHash', () => {
    it('leaves the node off when there is none', () => {
        expect(buildHash('uploader')).toBe('#uploader');
    });

    it('round trips with parseHash', () => {
        const hash = buildHash('uploader', 'which-phone');
        expect(parseHash(hash)).toEqual({
            tree: 'uploader',
            node: 'which-phone',
        });
    });
});

describe('resolveNodeId', () => {
    it('keeps a node the tree has', () => {
        expect(resolveNodeId(tree, 'east')).toBe('east');
    });

    it('starts at the top for a node it does not have', () => {
        expect(resolveNodeId(tree, 'nowhere')).toBe('top');
    });

    it('starts at the top when no node is named', () => {
        expect(resolveNodeId(tree, '')).toBe('top');
    });
});

describe('findBrokenLinks', () => {
    it('says nothing about a whole tree', () => {
        expect(findBrokenLinks(tree)).toEqual([]);
    });

    it('names an answer that leads nowhere', () => {
        const broken = findBrokenLinks({
            ...tree,
            tree: {
                ...tree.tree,
                west: { text: 'Onwards', answers: { missing: 'Onwards' } },
            },
        });

        expect(broken).toEqual(['west -> missing']);
    });

    it('notices a start that is not in the tree', () => {
        expect(findBrokenLinks({ ...tree, start: 'missing' })).toContain(
            'start -> missing'
        );
    });
});

describe('findUnreachableNodes', () => {
    it('says nothing when every node can be reached', () => {
        expect(findUnreachableNodes(tree)).toEqual([]);
    });

    it('names a node no answer leads to', () => {
        const orphaned = findUnreachableNodes({
            ...tree,
            tree: { ...tree.tree, lost: { text: 'Nobody comes here.' } },
        });

        expect(orphaned).toEqual(['lost']);
    });
});

// The trees themselves. A broken answer here is a dead end for a reader and
// nothing at run time would report it.
describe('the trees the site ships', () => {
    const load = (name: string) =>
        JSON.parse(
            readFileSync(`public/tools/decision-tree/${name}.json`, 'utf8')
        ) as TreeData;

    for (const name of ['diablo-ii', 'uploader']) {
        describe(name, () => {
            const data = load(name);

            it('has a start node that exists', () => {
                expect(data.tree[data.start]).toBeDefined();
            });

            it('has no answer leading nowhere', () => {
                expect(findBrokenLinks(data)).toEqual([]);
            });

            it('can reach every node', () => {
                expect(findUnreachableNodes(data)).toEqual([]);
            });
        });
    }
});
