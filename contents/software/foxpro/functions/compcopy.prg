* Compressed Copy Routine
*
* Runs gzip on a file on the remote computer
* Saves the output to the local file specified

set proc to l:\tyler\scripts\zlib additive
set proc to l:\tyler\scripts\utils additive

* CompressedCopy('FRIROSQL02', 'username', 'password', 'E:\remote_file.txt', 'C:\local_file.txt')
function CompressedCopy
parameters m.host, m.username, m.passwd, m.remotefile, m.localfile
	m.old_default = 'SET DEFAULT TO "' + sys(5) + sys(2003) + '"'
	DeleteFile('c:\p.exe')
	DeleteFile('c:\g.exe')
	DeleteFile('c:\o.gz')
    copy file \\frirosvr1\mel\tyler\batch\psexec.exe to c:\p.exe
    copy file \\frirosvr1\mel\tyler\batch\gzip.exe to c:\g.exe
    set defa to c:\
	m.exec = '! C:\p \\' + m.host + ' -u ' + m.username + ;
		' -p ' + m.passwd + ' -c -f C:\g -3c ' + ;
		m.remotefile + ' > c:\o.gz'
		* + m.localfile
	if len(m.exec) > 128
		? 'Command is too long to run'
		suspend
	else
		&exec
	endif
	DeleteFile('c:\p.exe')
	DeleteFile('c:\g.exe')
	gunzip('c:\o.gz', m.localfile)
	DeleteFile('c:\o.gz')
	&old_default
endfunc