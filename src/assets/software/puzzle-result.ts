/**
 * The move count on the puzzle success pages: <puzzle-moves></puzzle-moves>
 *
 * The Java applet sent the player here with the count in the query string.
 * The applet is long gone, but the pages are still linked, and the original
 * read the same parameter, so this does too.
 */
import { component, html } from 'fudgel';

export const movesFromSearch = (search: string) =>
    new URLSearchParams(search).get('moves') ?? '';

component(
    'puzzle-moves',
    { template: html`{{moves}}` },
    class {
        moves = '';

        onInit() {
            this.moves = movesFromSearch(location.search);
        }
    }
);
