##BROWSER_OK##

if (browserOK)
{
    Message = "##Message##";
    Length = 0;
}
    
function marquee()
{
  if (browserOK)
  {
    window.status = Message.substring(0, Length);
    if (++Length <= Message.length)
    {
      window.setTimeout('marquee()', ##ScrollDelay##);
    }
  }
}

window.setTimeout('marquee()', 100);
