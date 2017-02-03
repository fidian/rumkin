"use strict";

var levenshtein;

levenshtein = require("./levenshtein");

describe("levenshtein", () => {
    it("returns zero for matching strings", () => {
        expect(levenshtein("test", "test")).toBe(0);
    });
    it("returns a number of changes", () => {
        expect(levenshtein("test", "tent")).toBe(1);
    });
    it("does not crash on empty strings", () => {
        expect(levenshtein("", "")).toBe(0);
    });
    it("counts inserts and deletes", () => {
        expect(levenshtein("tangle", "entange")).toBe(3);
    });
});
