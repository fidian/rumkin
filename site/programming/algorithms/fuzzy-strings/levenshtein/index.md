---
title: Levenshtein Distance, in Three Flavors
js:
    - levenshtein-module.js
components:
    -
        className: module
        component: Levenshtein
---

by Michael Gilleland, Merriam Park Software

The purpose of this short essay is to describe the Levenshtein distance algorithm and show how it can be implemented in three different programming languages.


What is Levenshtein Distance?
-----------------------------

Levenshtein distance (LD) is a measure of the similarity between two strings, which we will refer to as the source string (s) and the target string (t). The distance is the number of deletions, insertions, or substitutions required to transform s into t. For example,

* If s is "test" and t is "test", then LD(s,t) = 0, because no transformations are needed. The strings are already identical.
* If s is "test" and t is "tent", then LD(s,t) = 1, because one substitution (change "s" to "n") is sufficient to transform s into t.

The greater the Levenshtein distance, the more different the strings are.

Levenshtein distance is named after the Russian scientist Vladimir Levenshtein, who devised the algorithm in 1965. If you can't spell or pronounce Levenshtein, the metric is also sometimes called edit distance.

The Levenshtein distance algorithm has been used in:

* Spell checking
* Speech recognition
* DNA analysis
* Plagiarism detection


Demonstration
-------------

The following simple JavaScript demo allows you to experiment with different strings and compute their Levenshtein distance:

<p class="module"></p>


The Algorithm
-------------

1.  Set n to be the length of s.<br />
    Set m to be the length of t.<br />
    If n = 0, return m and exit.<br />
    If m = 0, return n and exit.<br />
    Construct a matrix containing 0..m rows and 0..n columns.

2.  Initialize the first row to 0..n.<br />
    Initialize the first column to 0..m.

3.  Examine each character of s (i from 1 to n).

4.  Examine each character of t (j from 1 to m).

5.  If s[i] equals t[j], the cost is 0.<br />
    If s[i] doesn't equal t[j], the cost is 1.

6.  Set cell d[i,j] of the matrix equal to the minimum of:<br />
    a. The cell immediately above plus 1: d[i-1,j] + 1.<br />
    b. The cell immediately to the left plus 1: d[i,j-1] + 1.<br />
    c. The cell diagonally above and to the left plus the cost: d[i-1,j-1] + cost.

7.  After the iteration steps (3, 4, 5, 6) are complete, the distance is found in cell d[n,m].


Example
-------

This section shows how the Levenshtein distance is computed when the source string is "GUMBO" and the target string is "GAMBOL".

### Steps 1 and 2

      GUMBO
     012345
    G1
    A2
    M3
    B4
    O5
    L6

### Steps 3 to 6 When i = 1

      GUMBO
     012345
    G10
    A21
    M32
    B43
    O54
    L65

### Steps 3 to 6 When i = 2

      GUMBO
     012345
    G101
    A211
    M322
    B433
    O544
    L655

### Steps 3 to 6 When i = 3

      GUMBO
     012345
    G1012
    A2112
    M3221
    B4332
    O5443
    L6554

### Steps 3 to 6 When i = 4

      GUMBO
     012345
    G10123
    A21123
    M32212
    B43321
    O54432
    L65543

### Steps 3 to 6 When i = 5

      GUMBO
     012345
    G101234
    A211234
    M322123
    B433212
    O544321
    L655432

### Step 7

The distance is in the lower right hand corner of the matrix, i.e. 2. This corresponds to our intuitive realization that "GUMBO" can be transformed into "GAMBOL" by substituting "A" for "U" and adding "L" (one substitution and 1 insertion = 2 changes).


Source Code, in Three Flavors
-----------------------------

Religious wars often flare up whenever engineers discuss differences between programming languages. A typical assertion is Allen Holub's claim in a JavaWorld article (July 1999): "Visual Basic, for example, isn't in the least bit object-oriented.  Neither is Microsoft Foundation Classes (MFC) or most of the other Microsoft technology that claims to be object-oriented."

A salvo from a different direction is Simson Garfinkels's [article](http://www.salon.com/tech/col/garf/2001/01/08/bad_java/index.html) in Salon (Jan. 8, 2001) entitled "Java: Slow, ugly and irrelevant", which opens with the unequivocal words "I hate Java".

We prefer to take a neutral stance in these religious wars. As a practical matter, if a problem can be solved in one programming language, you can usually solve it in another as well. A good programmer is able to move from one language to another with relative ease, and learning a completely new language should not present any major difficulties, either. A programming language is a means to an end, not an end in itself.

As a modest illustration of this principle of neutrality, we present source code which implements the Levenshtein distance algorithm in the following programming languages:

* Java
* C++
* Visual Basic


Java
----

    public class Distance {
      //****************************
      // Get minimum of three values
      //****************************

      private int Minimum (int a, int b, int c) {
        int mi;

        mi = a;

        if (b < mi) {
          mi = b;
        }

        if (c < mi) {
          mi = c;
        }

        return mi;
      }

      //*****************************
      // Compute Levenshtein distance
      //*****************************

      public int LD (String s, String t) {
        int d[][]; // matrix
        int n; // length of s
        int m; // length of t
        int i; // iterates through s
        int j; // iterates through t
        char s_i; // ith character of s
        char t_j; // jth character of t
        int cost; // cost

        // Step 1

        n = s.length ();
        m = t.length ();

        if (n == 0) {
          return m;
        }

        if (m == 0) {
          return n;
        }

        d = new int[n+1][m+1];

        // Step 2

        for (i = 0; i <= n; i++) {
          d[i][0] = i;
        }

        for (j = 0; j <= m; j++) {
          d[0][j] = j;
        }

        // Step 3

        for (i = 1; i <= n; i++) {
          s_i = s.charAt (i - 1);

          // Step 4

          for (j = 1; j <= m; j++) {
            t_j = t.charAt (j - 1);

            // Step 5

            if (s_i == t_j) {
              cost = 0;
            } else {
              cost = 1;
            }

            // Step 6

            d[i][j] = Minimum (d[i-1][j]+1, d[i][j-1]+1, d[i-1][j-1] + cost);
          }
        }

        // Step 7

        return d[n][m];
      }
    }


C++
---

In C++, the size of an array must be a constant, and this code fragment causes an error at compile time:

    int sz = 5;
    int arr[sz];

This limitation makes the following C++ code slightly more complicated than it would be if the matrix could simply be declared as a two-dimensional array, with a size determined at run-time.

Here is the **definition** of the class (distance.h):

    class Distance
    {
      public:
        int LD (char const *s, char const *t);
      private:
        int Minimum (int a, int b, int c);
        int *GetCellPointer (int *pOrigin, int col, int row, int nCols);
        int GetAt (int *pOrigin, int col, int row, int nCols);
        void PutAt (int *pOrigin, int col, int row, int nCols, int x);
    };

Here is the **implementation** of the class (distance.cpp):

    #include "distance.h"
    #include <string.h>
    #include <malloc.h>

    //****************************
    // Get minimum of three values
    //****************************

    int Distance::Minimum (int a, int b, int c)
    {
      int mi;

      mi = a;

      if (b < mi) {
        mi = b;
      }

      if (c < mi) {
        mi = c;
      }

      return mi;
    }

    //**************************************************
    // Get a pointer to the specified cell of the matrix
    //**************************************************

    int *Distance::GetCellPointer (int *pOrigin, int col, int row, int nCols)
    {
      return pOrigin + col + (row * (nCols + 1));
    }

    //*****************************************************
    // Get the contents of the specified cell in the matrix
    //*****************************************************

    int Distance::GetAt (int *pOrigin, int col, int row, int nCols)
    {
      int *pCell;

      pCell = GetCellPointer (pOrigin, col, row, nCols);

      return *pCell;
    }

    //*******************************************************
    // Fill the specified cell in the matrix with the value x
    //*******************************************************

    void Distance::PutAt (int *pOrigin, int col, int row, int nCols, int x)
    {
      int *pCell;

      pCell = GetCellPointer (pOrigin, col, row, nCols);
      *pCell = x;
    }

    //*****************************
    // Compute Levenshtein distance
    //*****************************

    int Distance::LD (char const *s, char const *t)
    {
      int *d; // pointer to matrix
      int n; // length of s
      int m; // length of t
      int i; // iterates through s
      int j; // iterates through t
      char s_i; // ith character of s
      char t_j; // jth character of t
      int cost; // cost
      int result; // result
      int cell; // contents of target cell
      int above; // contents of cell immediately above
      int left; // contents of cell immediately to left
      int diag; // contents of cell immediately above and to left
      int sz; // number of cells in matrix

      // Step 1

      n = strlen (s);
      m = strlen (t);

      if (n == 0) {
        return m;
      }

      if (m == 0) {
        return n;
      }

      sz = (n+1) * (m+1) * sizeof (int);
      d = (int *) malloc (sz);

      // Step 2

      for (i = 0; i <= n; i++) {
        PutAt (d, i, 0, n, i);
      }

      for (j = 0; j <= m; j++) {
        PutAt (d, 0, j, n, j);
      }

      // Step 3

      for (i = 1; i <= n; i++) {
        s_i = s[i-1];

        // Step 4

        for (j = 1; j <= m; j++) {
          t_j = t[j-1];

          // Step 5

          if (s_i == t_j) {
            cost = 0;
          } else {
            cost = 1;
          }

          // Step 6

          above = GetAt (d,i-1,j, n);
          left = GetAt (d,i, j-1, n);
          diag = GetAt (d, i-1,j-1, n);
          cell = Minimum (above + 1, left + 1, diag + cost);
          PutAt (d, i, j, n, cell);
        }
      }

      // Step 7

      result = GetAt (d, n, m, n);
      free (d);
      return result;
    }


Visual Basic
------------

    '*******************************
    '*** Get minimum of three values
    '*******************************

    Private Function Minimum(ByVal a As Integer, _
                             ByVal b As Integer, _
                             ByVal c As Integer) As Integer
      Dim mi As Integer

      mi = a
      If b < mi Then
        mi = b
      End If
      If c < mi Then
        mi = c
      End If

      Minimum = mi

    End Function

    '********************************
    '*** Compute Levenshtein Distance
    '********************************

    Public Function LD(ByVal s As String, ByVal t As String) As Integer
      Dim d() As Integer ' matrix
      Dim m As Integer ' length of t
      Dim n As Integer ' length of s
      Dim i As Integer ' iterates through s
      Dim j As Integer ' iterates through t
      Dim s_i As String ' ith character of s
      Dim t_j As String ' jth character of t
      Dim cost As Integer ' cost

      ' Step 1

      n = Len(s)
      m = Len(t)
      If n = 0 Then
        LD = m
        Exit Function
      End If
      If m = 0 Then
        LD = n
        Exit Function
      End If
      ReDim d(0 To n, 0 To m) As Integer

      ' Step 2

      For i = 0 To n
        d(i, 0) = i
      Next i

      For j = 0 To m
        d(0, j) = j
      Next j

      ' Step 3

      For i = 1 To n
        s_i = Mid$(s, i, 1)

        ' Step 4

        For j = 1 To m
          t_j = Mid$(t, j, 1)

          ' Step 5

          If s_i = t_j Then
            cost = 0
          Else
            cost = 1
          End If

          ' Step 6

          d(i, j) = Minimum(d(i - 1, j) + 1, d(i, j - 1) + 1, d(i - 1, j - 1) + cost)
        Next j
      Next i

      ' Step 7

      LD = d(n, m)
      Erase d
    End Function


References
----------

Other discussions of Levenshtein distance may be found at:

* [http://www.csse.monash.edu.au/~lloyd/tildeAlgDS/Dynamic/Edit.html](http://www.csse.monash.edu.au/~lloyd/tildeAlgDS/Dynamic/Edit.html) (Lloyd Allison)
* [http://www-igm.univ-mlv.fr/~lecroq/seqcomp/node2.html](http://www-igm.univ-mlv.fr/~lecroq/seqcomp/node2.html) (Thierry Lecroq)


Other Flavors
-------------

The following people have kindly consented to make their implementations of the Levenshtein Distance Algorithm in various languages available here:

* Eli Bendersky has written an implementation in [Perl](ldperl.html).
* Barbara Boehmer has written an implementation in [Oracle PL/SQL](ldplsql.html).
* Rick Bourner has written an implementation in [Objective-C](ldobjc.html).
* Joseph Gama has written an implementation in [TSQL](ldtsql.html), as part of a package of TSQL functions.
* Anders Sewerin Johansen has written an implementation in [C++](ldcpp.html), which is more elegant, better optimized, and more in the spirit of C++ than mine.
* Lasse Johansen has written an implementation in [C#](ldcsharp.html).
* Alvaro Jeria Madariaga has written an implementation in [Delphi](lddelphi.html).
* Lorenzo Seidenari has written an implementation in [C](ldc.html).
* Steve Southwell has written an implementation in [Progress 4gl](ldprogress.html).

Other implementations outside these pages include:

* A [Python](http://www.hetland.org/python/distance.py) implementation by Magnus Lie Hetland.
* Lukasz Stilger has written an implementation in [JavaScript](http://www.mgilleland.com/ld/ldjavascript.htm) which illustrates the algorithm in operation (well worth seeing).  Note that "wyraz" is Polish for "word".  A separate page with the source code as text is [here](http://www.mgilleland.com/ld/ldjavascriptsource.htm).
* Jorge Mas Trullenque points out that "the calculation needs O(n) memory, so using a two-dimensional matrix in a practical implementation is wasteful." He has written an implementation in [Perl](http://www.mgilleland.com/ld/ldperl2.htm) that uses only one one-dimensional vector.
* Joerg F. Wittenberger has written an implementation in [Rscheme](http://www.merriampark.com/ldrscheme.htm).
* A [PHP](http://www.php.net/manual/en/function.levenshtein.php) implementation.
