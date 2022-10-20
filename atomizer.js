module.exports = {
    acssConfig: {
        breakPoints: {
            csd: "@media (prefers-color-scheme: dark)",
            csl: "@media (prefers-color-scheme: light)",
            // Order matters here - largest to smallest
            l: "@media screen and (max-width: 992px)",
            m: "@media screen and (max-width: 768px)",
            s: "@media screen and (max-width: 575px)",
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
    addRules: [
        {
            type: "pattern",
            name: "Cc",
            matcher: "Cc",
            allowParamToValue: true,
            styles: {
                "column-count": "$0"
            }
        },
        {
            type: "pattern",
            name: "Cf",
            matcher: "Cf",
            allowParamToValue: false,
            shorthand: true,
            styles: {
                "column-fill": "$0"
            },
            arguments: [
                {
                    a: "auto",
                    b: "balance"
                }
            ]
        },
        {
            type: "pattern",
            name: "Cg",
            matcher: "Cg",
            styles: {
                "column-gap": "$0"
            }
        },
        {
            type: "pattern",
            id: "Crc",
            name: "Crc",
            matcher: "Crc",
            noParams: false,
            styles: {
                "column-rule-color": "$0"
            }
        },
        {
            type: "pattern",
            name: "Crs",
            matcher: "Crs",
            allowParamToValue: false,
            shorthand: true,
            styles: {
                "column-rule-style": "$0"
            },
            arguments: [
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
            ]
        },
        {
            type: "pattern",
            name: "Crw",
            matcher: "Crw",
            styles: {
                "column-rule-width": "$0"
            }
        },
        {
            type: "pattern",
            name: "Cs",
            matcher: "Cs",
            allowParamToValue: false,
            shorthand: true,
            styles: {
                "column-span": "$0"
            },
            arguments: [
                {
                    a: "all",
                    n: "none"
                }
            ]
        },
        {
            type: "pattern",
            name: "Cw",
            matcher: "Cw",
            styles: {
                "column-width": "$0"
            }
        }
    ],
    destination: "css/atomic.css",
    match: "**/*.{html,htm,js}"
};
