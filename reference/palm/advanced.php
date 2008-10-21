<?PHP

include '../../functions.inc';

StandardHeader(array('title' => 'Palm OS Programming - Gotchyas',
		     'topic' => 'palmos'));

?>
	
<p>This is the text, extracted from a presentation for Palm OS Programming
Advanced UI elements.  The gotchyas and pitfalls were skipped because I
already had that in a <a href="gotchyas.php">separate page</a>.
I don't use Adobe and I wanted a textual reference
instead of printing out slides, so I did this.  View the original
information at <a
href="http://www.palmsource.com/about/events/expo/2002/posteurope.html">
PalmSource</a></p>

<hr>

<p>Anatomy of the Stock Event Loop:

<pre>EventType event;
do
{
    EvtGetEvent(&event, evtWaitForever);
    if (! SysHandleEvent(&event))
        if (! MenuHandleEvent(0, &event, &error))
            if (! AppHandleEvent(&event))
                FrmDispatchEvent(&event);
} while (event.eType != appStopEvent);
</pre>

<ul>
<li>FrmDispatchEvent passes the event FIRST to the handler that was 
registered (usually by AppHandleEvent) 
<li>If the event wasn't handled (i.e. the handler returns false) it flows to 
FrmHandleEvent, where it receives default handling
<ul>
<li>Keystrokes flow into fields 
<li>FrmUpdateEvent calls FrmDrawForm()
</ul>
</ul>

<p>Opaque UI Structures

<ul>
<li>Myth:
<ul>
<li>UI structures are documented so you can edit 
their contents.
</ul>
<li>Reality:
<ul>
<li>UI structures are documented to help debugging.
</ul>
</ul>

<p>Usable and Visible

<ul>
<li>Myth:
<ul>
<li>Applications can control which form objects draw 
by setting the "visible" bit.
</ul>
<li>Reality:
<ul>
<li>The "visible" bit is actually state information, not 
something you should be setting.
<li>Use FrmShowObject() and FrmHideObject() 
</ul>
</ul>

<p>Clipboard

<ul>
<li>Myth:
<ul>
<li>The clipboard is just for boring text.
</ul>
<li>Reality:
<ul>
<li>You can put bitmaps on the clipboard, too!<br>
ClipboardAddItem(clipboardBitmap, bitmapP, MemPtrSize(bitmapP));
<li>Text and bitmap clipboards are separate; one doesn't
overwrite the other 
</ul>
</ul>

<p>Custom Fonts

<ul>
<li>Myth:
<ul>
<li>Custom fonts aren.t supported.
</ul>
<li>Reality:
<ul>
<li>Custom fonts ARE supported. We don.t make it 
easy (yet)..
</ul>
</ul>

<p>Creating a Custom Font

<ul>
<li>Fonts are NFNT resources (well, almost) 
<ul>
<li>Slight differences in header 
<li>Glyphs contain space
</ul>
<li>No support in Constructor for creating fonts 
<li>But there are various third-party tools for 
creating and importing fonts
<ul>
<li>xFont 
<li>PilRC 
<li>ResEdit (Macintosh)
</ul>
</ul>

<p>Adding a Font to your Project (PC)
<ul>
<li>Use xFont (freeware) to make a font in PilRC
format. Call it something like "myFont.pfn"
<ul>
<li>Or create font directly in PilRC format - See PilRC Manual for details
</ul>
<li>Install PilRC CodeWarrior plugin<br>
<a href="http://www.calliopeinc.com/pilrcplugin.html">
http://www.calliopeinc.com/pilrcplugin.html</a>
<li>Add a .rcp file to project with this line in it:	 
<ul>
<li>Font 'FONT' FONTID 128 "myFont.pfn"
</ul>
<li>Compile and get a .r file containing a "NFNT"
resource 
<ul>
<li>data 'NFNT' (20052) means Resource ID is 20052
</ul>
</ul>

<p>Installing a Custom Font

<pre>MemHandle fontH; 
FontType* fontP; 
fontH = DmGetResource(fontResource, 25002); 
fontP = (FontType*) MemHandleLock(fontH);
FntDefineFont(fntAppFontCustomBase, fontP); 
MemHandleUnlock(fontH); 
DmReleaseResource(fontH);
</pre>

<ul>
<li>fntAppFontCustomBase is the first ID available 
<ul>
<li>add an offset when defining multiple fonts
</ul>
</ul>

<p>Using a Custom Font

<ul>
<li>WinDrawChars will now use this font
<ul>
<li>if you call FntSetFont(fntAppFontCustomBase)
</ul>
<li>LstGlueSetFont, FrmGlueSetLabelFont, CtlGlueSetFont,
TblSetItemFont can then take fntAppFontCustomBase
to set the list, form, control or table font to the new custom
font
</ul>

<p>High Resolution Font Families 

<pre> LowRes
NFNT 2000  ---->      Constructor
                          or             ---->   Family
  HiRes    ---->  tfnf resource defines         NFNT 4000
NFNT 3000          font family members
</pre>

<ul>
<li>Use only on Palm OS 5 and later
<ul>
<li>Not backwards compatible (check OS version!)
</ul>
<li>DmGetResource('nfnt', myFontFamilyID);
<li>From there use same as "old style" custom font
</ul>

<p>Tables

<ul>
<li>Myth:
<ul>
<li>Tables are Complicated
</ul>
<li>Reality:
<ul>
<li>Tables are Very Complicated
</ul>
</ul>

<p>Do You Really Need a Table?

<ul>
<li>Tables are ideal when:
<ul>
<li>You need UI widgets embedded in a table
<ul>
<li>fields, checkboxes, or anything that accepts input
</ul>
</ul>
<li>Consider alternatives when:
<ul>
<li>You simply want to display data in a multi-column 
format 
<li>You require scrolling
<ul>
<li>Tables have no inherent scrolling functionality!
</ul>
</ul>
</ul>

<p>Alternatives to Tables

<ul>
<li>Lists
<ul>
<li>Can have multiple columns when drawn by callback 
<li>Great when rows can select together
</ul>
<li>Fields + Scrollbar 
<ul>
<li>Great for text-only data 
</ul>
<li>Gadgets 
<ul>
<li>Most flexible, most work 
<li>Get a rectangle that receives hits 
<li>Implement only the functionality you need
</ul>
</ul>

<p>Attention Manager

<ul>
<li>Myth:
<ul>
<li>The Attention Manager is a 4.0 replacement for 
the Alarm Manager.
</ul>
<li>Reality:	 
<ul>
<li>The Attention Manager is a central UI repository 
for attention getting messages from all 
applications.
</ul>
</ul>

<p>Step 1: Call the Attention Manager

<ul>
<li>Often in response to an Alarm or Notification
</ul>

<pre>AttnGetAttention(cardNo, dbID, userData, NULL,
                 kAttlLevelSubtle, kAttnFlagsUseUserSettings, 5, 2);
		 
// Handle the launch code sysAppLaunchCmdAttention

case sysAppLaunchCmdAttention:	 
    HandleAttention((AttnLaunchCodeArgsType*)cmdPBP); 
</pre>

<p>Step 2: Draw the Attention UI

<pre>
switch (cmdPBP->command) 
    case kAttnCommandDrawList:
        // Draw the item in the list
    case kAttnCommandDrawDetail:
        // Draw the detail screen

/// Code to help you out
x = cmdPBP->commandArgsP->drawList.bounds.topLeft.x; 
y = cmdPBP->commandArgsP->drawList.bounds.topLeft.y; 
WinDrawBitmap(iconP, x, y); 
x += kAttnListTextOffset; 
WinDrawChars(theStr, StrLen(theStr), x, y);
</pre>

<p>Step 3: Extras

<ul>
<li>case kAttnCommandPlaySound
<ul>
<li>Chance to play a custom sound 
<li>Sent if requested in AttnGetAttention() call
</ul>
<li>case kAttnCommandCustomEffect
<ul>
<li>Chance to do any other custom effect
</ul>
</ul>

<p>Step 4: Handle User's Choice
<pre>case kAttnCommandGotIt:
    // Selected the OK button
    
case kAttnCommandSnooze:
    // Selected the Snooze button
    
case kAttnCommandGoThere:
    // Selected the Go To button
    AttnForgetIt(cardNo, dbID, cmdPBP->userData);
    buf = (UInt32*) MemPtrNew(sizeof(UInt32)); 
    MemPtrSetOwner(buf, 0); 
    *buf = paramP->userData;
    
    SysUIAppSwitch(cardNo, dbID, 
                   sysAppLaunchCmdCustomBase, buf); 
    // Handle sysAppLaunchCmdCustomBase in PalmMain()
</pre>

<p>Step 5: Update the Attention Manager 

<ul>
<li>AttnForgetIt -- when something in the
attention manager is no longer relevant 
<li>AttnIterate -- Iterates through everything that
belongs to your app and gives your callback a
chance to handle each one
<ul>
<li>Update all attentions 
<li>Erase all attentions
</ul>
<li>AttnUpdate -- Update specific attention
<li>AttnGetCounts -- Use to find out how many
attentions you have pending 
</ul>

<?PHP

StandardFooter();