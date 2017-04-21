/* global $, document, window */
"use strict";
$(() => {
    var cells;

    /**
     * Returns an integer within [0, max).
     *
     * @param {number} max
     * @return {number}
     */
    function rand(max) {
        return Math.floor(Math.random() * max);
    }


    /**
     * A Cell object
     */
    function Cell() {
        this.$element = null;
        this.neighbors = [];
        this.state = 0;
        this.previousState = null;
    }

    Cell.prototype.addNeighbor = function (otherCell) {
        if (this.neighbors.some((neighbor) => {
            return neighbor === otherCell;
        })) {
            return;
        }

        this.neighbors.push(otherCell);
    };

    Cell.prototype.getNextState = function () {
        var livingNeighbors;

        livingNeighbors = 0;
        this.neighbors.forEach((neighbor) => {
            if (neighbor.isAlive()) {
                livingNeighbors += 1;
            }
        });

        if (this.isAlive()) {
            if (livingNeighbors === 2 || livingNeighbors === 3) {
                // Living
                return 2;
            }

            // Dying
            return 3;
        }

        if (livingNeighbors === 3) {
            // New
            return 1;
        }

        // Empty
        return 0;
    };

    Cell.prototype.isAlive = function () {
        if (this.state >= 1 && this.state <= 2) {
            return true;
        }

        return false;
    };

    Cell.prototype.setElement = function ($element) {
        this.$element = $element;
        this.previousState = null;
        this.updateElement();
    };

    Cell.prototype.setState = function (state) {
        this.state = state;
        this.updateElement();
    };

    Cell.prototype.updateElement = function () {
        if (!this.$element) {
            return;
        }

        if (this.previousState !== null) {
            this.$element.removeClass(`state${this.previousState}`);
        }

        this.$element.addClass(`state${this.state}`);
        this.previousState = this.state;
    };


    /**
     * Creates the Cell objects to fill a table.
     *
     * @param {number} rows
     * @param {number} cols
     * @return {Array.<Array.<Cell>>}
     */
    function makeCells(rows, cols) {
        var cell, col, neighborOffsets, result, row;

        /**
         * Finds nearby neighbors and links both cells together.
         *
         * @param {Cell} cellTarget
         * @param {number} rowTarget
         * @param {number} colTarget
         * @param {number} offset
         */
        function addNeighbors(cellTarget, rowTarget, colTarget, offset) {
            var otherCell;

            if (typeof result[rowTarget + offset[0]] === "undefined") {
                return;
            }

            otherCell = result[rowTarget + offset[0]][colTarget + offset[1]];

            if (typeof otherCell === "undefined") {
                return;
            }

            cellTarget.addNeighbor(otherCell);
            otherCell.addNeighbor(cellTarget);
        }

        result = [];
        neighborOffsets = [
            [-1, -1],
            [-1, 0],
            [-1, 1],
            [0, -1]
        ];

        // Create cells
        for (row = 0; row < rows; row += 1) {
            result[row] = [];

            for (col = 0; col < cols; col += 1) {
                cell = new Cell();
                neighborOffsets.forEach(addNeighbors.bind(null, cell, row, col));
                result[row][col] = cell;
            }
        }

        return result;
    }


    /**
     * Creates the HTML for the cells
     *
     * @param {Array.<Array.<Cell>>} cellList
     * @return {string} HTML
     */
    function makeCellHtml(cellList) {
        var fragment;

        fragment = document.createDocumentFragment();

        cellList.forEach((row, rowNumber) => {
            row.forEach((cell, column) => {
                var $child;

                if (column === 0 && rowNumber) {
                    fragment.appendChild($("<br>")[0]);
                }

                $child = $("<div class=\"cell\"></div>");
                fragment.appendChild($child[0]);
                cell.setElement($child);
            });
        });

        return fragment;
    }


    /**
     * Adds a smiling face to the table
     *
     * @param {Array.<Array.<Cell>>} cellList
     */
    function smile(cellList) {
        var pairs;

        pairs = [
            // Eyes
            [0, 3],
            [0, 6],
            [1, 3],
            [1, 6],
            [2, 3],
            [2, 6],

            // Smile
            [5, 1],
            [5, 8],
            [6, 1],
            [6, 8],
            [7, 1],
            [7, 2],
            [7, 7],
            [7, 8],
            [8, 2],
            [8, 3],
            [8, 4],
            [8, 5],
            [8, 6],
            [8, 7]
        ];

        pairs.forEach((coords) => {
            cellList[coords[0]][coords[1]].setState(1);
        });
    }


    /**
     * Simulate a random blob spontaneously coming into existence.
     *
     * @param {Array.<Array.<Cell>>} cellList
     */
    function randomSplat(cellList) {
        var cell, col, loops, offsetX, offsetY, row;

        row = rand(cellList.length);
        col = rand(cellList[row].length);
        loops = rand(5);

        while (loops) {
            loops -= 1;
            offsetX = rand(5) - 3;
            offsetY = rand(5) - 3;
            cell = cellList[row + offsetX][col + offsetY];

            if (cell) {
                cell.setState(1);
            }
        }
    }


    /**
     * Determines the cell's next state.
     *
     * @param {Array.<Array.<Cell>>} cellList
     */
    function updateCells(cellList) {
        var nextStates;

        if (Math.random() < 0.2) {
            randomSplat(cellList);
        }

        nextStates = [];
        cellList.forEach((rows) => {
            rows.forEach((cell) => {
                // First, calculate new states
                nextStates.push({
                    cell,
                    nextState: cell.getNextState()
                });
            });
        });

        nextStates.forEach((dataForUpdate) => {
            dataForUpdate.cell.setState(dataForUpdate.nextState);
        });
    }

    cells = makeCells(10, 10);
    smile(cells);
    $(".lifegenesis").append(makeCellHtml(cells));
    window.setInterval(updateCells.bind(null, cells), 2000);
});
