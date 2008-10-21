<?PHP

include '../functions.inc';

CheckForLogin('restricted');
StandardHeader(array('title' => 'Upload a File',
		     'topic' => 'restricted'));

// handle uploads

foreach ($HTTP_POST_FILES as $File) {
   if (! copy($File['tmp_name'], 'upload/' . $File['name'])) {
      echo "Unable to copy " . $File['name'] . "<br>";
   } else {
      echo $File['name'] . " was uploaded successfully.<Br>";
      echo "<b><font size=+1><i>Thanks, man!!!</i></font></b><br><br>";
   }
}

?><applet name="JUpload" archive="/inc/jar/wjhk.jupload.jar"
code="wjhk.jupload2.JUploadApplet" width="640" height="300"
mayscript alt="Install Java">
<param name="formdata" value="upload_form">
<param name="lookAndFeel" value="system">
<param name="nbFilesPerRequest" value="1">
<param name="postURL" value="upload.php">
<param name="showLogWindow" value="false">
<param name="stringUploadSuccess" value=".*uploaded successfully.*">
You need Java 1.5 or newer.
</applet>

<p>Or use this simpler form:</p>

<form name="upload_form" method="post" action="upload.php" 
enctype="multipart/form-data">
<input type="hidden" name="PHPSESSID" value="<?PHP echo session_id(); ?>">
The file to upload:  <input name="the_file" type="file"><br>
<input type=submit value="Upload file!">
</form>
<?PHP

StandardFooter();
