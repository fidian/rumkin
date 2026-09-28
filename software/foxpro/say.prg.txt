function Say
lparameters m.Message, m.LogFile
    local m.writeStr, m.logFp

    m.writeStr = '[' + transform(datetime()) + ']  ' + m.Message

    if type('m.LogFile') == 'C'
        m.logFp = fopen(m.LogFile, 12) && Try to open the file
    if m.logFp == -1
        m.logFp = FCreate(m.LogFile) && Try to create it
    else
        fseek(m.logFp, 0, 2) && Go to the end of the file
    endif
    if m.logFp >= 0 && If no error, write to file
        =fputs(m.logFp, m.writeStr)
    endif
    =fclose(m.logFp)
    endif

    ? m.writeStr
endfunc
