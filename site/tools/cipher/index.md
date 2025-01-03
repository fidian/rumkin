---
title: Ciphers and Codes
summary: Simpler, "pen and paper" style ciphers and substitution-style codes - all automated and running in your browser.
---

Let's say that you need to send your friend a message, but you don't want another person to know what it is. You can use a full-blown encryption tool, such as PGP. If the message isn't that important or if it is intended to be decrypted by hand, you should use a simpler tool. This is a page dedicated to simple text manipulation tools, which all can be replicated with just paper and pencil.

If you know of another cipher that you think should be on here or a tool that would be useful, request it and perhaps it can be added to the site.

## Codes and Substitutions

Replaces a letter with another letter or a set of symbols. This is the most basic way to hide a message because the translation of the letter doesn't ever change. There's not much to configure here. At most, you will select an alphabet, possibly key it, and maybe select an option for how the algorithm works.

<ul>
{{#ancestry.children}}
{{#if code}}
<li><p><a href="{{link.from ancestry.parent}}">{{title}}</a> - {{summary}}
{{/if}}
{{/ancestry.children}}
</ul>

## Ciphers

This may shuffle letters around in order to obfuscate the plain text. Alternately, it can encode letters into different letters using an algorithm so one letter in the cipher text could be any number of letters in the plain text. Typically, these have more options and settings, allowing a single algorithm to apply to the message in a variety of ways.

<ul>
{{#ancestry.children}}
{{#if cipher}}
<li><p><a href="{{link.from ancestry.parent}}">{{title}}</a> - {{summary}}
{{/if}}
{{/ancestry.children}}
</ul>

## Tools

<ul>
{{#ancestry.children}}
{{#if tool}}
<li><p><a href="{{link.from ancestry.parent}}">{{title}}</a> - {{summary}}
{{/if}}
{{/ancestry.children}}
</ul>
