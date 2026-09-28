* Delete a file if it exists.  Returns 1 if file deleted, 0 if not found
function DeleteFile
lparameter m.fn
    if file(m.fn) then
        delete file (m.fn)
        return 1
    endif
    return 0
endfunc
