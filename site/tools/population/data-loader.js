/* global m */

class DataLoader {
    constructor() {
        this.loadPromise = null;
    }

    load() {
        if (!this.loadPromise) {
            this.loadPromise = this.loadData();
        }

        return this.loadPromise;
    }

    loadData() {
        return Promise.all([
            m.request({
                url: "populations.json"
            }),
            m.request({
                url: "regions-rename.json"
            }),
            m.request({
                url: "stats-start-date.json"
            })
        ]).then(([rawData, regionsRename, statsStartDate]) => {
            const result = {};

            result.statsById = rawData;
            result.countries = this.filterAreas(rawData, {}, x => x.I < 900);
            result.regions = this.filterAreas(rawData, regionsRename, x => x.I >= 900);
            result.statsStartDate = new Date(statsStartDate);
            this.update(result);
            setInterval(() => this.update(result), 100);

            return result;
       });
    }

    filterAreas(data, rename, filterFn) {
        const result = [];

        for (const v of Object.values(data)) {
            if (filterFn(v)) {
                result.push(v);
            }

            if (rename[v.I]) {
                v.L = rename[v.I];
            }
        }

        result.sort((a, b) => {
            const aL = a.L.toLowerCase();
            const bL = b.L.toLowerCase();

            if (aL < bL) {
                return -1;
            }

            if (aL > bL) {
                return 1;
            }

            return 0;
        });

        return result;
    }

    update(data) {
        for (const v of Object.values(data.statsById)) {
            this.updateRegion(v, data.statsStartDate);
        }

        m.redraw();
    }

    updateRegion(stats, statsStartDate) {
        const now = new Date();
        stats.days = (now - statsStartDate) / 86400000;
        const years = stats.days / 365.2425;
        stats.births = Math.floor(stats.B * years);
        stats.deaths = Math.floor(stats.D * years);
        stats.migrations = Math.floor(stats.M * years);
        stats.population = stats.P + stats.births - stats.deaths + stats.migrations;
    }
}

module.exports = new DataLoader();
