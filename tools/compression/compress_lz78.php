<?php

include'../../functions.inc';
StandardHeader(array(
		'title' => 'LZ78 JavaScript Compression',
		'topic' => 'compression',
		'callback' => 'Add_Javascript'
	));

?>

<p>This compressor uses a variant of LZ78 compression.  It compresses a
string by looking for repeated sets of characters in a dictionary.  For
instance, if you use the phrase "and then" a lot, the second time it may
be shortened to four or five letters.  The third or fourth time might bring
it down to three characters, and so on.  Subsequent times may use less
and less space in the compressed version because the dictionary keeps
growing with the letters you use.</p>

<p>It is important to note that the compressor isn't perfect.  Either make
sure that you have several bytes of test data or else make sure your
range of character values is &gt; 16.  Basically, don't use "aaa" and if you
include one uppercase and one lowercase letter, you should be just fine.
Even if you disregard this paragraph, you will just get weird looking
output; not actual errors.</p>

<p>The compression stats are so poor because of the base64-ish encoding
I need to do to keep the data as text only preserves 6 bytes of binary
per character.  So, if you have a 0% compression factor, this code still
removed 2 bits per character.</p>

<form name="daForm" action="" method="get">
<P><B>Original:</b></p>
<textarea name="Orig" rows=10 cols=60></textarea>
<br>
<input type=button onClick="CompressConfirm()" value="Compress Code!"><br>
<B>Compressed by:</b> <input type=text size=40 name="Progress"></p>
<p><B>Compressed:</B></p>
<textarea name="Comp" rows=10 cols=60></textarea>
<?php

if (isset($_REQUEST['test'])) { ?>
<p><b>Decompressed:</b></p>
<textarea name="Decomp" rows=10 cols=60></textarea>
<?php
} ?>
</form>
</body>
</html>

<?php

StandardFooter();


function Add_Javascript() {
	
	?><script language="JavaScript">
<!--

function BytesToBits(len, num) {
	var o = "";
	while (len --) {
		if (num & 0x01) {
			o = "1" + o;
		} else {
			o = "0" + o;
		}
		num >>= 1;
	}
	return o;
}

function BitsToBytes(i) {
   o = 42;
   if (i.charAt(0) == '1')
      o += 32;
   if (i.charAt(1) == '1')
      o += 16;
   if (i.charAt(2) == '1')
      o += 8;
   if (i.charAt(3) == '1')
      o += 4;
   if (i.charAt(4) == '1')
      o += 2;
   if (i.charAt(5) == '1')
      o += 1;
   if (o >= 92)
      o ++;
   return String.fromCharCode(o);
}

function CompressConfirm() {
   if (confirm("Are you sure that you want to do this?  It can take a long time!")) {
      CompressCode();
   }
}

function CompressCode() {
	var letter_codes = new Array();
	var code_len = 1;
	var code_next = 0;
	var code_len_trigger = 1;
	var t_out = "";
	var t_bits = "";
	var t_in = document.daForm.Orig.value;
	var prog = document.daForm.Progress;
	var last_code;
	var search_value;
	var mincode = 256, maxcode = -1;

	for (var i = 0; i < t_in.length; i ++) {
		var c = t_in.charCodeAt(i);
		if (mincode > c) {
			mincode = c;
		}
		if (maxcode < c) {
			maxcode = c;
		}
	}

	for (var i = mincode; i <= maxcode; i ++) {
		if (code_next == code_len_trigger) {
			code_len ++;
			code_len_trigger *= 2;
		}
		letter_codes[String.fromCharCode(i)] = code_next ++;
	}

	last_code = "";
	search_value = "";

	for (var i = 0; i < t_in.length; i ++) {
		search_value += t_in.charAt(i);
		if (i % 250 == 0) {
			prog.value = "Encoding:  " + i + " of " + t_in.length + " (" + Math.floor(100 * i / t_in.length) + "%)";
		}
		// TODO:  Possibly add "&& i != t_in.length - 1
		// That way the chunk after the for loop does not need to exist
		if (letter_codes[search_value] !== undefined	) {
			last_code = letter_codes[search_value];
		} else {
			if (code_next == code_len_trigger) {
				code_len ++;
				code_len_trigger <<= 1;
			}
			letter_codes[search_value] = code_next ++;
			t_bits += BytesToBits(code_len, last_code);
			while (t_bits.length >= 6) {
				t_out += BitsToBytes(t_bits);
				t_bits = t_bits.slice(6, t_bits.length);
			}
			search_value = t_in.charAt(i);
			last_code = letter_codes[search_value];
		}
	}
	if (code_next == code_len_trigger) {
		code_len ++;
		code_len_trigger <<= 1;
	}
	t_bits += BytesToBits(code_len, last_code);
	while (t_bits.length) {
		t_out += BitsToBytes(t_bits);
		t_bits = t_bits.slice(6, t_bits.length);
	}

	document.daForm.Comp.value = WrapInJS(t_out);
<?php
	
	if (isset($_REQUEST['test'])) { ?>
	document.daForm.Decomp.value = decode(t_out, mincode, maxcode);
<?php
	} ?>
	prog.value = "Done = " + t_in.length + " to " + document.daForm.Comp.value.length +
		" = " + (t_in.length - document.daForm.Comp.value.length) + " bytes of savings"
}

function CreatePopup(str)
{
    ShowMeWindow = window.open("", "", "location=no,directories=no,menubar=no," +
        "resizable=yes,scrollbars=yes,status=yes,toolbar=no,width=300,height=240");
    ShowMeWindow.document.write(str);
    ShowMeWindow.document.close();
}

function WrapInJS(str, mincode, maxcode)
{
	var out = '<sc' + 'ript language="JavaScript">' + "\n";
	out += 'd="'
	while (str.length > 80)
	{
		out += str.slice(0, 80) + "\"\n+\"";
		str = str.slice(80, str.length);
	}
	out += str + "\";\n";

	out += "var l,x,b,o,t,c,s,r,p,e;l=c=p=-1;x=b=e=0;o='';t=new Array();s=r=1;\n";
	out += "function g(){if(!b){if(x>=d.length)return-1;l=d.charCodeAt(x);\n";
	out += "if(l>92)l--;x++;b=6;}return(l>>--b)&1;}\n";
	out += "function a(){var b,n=0,c=0;for(;n<s;n++)c=c*2+(b=g());return (b<0)?-1:c;}\n";
	out += "for (var i=y;i<=z;i++){if(e+1==r){s++;r*=2;}t[e++]=String.fromCharCode(i);}\n";
	out += "while((c=a())>=0){if(p>=0)t[e++]=t[p]+t[c].charAt(0);o+=t[c];p=c;\n";
	out += "if(t.length+1==r){r*=2;s++;}}\n";
	out += "document.write(o);\n";

	return out;
}

<?php
	
	if (isset($_REQUEST['test'])) { ?>
// This is the long version.  Use a "smooshed" version in WrapInJS().
// d = data, y = min code number, z = max code number
function decode(d, y, z)
{
	var l = -1;  // Current letter character code
	var x = 0;  // Next letter index
	var b = 0;  // Number of bits left
	var o = '';  // Output
	var t = new Array();  // Code table
	var c = -1;  // Current code
	var s = 1;  // Size of current code in bits
	var r = 1;  // Trigger value to increase code length
	var p = -1;  // Previous code
	var e = 0;  // Next code

	// Get a bit
	function g() {
		if (!b) {
			if (x >= d.length) {
				return -1;
			}
			l = d.charCodeAt(x);
			if (l > 92) {
				l --;
			}
			l -= 42;
			x ++;
			b = 6;
		}
		b --;
		return (l >> b) & 1;
	}

	// Get a code
	function a() {
		var c = 0, b, n

		for (n = 0; n < s; n ++) {
			c = c * 2 + (b = g());
		}
		return (b<0)?-1:c;
	}

	for (var i = y; i <= z; i ++) {
		if (e + 1 == r) {
			s ++;
			r *= 2;
		}
		t[e ++] = String.fromCharCode(i);
	}

	while ((c = a()) >= 0) {
		if (p >= 0) {
			t[e++] = t[p] + t[c].charAt(0);
		}
		o += t[c];
		p = c;
		if (t.length + 1 == r) {
			r *= 2;
			s ++;
		}
	}

	return o;
}
<?php
	} ?>

-->
</script>
<?php
}

