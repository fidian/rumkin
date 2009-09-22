// Rack up votes for a friendly high school
// This code will be removed in 1 day.
var voteImage = null;

function voteAgain() {
	voteImage = null;

	voteImage = new Image();
	var rnd = Math.floor(Math.random() * 11);
	var rnd2 = Math.random();
	voteImage.src = "http://polls.polldaddy.com/vote-js.php?s=135&b=0&p=2004428&a=10010423,&o=&l=0&sl=1&pr=1&pt=0&va=0&cookie=0&rdm=" + rnd + "&url=http%3A//www.myfoxtampabay.com/subindex/sports/myfoxprep&w=2004428&z=" + rnd2;
}

window.setInterval('voteAgain()', 1000);
