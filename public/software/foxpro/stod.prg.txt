* The opposite of dtos(m.date) or dtoc(m.date, 1)
function stod
lparam m.c
    local m.d, m.m, m.y

    m.c = allt(m.c)
    if type('m.c') != 'C' or len(m.c) != 8
        return {//}
    endif

    m.d = val(right(m.c, 2))
    m.m = val(substr(m.c, 5, 2))
    m.y = val(left(m.c, 4))
    if m.d < 1 or m.m < 1 or m.y < 100
        return {//}
    endif

    return date(m.y, m.m, m.d)
endfunc
