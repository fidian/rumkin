/* global document, window */

function getTitle() {
    const e = document.getElementsByTagName('title');

    if (!e.length) {
        return '';
    }

    return e[0].innerText;
}

function getUrl() {
    return (window.location.pathName || '') + '?referer=' + encodeURIComponent(document.referrer);
}

window.history.replaceState('', getTitle(), getUrl())
