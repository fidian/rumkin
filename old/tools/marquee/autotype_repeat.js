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
    if (++Length > Message.length)
    {
      Length = 0;
      window.setTimeout('marquee()', ##PauseTime##);
    }
    else
    {
      window.setTimeout('marquee()', ##ScrollDelay##);
    }
  }
}

window.setTimeout('marquee()', 100);
