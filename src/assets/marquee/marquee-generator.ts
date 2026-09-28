/**
 * The marquee generator: <marquee-generator></marquee-generator>
 *
 * Build up a list of messages with a show and a hide effect each, watch the
 * preview, and copy the standalone JavaScript it produces. The generation
 * is in generator.ts.
 */
import { component, css, html } from 'fudgel';
import Generator, { hideEffects, showEffects } from './generator.ts';

interface EffectVariable {
    name: string;
    description: string;
    isNumeric?: boolean;
    default: number | string;
    currentValue?: number | string;
}

interface Effect {
    key: string;
    title: string;
    description: string;
    variables?: EffectVariable[];
}

const list = (table: Record<string, Effect>) => Object.values(table);

component(
    'marquee-generator',
    {
        style: css`
            :host {
                display: block;
            }

            p {
                margin: 0.75em 0;
            }

            label {
                display: block;
            }

            input[type='text'],
            input[type='number'],
            select,
            textarea {
                font: inherit;
            }

            input[type='text'],
            textarea {
                width: 100%;
            }

            .effect {
                border: 1px solid;
                margin: 0.5em 0;
                padding: 0.5em;
            }

            .description {
                font-style: italic;
            }

            .preview {
                background-color: #ddd;
                border: 1px solid;
                font-family: var(--font-anonymous-pro), monospace;
                min-height: 1.5em;
                padding: 0.5em;
            }

            pre {
                background-color: #ddd;
                border: 1px solid;
                overflow-x: auto;
                padding: 0.5em;
            }

            .steps li {
                margin: 0.25em 0;
            }
        `,
        template: html`
            <p>
                <label>
                    Message
                    <input
                        type="text"
                        spellcheck="false"
                        .value="message"
                        @input="setMessage($event)"
                    />
                </label>
            </p>

            <div class="effect">
                <label>
                    How it appears
                    <select @input="setShow($event)">
                        <option
                            *for="effect of showList"
                            .value="effect.key"
                            .selected="effect.key === showMethod"
                        >
                            {{effect.title}}
                        </option>
                    </select>
                </label>
                <p class="description">{{showDescription}}</p>
                <p *for="variable of showVariables">
                    <label>
                        {{variable.name}}
                        <input
                            type="number"
                            step="any"
                            .value="variable.value"
                            @input="setVariable('show', variable.index, $event)"
                        />
                    </label>
                    <span class="description">{{variable.description}}</span>
                </p>
            </div>

            <p>
                <label>
                    Seconds to read the message
                    <input
                        type="number"
                        step="any"
                        min="0"
                        .value="readDelay"
                        @input="setDelay('readDelay', $event)"
                    />
                </label>
            </p>

            <div class="effect">
                <label>
                    How it leaves
                    <select @input="setHide($event)">
                        <option
                            *for="effect of hideList"
                            .value="effect.key"
                            .selected="effect.key === hideMethod"
                        >
                            {{effect.title}}
                        </option>
                    </select>
                </label>
                <p class="description">{{hideDescription}}</p>
                <p *for="variable of hideVariables">
                    <label>
                        {{variable.name}}
                        <input
                            type="number"
                            step="any"
                            .value="variable.value"
                            @input="setVariable('hide', variable.index, $event)"
                        />
                    </label>
                    <span class="description">{{variable.description}}</span>
                </p>
            </div>

            <p>
                <label>
                    Seconds before the next message
                    <input
                        type="number"
                        step="any"
                        min="0"
                        .value="betweenDelay"
                        @input="setDelay('betweenDelay', $event)"
                    />
                </label>
            </p>

            <p>
                <button type="button" @click="add()" .disabled="!message">
                    Add this message
                </button>
            </p>

            <div *if="steps.length">
                <h3>Messages so far</h3>
                <ol class="steps">
                    <li *for="step of steps">
                        {{step.label}}
                        <button type="button" @click="remove(step.index)">
                            remove
                        </button>
                    </li>
                </ol>

                <p>
                    <label>
                        <input
                            type="checkbox"
                            .checked="repeat"
                            @change="setRepeat($event)"
                        />
                        Repeat forever
                    </label>
                </p>

                <h3>Preview</h3>
                <p class="preview">{{preview}}</p>

                <h3>The code</h3>
                <pre>{{code}}</pre>
            </div>
        `,
    },
    class {
        showList = list(showEffects as unknown as Record<string, Effect>);
        hideList = list(hideEffects as unknown as Record<string, Effect>);
        message = '';
        showMethod = 'none';
        hideMethod = 'none';
        showDescription = '';
        hideDescription = '';
        readDelay = 1.5;
        betweenDelay = 0.5;
        repeat = true;
        preview = '';
        code = '';
        steps: { index: number; label: string }[] = [];
        showVariables: {
            index: number;
            name: string;
            description: string;
            value: number | string;
        }[] = [];
        hideVariables: typeof this.showVariables = [];

        private generator = new Generator();

        onInit() {
            this.generator.onPreview = (text: string) => {
                this.preview = text;
            };
            this.syncEffects();
            this.refresh();
        }

        onDestroy() {
            this.generator.timeout?.clear?.();
        }

        setMessage(event: Event) {
            this.message = (event.target as HTMLInputElement).value;
            this.generator.message = this.message;
        }

        setShow(event: Event) {
            this.showMethod = (event.target as HTMLSelectElement).value;
            this.generator.showMethod = this.showMethod;
            this.syncEffects();
        }

        setHide(event: Event) {
            this.hideMethod = (event.target as HTMLSelectElement).value;
            this.generator.hideMethod = this.hideMethod;
            this.syncEffects();
        }

        setDelay(name: 'readDelay' | 'betweenDelay', event: Event) {
            const value = Number((event.target as HTMLInputElement).value);
            this[name] = value;
            this.generator[name] = value;
        }

        setRepeat(event: Event) {
            this.repeat = (event.target as HTMLInputElement).checked;
            this.generator.repeat = this.repeat;
            this.refresh();
        }

        setVariable(which: 'show' | 'hide', index: number, event: Event) {
            const table = which === 'show' ? showEffects : hideEffects;
            const key = which === 'show' ? this.showMethod : this.hideMethod;
            const effect = (table as Record<string, Effect>)[key];
            const variable = effect?.variables?.[index];
            if (!variable) return;

            const raw = (event.target as HTMLInputElement).value;
            variable.currentValue = variable.isNumeric ? Number(raw) : raw;
            this.syncEffects();
        }

        add() {
            this.generator.addConfig(this.generator.makePreview());
            this.refresh();
        }

        remove(index: number) {
            this.generator.animationList.splice(index, 1);
            this.refresh();
        }

        private syncEffects() {
            const describe = (
                table: Record<string, Effect>,
                key: string
            ) => {
                const effect = table[key];
                return {
                    description: effect?.description ?? '',
                    variables: (effect?.variables ?? []).map((v, index) => ({
                        index,
                        name: v.name,
                        description: v.description,
                        value: v.currentValue ?? v.default,
                    })),
                };
            };

            const shown = describe(
                showEffects as unknown as Record<string, Effect>,
                this.showMethod
            );
            const hidden = describe(
                hideEffects as unknown as Record<string, Effect>,
                this.hideMethod
            );

            this.showDescription = shown.description;
            this.showVariables = shown.variables;
            this.hideDescription = hidden.description;
            this.hideVariables = hidden.variables;
        }

        private refresh() {
            this.generator.update();
            this.code = this.generator.generatedCode;
            this.steps = this.generator.animationList.map(
                (anim: { message: string }, index: number) => ({
                    index,
                    label: anim.message || '(blank)',
                })
            );
        }
    }
);
