/* global window */

window.acssLiveConfig = {
    atRules: {
        l: "@media (min-width: 769px) and (max-width: 992px)",
        m: "@media (min-width: 576px) and (max-width: 768px)",
        s: "@media (max-width: 575px)",
        sm: "@media (max-width: 768px)" // Small + Medium
    },
    colors: {
        barBackground: "#347DBE",
        barBorder: "#015CAE",
        barText: "#fafafa",
        pageBackground: "white",
        pageBorderBackground: "gray",
        prevNextBackground: "#c6dee4",
        searchBackground: "#eee",
        searchTextColor: "black",
        textColorNormal: "black"
    },
    values: {
        contentWidthMax: "1150px"
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
