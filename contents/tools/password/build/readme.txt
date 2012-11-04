There are two chunks of data associated with the password strength tester.
You have your list of commonly used passwords and you have a letter pair
frequency table.

The commonly used passwords are in common.txt, sorted alphabetically, and
upper case letters are folded into lower-case letters.  In order to save
space in the web page, they are compressed by the comp.c program.

    cat common.txt | ./comp > common.cmp
    
The compression method is simple.  The first character is the number of
letters to copy from the previous line (A = 0, B = 1, etc.), and then the
rest of the current word that's different from the one prior.

    Original      Compressed
    ------------- ------------
    smoke         Asmoke
    smoker        Fr
    smoking       Eing
    smote         Dote
    pizza         Apizza
    
It was determined that "compressing" further and only including the capital
letter if more than 1 letter was saved (Changing A = 2, B = 3, etc.) would
save about 40 bytes, which is not worth the extra computing time and code it
would take to implement it in JavaScript.

The second half of the equation is the letter pair frequency table.  This is
basically a list of values saying how likely a letter would appear after a
starting letter.  All letters have been folded into lower case and assigned
a value from 1 to 26.  All non-letters have been folded into the value 0.
The percent chance (a floating point value from 0 to 1) is represented as
three base-95 characters (space through ~).  If a \ or " appears, they are
preceeded with a \ to escape them properly for JavaScript.

You generate the list with a giant wordlist.

    cat wordlist.txt | ./letterpair2 > wordlist.stats

The big string of base-95 characters can be decoded like this:

    for a = 0 to 26
        for b = 0 to 26
    	    chance = 0.0
    	    for c = 0 to 2
	        chance += ReadChar() - ' ';
	        chance /= 95;
	    next
	    LetterPairChance[a][b] = chance
        next
    next

Then, to see how likely the letter 'U' follows 'q', you would do something
like this:

    FindChance(a, b)
    {
        a = GetIndexValue(a)
	b = GetIndexValue(b)
	return LetterPairChance[a][b];
    }
    
    GetIndexValue(a)
    {
       if (a >= 'A' and a <= 'Z')
           return a - 'A' + 1;
       if (a >= 'a' and a <= 'z')
           return a - 'z' + 1;
       return 0;
    }
    
Finally, to determine the strength of a password, you loop through something
like this:

    FindStrength(pass)
    {
        // Find out how many character sets the password uses
	// alpha, ALPHA, 0-9, Symbols above numbers, symbols to the right,
	// other symbols, others not covered
        SetSize = FindSetSize();
	
	totalbits = 0;
	thisletter = ' ';
	for each letter + one more time for end of password
	    lastletter = thisletter
	    thisletter = GetLetter()
	   
	    chance = FindChance(lastletter, thisletter)
	    chance = 1.0 - chance
	    chance *= chance
	    totalbits += SetSize * chance
	next
	
	return totalbits
    }
    
This should give you a fairly good estimation of how strong your password is.
