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
    image: {
        // Photographs on content pages are megapixel camera originals. A
        // constrained layout emits a srcset so the browser fetches a variant
        // near the size it will actually display.
        layout: 'constrained',
        responsiveStyles: true,
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
        // @fidian/rumkin-compression is written against Node's Buffer, which
        // browserify used to shim for it. src/assets/tools/compression.ts
        // installs the npm "buffer" polyfill before importing it.
        optimizeDeps: {
            include: ['buffer', '@fidian/rumkin-compression'],
        },
    },
});
