/* global m */

/* Columns with "barChart: true" are automatically scaled to the highest
 * number. The numbers associated with the bar chart do not need to be within
 * any specific range.
 *
 * m(BarChart, {
 *     columns: [
 *         {
 *             label: 'Count',
 *             property: 'count'
 *         },
 *         {
 *             label: 'Bar',
 *             property: 'probability',
 *             barChart: true
 *         }
 *     ],
 *     data: [
 *         { count: 23, probability: 0.7 },
 *         { count: 11, probability: 0.3 }
 *     ]
 * })
 */
module.exports = class BarChart {
    findMaximum(property, data) {
        let max = Number.NEGATIVE_INFINITY;

        for (const x of data) {
            if (x[property] > max) {
                max = x[property];
            }
        }

        return max;
    }

    findMaximums(cols, data) {
        const result = new Map();

        for (const col of cols) {
            if (col.barChart) {
                result.set(col.property, this.findMaximum(col.property, data));
            }
        }

        return result;
    }

    view(vnode) {
        const cols = vnode.attrs.columns;
        const data = vnode.attrs.data;
        const maximums = this.findMaximums(cols, data);

        return m("table", [
            this.viewHeader(cols),
            this.viewData(cols, data, maximums)
        ]);
    }

    viewHeader(cols) {
        return m(
            "tr",
            cols.map((col) => {
                return m("th", col.label);
            })
        );
    }

    viewData(cols, data, maximums) {
        return data.map((singleRow) => {
            return m(
                "tr",
                cols.map((col) => {
                    const prop = col.property;

                    if (col.barChart) {
                        return m(
                            "td",
                            {
                                valign: "center"
                            },
                            this.viewBar(singleRow[prop], maximums.get(prop))
                        );
                    }

                    const attrs = Object.assign(
                        {
                            width: "1%"
                        },
                        col.attrs || {}
                    );

                    return m(
                        "td",
                        attrs,
                        this.viewSingleDataPoint(singleRow[prop])
                    );
                })
            );
        });
    }

    viewBar(n, max) {
        return m("div", {
            class: "Bgc(blue) H(0.8em)",
            style: `width: ${((100 * n) / max).toFixed(2)}%`
        });
    }

    viewSingleDataPoint(d) {
        if (typeof d === "number") {
            return d.toLocaleString();
        }

        return d;
    }
};
