##BROWSER_OK##

if (browserOK)
{
    Message = "##Message##";
    Chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 ";
    Chars += "`~!@#$%^&*()-_=+[{]}\\|;:'\",<.>/?";
    Base = 0;
    Length = 0;
    LastString = "";
    while (Base < Message.length)
    {
      LastString += Chars.charAt(Random(95));
      Base ++;
    }
    window.status = LastString;
}
    
##RANDOM##

function marquee()
{
  if (browserOK)
  {
    Length ++;
    if (Length >= ##Loops## || LastString == Message)
    {
      window.status = Message;
    }
    else
    {
      Base = 0;
      TempString = "";
      while (Base < Message.length)
      {
        if (Message.charAt(Base) != LastString.charAt(Base))
	{
	  TempString += Chars.charAt(Random(95));
	}
        else
	{
	  TempString += Message.charAt(Base);
	}
	Base ++;
      }
      LastString = TempString;
      window.status = TempString;
      window.setTimeout('marquee()', ##ScrollDelay##);
    }
  }
}

window.setTimeout('marquee()', 100);
