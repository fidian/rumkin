<?php

header('Content-type: application/keyhole');
echo '<';

?>?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://earth.google.com/kml/2.0">
<NetworkLink>
  <open>1</open>
  <name>Geocaches Near You</name>
  <description>
    MN Geocaches near your location
  </description>
  <visibility>1</visibility>
  <refreshVisibility>0</refreshVisibility>
  <Url>
    <href>http://rumkin.com/tools/gps/geocaching_local.php</href>
    <viewRefreshTime>3</viewRefreshTime>
    <viewRefreshMode>onStop</viewRefreshMode>
  </Url>
</NetworkLink>
</kml>
