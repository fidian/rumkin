import { describe, expect, it } from 'vitest';
import isValidEmail from '@/assets/email/is-valid-email.ts';
import scenarios from '../../public/software/email/scenarios.json';

interface Scenario {
    email: string;
    valid: boolean;
    reason: string;
}

// The page publishes these 86 addresses with the answer for each. They are
// the page's own claim about what it accepts, so they are the test suite.
describe('isValidEmail', () => {
    for (const scenario of scenarios as Scenario[]) {
        const verdict = scenario.valid ? 'accepts' : 'rejects';
        it(`${verdict} ${JSON.stringify(scenario.email)} (${scenario.reason})`, () => {
            expect(isValidEmail(scenario.email)).toBe(scenario.valid);
        });
    }

    it('rejects an empty address', () => {
        expect(isValidEmail('')).toBe(false);
    });
});
