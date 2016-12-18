##BROWSER_OK##

if (browserOK)
{
    ##MULTI_SETUP:Messages,NumLines##
    LinesShown = 0;
}

function marquee()
{
  if (browserOK)
  {
    window.status = Messages[LinesShown++];
    if (LinesShown < NumLines)
      window.setTimeout('marquee()', ##WaitTime##);
  }
}

window.setTimeout('marquee()', 100);
