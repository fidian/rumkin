function R_Link(a, b, c)
{
   if (! a)
      return '<li><hr>';
   
   var o = '<li><a class="r_menu2" href="' + a + '">' + b + '</a>';
   if (c)
      o += '  &gt;&gt;';
      
   return o;
}

function R_Menu(s, m)
{
   if (m)
      s += R_Link() + R_Link(m, '&nbsp; &hellip; more');
      
   return '<ul class="r_menu2">' + s + '</ul>';
}


function R_LoadMenu(loop)
{
   var e = document.getElementById('r_dropdown');
   var more = '&nbsp;&ellip; more';
   
   if (! e)
   {
      if (loop ++ < 100)
      {
         window.setTimeout('R_LoadMenu(' + loop + ')', 150);
      }
      return;
   }
 
   e.innerHTML = '<ul class="r_menu"><li>' + e.innerHTML +
      R_Menu(
         R_Link('/reference/site/chat.html', 'Live Chat') +
         R_Link() +
         R_Link('/fun/', 'Fun&nbsp;Things') +
         R_Menu(
	    R_Link('/fun/games/', 'Games') +
            R_Link('/fun/trivia/', 'Trivia') +
	    R_Link('/fun/ttwisters/', 'Tongue Twisters'), '/fun/') +
         R_Link('/reference/', 'Reference&nbsp;Materials') +
	 R_Menu(
	    R_Link('/reference/algorithms/', 'Algorithms') +
	    R_Link('/reference/aquapad/', 'Aquapad') +
	    R_Link('/reference/firearms/', 'Ballistic Gel') +
	    R_Link('/reference/dnd/', 'D&amp;D') +
	    R_Link('/reference/web/', 'Web Tech.'), '/reference/') +
         R_Link('/software/', 'Software&nbsp;Projects') +
	 R_Menu(
	    R_Link('/software/dnd_helper/', 'D&amp;D Helper') +
	    R_Link('/software/floater/', 'Floating Menu') +
	    R_Link('/software/marco/', 'Marco') +
	    R_Link('/software/palm/', 'Palm OS'), '/software/') +
         R_Link('/tools/', 'Web-Based&nbsp;Tools') +
	 R_Menu(
	    R_Link('/tools/cipher/', 'Ciphers &amp; Codes') +
	    R_Link('/tools/gps/', 'GPS &amp; Mapping') +
	    R_Link('/tools/mailto_encoder/', 'Mailto Encoder') +
	    R_Link('/tools/password/', 'Passwords') +
	    R_Link('/tools/sprint/', 'Phone Uploader') +
	    R_Link() +
	    R_Link('/tools/weeble/', 'FTP Client') +
	    R_Link('/tools/darkerirc/', 'IRC Client') +
	    R_Link('/tools/ssh/', 'SSH Client'), '/tools/')) + '</ul>';
}

function R_ChatWindow() {
   window.open('/reference/site/chat.html', 'r_chat',
      'width=545, height=550, directories=no, location=no, ' +
      'resizeable=no, menubar=no, toolbar=no, scrollbars=no, status=no');
   return false;
}


if (document.getElementById)
{
   window.setTimeout('R_LoadMenu(0)', 50);
}
