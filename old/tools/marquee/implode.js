##BROWSER_OK##

if (browserOK)
{
    Message = "##Message##";
    Length = 40;
    Spaces = "                                        "; // 40 spaces
}
    
function marquee()
{
  if (browserOK)
  {
    Base = 0;
    TempString = "";
    while (Base <= Message.length)
    {
      TempString += Spaces.substring(0, Length) + Message.charAt(Base);
      Base ++;
    }
    if (Length != 0)
    {
      window.setTimeout('marquee()', ##ScrollDelay##);
    }
    window.status = TempString;
    Length --;
  }
}

window.setTimeout('marquee()', 100);
