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
            // Only 400 comes by default. Every heading, table heading and
            // the name in the bar is bold, and without a 700 face the
            // browser thickens the regular one instead of using a real bold.
            weights: [400, 700],
        },
        {
            provider: fontProviders.google(),
            name: 'Anonymous Pro',
            cssVariable: '--font-anonymous-pro',
            // The default stand-in is a sans-serif. Until this arrives, or
            // if it never does, code and cipher grids still need columns
            // that line up.
            fallbacks: ['monospace'],
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
