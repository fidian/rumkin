##BROWSER_OK##

if (browserOK)
{
    Message = "##Message##";
    pos = - Message.length;
}
    
function marquee()
{
  if (browserOK)
  {
    pos ++;
    if (pos == 0)
        window.setTimeout('marquee()', ##PauseTime##);
    else if (pos != Message.length)
        window.setTimeout('marquee()', ##ScrollDelay##);
    else
    {
        window.setTimeout('marquee()', ##HideTime##);
	pos = - Message.length;
    }
    window.status = Message.substring(Math.abs(pos), Message.length);
  }
}

window.setTimeout('marquee()', 100);
