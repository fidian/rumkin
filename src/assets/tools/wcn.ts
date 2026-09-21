/**
 * Wireless Connection Now (WCN) settings builder.
 *
 * Windows XP and Vista could take wireless settings from a USB stick. This
 * fills in a template zip with the network's details so the stick can be
 * written. The template substitution is here; the zip handling is in the
 * component.
 */

export interface WcnSettings {
    connectionType: string;
    authentication: string;
    encryption: string;
    ssid: string;
    networkKey: string;
    automatically: boolean;
    ieee802dot1x: boolean;
}

/**
 * Fill a `{{field}}` template. Booleans become 1 or 0, which is what the
 * settings files expect. A field the template names but the settings do
 * not have is left out, exactly as the original did.
 */
export const fillTemplate = (template: string, settings: WcnSettings) => {
    const values: Record<string, string | number> = {
        ...settings,
        automatically: settings.automatically ? 1 : 0,
        ieee802dot1x: settings.ieee802dot1x ? 1 : 0,
        // The files use these names for the numeric forms.
        automaticallyNumber: settings.automatically ? 1 : 0,
        ieee802dot1xNumber: settings.ieee802dot1x ? 1 : 0,
    };

    const [first, ...rest] = template.split('{{');
    let result = first;

    for (const chunk of rest) {
        const [name, ...after] = chunk.split('}}');

        if (name in values) {
            result += String(values[name]);
        }

        result += after.join('}}');
    }

    return result;
};

export const CONNECTION_TYPES = [
    { value: 'ESS', label: 'Infrastructure mode (ESS, uses access point)' },
    { value: 'IBSS', label: 'Ad-Hoc (IBSS, peer to peer)' },
];

export const AUTHENTICATIONS = [
    { value: 'open', label: 'Open network' },
    { value: 'shared', label: 'Shared' },
    { value: 'WPA-NONE', label: 'WPA-NONE' },
    { value: 'WPA', label: 'WPA' },
    { value: 'WPA-PSK', label: 'WPA-PSK' },
    { value: 'WPA2', label: 'WPA2' },
    { value: 'WPA2-PSK', label: 'WPA2-PSK' },
];

export const ENCRYPTIONS = [
    { value: 'none', label: 'No encryption' },
    { value: 'WEP', label: 'WEP (Insecure)' },
    { value: 'TKIP', label: 'TKIP' },
    { value: 'AES', label: 'AES' },
];

/** What is missing before the settings can be written. */
export const validate = (settings: WcnSettings): string[] => {
    const problems: string[] = [];

    if (!settings.ssid.trim()) {
        problems.push('Enter an SSID.');
    }

    if (
        settings.encryption !== 'none' &&
        !settings.networkKey &&
        !settings.automatically
    ) {
        problems.push(
            'Enter a network key, or say that the key is provided automatically.'
        );
    }

    return problems;
};
