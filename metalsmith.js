const metalsmithSite = require("@fidian/metalsmith-site");

metalsmithSite.run(
    {
        baseDirectory: __dirname,
        buildAfter: (sugar) => {
            if (!process.env.SERVE) {
                sugar.use("metalsmith-babel", {
                    presets: ["@babel/preset-env"]
                });

                if (!process.env.FAST) {
                    // Reduce content size
                    sugar.use("metalsmith-uglify", {
                        sameName: true,
                        uglify: {
                            sourceMap: false
                        }
                    });
                    sugar.use("@fidian/metalsmith-clean-css", {
                        files: "**/*.css"
                    });
                    sugar.use("metalsmith-html-minifier");

                    // Precompress so GitHub Pages will serve minified files
                    sugar.use("metalsmith-gzip");
                    sugar.use("metalsmith-brotli");
                }
            }
        },
        contentsAfter: (sugar) => {
            sugar.use("metalsmith-mathjax");
        },
        contentsBefore: (sugar) => {
            sugar.use("metalsmith-browserify-alt");
        },
        metadataAfter: (sugar) => {
            // Change the rootPath for the 404 page because it could be
            // loaded at any path.
            sugar.use((files, metalsmith, done) => {
                files["404.md"].rootPath = "/";
                done();
            });
        }
    },
    (err) => {
        if (err) {
            console.error(err);
        }
    }
);
