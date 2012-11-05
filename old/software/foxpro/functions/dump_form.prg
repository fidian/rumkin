close data

m.outputfile = "c:\tempwork\code_for_atl\ediantic.html"
m.formname = 'EDI Anticipation'
m.nl = chr(13) + chr(10)

use "N:\tyler\QBEF01\FORMS\ediantic.scx" in 0 alias db

m.html_top = "<html><head><title>" + m.formname + "</title>" + m.nl + ;
	"<style><!--" + m.nl + ;
	"td { font: 8pt courier }" + m.nl + ;
	"--></style>" + m.nl + ;
	"</head>" + m.nl + ;
	"<body bgcolor=FEFEDE><h1 align=center>" + m.formname + "</h1>" + m.nl + ;
	"<h3>Objects and Methods</h3>" + m.nl + ;
	"<ol>" + m.nl
	
m.html_bot = ""

sele db
scan for ! empty(Methods)
	m.processed = .F.
	? objname
	if Baseclass = "commandbutton"
		m.processed = .T.
		
		m.html_top = m.html_top + "<li>Button:  " + objname
		m.name = GetProperty('Caption')
		if ! empty(m.name)
			m.html_top = m.html_top + " &ndash; Caption:  " + ;
				HtmlSafe(m.name)
		endif
		m.html_top = m.html_top + m.nl
		
		ListMethods()
	endif
	if baseclass = 'form'
		m.processed = .T.
		
		m.html_top = m.html_top + "<li>Form:  " + objname
*		m.name = GetProperty('Caption')
*		if ! empty(m.name)
*			m.html_top = m.html_top + " &ndash; Caption:  " + m.name
*		endif
		m.html_top = m.html_top + m.nl
		
		ListMethods()
	endif
	if type('m.name') = 'L' and m.name = .F.
	    ? "!!!!!!!!!!!!!! unknown class:  " + allt(baseclass)
	endif
endscan
m.html_top = m.html_top + "</ol>" + m.nl

if file(m.outputfile)
	delete file (m.outputfile)
endif
m.fp = fcreate(m.outputfile)
if m.fp < 0
	? "Unable to create output file"
else
	fwrite(m.fp, m.html_top + m.html_bot)
	fclose(m.fp)
endif




func ListMethods
    m.meths = Methods
    m.html_top = m.html_top + "<ol>" + m.nl
    do while len(m.meths) > 0
    	m.idx = at(m.nl + "ENDPROC" + m.nl, m.meths) + 11
    	m.meth_a = left(m.meths, m.idx - 1)
    	m.meths = right(m.meths, len(m.meths) - m.idx + 1)
    	
    	m.procname = substr(m.meth_a, 11, at(m.nl, m.meth_a) - 11)
    	
    	m.html_top = m.html_top + "<li><a href='#" + objname + "." + ;
    		m.procname + "'>" + HtmlSafe(m.procname) + "</a>" + m.nl
    	
	    m.html_bot = m.html_bot + "<hr size=5 width=90%>" + m.nl + ;
	    	"<h3><a name='" + objname + "." + m.procname + ;
	    	"'>" + objname + "." + m.procname + "</a></h3>" + m.nl + ;
	    	"<table border=1 bgcolor=#EFEFFE cellpadding=5 cellspacing=0 " + ;
	    	"width=100%><tr><td>" + ;
	    	HtmlSafeWS(m.meth_a) + "</td></tr></table>" + m.nl
    enddo
    m.html_top = m.html_top + "</ol>" + m.nl
endfunc



func GetProperty
lparam m.what
	m.prop = properties
	do while len(m.prop) > 0
		m.prop_a = left(m.prop, at(chr(13), m.prop) - 1)
		m.prop = right(m.prop, len(m.prop) - at(chr(13), m.prop) - 1)
		if m.prop_a = m.what + " = "
			return right(m.prop_a, len(m.prop_a) - len(m.what) - 3)
		endif
	enddo
	return ""
endfunc


func HtmlSafe
lparam m.st
	m.st = strtran(m.st, "&", "&amp;")
	m.st = strtran(m.st, "<", "&lt;")
	m.st = strtran(m.st, ">", "&gt;")
	return m.st
endfunc


func HtmlSafeWS
lparam m.st
	m.st = HtmlSafe(m.st)
	m.st = strtran(m.st, m.nl, "<br>")
	m.st = strtran(m.st, chr(9), "    ")
	m.st = strtran(m.st, " ", "&nbsp;")
	return m.st
endfunc