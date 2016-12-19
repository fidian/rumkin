/*global $, document, window*/
$(function () {
	'use strict';

	var cells;

	function rand(max) {
		return Math.floor(Math.random() * max);
	}

	function Cell() {
		this.$element = null;
		this.neighbors = [];
		this.state = 0;
		this.previousState = null;
	}

	Cell.prototype.addNeighbor = function (otherCell) {
		if (this.neighbors.some(function (neighbor) {
				return neighbor === otherCell;
			})) {
			return;
		}

		this.neighbors.push(otherCell);
	};

	Cell.prototype.getNextState = function () {
		var livingNeighbors;
		livingNeighbors = 0;
		this.neighbors.forEach(function (neighbor) {
			if (neighbor.isAlive()) {
				livingNeighbors += 1;
			}
		});

		if (this.isAlive()) {
			if (livingNeighbors === 2 || livingNeighbors === 3) {
				return 2;  // Lasting
			}

			return 3;  // Dying
		}

		if (livingNeighbors === 3) {
			return 1;  // New
		}

		return 0;  // Empty
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
			this.$element.removeClass('state' + this.previousState);
		}

		this.$element.addClass('state' + this.state);
		console.log(this.$element[0].className);
		this.previousState = this.state;
	};

	function makeCells(rows, cols) {
		var row, col, result, cell, neighborOffsets;

		function addNeighbors(cell, row, col, offset) {
			var otherCell;

			if (result[row + offset[0]] === undefined) {
				return;
			}

			otherCell = result[row + offset[0]][col + offset[1]];

			if (otherCell === undefined) {
				return;
			}

			cell.addNeighbor(otherCell);
			otherCell.addNeighbor(cell);
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


	function makeCellHtml(cells) {
		var fragment;

		fragment = document.createDocumentFragment();

		cells.forEach(function (row, rowNumber) {
			row.forEach(function (cell, column) {
				var $child;

				if (column === 0 && rowNumber) {
					fragment.appendChild($('<br>')[0]);
				}

				$child = $('<div class="cell"></div>');
				fragment.appendChild($child[0]);
				cell.setElement($child);
			});
		});

		return fragment;
	}

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

		pairs.forEach(function (coords) {
			cellList[coords[0]][coords[1]].setState(1);
		});
	}

	function randomSplat(cellList) {
		var row, col, loops, offsetX, offsetY, cell;

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

	function updateCells(cellList) {
		var nextStates;

		if (Math.random() < 0.2) {
			randomSplat(cellList);
		}

		nextStates = [];
		cellList.forEach(function (rows) {
			rows.forEach(function (cell) {
				// First, calculate new states
				nextStates.push({
					cell: cell,
					nextState: cell.getNextState()
				});
			});
		});

		nextStates.forEach(function (dataForUpdate) {
			dataForUpdate.cell.setState(dataForUpdate.nextState);
		});
	}

	cells = makeCells(10, 10);
	smile(cells);
	$('.lifegenesis').append(makeCellHtml(cells));
	window.setInterval(updateCells.bind(null, cells), 2000);
});
