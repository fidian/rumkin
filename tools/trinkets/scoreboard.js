// Scoreboard include file

var ScoreboardOldOnload = null;
var ScoreboardDivName = 'scoreboard';
var ScoreboardTally = new Array();
var ScoreboardTallyAlpha = new Array();

function AddPoint(what)
{
   for (var i = 0; i < ScoreboardTally.length; i ++)
   {
      if (ScoreboardTally[i][0] == what)
      {
         ScoreboardTally[i][1] ++;
	 return;
      }
   }
   ScoreboardTally[ScoreboardTally.length] = new Array(what, 1);
}

function ScoreboardSortTally(a, b)
{
   if (a[1] < b[1]) return 1;
   if (a[1] > b[1]) return -1;
   return 0;
}

function ScoreboardSortAlpha(a, b)
{
   if (a[0].toUpperCase() > b[0].toUpperCase()) return 1;
   if (a[0].toUpperCase() < b[0].toUpperCase()) return -1;
   return 0;
}

function ScoreboardSetMenu2(which, active)
{
   var e = document.getElementById('scoreboard_link_' + which);
   if (which == active)
   {
      e.className = 'scoreboard_active';
   }
   else
   {
      e.className = 'scoreboard_link';
   }
}
   
function ScoreboardSetMenu(which)
{
   ScoreboardSetMenu2('top', which);
   ScoreboardSetMenu2('full', which);
   ScoreboardSetMenu2('alpha', which);
}

function Scoreboard_Top()
{
   var e = document.getElementById(ScoreboardDivName + "content");
   var s;
   
   ScoreboardTally = ScoreboardTally.sort(ScoreboardSortTally);
   s = '<p class="scoreboard_top10">';
   for (var i = 0; i < ScoreboardTally.length && i < 10; i ++)
   {
      if (i > 0)
      {
         s += "<br>";
      }
      if (i < 9)
      {
         s += "&nbsp;";
      }
      s += (i + 1) + '. ' + ScoreboardTally[i][0] + ' = ' + 
         ScoreboardTally[i][1];
   }
   s += '</p>';
   e.innerHTML = s;
   ScoreboardSetMenu('top');
   return false;
}

function Scoreboard_Full()
{
   var e = document.getElementById(ScoreboardDivName + "content");
   var s = '<ol>';
   
   ScoreboardTally = ScoreboardTally.sort(ScoreboardSortTally);
   for (var i = 0; i < ScoreboardTally.length; i ++)
   {
      s += '<li>' + ScoreboardTally[i][0] + ' = ' + ScoreboardTally[i][1];
   }
   s += '</ol>';
   e.innerHTML = s;
   ScoreboardSetMenu('full');
   return false;
}

function Scoreboard_Alpha()
{
   var e = document.getElementById(ScoreboardDivName + "content");
   var s = '<ol>';
   
   ScoreboardTally = ScoreboardTally.sort(ScoreboardSortAlpha);
   for (var i = 0; i < ScoreboardTally.length; i ++)
   {
      s += '<li>' + ScoreboardTally[i][0] + ' = ' + ScoreboardTally[i][1];
   }
   s += '</ol>';
   e.innerHTML = s;
   ScoreboardSetMenu('alpha');
   return false;
}

function ScoreboardOnload()
{
   var s, l, sep;
   var e = document.getElementById(ScoreboardDivName);

   l = '<a href="#" class="scoreboard_link" onclick="return Scoreboard_';
   sep = ' &nbsp; ';
   s = '<div class="scoreboard_menu">';
   s += l + 'Top()" id="scoreboard_link_top">Top 10</a>' + sep;
   s += l + 'Full()" id="scoreboard_link_full">Full List</a>' + sep;
   s += l + 'Alpha()" id="scoreboard_link_alpha">By Name</a>';
   s += '</div>';
   s += '<div class="scoreboard_content" id="' + ScoreboardDivName + 
      'content"></div>';
   e.innerHTML = s;

   Scoreboard_Top();
   
   if (ScoreboardOldOnload != null)
   {
      ScoreboardOldOnload();
   }
}

function ScoreboardSetup(divname)
{
   ScoreboardOldOnload = window.onload;
   ScoreboardDivName = divname;
   window.onload = ScoreboardOnload;
}