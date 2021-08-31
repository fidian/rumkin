const metadata = {
    buildDate: new Date().toISOString(),
    buildYear: new Date().getFullYear(),
    layout: "index",
    liveReload: !!process.env.LIVE_RELOAD
};

module.exports = metadata;
