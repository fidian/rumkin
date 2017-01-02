"use strict";

var debug, handlebars, metadata, Metalsmith, smith, timer;


/**
 * Adds a middleware to Metalsmith.
 *
 * @param {string} moduleName
 * @param {*} args...
 */
function use(moduleName) {
    var args, middleware;

    args = [].slice.call(arguments, 1);
    middleware = require(moduleName);
    smith.use(middleware.apply(null, args));
    smith.use(timer(moduleName));
}

debug = require("debug");
handlebars = require("handlebars");
Metalsmith = require("metalsmith");
timer = require("metalsmith-timer");


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
smith = new Metalsmith(__dirname)
.metadata(metadata)
.source("./site")
.destination("./build")
.clean(true)
// Add the timer here manually.  The use() function adds it again after
// each middleware added.
.use(timer("startup"));


/* ********************************************************************
 * Make the new Metalsmith object
 ******************************************************************* */
// Load files referenced in `data` metadata property.
use("metalsmith-data-loader", {
    removeSource: true
});


/* ********************************************************************
 * Markdown -> HTML
 *
 * Must happen before CSS for Atomizer plugin.
 ******************************************************************* */
// Set up links so indices and automatic subpage listings can be generated
// within a document.
use("metalsmith-ancestry");
// Allow Mustache templates to build sub-links
use("metalsmith-relative-links");
// Add `propName?` and `_parent` properties throughout the metadata.  This
// is added early for mustache parsing in markdown before templating.
use("metalsmith-mustache-metadata");
// Parse Markdown using Handlebars to be able to build tables and generate
// content from metadata.  Unfortunately, in order to report parse errors,
// this debug setting needs to be set.
debug.enable(`${debug.load()} metalsmith-hbt-md`);
use("metalsmith-hbt-md", handlebars);
// Convert Markdown to HTML.
use("metalsmith-markdown");
// Highlight code in HTML.
use("metalsmith-code-highlight");
// Add a `rootPath` metadata property to all files.  It's relative, allowing
// the site to be hosted under any path.  "" = at root, or could be ".." or
// "../.." etc.
use("metalsmith-rootpath");
// Embed HTML within the templates.
use("metalsmith-layouts", {
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
use("metalsmith-less");
// metalsmith-less does not remove source files.  This does.
use("metalsmith-move-remove", {
    remove: [
        ".*\\.less$"
    ]
});
// Generate CSS from HTML using Atomizer.
use("metalsmith-atomizer", {
    destination: "css/atomic.css",
    setOptions: {
        namespace: "body"
    }
});
// Merge all CSS together except special per-page CSS.
use("metalsmith-concat", {
    files: "css/**/*.css",
    output: "css/site.css"
});


/* ********************************************************************
 * JS -> JS
 ******************************************************************* */
// Make ES6 more friendly to browsers.
use("metalsmith-babel", {
    presets: [
        "latest"
    ]
});


/* ********************************************************************
 * Minification
 ******************************************************************* */
if (!process.env.UNMINIFIED) {
    // Minify HTML
    // This must happen after atomizer parses the HTML.
    use("metalsmith-html-minifier");

    // Minify CSS
    use("metalsmith-clean-css", {
        cleanCSS: {
            // Rebasing breaks links because it doesn't understand the
            // real CSS location.
            rebase: false
        },
        files: "**/*.css"
    });

    // Minify JS
    use("metalsmith-uglify", {
        nameTemplate: "[name].[ext]",
        preserveComments: "some"
    });
}


/* ********************************************************************
 * Server, testing, debugging, etc.
 ******************************************************************* */
if (process.env.JSON) {
    // Debugging on the fly
    use("metalsmith-writemetadata", {
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
    use("metalsmith-serve", {
        http_error_files: {
            404: "/404.html"
        },
        verbose: true
    });
    // When files change, build them again.
    use("metalsmith-watch", {
        livereload: metadata.liveReload,
        paths: {
            // Must load all HTML when any changes to build Atomizer CSS
            "${source}/**/*.{html,md}": "**/*.{html,md,less,css}",
            "${source}/**/*.{jpg,js,txt}": true,
            "layouts/**/*": "**/*.{html,md}"
        }
    });
} else {
    // Can only check for broken links if we are NOT using watch.
    use("metalsmith-broken-link-checker", {
        warn: true
    });
}

// My custom linting rules.  Simply emits warnings to console.
use("metalsmith-each", (file, filename) => {
    var contents;

    // Only valid extensions allowed.
    if (!filename.match(/\.(au|class|css|gif|gz|html|ico|jar|jpg|js|json|pdb|pdf|png|prc|swf|ttf|txt|zip)$/) && filename.match(/\.[^.]*$/)) {
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

smith.build((err) => {
    if (err) {
        throw err;
    }
});
