import { component, html } from "fudgel";

component(
    "random-tip",
    {
        attr: ["href", "label"],
        template: html`
            <div class="Ta(c)">
                <span>{{tip}}</span>
            </div>
            <div class="Ta(c)">
                <button @click="changeTip()">{{label}}</button>
            </div>
        `,
    },
    class {
        href: string = "";
        label: string = "";
        tip = "Loading ...";
        tips: string[] = [];

        onInit() {
            fetch(this.href)
                .then((r) => r.text())
                .then((text) => {
                    this.tips = text
                        .split("\n")
                        .map((line) => line.trim())
                        .filter((line) => !!line);
                    this.changeTip();
                });
        }

        changeTip() {
            this.tip = this.tips[Math.floor(Math.random() * this.tips.length)];
        }
    }
);
