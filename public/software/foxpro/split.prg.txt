* Replicates a split() or explode() function in other languages.
*
* First, declare an array
*     dimension m.arr(1)
*
* Next split a string on spaces
*     split(' ', 'Break this up into individual words.', @m.arr)

function Split
lparam m.delim, m.str, m.arr
    local m.i, m.c, m.pos

    * Count the delimeters in the string to make the array the right size
    m.c = 1
    do while at(m.delim, m.str, m.c) != 0
        m.c = m.c + 1
    enddo

    dimension m.arr(m.c)

    for m.i = 1 to m.c
        m.pos = at(m.delim, m.str)
        if m.pos == 0
            m.pos = len(m.str) + 1
        endif
        m.arr(m.i) = substr(m.str, 1, m.pos - 1)
        m.str = substr(m.str, m.pos + len(m.delim), len(m.str))
    next

    return m.arr
endfunc

