"use strict";

var handlebars, metadata, sugar;


handlebars = require("handlebars");


/* ********************************************************************
 * Build metadata
 ******************************************************************* */
metadata = require("./metadata.json");
metadata.buildYear = new Date().getFullYear();

if (process.env.SERVE) {
    metadata.liveReload = true;
}

/* ********************************************************************
 * Make the new Metalsmith object
 ******************************************************************* */
sugar = require("metalsmith-sugar")({
    clean: true,
    destination: "./build",
    metadata,
    source: "./site"
});


/* ********************************************************************
 * Make the new Metalsmith object
 ******************************************************************* */
// Load files referenced in `data` metadata property.
sugar.use("metalsmith-data-loader", {
    removeSource: true
});


/* ********************************************************************
 * Markdown -> HTML
 *
 * Must happen before CSS for Atomizer plugin.
 ******************************************************************* */
// Set up links so indices and automatic subpage listings can be generated
// within a document.
sugar.use("metalsmith-ancestry");
// Allow Mustache templates to build sub-links
sugar.use("metalsmith-relative-links");
// Add `propName?` and `_parent` properties throughout the metadata.  This
// is added early for mustache parsing in markdown before templating.
sugar.use("metalsmith-mustache-metadata", {
    match: "**/*.{htm,html,md}"
});
// Parse Markdown using Handlebars to be able to build tables and generate
// content from metadata.  Unfortunately, in order to report parse errors,
// this debug setting needs to be set.
sugar.use("metalsmith-hbt-md", handlebars);
// Convert Markdown to HTML.
sugar.use("metalsmith-markdown");

// Add a `rootPath` metadata property to all files.  It's relative, allowing
// the site to be hosted under any path.  "" = at root, or could be "../" or
// "../../" etc.
sugar.use("metalsmith-rootpath");
// Embed HTML within the templates.
sugar.use("metalsmith-layouts", {
    default: "page.html",
    directory: "layouts",
    engine: "handlebars",
    partials: "layouts/partials",
    pattern: "**/*.html"
});


/* ********************************************************************
 * LESS + HTML(Atomic) + CSS -> CSS
 ******************************************************************* */
// Convert LESS to CSS
sugar.use("metalsmith-less");
// metalsmith-less does not remove source files.  This does.
sugar.use("metalsmith-move-remove", {
    remove: [
        ".*\\.less$"
    ]
});
// Generate CSS from HTML using Atomizer.
sugar.use("metalsmith-atomizer", {
    destination: "css/atomic.css",
    setOptions: {
        namespace: "body"
    }
});
// Merge all CSS together except special per-page CSS.
sugar.use("metalsmith-concat", {
    files: "css/**/*.css",
    output: "css/site.css"
});


/* ********************************************************************
 * JS -> JS
 ******************************************************************* */
sugar.use("metalsmith-browserify-alt", {});

// Make ES6 more friendly to browsers.
sugar.use("metalsmith-babel", {
    presets: [
        "latest"
    ]
});

sugar.use("metalsmith-ng-annotate", {
    add: true,
    pattern: "**/!(*spec).js"
});


/* ********************************************************************
 * My custom linting rules. Simply emits warnings to console.
 * Must happen before minification.
 ******************************************************************* */
sugar.use("metalsmith-each", (file, filename) => {
    var contents;

    // Only valid extensions allowed.
    if (!filename.match(/\.(css|html|js|json|txt)$/) && filename.match(/\.[^.]*$/)) {
        console.log(`Invalid extension: ${filename}`);
    }

    // Only lowercase and hyphens plus an extension for the filename.
    if (filename.match(/[^-a-z0-9.\/]/)) {
        console.log(`Invalid characters in filename: ${filename}`);
    }

    // Check for legacy "template" property.  This can be removed once
    // all Wintersmith pages are converted to Metalsmith.
    if (file.template) {
        console.log(`File defines "template" metadata: ${filename}`);
    }

    // For text files ...
    if (filename.match(/\.(css|html|js|json|txt)$/)) {
        contents = file.contents.toString("utf8");

        // No tabs allowed.
        if (contents.match(/[\t]/)) {
            console.log(`File contains tabs: ${filename}`);
        }

        // No trailing whitespace.
        if (contents.match(/ $/m)) {
            console.log(`Trailing whitespace in file: ${filename}`);
        }

        // No absolute links.
        if (contents.match(/ (src|href)="?\/[^\/]/)) {
            console.log(`Absolute link in file: ${filename}`);
        }
    }
});

/* ********************************************************************
 * Minification
 ******************************************************************* */
if (!process.env.UNMINIFIED) {
    // Minify HTML
    // This must happen after atomizer parses the HTML.
    sugar.use("metalsmith-html-minifier");

    // Minify CSS
    sugar.use("metalsmith-clean-css", {
        cleanCSS: {
            // Rebasing breaks links because it doesn't understand the
            // real CSS location.
            rebase: false
        },
        files: "**/*.css"
    });

    if (!process.env.FASTBUILD) {
        // Minify JS
        sugar.use("metalsmith-uglify", {
            nameTemplate: "[name].[ext]",
            preserveComments: "some"
        });
    }
}


/* ********************************************************************
 * Static assets outside of the source folder.
 ******************************************************************* */
sugar.use("metalsmith-assets", {
    destination: ".",
    source: "./asset"
});
sugar.use("metalsmith-assets", {
    destination: ".",
    source: "./redirect"
});


/* ********************************************************************
 * Server, testing, debugging, etc.
 ******************************************************************* */
if (process.env.JSON) {
    // Debugging on the fly
    sugar.use("metalsmith-writemetadata", {
        bufferencoding: "utf8",
        ignorekeys: [
            "ancestry",
            "contents"
        ],
        pattern: process.env.JSON.split(" ")
    });
}

if (process.env.SERVE) {
    // Serve files with livereload enabled.
    sugar.use("metalsmith-serve", {
        http_error_files: {
            404: "/404.html"
        },
        verbose: true
    });
    // When files change, build them again.
    sugar.use("metalsmith-watch", {
        livereload: metadata.liveReload,
        paths: {
            "${source}/**/*.{css,less}": "**/*.{css,less}",
            "${source}/**/*.{html,md}": true,
            "${source}/**/*.{js,txt}": true,
            "${source}/**/*.{yaml,json}": "**/*.{html,md}",
            "layouts/**/*": "**/*.{html,md}"
        }
    });
} else {
    // Can only check for broken links if we are NOT using watch.
    sugar.use("metalsmith-broken-link-checker", {
        warn: true
    });
}

sugar.build();
