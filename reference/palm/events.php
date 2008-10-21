<?PHP

include '../../functions.inc';

StandardHeader(array('title' => 'Palm OS Events',
		     'topic' => 'palmos'));

?>

<p>This is a list of all of the events I know about.  If you have others
that should be added, just leave me a comment in the shoutbox below.</p>

<?PHP MakeBoxTop('center') ?>
<pre>0 - nil
1 - pen down
2 - pen up
3 - pen move
4 - key down
5 - win enter
6 - win exit
7 - ctl enter
8 - ctl exit
9 - ctl select
A - ctl repeat
B - lst enter
C - lst select
D - lst exit
E - pop select
F - fld enter
10 - fld height changed
11 - fld changed
12 - tbl enter
13 - tbl select
14 - day select
15 - menu
16 - app stop
17 - frm load
18 - frm open
19 - frm goto
1A - frm update
1B - frm save
1C - frm close
1D - frm title enter
1E - frm title select
1F - tbl exit
20 - scl enter
21 - scl exit
22 - scl repeat
23 - tsm confirm
24 - tsm fep button
25 - tsm fep mode
800 - menu cmd bar open
801 - menu open
802 - menu close
803 - frm gadget enter
804 - frm gatdget misc
1000 - first i net lib
1100 - first web lib
6000 - first user event
</pre>
<?PHP MakeBoxBottom(); ?>
<?PHP

StandardFooter();