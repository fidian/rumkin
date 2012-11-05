##BROWSER_OK##

if (browserOK)
{
  pos = -25;
  Spaces = "                         ";  // 25 spaces
  bounces = ##Bounces## - 1;
}
    
function marquee()
{
  if (browserOK)
  {
    window.status = Spaces.substring(0, 25 - Math.abs(pos)) +
      "##Message##";
    if (pos ++ > 24 && bounces)
    {
      pos = -25;
      bounces --;
    }
    if (pos < 26)
    {
      window.setTimeout('marquee()', ##ScrollDelay##);
    }
  }
}

window.setTimeout('marquee()', 100);
