import { describe, expect, it } from 'vitest';
import Generator, {
    hideEffects,
    showEffects,
} from '@/assets/marquee/generator.ts';

const build = (showMethod: string, hideMethod: string, message = 'Hello') => {
    const generator = new Generator();
    generator.message = message;
    generator.showMethod = showMethod;
    generator.hideMethod = hideMethod;
    generator.addConfig(generator.makePreview());
    generator.update();
    return generator;
};

describe('the effect tables', () => {
    it('offers the show effects', () => {
        expect(Object.keys(showEffects)).toContain('typing');
    });

    it('offers hide effects that have no show counterpart', () => {
        for (const key of ['backspace', 'explode', 'flyOff']) {
            expect(hideEffects).toHaveProperty(key);
            expect(showEffects).not.toHaveProperty(key);
        }
    });
});

describe('makePreview', () => {
    it('works for a hide effect that is not also a show effect', () => {
        // The bug this guards: hideVariables was looked up in the show
        // table using the hide method's name, so choosing Backspace,
        // Explode or Fly Off threw and the tool stopped working.
        for (const hide of ['backspace', 'explode', 'flyOff']) {
            expect(() => build('typing', hide)).not.toThrow();
        }
    });

    it('collects each effect variable', () => {
        const generator = build('typing', 'none');
        const preview = generator.animationList[0];
        expect(preview.showVariables.length).toBe(
            showEffects.typing.variables.length
        );
    });
});

describe('generateCode', () => {
    it('says so when there is nothing to animate', () => {
        expect(new Generator().generateCode()).toContain('No animations');
    });

    it('produces a self-contained function', () => {
        const code = build('typing', 'backspace').generatedCode;
        expect(code.startsWith('(function () {')).toBe(true);
        expect(code.trimEnd().endsWith('})()')).toBe(true);
    });

    it('produces code that parses', () => {
        for (const show of Object.keys(showEffects)) {
            for (const hide of Object.keys(hideEffects)) {
                const code = build(show, hide).generatedCode;
                expect(
                    () => new Function(code),
                    `${show} + ${hide}`
                ).not.toThrow();
            }
        }
    });

    it('includes the helpers an effect declares it needs', () => {
        // Typing depends on a random helper, so it has to be emitted.
        expect(build('typing', 'none').generatedCode).toContain('random');
    });

    it('leaves the repeat out when it is turned off', () => {
        const generator = build('none', 'none');
        const withRepeat = generator.generatedCode;

        generator.repeat = false;
        generator.update();

        expect(withRepeat).toContain('steps.push(step)');
        expect(generator.generatedCode).not.toContain('steps.push(step);\n');
    });
});
