/* global m */
const AdvancedInputArea = require("../advanced-input-area");
const BarChart = require("../../../js/mithril/bar-chart");
const characterPropertiesJson = require("../character-properties.json");
const characterProperties = [];

for (const [k, v] of Object.entries(characterPropertiesJson)) {
    const ranges = v.map((x) => {
        if (Array.isArray(x)) {
            return x;
        }

        return [x, x];
    });
    const min = Math.min(ranges.map((x) => x[0]));
    const max = Math.max(ranges.map((x) => x[1]));
    const total = ranges.reduce((acc, next) => acc + next[1] - next[0] + 1, 0);

    characterProperties.push({
        name: k,
        ranges,
        min,
        max,
        total,
        test: (cc) => {
            if (cc < min || cc > max) {
                return false;
            }

            return ranges.some((r) => cc >= r[0] && cc <= r[1]);
        }
    });
}

const printableChar = {
    0: "NUL",
    1: "SOH",
    2: "STX",
    3: "ETX",
    4: "EOT",
    5: "ENQ",
    6: "ACK",
    7: "BEL",
    8: "BS",
    9: "TAB",
    10: "LF",
    11: "VT",
    12: "FF",
    13: "CR",
    14: "SO",
    15: "SI",
    16: "DLE",
    17: "DC1",
    18: "DC2",
    19: "DC3",
    20: "DC4",
    21: "NAK",
    22: "SYN",
    23: "ETB",
    24: "CAN",
    25: "EM",
    26: "SUB",
    27: "ESC",
    28: "FS",
    29: "GS",
    30: "RS",
    31: "US",
    32: "SP",
    127: "DEL"
};

module.exports = class Analyze {
    constructor() {
        this.input = {
            value: ""
        };
        this.showDetail = new Map();
        this.showDetailType = new Map();
    }

    view() {
        return [m(AdvancedInputArea, this.input), this.viewProperties()];
    }

    viewProperties() {
        if (!this.input.value.length) {
            return [];
        }

        const tabulated = new Map();

        for (const c of this.input.value.split("")) {
            const cc = c.charCodeAt(0);

            for (const cp of characterProperties) {
                if (cp.test(cc)) {
                    const key = cp.name;
                    let dest = tabulated.get(key);

                    if (!dest) {
                        dest = {
                            characterProperties: cp,
                            count: 0,
                            key,
                            matches: new Map()
                        };
                        tabulated.set(key, dest);
                    }

                    dest.count += 1;
                    dest.matches.set(c, 1 + (dest.matches.get(c) || 0));
                }
            }
        }

        return [this.viewCalculated(), this.viewExpandableSections(tabulated)];
    }

    viewCalculated() {
        return m("p", `Length: ${this.input.value.length}`);
    }

    viewExpandableSections(tabulated) {
        return [...tabulated.values()]
            .sort((a, b) => a.key.localeCompare(b.key))
            .map((entry) => this.viewExpandableSection(entry));
    }

    viewExpandableSection(entry) {
        const header = [
            m("b", entry.key),
            ` (${entry.count} occurrences, ${entry.matches.size} distinct)`
        ];

        return [
            m(
                "p",
                {
                    class: "Us(n)"
                },
                m(
                    "a",
                    {
                        href: "#",
                        onclick: () => {
                            this.showDetail.set(
                                entry.key,
                                !this.showDetail.get(entry.key)
                            );
                        }
                    },
                    [this.showDetail.get(entry.key) ? "▼ " : "▲ ", header]
                )
            ),
            this.viewExpandableDetail(entry)
        ];
    }

    viewExpandableDetail(entry) {
        if (!this.showDetail.get(entry.key)) {
            return [];
        }

        const detailType = this.showDetailType.get(entry.key);

        if (detailType === "frequency") {
            return this.viewExpandableFrequency(entry);
        }

        if (detailType === "full") {
            return this.viewExpandableFull(entry);
        }

        return this.viewExpandableMatches(entry);
    }

    viewExpandableFrequency(entry) {
        // Sort by frequency
        const data = [...entry.matches]
            .map((e) => this.viewDataEntry(e[0], e[1]))
            .sort((a, b) => {
                const d = b.n - a.n;

                if (d) {
                    return d;
                }

                return a.c.charCodeAt(0) - b.c.charCodeAt(0);
            });

        return m("div", [
            this.viewExpandableHeader(entry.key),
            this.viewBarChart(data)
        ]);
    }

    viewExpandableFull(entry) {
        // Include entire range, but omit areas where there are no matches
        let currentDataList = [];
        const dataLists = [currentDataList];
        const queue = [];
        const drain = () => {
            const item = queue.shift();

            for (const q of queue) {
                q.prevCount += item.thisCount;
                item.nextCount += q.thisCount;
            }

            if (item.thisCount + item.nextCount + item.prevCount) {
                currentDataList.push(item);
            } else if (currentDataList.length) {
                currentDataList = [];
                dataLists.push(currentDataList);
            }
        };

        for (const range of entry.characterProperties.ranges) {
            for (let i = range[0]; i <= range[1]; i += 1) {
                const c = String.fromCharCode(i);
                const dataEntry = this.viewDataEntry(
                    c,
                    entry.matches.get(c) || 0
                );

                if (i === dataEntry.cc) {
                    if (queue.length >= 10) {
                        drain();
                    }

                    queue.push({
                        dataEntry,
                        prevCount: 0,
                        nextCount: 0,
                        thisCount: dataEntry.n ? 1 : 0
                    });
                }
            }
        }

        while (queue.length) {
            drain();
        }

        if (currentDataList.length === 0) {
            dataLists.pop();
        }

        return m("div", [
            this.viewExpandableHeader(entry.key),
            dataLists.map((data) =>
                this.viewBarChart(data.map((x) => x.dataEntry))
            )
        ]);
    }

    viewExpandableMatches(entry) {
        // Only the letters that were represented
        const data = [...entry.matches]
            .map((e) => this.viewDataEntry(e[0], e[1]))
            .sort((a, b) => {
                return a.cc - b.cc;
            });

        return m("div", [
            this.viewExpandableHeader(entry.key),
            this.viewBarChart(data)
        ]);
    }

    viewDataEntry(c, n) {
        const cc = c.charCodeAt(0);

        return {
            c,
            cc,
            label: printableChar[cc] || c,
            n
        };
    }

    viewContent(content) {
        return m(
            "div",
            {
                class: "Bdstartw(1px) Bdendw(1px) Bdbw(1px) P(0.5em)"
            },
            content
        );
    }

    viewExpandableHeader(key) {
        const detailType = this.showDetailType.get(key);
        const getClasses = (isMatching) => {
            let classes =
                "Px(0.5em) Pt(0.25em) Pb(0.1em) Bdrststart(0.75em) Bdrstend(0.75em) Bdstartw(1px) Bdtw(1px) Bdendw(1px) Bdbw(1px) Fxs(0) Us(n)";

            if (isMatching) {
                classes += " Bgc(white) Bdbc(t)";
            } else {
                classes += " Bgc(lightgrey)";
            }

            return classes;
        };
        const spacerClasses = "W(0.2em) Bdbw(1px)";

        return m(
            "div",
            {
                class: "D(f)"
            },
            [
                m("div", {
                    class: spacerClasses
                }),
                m(
                    "div",
                    {
                        class: getClasses(
                            detailType !== "frequency" && detailType !== "full"
                        ),
                        onclick: () => this.showDetailType.set(key, "matches")
                    },
                    "Matches"
                ),
                m("div", {
                    class: spacerClasses
                }),
                m(
                    "div",
                    {
                        class: getClasses(detailType === "frequency"),
                        onclick: () => this.showDetailType.set(key, "frequency")
                    },
                    "By Frequency"
                ),
                m("div", {
                    class: spacerClasses
                }),
                m(
                    "div",
                    {
                        class: getClasses(detailType === "full"),
                        onclick: () => this.showDetailType.set(key, "full")
                    },
                    "With Nearby"
                ),
                m("div", {
                    class: `W(100%) Bdbw(1px)`
                })
            ]
        );
    }

    viewBarChart(data) {
        return m(BarChart, {
            columns: [
                {
                    label: "Char",
                    property: "label",
                    attrs: {
                        align: "center"
                    }
                },
                {
                    label: "Count",
                    property: "n",
                    attrs: {
                        align: "right"
                    }
                },
                {
                    label: "Bar",
                    property: "n",
                    barChart: true
                }
            ],
            data
        });
    }
};
