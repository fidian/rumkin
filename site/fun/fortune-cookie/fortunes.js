/* global m */

// eslint-disable-next-line
class Fortunes {
    constructor() {
        this.fortunes = ['Loading fortunes'];
        this.newFortune();
        m.request({
            extract: x => x.responseText,
            url: 'fortunes.txt'
        }).then(data => {
            this.fortunes = data.trim().split(/\r?\n|\r/);
            console.log(data);
            this.newFortune();
        }, () => {
            this.fortunes = ['Error loading fortunes'];
            this.newFortune();
        });
    }

    newFortune() {
        const i = Math.floor(Math.random() * this.fortunes.length);
        this.fortune = this.fortunes[i];
    }

    view() {
        const result = [];

        result.push(
            m(
                "div",
                {
                    class: "fortuneCookie"
                },
                m(
                    "span",
                    {
                        contenteditable: "true"
                    },
                    m.trust(this.fortune)
                )
            )
        );

        result.push(
            m(
                "p",
                m(
                    "a",
                    {
                        href: "#",
                        onclick: () => {
                            this.newFortune();
                            return false;
                        }
                    },
                    "Get another fortune"
                )
            )
        );

        return result;
    }
}
