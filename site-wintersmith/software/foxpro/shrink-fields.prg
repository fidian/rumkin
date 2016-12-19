* Reduces character fields in the currently open database to the smallest that
* they can be reduced to without losing data.
*
* Could be expanded to work with other types of data, such as numeric fields

m.oldfullpath = 'SET FULLPATH ' + set('FULLPATH')
set fullpath on
m.dbname = dbf()
m.aliasname = alias()

afields(af)

m.s = 'use in ' + m.aliasname
&s

use (m.dbname) in 0 alias shrinkdb excl

m.sql = 'select '
m.comma = ''
for i = 1 to alen(af, 1)
	m.c = af(i,2)
	do case
	   case m.c == "C"
	      m.sql = m.sql + m.comma + 'max(len(rtrim(' + af(i,1) + '))) as ' + af(i,1)
	      m.comma = ', '
	   otherwise
	      * do something?  Handle numerics?
	endcase
next

m.sql = m.sql + ' from shrinkdb into cursor shrinkx'
&sql
sele shrinkx

for i = 1 to alen(af, 1)
   m.c = af(i,2)
   do case
      case m.c == "C"
         m.s = 'm.maximum = shrinkx.' + m.af(i,1)
         &s
         if m.maximum == 0
            m.maximum = 1
         endif
         if m.maximum < m.af(i,3) and m.maximum > 0 then
         	? '[' + af(i,1) + '] shrinking ' + af(i,1) + ;
         		':  c(' + allt(str(af(i,3))) + ;
         		') -> c(' + allt(str(m.maximum)) + ')'
         	m.s = 'alter table shrinkdb alter column ' + af(i,1) + ' c(' + ;
         	   allt(str(m.maximum)) + ')'
         	&s
         endif
      otherwise
         * do something?
   endcase
next

use in shrinkx
use in shrinkdb

m.s = 'use "' + m.dbname + '" in 0 alias ' + m.aliasname
&s
m.s = 'sele ' + m.aliasname
&s