"use strict";

var atomizer, babel, cleanCss, codeHighlight, concat, htmlMinifier, layouts, less, markdown, metadata, metalsmith, moveRemove, smith, uglify, writemetadata;

atomizer = require("metalsmith-atomizer");
babel = require("metalsmith-babel");
cleanCss = require("metalsmith-clean-css");
codeHighlight = require("metalsmith-code-highlight");
concat = require("metalsmith-concat");
htmlMinifier = require("metalsmith-html-minifier");
layouts = require("metalsmith-layouts");
less = require("metalsmith-less");
markdown = require("metalsmith-markdown");
metadata = require("./metadata.json");
metalsmith = require("metalsmith");
moveRemove = require("metalsmith-move-remove");
uglify = require("metalsmith-uglify");
writemetadata = require("metalsmith-writemetadata");

// Progmatic metadata
metadata.buildYear = new Date().getFullYear();

smith = metalsmith(__dirname)
.metadata(metadata)
.source("./site")
.destination("./build")
.clean(true)

// Markdown -> HTML
.use(markdown())
.use(codeHighlight())
.use(layouts({
    default: "page.html",
    directory: "layouts",
    engine: "handlebars",
    partials: "layouts/partials",
    pattern: "**/*.html"
}))
.use(htmlMinifier())

// Less and CSS
.use(less())
.use(moveRemove({
    remove: [
        ".*\\.less$"
    ]
}))
.use(atomizer({
    destination: "css/atomic.css",
    setOptions: {
        namespace: "body"
    }
}))
.use(concat({
    files: "css/**/*.css",
    output: "css/site.css"
}))
.use(cleanCss({
    files: "**/*.css"
}))

// JS
.use(babel({
    presets: [
        "latest"
    ]
}))
.use(uglify({
    nameTemplate: "[name].[ext]"
}));

if (process.env.DEBUG) {
    smith.use(writemetadata({
        bufferencoding: "utf8",
        ignorekeys: [
            "next",
            "previous"
        ],
        pattern: process.env.DEBUG.split(" ")
    }));
}

smith.build((err) => {
    if (err) {
        throw err;
    }
});
