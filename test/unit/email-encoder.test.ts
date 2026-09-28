import { describe, expect, it } from 'vitest';
import {
    breakObfuscate,
    encodeEmail,
    mailtoUrl,
    makeLink,
    shuffledObfuscate,
    shuffleUnique,
} from '@/assets/tools/email-encoder.ts';

/** Run a generated snippet the way a browser would, collecting the output. */
const runSnippet = (snippet: string) => {
    const body = snippet.replace(/<\/?script>/g, '');
    const written: string[] = [];
    new Function('document', body)({
        write: (s: string) => written.push(s),
    });
    return written.join('');
};

describe('mailtoUrl', () => {
    it('is just the address when nothing else is filled in', () => {
        expect(mailtoUrl({ to: 'user@example.com' })).toBe('user@example.com');
    });

    it('adds the headers that were given, in order', () => {
        expect(
            mailtoUrl({
                to: 'user@example.com',
                subject: 'Hello there',
                cc: 'other@example.com',
            })
        ).toBe(
            'user@example.com?subject=Hello%20there&cc=other@example.com'
        );
    });

    it('leaves out the headers that were not', () => {
        expect(mailtoUrl({ to: 'a@b.com', subject: '' })).toBe('a@b.com');
    });
});

describe('makeLink', () => {
    it('returns the bare address when asked for no encoding', () => {
        expect(makeLink({ to: 'a@b.com', encoding: 'none' })).toBe('a@b.com');
    });

    it('builds an anchor', () => {
        expect(makeLink({ to: 'a@b.com', linkText: 'Mail me' })).toBe(
            '<a href="mailto:a@b.com">Mail me</a>'
        );
    });

    it('escapes the link text rather than trusting it', () => {
        expect(
            makeLink({ to: 'a@b.com', linkText: '<script>x</script>' })
        ).toContain('&lt;script&gt;');
    });

    it('carries extra attributes through', () => {
        expect(
            makeLink({ to: 'a@b.com', linkExtra: 'class="email"' })
        ).toContain('<a class="email" href=');
    });
});

describe('shuffleUnique', () => {
    const front = () => 0;

    it('keeps one of each character', () => {
        expect([...shuffleUnique('aabbcc', front)].sort().join('')).toBe('abc');
    });

    it('puts "<" last so the output cannot open a tag', () => {
        expect(shuffleUnique('a<b', front).endsWith('<')).toBe(true);
    });

    it('handles text with no "<" in it', () => {
        expect(shuffleUnique('abc', front)).not.toContain('<');
    });
});

describe('shuffledObfuscate', () => {
    it('produces a script that writes the original back', () => {
        const text = '<a href="mailto:user@example.com">user@example.com</a>';
        expect(runSnippet(shuffledObfuscate(text))).toBe(text);
    });
});

describe('breakObfuscate', () => {
    it('produces a script that writes the original back', () => {
        // The bug this guards: the original called join() with no argument,
        // which joins with commas, so the generated snippet wrote
        // "us,er,@ex,ample.com" onto the page instead of the address.
        const text = '<a href="mailto:user@example.com">user@example.com</a>';
        expect(runSnippet(breakObfuscate(text))).toBe(text);
    });

    it('does not put commas between the pieces', () => {
        expect(runSnippet(breakObfuscate('user@example.com'))).toBe(
            'user@example.com'
        );
    });

    it('always makes progress, even if the run length is zero', () => {
        expect(runSnippet(breakObfuscate('abc', () => 0))).toBe('abc');
    });
});

describe('encodeEmail', () => {
    it('leaves the link alone when no obfuscation is asked for', () => {
        expect(
            encodeEmail({ to: 'a@b.com', linkText: 'x', obfuscation: 'none' })
        ).toBe('<a href="mailto:a@b.com">x</a>');
    });

    it('round-trips through either obfuscation', () => {
        for (const obfuscation of ['break', 'shuffled'] as const) {
            const encoded = encodeEmail({
                to: 'user@example.com',
                linkText: 'Mail me',
                obfuscation,
            });
            expect(runSnippet(encoded)).toBe(
                '<a href="mailto:user@example.com">Mail me</a>'
            );
        }
    });
});
