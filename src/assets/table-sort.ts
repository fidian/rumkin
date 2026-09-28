/**
 * Column ordering for <sortable-table>. Pure functions, kept apart from the
 * custom element so they can be tested under Node without a DOM.
 */

const NUMERIC = /^-?(\d+\.?\d*|\.\d+)$/;

/**
 * Cells that hold no ranking. The whiteboard tables write "?" for a product
 * that was never tested, which is a blank with a label on it: it should not
 * stop the column sorting as numbers, and it should not outrank a real score.
 */
const isBlank = (value: string) => value === '' || value === '?';

/** A column is numeric only if every value that ranks at all parses as one. */
export const isNumericColumn = (values: string[]) => {
    const ranked = values.filter((v) => !isBlank(v));
    return ranked.length > 0 && ranked.every((v) => NUMERIC.test(v));
};

/**
 * The row order for a column, as indices into `values`.
 *
 * Sorting is stable, so rows that tie keep the order the page gave them.
 * Cells with no value always sort last, in both directions: floating them to
 * the top on a reverse sort just buries the data someone asked to see.
 */
export const sortedOrder = (values: string[], descending: boolean): number[] => {
    const numeric = isNumericColumn(values);
    const direction = descending ? -1 : 1;

    return values
        .map((value, index) => ({ value, index }))
        .sort((a, b) => {
            const aBlank = isBlank(a.value);
            const bBlank = isBlank(b.value);
            if (aBlank || bBlank) {
                if (aBlank && bBlank) return a.index - b.index;
                return aBlank ? 1 : -1;
            }

            const cmp = numeric
                ? Number(a.value) - Number(b.value)
                : a.value.localeCompare(b.value, undefined, {
                      numeric: true,
                      sensitivity: 'base',
                  });

            return cmp === 0 ? a.index - b.index : cmp * direction;
        })
        .map(({ index }) => index);
};
