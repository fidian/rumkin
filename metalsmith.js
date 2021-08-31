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
                    sugar.use("metalsmith-uglify", {
                        sameName: true,
                        uglify: {
                            sourceMap: false
                        }
                    });
                    sugar.use("metalsmith-clean-css", {
                        files: "**/*.css"
                    });
                    sugar.use("metalsmith-html-minifier");
                    sugar.use("metalsmith-gzip");
                    sugar.use("metalsmith-brotli");
                }
            }
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
