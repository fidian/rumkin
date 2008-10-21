<?PHP  // -*- text -*-

include 'common.inc';

MarcoHeader('User Manual');


DoHeader('toc', 'Table of Contents');
?>

<dl>

<dt><b>Introduction</b></dt>
<dd><a href="#functionality">What does Marco Do?</a></dd>
<dd><a href="#whouses">Who can use Marco?</a></dd>
<dd><a href="#unitsofmeasure">What Units of Measure does Marco Use?</a></dd>
<dd><a href="#mathlib">What is MathLib?</a></dd>

<dt><B>Getting Started</b></dt>
<dd><a href="#installing">Installing Marco</a></dd>
<dd><a href="#running">Starting the Program</a></dd>
<dd><a href="#beam">Beaming Marco</a></dd>
<dd><a href="#general">General Layout of Screens</a></dd>
<dd><a href="#entering">Entering Information</a></dd>
<dd><a href="#help">Contect-Specific Help</a></dd>

<dt><b>Curves</b></dt>
<dd><a href="#hcurve">Horizontal Curves</a></dd>
<dd><a href="#vcurve">Vertical Curves</a></dd>
<dd><a href="#ctrlinec">Center Line for Curves</a></dd>

<dt><b>Lines and Objects</b></dt>
<dd><a href="#intersect">Intersection</a></dd>
<dd><a href="#proportion">Proportion</a></dd>
<dd><a href="#inverse">Inverse</a></dd>
<dd><a href="#ctrlinel">Center Line for Lines</a></dd>
<dd><a href="#gradpi">Grading PI</a></dd>

<dt><b>Solvers</b></dt>
<dd><a href="#area">Area of a Polygon</a></dd>
<dd><a href="#triangles">Triangles</a></dd>
<dd><a href="#anglecon">Angle Converter</a></dd>
<dd><a href="#quad">Quadratic Formula Solver</a></dd>

<dt><b>Utility</b></dt>
<dd><a href="#edit">Edit Points</a></dd>
<dd><a href="#prefs">Preferences</a></dd>
<dd><a href="#db">Manage Databases</a></dd>

<dt><b>Appendixes</b></dt>
<dd><a href="#register">Registration Information</a></dd>
<dd><a href="#upgrades">Upgrades</a></dd>
<dd><a href="#calculators">Calculators</a></dd>
<dd><a href="#faq">Frequently Asked Questions (FAQ)</a></dd>
<dd><a href="#contact">Contacting the Author</a></dd>

</dl>

<?PHP DoHeader('functionality', 'What does Marco Do?'); ?>

<p>It acts like a specialty calculator that is geared towards surveyor's
work.  The software speeds up the planning process involved with field work,
and can produce quick, accurate numbers in a pinch.  It is much faster to
turn on and smaller than a laptop, making it more convienient in odd
situations.  When the motors are running and contractors are standing around
waiting for an answer to a problem, this program can get them back to work 
quickly.</p>


<?PHP DoHeader('whouses', 'Who can use Marco?'); ?>

<p>The software was designed to be as easy to use as possible.  When
compared to some of the specialty calculators on the market, this blows them
away.  The friendly prompts have descriptive explanations, and <a
href="#help">built-in help<a> is available for every screen.</p>

<p>While designed for the field, people "in the office" use Marco for
getting quick solutions to problems, where they used to use a calculator.
Students studying surveying can also benefit from the program, and use it for
class or possibly intern work.  It is also possible that professional
landscapers, architectual designers, and construction workers could use 
Marco for various applications in their fields.</p>


<?PHP DoHeader('unitsofmeasure', 'What Units of Measure does Marco Use') ?>

<p>The formulas that are built into Marco do not require a unit of measure
to be used.  The rule of thumb is that all lengths, coordinates, and values
must be in the same unit.  Therefore, if all information is entered in as
feet, the answer will also be in feet.</p>


<?PHP DoHeader('mathlib', 'What is MathLib?'); ?>

<?PHP include('data/mathlib.inc'); ?>


<?PHP DoHeader('installing', 'Installing Marco'); ?>

<p>Just go to the <a href="download.php">download page</a> and get the zip
file with MathLib and documentation.  Extract the archive on your computer
and double click "marco.prc" to schedule it to be HotSync'd to the Palm.
The next time you HotSync, your Palm will have Marco installed on it.</p>

<p>Alternately, Marco can be <a href="#beam">beamed</a> to another person's
Palm.  See the <a href="#beam">beaming section</a> in this manual for more
information.</p>


<?PHP DoHeader('running', 'Starting the Program'); ?>

<p><img src="images/launcher.png" align=left>
Tap on the Applications button to bring up the list of programs on your
Palm.  Look for the "M" icon of Marco, and tap it.</p>


<?PHP DoHeader('beam', 'Beaming Marco'); ?>

<p><img src="images/menu_button.gif" align=right>
Beaming Marco to another handheld lets people see if it will work for
them.  Also, beaming Marco to other registered users can allow them to
upgrade to your version, saving them the hassle of connecting their Palm to
a computer, downloading Marco, and installing it themselves.</p>

<p>To beam Marco, tap on the 
Applications button, and then on the Menu button.  Select Beam under the App
menu.  Now select Marco and tap the Beam button.  Make sure both Palms
are within range, and the other person has "Beam Receive" (in the
preferences) turned on.</p>

<p>MathLib can also be beamed to another Palm with the same method, or it
can be beamed from within Marco.  To beam MathLib within Marco, just run the
program, tap on the menu button, select the Marco menu, and there is an
option to Beam MathLib.  This may be easier than searching through the beam
menus with the application launcher.</p>


<?PHP DoHeader('general', 'General Layout of Screens'); ?>

<p>Marco tries to use a similar, familiar interface on all of the screens it
has.  It will start out on the Main Menu, where you can press a button
to do a specific function.  From all pages except the Main Menu, there is
a "Main" button in the upper right-hand corner that will jump you back to
the starting screen.</p>

<p>To enter information, tap on a button.  So, if
a program requires an X coordinate, it will have a button
labeled with "Enter X" showing that a value is needed there.
When pressed, it will bring up
an appropriate input screen where an angle, value, or other information can
be entered.  For more information about the prompting that Marco performs,
see <a href="#entering">Entering Information</a> in this manual.</p>

<p>Information, once entered, can not be overwritten by tapping the button
again.  This is because once informaton has been entered or calculated, it
can change many other values internally.  Pressing the Clear button in the
lower left corner will erase what you were working on and will allow you to
start over.  In some instances, single values can be cleared.
There will be an X button immediately to the left of the
value that can be cleared.  Tapping the X will erase just that one number
and will keep the rest.</p>

<p>Sometimes, buttons will be hidden from view so that information is not
entered in the wrong spot at the wrong time.  Don't worry -- they will
come back at the appropriate times and be filled in with calculated data
automatically.</p>

<p>If there are multiple screens that a particular program uses, there will
be a bar in the lower right corner with abbreviations of all the screens.
Tapping on one of them will go to that page.</p>

<p>Marco can use multiple point files.  A single point file is a collection
of points, typically for a single project.  It helps keep points with the
same name, but different projects, separate.  The current point file is
displayed in the upper-right hand corner of the Main Menu.  To switch to
another point file, tap on the name of the current point file.  A list of
all available point databases on the Palm will be displayed.  Select one
from the list, or pick the <a href="#db">Manage Databases</a>
option to handle creating, deleting, renaming, and beaming of point files.</p>


<?PHP DoHeader('entering', 'Entering Information'); ?>

<p>When you need to enter information into Marco, there will be an appropriate
form that will pop up and ask for a value.  The forms change with what
type of data is being entered.  Also, there is an optional keypad on the
screen (set up in the <a href="#prefs">preferences section</a>) that can
assist when entering numbers.  Additionally, the style that angles are entered
in (degrees, radians, DMS, gradians) is set in the preferences.</p>

<table align=center border=1 cellpadding=5 cellspacing=0>
<tr>
  <td bgcolor="#DDDDDD">&nbsp</td>
  <th bgcolor="#DDDDDD">Asking for a Value</th>
  <th bgcolor="#DDDDDD">Asking for an Angle</th>
</tr>
<tr>
  <th bgcolor="#DDDDDD">With Keypad</th>
  <td align=center valign=top><img src="images/enter_value_keypad.png" border=1></td>
  <td align=center><img src="images/enter_angle_keypad.png" border=1><br>(Angles set to Degrees)</td>
</tr>
<tr>
  <th bgcolor="#DDDDDD">Without Keypad</th>
  <td align=center valign=top><img src="images/enter_value.png" border=1></td>
  <td align=center><img src="images/enter_angle.png" border=1><br>(Angles set to DMS)</td>
</tr>
</table>

<p>When the form is up, tapping on the buttons on the keypad will enter
numbers, and the standard Palm grafitti method of inputting data works as 
well.</p>


<?PHP DoHeader('help', 'Context-Specific Help'); ?>

<p><img src="images/menu_button.gif" align=right>
By tapping on the menu button, and then picking Help under the Marco menu,
it will show information about the current screen or form.  That way, if you
get stuck or you don't know what a particular value is, an explanation is
always easily available and is built-in to every copy of Marco.</p>


<?PHP DoHeader('hcurve', 'Horizontal Curves'); ?>

<p align=center><img src="media/doc/hcurve-data.png" border=1>
<img src="media/doc/hcurve-diag.png" border=1>
<img src="media/doc/hcurve-loc.png" border=1>
<img src="media/doc/hcurve-table.png" border=1></p>

<p>Horizontal curves are used when making a left or a right turn on a
road, and could also be applied to borders in landscaping, making a curved
sidewalk, or dozens of other applications.  The program is divided into four
screens.  The "Data" screen is where the information describing the
curve is entered.  "Diag" is a diagram illustrating the lengths and
locations of points that are involved in the curve.  "Loc" contains
information about the location of the curve.  "Table" will show
a series of points along the curve with their cord length and angle of 
deflection.</p>

<?PHP DoHeader('vcurve', 'Vertical Curves'); ?>

<p align=center><img src="media/doc/vcurve-data.png" border=1>
<img src="media/doc/vcurve-diag.png" border=1>
<img src="media/doc/vcurve-query.png" border=1>
<img src="media/doc/vcurve-table.png" border=1></p>

<p>Vertical curves are necessary when changing inclines due to going over a
hill, down into a valley, or from a flat area to a different elevation.
Like Horizontal Curves, this has four screens as well.  The "Data" screen
shows the variables that need to be defined in order to create a curve.
"Diag" shows an illustration of two vertical curves, which lables the points
and lengths that are needed.  "Query" finds specific elevations or
stations on or outside the curve.  "Table" lists the elevations of a
series of points that are on the curve.</p>


<?PHP DoHeader('ctrlinec', 'Center Line for Curves'); ?>

<p align=center><img src="media/doc/ctrlinec-data-1.png" border=1>
<img src="media/doc/ctrlinec-data-2.png" border=1>
<img src="media/doc/ctrlinec-data-3.png" border=1>
<img src="media/doc/ctrlinec-data-4.png" border=1></p>

<p>Center Line for Curves will locate a series of X and Y coordinates that
are along a line or offset from a line.  This allows the creation
of lanes on a road, sidewalks, and ditch lines.  Because the curve and the
location of the cuve must be defined, there are several variables required.
They are unable to be squeezed on just one screen, and have been broken up
onto four different forms.</p>

<p>If everything is known about a curve and the first data screen can be
filled in completely, the rest of the curve will be properly defined
automatically.  If not, enter known values on the first three data screens
and the unknown ones will be calculated. as soon as enough information is
entered.</p>

<p>The fourth data page is special and sets up the information required
for the "Table" screen.  If you plan on only using the "Query" screen, it
does not need to be filled in.</p>

<p align=center><img src="media/doc/ctrlinec-diag.png" border=1>
<img src="media/doc/ctrlinec-query.png" border=1>
<img src="media/doc/ctrlinec-table.png" border=1></p>

<p>The "Diag" tab shows diagram of a sample center line and where
all of the lengths, points, and angles are located.  "Query" allows the user
to find the location of an offset at a specific station, and calculates the
station and offset of an entered coordinate pair.  "Table" lists a series of
points that are a given offset away from the center line.  By tapping on the
"L" and "R" buttons, the offset will be to the left or right of the curve.
By tapping on a point, the selected point's coordinates can be saved to the
current point file.</p>


<?PHP DoHeader('intersect', 'Intersection'); ?>

<p align=center><img src="media/doc/intersect-line.png" border=1>
<img src="media/doc/intersect-circle.png" border=1>
<img src="media/doc/intersect-result.png" border=1></p>

<p>Intersection acts like three programs in one.  It can find the
intersection of two lines, two circles, or a line and a circle.  Start by
selecting what the first object is by tapping the Line or Circle buttons.
In the image above, the first object is a line.  Then, define the
location of that object.  When done, tap on the Object 2 button and
select if it is a Line or a Circle.  In the example above, the second object
is a circle.  After defining the location of the object, tap on
Result to see where the two entities intersect and the distances from any
coordinates that were entered.</p>

<?PHP DoHeader('proportion', 'Proportion'); ?>

<p align=center><img src="media/doc/proportion-data.png" border=1>
<img src="media/doc/proportion-table.png" border=1></p>

<p>This program calculates a proportional increase or decrease.  It is used
when expanding a road to accomodate another lane, a turn lane, or to shrink
a road right before a bridge.  The "Data" form defines the starting
and ending values along with the starting and ending stationing.  It also
sets the increment for the Table screen.  "Table" shows a list of
stations and the proportional value at each location.</p>


<?PHP DoHeader('inverse', 'Inverse'); ?>

<p align=center><img src="media/doc/inverse.png" border=1></p>

<p>Inverse can take two points and calculate the azimuth and distance
between them.  It can also determine a second point's coordinates when given
a starting point, an azimuth, and a distance.  Pressing the "Traverse"
button will put the second point's coordinates in as the starting point, so
another point can be calculated.</p>


<?PHP DoHeader('ctrlinel', 'Center Line for Lines'); ?>

<p align=center><img src="media/doc/ctrlinel-data-start.png" border=1>
<img src="media/doc/ctrlinel-data-direction.png" border=1>
<img src="media/doc/ctrlinel-query.png" border=1>
<img src="media/doc/ctrlinel-table.png" border=1></p>

<p>To find a series of points that are a given offset from a line, or to
find information about how far a particular point is away from a line, use
Center Line for Lines.  MnDOT uses this for marking lanes, shoulders, and
sidewalks that are a given distance away from the center of the road.  Enter
information on the two "Data" screens.  The "Starting Point" form asks
for where the line starts and further information needed for the "Table"
page.  "Direction" records where the line travels to.  Once the line is
defined, use the "Query" screen to find the station and offset of any point, 
or find the coordinates for a given station and offset.
"Table" will generate a list of coordinates at specific stations.  The "L"
and "R" buttons change the offset to be left and right, accordingly.</p>


<?PHP DoHeader('gradpi', 'Grading PI'); ?>

<p align=center><img src="media/doc/gradpi-grad.png" border=1>
<img src="media/doc/gradpi-final.png" border=1>
<img src="media/doc/gradpi-edge.png" border=1>
<img src="media/doc/gradpi-diag.png" border=1></p>

<p>Finding the elevations and widths of the lanes, shoulder, and embankment
of a road involves many calculations.  This section of Marco makes that
process easier.  The "Grad" screen contains all of the information about the
grading for the road.  "Final" is the finished road for the shoulder and 
lanes.  The embankment's measurements are covered with the "Edge" form.  To
help locate reference points, a cut-away side view of a road is on the
"Diag" page.</p>


<?PHP DoHeader('area', 'Area of a Polygon'); ?>

<p align=center><img src="media/doc/area.png" border=1>
<img src="media/doc/area-results.png" border=1></p>

<p>Squares, triangles, and anything else with a border made of straight
line segments can have their areas calculated.  Press "Add" to add a point,
or "Pick" to select a saved point from a point list.  When done defining the
border, the "Calc" button will display the area of the object, the perimeter
around the outside, and the centroid.  "Del" will erase the selected point
from this screen and "Clear" will start the process over.</p>


<?PHP DoHeader('triangles', 'Triangles'); ?>

<p align=center><img src="media/doc/triangles-tabular.png" border=1>
<img src="media/doc/triangles-spatial.png" border=1></p>

<p>Triangles can be calculated by entering any side and two other values
(sides or angles).  This unique tool has two different ways of displaying
the same information.  By going into <a href="#preferences">Preferences</a>,
it is possible to change between the tabular view (on the left) and the 
spatial view (on the right).</p>


<?PHP DoHeader('anglecon', 'Angle Converter'); ?>

<p align=center><img src="media/doc/anglecon.png" border=1></p>

<p>This simple utility converts angles from one type to another.  To enter
an angle, just tap on the buttons in the middle.  The "+" and "-" buttons
allow you to add and subtract an angle from the one currently displayed.
Angles are always positive, and are from 0 to just under 360&deg;.</p>


<?PHP DoHeader('quad', 'Quadratic Formula Solver'); ?>

<p align=center><img src="media/doc/quad.png" border=1></p>

<p>A quick calculator that will find the X intercepts for a given quadriatic
equation.</p>


<?PHP DoHeader('edit', 'Edit Points'); ?>

<p align=center><img src="media/doc/edit.png" border=1>
<img src="media/doc/edit-view.png" border=1>
<img src="media/doc/edit-edit.png" border=1></p>

<p>This interface allows easy manipulation of saved points.  It will list
all of the points in the currently open file.  By selecting one and pressing
"View," the X and Y coordinates, the elevation, and the
station, will be displayed.  Points may not have all of those values, so
it leaves blank anything that wasn't entered.  If the "Edit" button is
pressed, those values can be altered.  "Delete" removes a point from the 
list permanently.  It is not possible to undelete a point, so be careful.</p>

<p>On the Edit screen, the Description field does not have an "X" button to
clear it.  To rename a point, just tap on the Description button and it will
allow a new name to be entered.</p>


<?PHP DoHeader('prefs', 'Preferences'); ?>

<p align=center><img src="media/doc/prefs.png" border=1>
<img src="media/doc/prefs-units.png" border=1>
<img src="media/doc/prefs-numbers.png" border=1>
<img src="media/doc/prefs-forms.png" border=1></p>

<p>Many attributes about how Marco operates are configurable.  The
Preferences section is where configuration options are accessed.  "Units of
Measure" configures how angles are entered and displayed, and how
coordinates are used.  With "X, Y" coordinates, the X is always prompted for
first.  Likewise, "Northing, Easting" will always ask for the Northing
before the Easting.</p>

<p>"Numbers and Precision" defines how many digits beyond the decimal point
should be shown in varying circumstances.  The amount of precision for each
type of angle measurement is configured separately, and the various numbers
also have the same options.  In order to save space, any trailing zeros can
be removed from numbers in tables, in the buttons, and in other assorted
places by checking the appropriate box.</p>

<p>On the "Entering Information" page, you can turn off confirmation of
deletions in the <a href="#edit">Edit Points</a> screens, and will turn on
and off the number pad that is used when <a href="#entering">Entering
Information</a>.  The "Tabular" and "Spatial" buttons toggle beteween the
different layouts for the <a href="#triangles">Triangles</a> form.</p>

<p>When changing the settings, make sure to hit "Save" when done, or
"Cancel" to go back without saving the new settings.</p>


<?PHP DoHeader('db', 'Manage Databases'); ?>

<p align=center><img src="media/doc/manage-databases.png" border=1>
<img src="media/doc/db.png" border=1></p>

<p>Marco can use multiple point databases to keep individual points
separated into groups.  To switch to another database, go to the main page
and tap on the name of the currently open point file in the upper right hand
corner.  (Marco creates the default point file called "Marco Points"
initially.)  This will bring up a list of available point files on your
Palm.  Select another one to use that alternate point file.</p>

<p>If "Manage Databases" is picked, Marco will display a special screen
where point files can be created, deleted, and renamed.  If a point file is
deleted, it can not be restored, so be careful.</p>


<?PHP DoHeader('register', 'Registration Information'); ?>

<?PHP include('data/register.inc'); ?>


<?PHP DoHeader('upgrades', 'Upgrades'); ?>

<?PHP include('data/upgrades.inc'); ?>


<?PHP DoHeader('calculators', 'Calculators'); ?>

<?PHP include('data/calculators.inc'); ?>


<?PHP DoHeader('faq', 'Frequently Asked Questions (FAQ)'); ?>

<?PHP include('data/faq.inc'); ?>


<?PHP DoHeader('contact', 'Contacting the Author'); ?>

<?PHP include('data/contact.inc'); ?>


<?PHP

MarcoFooter();


function DoHeader($link, $desc)
{
if ($link != 'toc') {
?><hr>
<table border=0 cellpadding=0 cellspacing=0>
<tr><td>
<?PHP
}

?><table border=0 cellpadding=1 cellspacing=0 bgcolor=#000000>
<tr><td>
  <table border=0 cellpadding=3 cellspacing=0 bgcolor=#FFFFFF>
  <tr><td>
    <h2><a name="<?= $link ?>"></a><?= $desc ?></h2>
  </td></tr>
  </table>
</td></tr>
</table>
<?PHP

if ($link != 'toc') {
?></td><td>
  &nbsp; &nbsp; &nbsp; &nbsp;
</td><td valign=bottom>
  <font size="-1">Back to the <a href="#toc">Table of Contents</a></font>
</td></tr>
</table>
<?PHP
}
}
