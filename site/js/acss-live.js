/* global window */
window.acssLiveConfig = {
    atRules: {
        csd: "@media (prefers-color-scheme: dark)",
        csl: "@media (prefers-color-scheme: light)",
        // Order matters here - largest to smallest
        l: "@media screen and (max-width: 992px)",
        m: "@media screen and (max-width: 768px)",
        s: "@media screen and (max-width: 575px)",
        p: "@media print"
    },
    values: {
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
    },
    classes: {
        Cc: ["column-count:$0"],
        Cf: ["column-fill:$0", { a: "auto", b: "balance" }],
        Cg: ["column-gap:$0"],
        Crc: ["column-rule-color:$0", "colors"],
        Crs: [
            "column-rule-style:$0",
            {
                d: "dotted",
                da: "dashed",
                do: "double",
                g: "groove",
                h: "hidden",
                i: "inset",
                n: "none",
                o: "outset",
                r: "ridge",
                s: "solid"
            }
        ],
        Crw: ["column-rule-width:$0"],
        Cs: [
            "column-span:$0",
            {
                a: "all",
                n: "none"
            }
        ],
        Cw: ["column-width:$0"]
    }
};

require("@fidian/acss-live");
