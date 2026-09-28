/**
 * The reference list at the bottom of the Morse page: every code the
 * decoder understands, with the letters and prosigns it stands for.
 *
 *     <morse-table></morse-table>
 */
import { component, css, html } from 'fudgel';
import rumkinCipher from '@fidian/rumkin-cipher';
import { isLetter, isProsign, morseRows, type MorseEntry } from './morse-data.ts';

const data = (rumkinCipher.codeTree as { morseData: MorseEntry[] }).morseData;

component(
    'morse-table',
    {
        style: css`
            :host {
                display: block;
            }

            ul {
                columns: 5;
                list-style: none;
                padding: 0;
            }

            ul.wide {
                columns: 2;
            }

            @media (max-width: 60em) {
                ul {
                    columns: 3;
                }
            }

            @media (max-width: 40em) {
                ul {
                    columns: 2;
                }

                ul.wide {
                    columns: 1;
                }
            }

            code {
                font-family: var(--font-anonymous-pro), monospace;
                white-space: nowrap;
            }
        `,
        template: html`
            <ul>
                <li *for="row of letters">
                    {{row.labels}} &rarr; <code>{{row.code}}</code>
                </li>
            </ul>
            <ul class="wide">
                <li *for="row of prosigns">
                    {{row.labels}} &rarr; <code>{{row.code}}</code>
                </li>
            </ul>
        `,
    },
    class {
        letters = morseRows(data, isLetter);
        prosigns = morseRows(data, isProsign);
    }
);
