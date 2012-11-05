<?php
/* Sprint File Uploader
 * 
 * Copyright (C) 2003-2005 - Tyler Akins
 * Licensed under the GNU GPL software license.
 * See the LEGAL file for legal information
 * See http://rumkin.com/tools/sprint/ for more information about these tools
 * 
 * Provided by Enigma <enigmatl _ enigmatl.com>
 */

?>


<p>M4A is a relatively new compressed audio format from Apple. It is said to be lossless, that is, if you encode it to be so. It is AAC audio contained in an MP4 wrapper. If named with an MP4 extention, it is used for audio and/or video. M4A is for audio only. The industry likes this format because it can be lossless and it can also be rights managed. I.e., you can play your files but I can not unless I also have a license. So, it was a natural choice for Sprint amung other companies to chose this format for it's ringtones both for the improved quality and because they can protect the content from being shared if they chose to in the same way that iTunes does.</p>
<p>Lots of phones don't support M4A files.  So, you can't just upload your M4A
  file to your phone and get it to work.  You're free to try (and good luck to
  you), but support for the format is only available on some phones released 
near the end of 2004 and beyond.</p>
<p>Phones that do not work can give you an error message such as
<?php echo FAQLink('e907', 'Data Error 907') ?>, or they might say that you need
an additional plugin in order to handle that particular MIME type.  As far
as I know, you won't be able to get any additional plugins for you phone.</p>

<p><strong>Suggestions for preparing a clip to be converted </strong></p>
<p>Ringers should never be longer than 30 seconds as they simply will be cut off at that point as the call gets transfered to voice mail and the ringing stops. Unless your phone has stereo sound, you should convert the audio to mono as this will cut the file size in half.  Also, the volume of your clip should be amplified as high as you can amplify it without adding mud or distortion to it. This will get you every decibel you can get out of your cell phone's speaker. And finally, save your clip in Windows PCM (Wav) format. There is no reason to save it as a compressed format like MP3 as it will just introduce a second layer of generation loss that you do not want. </p>
<p><b>Conversion</b></p>

<p>There are two ways to convert a clip to M4A and they are both quite easy.  All 
you will need are some free downloads some of which you may already have.</p>

<p><b>METHOD 1:  iTunes</b>  iTunes is the popular 99-cents-per-track music 
service offered by Apple.  If you don't have iTunes installed, you can find 
it at <a target = "_NEW" href = "http://www.itunes.com">http://www.itunes.com</a>.  
Download and install iTunes.  Once you have it up and running, simply go to 
file/add file to library, and navigate to your clip.  In your library, right-
click on the clip and select "Convert selection to AAC.  It should start 
playing when the conversion is complete.  You can find the file by going to 
your my documents/my music/iTunes folder and it should be somewhere in there 
assuming you didn't change where stored files are placed.  Your file is ready 
to be uploaded and tested.</p>

<p><b>METHOD 2:  dBPowerAmp</b>  dBPowerAmp is a wonderful and powerful shell-
integrated audio conversion utility.  It'll take you 2 or 3 times as long to
get it all set up since you need several downloads.  However, you will then 
convert files with 2-3 times less effort than with iTunes after you are done.  
Go to <a target = "_NEW" href = "http://www.dbpoweramp.com">http://www.dbpoweramp.com</a> and locate and download 
dBPowerAmp Music Converter, and grab the encoder and decoder for AAC and MP4 
which can be found under Apple Lossless Decoding.  Install everything you just 
downloaded (Music Converter first) and then simply right-click on one of the 
clips you want to convert and select Convert.  Unless you said not to at install 
time, a shell extention has been added to allow you to do this.  Once you select 
convert, the first time the program opens, you will need to select the format (FAAC/mp4) 
and give the program the location of the codec you installed.  Also, set the quality 
to around 80.  You may want to play with this setting.  It can make the file smaller 
or larger by increasing or decreasing the quality.  Click convert and in a 
few seconds, you will have an .MP4 file in the same folder as the file you 
are converting unless you tell the program to put the new file in a different 
folder.  Change the MP4 extention to M4A.  Your M4A file is ready to be uploaded 
and tested.
