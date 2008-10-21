<?PHP
/* Sprint File Uploader
 *
 * Copyright (C) 2003-2005 - Tyler Akins
 * Licensed under the GNU GPL software license.
 * See the LEGAL file for legal information
 * See http://rumkin.com/tools/sprint/ for more information about these tools
 */

session_start();

include 'common.inc';

$action = "newphone.php";
$StepList = array('Model', 'JAR', 'Screen', 'JPG',
		  'WBMP', 'GIF', 'PNG', 'PMD', 
		  'QCP', 'MID', 'Results');

$Files = array('JAR' => array(122, 'SysInfo.jar', 'Applications', ''),
	       'JPG' => array(2, 'blue.jpg', '', 'Jpg Image Test'),
	       'WBMP' => array(125, 'box.wbmp', '', 'Wbmp Image Test'),
	       'GIF' => array(128, 'normal.gif', '', 'Gif Image Test'),
	       'PNG' => array(130, 'pngnow.png', '', 'Png Image Test'),
	       'PMD' => array(131, 'matrix.pmd', '', 'Pmd Test'),
	       'QCP' => array(132, 'music.qcp', '', 'Qcp Audio Test'),
	       'MID' => array(133, 'rocky.mid', '', 'Midi Audio Test'),
	       );
$GLOBALS['FileList'] = $Files;

if (isset($_GET['send']) && isset($Files[$_GET['send']]))
{
    SendDesc($_GET['send'], $Files[$_GET['send']], $action);
    exit();
}

$step = '';
if (isset($_GET['step']))
  $step = $_GET['step'];
if (isset($_POST['step']))
  $step = $_POST['step'];

if ($step == 10)
{
    $Mesg = SaveMidForm();
    if ($Mesg == false)
    {
	StepHeader($step);
	SubmitReport();
	StandardFooter();
    }
    else
    {
	StepHeader($step - 1);
	ShowMessage($Mesg);
	MakeMidForm($step, $action);
	StandardFooter();
    }
}
elseif ($step == 9)
{
    $Mesg = SaveQcpForm();
    if ($Mesg == false)
    {
	StepHeader($step);
	MakeMidForm($step + 1, $action);
	StandardFooter();
    }
    else
    {
	StepHeader($step - 1);
	ShowMessage($Mesg);
	MakeQcpForm($step, $action);
	StandardFooter();
    }
}
elseif ($step == 8)
{
    $Mesg = SavePmdForm();
    if ($Mesg == false)
    {
	StepHeader($step);
	MakeQcpForm($step + 1, $action);
	StandardFooter();
    }
    else
    {
	StepHeader($step - 1);
	ShowMessage($Mesg);
	MakePmdForm($step, $action);
	StandardFooter();
    }
}
elseif ($step == 7)
{
    $Mesg = SavePngForm();
    if ($Mesg == false)
    {
	StepHeader($step);
	MakePmdForm($step + 1, $action);
	StandardFooter();
    }
    else
    {
	StepHeader($step - 1);
	ShowMessage($Mesg);
	MakePngForm($step, $action);
	StandardFooter();
    }
}
elseif ($step == 6)
{
    $Mesg = SaveGifForm();
    if ($Mesg == false)
    {
	StepHeader($step);
	MakePngForm($step + 1, $action);
	StandardFooter();
    }
    else
    {
	StepHeader($step - 1);
	ShowMessage($Mesg);
	MakeGifForm($step, $action);
	StandardFooter();
    }
}
elseif ($step == 5)
{
    $Mesg = SaveWbmpForm();
    if ($Mesg == false)
    {
	StepHeader($step);
	MakeGifForm($step + 1, $action);
	StandardFooter();
    }
    else
    {
	StepHeader($step - 1);
	ShowMessage($Mesg);
	MakeWbmpForm($step, $action);
	StandardFooter();
    }
}
elseif ($step == 4)
{
    $Mesg = SaveJpgForm();
    if ($Mesg == false)
    {
	StepHeader($step);
	MakeWbmpForm($step + 1, $action);
	StandardFooter();
    }
    else
    {
	StepHeader($step - 1);
	ShowMessage($Mesg);
	MakeJpgForm($step, $action);
	StandardFooter();
    }
}
elseif ($step == 3)
{
    $Mesg = SaveScreenForm();
    if ($Mesg == false)
    {
	StepHeader($step);
	MakeJpgForm($step + 1, $action);
	StandardFooter();
    }
    else
    {
	StepHeader($step - 1);
	ShowMessage($Mesg);
	MakeScreenForm($step, $action);
	StandardFooter();
    }
}
elseif ($step == 2)
{
    $Mesg = SaveJarForm();
    if ($Mesg == false)
    {
	StepHeader($step);
	MakeScreenForm($step + 1, $action);
	StandardFooter();
    }
    else
    {
	StepHeader($step - 1);
	ShowMessage($Mesg);
	MakeJarForm($step, $action);
	StandardFooter();
    }
}
elseif ($step == 1)
{
    $Mesg = SaveModelForm();
    if ($Mesg == false)
    {
	StepHeader($step);
	MakeJarForm($step + 1, $action);
	StandardFooter();
    }
    else
    {
	StepHeader($step - 1);
	ShowMessage($Mesg);
	MakeModelForm($step, $action);
        StandardFooter();
    }
}
else
{
    foreach ($_SESSION as $k => $v)
       unset($_SESSION[$k]);
    StepHeader(0);
    Introduction();
    MakeModelForm(1, $action);
    StandardFooter();
}



function StepHeader($num)
{
    global $StepList;
 
    SprintStandardHeader("New Phone :: Step " . ($num + 1) . " of " . 
			 count($StepList));
    
    echo "<table align=center border=2 cellpadding=3 cellspacing=0>";
    echo "<tr>\n";
    
    foreach ($StepList as $k => $name)
    {
	if ($num == $k)
	  echo "<th><i>";
	else
	  echo "<td align=center>";
	
	echo $name;
	
	if ($num - 1 == $k)
	  echo "</i></th>\n";
	else
	  echo "</td>\n";
    }
    
    echo "</tr></table>\n";
}
	

function ShowMessage($Message)
{
?>

<table align=center border=3 cellpadding=10 cellspacing=1>
<tr><td align=center><b><font size="+1">
<?PHP echo nl2br(htmlspecialchars($Message)) ?>
</font></b></td></tr>
</table>
<?PHP
}


function ActionTable($step, $action, $what)
{
    $data = $GLOBALS['FileList'][$what];
    $id = SaveFileDesc($data[0], $data[1], $data[2], $data[3], 0);
?>
	
<script language=javascript>
<!--
n = <?PHP echo $step * 100 ?>;
function ShowSample()
{
   eval("window.open('<?PHP echo $action ?>?send=<?PHP echo $what
		     ?>', '" + n +
      "', 'toolbar=0,scrollbars=1,location=0,statusbar=0," + 
      "menubar=0,resizable=1,width=300,height=300');");
   n ++;
}
// --></script>

<table align=center cellpadding=20 cellspacing=0 border=3>
<tr><td align=center>Text Message Me The<br>
<a href="javascript:ShowSample()"><?PHP echo $what ?> File Link</a></td>
<td align=center>Or use the <a href="faq/index.php?Topic=jumpcode">Jump Code</a><br>
<font size="+1"><?PHP echo $id ?></font></td>
</tr></table>

<p>After you download the file, please let me know if it worked or not.
It worked only if you were able to see the expected results.  If you got
an error about an unsupported type, missing a plugin, or that the phone
can not display this type of file, it did not work.  If you received a
data error or other message, the download was probably interrupted; please
try to get the file again.</p>
	
<table align=center cellpadding=20 cellspacing=0 border=3>
<tr><td align=center>The File<br>
<a href="<?PHP echo $action ?>?step=<?PHP echo $step ?>&works=no">DID NOT Work</a></td>
<td align=center>The File<br>
<a href="<?PHP echo $action ?>?step=<?PHP echo $step ?>&works=yes">DID Work</a></td>
</tr></table>
	
<?PHP
}


function SendDesc($type, $data, $action)
{
?><html><head><title>Sending <?PHP echo $data[1] ?></title></head>
<body bgcolor=#FFFFFF>
<p>Sending you the test <?PHP echo $type ?> file:  <?PHP echo $data[1] ?></p>
<?PHP
    flush();
    
    $_SESSION[$type . ' Time'] = date("D M j G:i:s T Y");
    
    $id = SaveFileDesc($data[0], $data[1], $data[2], $data[3], 0);
    $URL = SendFileToUser($_SESSION['SendTo'], $id);
    
?>
<p>URL sent to your phone.  Close this window when you receive the message.</p>

<p>Please be patient!  It can take a minute or longer to get the file.
If you must resend the notification, just close this window and click on the
Send File link again.</p>
	
<p>In case the message is not delivered, you
can type this into your web browser by hand, but you must use your phone
to look at the file.</p>

<p><?PHP echo $URL ?></p>

</body></html>
<?PHP
}


function Introduction()
{
?>

<p>Thank you for your desire to make this uploader work better with your
model of phone.  Since I am unable to buy every model of phone, and Sprint
has not yet shipped one of each to me, I must rely on you, the user.</p>

<p>For this to work, I will need for you to find out some detailed
information about your phone.  You might need to dig around for the
information a bit, but I will provide links at the appropriate times as you
progress through this process.</p>

<p>Phones that I know all relevant information about:</p>

<?PHP echo ShowPhoneList(1); ?>

<p>If you would like to continue with this process, please fill in this form.
I will not use/sell/distribute your email address.  It is just used if I
have any questions about your
submission.  It is not kept in a database or in any list of mine, and will be
deleted after I am done importing the information about your phone.
Additionally, none of the information gathered here will be used to 
identify you -- only that particular model of phone and what features it
can or can not handle.</p>

<?PHP
}


function MakeModelForm($step, $action)
{
?>

<form method=post action="<?PHP echo $action ?>">
<input type=hidden name=step value="<?PHP echo $step ?>">
<table border=1 cellpadding=3 cellspacing=0 align=center>
<tr><th>Your Name</th><td>
  <input type=text size=20 name="PersonName" value="<?PHP
  if (isset($_POST['PersonName']))
     echo htmlspecialchars($_POST['PersonName']);
  ?>">
  <br><font size="-1">Your first name will work wonderfully, or maybe
  just use an alias.  Something that I can refer to you as if I need to
  contact you.</font></td></tr>
<tr><th>Your Email</th><td>
  <input type=text size=20 name="PersonEmail" value="<?PHP
  if (isset($_POST['PersonEmail']))
     echo htmlspecialchars($_POST['PersonEmail']);
  ?>">
  <br><font size="-1">This will be used for any questions that I might
  email you with regarding your submission.  It is not shared and only
  used uif I have questions.</font></td></tr>
<tr><th>Your Phone Number</th><td>
  <input type=text size=25 name="SendTo" value="<?PHP
  if (isset($_POST['SendTo']))
     echo htmlspecialchars($_POST['SendTo']);
  ?>">
  <br><font size="-1">This is only used to send you the test files.
  I will never see it, nor will it be used for any other purpose.  You
  can also use your <i>username</i>@sprintpcs.com email 
  address.</font></td></tr>
<tr><th>Phone Manufacturer</th><td>
  <input type=text size=25 name="Manufacturer" value="<?PHP
  if (isset($_POST['Manufacturer']))
     echo htmlspecialchars($_POST['Manufacturer']);
  ?>">
  <br><font size="-1">Sanyo, Samsung, etc.</font></td></tr>
<tr><th>Phone Model</th><td>
  <input type=text size=25 name="Model" value="<?PHP
  if (isset($_POST['Model']))
     echo htmlspecialchars($_POST['Model']);
  ?>">
  <br><font size="-1">SPH-i500, A600, 8100, etc.</font></td></tr>
<tr><td colspan=2 align=center><input type=submit value="Continue"></td></tr>
</table>

<?PHP
}


function SaveModelForm()
{
   $Mesg = array();
   
   if ($_POST['PersonName'] == '')
      $Mesg[] = 'Your name was not entered.  Type in your first name or ' .
         'an alias or something.';
	 
   if ($_POST['PersonEmail'] == '')
      $Mesg[] = 'Your email address was not entered.  I need this so that ' .
         'I can contact you if there are questions.';
	 
   if ($_POST['SendTo'] == '')
      $Mesg[] = 'Your phone number or phone\'s email address needs to ' .
         'be entered so that the test files can be sent to it.';

   if ($_POST['Manufacturer'] == '')
      $Mesg[] = 'Your phone\'s manufacturer needs to be entered.';
   
   if ($_POST['Model'] == '')
      $Mesg[] = 'Your phone\'s model needs to be entered.';

   if (count($Mesg))
   {
      return join("\n", $Mesg);
   }
   
   $_SESSION['PersonName'] = $_POST['PersonName'];
   $_SESSION['PersonEmail'] = $_POST['PersonEmail'];
   $_SESSION['SendTo'] = $_POST['SendTo'];
   $_SESSION['Manufacturer'] = $_POST['Manufacturer'];
   $_SESSION['Model'] = $_POST['Model'];
    
   return false;
}


function MakeJarForm($step, $action)
{
?>

<p>A Java midlet is a program that runs on your phone.  Usually they are
games, but they are certainly not limited to just fun things.  Midlets can
provide useful tools and get certain information from your phone -- just
like this SysInfo midlet.</p>

<p>This test will send you the SysInfo midlet.  If it downloads, you might
need it for the next step, so do not delete it right away.</p>

<?PHP

ActionTable($step, $action, 'JAR');

}


function SaveJarForm()
{
    // No confirmation necessary.
    $_SESSION['JAR Result'] = $_GET['works'];
    
    return false;
}


function MakeScreenForm($step, $action)
{
?>

<p>Now I need to determine what size your screen is an how many colors
it supports.  With this information, images can be automatically resized
to fit your phone better.  Otherwise, you would need to do it by hand.</p>

<?PHP if ($_SESSION['JAR Result'] == 'yes') { ?>
<p>Since the SysInfo midlet was uploaded to your phone successfully, it
is easiest to just run it and report what it says.  Go look under the
"Applications" folder for the SysInfo program and run it.  It will eventually
let you know what size of screen you have and how many colors the phone
supports.  If you have problems running the program, or if you just do
not trust running programs on your phone, you can use these links to help
find the information needed.  When you run it, press Ok and then Start.
In the results, you want to look for "numColors" for the number of colors
and "canvasSize" is the size of the useable screen area.  canvasSize might
be a little off -- Java midlets don't get full use of the phone's screen.</p>
<?PHP } else { ?>
<p>It is a pity that the SysInfo midlet did not work on your phone.  You
can still find this information out about your phone by looking at the
following links.</p>
<?PHP } ?>
	
<ul>
<li><a href="http://www.phonescoop.com/phones/" target=_blank>Phone Scoop</a>
<li><a href="http://wgamer.com/device/" target=_blank>Wireless Gaming Review</a>
<li><a href="http://www.sprintusers.com/forum/showthread.php?t=37422" target=_blank>SprintUsers Forum</a>
<li><a href="http://www.jbenchmark.com/index.html?F=2" target=_blank>JBenchmark</a>
<li><a href="http://google.com/" target=_blank>Google</a>
<li>(Know of better sites?  Let me know and I will add them.)
</ul>

<form method=post action="<?PHP echo $action ?>">
<input type=hidden name=step value="<?PHP echo $step ?>">
<table align=center border=1 cellpadding=3 cellspacing=0>
<tr><th>Screen Size</th><td>
  <input type=text size=20 name="ScreenSize" value="<?PHP
  if (isset($_POST['ScreenSize']))
    echo htmlspecialchars($_POST['ScreenSize']);
  ?>">
  <br><font size="-1">This should be something like 138x125 (the 138 in
  this example is the screen width).  You are looking for number of pixels,
  not the physical size of the screen.</td></tr>
<tr><th>Colors</th><td>
  <input type=text size=20 name="ScreenColors" value="<?PHP
  if (isset($_POST['ScreenColors']))
    echo htmlspecialchars($_POST['ScreenColors']);
  ?>">
  <br><font size="-1">Ideally, you will be able to get something like "65,536
  colors", "64k colors", "16 bit color" or similar.</td></tr>
<tr><td colspan=2 align=center><input type=submit value="Continue"></td></tr>
</table>

<?PHP
}


function SaveScreenForm()
{
    $Mesg = array();
    
    if ($_POST['ScreenSize'] == '')
      $Mesg[] = 'You did not specify a screen size.';
    
    if ($_POST['ScreenColors'] == '')
      $Mesg[] = 'You did not say how many colors your phone can display.';
    
    if (count($Mesg))
    {
	return join("\n", $Mesg);
    }
    
    $_SESSION['ScreenSize'] = $_POST['ScreenSize'];
    $_SESSION['ScreenColors'] = $_POST['ScreenColors'];
    
    return false;
}


function MakeJpgForm($step, $action)
{
?>

<p>One of the most common formats for images on the web today is Jpg.
It works great for photos and other realistic images.  I would be quite
surprised if a phone did not support this but it took pictures or worked
with other image formats.</p>

<p>The sample Jpg image that will be sent to your phone is a blueish
or blackish square.  If you can download and view it, the test is a 
success.</p>

<?PHP

ActionTable($step, $action, 'JPG');

}


function SaveJpgForm()
{
    // No confirmation necessary.
    $_SESSION['JPG Result'] = $_GET['works'];
    
    return false;
}


function MakeWbmpForm($step, $action)
{
?>

<p>A Wbmp file is a wireless bitmap file.  It is not a Windows bitmap file.
these are black and white pictures that are highly compressed to be sent
over the air to mobile devices.</p>

<p>This particular image is of a 3D box.</p>

<?PHP

ActionTable($step, $action, 'WBMP');

}



function SaveWbmpForm()
{
    // No confirmation necessary.
    $_SESSION['WBMP Result'] = $_GET['works'];
    
    return false;
}



function MakeGifForm($step, $action)
{
?>

<p>A Gif file is another fairly common image format that is found on the web.
It obtains best compression with cartoonish images and ones with few colors.
Lately, it is being phased out for the Png image format.</p>

<p>Another 3D box is the test image, but this one is in shades of red.</p>

<?PHP

ActionTable($step, $action, 'GIF');

}


function SaveGifForm()
{
    // No confirmation necessary.
    $_SESSION['GIF Result'] = $_GET['works'];
    
    return false;
}




function MakePngForm($step, $action)
{
?>

<p>The Png image format was designed to replace Gif.  It supports lots of
great features and is becoming more and more popular on the web.</p>

<p>This sample image is taken from the Png web site -- it is an image that
is typically used for links.</p>

<?PHP

ActionTable($step, $action, 'PNG');

}


function SavePngForm()
{
    // No confirmation necessary.
    $_SESSION['PNG Result'] = $_GET['works'];
    
    return false;
}




function MakePmdForm($step, $action)
{
?>

<p>Screensavers and animations for your phone are stored as Pmd files.
They can act like little movies, and include sound with the moving
pictures.</p>

<p>This animation is based off the popular Matrix movies.</p>

<?PHP

ActionTable($step, $action, 'PMD');

}


function SavePmdForm()
{
    // No confirmation necessary.
    $_SESSION['PMD Result'] = $_GET['works'];
    
    return false;
}




function MakeQcpForm($step, $action)
{
?>

<p>On Windows, sound files are typically saved as .mp3 or .wav files.  Qcp
and .mmf files are the highly compressed versions that work on phones.</p>

<p>This Qcp file is a clip of some music.</p>

<?PHP

ActionTable($step, $action, 'QCP');

}


function SaveQcpForm()
{
    // No confirmation necessary.
    $_SESSION['QCP Result'] = $_GET['works'];
    
    return false;
}




function MakeMidForm($step, $action)
{
?>

<p>Midi files are like sheet music.  The computer reads what
instruments are playing what notes, and plays really good music as a result.
They work great for ringers.

<p>This particular tune is from Rocky.</p>

<?PHP

ActionTable($step, $action, 'MID');

}


function SaveMidForm()
{
    // No confirmation necessary.
    $_SESSION['MID Result'] = $_GET['works'];
    
    return false;
}


function SubmitReport()
{
    $keys = array('PersonName', 'PersonEmail', 'Manufacturer',
		  'Model', 'JAR Time', 'JAR Result', 'ScreenSize',
		  'ScreenColors', 'JPG Time', 'JPG Result',
		  'WBMP Time', 'WBMP Result', 'GIF Time',
		  'GIF Result', 'PNG Time', 'PNG Result',
		  'PMD Time', 'PMD Result', 'QCP Time',
		  'QCP Result', 'MID Time', 'MID Result');
    
    $Message = 'Below is the phone information that ' . 
      $_SESSION['PersonName'] . " submitted.\n\n";
    
    foreach ($keys as $k)
    {
	if (isset($_SESSION[$k]))
	{
	    $Message .= $k . ' = ' . $_SESSION[$k] . "\n";
	}
	else
	{
	    $Message .= $k . " = undefined\n";
	}
    }
    
    if (isset($GLOBALS['Admin Email']))
      mail($GLOBALS['Admin Email'], 'Submitted Phone Information',
	   $Message, 'From: ' . $_SESSION['PersonName'] . ' <' .
	   $_SESSION['PersonEmail'] . ">\r\n");
    
?>

<p>Thank you <b>very much</b> for going through the process to submit
information about your phone.  I will review your information in the next
few days.  The information will not show up immediately &ndash; I need to
process it and handle it appropriately.
	
<p>Here is a copy of what I will be receiving:</p>

<table align=center border=1 cellpadding=3 cellspacing=0>
<tr><td><tt><?PHP echo nl2br(htmlspecialchars($Message)) ?></tt></td></tr>
</table>
	
<?PHP
}