import { component, css, emit, html } from "fudgel";
import type { TestQuestion } from "./datatypes.ts";

component(
    "tests-question",
    {
        prop: ["question"],
        style: css`
            .question {
                white-space: pre-line;
            }
        `,
        template: html`
            <p class="question">{{question?.text}}</p>
            <div *if="question && selected">
                <p><em>{{selected}}</em></p>
                <p><strong>{{question.answers[selected]}}</strong></p>
                <p *if="question.answerText">{{question.answerText}}</p>
                <p><a href="#" @click.stop="clear()">Reset question?</a></p>
            </div>
            <div *if="question && !selected">
                <ul>
                    <li *for="key, value of question.answers">
                        <a href="#" @click.stop="pickAnswer(key)">{{key}}</a>
                    </li>
                </ul>
            </div>
        `,
    },
    class {
        selected: string | null = null;

        clear() {
            this.selected = null;
        }

        pickAnswer(key: string) {
            this.selected = key;
        }
    }
);
