import { describe, expect, it } from 'vitest';
import {
    emptyBoard,
    isAlive,
    livingNeighbours,
    nextCellState,
    splat,
    step,
    type Board,
    type Cell,
} from '@/assets/life/life.ts';

const from = (rows: string[]): Board =>
    rows.map((row) => [...row].map((c) => (c === '#' ? 2 : 0) as Cell));

const show = (board: Board) =>
    board.map((row) => row.map((c) => (c === 1 || c === 2 ? '#' : '.')).join(''));

describe('isAlive', () => {
    it('counts a newborn and a survivor as alive', () => {
        expect(isAlive([[1]], 0, 0)).toBe(true);
        expect(isAlive([[2]], 0, 0)).toBe(true);
    });

    it('counts empty and just-died as not alive', () => {
        expect(isAlive([[0]], 0, 0)).toBe(false);
        expect(isAlive([[3]], 0, 0)).toBe(false);
    });

    it('treats outside the board as not alive', () => {
        expect(isAlive([[2]], -1, 0)).toBe(false);
        expect(isAlive([[2]], 0, 99)).toBe(false);
    });
});

describe('livingNeighbours', () => {
    it('does not count the cell itself', () => {
        expect(livingNeighbours(from(['###', '###', '###']), 1, 1)).toBe(8);
    });

    it('counts across a corner', () => {
        expect(livingNeighbours(from(['#.', '..']), 1, 1)).toBe(1);
    });
});

describe('nextCellState', () => {
    it('kills a lonely cell', () => {
        expect(nextCellState(from(['#..', '...', '...']), 0, 0)).toBe(3);
    });

    it('kills an overcrowded cell', () => {
        expect(nextCellState(from(['###', '###', '###']), 1, 1)).toBe(3);
    });

    it('keeps a cell with two or three neighbours', () => {
        expect(nextCellState(from(['##.', '#..', '...']), 0, 0)).toBe(2);
    });

    it('births a cell with exactly three neighbours', () => {
        expect(nextCellState(from(['##.', '#..', '...']), 1, 1)).toBe(1);
    });

    it('leaves an empty cell empty otherwise', () => {
        expect(nextCellState(from(['#..', '...', '...']), 2, 2)).toBe(0);
    });
});

describe('step', () => {
    it('leaves a block alone, as a still life should be', () => {
        const block = from(['.....', '.##..', '.##..', '.....', '.....']);
        expect(show(step(block))).toEqual(show(block));
    });

    it('turns a blinker on its side, and back again', () => {
        const vertical = from(['.....', '..#..', '..#..', '..#..', '.....']);
        const horizontal = show(step(vertical));

        expect(horizontal).toEqual([
            '.....',
            '.....',
            '.###.',
            '.....',
            '.....',
        ]);
        expect(show(step(step(vertical)))).toEqual(show(vertical));
    });

    it('moves a glider one cell diagonally every four turns', () => {
        let board = from([
            '.......',
            '..#....',
            '...#...',
            '.###...',
            '.......',
            '.......',
            '.......',
        ]);

        for (let i = 0; i < 4; i += 1) board = step(board);

        expect(show(board)).toEqual([
            '.......',
            '.......',
            '...#...',
            '....#..',
            '..###..',
            '.......',
            '.......',
        ]);
    });

    it('empties a board with nothing on it', () => {
        expect(show(step(emptyBoard(3, 3)))).toEqual(['...', '...', '...']);
    });
});

describe('splat', () => {
    it('only ever writes inside the board', () => {
        const board = emptyBoard(3, 3);
        splat(board, 0, 0, 20, () => 0);
        expect(board.flat().every((c) => c === 0 || c === 1)).toBe(true);
        expect(board).toHaveLength(3);
        expect(board[0]).toHaveLength(3);
    });

    it('brings cells to life', () => {
        const board = emptyBoard(9, 9);
        splat(board, 4, 4, 10, () => 3);
        expect(board.flat().some((c) => c === 1)).toBe(true);
    });
});
