var map;  // Global reference to Google map
var geocoder;  // Global reference to the geocoder class
var tabDef;  // Array for tab information
var altGeocodes = new Array();  // Where to search
var geocodeHtml = '';  // What to put as the tag HTML when found
var geocodeTitle = '';  // The short name for the point
var lastClickPoint = false;  // Where the user clicked most recently
var markers = new Array();  // All markers that are on the map
var currentlySearching = false;  // T/F = Am I currently searching (duh!)
var searchQueue = new Array();  // Pending searches after the current is done
var currentlySelected = false;  // Open marker on the Points page
var cookieLife = 730;


function MapperLoad()
{
   var c;
   
   if (! GBrowserIsCompatible())
   {
      alert("You are not using a supported browser.  Sorry!");
      return;
   }

   SetupBar();
   document.Find_Form.Find_Input.focus();
   
   map = new GMap2(document.getElementById("map"));
   
   geocoder = new GClientGeocoder();
   
   GEvent.addListener(map, "moveend", MapMoveEnd);
   GEvent.addListener(map, "click", MapClick);

   c = CookieGet('Pos');
   if (c != null)
   {
      c = c.split(' ');
      if (c.length != 3)
      {
         c = null;
      }
   }
   if (c == null)
   {
      c = new Array('40.179', '-95.625', '3');
   }
   map.setCenter(new GLatLng(parseFloat(c[0]), parseFloat(c[1])),
      parseInt(c[2]));
      
   map.enableDoubleClickZoom();
   map.enableContinuousZoom();
   map.enableScrollWheelZoom();

   map.addControl(new GLargeMapControl());
   map.addControl(new GMapTypeControl());
   map.addControl(new GScaleControl());
   map.addControl(new GOverviewMapControl());
   
   var WMS_TOPO_MAP = WMSCreateMap('Topo',
      'Imagery by USGS / Service by TerraServer',
      'http://www.terraserver-usa.com/ogcmap6.ashx', 'DRG', 'image/jpeg',
      false, 1.0, 4, 17, [], 't');
   var WMS_DOQ_MAP = WMSCreateMap('DOQ', 
      'Imagery by USGS / Service by TerraServer',
      'http://www.terraserver-usa.com/ogcmap6.ashx', 'DOQ', 'image/jpeg',
      false, 1.0, 4, 18, [], 'o');
   var WMS_NEXRAD_MAP = WMSCreateMap('NEXRAD',
      'Data by NWS / Service by Iowa U. Ag. Dept.',
      'http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi',
      'nexrad-n0r', 'image/png', true, 0.666, 4, 10,
      G_HYBRID_MAP.getTileLayers(), 'n');
   
//   var hier = GHierarchicalMapTypeControl();
//   hier.clearRelationships();
//   hier.addRelationship(G_SATELLITE_MAP, googleSat, "Google Satellite", true);
//   hier.addRelationship(WMS_DOQ_MAP, 

   map.addMapType(WMS_TOPO_MAP);
   map.addMapType(WMS_DOQ_MAP);
   map.addMapType(WMS_NEXRAD_MAP);
   
   if (window.attachEvent)
   {
      window.attachEvent("onresize", function() { this.map.onResize() });
   }
   else
   {
      window.addEventListener("resize", function() { this.map.onResize() },
         false);
   }
   
   ParseURLValues();
}


function MapperUnload()
{
   // Close info window
   if (map.infoWindowEnabled())
   {
      map.closeInfoWindow();
   }
   
   // Delete all markers
   for (var m in markers)
   {
      map.removeOverlay(markers[m]);
      markers[m] = null;
   }
   
   currentlySelected = false;
   
   GUnload();
}


function MapMoveEnd()
{
   var center = map.getCenter();
   
   CookieSet('Pos', center.lat().toString() + ' ' + center.lng().toString() +
      ' ' + map.getZoom(), cookieLife);
   
   UpdateMapCenter();
   UpdateLastClick();
}


function UpdateMapCenter()
{
   var html = '', center = map.getCenter();
   
   html += LatLngToHtml(center);
   html += InfoControls(center);
   
   document.getElementById('Info_Center').innerHTML = html;
}


function InfoControls(p)
{
   var html = '', cent = map.getCenter();
   
   if (currentlySelected)
   {
      var d = currentlySelected.getPoint();
      d = p.distanceFrom(d);
      
      html += 'Dist to Selected Point: ';
      html += FormatDistance(d);
   }
   
   if (! p.equals(cent))
   {
      var d = p.distanceFrom(cent);
      
      html += '<br>Dist to Center of Map: ';
      html += FormatDistance(d);
   }
   
   if (html != '')
   {
      html = '<br><span class="infoDistance">' + html + '</span>';
   }
   
   return html;
}


function UpdateLastClick()
{
   var html = '';
   
   if (! lastClickPoint)
   {
      return;
   }
   
   html += LatLngToHtml(lastClickPoint);
   html += InfoControls(lastClickPoint);
   
   document.getElementById('Info_Click').innerHTML = html;
}


function LatLngToHtml(point)
{
   var html = '<tt>';
   
   if (point.lat() >= 0.0)
   {
      html += 'N ';
   }
   else
   {
      html += 'S ';
   }
   
   html += FormatDegrees(Math.abs(point.lat()));
   
   html += '<br>';
   
   if (point.lng() >= 0.0)
   {
      html += 'E ' ;
   }
   else
   {
      html += 'W ';
   }

   html += FormatDegrees(Math.abs(point.lng()));
   
   html += "</tt>";
   
   return html;
}


function MapClick(marker, point)
{
   if (marker)
   {
      // Can be an alert window or a marker
      if (marker.openInfoWindowHtml)
      {
         marker.openInfoWindowHtml(marker.custom_html);
      }
      return;
   }

   lastClickPoint = point;
   UpdateLastClick();
   UpdatePointsPage();
}


function StartWhoisLookup(d)
{
   DisableSearchBox(true);
   
   d = d.split('.');
   while (d.length > 2)
   {
      d.shift();
   }
   d = d[0] + '.' + d[1];

   document.getElementById('Find_Status').innerHTML =
      'Whois: ' + d;
   GDownloadUrl('mapper_ip.php?ip=' + d, StopIPLookup);
   
   SetClass('Find_Status', 'findShow');
   
   return false;
}


function StartIPLookup(ip)
{
   var e = document.getElementById('Find_Status')
   
   DisableSearchBox(true);
   
   if (ip == null)
   {
      e.innerHTML = 'Searching for your IP';
      GDownloadUrl('mapper_ip.php', StopIPLookup);
   }
   else
   {
      e.innerHTML = 'Searching for IP<br>' + ip;
      GDownloadUrl('mapper_ip.php?ip=' + ip, StopIPLookup);
   }
   SetClass('Find_Status', 'findShow');
   
   return false;
}


// Used by both IP and whois lookups
function StopIPLookup(data, responseCode)
{
   data = data.split("\n");
   
   if (data.length == 1)
   {
      document.getElementById('Find_Status').innerHTML = data;
      // Leave Find_Status visible
      DisableSearchBox(false);
      return;
   }

   geocodeTitle = data.shift();
   geocodeHtml = data.shift();
   altGeocodes = data;

   RunAlternateGeocode();
}


function RunAlternateGeocode()
{
   var e = document.getElementById('Find_Status'), c;
   
   SetClass('Find_Status', 'findShow');
   
   if (altGeocodes.length == 0)
   {
      e.innerHTML = "Could not find:<br><br>" + geocodeTitle;
      // Leave Find_Status visible
      DisableSearchBox(false);
      return;
   }

   c = altGeocodes.shift();
   e.innerHTML = "Geocoding ...<br><br>" + c;
   geocoder.getLatLng(c, StopGeocode);
}


function StopGeocode(point)
{
   var marker;
   
   if (! point)
   {
      RunAlternateGeocode();
      return;
   }
   
   SetClass('Find_Status', 'findHidden');
   
   marker = GetMarker(point, geocodeTitle, geocodeHtml);
   GoToMarker(marker);
   
   DisableSearchBox(false);
}


function GetMarker(point, title, html)
{
   var marker;
   
   for (var m in markers)
   {
      if (markers[m].getPoint().equals(point))
      {
         return markers[m];
      }
   }
   
   marker = new GMarker(point);
   marker.title = title;
   marker.custom_html = '<p>' + html + '</p>';
   map.addOverlay(marker);
   currentlySelected = marker;
   markers.unshift(marker);
   UpdatePointsPage();
   UpdateMapCenter();
   UpdateLastClick();
   
   return marker;
}


// Set days to -1 to immediately expire the cookie
// Set days to 0 (or don't pass it) to keep it alive until the browser closes
function CookieSet(name, value, days)
{
   var expires = '';
   if (days)
   {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 3600 * 1000);
      expires = '; expires=' + date.toGMTString();
   }
   document.cookie = name + '=' + value + expires + '; path=/';
}


function CookieGet(name)
{
   var cookies = document.cookie.split(';');
   name += '=';
   
   for (var i = 0; i < cookies.length; i ++)
   {
      cookies[i] = cookies[i].replace(/^ */, '')
      if (cookies[i].indexOf(name) == 0)
      {
         return cookies[i].slice(name.length);
      }
   }
   
   return null;
}


function ForcePrecision(v, p)
{
    return Math.round(v * Math.pow(10, p)) / Math.pow(10, p);
}


function FormatDegrees(deg, fmt)
{
   if (! fmt)
   {
      fmt = CookieGet('Deg');
      if (fmt == null)
      {
         fmt = 'DM';
      }
   }
   
   if (fmt == 'D')
   {
      return ForcePrecision(deg, 6).toString() + '&deg;';
   }
   
   if (fmt == 'DM')
   {
      var d = Math.floor(deg);
      deg = (deg - d) * 60;
      
      return d.toString() + '&deg; ' + ForcePrecision(deg, 3).toString() + "'";
   }
   
   var d = Math.floor(deg);
   deg = (deg - d) * 60;
   var m = Math.floor(deg);
   deg = (deg - m) * 60;
   
   return d.toString() + '&deg; ' + m.toString() + "' " +
      ForcePrecision(deg, 2) + '"';
}


function SetupBar()
{
   var BarHTML = '';
   
   tabDef = new Array();
   
   tabDef[tabDef.length] = 'Find';
   tabDef[tabDef.length] = 'Points';
   tabDef[tabDef.length] = 'Info';
   tabDef[tabDef.length] = 'Config';

   for (var i = 0; i < tabDef.length; i ++)
   {
      BarHTML += AddTab(tabDef[i]);
   }
   
   document.getElementById('bar').innerHTML = BarHTML +
      document.getElementById('bar').innerHTML;
      
   SetConfigOptions();
   
   ActivateTab('Find');
}


function AddTab(name)
{
   return '<div class="tabDormant" id="' + name + 
      '" onclick="ActivateTab(this.id)">' +
      name +
      '</div>';
}


function ActivateTab(name)
{
   for (var i = 0; i < tabDef.length; i ++)
   {
      SetClass(tabDef[i], 'tabDormant');
      SetClass('Page_' + tabDef[i], 'pageDormant');
   }
   SetClass(name, 'tabActive');
   SetClass('Page_' + name, 'pageActive');
}


function SetClass(id, className)
{
   var t = document.getElementById(id);
   if (t)
   {
      t.className = className;
   }
}


// This function must return false
function PageFindSubmit()
{
   var t = document.Find_Form.Find_Input.value;
   
   if (currentlySearching)
   {
      return;
   }
   
   DisableSearchBox(true);
   
   t = Trim(t);
   
   if (t.length == 0)
   {
      DisableSearchBox(false);
      return false;
   }
   
   SearchFor(t);
   return false;
}


function Trim(t)
{
   t.replace(/^[\r\n\t ]*(.*)[\r\n\t ]*$/, '$1');
   
   return t;
}


// t is already trimmed
function SearchFor(t)
{
   var kw;
   
   DisableSearchBox(true);
   
   kw = t.split(':');
   if (kw.length == 2)
   {
      kw[0] = Trim(kw[0]).toLowerCase();
      kw[1] = Trim(kw[1]);
      
      switch (kw[0])
      {
         case 'whois':
	    StartWhoisLookup(kw[1]);
	    return;
      }
   }
   
   if (IsIP(t))
   {
      StartIPLookup(t);
      return;
   }
   
   if (IsDomain(t))
   {
      StartWhoisLookup(t);
      return;
   }
   
   if (t.charAt(0).toUpperCase() == 'G' &&
      t.charAt(1).toUpperCase() == 'C' && t.length > 2)
   {
      StartGCLookup(t);
      return;
   }
   
   geocodeTitle = t;
   geocodeHtml = t;
   altGeocodes = new Array();
   altGeocodes[0] = t;
   
   RunAlternateGeocode();
}


function IsIP(ip)
{
   ip = ip.split('.')
   
   if (ip.length != 4)
   {
      return false;
   }
   
   for (var i = 0; i < 4; i ++)
   {
      if (! ip[i].match(/([0-9]|[0-9][0-9]|[0-1][0-9][0-9]|2[0-4][0-9]|25[0-5])/))
      {
         return false;
      }
   }
   
   return true;
}


function IsDomain(d)
{
   if (d.match(/^[-_a-z0-9]*\.(net|com|org|edu|ru|us)$/i))
   {
      return true;
   }
   
   return false;
}


function ConfigOptionDegrees(Type)
{
   return '<input type=radio name=DegreeFormat value="' + Type + 
      '" onclick="PageConfigSave()"> ' + FormatDegrees(93.2547385, Type);
}


function SetConfigOptions()
{
   var c;
   
   document.getElementById('Config_Degrees').innerHTML =
      ConfigOptionDegrees('D') + "<br>\n" +
      ConfigOptionDegrees('DM') + "<br>\n" +
      ConfigOptionDegrees('DMS');

   c = CookieGet('Deg');
   
   if (c == null || (c != 'D' && c != 'DM' && c != 'DMS'))
   {
      CookieSet('Deg', 'DM', cookieLife);
      c = 'DM';
   }
   
   for (var i = 0; i < document.Config_Form.DegreeFormat.length; i ++)
   {
      if (document.Config_Form.DegreeFormat[i].value == c)
      {
         document.Config_Form.DegreeFormat[i].checked = true;
      }
   }
   
   c = CookieGet('Meas');
   
   if (c == null || (c != 'M' && c != 'I'))
   {
      CookieSet('Meas', 'M', cookieLife);
      c = 'M';
   }
   
   for (var i = 0; i < document.Config_Form.MeasureFormat.length; i ++)
   {
      if (document.Config_Form.MeasureFormat[i].value == c)
      {
         document.Config_Form.MeasureFormat[i].checked = true;
      }
   }
   
   c = CookieGet('Confirm');
   
   if (c == null || (c != 'Y' && c != 'N'))
   {
      CookieSet('Confirm', 'Y');
      c = 'Y';
   }
   
   if (c == 'Y')
   {
      document.Config_Form.Confirmations.checked = true;
   }
}


function PageConfigSave()
{
   var deg = 'DM', meas = 'M';
   
   for (var i = 0; i < document.Config_Form.DegreeFormat.length; i ++)
   {
      if (document.Config_Form.DegreeFormat[i].checked)
      {
         deg = document.Config_Form.DegreeFormat[i].value;
      }
   }
   
   CookieSet('Deg', deg, cookieLife);
   
   for (var i = 0; i < document.Config_Form.MeasureFormat.length; i ++)
   {
      if (document.Config_Form.MeasureFormat[i].checked)
      {
         meas = document.Config_Form.MeasureFormat[i].value;
      }
   }
   
   CookieSet('Meas', meas, cookieLife);
   
   if (document.Config_Form.Confirmations.checked)
   {
      CookieSet('Confirm', 'Y', cookieLife);
   }
   else
   {
      CookieSet('Confirm', 'N', cookieLife);
   }
   
   UpdateMapCenter();
   UpdateLastClick();
   UpdatePointsPage();
}


function StartGCLookup(t)
{
   DisableSearchBox(true);
   
   document.getElementById('Find_Status').innerHTML =
      'Finding Waypoint<br />' + t.toUpperCase();
   SetClass('Find_Status', 'findShow');
   
   GDownloadUrl('mapper_gc.php?gc=' + t, StopGCLookup);
}


function StopGCLookup(data, response)
{
   data = data.split("\n");
   
   if (data.length != 4)
   {
      document.getElementById('Find_Status').innerHTML = 
         'Error finding waypoint';
      // Leave Find_Status visible
      return;
   }
   
   ProcessStandardResult(data);
   SetClass('Find_Status', 'findHidden');
   DisableSearchBox(false);
}


function ProcessStandardResult(data)
{
   var marker, point, title, html, lat, lng;
   var bounds = new GLatLngBounds();
   
   while (data.length >= 4)
   {
      title = data.shift();
      lat = parseFloat(data.shift());
      lng = parseFloat(data.shift());
      html = data.shift();
      
      point = new GLatLng(lat, lng);
      marker = GetMarker(point, title, html);
      bounds.extend(point);
   }
   
   if (bounds.getSouthWest().equals(bounds.getNorthEast()))
   {
      GoToMarker(marker);
   }
   else
   {
      var zoom = map.getBoundsZoomLevel(bounds);
      map.setCenter(bounds.getCenter(), zoom);
   }
}


function GoToMarker(m)
{
   var zoom = map.getZoom();
   
   if (zoom < 6)
   {
      zoom = 13;
   }
   
   map.setCenter(m.getPoint(), zoom);
   m.openInfoWindowHtml(m.custom_html);
}


function GetObjectClass(obj)
{
   if (obj && obj.constructor && obj.constructor.toString)
   {
      var arr = obj.constructor.toString().match(/function\s*(\w+)/);
      
      if (arr && arr.length == 2)
      {
         return arr[1];
      }
   }
   
   return undefined;
}


function UpdatePointsPage()
{
   var html = '';

   for (var m in markers)
   {
      html += MakePointHTML(m, true);
   }
   
   if (html == '')
   {
      html += '<p>There are no markers on the map.</p>';
   }
 
   document.getElementById('Page_Points_Data').innerHTML = html;
}


function MakePointHTML(index, makeDiv)
{
   var html = '', match;
   
   match = currentlySelected &&
      currentlySelected.getPoint().equals(markers[index].getPoint());
      
   if (makeDiv)
   {
      html += '<div id="marker_' + index.toString() + '" class="';
      if (match)
      {
         html += 'markerOpen';
      }
      else
      {
         html += 'markerClosed';
      }
      html += '" onclick="PointClick(' + "'" + index.toString() +
         "'" + ')">';
   }
   
   if (match)
   {
      var mp = markers[index].getPoint();
      
      html += '<b>' + markers[index].title + '</b>';
      html += '<div class="markerOpenSub">';
      html += LatLngToHtml(markers[index].getPoint());
      html += '<br>';
      html += '<span class="infoDistance">';
      html += 'Dist to Center of Map: ';
      html += FormatDistance(map.getCenter().distanceFrom(mp));
      if (lastClickPoint)
      {
         html += '<br />Dist to Last Click: ';
	 html += FormatDistance(lastClickPoint.distanceFrom(mp));
      }
      html += '</span><br />';
      html += '<a href="#" onclick="return MoveToPoint(' + "'" +
         index.toString() + "'" + ')">Show</a>';
      html += ' &nbsp; ';
      html += '<a href="#" onclick="return DeletePoint(' + "'" + 
         index.toString() + "'" + ')">Delete</a>';
      html += '</div>';
   }
   else
   {
      html += markers[index].title;
   }
   
   if (makeDiv)
   {
      html += '</div>';
   }
   
   return html;
}


function MoveToPoint(name)
{
   map.panTo(markers[name].getPoint());
   markers[name].openInfoWindowHtml(markers[name].custom_html);
   
   return false;
}


function DeletePoint(name)
{
   if (CookieGet("Confirm") != 'N' &&
      ! confirm("Are you sure you want to delete " +
      markers[name].title))
   {
      return false;
   }
   
   if (map.infoWindowEnabled())
   {
      var iw = map.getInfoWindow();
      if (iw.getPoint().equals(markers[name].getPoint()))
      {
         map.closeInfoWindow();
      }
   }
   map.removeOverlay(markers[name]);
   markers.splice(name, 1);
   currentlySelected = false;
   UpdatePointsPage();
   UpdateMapCenter();
   UpdateLastClick();
   
   return false;
}


function PointClick(name)
{
   // Close previous point
   if (currentlySelected)
   {
      var cS_point = currentlySelected.getPoint();
      
      for (var m in markers)
      {
         if (currentlySelected && markers[m].getPoint().equals(cS_point))
	 {
	    currentlySelected = false;
	    document.getElementById('marker_' + m.toString()).innerHTML =
	       MakePointHTML(m);
	    SetClass('marker_' + m.toString(), 'markerClosed');
	 }
      }
   }
   
   // Open new point
   currentlySelected = markers[name];
   SetClass('marker_' + name, 'markerOpen');
   document.getElementById('marker_' + name).innerHTML = MakePointHTML(name);
}


function DisableSearchBox(b)
{
   if (! b && searchQueue.length && currentlySearching)
   {
      SearchFor(searchQueue.shift());
   }
   else
   {
      document.getElementById('Find_Input').disabled = b;
      currentlySearching = b;
   }   
}


function ParseURLValues()
{
   var sArgs, findArray = new Array();
   
   sArgs = location.search.slice(1).replace(/\+/g, ' ').split('&');

   for (var i = 0; i < sArgs.length; i ++)
   {
      var argData = unescape(sArgs[i].slice(sArgs[i].indexOf('=') + 1));
      
      switch (sArgs[i].slice(0, sArgs[i].indexOf('=')))
      {
         case 'find':
	    findArray.push(argData);
	    break;
      }
   }
   
   if (findArray.length)
   {
      SearchFor(findArray.shift());
      searchQueue = findArray;
   }
}


function FormatDistance(d)
{
   // d is distance in meters
   if (CookieGet('Meas') == 'I')
   {
      d *= 3.2808399;  // feet
      if (d > 528)
      {
         return ForcePrecision(d / 5280, 2).toString() + ' mi';
      }
      return Math.floor(d).toString() + ' ft';
   }
   
   if (d >= 1000)
   {
      return ForcePrecision(d / 1000, 2).toString() + ' km';
   }
   return Math.floor(d).toString() + ' m';
}


var mapperloadwindow = '';
function LoadPoints()
{
   if (!mapperloadwindow.closed && mapperloadwindow.location) {
      mapper.loadwindow.location.href = 'mapper_load.php';
   } else {
      // Pop up a form, do stuff
      mapperloadwindow = window.open("mapper_load.php", "MapperLoadWindow",
         "width=400,height=250");
      if (! mapperloadwindow.opener) {
         mapperloadwindow.opener = self;
      }
   }
   if (window.focus) {
      mapperloadwindow.focus();
   }
   
   return false;
}


// Web Map Services code from Jef Poskanzer
function WMSCreateMap(name, copyright, baseUrl, layer, format, transparent,
   opacity, minResolution, maxResolution, extraTileLayers, urlArg)
{
   var tileLayer = new GTileLayer(new GCopyrightCollection(copyright),
      minResolution, maxResolution);
   tileLayer.baseUrl = baseUrl;
   tileLayer.layer = layer;
   tileLayer.format = format;
   tileLayer.transparent = transparent;
   tileLayer.getTileUrl = WMSGetTileUrl;
   tileLayer.getOpacity = function() { return opacity; };
   tileLayer.getCopyright = function() { return { prefix: '',
      copyrightTexts: [copyright]}; };
   var tileLayers=[];
   for(var i in extraTileLayers)
      tileLayers.push(extraTileLayers[i]);
   tileLayers.push(tileLayer);
   return new GMapType(tileLayers, G_SATELLITE_MAP.getProjection(), name,
      { urlArg: 'o' });
}


function WMSGetTileUrl(tile,zoom)
{
   var southWestPixel = new GPoint(tile.x * 256, (tile.y + 1) * 256);
   var northEastPixel = new GPoint((tile.x + 1) * 256, tile.y * 256);
   var southWestCoords = G_NORMAL_MAP.getProjection().fromPixelToLatLng(southWestPixel,zoom);
   var northEastCoords = G_NORMAL_MAP.getProjection().fromPixelToLatLng(northEastPixel,zoom);
   var bbox = southWestCoords.lng() + ',' + southWestCoords.lat() + ',' +
      northEastCoords.lng() + ',' + northEastCoords.lat();
   var transparency = this.transparent ? '&TRANSPARENT=TRUE' : '';
   return this.baseUrl + '?VERSION=1.1.1&REQUEST=GetMap&LAYERS=' + 
      this.layer + '&STYLES=&SRS=EPSG:4326&BBOX=' + bbox + 
      '&WIDTH=256&HEIGHT=256&FORMAT=' + this.format + 
      '&BGCOLOR=0xCCCCCC&EXCEPTIONS=INIMAGE' + transparency;
}
