* Useful for iterating through a table.  Before your "scan" or "do while"
* loop, call "ProgressStart()".  Call "ProgressMeter()" with each iteration
* through your records.  When done call "ProgressStop()".
*
* This limits visual updates to one per second, speeding your program up.
* It also estimates the amount of time left.

function ProgressStart
    public m.ProgressLastUpdate
    public m.ProgressFirstTime
    m.ProgressLastUpdate = int(seconds())
    m.ProgressFirstTime = seconds()
    wait "Working:  " + allt(str(recno())) + "/" + allt(str(reccount())) + "  " + ;
        allt(str(100 * recno() / reccount(), 10, 1)) + "%" window nowait
endfunc

function ProgressMeter
lparam m.recno
    public m.ProgressLastUpdate
    public m.ProgressFirstTime
    local m.mesg, m.timediff
    if m.ProgressLastUpdate == int(seconds())
        return
    endif
    m.ProgressLastUpdate = int(seconds())
    m.timediff = int(((seconds() - ProgressFirstTime) / recno()) * (reccount() - recno()))
    m.mesg = ':' + padl(allt(str(mod(m.timediff, 60))), 2, '0')
    m.timediff = int(m.timediff / 60)
    if (m.timediff >= 60) then
        m.mesg = ':' + padl(allt(str(mod(m.timediff, 60))), 2, '0') + m.mesg
        m.timediff = int(m.timediff / 60)
    endif
    m.mesg = allt(str(m.timediff)) + m.mesg
    if type('m.recno') != 'N'
        m.recno = recno()
    endif
    m.mesg = "Working:  " + allt(str(m.recno)) + "/" + allt(str(reccount())) + "  " + ;
        allt(str(100 * m.recno / reccount(), 10, 1)) + "%  ETA: " + m.mesg

    wait m.mesg window nowait
endfunc


function ProgressStop
    wait clear
endfunc
