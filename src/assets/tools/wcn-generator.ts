/**
 * The WCN settings builder: <wcn-generator></wcn-generator>
 *
 * Fills a template zip with the network's details and hands it back as a
 * download. The template substitution and validation are in wcn.ts.
 */
import { component, css, html } from 'fudgel';
import JSZip from 'jszip';
import {
    AUTHENTICATIONS,
    CONNECTION_TYPES,
    ENCRYPTIONS,
    fillTemplate,
    validate,
    type WcnSettings,
} from './wcn.ts';

const TEMPLATE_FILES = ['SMRTNTKY/WSETTING.TXT', 'SMRTNTKY/WSETTING.WFC'];

component(
    'wcn-generator',
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
            select {
                font: inherit;
                width: 100%;
            }

            .problem {
                color: #a00;
            }
        `,
        template: html`
            <p *for="field of choices">
                <label>
                    {{field.label}}
                    <select @input="setValue(field.name, $event)">
                        <option
                            *for="choice of field.options"
                            .value="choice.value"
                            .selected="choice.value === settings[field.name]"
                        >
                            {{choice.label}}
                        </option>
                    </select>
                </label>
            </p>

            <p>
                <label>
                    SSID (required)
                    <input
                        type="text"
                        spellcheck="false"
                        autocapitalize="off"
                        autocomplete="off"
                        autocorrect="off"
                        .value="settings.ssid"
                        @input="setValue('ssid', $event)"
                    />
                </label>
            </p>

            <p>
                <label>
                    Network key (required if there is encryption)
                    <input
                        type="text"
                        spellcheck="false"
                        autocapitalize="off"
                        autocomplete="off"
                        autocorrect="off"
                        .value="settings.networkKey"
                        @input="setValue('networkKey', $event)"
                    />
                </label>
            </p>

            <p *for="flag of flags">
                <label>
                    <input
                        type="checkbox"
                        .checked="isOn(flag.name, settings)"
                        @change="setFlag(flag.name, $event)"
                    />
                    {{flag.label}}
                </label>
            </p>

            <p class="problem" *for="problem of problems">{{problem}}</p>

            <p>
                <button
                    type="button"
                    @click="generate()"
                    .disabled="problems.length || working"
                >
                    {{working ? 'Building...' : 'Download the settings'}}
                </button>
            </p>

            <p class="problem" *if="failure">{{failure}}</p>
        `,
    },
    class {
        settings: WcnSettings & Record<string, unknown> = {
            connectionType: 'ESS',
            authentication: 'open',
            encryption: 'none',
            ssid: '',
            networkKey: '',
            automatically: false,
            ieee802dot1x: false,
        };
        includeAutorun = false;
        includeBatch = false;
        problems: string[] = [];
        failure = '';
        working = false;

        choices = [
            {
                name: 'connectionType',
                label: 'Connection type',
                options: CONNECTION_TYPES,
            },
            {
                name: 'authentication',
                label: 'Authentication',
                options: AUTHENTICATIONS,
            },
            { name: 'encryption', label: 'Encryption', options: ENCRYPTIONS },
        ];

        flags = [
            { name: 'automatically', label: 'Key is provided automatically' },
            { name: 'ieee802dot1x', label: 'IEEE 802.1x enabled' },
            { name: 'includeAutorun', label: 'Include an Autorun file' },
            {
                name: 'includeBatch',
                label: 'Include batch file that runs the setup program',
            },
        ];

        onInit() {
            this.revalidate();
        }

        isOn(name: string, settings: Record<string, unknown>) {
            return name in settings
                ? !!settings[name]
                : !!(this as unknown as Record<string, unknown>)[name];
        }

        setValue(name: string, event: Event) {
            this.settings = {
                ...this.settings,
                [name]: (event.target as HTMLInputElement).value,
            };
            this.revalidate();
        }

        setFlag(name: string, event: Event) {
            const on = (event.target as HTMLInputElement).checked;

            if (name in this.settings) {
                this.settings = { ...this.settings, [name]: on };
            } else {
                (this as unknown as Record<string, unknown>)[name] = on;
            }

            this.revalidate();
        }

        private revalidate() {
            this.problems = validate(this.settings);
        }

        async generate() {
            this.working = true;
            this.failure = '';

            try {
                const response = await fetch('wireless-settings.zip');
                const zip = await JSZip.loadAsync(await response.arrayBuffer());

                if (!this.includeAutorun) {
                    zip.remove('AUTORUN.INF');
                    zip.remove('SMRTNTKY/fcw.ico');
                }

                if (!this.includeBatch) {
                    zip.remove('Install_Wireless.bat');
                }

                for (const name of TEMPLATE_FILES) {
                    const file = zip.file(name);
                    if (!file) continue;
                    zip.file(
                        name,
                        fillTemplate(await file.async('string'), this.settings)
                    );
                }

                const blob = await zip.generateAsync({
                    compression: 'DEFLATE',
                    type: 'blob',
                });

                // saveAs from file-saver; a link with download does the same
                // thing in every browser that has been current this decade.
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'wireless-settings.zip';
                link.click();
                URL.revokeObjectURL(url);
            } catch (e) {
                this.failure = `Could not build the settings: ${
                    e instanceof Error ? e.message : String(e)
                }`;
            }

            this.working = false;
        }
    }
);
