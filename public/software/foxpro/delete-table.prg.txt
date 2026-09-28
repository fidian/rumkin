* Deletes a table, index, and memo files if they exist
* Pass in the BASENAME only, do not pass in ".dbf" on the file name
function DeleteTable
lparameter m.fn
    DeleteFile(m.fn + ".dbf")
    DeleteFile(m.fn + ".cdx")
    DeleteFile(m.fn + ".fpt")
endfunc
