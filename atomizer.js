module.exports = {
    acssConfig: {
        breakPoints: {
            csd: "@media (prefers-color-scheme: dark)",
            csl: "@media (prefers-color-scheme: light)",
            s: "@media screen and (max-width: 575px)",
            m: "@media screen and (max-width: 768px)",
            l: "@media screen and (max-width: 992px)",
            p: "@media print"
        },
        custom: {
            barBackground: "#347DBE",
            barBorder: "#015CAE",
            barText: "#fafafa",
            contentWidthMax: "1150px",
            pageBackground: "white",
            pageBorderBackground: "gray",
            prevNextBackground: "#c6dee4",
            searchBackground: "#eee",
            searchTextColor: "black",
            textColorNormal: "black"
        }
    },
    addRules: [],
    destination: "css/atomic.css",
    match: "**/*.{html,htm,js}"
};
