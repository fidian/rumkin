/* global document, m, window */
window.addEventListener('load', () => {
    const elements = document.getElementsByClassName('linkDice');

    for (const e of elements) {
        e.addEventListener('click', () => {
            window.diceInstance.setInput(e.innerText);
            m.route.set('/', {
                dice: e.innerText
            });
        });
    }
});
