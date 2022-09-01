/* global document, window */

function getTitle() {
    const e = document.getElementsByTagName('title');

    if (!e.length) {
        return '';
    }

    return e[0].innerText;
}

function getUrl() {
    return (window.location.pathName || '/') + '?r=' + encodeURIComponent(document.referrer);
}

if ((window.location.search || '').indexOf('r=') < 0) {
    window.history.replaceState('', getTitle(), getUrl());
}
