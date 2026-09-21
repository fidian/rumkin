/**
 * Conway's Game of Life, as the Lifegenesis demo plays it.
 *
 * Cells carry four states rather than two, so the CSS can fade a cell in
 * as it is born and out as it dies:
 *
 *   0  empty, and was empty
 *   1  just born
 *   2  alive, and was alive
 *   3  just died
 *
 * States 1 and 2 count as alive; 0 and 3 do not.
 *
 * No DOM here.
 */

export type Cell = 0 | 1 | 2 | 3;
export type Board = Cell[][];

export const isAlive = (board: Board, row: number, col: number) => {
    const cell = board[row]?.[col];
    return cell === 1 || cell === 2;
};

export const livingNeighbours = (board: Board, row: number, col: number) => {
    let count = 0;

    for (let dr = -1; dr <= 1; dr += 1) {
        for (let dc = -1; dc <= 1; dc += 1) {
            if ((dr || dc) && isAlive(board, row + dr, col + dc)) count += 1;
        }
    }

    return count;
};

/** Conway's rules: two or three neighbours to survive, exactly three to be born. */
export const nextCellState = (board: Board, row: number, col: number): Cell => {
    const neighbours = livingNeighbours(board, row, col);

    if (isAlive(board, row, col)) {
        return neighbours === 2 || neighbours === 3 ? 2 : 3;
    }

    return neighbours === 3 ? 1 : 0;
};

export const step = (board: Board): Board =>
    board.map((cells, row) =>
        cells.map((_, col) => nextCellState(board, row, col))
    );

export const emptyBoard = (width: number, height: number): Board =>
    Array.from({ length: height }, () => Array.from({ length: width }, () => 0));

/** A blob of live cells around a point, for keeping the board interesting. */
export const splat = (
    board: Board,
    row: number,
    col: number,
    times: number,
    pick: (max: number) => number
) => {
    for (let i = 0; i < times; i += 1) {
        const targetRow = row + pick(5) - 3;
        const targetCol = col + pick(5) - 3;

        if (board[targetRow]?.[targetCol] !== undefined) {
            board[targetRow][targetCol] = 1;
        }
    }
};

/** The smiling face the board starts from. */
const SMILE: [number, number, number[]][] = [
    [4, 7, [0, 0, 0, 0, 0, 0]],
    [5, 6, [0, 0, 1, 0, 0, 0, 0, 0]],
    [6, 5, [0, 0, 0, 1, 0, 0, 1, 0, 0, 0]],
    [7, 5, [0, 0, 0, 1, 0, 0, 0, 0, 0, 0]],
    [8, 5, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
    [9, 5, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
    [10, 5, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
    [11, 5, [0, 1, 0, 0, 0, 0, 0, 0, 1, 0]],
    [12, 5, [0, 1, 1, 0, 0, 0, 0, 1, 1, 0]],
    [13, 6, [0, 1, 1, 1, 1, 1, 1, 0]],
    [14, 7, [0, 0, 0, 0, 0, 0]],
];

export const drawSmile = (board: Board) => {
    for (const [row, startCol, values] of SMILE) {
        values.forEach((value, index) => {
            if (board[row]?.[startCol + index] !== undefined) {
                board[row][startCol + index] = value as Cell;
            }
        });
    }
};
