##BROWSER_OK##

if (browserOK)
{
  pos = -25;
  Spaces = "                         ";  // 25 spaces
}
    
function marquee()
{
  if (browserOK)
  {
    window.status = Spaces.substring(0, 25 - Math.abs(pos)) +
      "##Message##";
    if (pos ++ > 24)
      pos = -25;
    if (pos < 26)
      window.setTimeout('marquee()', ##ScrollDelay##);
  }
}

window.setTimeout('marquee()', 100);
