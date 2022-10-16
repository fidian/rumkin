module.exports = class Letter {
    constructor(from) {
        this.from = from;
        this.to = from;
        this.value = ''; // Shared with dropdown for classes
        this.options = { // Shared with dropdown for classes
            '': 'None',
            'Bgc(lightcoral)': 'Red',
            'Bgc(orange)': 'Orange',
            'Bgc(yellow)': 'Yellow',
            'Bgc(lightgreen)': 'Green',
            'Bgc(lightblue)': 'Blue',
            'Bgc(orchid)': 'Purple'
        };
    }
};
