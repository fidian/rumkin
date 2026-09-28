import { component, css, html } from "fudgel";

component('levenshtein-distance', {
    style: css`
    `,
    template: html`
        <p>
            Compare two strings:<br />
            1: <input type="text" @input="updateA($event)" placeholder="String A" /><br />
            2: <input type="text" @input="updateB($event)" placeholder="String B" /><br />
            <span class="result">Levenshtein distance: {{distance}}</span>
        </p>
    `
}, class {
    a = '';
    b = '';
    distance = 0;

    updateA(event: Event) {
        this.a = (event.target as HTMLInputElement).value;
        this.distance = this.updateDistance();
    }

    updateB(event: Event) {
        this.b = (event.target as HTMLInputElement).value;
        this.distance = this.updateDistance();
    }

    private updateDistance() {
        // Force the shorter string to be str2
        const [str1, str2] = this.a.length >= this.b.length ? [this.a, this.b] : [this.b, this.a];

        if (str1.length * str2.length === 0) {
            return str1.length + str2.length;
        }

        // var arr, cost, diagonal, i, j, letter, newValue;

        // Initialize an array that's one larger than the short string
        const arr: number[] = [];

        for (let i = 0; i <= str2.length; i += 1) {
            arr[i] = i;
        }

        // Iterate through the first string.
        for (let i = 0; i < str1.length; i += 1) {
            // Initial cost is equal to the character position
            let diagonal = i;

            // First array position is a convenience thing representing
            // the situation "if we have to delete all characters"...
            arr[0] = i + 1;
            const letter = str1.charAt(i);

            // Letter index j manipulates arr[j + 1]
            for (let j = 0; j < str2.length; j += 1) {
                const cost = letter === str2.charAt(j) ? 0 : 1;
                const newValue = Math.min(
                    arr[j] + 1,
                    arr[j + 1] + 1,
                    diagonal + cost
                );
                diagonal = arr[j + 1];
                arr[j + 1] = newValue;
            }
        }

        return arr.pop() || 0;
    }
});
