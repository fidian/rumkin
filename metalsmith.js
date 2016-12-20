"use strict";

var handlebars, metadata, Metalsmith, smith, timer;


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

handlebars = require("handlebars");
metadata = require("./metadata.json");
Metalsmith = require("metalsmith");
timer = require("metalsmith-timer");

// Progmatic metadata
metadata.buildYear = new Date().getFullYear();

if (process.env.SERVE) {
    metadata.liveReload = true;
}

// Make the metalsmith object and start to configure it
smith = new Metalsmith(__dirname)
.metadata(metadata)
.source("./site")
.destination("./build")
.clean(true)
.use(timer("startup"));

// Global
// use("metalsmith-models", {})

// Markdown -> HTML
// Must happen before CSS for Atomizer plugin
use("metalsmith-hbt-md", handlebars);
use("metalsmith-markdown");
use("metalsmith-code-highlight");
use("metalsmith-rootpath");
use("metalsmith-mustache-metadata");
use("metalsmith-layouts", {
    default: "page.html",
    directory: "layouts",
    engine: "handlebars",
    partials: "layouts/partials",
    pattern: "**/*.html"
});

if (!process.env.UNMINIFIED) {
    use("metalsmith-html-minifier");
}

// Less and CSS
use("metalsmith-less");
use("metalsmith-move-remove", {
    remove: [
        ".*\\.less$"
    ]
});
use("metalsmith-atomizer", {
    destination: "css/atomic.css",
    setOptions: {
        namespace: "body"
    }
});
use("metalsmith-concat", {
    files: "css/**/*.css",
    output: "css/site.css"
});

if (!process.env.UNMINIFIED) {
    use("metalsmith-clean-css", {
        cleanCSS: {
            rebase: false
        },
        files: "**/*.css"
    });
}

// JS
use("metalsmith-babel", {
    presets: [
        "latest"
    ]
});

if (!process.env.UNMINIFIED) {
    use("metalsmith-uglify", {
        nameTemplate: "[name].[ext]",
        preserveComments: "some"
    });
}

// Debugging on the fly
if (process.env.JSON) {
    use("metalsmith-writemetadata", {
        bufferencoding: "utf8",
        ignorekeys: [
            "next",
            "previous"
        ],
        pattern: process.env.JSON.split(" ")
    });
}

// Server and testing
if (process.env.SERVE) {
    use("metalsmith-serve", {
        http_error_files: {
            404: "/404.html"
        },
        verbose: true
    });
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
    use("metalsmith-broken-link-checker", {
        warn: true
    });
}

use("metalsmith-each", (file, filename) => {
    var contents;

    if (!filename.match(/\.(css|gz|html|ico|jar|jpg|js|pdb|pdf|swf|ttf|txt|zip)$/)) {
        console.log(`Invalid extension: ${filename}`);
    }

    if (filename.match(/[^-a-z0-9.\/]/)) {
        console.log(`Invalid characters in filename: ${filename}`);
    }

    if (filename.match(/\.(css|htm|html|txt)$/)) {
        contents = file.contents.toString("utf8");

        if (contents.match(/[\t]/)) {
            console.log(`File contains tabs: ${filename}`);
        }

        if (contents.match(/ $/m)) {
            console.log(`Trailing whitespace in file: ${filename}`);
        }
    }
});

smith.build((err) => {
    if (err) {
        throw err;
    }
});
