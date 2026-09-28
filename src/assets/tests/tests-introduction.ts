import { component, html } from "fudgel";

interface Test {
    id: string; // maps to the basename of the JSON file
    name: string;
}

component(
    "tests-introduction",
    {
        template: html`
            <div *if="!id">
                <p>
                    These personality tests are designed only to amuse and
                    potentially provide insight into your mind. The results are
                    not intended to be accurate, but they could bring a smile to
                    your face. If you know of more tests like this that you
                    would like to see here, send them to me!
                </p>

                <p *if="loading">Loading tests...</p>

                <ul *if="!loading">
                    <li *for="test of tests">
                        <a href="#" @click.stop="pickTest(test)"
                            >{{test.name}}</a
                        >
                    </li>
                </ul>
            </div>
            <tests-test
                id="{{id}}"
                *if="id"
                @pick-test="pickTest($event.detail)"
            ></tests-test>
        `,
    },
    class {
        id: string | null = null;
        loading = true;
        tests: Test[] = [];

        constructor() {
            fetch("./tests.json")
                .then((response) => response.json())
                .then((data) => {
                    this.tests = data;
                    this.loading = false;
                });
        }

        pickTest(test: Test | null) {
            if (test) {
                this.id = test.id;
            } else {
                this.id = null;
            }
        }
    }
);
