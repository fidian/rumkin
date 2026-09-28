import { component, emit, html } from "fudgel";
import type { TestData } from "./datatypes.ts";

component(
    "tests-test",
    {
        attr: ["id"],
        template: html`
            <div *if="loading">Loading test...</div>

            <div *if="errorLoading">Error loading test data.</div>

            <div *if="data">
                <a href="#" @click.stop="goBack()"
                    >Back to the list of tests.</a
                >
                <h1>{{data.title}}</h1>
                <p *if="data.summary">{{data.summary}}</p>
                <tests-question
                    *for="question of data.questions"
                    .question="question"
                ></tests-question>
            </div>
        `,
    },
    class {
        data: TestData | null = null;
        errorLoading = false;
        id: string  = '';
        loading = true;

        onInit() {
            const safeId = this.id.replace(/[^a-z0-9_-]/gi, "");
            fetch(`./${safeId}.json`)
                .then((response) => {
                    if (!response.ok) {
                        console.error(
                            `Failed to load test data for id ${this.id}: ${response.statusText}`
                        );
                        this.errorLoading = true;
                        this.loading = false;
                        return;
                    }
                    return response.json();
                })
                .then((data: TestData) => {
                    if (data) {
                        this.data = data;
                    }
                    this.loading = false;
                })
                .catch((error) => {
                    console.error(
                        `Error loading test data for id ${this.id}:`,
                        error
                    );
                    this.errorLoading = true;
                    this.loading = false;
                });
        }

        goBack() {
            emit(this, "pickTest", null);
        }
    }
);
