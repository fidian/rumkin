import levenshtein from "./levenshtein";
import test from "ava";

test("returns zero for matching strings", t => {
    t.is(levenshtein("test", "test"), 0);
});
test("returns a number of changes", t => {
    t.is(levenshtein("test", "tent"), 1);
});
test("does not crash on empty strings", t => {
    t.is(levenshtein("", ""), 0);
});
test("counts inserts and deletes", t => {
    t.is(levenshtein("tangle", "entange"), 3);
});
