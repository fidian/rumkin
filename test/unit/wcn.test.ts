import { describe, expect, it } from 'vitest';
import { fillTemplate, validate, type WcnSettings } from '@/assets/tools/wcn.ts';

const settings: WcnSettings = {
    connectionType: 'ESS',
    authentication: 'WPA2-PSK',
    encryption: 'AES',
    ssid: 'MyNetwork',
    networkKey: 'secret',
    automatically: false,
    ieee802dot1x: true,
};

describe('fillTemplate', () => {
    it('substitutes the named fields', () => {
        expect(fillTemplate('SSID={{ssid}} KEY={{networkKey}}', settings)).toBe(
            'SSID=MyNetwork KEY=secret'
        );
    });

    it('writes booleans as 1 and 0, which is what the files expect', () => {
        expect(
            fillTemplate('{{ieee802dot1x}}/{{automatically}}', settings)
        ).toBe('1/0');
    });

    it('leaves a field it does not know out, as the original did', () => {
        expect(fillTemplate('a{{nosuchfield}}b', settings)).toBe('ab');
    });

    it('leaves text with no placeholders alone', () => {
        expect(fillTemplate('plain text', settings)).toBe('plain text');
    });

    it('handles a stray closing brace', () => {
        expect(fillTemplate('{{ssid}} }} end', settings)).toBe(
            'MyNetwork }} end'
        );
    });
});

describe('validate', () => {
    it('is happy with a complete set', () => {
        expect(validate(settings)).toEqual([]);
    });

    it('asks for an SSID', () => {
        expect(validate({ ...settings, ssid: '  ' })[0]).toContain('SSID');
    });

    it('asks for a key when encryption is on', () => {
        expect(
            validate({ ...settings, networkKey: '' })[0]
        ).toContain('network key');
    });

    it('does not ask for a key on an open network', () => {
        expect(
            validate({ ...settings, encryption: 'none', networkKey: '' })
        ).toEqual([]);
    });

    it('does not ask for a key that is provided automatically', () => {
        expect(
            validate({ ...settings, networkKey: '', automatically: true })
        ).toEqual([]);
    });
});
