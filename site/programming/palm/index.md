---
title: Palm OS Programming
summary: This is the older, Palm OS 3.x style of devices.  Hints, tips and tricks to get your Palm application working more smoothly.
---


When using these tips, know these facts:

* I program in C.  All program code will be in C.
* I use gcc.  That shouldn't be a problem for any of these snippets for you CodeWarrior folk.
* I use Linux, so the shell scripts will be using bash and perl.


Presentations
-------------

* [Palm OS Programming Gotchyas and Pitfalls](gotchyas/) - A slide show converted to text, then to HTML.  Easier to print out this way.  Lots of good ideas and information is summed up.

* [Advanced UI Topics](advanced/) - A great look at thwat's going on inside the palm.  Another slide show that was converted to a web page.


PilRC
-----

If you want to use a scrollbar, the easiest way to get it to be the correct width and height is to put it right after your list, table, or whatever, and refer to the previous top, height, right, etc.  Also, you can see with this example that each row in the table is 11 pixels (on low-res devices, ...uh... "units" on new ones) high.  So if you need 9 rows, make your table 99 high.  This is only with the default font.

    TABLE ID TableID AT (1 18 150 121) ROWS 11 COLUMNS 1 COLUMNWIDTHS 150
    SCROLLBAR ID ScrollID AT (PREVRIGHT+2 PREVTOP-1 7 PREVHEIGHT+2)


C Code
------

To save space, you should go against all of the examples for your form's event loop and return true/false as soon as you know it.  It also speeds up your program a *very* minor amount.  Lastly, 'if' statements are compiled to a smaller amount of code than a switch/case method.

    // Bad example
    Boolean BadFormEventHandler(EventPtr event) {
        Boolean handled = false;
        LocalID id;

        switch (event->eType) {
            case frmOpenEvent:
                // ... insert code here ...
                handled = true;
                break;

            case ctlSelectEvent:
                id = event->data.ctlEnter.controlID;

                if (id == Button1_ID) {
                    // ... insert code here ...
                    handled = true;
                } else if (id == Button2_ID) {
                    // ... insert code here ...
                    handled = true;
                }
        }

        return handled;
    }


    // Good example
    Boolean GoodFormEventHandler(EventPtr event) {
        LocalID id;

        if (event->eType == frmOpenEvent) {
            // ... insert code here ...
            return true;
        }

        if (event->eType == ctlSelectEvent) {
            id = event->data.ctlEnter.controlID;

            if (id == Button1_ID) {
                // ... insert code here ...
                return true;
            }

            if (id == Button2_ID) {
                // ... insert code here ...
                return true;
            }
        }

        return false;
    }

Some people will put an 'else' right after a 'return' statement.  This is silly.  Not only does it create a larger program, but it could cause errors to spring up.  As a general rule of thumb, if you return from an 'if' block, don't use an 'else' block.

    // Bad example
    if (some_thing == what_you_want) {
        // ... insert code here ...
        return true;
    } else {   // 'else' is not needed.
        // ... insert code here ...
        return false;
    }
    // Any code here will never get executed.


    // Good example
    if (some_thing == what_you_want) {
        // ... insert code here ...
        return true;
    }

    // Maybe add a comment here so you know that
    // this is the 'else' portion
    // ... insert code here ...
    return false;

Along the same lines, if you return from the 'else' and not the 'if' section, rewrite it so that the 'else' part is first, then return from the 'if' section.

    // Bad
    if (A < 0.5) {
        // ... insert < 0.5 code here ...
    } else {
        // ... insert >= 0.5 code here ...
        return false;
    }

    // ... more code here ...
    return true;


    // Good
    if (A >= 0.5) {
        // ... insert >= 0.5 code here ...
        return false;
    }

    // ... insert < 0.5 code here ...
    // ... more code here ...
    return true;

When initializing large arrays or structs, you should declare them `static` if they never change.  If you don't, they will be created as dynamic variables, and will possibly not be initialized correctly.  This appears to happen when you hit about 64 bytes.  Therefore, if you have any lookup tables that you just use to reference information, declare them as `static`.

    // Good example of my form loading function
    typedef struct {
        LocalID formID;
        FormEventHandlerType *handler;
    } FormHandlerStruct;

    void FormLoadEvent(EventPtr event) {
        LocalID formID;
        FormPtr form;
        int i;
        static FormHandlerStruct FormToHandler[] = {
            { F_StartScreen, StartScreenEventHandler },
            { F_Preferences, PreferencesEventHandler },
            { F_AnotherForm, AnotherFormEventHandler },
            { F_About, AboutFormEventHandler },
            { 0, NULL }
        };

        formID = event->data.frmLoad.formID;
        form = FrmInitForm(formID);
        FrmSetActiveForm(form);

        for (i = 0; FormToHandler[i].formID != 0; i ++) {
            if (FormToHandler[i].formID == formID) {
                FrmSetEventHandler(form, FormToHandler[i].handler);
                return;
            }
        }

        // If you go this far, you forgot to associate the form handler
        // with the form ID.
    }


Events
------

    0 - nil
    1 - pen down
    2 - pen up
    3 - pen move
    4 - key down
    5 - win enter
    6 - win exit
    7 - ctl enter
    8 - ctl exit
    9 - ctl select
    A - ctl repeat
    B - lst enter
    C - lst select
    D - lst exit
    E - pop select
    F - fld enter
    10 - fld height changed
    11 - fld changed
    12 - tbl enter
    13 - tbl select
    14 - day select
    15 - menu
    16 - app stop
    17 - frm load
    18 - frm open
    19 - frm goto
    1A - frm update
    1B - frm save
    1C - frm close
    1D - frm title enter
    1E - frm title select
    1F - tbl exit
    20 - scl enter
    21 - scl exit
    22 - scl repeat
    23 - tsm confirm
    24 - tsm fep button
    25 - tsm fep mode
    800 - menu cmd bar open
    801 - menu open
    802 - menu close
    803 - frm gadget enter
    804 - frm gatdget misc
    1000 - first i net lib
    1100 - first web lib
    6000 - first user event


Books
-----

Palm OS Programming Bible - Fairly good book.  I like it.  It has tons of examples, and they seem to cover everything.  There are minor things that it misses, such as the fact that you should return true if you have a custom draw function for a popup list and you need to set the trigger's label, but overall it is a good book.  The only downfall is that it is quite expensive.

Palm Programming, The Developer's Guide (O'Reilly) - First off, let me mention that I don't like O'Reilly books.  Not my style.  This book is certainly no exception.  It has typographical errors, poor code, and skips over topics that I want information about.  If I didn't buy this book, I could have spent it on something useful ... like gas money.


Off-Site Links
--------------


[Palm OS Development FAQ](http://flippinbits.com/twiki/bin/view/FAQ/WebHome) - Lots of information about programming for the Palm.  If a subject is already covered there, it certainly won't go into this page.

[PalmOpenSource.com](http://www.palmopensource.com/) - Software that is not only free, but it also lets you download and modify the source code in order to make improvements.  Unfortunately, the site is a bit on the small side and doesn't have loads and loads of software.

[PRC-Tools](http://prc-tools.sourceforge.net/) - Open source, free compiler for making Palm OS programs.  This is the alternative to CodeWarrior, and what I use.  I highly recommend it.

[PilRC](http://www.ardiri.com/index.php?redir=palm&cat=pilrc) - Pilot resource compiler.  If you use PRC-Tools to make programs, you will need pilrc to compile your resources for the program.

[GLib Shared Libraries](http://www.isaac.cs.berkeley.edu/pilot/GLib/GLib.html) - When you want to share code between multiple programs, you should make it into a library.  This web site explains the benefit of making a GLib style shared library.  You make it with gcc and the PRC-Tools package, so you CodeWarrior people are unable to follow this approach.
