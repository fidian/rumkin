##BROWSER_OK##

if (browserOK)
{
    Message = "##Message##";
    Length = 20;
    Base = 0;
    Spaces = "                    "; // 20 spaces
}
    
function marquee()
{
  if (browserOK)
  {
    TempString = "";
    if (Base)
    {
      TempString += Message.substring(0, Base);
    }
    if (Base <= Message.length)
    {
      TempString += Spaces.substring(0, Length);
      TempString += Spaces.substring(0, Length);
      TempString += Spaces.substring(0, Length);
      TempString += Spaces.substring(0, Length);
      TempString += Message.charAt(Base);
    }
    window.status = TempString;
    
    if (Length > 0)
    {
      Length --;
      window.setTimeout('marquee()', ##ScrollDelay##);
    }
    else if (Base <= Message.length)
    {
      Length = 20;
      Base ++;
      while (Message.charAt(Base) == " " && Base <= Message.length)
        Base ++;
      window.setTimeout('marquee()', ##Pause##);
    }
    else
    {
      Length = 20;
      Base = 0;
      window.setTimeout('marquee()', ##WaitTime##);
    }
  }
}

window.setTimeout('marquee()', 100);
