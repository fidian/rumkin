// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import yaml from '@rollup/plugin-yaml';
import { literalsHtmlCssMinifier } from '@literals/rollup-plugin-html-css-minifier';

// https://astro.build/config
export default defineConfig({
    site: 'https://rumkin.com',
    build: {
        // The Metalsmith site emitted "dir/index.html" for "dir/index.md" and
        // "page.html" for "page.md". Keep both so old URLs stay valid.
        format: 'preserve',
    },
    fonts: [
        {
            provider: fontProviders.google(),
            name: 'Ubuntu',
            cssVariable: '--font-ubuntu',
        },
        {
            provider: fontProviders.google(),
            name: 'Anonymous Pro',
            cssVariable: '--font-anonymous-pro',
        },
    ],
    vite: {
        plugins: [literalsHtmlCssMinifier(), yaml()],
    },
});
