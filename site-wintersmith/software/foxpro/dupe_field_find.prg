* Find duplicate fields in a table
*
* use TABLE
* DupeFieldFind()

function DupeFieldFind
    for i = 1 to fcount()
       for j = i + 1 to fcount()
          if field(i) = field(j) then
             ? field(i) + "     # " + alltrim(str(i)) + " and " + alltrim(str(j))
          endif
       next j
    next i
endfunc