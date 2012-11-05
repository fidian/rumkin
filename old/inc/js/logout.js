document.write('<br>');

var times_out_at = new Date()
times_out_at = (Date.parse(times_out_at.toGMTString()) / 1000) + (15 * 60);
var seconds_left = 15 * 60;
var timerid = ''

function start_countdown() {
    if (document.layers) {
      document.l_timer.visibility = "show";
    } else if (document.all || document.getElementById) {
      timerid = document.getElementById && ! document.all ?
      document.getElementById("s_timer") : s_timer;
    }
	
    countdown();

    if (logout_countdown_onload != null)
      logout_countdown_onload();
}

if (document.layers) {
    document.write('<ilayer id="l_timer" visibility=hide></ilayer>');
} else if (document.all || document.getElementById) {
    document.write('<span id="s_timer"></span>');
}

logout_countdown_onload = window.onload;
window.onload = start_countdown;

function countdown() {
   var right_now = new Date();
   right_now = Date.parse(right_now.toGMTString()) / 1000;
   var diff = times_out_at - right_now;
   var the_str = "";
   var cont = 1;
   
   if (diff > 0) {
      var sec = diff % 60;
      if (sec < 10)
         sec = "0" + sec;
      var min = Math.floor(diff / 60);
      the_str = "Login expires in " + min + ":" + sec;
   } else {
      the_str = "Login expired.";
      cont = 0;
   }

   if (document.layers) {
      document.l_timer.document.write(the_str)
      document.l_timer.document.close()
   } else if (document.all || document.getElementById) {
      timerid.innerHTML = the_str;
   }
   
   if (cont == 1)
      setTimeout("countdown()", 1000)
}
