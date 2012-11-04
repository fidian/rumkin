// Java Puzzle Applet
// 
// Copyright (C) 1997, 2001 - Tyler Akins
// Licensed under the GNU GPL software license.
// 
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// A copy of the GNU General Public License can be obtained at
// http://www.gnu.org/licenses/gpl.html or you can write to
//    Free Software Foundation, Inc.
//    59 Temple Place - Suite 330
//    Boston, MA  02111-1307, USA.
//
//
// TODO:
// Option for different selection of pieces
//  * highlight (current and default)
//  * invert piece
//
//  [ Import ]
//
// I know that I don't need to include all of these, but it makes
// virtually no difference in compile time and no change in compiled
// size.  Some day I may spend an hour to get these down to just what
// I use.
import java.awt.*;
import java.awt.image.*;
import java.applet.*;
import java.util.*;
import java.net.*;
import java.lang.*;
import java.awt.event.*;


// [ Puzzle class definition ] {{{
//
public class puzzle extends Applet implements Runnable, MouseListener
{
   // [ Global variables ]
   //
   // I wish I didn't have to use any, but my code would look much worse than
   // it already does, and it looks bad enough now.
   //
   Thread killme = null;               // No clue
   int ERROR = 0;                      // Is there an error or not?
   int totalpieces;                    // Total pieces
   int imagearray[][];                 // Which image goes where
   int HighlightPiece = -1;            // Which image gets a border
   int Moves;                          // Number of moves taken so far
   int TOP_MARGIN = 20;                // Area for status display
   AudioClip DoneSound;                // Noise when you finish
   String Version = new String("v 4.4");  // Version number
   Dimension r;                        // Size of applet
   FontMetrics fm;                     // Font size and stuff
   Image imageset[];                   // Where to store bits of the puzzle
   int PuzzleType;                     // Which puzzle to play
   int PaintScreen;                    // Status Screens
   int FinishShown;                    // Was final URL shown?
   int piecewidth;                     // Width of each piece
   int pieceheight;                    // Height of each piece
   int piecesx;                        // Number of pieces horizontally
   int piecesy;                        // Number of pieces vertically
   int RepaintCell1 = -1;              // Which cells to repaint when painting
   int RepaintCell2 = -1;
   int ShowX = 0;
   int RevealWidth = 0;                // Width of the Reveal button
   int RevealXPos = 0;                 // Where the Reveal button starts
   int MixWidth = 0;                   // Width of the Mix button
   int MixXPos = 0;                    // Where the Mix button starts
   int Bar_Positions = -1;             // Which buttons go where
   Random random = new Random();       // Random number generator
   int DrawXMethod;                    // How should the X's be shown on the pieces?
   

   // [ Error (String s) ] {{{
   //
   // Generic error function.  Displays error to Java Console and to status bar.
   //
   public void Error(String s)
     {
        System.out.println(s);
        System.out.println("For information on this error, go to the above URL.");
        showStatus("Error:  " + s);
	ERROR = 1;
	System.exit(1);
     }
   // }}}

   
   // [ integerFromString (String s) ] {{{
   //
   // Returns the integer value of s, or else 0 if s is null or not a string
   // of just an integer.
   //
   public int integerFromString(String s)
     {
        if (s == null)
          {
             return 0;
          }
        try 
          {
             Integer i = Integer.valueOf(s, 10);
             return i.intValue();
          } 
        catch (NumberFormatException e) 
          {
             return 0;
          }
     }
   // }}}


   // [ GetPieceX (int i) ] {{{
   //
   // Returns the X value in a two dimentional array of a single reference
   // number.
   //
   public int GetPieceX(int i) 
     {
        return i - ((i / piecesx) * piecesx);
     }
   // }}}


   // [ GetPieceY (int i) ] {{{
   //
   // Returns the Y value in a two dimentional array of a single reference
   // number.
   //
   public int GetPieceY(int i)
     {
        return i / piecesx;
     }
   // }}}


   // [ GetPieceNum (int x, int y) ] {{{
   //
   // Returns a single reference number to a two dimentional array location.
   //
   public int GetPieceNum(int x, int y)
     {
        if (x < 0 || x >= piecesx || y < 0 || y >= piecesy)
          return -1;

        return y * piecesx + x;
     }
   // }}}


   // [ NumberCorrect () ] {{{
   //
   // Returns the number of correct pieces in the puzzle.
   //
   public int NumberCorrect()
     {
        int i;
        int tally;
        
        tally = 0;
        for (i = 0; i < totalpieces; i++)
          {
             if (imagearray[GetPieceY(i)][GetPieceX(i)] == i)
               {
                  tally ++;
               }
          }

        return tally;
     }
   // }}}


   // [ SwapPieces(int From, int To) ] {{{
   //
   // Switches two pieces in the image array.
   //
   public void SwapPieces(int From, int To)
     {
        int Temp;
        int FromX, FromY, ToX, ToY;
        
        FromX = GetPieceX(From);
        FromY = GetPieceY(From);
        ToX = GetPieceX(To);
        ToY = GetPieceY(To);
        
        Temp = imagearray[FromY][FromX];
        imagearray[FromY][FromX] = imagearray[ToY][ToX];
        imagearray[ToY][ToX] = Temp;
     }
   // }}}


   // [ Shuffle(int zZ) ] {{{
   //
   // Slides tiles around until there are no tiles in the correct spots anymore.
   //
   public int Shuffle(int zZ)
     {
        int newX;
        int newY;
        int dir;
        int xX = GetPieceX(zZ);
        int yY = GetPieceY(zZ);
        
        // Check for impossible shuffling
        if (totalpieces < 2)
          return zZ;
        
        while (NumberCorrect() != 0)
          {
             dir = random.nextInt();
	     if (dir < 0)
	       dir *= -1;
             dir = dir % 4;
             newX = xX;
             newY = yY;
             
             if (dir == 0)
               newY = newY - 1;
             else if (dir == 1)
               newX = newX + 1;
             else if (dir == 2)
               newY = newY + 1;
             else
               newX = newX - 1;
             
             if (GetPieceNum(newX, newY) != -1)
               {
                  SwapPieces(GetPieceNum(newX, newY), GetPieceNum(xX, yY));
                  xX = newX;
                  yY = newY;
               }
          }
        
        return GetPieceNum(xX, yY);
     }
   // }}}


   // [ MixUpPuzzle () ] {{{
   //
   // Randomizes the puzzle.  Used when someone clicks on the mix button, or
   // when initializing the puzzle.  Also initializes a few other variables
   // which need to be initialized every time the puzzle gets played.
   //
   public void MixUpPuzzle()
     {
        int From;
        int To;
        int i;
        
        imagearray = new int[piecesy][piecesx];
        Moves = 0;
        FinishShown = 0;
        
        for (i = 0; i < totalpieces; i++)
          {
             imagearray[GetPieceY(i)][GetPieceX(i)] = i;
          }
        
        if (PuzzleType == 0) // swap puzzle
          {
             while (NumberCorrect() != 0)
               {
                  From = random.nextInt() % totalpieces;
                  To = random.nextInt() % totalpieces;
                  if (From < 0) From *= -1;
                  if (To < 0) To *= -1;
                  
                  SwapPieces(From, To);
               }
             HighlightPiece = -1;
          }
        else // slide puzzle
          {
             int Pos = Shuffle(totalpieces - 1);
             
             if (PuzzleType == 2)
               {
                  int newPos;
                  
                  // This may leave some pieces in the correct spots, but you will
                  // still have to move them around to solve the puzzle.  I believe
                  // that possibly having up to (picesX + picesY - 1) pieces correct
                  // in a puzzle consisting of (piecesX * piecesY) pieces to be a
                  // trivial thing.  At the very worst, you will have the entire top
                  // row and right column in their correct places.  The odds of this
                  // happening are extremely remote, and the odds decrease when the
                  // number of pieces increases.  Also, not having this in a while
                  // loop (with shuffling the pieces again and relocating the
                  // "empty" tile to the lower right corner again every loop may
                  // help to prevent infinite loops.  In other words, this is a
                  // fast and easy method, while guaranteeing that the puzzle is 
                  // solvable.
                  // 
                  while (GetPieceX(Pos) != piecesx - 1)
                    {
                       newPos = GetPieceNum(GetPieceX(Pos) + 1, GetPieceY(Pos));
                       SwapPieces(Pos, newPos);
                       Pos = newPos;
                    }
                  
                  while (GetPieceY(Pos) != piecesy - 1)
                    {
                       newPos = GetPieceNum(GetPieceX(Pos), GetPieceY(Pos) + 1);
                       SwapPieces(Pos, newPos);
                       Pos = newPos;
                    }
               }
             HighlightPiece = Pos;
          }
     }
   // }}}

   
   // [ init () ] {{{
   //
   // The second meanest function in here.  Ran once per puzzle initialization.
   //
   public void init()
     {
        int i;
        
        //
        // Print out a system header to the console
        //
        System.out.println("Puzzle - " + Version + " by Tyler Akins.");
        System.out.println("Email:  puzzle@rumkin.com");
        System.out.println("Web:  http://rumkin.com/projects/puzzle/");
        System.out.println("Applet is free to be used by anyone, " + 
                           "as long as it stays free.");
        
	
        //
        // Calculate the number of pieces
        //
        totalpieces = integerFromString(getParameter("NUM"));
        piecesx = integerFromString(getParameter("NUMX"));
        piecesy = integerFromString(getParameter("NUMY"));
        i = 0;
        if (totalpieces < 1) i++;
        if (piecesx < 1) i++;
        if (piecesy < 1) i++;
        if (i > 1) 
          Error("Number of pieces not correctly specified.");
        else
          {
             if (totalpieces < 1)
               totalpieces = piecesx * piecesy;
             else if (piecesx < 1)
               piecesx = totalpieces / piecesy;
             else if (piecesy < 1)
               piecesy = totalpieces / piecesx;
             
             if (totalpieces != piecesx * piecesy)
               Error("total pieces != pieces across * pieces down");
          }
        
        //
        // While we are at it, we need some data defined so we can write to
        // the screen something for the user to read so the user doesn't
        // think we are just doing nothing.
        //
        r = getSize();
        PaintScreen = 0;
        PuzzleType = integerFromString(getParameter("TYPE"));
        if (PuzzleType > 2 || PuzzleType < 0)
          PuzzleType = 0;

	DrawXMethod = integerFromString(getParameter("XSTYLE"));
	if (getParameter("XSTYLE") == "null" ||
	    getParameter("XSTYLE") == null)
	  DrawXMethod = 0;

        //
        // If there is no status bar, remove all padding for it!
        //
        if (integerFromString(getParameter("BAR")) == 0 &&
            getParameter("BAR") != null &&
            getParameter("BAR") != "null")
          {
             TOP_MARGIN = 0;
          }
     }
   // }}}
   
   
   // [ CreateXPolygon (int X, int Y, int width, int height, int thickness) ] {{{
   // 
   // Creates a polygon X for covering images
   // Doesn't optimize polygon if thickness is 0 or 1.
   // 
   public Polygon CreateXPolygon(int X, int Y, int width, int height, int thickness)
     {
	Polygon p = new Polygon();
	
	// Upper left
	p.addPoint(X, Y + thickness);
	p.addPoint(X, Y);
	p.addPoint(X + thickness, Y);
	
	// Center top
	p.addPoint(X + (width / 2), Y + (height / 2) - thickness);
	
	// Upper right
	p.addPoint(X + width - thickness, Y);
	p.addPoint(X + width, Y);
	p.addPoint(X + width, Y + thickness);
	
	// Center right
	p.addPoint(X + (width / 2) + thickness, Y + (height / 2));
	
	// Lower right
	p.addPoint(X + width, Y + height - thickness);
	p.addPoint(X + width, Y + height);
	p.addPoint(X + width - thickness, Y + height);
	
	// Center bottom
	p.addPoint(X + (width / 2), Y + (height / 2) + thickness);
	
	// Lower left
	p.addPoint(X + thickness, Y + height);
	p.addPoint(X, Y + height);
	p.addPoint(X, Y + height - thickness);
	
	// Center left
	p.addPoint(X + (width / 2) - thickness, Y + (height / 2));

        return p;
     }
   // }}}
   

   // [ DrawXOnPiece (int xpos, int ypos, Graphics g) ] {{{
   // 
   // Draws the X on the piece.  Uses the option you set for the drawing style.
   // 
   public void DrawXOnPiece(int xval, int yval, Graphics g)
     {
	if (DrawXMethod == 1)
	  {
	     int ul, ur, wid, hei, thk;
	     
	     ul = random.nextInt() % 4;
	     if (ul < 0)
	       ul *= -1;
	     ur = random.nextInt() % 4;
	     if (ur < 0)
	       ur *= -1;
	     wid = random.nextInt() % 4;
	     if (wid < 0)
	       wid *= -1;
	     hei = random.nextInt() % 4;
	     if (hei < 0)
	       hei *= -1;
	     thk = random.nextInt() % 3;
	     if (thk < 0)
	       thk *= -1;
	     
	     ul += 4;
	     ur += 4;
	     wid = piecewidth - ul - 4 - wid;
	     hei = pieceheight - ur - 4 - hei;
	     thk += 1;
	     ul = xval * piecewidth + ul;
	     ur = yval * pieceheight + TOP_MARGIN + ur;
	     
	     g.setColor(Color.black);
	     g.fillPolygon(CreateXPolygon(ul, ur,
					  wid, hei, thk + 4));
             g.setColor(Color.red);
	     g.fillPolygon(CreateXPolygon(ul + 2, ur + 2,
					  wid - 4, hei - 4, thk));
             g.setColor(Color.black);
	  }
	else
	  {
	     g.setColor(Color.blue);
	     g.drawLine(xval * piecewidth, yval * pieceheight + TOP_MARGIN,
			(xval + 1) * piecewidth - 1, (yval + 1) * pieceheight - 1 +
			TOP_MARGIN);
	     g.drawLine(xval * piecewidth, (yval + 1) * pieceheight - 1 +
			TOP_MARGIN, (xval + 1) * piecewidth - 1, yval * 
			pieceheight + TOP_MARGIN);
	  }
     }
   // }}}
   
   
   // [ DisplayPiece (int i, Graphics g) ] {{{
   //
   // Just displays one puzzle piece to the screen.  May also put a border around
   // the piece.
   //
   public void DisplayPiece(int i, Graphics g)
     {
        // As a note, (i) is where the piece is located to be painted, not
        // which image to paint.
        // 
        if (i < 0)
          return;
        if (i >= totalpieces)
          return;
        
        int xval = GetPieceX(i);
        int yval = GetPieceY(i);
        
        //
        // Draw the piece
        //
        if (PuzzleType == 0)  // Normal - Swap
          {
             g.drawImage(imageset[imagearray[yval][xval]], xval * piecewidth,
                         yval * pieceheight + TOP_MARGIN, this);
          }
        else  // Slide-type puzzle
          {
             if (imagearray[yval][xval] == totalpieces - 1 && NumberCorrect()
                 != totalpieces)
               {
                  g.setColor(Color.black);
                  g.fillRect(xval * piecewidth, yval * pieceheight +
                             TOP_MARGIN, piecewidth, pieceheight);
               }
             else
               {
                  g.drawImage(imageset[imagearray[yval][xval]], xval *
                              piecewidth, yval * pieceheight + TOP_MARGIN, this);
               }
          }
        
        if (HighlightPiece == i && NumberCorrect() != totalpieces)
          {
             g.setColor(Color.red);
             g.drawRect(xval * piecewidth, yval * pieceheight + TOP_MARGIN,
                        piecewidth - 1, pieceheight - 1);
             g.drawRect(xval * piecewidth + 1,
                        yval * pieceheight + TOP_MARGIN + 1, piecewidth - 3,
                        pieceheight - 3);
          }
        if (ShowX != 0 && i != imagearray[yval][xval])
          {
	     DrawXOnPiece(xval, yval, g);
          }
     }
   // }}}
   

   // [ DrawStatusString (String s, int i, Color bg, Color fg) ] {{{
   // 
   // Draws a status bar string (moves, mix, etc) in the right spot
   // 
   public int DrawStatusString(String s, int i, Color bg, Color fg, Graphics g)
     {
        int Bar_Number = (Bar_Positions / i) % 10;

        int w = fm.stringWidth(s);

        if (Bar_Number == 0)
          return -1;

	int XPos = 0;
        
	if (Bar_Number == 2)
          XPos = (r.width / 4) - (w / 2);
        else if (Bar_Number == 3)
          XPos = (r.width / 3) - (w / 2);
        else if (Bar_Number == 4)
          XPos = (r.width / 2) - (w / 2);
        else if (Bar_Number == 5)
          XPos = (2 * r.width / 3) - (w / 2);
        else if (Bar_Number == 6)
          XPos = (3 * r.width / 4) - (w / 2);
        else if (Bar_Number == 7)
          XPos = r.width - w;
             
        if (bg != Color.white)
          {
             g.setColor(bg);
             g.fillRect(XPos, 0, w, TOP_MARGIN);
             g.setColor(Color.black);
          }
        if (fg != Color.black)
          g.setColor(fg);
        g.drawString(s, XPos, fm.getHeight() - 2);
        if (fg != Color.black)
          g.setColor(Color.black);
        
        return XPos;
     }
   // }}}

        
   // [ DisplayStatus (Graphics g) ] {{{
   //
   // Displays the top bar containing Moves, Correct, and the mix button.
   //
   public void DisplayStatus(Graphics g) 
     {
        String s;
        int sHeight;
        int w;
        
        //
        // There is no need to draw a bar that doesn't exist.
        // 
	if (Bar_Positions == -1)
	  {
	     Bar_Positions = integerFromString(getParameter("BAR"));
	     if (getParameter("BAR") == "null" ||
		 getParameter("BAR") == null)
	       Bar_Positions = 1357;
	  }
	
        if (Bar_Positions == 0)
          {
             return;
          }
        
        g.setColor(Color.white);
        g.fillRect(0, 0, r.width, TOP_MARGIN);
        g.setColor(Color.black);

        DrawStatusString(new String(" Moves:  " + Moves + " "), 1000, 
                         Color.white, Color.black, g);
        
        if (NumberCorrect() == totalpieces)
          {
             showStatus("You did it in only " + Moves + " moves!");
          }
        else
          {
             showStatus("Moves: " + Moves + "    Correct: " + NumberCorrect() + 
                        "/" + totalpieces);
          }
        
        if (NumberCorrect() == totalpieces)
          {
             s = new String(" Done! ");
          }
        else
          {
             s = new String("  Correct:  " + NumberCorrect() + "/" +
                            totalpieces + "  ");
          }
        DrawStatusString(s, 100, Color.white, Color.black, g);
        
        if (ShowX == 0)
             s = new String(" Reveal ");
        else
             s = new String(" Hide ");
        if (RevealWidth == 0)
	  RevealWidth = fm.stringWidth(s);
        
        RevealXPos = DrawStatusString(s, 10, Color.yellow, Color.red, g);
        
        s = new String(" Mix ");
        if (MixWidth == 0)
          MixWidth = fm.stringWidth(s);
        MixXPos = DrawStatusString(s, 1, Color.blue, Color.green, g);
     }
   // }}}
   
   
   // [ DisplayCredits (Graphics g) ] {{{
   //
   // Displays an intro screen while image is loading and pieces are being cut.
   //
   public void DisplayCredits(Graphics g, String s)
     {
        int sWidth;
        int sHeight;
        g.setColor(Color.white);
        g.fillRect(0, 0, r.width, r.height);
        g.setColor(Color.black);
        
        showStatus(s);
        
        fm = g.getFontMetrics();
        
        sWidth = fm.stringWidth(s);
        sHeight = fm.getHeight();
        g.drawString(s, (r.width - sWidth)/2, r.height / 2);
        
        s = new String("Please Be Patient...");
        sWidth = fm.stringWidth(s);
        g.drawString(s, (r.width - sWidth)/2, r.height / 2 + sHeight);
        
        s = new String("Puzzle - " + Version);
        sWidth = fm.stringWidth(s);
        g.drawString(s, 5, sHeight + TOP_MARGIN + 3);
        
        // I should make this clickable and jump to my web site  :-)
        s = new String("Puzzle Author:  Tyler Akins <puzzle@rumkin.com>");
        sWidth = fm.stringWidth(s);
        g.drawString(s, 5, sHeight * 2 + TOP_MARGIN + 6);
	
	if (getParameter("WEBSITE") != null)
	  {
	     s = new String("Direct comments about this website to:");
	     sWidth = fm.stringWidth(s);
	     g.drawString(s, 5, sHeight * 4 + TOP_MARGIN + 6);
	     
	     s = getParameter("WEBSITE");
	     sWidth = fm.stringWidth(s);
	     g.drawString(s, 15, sHeight * 5 + TOP_MARGIN + 8);
	  }
        
        s = new String("(C)opyright 1997, 2001 by author");
        sWidth = fm.stringWidth(s);
        g.drawString(s, 0, r.height - 5);
     } 
   // }}}
   
   
   // [ paint (Graphics g) ] {{{
   //
   // Simply paints the screen
   //
   public void paint(Graphics g)
     {
        int i, j;
        
        if (PaintScreen >= 0)
          {
             if (PaintScreen == 0)
               DisplayCredits(g, "Downloading Image");
             else if (PaintScreen == 1)
               DisplayCredits(g, "Cutting Pieces");
             else if (PaintScreen == 2)
               DisplayCredits(g, "Mixing Puzzle");
             else if (PaintScreen == 3)
               DisplayCredits(g, "Error With Image - Redownloading");
             else if (PaintScreen == 4)
               DisplayCredits(g, "Redownload failed.  Contact site admin.");
	     else if (PaintScreen == 5)
	       DisplayCredits(g, "Resizing Image");
             return;
          }
        
        if (RepaintCell1 != -1)
          {
             DisplayPiece(RepaintCell1, g);
             DisplayPiece(RepaintCell2, g);
             RepaintCell1 = -1;
             RepaintCell2 = -1;
          }
        else
          for (i = 0; i < totalpieces; i++)
            {
               DisplayPiece(i, g);
            }
        
        DisplayStatus(g);
     }
   // }}}

   
   // [ Done () ] {{{
   //
   // What should I do when done?  This tells me what to do!
   //
   public void Done()
     {
        String appended = null;
        String prefix = null;
        
        if (DoneSound != null)
          DoneSound.play();
        if (NumberCorrect() == totalpieces)
          {
             AppletContext ac;
             URL NewUrl;
             
             ac = getAppletContext();
             
             if (getParameter("PREFIXURL") != null && getParameter("PREFIXURL") !=
                 "null")
               prefix = new String(getParameter("PREFIXURL"));
             else
               prefix = new String("");
             
             if (getParameter("POSTFIXURL") != null && getParameter("POSTFIXURL") !=
                 "null")
               appended = new String(getParameter("POSTFIXURL"));
             else
               appended = new String("");
             
             if (getParameter("URL") == null || getParameter("URL") == "null")
               return;
             
             try {
                NewUrl = new URL(getDocumentBase(), getParameter("URL") + "?" + 
                                 prefix + Moves + appended);
             } catch (MalformedURLException ex) {
                FinishShown = 1;
                NewUrl = null;
             }
             if (FinishShown == 0)
               {
                  FinishShown ++;
                  ac.showDocument(NewUrl);
               }
          }
     }
   // }}}


   // [ mouseEntered (MouseEvent e) ] {{{
   //
   // What should I do when you bring the mouse over me?
   //
   public void mouseEntered(MouseEvent e)
     {
        if (ERROR == 0)
          {
             showStatus("Moves: " + Moves + "    Correct: " + NumberCorrect() + 
                        "/" + totalpieces);
          }
        else
          {
             showStatus("ERROR!!!");
          }
        
        return;
     }
   // }}}

   
   // [ mousePressed (MouseEvent e) ] {{{
   //
   // What should I do when you click?
   //
   public void mousePressed(MouseEvent e)
     {
        int x = e.getX();
        int y = e.getY();
        
        if (PaintScreen >= 0)
          {
             return;
          }
        
        int xTile = x / piecewidth;
        int yTile = (y - TOP_MARGIN) / pieceheight;
        
        if (y < TOP_MARGIN)
          {
             if (MixXPos != -1 && x >= MixXPos && x <= MixXPos + MixWidth)
               {
                  MixUpPuzzle();
               }
             else if (RevealXPos != -1 && x >= RevealXPos &&
		      x <= RevealXPos + RevealWidth)
               {
                  if (ShowX != 0)
                    ShowX = 0;
                  else
                    ShowX = 1;
               }
             repaint();
             return;
          }
        
        if (NumberCorrect() == totalpieces)
          {
             Done();
             return;
          }
        
        if (PuzzleType == 0) // swap puzzle
          {
             if (HighlightPiece == -1)
               {
                  HighlightPiece = GetPieceNum(xTile, yTile);
                  RepaintCell1 = HighlightPiece;
               }
             else
               {
                  if (HighlightPiece != GetPieceNum(xTile, yTile))
                    {
                       SwapPieces(HighlightPiece, GetPieceNum(xTile, yTile));
                       Moves ++;
                    }
                  RepaintCell1 = HighlightPiece;
                  RepaintCell2 = GetPieceNum(xTile, yTile);
                  HighlightPiece = -1;
               }
          }
        else // slide puzzle
          {
             int oldX = GetPieceX(HighlightPiece);
             int oldY = GetPieceY(HighlightPiece);
             int val;
             
             if (HighlightPiece == GetPieceNum(xTile, yTile))
               return;
             
             if ((oldX == xTile || oldY == yTile) && 
                 (oldX - xTile == 1 || xTile - oldX == 1 || oldY - yTile == 1 
                  || yTile - oldY == 1))
               {
                  SwapPieces(HighlightPiece, GetPieceNum(xTile, yTile));
                  Moves ++;
                  RepaintCell1 = HighlightPiece;
                  HighlightPiece = GetPieceNum(xTile, yTile);
                  RepaintCell2 = HighlightPiece;
               }
          }
        
        repaint();
        
        if (NumberCorrect() == totalpieces)
          {
             Done();
          }
        
        return;
     }
   // }}}
   
   
   // [ mouse* (MouseEvent e) ] {{{
   //
   // Just blank functions so that Java doesn't complain.
   public void mouseClicked(MouseEvent e){};
   public void mouseReleased(MouseEvent e){};
   public void mouseExited(MouseEvent e){};
   // }}}
   
   
   // [ update (Graphics g) ] {{{
   //
   // Function responsible when you do something which covers up the applet,
   // then you come back to it.  I included this to improve speed.  The
   // default one dicks around a little bit, paints the applet all gray, then
   // calls paint().
   //
   public void update(Graphics g)
     {
        paint(g);
     }
   // }}}
   
   
   // [ run () ] {{{   
   // 
   // The meanest meanest function in here.  This is what tells the applet what
   // to do.
   //
   public void run()
     {
        int i;
        MediaTracker trackset;              // Tracker for images
        Image WholePicture;                 // The whole picture
	Image ResizedPicture;
        ImageFilter filter;
        
	//
	// Figure out the size of the applet
	//
	r = getSize();

        //
        // Load the image
        //
        if (getParameter("SRC") == null)
          Error("Image filename not defined.");
	WholePicture = getImage(getDocumentBase(), getParameter("SRC"));
	
	//
	// Scale original image if we need to
	// 

        
        //
        // Make the image load completely.  Actually, this just puts the image
        // into the track set.  Where it waits is in paint().
        //
        trackset = new MediaTracker(this);
        trackset.addImage(WholePicture, 1);
        
        
        //
        // Mix up the puzzle
        //
        System.out.println("Mixing puzzle.");
        PaintScreen = 2;
        repaint();
        try {
	   Thread.sleep(100);
	} catch (InterruptedException e) {
	}
        MixUpPuzzle();
        
        //
        // Tell user we are waiting for image
        //
        PaintScreen = 0;
        repaint();
        try {
	   Thread.sleep(100);
	} catch (InterruptedException e) {
	}
        
        try {
           trackset.waitForID(1);
        } catch (InterruptedException e) {
           Error("Interrupted!");
        }
        
        //
        // Did image load up correctly?
        //
        if (WholePicture.getWidth(this) == -1)
          {
             PaintScreen = 3;
             repaint();
             WholePicture = getImage(getDocumentBase(), getParameter("SRC"));
             trackset = new MediaTracker(this);
             trackset.addImage(WholePicture, 1);
             try {
                trackset.waitForID(1);
             } catch (InterruptedException e) {
                Error("Interrupted!");
             }
             if (WholePicture.getWidth(this) == -1)
               {
                  PaintScreen = 4;
                  repaint();
                  stop();
                  return;
               }
          }

        //
	// Resize picture if needed.
	//
	int ResizeOption = integerFromString(getParameter("RESIZE"));
	if ((r.width != WholePicture.getWidth(this) ||
	     r.height != WholePicture.getHeight(this)) &&
            ResizeOption != 0)
	  {
	     if (ResizeOption == 2)
	       {
		  ResizedPicture = 
		    WholePicture.getScaledInstance(r.width, r.height - TOP_MARGIN,
						   WholePicture.SCALE_FAST);
	       }
	     else if (ResizeOption == 3)
	       {
		  ResizedPicture =
		    WholePicture.getScaledInstance(r.width, r.height - TOP_MARGIN,
						   WholePicture.SCALE_SMOOTH);
	       }
	     else if (ResizeOption == 4)
	       {
		  ResizedPicture =
		    WholePicture.getScaledInstance(r.width, r.height - TOP_MARGIN,
						   WholePicture.SCALE_AREA_AVERAGING);
	       }
	     else
	       {
		  ResizedPicture =
		    WholePicture.getScaledInstance(r.width, r.height - TOP_MARGIN,
						   WholePicture.SCALE_DEFAULT);
	       }
	     
	     trackset.addImage(ResizedPicture, 2);
	     PaintScreen = 5;
	     repaint();
	     try {
		Thread.sleep(100);
	     } catch (InterruptedException e) {
	     }
	     
	     try {
		trackset.waitForID(2);
	     } catch (InterruptedException e) {
		Error("Interrupted!");
	     }
	
	     WholePicture = ResizedPicture;
	  }
	

	
        //
        // Done loading picture.  Start background loading other things
        // Also put picture into Graphic class
        //
        if (getParameter("SOUNDSRC") != null && 
            getParameter("SOUNDSRC") != "null")
          DoneSound = getAudioClip(getDocumentBase(), getParameter("SOUNDSRC"));
        else
          DoneSound = null;
        
        //
        // Split up main image into littler images
        // I tried this a multitude of ways, and apparently this way is the
        // fastest?  Weird.  I would think that having the main image broken
        // into columns, then the columns broken into rows would be faster.
        //
        PaintScreen = 1;
        repaint();
        try {
           Thread.sleep(100);
        } catch (InterruptedException e){}
        
        piecewidth = WholePicture.getWidth(this) / piecesx;
        pieceheight = WholePicture.getHeight(this) / piecesy;
        System.out.println("Picture loaded.  X=" +
                           WholePicture.getWidth(this) + " Y=" + 
                           WholePicture.getHeight(this));
        imageset = new Image[totalpieces];
        for (i = 0; i < totalpieces; i++)
          {
             filter = new CropImageFilter(GetPieceX(i) * piecewidth, 
                                          GetPieceY(i) * pieceheight, 
                                          piecewidth, pieceheight);
             imageset[i] = createImage(new 
                                       FilteredImageSource(WholePicture.getSource(), 
                                                           filter));
          }
        
	//
	// Garbage collection
	// 
	// Manually run it now because we did a lot of memory stuff
	//
	System.out.println("Images chopped, starting garbage collection.");
	System.gc();
	
        //
        // Set up the mouse listener
        //
        System.out.println("Adding mouse listener.");
        addMouseListener(this);
        
        //
        // Done mixing
        //
        System.out.println("Displaying puzzle.");
        PaintScreen = -1;
        repaint();
        while (killme != null)
          try {
             Thread.sleep(100);
          } catch (InterruptedException e){}
     }
   // }}}

   
   // [ start () ] {{{
   //
   // Start the applet
   public void start()
     {
        if(killme == null) 
          {
             killme = new Thread(this);
             killme.start();
          }
     }
   // }}}
   
   
   // [ stop () ] {{{
   //
   // Stop the applet
   public void stop()
     {
        killme = null;
     }
   // }}}


}
/// }}}
