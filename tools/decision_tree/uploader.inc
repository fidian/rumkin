<?php

$GLOBALS['TopLink'] = 'Back to the <a href="/tools/sprint/">Phone Uploader</a>.';
$TreeName = 'Phone Uploader Problem Solver';


// The URL to show for the jump page
$UploaderJumpPage = 'rumkin.com/tools/sprint/jump.php';


// The base of the URL for redirecting people to pages in the uploader
$UploaderLinkBase = '/tools/sprint/';


// Generic help message
$HelpMessage = 'If you want further help on this issue, please ' . 'first check the FAQ to make sure your question was not ' . 'already answered.  Next, use the Contact link to create a ' . 'message that describes your problem in detail.  Include ' . 'information about your phone, your provider, and the file ' . 'that you are having problems with.  Describe the type and size ' . 'of the file, and provide a link to it if you can.  Also, ' . 'describe the links you went through in this problem solver ' . 'so I am able to expand this database of information in the ' . 'hopes that others will find an answer.<br><br>' . '<b>DO NOT</b> post a "help" message in the chat box below. ' . 'I do not read those messages, due to the sheer quantity ' . 'received.  ' . '<br><br>Please include this in your email:  ERROR NODE ';


// Generic 'For more help'
$SolvedExtra = '<br><br>If this did not completely solve your ' . 'problem, use the Contact link and write a detailed ' . 'explanation of your problem, what you tried to solve it, ' . 'and any other information you have.  Include as many details ' . 'as possible &ndash; type in more than what you think I will ' . 'need so that I don\'t need to come back and ask you more ' . 'questions in order to start figuring out the problem.';


/* idx => array('problem desc', YesNode#, NoNode#);
 * idx => array('problem desc', array('answer' => Node#, 'answer' => Node#));
 * idx => array('solution'); */
$Tree = array(
	// Intro page
	0 => array(
		'If you are having issues with the phone uploader or ' . 'questions about problems you are experiencing, this ' . 'diagnostic tool should help you find an answer quickly.  ' . 'That is, of course, assuming that I already know about the ' . 'problem.<br><br>' . 'First thing\'s first &ndash; What type of problem are you ' . 'experiencing?',
		array(
			'Unable to upload a file to the web site' => 1,
			'Can not get phone to the jump page' => 2,
			'Problem downloading from web site to phone' => 3,
			'Can not find / use file after it was downloaded' => 4,
			'Other / Not Covered' => 5
		)
	),
	
	
	// Unable to upload a file to the web site
	1 => array(
		'This section will cover various errors that could ' . 'happen when you try to send a file to the phone uploader ' . 'web site.  What statement best describes the problem you had?',
		array(
			'File Type Not Allowed' => 7,
			'File Is Too Large' => 20,
			'Other / Not Listed' => 6
		)
	),
	
	
	// Can not get phone to the jump page
	2 => array(
		'Please select the statement that best fits your ' . 'current scenario.',
		array(
			'How do I go to a web site on my phone?' => 8,
			'I get an error message when I go to the jump page URL' => 9,
			'Other / Not Listed' => 10
		)
	),
	
	
	// Problem downloading from web site to phone
	3 => array(
		'Which one of these scenarios best describes what ' . 'is wong?',
		array(
			'I get a specific error message' => 14,
			'File is downloaded to the wrong folder' => 15,
			'Image is resized incorrectly' => 17,
			'File is the wrong size (in bytes) when downloaded' => 16,
			'Other / Not Listed' => 18
		)
	),
	
	
	// Can not find / use file after it was downloaded
	4 => array(
		'I need to narrow the problem down even further.  Please ' . 'pick what type of issue you are experiencing.',
		array(
			'Can\'t Find File After Download' => 21,
			'File is downloaded to the wrong folder' => 15,
			'My Animated GIF Doesn\'t Work' => 33,
			'Image is resized incorrectly' => 17,
			'Game or Application Does Not Run' => 22,
			'Other / Not Listed' => 19
		)
	),
	
	
	// Other / Not Covered
	5 => array(
		$HelpMessage . '5'
	),
	
	
	// Upload :: Other
	6 => array(
		$HelpMessage . '6'
	),
	
	
	// Upload :: Bad File Type
	7 => array(
		'The phone uploader only allows you to upload specific ' . 'types of files.  For instance, pictures are allowed, but ' . 'executable files are not allowed.  This is because phones only ' . 'support some types of files, and because I don\'t want this ' . 'web site abused by people uploading virus-laden programs.' . '<br><br>' . 'That being said, you can request that I allow file types by ' . 'just emailing me.  ' . 'For more information on the file types that are allowed, ' . 'check out the <a href="' . $UploaderLinkBase . 'formats.php">' . 'File Formats</a> page.' . $SolvedExtra
	),
	
	
	// Jump Page :: How to get there
	8 => array(
		'I can not tell you exactly how to get to the ' . 'phone uploader\'s jump page in order to download your ' . 'file.  This is because the instructions can change with ' . 'each manufacturer, each model of phone, and with different ' . 'firmware/browser versions.  However, I can provide a general ' . 'guideline.' . '<br><br>' . '<ol>' . '<li>Go to your phone\'s web browser.  This is usually ' . 'obtained through your phone\'s menu.' . '<li>Press the menu button' . '<li>Look for Go To URL, Enter URL, Go To ..., or something ' . 'that has a similar wording.' . '<li>Use your keypad to enter in <b>' . $UploaderJumpPage . '</b>' . '<li>Press "Go", "Go To", the Enter button, or something similar ' . 'to visit the jump page.' . '</ol>' . $SolvedExtra
	),
	
	
	// Jump Page :: Error Message
	9 => array(
		'Which error message do you get?  You may get a ' . 'message that is not exactly shown, but may be very similar ' . 'to an option listed.',
		array(
			'Error 403: Forbidden' => 11,
			'Error 404: Not Found' => 12,
			'Other / Not Listed' => 13
		)
	),
	
	
	// Jump Page :: Other / Not Listed
	10 => array(
		$HelpMessage . '10'
	),
	
	
	// Jump Page :: Error :: 403 Forbidden
	11 => array(
		'If you get the <b>Error 403: Forbidden</b> message, or ' . 'something that is similar, it is because the provider has blocked ' . 'this web site from sending content to their phones.  Try another ' . 'phone uploader and hope that the new one works for you.' . $SolvedExtra
	),
	
	
	// Jump Page :: Error :: 404 Not Found
	12 => array(
		'Most likely, this error occured because the jump page ' . 'URL was not entered exactly as shown: <b>' . $UploaderJumpPage . '</b><br><Br>Common causes of problems:' . '<ul>' . '<li>A comma (,) was entered instead of a period (.)' . '<li>A backslash (\\) was used instead of a slash (/)' . '<li>A letter is wrong (n instead of m, 0 instead of o, etc.)' . '</ul>' . $SolvedExtra
	),
	
	
	// Jump Page :: Error :: Other
	13 => array(
		$HelpMessage . '12'
	),
	
	
	// Download :: Error Message
	14 => array(
		'Which error message do you get?  You might get something ' . 'similar to the messages below.  If so, select the closest message.',
		array(
			'Cannot Guarantee The Authenticity Of The File' => 24,
			'A Handler Is Needed To Use This Content Type' => 36,
			'Data Error 406 / Content Not Acceptable' => 25,
			'Data Error 901 / Content Size Too Large' => 26,
			'Data Error 903 / Loss of Service' => 37,
			'Data Error 904 / Size Mismatched' => 27,
			'Data Error 905 / Attribute Mismatch' => 28,
			'Data Error 906 / Invalid Descriptor' => 29,
			'Data Error 907 / Server Error' => 30,
			'Data Error 984 / Size Mismatched' => 31,
			'Error Code 413 / Page Cannot Be Displayed' => 34,
			'Error 500:  Internal Service Error' => 35,
			'No Exact URL' => 32,
			'Server Error 950 / This issue has been reported.  Please try again later.' => 38,
			'Other / Not Listed' => 23
		)
	),
	
	
	// Download / Use :: Wrong Folder
	15 => array(
		'If the file you sent to your phone is placed in the wrong ' . 'folder, it could be caused by several different issues.' . '<ul>' . '<li>If you are uploading a midlet (.jar file), make sure that ' . 'you are specifying the correct folder if you do not want the ' . 'default.' . '<li>If you are uploading a .mp4 file and it is not ending up in ' . 'the "Ringers" folder, try renaming it to .m4a and upload it ' . 'again.' . '<li>You can sometimes use BitPim and a data cable to move files ' . 'around.' . '</ul>' . $SolvedExtra
	),
	
	
	// Download :: Wrong size (bytes)
	16 => array(
		'The most common reason that the file you downloaded ' . 'was not the same size as the file you uploaded is because ' . 'the uploader will resize images to fit your phone\'s screen.  ' . 'This means your phone can hold more images and they are ' . 'transferred to your phone faster.' . '<br><br>' . 'Another factor is that the gateways that some providers employ ' . 'will automatically shrink and reduce image quality for all ' . 'images that pass through them without the special ' . '"no-transform" flag.  Files sent with the uploader have this ' . 'special flag, but other web sites may not have the flag.' . $SolvedExtra
	),
	
	
	// Download / Use :: Image resized incorrectly
	17 => array(
		'If the images are too small, try manually resizing ' . 'the image and then use other uploaders to send the file to your ' . 'phone.  When you figure out the exact screen size, email me ' . 'and I will update the database.' . '<br><br>' . 'Be aware:  There are several different types of "screen sizes" that ' . 'you can find.  You can get the screen size of the external display, ' . 'physical screen size of the internal display, the amount of screen ' . 'that is available for a wallpaper, and the amount of screen ' . 'available for Java midlets (like the SysInfo midlet).  The ' . 'one in particular that I need to know is the maximum size of a ' . 'wallpaper.' . '<br><br>' . 'Sometimes, the maximum dimensions for a wallpaper or screen saver ' . 'is the same as the SysInfo midlet\'s results.  Sometimes the ' . 'wallpaper can fill the area where the "status bar" resides and ' . 'will be larger than what SysInfo reports.' . '<br><br>' . 'When you find the information, or if you need further help, ' . 'email me.'
	),
	
	
	// Download :: Other
	18 => array(
		$HelpMessage . '18'
	),
	
	
	// Use :: Other
	19 => array(
		$HelpMessage . '19'
	),
	
	
	// Upload :: Too Large
	20 => array(
		'The uploader has a limit on the size of a file that you ' . 'can send to your phone.  You can try emailing me and asking if ' . 'I will raise the limit.  Also, you could try some of these options:' . '<ul>' . '<li><b>Images:</b> Shrink the size of the image.  Use a photo ' . 'editor to reduce the size before uploading.' . '<li><b>Ringers:</b> Open the ringer in a sound editor and ' . 'cut it down to about 30 seconds, which is how long you phone ' . 'will ring until it cuts over to voicemail.' . '<li><b>Games / Programs:</b> There\'s really nothing you can ' . 'do to cut the size down.' . '</ul>' . 'If you shrink the size of the file before uploading it to ' . 'this server, it will transfer significantly faster.' . $SolvedExtra
	),
	
	
	// Use :: Can't Find
	21 => array(
		'Unfortunately, every phone is different, and I can\'t ' . 'provide instructions for everyone.  I can say that some phones ' . 'have a "downloads" area where everything goes.  Other phones ' . 'have separate folders for everything.  I have even heard of ' . 'phones that put the ringers in the phone book, images in ' . 'a screen savers menu option, and the Java midlets are stored ' . 'in a completely different third area.' . '<br><br>' . 'If you have searched your phone, you can still check out your ' . 'phone\'s manual.  On some phones, when the file is not ' . 'recognized or if there is a "silent error" (the download ' . 'looked good, but the phone had an error that it didn\'t tell ' . 'you) the file won\'t be saved.  Try resetting your phone by ' . 'pulling out the battery for one second and then putting the ' . 'battery back in.' . $SolvedExtra
	),
	
	
	// Use :: Game/App Does Not Run
	22 => array(
		'When I have tried to get Java midlets running on my ' . 'phone, it sometimes took several tries to even find one that ' . 'worked.  When a game or other type of Java midlet does not ' . 'run on your phone, it is usually for one of these reasons:' . '<ul>' . '<li><b>Java Version:</b> The version of Java on your phone ' . 'is not new enough (or maybe old enough) to run the program.' . '<li><b>Java Extensions:</b> Some phones come with provider-' . 'specific modifications that let you do extra things.  For ' . 'instance, some providers let you retrieve your geographical ' . 'location, turning your phone into a GPS receiver of sorts.' . '<li><b>Screen Size:</b> Some programs are just designed ' . 'for a specific screen size.' . '<li><b>Free Memory:</b> There is not enough "free heap memory" ' . 'to run the program.  You might be able to delete a few things ' . 'on your phone, but you still may not be able to run it even if ' . 'you deleted everything from your phone.' . '<li><b>Corrupt Manifest:</b> The "META-INF/MANIFEST.mf" file is ' . 'missing, malformed, or improperly named.' . '<li><b>Wrong Type Of File:</b> It is possible that what you thought ' . 'was a Java midlet was actually a Java applet or program.  The ' . 'software might not run at all on any phone.' . '</ul>' . 'You are pretty much unable to change these problems.  The best thing ' . 'you can do is to work with the software developer so that ' . 'a version of the program will be created that will work ' . 'on your phone.' . $SolvedExtra
	),
	
	
	// Download :: Error :: Other
	23 => array(
		$HelpMessage . '23'
	),
	
	
	// Download :: Error :: Can't guarantee authenticity
	24 => array(
		'Your phone will say that it can not guarantee the ' . 'authenticity of the file you are about to download.  It is ' . 'a warning that the servers spit out for any file that is not ' . 'downloaded from their server.  Almost all sites that offer ' . 'downloads for free will not be able to afford the licence ' . 'to get rid of that message.  Just press OK and go past it.' . $SolvedExtra
	),
	
	
	// Download :: Error :: Data Error 406 / Content Not Acceptable
	25 => array(
		'You should never get "Data Error 406 / Content Not ' . 'Acceptable" with the uploader.  This error message happens ' . 'when someone links directly to a file when the phone requires ' . 'that a GCD file is used instead.  To fix this, contact the ' . 'webmaster and tell them that your phone needs a GCD file ' . 'to download the ringer, wallpaper, or Java midlet.' . $SolvedExtra
	),
	
	
	// Download :: Error :: Data Error 901 / Content Size Too Large
	26 => array(
		'"Data Error 901 / Content Size Too Large" means that ' . 'the file that you attempted to download is too big for ' . 'your phone.  First, you should try to make the file smaller ' . 'by resizing the image or chopping the ringer down to the 30 ' . 'seconds that you want, downsampling, or remixing it as mono.' . '<br><br>' . 'Typically, phones require extra space to process downloads.  ' . 'If you are downloading a ringer that is 100k, you may need ' . 'up to 300k in order to save it on your phone.' . $SolvedExtra
	),
	
	
	// Download :: Error :: Data Error 904 / Size Mismatched
	27 => array(
		'"Data Error 904 / Size Mismatched" should not happen ' . 'if you are using this uploader.  It only occurs when the file ' . 'that was downloaded does not match the size shown in the GCD ' . 'file.  Since the uploader creates the GCD file based on what ' . 'you sent it, the number should always be correct.' . '<br><br>' . 'Recently, gateway servers for phone companies have started ' . 'resizing images, causing problems for some uploaders, but ' . 'that was fixed with a "no-transform" flag being sent by the ' . 'web server.' . $SolvedExtra
	),
	
	
	/* See also 984
	 * Download :: Error :: Data Error 905 / Attribute Mismatch */
	28 => array(
		'The error message "Data Error 905 / Attribute Mismatch" ' . 'can be caused by several reasons.' . '<ul>' . '<li><b>Too Large:</b> Some phones do not allow uploads over ' . 'a certaion size.  Often, this is about 50k.  You will need to ' . 'shorten your ringer, downsample the quality, or resize the ' . 'image to be smaller in order for your phone to accept it.' . '<li><b>Invalid Image:</b> Phones sometimes don\'t like certain ' . 'types of images.  You may get this error if you have a "progressive ' . 'image".  Try using a photo editor to save it as a non-progressive ' . 'image instead.  You may get this error with animated GIF images, ' . 'which just means that you are unable to use animated GIFs.  ' . 'You may get this error when the JPG image has extra EXIF ' . 'information stored with the picture.  Try to remove that extra ' . 'information before sending it to your phone.' . '<li><b>Bad GCD File:</b> This should not happen with the uploader, ' . 'since all of the GCD files are dynamically generated directly from ' . 'the file.  If the GCD file was created by hand, make sure ' . 'that all of the lines are correct and that there are only LF ' . 'newlines (not CR/LF).' . '<li><b>Midlets:</b> If you created a midlet and are having ' . 'problems sending it to phones, make sure the manifest file only ' . 'contains LF newlines, that the information matches the JAD file ' . 'exactly, and that it is named "META-INF/MANIFEST.mf" (case ' . 'sensitive).' . '<li><b>MIME Types Do Not Match</b> - If you are not using the uploader on rumkin.com, you need to be careful with MIME types.  One user was setting up the uploader on his own machine.  Apache said the MIME type for an MP3 file is audio/mpeg and the generated GCD files said audio/mp3.</ul>' . '<br><br>' . 'The phone uploader will reduce images automatically, convert ' . 'progressive images to non-progressive images, remove the animation ' . 'from an animated GIF, and remove extra EXIF information for you ' . 'as long as it knows what type of phone you have.  If you go ' . 'to the jump page at ' . $UploaderJumpPage . ' and it says the ' . 'type of phone you have, images will be downsized to fit on your ' . 'phone automatically.' . '<br><br>' . 'The phone uploader generates its own JAD and GCD files and makes ' . 'sure that the information is correct.  You shouldn\'t ever get ' . 'this error message due to an poorly-constructed JAD or GCD.' . $SolvedExtra
	),
	
	
	// Download :: Error :: Data Error 906 / Invalid Descriptor
	29 => array(
		'If you are using the phone uploader, you should never ' . 'see "Data Error 906 / Invalid Descriptor" because all GCD and JAD ' . 'files are generated and checked for most errors before they are sent ' . 'out to a phone.  If you do get this error, check out GCD-related ' . 'error messages in the Data Error 905 topic.' . '<br><br>' . 'There is a possibility that if you have a JAR whose manifest file ' . 'does not have a "MIDlet-1" line in it, the JAD that is served ' . 'may also be corrupt.  If you are trying to install a midlet ' . 'and you get the 906 error, this is the first thing that you ' . 'should check.' . $SolvedExtra,
		array(
			'Data Error 905' => 28
		)
	),
	
	
	// Download :: Error :: Data Error 907 / Server Error
	30 => array(
		'This is a very mysterious error that sporatically pops ' . 'up and dissapears.  Known solutions include:' . '<ul>' . '<li>One person said to replace the server name with the IP.  ' . 'This likely got around the gateway\'s cache.' . '<li>Relative URLs are not allowed in GCD or JAD files.' . '<li>If you are uploading a midlet, it needs to have a ' . '"META-INF/MANIFEST.mf" file (case sensitive).' . '<li>If the server returns an error code, such as 404 Not Found, ' . 'the phone will display Data Error 907.' . '<li>If the file is too big for the phone, it may display ' . 'Data Error 907.' . '</ul>' . $SolvedExtra
	),
	
	
	// Download :: Error :: Data Error 984 / Size Mismatched
	31 => array(
		'"Data Error 984 / Size Mismatched" only happens when ' . 'the size in the JAD file does not match the size of the JAR ' . 'file.  This should never happen with the uploader, since the ' . 'size listed in the JAD file is set to the size of the JAR file.' . $SolvedExtra
	),
	
	
	/* See also 904
	 * Download :: Error :: No Exact URL */
	32 => array(
		'The error message "No Exact URL" is caused by ' . 'spaces in the URL.  Either replace the spaces with + symbols, ' . '%20 tokens, or completely remove the spaces and use another ' . 'type of separator.  The uploader here replaces spaces and odd ' . 'characters with an underline (the "_" symbol) so users here ' . 'never need to worry.' . $SolvedExtra
	),
	
	
	// Use :: Animated GIF does not work
	33 => array(
		'There are two distinct issues at work when you say that ' . 'an animated GIF will not work on your phone.' . '<br><br>' . '<u>If the GIF is bigger than your screen size:</u> The image ' . 'will be stripped to just one frame and then resized to fit your ' . 'phone\'s screen.  Animated GIFs that are bigger than your ' . 'screen will never work as an animated GIF.  This is because it ' . 'is pretty hard for me to shrink an animation while keeping it ' . 'animated.  Try to find a smaller animated GIF and see if that ' . 'works before trying to resize the animated GIF to fit your ' . 'screen size.' . '<br><br>' . '<u>If the GIF is the same size or smaller than your screen ' . 'size:</u> The GIF will be sent as-is.  Most phones do not allow ' . 'animated GIFs even if they do display regular GIF files.' . $SolvedExtra
	),
	
	
	// Download :: Error :: Error Code 413 / Page Cannot Be Displayed
	34 => array(
		'The file you are attempting to download may be too ' . 'large.  One user reported that this problem will happen if ' . 'the file is larger than 350k, or so.  The size limit may vary ' . 'with the provider and the model of the phone.  Try to shrink ' . 'the file before sending it to your phone or use smaller files ' . 'if you can find them.' . $SolvedExtra
	),
	
	
	// Download :: Error :: Error 500 / Internal Service Error
	35 => array(
		'I am very sorry, but I do not have a lot of ' . 'information for you.  Currently this has been reported with ' . 'an MP3 going to a Motorola RAZR on the AT&amp;T network.  ' . 'It could be that the provider is blocking my site, the ' . 'song was too large, the song was in the wrong format, ' . 'the phone did not support the bitrate of the mp3, ' . 'or other transient problems.' . $SolvedExtra
	),
	
	
	// Download :: Error :: A Handler Is Needed To Use This Content Type
	36 => array(
		'The short answer is that your phone can not handle ' . 'this particular type of file.  I suggest trying something else.  ' . 'If you tried to get an MP3, maybe a MIDI, WAV or PMD will work ' . 'instead.' . '<br><br>' . 'The long answer is that your phone\'s browser can likely be ' . 'extended with plugins and your phone does not have the plugin ' . 'to work with your MP3 or whatever.  The really bad news is ' . 'that I am not aware of any plugins for any phone browsers.' . $SolvedExtra
	),
	
	
	// Download :: Error :: Loss of Service
	37 => array(
		'Sorry, but this message is caused by your provider.  ' . 'If you were trying to send a large file, such as a .WAV audio ' . 'file, I suggest trying a different format.  Perhaps you could ' . 'try compressing it as .MP3 or .QCP.' . '<br><br>' . 'If that does not solve your problem, then it is the most likely ' . 'that your provider is performing maintenance on their servers ' . 'or perhaps an affiliate is having problems routing your ' . 'content.  There is nothing really that I can do about it.  ' . 'Wait a while, perhaps even a day or two, and then try again.' . $SolvedExtra
	),
	
	
	// Download :: Error :: Server Error 950
	38 => array(
		'Sorry, but this error message is from your provider.  ' . 'I have no idea what could be causing it, nor if it is a ' . 'temporary problem.  I suggest you try again after a few days or try ' . 'a different type of file.' . $SolvedExtra
	),
);
