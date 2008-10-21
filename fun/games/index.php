<?PHP

require '../../functions.inc';

StandardHeader(array('title' => 'Interactive Games',
                     'topic' => 'games'));

$Links = array(
   array('Name' => 'Adrenaline Challenge (Flash)',
	 'Desc' => 'Ride your motorcycle to collect the green dots and ' .
	    'make it to the exit.',
	 'URL' => 'media/adrenaline.swf'),
   array('Name' => 'Asteroids (Flash)',
         'Desc' => 'One of the original arcade games.  Who needs color?  ' .
	    'We only need three lines to display a whole starship!',
	 'URL' => 'media/neave_asteroids.swf'),
   array('Name' => 'Break It (Flash)',
         'Desc' => 'You use your paddle to bounce a ball to break bricks.  ' .
	    'The game goes by several names, but this version has some ' .
	    'neat effects to keep it interesting.',
	 'URL' => 'media/breakit.swf'),
   array('Name' => 'College Life Interactive Story',
	 'Desc' => 'Are you ready for college?  Will you be able to ' .
	    'balance partying and studying in order to graduate and ' .
	    'still have a life?  Or will the scales tip severely in ' .
	    'one direction, leaving you branded as a nerd or a ' .
	    'failure?',
	 'URL' => 'college_life.php'),
   array('Name' => 'D-Fence (Flash)',
	 'Desc' => 'Protect your fort by shooting the invaders.',
	 'URL' => 'media/d-fence.swf'),
   array('Name' => 'Flashzooids (Flash)',
	 'Desc' => 'A much prettier version of asteroids.',
	 'URL' => 'media/flashiness_fz.swf'),
   array('Name' => 'Freecell (Java)',
	 'Desc' => 'Fun card game that runs in your web browser as ' .
	    'a Java applet.',
	 'URL' => 'freecell.php'),
   array('Name' => 'Helicopter Game (Flash)',
	 'Desc' => 'Fly your helicopter through a tunnel and avoid the ' .
	    'obstacles.',
	 'URL' => 'media/helicopter.swf'),
   array('Name' => 'Hexxagon (Flash)',
         'Desc' => 'Othello-like game where you can choose to either ' .
	    'clone a piece to another cell or jump to a more distant ' .
	    'cell.  Nearby opponent pieces are then changed into ' .
	    'ones for you.  Great strategy board game.',
	 'URL' => 'media/neave_hexxagon.swf'),
   array('Name' => 'Kitten Cannon (Flash)',
	 'Desc' => 'If you really don\'t like cats, this game is for ' .
	    'you.  Remember, you can not sue me if you do not like ' .
	    'the contents &ndash; you have been warned!',
         'Escape' => false,
	 'URL' => 'media/kitten_cannon.swf'),
   array('Name' => 'Meal or No Meal (Flash)',
	 'Desc' => 'Similar to the "Deal or No Deal" show on television, ' .
	    'this game uses plates of food instead of briefcases.',
	 'URL' => 'media/meal_or_no_meal.swf'),
   array('Name' => 'Pacman (Flash)',
         'Desc' => 'A flash version of the original arcade game.',
	 'URL' => 'media/pacman.swf'),
   array('Name' => 'Penguin Baseball (Flash)',
         'Desc' => 'A fun game of timing.  How far can you whack the ' .
	    'penguin?',
	 'URL' => 'media/penguin_baseball.swf'),
   array('Name' => 'Bloody Penguin (Flash)',
         'Desc' => 'Just like Penguin Baseball, but a lot more gory.  ' .
	    'Do not use if you don\'t like the sight of carnage.',
	 'URL' => 'media/bloody_penguin.swf'),
   array('Name' => 'Raiden X',
	 'Desc' => 'Fly your ship around and blow up the bad guys.',
	 'URL' => 'media/raiden_x.swf'),
   array('Name' => 'Stick Man Sam 1',
	 'Desc' => 'You play Sam, a stick man action hero.  Run around, ' .
	    'jump, and use your mouse to shoot things.  Lots of fun!',
	 'URL' => 'media/stickmansam1.swf'),
   array('Name' => 'Stick Man Sam 2',
	 'Desc' => 'The sequel.',
	 'URL' => 'media/stickmansam2.swf'),
   array('Name' => 'Stick Man Sam 3',
	 'Desc' => 'More of the same, but different a bit.',
	 'URL' => 'media/stickmansam3.swf'),
   array('Name' => 'Stick Man Sam 4',
	 'Desc' => 'You mean you have finished all the other ones?  ' .
	    'Here\'s the next one.',
	 'URL' => 'media/stickmansam4.swf'),
   array('Name' => 'Tetris (Flash)',
         'Desc' => 'Provided for all of you tetris fans out there.',
	 'URL' => 'media/neave_tetris.swf'),
);

MakeLinkList($Links);

StandardFooter();
