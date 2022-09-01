// Friedman Test - Index of Coincidence

// This code was written by Tyler Akins and placed in the public domain.
// It would be nice if you left this header intact.  http://rumkin.com

// Calculates an index of coincidence for a given text against itself
// Returns the kappa-plaintext.  To get the normalized Friedman IC,
// divide the return number by the alphabet length.
function Friedman(text, alphabet) {
    var n; // Counts of each letter
    var i, IC, N;

    // Assign a default alphabet and turn it into upper case
    if (!alphabet || alphabet == "") {
        alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    alphabet = alphabet.toUpperCase();

    n = LetterFrequency(text.toUpperCase());

    // Calculate IC
    IC = 0;
    N = 0;
    for (i = 0; i < alphabet.length; i++) {
        var count = alphabet.charAt(i);
        count = n[count];
        if (!count) {
            count = 0;
        }
        IC += count * (count - 1);
        N += count;
    }
    IC /= N * (N - 1);

    return IC;
}

document.Friedman_Loaded = 1;
