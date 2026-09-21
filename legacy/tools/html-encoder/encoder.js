function makeLetterSet(letters) {
    const set = new Set();

    for (const l of letters) {
        set.add(l);
    }

    return set;
}

function makeLetterList(set) {
    // Avoid PHP and ASP problems by putting "<" at the end.
    return Array.from(set).map(l => ({letter: l, random: l === '<' ? 1 : Math.random()}))
        .sort((a, b) => a.random - b.random)
        .map(o => o.letter);
}

function makeLetterMap(list) {
    const map = new Map();

    for (let i = 0; i < list.length; i += 1) {
        map.set(list[i], i);
    }

    return map;
}

function recode(letters, map) {
    let result = '';

    for (const l of letters) {
        result += String.fromCharCode(48 + map.get(l));
    }

    return result;
}

function makeJs(letters, recoded) {
    const l = JSON.stringify(letters.join(""));
    const r = JSON.stringify(recoded);

    return `((function(l,r){
var o='',j=0;
for(;j<r.length;j++){o+=l.charAt(r.charCodeAt(j)-48);}
document.write(o);
})(${l},
${r}))`;
}

module.exports = function encode(inText) {
    const letters = inText.split('');
    const letterSet = makeLetterSet(letters);
    const letterList = makeLetterList(letterSet);
    const letterMap = makeLetterMap(letterList);
    const recoded = recode(letters, letterMap);

    return makeJs(letterList, recoded);
};
