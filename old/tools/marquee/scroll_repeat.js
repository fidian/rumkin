##BROWSER_OK##

if (browserOK)
{
    Spaces = "                                        "; // 40 spaces
    Message = "##Message##";
    TempString = Spaces + Spaces + Spaces + Message + Spaces + Spaces + Spaces;
    Base = 0;
}
    
function marquee()
{
  if (browserOK)
  {
    window.status = TempString.substring(Base, Base + 110);
    Base ++;
    if (Base > TempString.length - 110)
    {
      Base = 0;
      window.setTimeout('marquee()', ##WaitTime##);
    }
    else
      window.setTimeout('marquee()', ##ScrollDelay##);
  }
}

window.setTimeout('marquee()', 100);
