module.exports = function keyAlphabet(alphabetValueObject) {
    return alphabetValueObject.value.keyWord(
        alphabetValueObject.alphabetKey || "",
        {
            useLastInstance: alphabetValueObject.useLastInstance,
            reverseKey: alphabetValueObject.reverseKey,
            reverseAlphabet: alphabetValueObject.reverseAlphabet,
            keyAtEnd: alphabetValueObject.keyAtEnd
        }
    );
};
