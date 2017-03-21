---
title: Web Page Compression
summary: Use JavaScript to truly compress web pages, not just minify them.
---

It is often a goal to compress web pages to that they take less bandwidth, less hard drive space, and are difficult for people to reverse engineer. This has been called "compression" but it is more along the lines of consolidation and minification is a far better term. The process typically removes whitespace, removes comments, replaces names with shorter ones, and reworks the structure to use a smaller technique. Few solutions perform actual *compression* of the information.

What I present here is **not** an ideal solution. Compression in this form is far better when used at the server; if your server can compress data in transit then the browser will decompress it using native code and the compression will be significantly better. The output generated on this page is more appropriate when you need to serve data from `file://` URIs, such as documentation on a CD. Another alternative is to bundle your site into a `.jar` file because it has built-in compression.

From time to time, I feel like taking on the challenge of making compressed web pages. Anything that seems remotely successful for even a specialized use are included. You can use this to compress your web pages and text as long as JavaScript is able to be used to decode the information. Copy your HTML or text into the correct box and use the button to compress.

LZ78

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

$Links = array(
	array(
		'Name' => 'LZ78',
		'Desc' => 'LZ78 compression builds a dictionary with from ' . 'your input source, and compression is pretty good ' . 'even though the resulting data is re-encoded in text.',
		'URL' => 'compress_lz78.php'
	),
	array(
		'Name' => 'Huffman Encoding + UUE with JavaScript',
		'Desc' => 'Character re-encoding with shorter codes for ' . 'letters that appear more frequently.  Then, it has to ' . 'encode the data so the binary data can be stored in ' . 'a text file (like HTML or a JavaScript file).',
		'URL' => 'compress_huff.php'
	),
	array(
		'Name' => 'Base64 Encoding',
		'Desc' => 'A common method of encoding binary data with just ' . 'text.  It increases the size of the information by 33%, ' . 'but it is needed sometimes ... like when sending attachments ' . 'in email.',
		'URL' => 'base64.php'
	),
);
