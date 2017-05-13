---
title: Web Page Compression
summary: Use JavaScript to truly compress web pages, not just minify them.
module: compression
js:
    - ../../js/auto-grow.js
    - compression.js
    - compression-module.js
    - huffman-ascii-tiny.js
    - huffman-tiny.js
    - lz77-ascii-tiny.js
    - lz77-tiny.js
---

It is often a goal to compress web pages to that they take less bandwidth, less hard drive space, and are difficult for people to reverse engineer. This has been called "compression" but it is more along the lines of consolidation and minification is a far better term. The process typically removes whitespace, removes comments, replaces names with shorter ones, and reworks the structure to use a smaller technique. Few solutions perform actual *compression* of the information.

What I present here is **not** an ideal solution. Compression in this form is far better when used at the server; if your server can compress data in transit then the browser will decompress it using native code and the compression will be significantly better. The output generated on this page is more appropriate when you need to serve data from `file://` URIs, such as documentation on a CD. Another alternative is to bundle your site into a `.jar` file because it has built-in compression.

From time to time, I feel like taking on the challenge of making compressed web pages. Anything that seems remotely successful for even a specialized use are included. You can use this to compress your web pages and text as long as JavaScript is able to be used to decode the information. Copy your HTML or text into the correct box and use the button to compress.


LZ77
----

This algorithm operates by walking through the original text and seeing if the characters at the current position are a repeat of something earlier. If it is, it encodes the starting point of the repetition and how long to copy.

The technique was published by Abraham Lempel and Jacob Ziv in 1977 is a "sliding window" compression algorithm, which is a type of a dictionary coder.

<div compression method="'lz77'">
    <div>
        <label><input type="checkbox" ng-model="ascii"> Use ASCII encoding instead of Base64</label>
    </div>
    <div>
        <label><input type="checkbox" ng-model="includeJs"> Include JavaScript to decompress</label>
    </div>
    <textarea auto-grow placeholder="Enter text here" ng-model="text" class="W(100%)"></textarea>
    <div ng-if="result">
        <span ng-bind="originalLength"></span> → <span ng-bind="compressedLength"></span>, using <span ng-bind="percentOfOriginal * 100 | number"></span>% of the uncompressed size by <span ng-if="savings > 1">removing</span><span ng-if="savings <= 1">adding</span> <span ng-bind="savingsAbs"></span> bytes.
    </div>
    <div class="result">
        <div ng-if="working">Compressing …</div>
        <div ng-if="!working">
            <div ng-if="result" ng-bind="result" class="Wow(bw) Whs(pw)"></div>
            <div ng-if="!result">Enter some text and see it compressed.</div>
        </div>
    </div>
</div>


Huffman Encoding
----------------

This recodes letters with shorter codes for frequently used letters. For instance, English text is typically lowercase letters and the most common letter is "e". By analyzing the text that will be compressed, the program figures out how often each letter is used and will encode them into a tree, then determine the new codes.

<div compression method="'huffman'">
    <div>
        <label><input type="checkbox" ng-model="ascii"> Use ASCII encoding instead of Base64</label>
    </div>
    <div>
        <label><input type="checkbox" ng-model="includeJs"> Include JavaScript to decompress</label>
    </div>
    <textarea auto-grow placeholder="Enter text here" ng-model="text" class="W(100%)"></textarea>
    <div class="result">
        <div ng-if="working">Compressing …</div>
        <div ng-if="!working">
            <div ng-if="result" ng-bind="result" class="Wow(bw) Whs(pw)"></div>
            <div ng-if="!result">Enter some text and see it compressed.</div>
        </div>
    </div>
</div>


Base64 Encoding
---------------

Technically this is not compression. Instead, it is a way of taking binary data and changing it to a text-only form. The encoding increases the size of the information by 33% and is the method that email attachments are sent.

<div>
    <textarea auto-grow placeholder="Enter text here" ng-model="base64Text" class="W(100%)"></textarea>
    <div class="result">
        <div ng-if="base64Text" base64="base64Text" class="Wow(bw) Whs(pw)"></div>
        <div ng-if="!base64Text">Enter some text and see it encoded.</div>
    </div>
</div>
