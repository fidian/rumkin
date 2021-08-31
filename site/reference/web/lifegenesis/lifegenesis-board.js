/* global m */
"use strict";

const random = require("../../../js/module/random");

module.exports = class LifegenesisBoard {
    constructor() {
        this.width = 20;
        this.height = 20;
        this.board = [];

        while (this.board.length < this.height) {
            const row = [];

            while (row.length < this.width) {
                row.push(0);
            }

            this.board.push(row);
        }

        for (let i = 0; i < 10; i += 1) {
            this.randomSplat();
        }

        this.setSmile();

        setInterval(() => {
            this.updateCells();

            if (random.number() < 0.4) {
                this.randomSplat();
            }

            m.redraw();
        }, 1000);
    }

    randomSplat() {
        const row = random.index(this.height);
        const col = random.index(this.width);
        let loops = random.index(5);

        while (loops) {
            loops -= 1;
            const targetRow = row + random.index(5) - 3;
            const targetCol = col + random.index(5) - 3;

            if (
                targetRow >= 0 &&
                targetRow < this.height &&
                targetCol >= 0 &&
                targetCol < this.width
            ) {
                this.board[targetRow][targetCol] = 1;
            }
        }
    }

    setSmile() {
        this.smileLine(4, 7, [0, 0, 0, 0, 0, 0]);
        this.smileLine(5, 6, [0, 0, 1, 0, 0, 0, 0, 0]);
        this.smileLine(6, 5, [0, 0, 0, 1, 0, 0, 1, 0, 0, 0]);
        this.smileLine(7, 5, [0, 0, 0, 1, 0, 0, 0, 0, 0, 0]);
        this.smileLine(8, 5, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        this.smileLine(9, 5, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        this.smileLine(10, 5, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        this.smileLine(11, 5, [0, 1, 0, 0, 0, 0, 0, 0, 1, 0]);
        this.smileLine(12, 5, [0, 1, 1, 0, 0, 0, 0, 1, 1, 0]);
        this.smileLine(13, 6, [0, 1, 1, 1, 1, 1, 1, 0]);
        this.smileLine(14, 7, [0, 0, 0, 0, 0, 0]);
    }

    smileLine(startRow, startCol, values) {
        let y = startCol;

        for (const value of values) {
            this.board[startRow][y] = value;
            y += 1;
        }
    }

    getNextCellState(row, col) {
        let livingNeighbors = 0;

        for (let rowOffset = -1; rowOffset <= 1; rowOffset += 1) {
            for (let colOffset = -1; colOffset <= 1; colOffset += 1) {
                if (
                    (rowOffset || colOffset) &&
                    this.isAlive(row + rowOffset, col + colOffset)
                ) {
                    livingNeighbors += 1;
                }
            }
        }

        if (this.isAlive(row, col)) {
            if (livingNeighbors === 2 || livingNeighbors === 3) {
                return 2;
            }

            return 3;
        }

        if (livingNeighbors === 3) {
            return 1;
        }

        return 0;
    }

    isAlive(row, col) {
        if (row < 0 || row >= this.height || col < 0 || col >= this.width) {
            return false;
        }

        const state = this.board[row][col];

        return state === 1 || state === 2;
    }

    updateCells() {
        const next = [];

        for (let row = 0; row < this.height; row += 1) {
            const rowCells = [];
            next.push(rowCells);

            for (let col = 0; col < this.width; col += 1) {
                rowCells.push(this.getNextCellState(row, col));
            }
        }

        this.board = next;
    }

    view() {
        return m(
            "div",
            this.board.map((row) => {
                return m(
                    "div",
                    {
                        class: "row"
                    },
                    row.map((cell) => {
                        return m("div", {
                            class: `cell state${cell}`
                        });
                    })
                );
            })
        );
    }
};
