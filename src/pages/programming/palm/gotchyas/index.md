---
layout: "@/layouts/default-layout.astro"
title: Palm OS Programming - Gotchyas
breadcrumbs:
    - name: Rumkin.com
      href: /
    - name: Programming Topics
      href: /programming/
    - name: Palm OS Programming
      href: /programming/palm/
---

This is the text extracted from a presentation on Palm OS Programming Gotchyas and Pitfalls.  I don't use Adobe, and I wanted a textual reference instead of printing out slides, so I did this.


Confusing Form Object IDs with Object Index
-------------------------------------------

    pBtn = FrmGetObjectPtr(MainOKButton);

* Most Form Manager routines need the object index
* Compiler can't catch this: both are type `UInt16`
* Typical error messages:
    * Object not found in form
    * Index out of range
* Solution: check API parameters carefully and use `FrmGetObjectIndex()`


Correct ID, Wrong Resource
--------------------------

    pLogo = DmGetResource(bitmapRsc, 10004);

* If `DmGetResource()` can't find a match in the last opened resource database, it continues searching through the resource chain
* Solution
    * Use the Console "opened" command to display the resource chain
    * Don't use resource IDs <= 128 or >= 10000
    * Use `DmGet1Resource()`


Apps Must Use `appl` as Database Type
-------------------------------------

* Runs when you debug, but does not show up in the Launcher
* The Launcher only displays icons for resource databases of type `appl`
* An app built with a different type can run, but must be launched via code
* Set in the PalmRez post-linker panel


Popup Lists
-----------

* Assign the list object ID to the trigger
* Check for `popSelectEvent`
* Override the default behavior of `popSelectEvent` if list items are not defined
    * In resources
    * By using `LstSetListItems()`
* Return true from the event handler


`FrmCopyTitle` & `FrmCopyLabel`
-------------------------------

* These calls copy a string to a buffer
* Buffer size is determined by the size of the label or title defined in resources
* Solution 1: Make the placeholder label/title "big enough" to hold anticipated strings
* Solution 2: Use `FrmSetTitle()` for forms
* Solution 3: Use text fields instead of labels if you need to change them at runtime


Common C/C++ Problems
---------------------

* Learn C before learning Palm OS APIs
* Pointers and data type promotion
* Example

        Char *p;
        StrCopy(p, "Ooops");
        P = MemPtrNew(60 * 1024);


Standard C Libraries vs. Palm OS APIs
-------------------------------------

* Use String and Memory Managers
    * Smaller app footprint
    * Support for multibyte character sets
* However, check API parameters carefully
    * `StrPrintF` is almost the same as `sprintf`
    * `MemSet` parameters are switched compared to `memset`
* Exception handling
    * Use Error Manager instead of C++ exceptions
    * `ErrTry`, `ErrCatch`, etc.


Form Drawing
------------

* Call `FrmDrawForm` before drawing on the form
    * Problems with modal dialogs and the "save behind" bit
    * Debug ROMs will catch this
    * Can use `WinScreenLock` to improve performance
* Beware functions that draw immediately
    * `FldDrawField`, `LstDrawList`, etc.


Form Updating
-------------

* Default `frmUpdateEvent` handling calls `FrmDrawForm()`
    * Erases the form
    * Draws the form border
    * Draws the form objects
    * But not old-style gadgets
* Custom drawing is not updated unless you handle the event yourself
* Use extended gadgets to automate this
* If you do handle `frmUpdateEvent`, return true to
stop the system from handling it after you


Text Fields
-----------

* Don't use `FldGrabFocus()`
    * Use `FrmSetFocus()`
    * Call `FrmSetFocus()` after `FrmDrawForm()`
* Use `PrvSetFieldText()` from the NetSample sample project
    * Does all the right things
    * Avoids all the standard difficulties
    * Supports immediate/delayed update and appending


Database Names and Creator Codes
--------------------------------

* Creator codes should be unique
    * Benefits your customers if unique
    * Automates clean-up of the device when deleting
    * Register the code before coding starts
* Database names must be unique
    * Remember, apps are databases also
    * Use the form "AppName-Code"


Palm OS Data Structure Access
-----------------------------

* Don't access UI data structure fields directly
* Use accessor functions
    * `FrmGetFormId()`, `LstGetSelection()`, etc.
    * New accessors in SDK 4.0 Update 1
* Good way to prepare for Palm OS® Version 5
* Palm OS Emulator reports it (non-fatal error)
* Catch it in the compiler

        #define DO_NOT_ALLOW_ACCESS_TO_INTERNALS_OF_STRUCTS
        #include <PalmOS.h>


Database Searching
------------------

* `DmFindSortPosition()`
    * Design: maintain sort order when adding records
    * Returns the index after any matching records
* When used to find records:
    * If the index > 0, compare the previous record
    * If the record matches, you found the search target
    * If the record does not match, the search target is not in the database


Global Variables
----------------

* Not accessible if the app is not active
    * Find, receive beam, alarms, etc.
* Global data is not always obvious
    * String constants
    * Smart code model intra-segment jumps
    * Access at the end of a long function call chain
* Use `#pragma warn_a5_access on`
* Use the "PC-Relative strings" option


Error Avoidance
---------------

* Require function prototypes
* Turn on all warnings and errors
* Use `DO_NOT_ALLOW_ACCESS_TO_INTERNALS_OF_STRUCTS`
* Use assertions
* Use POSE and debug ROMs


POSE and Debug ROMs
-------------------

* Palm OS Emulator will catch numerous errors
    * Memory leaks, data structure access, stack overflow, low memory access, ...
    * Gremlins and the new minimize feature automate the hunt
* Debug ROMs check for invalid parameters
    * Range checking, forced update events, etc.
* Always use the latest POSE build
* Test using ROMs for the minimum and latest versions of Palm OS


Suggestions
-----------

* Palm OS® Essentials course
    * Lots of lab time
    * Developer instructors
    * Terrific sample applications with source
* Palm OS Recipes
    * Step-by-step solutions to common problems
* Sample code
    * Use the CodeWarrior Find feature, grep, etc.
* Third-party books
