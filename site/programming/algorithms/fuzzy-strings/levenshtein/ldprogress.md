---
title: Levenshtein Distance Algorithm: Progress 4gl Implementation
---

by Steve Southwell

    DEFINE TEMP-TABLE matrix NO-UNDO
     FIELD X AS INTEGER
     FIELD Y AS INTEGER
     FIELD pointvalue AS INTEGER
     INDEX xy IS PRIMARY UNIQUE X Y.


    FUNCTION lscore RETURNS INTEGER
      ( INPUT myfirst AS CHAR,
        INPUT mysecond AS CHAR ) :
    /*------------------------------------------------------------------------------
      Purpose:  Computes Levenshtein distance between two strings
        Notes:  See http://www.merriampark.com/ld.htm for a description of this
                algorithm in further detail
    ------------------------------------------------------------------------------*/
      DEFINE VAR myscore AS INTEGER NO-UNDO.
      DEFINE VAR m AS INTEGER NO-UNDO.
      DEFINE VAR n AS INTEGER NO-UNDO.
      DEFINE VAR i AS INTEGER NO-UNDO.
      DEFINE VAR j AS INTEGER NO-UNDO.
      DEFINE VAR s AS CHARACTER NO-UNDO.
      DEFINE VAR t AS CHARACTER NO-UNDO.

      DEFINE BUFFER leftcell FOR matrix.
      DEFINE BUFFER abovecell FOR matrix.
      DEFINE BUFFER diagcell FOR matrix.

      ASSIGN
       s = mysecond
       t = myfirst
      .

      ASSIGN
       m = LENGTH(t,"CHARACTER")
       n = LENGTH(s,"CHARACTER")
      .

      /* if both empty, return 0 */
      IF m + n = 0 THEN RETURN 0.

       /* Initialize our matrix */
      EMPTY TEMP-TABLE matrix.

      DO i = 0 TO n:
        CREATE matrix.
        ASSIGN
         matrix.X = i
         matrix.Y = 0
         matrix.pointvalue = i
        .
      END.
      DO j = 1 TO m:
        CREATE matrix.
        ASSIGN
         matrix.X = 0
         matrix.Y = j
         matrix.pointvalue = j
        .
      END.

      DO i = 1 TO N:
        DO j = 1 TO m:
            CREATE matrix.
            ASSIGN
             matrix.X = i
             matrix.Y = j
            .
            IF SUBSTRING(s,i,1,"CHARACTER") = SUBSTRING(t,j,1,"CHARACTER") THEN
             ASSIGN matrix.pointvalue = 0.
            ELSE matrix.pointvalue = 1.

            FIND leftcell WHERE leftcell.X = i - 1 AND leftcell.Y = j.
            FIND abovecell WHERE abovecell.Y = j - 1 AND abovecell.X = i.
            FIND diagcell WHERE diagcell.X = i - 1 AND diagcell.Y = j - 1.

            ASSIGN matrix.pointvalue = MIN(abovecell.pointvalue + 1,
                                           leftcell.pointvalue + 1,
                                           diagcell.pointvalue + matrix.pointvalue).

        END.
      END.


      RETURN matrix.pointvalue.
    END FUNCTION.
