* use SOME_TABLE
* if ! TagExists('itemNo')
*     index on itemNo tag itemNo
* fi

* Returns .T. if the named tag exists in the currently open table
function TagExists
lparam m.nam
    local m.i, m.tnam

    m.nam = allt(upper(m.nam))
    m.i = 1
    m.tnam = tag(m.i)
    do while len(m.tnam) > 0
        if (m.nam == m.tnam and m.tnam == m.nam)
            return .T.
        endif
        m.i = m.i + 1
        m.tnam = tag(m.i)
    enddo
    return .F.
endfunc
