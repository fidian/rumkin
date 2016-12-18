* Uploads a DBF to the SQL server.

function UploadFile
parameters m.Filename, m.TargetServerConn, m.TargetTable, m.MakeTable, m.TargetDatabase
	local m.nConn
	? "Uploading " + allt(m.Filename)
	wait "Uploading " + allt(m.Filename) nowait window
	m.nConn = sqlconnect(m.TargetServerConn, "", "")
	if m.nConn <= 0 then
		wait "Unable to make connection to database"
		cancel
	endif
	
	if type('m.TargetDatabase') != 'L'
		sqlexec(m.nConn, "use [" + m.TargetDatabase + "]")
	endif

	if (! file(m.Filename)) then
		? "Skipping!  File does not exist."
		sqldisconnect(m.nConn)
		return
	endif
	
	use (m.Filename) in 0 alias sourc shared
	select sourc
	
	if m.MakeTable != .F.
		MakeFoxTable(m.nConn, m.TargetTable)
	endif
	go top
	do while ! eof()
		UploadRecord(m.nConn, m.TargetTable)
		skip
		if mod(recno(), 1000) == 0 then
			wait "Uploading " + allt(m.Filename) + " (" + ;
				allt(str(recno())) + "/" + allt(str(reccount())) + ")" nowait window
		endif
	enddo
	
	use in sourc
	
	sqldisconnect(m.nConn)
	wait clear
endfunc


* Makes a SQL table based on a DBF
function MakeFoxTable
parameters nConn, TargetTable
	set compatible off
	afields(fieldArray)
	Sss = "create table [" + allt(TargetTable) + "] ("
	for i = 1 to fcount()
		if i > 1
			sss = sss + ", "
		endif
		sss = sss + "[" + allt(field(i)) + "] " + ;
			TypeToSQL(fieldArray(i,2), fieldArray(i,3), fieldArray(i,4))
	next
	sss = sss + ")"
	if sqlexec(nConn, sss) < 0 then
		? "Error with SQL query:"
		? sss
		cancel
	endif
	set compatible on
endfunc


* Converts individual DBF types to an equivalent SQL table type
function TypeToSQL
parameters t, w, dd
	if t == "N" or t == "F" then
		if dd > 0 then
			* float
			return "decimal(" + allt(str(w)) + "," + allt(str(dd)) + ")"
		endif
		if w < 3
			return "tinyint"
		endif
		if w < 5
			return "smallint"
		endif
		if w < 9
			return "int"
		endif
		return "bigint"
	endif
	if t == "I" then
		if dd == 1 then
			return "tinyint"
		endif
		if dd == 2
			return "smallint"
		endif
		if dd <= 4
			return "int"
		endif
		if dd <= 8
			return "bigint"
		endif
	endif
	if t == "C" then
		return "char(" + allt(str(w)) + ")"
	endif
	if t == "L" then
		return "bit"
	endif
	if t == "D" then 
		return "datetime"
	endif
	* Just guessing on memo.  Try to not make them too big.
	if t == "M" then
		return "varchar(8000)"
	endif
	return " *********************************** [" + t + " " + allt(str(w)) + "]"
endfunc


* Copies one record into the database
function UploadRecord
parameters nConn, TargetTable
	afields(fieldArray)
	Sss = "insert into [" + allt(TargetTable) + "] values ("
	for i = 1 to fcount()
		if i > 1
			sss = sss + ", "
		endif
		sss = sss +	DataToSQL(field(i), fieldArray(i,2), fieldArray(i,3), fieldArray(i,4))
	next
	sss = sss + ")"
	if sqlexec(nConn, sss) < 0 then
		? "Error uploading record " + allt(str(recno())) + " of " + allt(TargetTable)
		aerror(derr)
		? message()
		suspend
	else
		sss_good_last = sss
	endif
endfunc


* Converts the data into a string for use in an insert statement
* TODO : Tweak types so that they return smaller SQL data structures
function DataToSQL
parameters fieldname, t, w, dd
	if t == "N" or t = "F" then
		if dd > 0 then
			* float
			return allt(str(&fieldname, w, dd))
		else
			* integer
			return allt(str(&fieldname))
		endif
	endif
	if t == "I" then
		return allt(str(&fieldname))
	endif
	if t == "C" or t == "M" then
		return "'" + strtran(allt(chrtran(&fieldname, chr(0), ' ')), "'", "''") + "'"
	endif
	if t == "L" then
		if &fieldname == .T.
			return "1"
		else
			return "0"
		endif
	endif
	if t == "D" then
		if &fieldname < {^1970/01/01} or &fieldname > {^2050/01/01}
			return "NULL"
		else
			chunky = dtos(&fieldname)
			return "'" + substr(chunky, 5, 2) + "/" + right(chunky, 2) + "/" + left(chunky, 4) + "'"
		endif
	endif
	return " *********************************** [" + t + " " + allt(str(w)) + "]"
endfunc
