* Sometimes I write code that could close a table in one instance and will
* keep it open in another.  To handle this better, I wrote functions to handle
* tables by name.

* Closes a table if it is open
function CloseTable
lparameter m.Name
    if used(m.Name) then
       use in (m.Name)
    endif
endfunc

* Opens a table (potentially closing one with the same name)
* Opens exclusively if you like
function OpenTable
lparameters m.fn, m.name, m.ex
    CloseTable(m.name)
    if (m.ex) then
        use (m.fn) in 0 alias (m.name) excl
    else
        use (m.fn) in 0 alias (m.name) shar
    endif
endfunc
