// Rotate Text

// Algorithm suggested by Mike on the Kryptos mailing list.

// Insert letters (not newlines) into a grid, then rotate the grid 90 degrees
// left or right (left = encode) and read the results back out of the grid.
// encdec = -1 for decode (right) and 1 for encode (left)
// text = text to rotate
// cols = number of columns for the box.  If not a factor of text length,
//   adds 'X' characters
function Rotate(encdec, text, cols)
{
   var t2 = Tr(text, "\r\n");
   
   cols = Math.floor(cols);
   if (cols < 1)
      cols = 1;
   
   while (t2.length % cols)
   {
      text += 'X';
      t2 += 'X';
   }
   
   // Arrange into a grid
   var grid = new Array(cols);
   for (var i = 0; i < cols; i ++)
   {
      grid[i] = '';
   }
   
   for (i = 0; i < t2.length; i ++)
   {
      grid[i % cols] += t2.charAt(i);
   }
   
   t2 = '';
   if (encdec > 0)
   {
      // Rotate left
      for (i = 0; i < cols; i ++)
      {
         t2 += grid[cols - (i + 1)];
      }
   }
   else
   {
      // Rotate right
      for (i = 0; i < cols; i ++)
      {
         t2 += Reverse_String(grid[i]);
      }
   }

   return InsertCRLF(text, t2);
}

document.Rotate_Loaded = 1;
