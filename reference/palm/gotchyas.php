<?php

include '../../functions.inc';
StandardHeader(array(
		'title' => 'Palm OS Programming - Gotchyas',
		'topic' => 'palmos'
	));

?>
	
<p>This is the text, extracted from a presentation for Palm OS Programming
Gotchyas and Pitfalls.  I don't use Adobe and I wanted a textual reference
instead of printing out slides, so I did this.  View the original
information at <a
href="http://www.palmsource.com/about/events/expo/2002/postdev_thu.html">
PalmSource</a>, number 106.</p>

<hr>

<p>Confusing Form Object ID with Object Index<br>
pBtn = FrmGetObjectPtr(MainOKButton);

<ul>
<li>Most Form Manager routines need object index 
<li>Compiler can't catch: both are type UInt16 
<li>Typical error messages:
<ul>
<li>Object not found in form 
<li>Index out of range
</ul>
<li>Solution: check API parameters carefully and use FrmGetObjectIndex()
</ul>

<p>Correct ID, Wrong Resource<br>
pLogo = DmGetResource(bitmapRsc, 10004);

<ul>
<li>If DmGetResource() can't find match in the last opened resource 
database, continues search through resource chain
<li>Solution
<ul>
<li> Use Console opened command to display theresource chain 
<li> Don't use resource IDs <= 128 or >= 10000
<li> Use DmGet1Resource()
</ul>
</ul>

<p>Apps Must Use <tt>appl</tt> as Database Type

<ul>
<li>Runs when you debug, but does not show up in Launcher
<li>Launcher only displays icons for resource databases of type </tt>appl</tt>
<li>App built with a different type can run, but must be launched via code
<li>Set in PalmRez post linker panel
</ul>

<p>Popup Lists

<ul>
<li>Assign list object ID to trigger
<li>Check for popSelectEvent 
<li>Override default behavior of popSelectEvent if
list items are not defined 
<ul>
<li>In resources 
<li>By using LstSetListItems()
</ul>
<li>Return true from event handler
</ul>

<p>FrmCopyTitle & FrmCopyLabel

<ul>
<li>These calls copy a string to a buffer 
<li>Buffer size is determined by size of label or title defined in resources
<li>Solution 1: Make placeholder label/title "big enough" to hold anticipated
strings
<li>Solution 2: Use FrmSetTitle() for forms 
<li>Solution 3: Use text fields instead of labels if you need to change at
runtime
</ul>

<p>Common C/C++ Problems

<ul>
<li>Learn C before learning Palm OS APIs 
<li>Pointers and data type promotion 
<li>Example
<ul>
<li>Char *p;<br>
StrCopy(p, "Ooops");<br>
P = MemPtrNew(60 * 1024);<br>
</ul>
</ul>

<p>Standard C Libraries vs. Palm OS APIs

<ul>
<li>Use String and Memory Managers
<ul>
<li>Smaller app footprint 
<li>Support for multibyte character sets
</ul>
<li>However, check API parameters carefully
<ul>
<li>StrPrintF is almost the same as sprintf 
<li>MemSet parameters switched from memset
</ul>
<li>Exception handling
<ul>
<li>Use Error Manager instead of C++ exceptions
<li>ErrTry, ErrCatch, etc.
</ul>
</ul>

<p>Form Drawing

<ul>
<li>Call FrmDrawForm before drawing on form
<ul>
<li>Problems with modal dialogs and "save behind" bit
<li>Debug ROMs will catch 
<li>Can use WinScreenLock to improve performance
</ul>
<li>Beware functions that draw immediately
<ul>
<li>FldDrawField, LstDrawList, etc.
</ul>
</ul>

<p>Form Updating

<ul>
<li>Default frmUpdateEvent calls FrmDrawForm() 
<ul>
<li>Erases form 
<li>Draws form border 
<li>Draws form objects 
<li>But not old-style gadgets 
</ul>
<li>Custom drawing not updated unless you handle the event yourself
<li>Use extended gadgets to automate 
<li>If you do handle frmUpdateEvent return true to
stop system from handling it after you 
</ul>

<p>Text Fields

<ul>
<li>Don't use FldGrabFocus() 
<ul>
<li>Use FrmSetFocus() 
<li>Call FrmSetFocus() after FrmDrawForm()
</ul>
<li>Use PrvSetFieldText() from NetSample sample project
<ul>
<li>Does all the right things 
<li>Avoids all the standard difficulties 
<li>Supports immediate/delayed update and appending
</ul></ul>

<p>Database Names and Creator Codes 

<ul>
<li>Creator codes should be unique 
<ul>
<li>Benefits your customers if unique
<li>Automates clean-up of device when deleting 
<li>Register code before coding starts 
<li><a href="http://www.palmos.com/dev">www.palmos.com/dev</a> web form
</ul>
<li>Database names must be unique
<ul>
<li>Remember, apps are databases also 
<li>Use form "AppName-Code"
</ul>
</ul>

<p>Palm OS Data Structure Access

<ul>
<li>Don't access UI data structure fields directly 
<li>Use accessor functions
<ul>
<li>FrmGetFormId(), LstGetSelection(), etc. 
<li>New accessors in SDK 4.0 Update 1
</ul>
<li>Good way to prepare for Palm OS® Version 5 
<li>Palm OS Emulator reports (non-fatal error) 
<li>Catch in compiler
<ul>
<li>#define DO_NOT_ALLOW_ACCESS_TO_INTERNALS_OF_STRUCTS<br>
#include &lt;PalmOS.h&gt;
</ul>
</ul>

<p>Database Searching
<ul>
<li>DmFindSortPosition()
<ul>
<li>Design: maintain sort order when adding records 
<li>Returns index after any matching records 
</ul>
<li>When used to find records:
<ul>
<li>If index > 0, compare previous record 
<li>If record matches, you found search target 
<li>If record does not match, search target is not in database
</ul>
</ul>

<p>Global Variables

<ul>
<li>Not accessible if app is not active
<ul>
<li>Find, receive beam, alarms, etc.
</ul>
<li>Global data not always obvious
<ul>
<li>String constants 
<li>Smart code model intra-segment jumps 
<li>Access at end of long function call chain
</ul>
<li>Use #pragma warn_a5_access on 
<li>Use "PC-Relative strings" options
</ul>

<p>Error Avoidance

<ul>
<li>Require function prototypes 
<li>Turn on all warnings and errors 
<li>Use DO_NOT_ALLOW_ACCESS_TO_INTERNALS_OF_STRUCTS 
<li>Use assertions 
<li>Use POSE and debug ROMs
</ul>

<p>POSE and Debug ROMs

<ul>
<li>Palm OS Emulator will catch numerous errors
<ul>
<li>Memory leaks, data structure access, stacko verflow, low memory access,
...
<li>Gremlins and new minimize feature automate the 
hunt
</ul>
<li>Debug ROMs check for invalid parameters
<ul>
<li>Range checking, forced update events, etc.
</ul>
<li>Always use the latest POSE build 
<li>Test using ROMs for minimum and latest versions of Palm OS
</ul>

<p>Suggestions 

<ul>
<li>Palm OS&reg; Essentials course 
<ul>
<li>Lots of lab time 
<li>Developer instructors 
<li>Terrific sample applications with source
</ul>
<li>Palm OS Recipes
<ul>
<li>Step-by-step solutions to common problems 
<li>Under Documentation link on <a
href="http://www.palmos.com/dev">www.palmos.com/dev</a>
</ul>
<li>Sample code
<ul>
<li>Use CodeWarrior Find feature, grep, etc.
</ul>
<li>Third-party books
</ul>

<?php

StandardFooter();
