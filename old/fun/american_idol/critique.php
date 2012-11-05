<?php

include'critique.inc';
include'functions.inc';

if ($Season == 'all') {
	LoadSeason(1);
	LoadSeason(2);
} else {
	if (! isset($Season))$Season = 1;
	settype($Season, 'integer');
	
	if ($Season < 1 || $Season > 2)$Season = 1;
	LoadSeason($Season);
}

StandardHeader();
Box('Judges\' Opinions', ShowCritique('intro'), 'align=center width=80%');
Box('Randy Jackson:', '<img src="media/randy.jpg" align=left>' . ShowCritique('randy'), 'align=center width=80%');
Box('Paula Abdul:', '<img src="media/paula.jpg" align=left>' . ShowCritique('paula'), 'width=80% align=center');
Box('Simon Cowell:', '<img src="media/simon.jpg" align=left>' . ShowCritique('simon'), 'width=80% align=center');
Box('Unhappy with the results?', 'If you want to try again, this special online form of judging will ' . 'allow you.  Just sing a different song, <a href="critique.php">' . 'click here</a> and hope for the best.<br><br>' . '[ <a href="critique.php">Try Again</a> ] - [ <a ' . 'href="index.php">Main Page</a> ]', 'width=80% align=center');
StandardFooter();
