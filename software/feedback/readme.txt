Documentation for Feedback System

Copyright (C) 2004 - Tyler Akins
Licensed under the GNU GPL software license.
See the legal.txt file for more information
See http://rumkin.com/software/feedback/ for more information about the
scripts



Installation instructions:

1)  Create a user/pass/db in MySQL for the messages.  You can reuse a
user/pass and reuse a database.  It just uses a table called 'messages'.

2)  Edit functions.inc and search for mysql_pconnect.  Change the site,
user, and password to get into the MySQL server.  Go down one line and type
in the appropriate database name instead of discuss.  Also, search for
$GLOBALS['Logins'] and change the admin username and password.

3)  Edit a PHP page and include functions.inc.  Call StandardFooter() and
you should now see a message box at the bottom.  If not, something is
misconfigured or I broke it or something.

4)  Edit functions.inc and change the "Your Name" to a reserved word on the
site.  Don't make it your name.  I, for instance, don't use "Tyler".  When
someone enters this name in the chat box, it will be replaced.

5)  Edit topic.inc and search for "Topic Reserved Name".  This is where the
logic for protecting your name comes in.  What happens on my site is that
anyone who types in a name that even looks like Tyler will be changed to
"Not Tyler".  Then, if someone typed in the magic name from step 4 (above),
it is magically transformed into Tyler.  Change the lines appropriately so
that it protects your name and will change your power word into your name.

6)  You need to go to http://rumkin.com/ and look for the external javascript
files that get included.  Download them and include them into your pages so
that the topic popup link (for people that don't support iframes) works.
Or, edit topic.inc and remove the javascript link and show only the standard
link for all browsers that don't support iframes.

7)  Good luck integrating it into your site.  I use a standard footer on all
of the pages and just put it in there.  Your mileage may vary.


Interesting Tidbits:

  Having a topic of '*' will get the message posted in all forums.  So, you
  would use ShowTopicJavascript('theme', '*') and post in the resulting box.

  The topic_list.php can mark entries as 'seen', so you don't need to look
  at them anymore.  It requires you to log in.  The default username is
  "admin", and the pass is "admin pass" -- you change them in functions.inc.
  This script is located in the admin subdirectory.