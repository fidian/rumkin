/**
 * The four tools on the passwords page: strength checker, diceware
 * passphrase generator, random password generator, and an MD5 hasher.
 *
 * Nothing typed here leaves the browser.
 */
import { component, css, html } from 'fudgel';
import md5 from 'blueimp-md5';
import PasswordStrengthChecker from 'tai-password-strength/lib/password-strength';
import commonPasswords from 'tai-password-strength/data/common-passwords.json';
import trigraphs from 'tai-password-strength/data/trigraphs.json';
import {
    generatePassphrase,
    generatePassword,
    makeCharacterSet,
    parseWordlist,
    PRESETS,
    type CharacterSetOptions,
} from './passwords.ts';

const SHARED = css`
    :host {
        display: block;
    }

    p {
        margin: 0.75em 0;
    }

    input[type='text'],
    input[type='password'],
    input[type='number'],
    select,
    textarea {
        font: inherit;
    }

    input[type='text'],
    input[type='password'],
    textarea {
        width: 100%;
    }

    .output {
        background-color: #ddd;
        border: 1px solid;
        margin: 0.5em 0;
        overflow-wrap: anywhere;
        padding: 0.5em;
    }

    .warning {
        font-weight: bold;
    }

    ul {
        margin: 0;
        padding-inline-start: 1.5em;
    }
`;

const NO_ASSIST = `spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off"`;

/* ------------------------------------------------------------------ */

const VERDICTS: Record<string, string> = {
    VERY_STRONG: 'This password is very strong, with about',
    STRONG: 'You have a strong password, which provides approximately',
    REASONABLE: 'Your password seems to be fairly good, and has',
    WEAK: 'Your password is weak and can be cracked or guessed easily. It provides',
};

component(
    'password-strength',
    {
        style: SHARED,
        template: html`
            <p>
                <label>
                    <input
                        type="checkbox"
                        .checked="showPassword"
                        @change="toggleShow($event)"
                    />
                    Show password
                </label>
                <br />
                <input
                    .type="showPassword ? 'text' : 'password'"
                    placeholder="Password or passphrase"
                    ${NO_ASSIST}
                    .value="password"
                    @input="check($event)"
                />
            </p>

            <div class="output">
                <div *if="!password">
                    Enter a password or passphrase to analyze
                </div>
                <div *if="password">
                    <div class="warning" *if="common">
                        WARNING: This is a common password!
                    </div>
                    <div>
                        <span class="warning" *if="veryWeak"
                            >VERY WEAK PASSWORD!</span
                        >
                        {{verdict}} {{bits}} bits of entropy.
                    </div>
                    <div>
                        Suggestions for improvement:
                        <ul>
                            <li *for="suggestion of suggestions">
                                {{suggestion}}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        `,
    },
    class {
        password = '';
        showPassword = false;
        common = false;
        veryWeak = false;
        verdict = '';
        bits = 0;
        suggestions: string[] = [];

        private checker = (() => {
            const checker = new PasswordStrengthChecker();
            checker.addCommonPasswords(commonPasswords);
            checker.addTrigraphMap(trigraphs);
            return checker;
        })();

        toggleShow(event: Event) {
            this.showPassword = (event.target as HTMLInputElement).checked;
        }

        check(event: Event) {
            this.password = (event.target as HTMLInputElement).value;

            if (!this.password) {
                this.suggestions = [];
                return;
            }

            const score = this.checker.check(this.password);
            this.common = !!score.commonPassword;
            this.bits = Math.floor(score.trigraphEntropyBits);
            this.veryWeak = !VERDICTS[score.strengthCode];
            this.verdict = this.veryWeak
                ? 'There are only'
                : VERDICTS[score.strengthCode];

            const sets = score.charsets;
            this.suggestions = [
                'Make the passphrase longer.',
                !sets.lower && 'Add lowercase letters.',
                !sets.upper && 'Add uppercase letters.',
                !sets.number && 'Add numbers.',
                !sets.punctuation && 'Add punctuation.',
                !sets.symbol && 'Add symbols, such as ones used for math.',
            ].filter((s): s is string => typeof s === 'string');
        }
    }
);

/* ------------------------------------------------------------------ */

interface WordlistMeta {
    uri: string;
    code: string;
    description: string;
    default?: boolean;
}

component(
    'diceware-passphrase',
    {
        style: SHARED,
        template: html`
            <p *if="loading">Loading word lists.</p>
            <p *if="problem">{{problem}}</p>

            <div *if="!loading && !problem">
                <p>
                    <label>
                        Word list:
                        <select @input="pickWordlist($event)">
                            <option
                                *for="list of wordlists"
                                .value="list.uri"
                                .selected="list.uri === chosen"
                            >
                                {{list.label}}
                            </option>
                        </select>
                    </label>
                </p>
                <p>
                    <label>
                        Number of words:
                        <input
                            type="number"
                            min="1"
                            max="20"
                            .value="count"
                            @input="setCount($event)"
                        />
                    </label>
                </p>
                <p>
                    <button type="button" @click="generate()">
                        Generate a passphrase
                    </button>
                </p>
                <div class="output">
                    {{result || 'Press the button for a passphrase.'}}
                </div>
            </div>
        `,
    },
    class {
        loading = true;
        problem = '';
        wordlists: (WordlistMeta & { label: string })[] = [];
        chosen = '';
        count = 6;
        result = '';

        private words: string[] = [];

        async onInit() {
            try {
                const response = await fetch('diceware-wordlists.json');
                const lists = (await response.json()) as WordlistMeta[];

                this.wordlists = lists.map((list) => ({
                    ...list,
                    label: `${list.code} - ${list.description}`,
                }));
                this.chosen =
                    lists.find((list) => list.default)?.uri ??
                    lists[0]?.uri ??
                    '';

                await this.loadWords();
            } catch {
                this.problem = 'Could not load the word lists.';
            }

            this.loading = false;
        }

        async pickWordlist(event: Event) {
            this.chosen = (event.target as HTMLSelectElement).value;
            await this.loadWords();
        }

        setCount(event: Event) {
            this.count = Number((event.target as HTMLInputElement).value);
        }

        generate() {
            this.result = generatePassphrase(this.count, this.words);
        }

        private async loadWords() {
            try {
                const response = await fetch(this.chosen);
                this.words = parseWordlist(await response.text());
            } catch {
                this.problem = 'Could not load that word list.';
            }
        }
    }
);

/* ------------------------------------------------------------------ */

component(
    'password-generator',
    {
        style: SHARED,
        template: html`
            <p>
                I have a few presets you may try:
                <button
                    *for="preset of presets"
                    type="button"
                    @click="usePreset(preset)"
                >
                    {{preset.label}}
                </button>
            </p>

            <p>
                <label>
                    Length:
                    <input
                        type="number"
                        min="1"
                        max="256"
                        .value="length"
                        @input="setLength($event)"
                    />
                </label>
            </p>

            <p *for="group of groups">
                <label>
                    <input
                        type="checkbox"
                        .checked="isOn(group.name, options)"
                        @change="toggle(group.name, $event)"
                    />
                    {{group.label}}
                </label>
            </p>

            <p>
                <label>
                    Other characters to include:
                    <input
                        type="text"
                        ${NO_ASSIST}
                        .value="options.other"
                        @input="setOther($event)"
                    />
                </label>
            </p>

            <p>
                <button type="button" @click="generate()" .disabled="!alphabet">
                    Generate a password
                </button>
                <span *if="!alphabet">Choose at least one kind of character.</span>
            </p>

            <div class="output">
                <div *if="!passwords.length">
                    Try pressing the button and see a new password.
                </div>
                <ul *if="passwords.length">
                    <li *for="password of passwords">{{password}}</li>
                </ul>
            </div>
        `,
    },
    class {
        presets = PRESETS;
        length = 24;
        options: CharacterSetOptions = {
            uppercase: true,
            lowercase: true,
            numbers: true,
            symbols: false,
            other: '',
        };
        alphabet = '';
        passwords: string[] = [];

        groups = [
            { name: 'uppercase', label: 'Use uppercase letters' },
            { name: 'lowercase', label: 'Use lowercase letters' },
            { name: 'numbers', label: 'Use numbers' },
            {
                name: 'symbols',
                label: 'Use mathematical symbols and punctuation',
            },
        ];

        onInit() {
            this.rebuild();
        }

        isOn(name: string, options: CharacterSetOptions) {
            return !!options[name as keyof CharacterSetOptions];
        }

        usePreset(preset: (typeof PRESETS)[number]) {
            this.length = preset.length;
            this.options = { other: '', ...preset.options };
            this.rebuild();
        }

        setLength(event: Event) {
            this.length = Number((event.target as HTMLInputElement).value);
        }

        toggle(name: string, event: Event) {
            this.options = {
                ...this.options,
                [name]: (event.target as HTMLInputElement).checked,
            };
            this.rebuild();
        }

        setOther(event: Event) {
            this.options = {
                ...this.options,
                other: (event.target as HTMLInputElement).value,
            };
            this.rebuild();
        }

        generate() {
            // Newest first, and only the last ten are kept on screen.
            this.passwords = [
                generatePassword(this.length, this.alphabet),
                ...this.passwords,
            ].slice(0, 10);
        }

        private rebuild() {
            this.alphabet = makeCharacterSet(this.options);
        }
    }
);

/* ------------------------------------------------------------------ */

component(
    'md5-hash',
    {
        style: SHARED,
        template: html`
            <textarea ${NO_ASSIST} @input="hash($event)"></textarea>
            <div class="output">MD5: {{result}}</div>
        `,
    },
    class {
        result = md5('');

        hash(event: Event) {
            this.result = md5((event.target as HTMLTextAreaElement).value);
        }
    }
);
