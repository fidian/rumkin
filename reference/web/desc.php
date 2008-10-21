<?PHP

include '../../functions.inc';

StandardHeader(array('title' => 'Mouseover Example',
		     'header' => 'Mouseovers',
		     'topic' => 'web',
		     'callback' => 'mouseover_js'));

?>

<P>Move your mouse over an image to see the description.  Works on IE 4+,
Netscape 3+ and newer, Firefox, Mozilla, and Opera.</P>
	
<p>This example does several tricks.  It preloads images for a faster
button-switching experience.  It switches images to make the buttons look
pressed.  It switches images to put an image-based description between the
buttons.  It changes the text in the box for a text-based description.  It
also writes a description to the window's statusbar.</p>

<P><a href="#" onmouseover="Description(1)"
onmouseout="Description(0)"><IMG SRC="media/link1.gif" WIDTH="99" 
HEIGHT="30" BORDER="0" NAME="Img1"></a>
<a href="#" onmouseover="Description(2)"
onmouseout="Description(0)"><IMG SRC="media/link2.gif" WIDTH="99" 
HEIGHT="30" BORDER="0" NAME="Img2"></a>
<a href="#" onmouseover="Description(3)"
onmouseout="Description(0)"><IMG SRC="media/link3.gif" WIDTH="99" 
HEIGHT="30" BORDER="0" NAME="Img3"></a><br>
<IMG SRC="media/blank.gif" WIDTH="300" HEIGHT="20" BORDER="0" NAME="ImgDesc"><BR>
<a href="#" onmouseover="Description(4)"
onmouseout="Description(0)"><IMG SRC="media/link4.gif" WIDTH="99" 
HEIGHT="30" BORDER="0" NAME="Img4"></a>
<a href="#" onmouseover="Description(5)"
onmouseout="Description(0)"><IMG SRC="media/link5.gif" WIDTH="99" 
HEIGHT="30" BORDER="0" NAME="Img5"></a>
<a href="#" onmouseover="Description(6)"
onmouseout="Description(0)"><IMG SRC="media/link6.gif" WIDTH="99"
HEIGHT="30" BORDER="0" NAME="Img6"></a></p>
<FORM NAME="Form1">
<P><INPUT TYPE="text" SIZE="40" NAME="Text1"></P>
<P>If you want more ways to display text in the status bar that are a bit
more decorative, check out the <a href="/tools/marquee/">Great JavaScript
Marquee Generator</a>.</p>
</FORM>
<?PHP

StandardFooter();

function mouseover_js()
{
?>
<script language="JavaScript">
<!-- // Cloak Engaged

window.onerror = null;

var imagesOK = 0;
if (document.images) {imagesOK = 1;}

if (imagesOK) {
    ImageLabels = new Array( 
    "Img1", "Img2", "Img3", 
    "Img4", "Img5", "Img6"  );
	 
    ImageTexts = new Array(
        "Visit link 1 for nothing!",
	"Link 2 contains the same",
	"Link 3 is exceptionally void",
	"Are you having fun yet?",
	"Isn't just pure JavaScript cool?",
	"Last link ...");

    ImageArrayUp = new Array(6);
    ImageArrayDown = new Array(6);
    ImageArrayDesc = new Array(6);
    for (m=0; m<6; m++)
    { 
        ImageArrayUp[m] = new Image();
        ImageArrayDown[m] = new Image();
        ImageArrayDesc[m] = new Image();		  		  
	ImageArrayUp[m].src = "media/link" + (m + 1) + ".gif";
	ImageArrayDown[m].src = "media/link" + (m + 1) + "-.gif";
	ImageArrayDesc[m].src = "media/link" + (m + 1) + "d.gif";
    }
    ImageBlank = new Image();
    ImageBlank.src = "media/blank.gif";
}

function Description(num)
{
    if (imagesOK)
    {
        if (num == 0)
	{
	     for (m = 0; m < 6; m ++)
	     {
	         document.images[ImageLabels[m]].src = 
		     ImageArrayUp[m].src;
	     }
	     document.images["ImgDesc"].src = ImageBlank.src;
	     document.Form1.Text1.value = "";
	     window.status = "";
	 }
	 else
	 {
	     document.images[ImageLabels[num - 1]].src =
	         ImageArrayDown[num - 1].src;
	     document.images["ImgDesc"].src = 
 	         ImageArrayDesc[num - 1].src;
	     document.Form1.Text1.value = ImageTexts[num - 1];
	     window.status = ImageTexts[num - 1];
	 }
     }
}

// Cloak Disengaged -->
</script>
<?PHP
}

