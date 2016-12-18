##BROWSER_OK##

if (browserOK)
{
    Message = "##Message##";
    Length = 0;
}
    
##RANDOM##

function marquee()
{
  if (browserOK)
  {
    window.status = Message.substring(0, Length);
    if (++Length <= Message.length)
      window.setTimeout('marquee()', Random(##ScrollDelay##) + 1);
  }
}

window.setTimeout('marquee()', 100);
