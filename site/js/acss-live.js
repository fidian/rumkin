/* global window */

window.acssLiveConfig = {
    atRules: {
        l: "@media (min-width: 769px) and (max-width: 992px)",
        m: "@media (min-width: 576px) and (max-width: 768px)",
        s: "@media (max-width: 575px)",
        sm: "@media (max-width: 768px)" // Small + Medium
    },
    color: {
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
    }
};

require("@fidian/acss-live");
