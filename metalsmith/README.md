Rumkin.com Web Site
===================


Building
--------

First, get the prerequisites.

    npm install

Next, you simply run the `build` script.

    npm run build

There are some environment variables you can supply that control some settings during build.

    # Produce unminified files
    UNMINIFIED=true npm run build

    # Debug the generation of some files by writing JSON of metadata in build/
    JSON="somefile.js folder/another-file.html" npm run build

    # Show timing information
    DEBUG=metalsmith-timer npm run build
