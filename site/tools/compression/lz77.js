/* ***************************************************************************

LZ77 style text compressor in JavaScript.  It doesn't achieve nearly what gzip
does, but I also restrict it to not using binary data, using whole characters
at a time instead of reading a stream of bytes, and I try to make the
decompression algorithm as light as possible.

This file defines a lz77_compress object that will start compressing your
source data and will keep chugging away until it is done.  During the way, it
may call a status callback function if there is a lot of text to compress.

	lz77_compress(source_data, done_callback, status_callback)
	
Your done_callback function should take one parameter, which is the compressed
text.  The status_callback function will take two:  the current position and
the total length of the source data.

Untested with unicode.

*************************************************************************** */

function lz77_compress(inStr, doneCallback, statusCallback) {
	var job = new BackgroundProcess();
	job.input = inStr;
	job.len = inStr.length;
	job.pos = 0;
	job.literals = '';
	job.output = new StringMaker();
	// Spans "\\", dec 92, which I skip
	job.outChars = "#$%&'()*+,-." + // 12
					"/0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[" + // 45
					"]^_`abcdefghijklmnopqrstuvwxyz{|}~"; // 34
	job.doneCallback = function() {
		doneCallback(this.output.toString());
	};
	
	if (statusCallback) {
		job.statusCallback = function() {
			statusCallback(this.pos, this.len);
		};
	}
	
	job.workCallback = function() {
		// See if we are done or near end (can't encode less than 3 chars)
		if (this.pos > this.len - 3) {
			this.literals += this.input.substring(this.pos, this.len);
			this.encodeLiterals();
			return true;
		}
		
		// Find the longest string in the entire history
		var searchLen = 3;
		var bestIndex = -1;
		var findIndex = this.input.indexOf(this.input.substring(this.pos, this.pos + searchLen), this.pos - (this.outChars.length * this.outChars.length));
		if (findIndex == this.pos) {
			// No matches, encode as literal
			this.literals += this.input.charAt(this.pos);
			this.pos ++;
			return false;
		}
		
		var lettersLeft = this.len - this.pos;
		while (findIndex <= this.pos - searchLen && lettersLeft >= searchLen) {
			bestIndex = findIndex;
			searchLen ++;
			findIndex = this.input.indexOf(this.input.substring(this.pos, this.pos + searchLen), bestIndex);
		}
		searchLen --;
		
		// See if there is the same string closer to this.pos
		var searchString = this.input.substring(this.pos, this.pos + searchLen);
		var findIndex = this.input.indexOf(searchString, bestIndex + 1);
		while (findIndex <= this.pos - searchLen) {
			bestIndex = findIndex;
			findIndex = this.input.indexOf(searchString, bestIndex + 1);
		}

		this.encodeCompressed(bestIndex, searchLen);
		return false;
	};
	
	job.encodeLiterals = function() {
		if (! this.literals.length) {
			return;
		}
		while (this.literals.length) {
			var bytes = this.literals.length;
			if (bytes > 12) {
				bytes = 12;
			}
			this.output.append(this.outChars.charAt(bytes - 1) + this.literals.substring(0, bytes));
			this.literals = this.literals.substring(bytes, this.literals.length);
		}
	};
	
	job.encodeCompressed = function(bestIndex, searchLen) {
		var charsBack = (this.pos - bestIndex) - searchLen;
		
		// No matter what, we must move this.pos ahead by at least 1 character
		
		if (searchLen == 3) {
			if (charsBack < this.outChars.length * 35) {
				var low = charsBack % this.outChars.length;
				var high = (charsBack - low) / this.outChars.length;
				this.encodeLiterals();
				this.output.append(this.outChars.charAt(57 + high) + this.outChars.charAt(low));
				this.pos += 3;
				return;
			}
			// Too far back
			this.literals += this.input.charAt(this.pos);
			this.pos ++;
			return;
		}
		
		// 4-character encoding is often not a help
		// Turns out that sometimes we can squeeze a few extra bytes out if we
		// just take the first letter, stick it into the literals, then try
		// searching again.  Usually, the worst case is a 3-letter encode
		if (this.literals.length && searchLen == 4 && charsBack < this.outChars.length * 35) {
			this.literals += this.input.charAt(this.pos);
			this.pos ++;
			return;
		}

		// 4 byte minimum, 45 possible states
		// So if state 0 == length 4, we can encode up to state 44 == length 48
		if (searchLen > 48) {
			searchLen = 48;
		}
		this.encodeLiterals();
		this.output.append(this.outChars.charAt(8 + searchLen));
		var low = charsBack % this.outChars.length;
		var high = (charsBack - low) / this.outChars.length;
		this.output.append(this.outChars.charAt(high) + this.outChars.charAt(low));
		this.pos += searchLen;
	};

	// Can't compress short stuff
	if (job.len < 6) {
		if (job.len > 0) {
			job.literals = job.input;
			job.output.append(job.encodeLiterals());
		}
		job.doneCallback();
	} else {
		job.pos = 3;
		job.literals = job.input.substring(0, 3);
		job.start();
	}
}
