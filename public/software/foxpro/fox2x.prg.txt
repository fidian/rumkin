* Converts a file from Visual FoxPro to a fox2x / dBase III table
* Do not use it if the table has a memo field!
* Returns .T. on success, .F. on error
function fox2x
lparam m.filename
    local m.hndl, m.bbyte

    m.hndl = fopen(m.filename, 2)
    if m.hndl <= 0
        wait "ERROR:  Could not open file " + allt(m.filename)
        return .F.
    endif
    =fseek(m.hndl, 0, 0)
    m.bbyte = fread(m.hndl, 1)
    if m.bbyte != chr(3)
        =fseek(m.hndl, 0, 0)
        =fwrite(m.hndl, chr(3))
    endif
    =fclose(m.hndl)
    return .T.
endfunc
