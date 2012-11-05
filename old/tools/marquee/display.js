##BROWSER_OK##
    
function marquee()
{
  if (browserOK)
  {
    window.status = "##Message##";
  }
}

window.setTimeout('marquee()', 100);
