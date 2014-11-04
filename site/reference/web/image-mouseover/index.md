---
title: Mouseover Example
template: page.jade
js: index.js
---

Move your mouse over an image to see the description.  Works on IE 4+, Netscape 3+ and newer, Firefox, Mozilla, and Opera.
	
This example does several tricks.  It preloads images for a faster button-switching experience.  It switches images to make the buttons look pressed.  It switches images to put an image-based description between the buttons.  It changes the text in the box for a text-based description.  It also writes a description to the window's statusbar.

<P><a href="#" onmouseover="description(1)" onmouseout="description(0)"><IMG SRC="link1.gif" WIDTH="99" HEIGHT="30" BORDER="0" NAME="Img1"></a> <a href="#" onmouseover="description(2)" onmouseout="description(0)"><IMG SRC="link2.gif" WIDTH="99" HEIGHT="30" BORDER="0" NAME="Img2"></a> <a href="#" onmouseover="description(3)" onmouseout="description(0)"><IMG SRC="link3.gif" WIDTH="99" HEIGHT="30" BORDER="0" NAME="Img3"></a><br>
<IMG SRC="blank.gif" WIDTH="300" HEIGHT="20" BORDER="0" NAME="ImgDesc"><BR> <a href="#" onmouseover="description(4)" onmouseout="description(0)"><IMG SRC="link4.gif" WIDTH="99" HEIGHT="30" BORDER="0" NAME="Img4"></a> <a href="#" onmouseover="description(5)" onmouseout="description(0)"><IMG SRC="link5.gif" WIDTH="99" HEIGHT="30" BORDER="0" NAME="Img5"></a> <a href="#" onmouseover="description(6)" onmouseout="description(0)"><IMG SRC="link6.gif" WIDTH="99" HEIGHT="30" BORDER="0" NAME="Img6"></a></p>
<FORM NAME="Form1">
<P><INPUT TYPE="text" SIZE="40" NAME="Text1"></P>
</form>
