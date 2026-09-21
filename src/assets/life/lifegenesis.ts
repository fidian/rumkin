/**
 * The Lifegenesis demo: <life-genesis></life-genesis>
 *
 * Conway's Game of Life, animated by swapping CSS classes - which is the
 * technique the page is demonstrating. Random splatters keep the board from
 * settling into a still life. The rules are in life.ts.
 */
import { component, css, html } from 'fudgel';
import { drawSmile, emptyBoard, splat, step, type Board } from './life.ts';
import { randomIndex, randomNumber } from '../tools/random.ts';

const WIDTH = 20;
const HEIGHT = 20;
const TICK_MS = 1000;
/** How often a generation gets a splatter of new cells. */
const SPLAT_CHANCE = 0.4;

component(
    'life-genesis',
    {
        style: css`
            :host {
                display: block;
            }

            .board {
                background-color: black;
                line-height: 1px;
                margin: 0 auto;
                width: 220px;
            }

            .row {
                display: flex;
            }

            /* The cell colours are global; the legend below the board uses
               the same classes outside this component. */

        `,
        template: html`
            <div class="board">
                <div class="row" *for="row of rows">
                    <div
                        class="cell state{{cell.state}}"
                        *for="cell of row.cells"
                    ></div>
                </div>
            </div>
        `,
    },
    class {
        rows: { cells: { state: number }[] }[] = [];

        private board: Board = emptyBoard(WIDTH, HEIGHT);
        private timer?: ReturnType<typeof setInterval>;

        onInit() {
            for (let i = 0; i < 10; i += 1) this.splatter();
            drawSmile(this.board);
            this.publish();

            this.timer = setInterval(() => {
                this.board = step(this.board);
                if (randomNumber() < SPLAT_CHANCE) this.splatter();
                this.publish();
            }, TICK_MS);
        }

        onDestroy() {
            clearInterval(this.timer);
        }

        private splatter() {
            splat(
                this.board,
                randomIndex(HEIGHT),
                randomIndex(WIDTH),
                randomIndex(5),
                randomIndex
            );
        }

        private publish() {
            // New objects, so the bindings see a top-level assignment.
            this.rows = this.board.map((cells) => ({
                cells: cells.map((state) => ({ state })),
            }));
        }
    }
);
