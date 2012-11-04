<?php
/**
 * function dayOfMonth
 * 
 * finds either a specific occurence of a day based on name
 * (i.e., monday, tuesday, etc.), after a certain day, or
 * the last occurence of a day of the month.
 * 
 * if no $occurence of is given, then it will look for the
 * first occurence of that day.  to find the last occurence
 * of a day, then give a zero (0).
 * 
 * if no after date is given then it will start on the first
 * day of the month
 * 
 * if any invalid data is passed then the function will return
 * false
 * 
 * @param:
 *   $fmonth      = (int) month
 *   $fyear       = (int) four digit year
 *   $day_to_find = (int) day of the week, (0 - sunday, 1 - monday, etc...)
 *   $occurenceOf = (int) which day your looking for, (1st sunday, 2nd tuesday, etc...)
 *   $after       = (int) after a date of the month, (after the fifth, or tenth)
 * 
 * @returns:
 *   (int) $dtr "date to return" = the day of the month the date you asked for occurs.
 * 
 */
function dayOfMonth($fmonth, $fyear, $day_to_find, $occurenceOf = 1, $after = 0) {
	// default "date to return" to false
	$dtr = false;
	
	// done is a boolean value for looping
	$done = false;
	
	/* checks to see if the month and year given make a valid date and
	 * that occurenceOf is valid, because you can't ask for the -1 occurence
	 * of a day, and i'm pretty sure there is never a calendar day repeated
	 * more than five times, and that you're not asking for a day that's out of range.
	 * we'll trap for specific bad dates later */
	if (checkdate($fmonth, 1, $fyear) && $occurenceOf > - 1 && $occurenceOf < 6 && $after < 32) {
		/* $cd is the current day.  it's set to whatever is passed in
		 * the $after variable plus one. the default is the first day
		 * of the month */
		$cd = $after + 1;
		
		// if we're looking from the front of the month, backwards
		if ($occurenceOf != 0) {
			while (! $done) {
				/* date("w") will return me a 0 for sunday, 1 for monday
				 * and the second parameter is an optional timestamp.
				 * so i make a timestamp out of the month and year that was passed in
				 * and get back what day of the week it is, and compair it to the day
				 * we're looking for. */
				if (date('w', mktime(0, 0, 0, $fmonth, $cd, $fyear)) == $day_to_find) {
					/* the date to return is the current day plus an offset of the occurence
					 * of this day.  so if you wanted the third friday, it would take the first
					 * friday, and add 2 * 7 to it...which would be 14, or two weeks later */
					$dtr = $cd + (($occurenceOf - 1) * 7);
					
					// exit out of the loop
					$done = true;
				}
				
				/* this is for if someone asks for a day that never happens...like the 5th
				 * friday of february, which might occur sometimes, but not others.
				 * this isn't as graceful as i'd like,  more like a necessary evil */
				elseif ($cd == 32) {
					// return false, cause you asked for a date that don't exist
					$done = true;
				}
				
				// increment the current day
				$cd ++;
			}  // while(!$done)
		}
		
		/* if($occurenceOf != 0)
		 * else find the last occurence of this day */
		else {
			/* here i'm getting the last day of the month you asked for
			 * by taking advandate of the mktime() method.  i asked for
			 * the next months zero (0) day, which php interprets as the
			 * last day of the previous month */
			$t = getdate(mktime(0, 0, 0, $fmonth + 1, 0, $fyear));
			
			/* the previous line returned an array of date information
			 * but i only need the number of the date, so we'll pull that
			 * out and use that */
			$daysinmonth = $t['mday'];
			
			/* loop from the last day to the first day of the month
			 * unless we found what we're looking for */
			for ($cd = $daysinmonth; $cd > 0 && ! $done; $cd --) {
				// if the currend day is the day of the week we're looking for
				if (date('w', mktime(0, 0, 0, $fmonth, $cd, $fyear)) == $day_to_find) {
					// return the current day and exit gracefully
					$dtr = $cd;
					$done = true;
				}
			}  // for($cd=$daysinmonth;$cd>0 && !$done;$cd--)
		}
	}
	
	/* if(checkDate($fxmonth,1,$fxyear) && ...
	 * return "date to return" */
	return $dtr;
}

