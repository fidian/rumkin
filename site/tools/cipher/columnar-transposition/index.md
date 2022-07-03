---
title: Columnar Transposition
summary: Write a message as a long column and then swap around the columns.  Read the message going down the columns. A simple cypher, but one that is featured on the Kryptos sculpture at the CIA headquarters.
cipher: true
js:
    - ../rumkin-cipher.js
    - columnar-transposition-module.js
components:
    - className: module
      component: ColumnarTransposition
---

A columnar transposition, also known as a row-column transpose, is a very simple cipher to perform by hand.  First, you write your message in columns.  Then, you just rearrange the columns.  For example.  I have the message, "Which wristwatches are swiss wristwatches."  You convert everything to upper case and write it without spaces.  When you write it down, make sure to put it into columns and number them.  Let's use five columns.

<table align=center border=1 cellpadding=3 cellspacing=0>
<tr><td>&nbsp;</td><th>Unencoded</th><th>Rearranged</th></tr>
<tr><td valign=top>
<b>Column #:</b>
</td><td>
<tt><b><u>4 2 5 3 1</u></b><br>
W H I C H<br>
W R I S T<br>
W A T C H<br>
E S A R E<br>
S W I S S<br>
W R I S T<br>
W A T C H<br>
E S</tt>
</td><td>
<tt><b><u>1 2 3 4 5</u></b><br>
H H C W I<br>
T R S W I<br>
H A C W T<br>
E S R E A<br>
S W S S I<br>
T R S W I<br>
H A C W T<br>
&nbsp; S &nbsp; E</tt>
</td></tr>
</table>

Now, you just read the columns down in the order that you number them.  Above, you will see the key is 4 2 5 3 1, which means you write down the last column first, then the second, then the fourth, the first, and finally the middle.  When you are all done, you will get "HTHESTHHRASWRASCSCRSSCWWWESWWEIITAIIT".

Spacing is preserved with this implementation, so I would suggest you remove spaces so people don't know word length in your message.

The column key can be a list of numbers or an alphabetic keyword/keyphrase.

<div class="module"></div>
