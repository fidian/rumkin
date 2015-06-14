* Writes an "index on" statement to the clipboard
*
* use THE_TABLE
* ListIndexes()

* Displays a list of "index on ..." statements that were used
* to build all of the indexes on the current table.  Also copies
* them to the clipboard so you can paste them into whatever you like.
function ListIndexes
    m.taglist = ""
    for i = 1 to tagcount()
        m.singletag = "index on " + sys(14, i) + " tag " + tag(i)
        m.taglist = m.taglist + m.singletag + chr(13) + chr(10)
    next
    ? m.taglist
    _CLIPTEXT = m.taglist
    ? "Index dump done - copied to clipboard"
endfunc
