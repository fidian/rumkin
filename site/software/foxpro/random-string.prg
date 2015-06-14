* Generate a random string
*
* Sample:
*
* ? RandomString(10)  && 10 letters long, 0-9 and A-Z
* ? RandomString(32, '0123456789ABCDEF')  && 32 long, hexadecimal characters
* ? RandomString(8, '01') && Looks like a byte in binary

function RandomString
parameters m.n, m.letters
    m.q = ""
    if type('m.letters') != 'C' or len(m.letters) == 0
        m.letters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    endif
    do while len(m.q) < m.n
        m.q = m.q + substr(m.letters, int(rand() * len(m.letters)) + 1, 1)
    enddo
    return m.q
endfunc

