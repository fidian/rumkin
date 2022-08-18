const metadata = {
    buildTime: Date.now(),
    buildDate: new Date().toISOString(),
    buildYear: new Date().getFullYear(),
    layout: "index",
    liveReload: !!process.env.LIVE_RELOAD
};

module.exports = metadata;
