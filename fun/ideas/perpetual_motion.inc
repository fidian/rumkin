<p>I like the idea of perpetual motion.  I want "over-unity" (OU) devices to
exist.  That could solve lots of problems, and probably create a few to
boot.</p>

<?PHP

$Links = array(
   array('Name' => 'Gravity Mill',
         'Desc' => 'This idea strikes me as being one of the very ' .
	    'few that have potential.  I have not seen it work.  ' .
	    'In fact, only one person claims to have it work, so ' .
	    'that claim is obviously very suspect.  However, I am ' .
	    'unable to really figure out why it should not work. ' .
	    'With the other mechanical OU devices, I can figure out ' .
	    'why they won\'t work.  Because this one stumps me, I ' .
	    'believe it needs a second look.',
	 'URL' => 'http://theverylastpageoftheinternet.com/newclaims/GravityMotor/gravity_motor.htm'),
   array('Name' => 'Japan Magnetic Fan Company',
         'Desc' => 'According to the article, he has figured out a way ' .
	    'to make today\'s motors significantly more efficient and ' .
	    'even has a OU-style machine patented.  I want one for my ' .
	    'desk.',
	 'URL' => IdeaURL('fan')),
   array('Name' => 'Free Energy &ndash; Overunity',
         'Escape' => false,
         'Desc' => 'A great site about lots and lots of OU devices, ' .
	    'along with bogus plans and further information.  While ' .
	    'the site is somewhat poorly laid out, it certainly ' .
	    'provides tons of information and links to the original ' .
	    'sites.',
	 'URL' => 'http://www.theverylastpageoftheinternet.com'),
);

MakeLinkList($Links);
