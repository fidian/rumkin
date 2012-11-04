##BROWSER_OK##

if (browserOK)
{
    ##MULTI_SETUP:Messages,NumLines##
    CurrentLine = 0;
    pos = - Messages[0].length;
}
    
function marquee()
{
  if (browserOK)
  {
    pos ++;
    if (pos == 0)
      window.setTimeout('marquee()', ##PauseTime##);
    else if (pos != Messages[CurrentLine].length)
      window.setTimeout('marquee()', ##ScrollDelay##);
    window.status = Messages[CurrentLine].substring(Math.abs(pos),
      Messages[CurrentLine].length);
    if (pos >= Messages[CurrentLine].length)
    {
      CurrentLine ++;
      if (CurrentLine >= NumLines)
        CurrentLine = 0;
      pos = - Messages[CurrentLine].length;
      window.setTimeout('marquee()', ##HideTime##);
    }
  }
}

window.setTimeout('marquee()', 100);
