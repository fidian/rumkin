<?PHP

include '../../functions.inc';

StandardHeader(array('topic' => 'tools',
		     'title' => 'Miscellaneous Tools'));

?>

<p>When I come across problems and I write something useful, I like to share
with the world, just in case someone else has this problem.</p>

<?PHP Section('<a href="relay.c">relay.c</a>'); ?>

<p>The DSL router for my computer needs to be reset every now and then.
It is a pain to do that manually, so I soldered a little circuit and
connected it to the parallel port on my computer.  This is the program that
I wrote that just trips the circuit and turns off the router when it can not
connect to my upstream provider.  It also logs information with syslog so
you can see how often the router needs to be rebooted.  Information on the
circuit is in the file.</p>

<?PHP Section('<a href="hosts_make">hosts_make</a>'); ?>

<p>On my network, I like to run Linux.  Many other people favor Windows.  I
run samba and can share files with them easily.  However, it is not as easy
to find their computers, since they are given different IP addresses often
with DHCP.  I could manually use nmblookup to find the IP addresses, but
that gets old fast.</p>

<p>I wrote this script to automatically generate the /etc/hosts file every
half hour or so.  Just add a line in your crontab file (or /etc/cron.d or
wherever your system has it) and have root run this script.  Pipe the
results to /etc/hosts and your worries should basically be over.</p>

<p>I understand that there are going to be modules for resolving names in
the future, and there will be a samba module.  However, until Debian ships
with that in 'stable,' I will just use this simple script.</p>

<?PHP Section('<a href="backups.zip">Automated Client Backups</a>'); ?>

<p>Windows (we used 2000, but others will work fine) batch file and program
to copy files from a remote computer to the local one.</p>

<p>We needed our workstations to synchronize their files to the main server
on a daily basis.  That way, if a workstation died, the server had a backup
of their files.  We tried setting up jobs on everyone's computer, but that
was tedious, broke often, and just "felt wrong" to do it that way.  Instead,
now the server will go out to everyone's machine and copy files to a local
folder.  That way, if the client computer is off or at a different location
(e.g. laptops), it just skips that one for the day.</p>

<p>Only the changes are copied so that the amount of network bandwidth used
is minimal.  The backups are performed serially, because parallel backups
are much harder to write and they consume more bandwidth.</p>

<p>You edit the batch file, which calls itself numerous times, once per
directory (and all subdirectories) that you want to backup.  Avoid backing
up the main directory, since you can usually just say to backup the My
Documents and other specific folders as needed.  Comments are in the batch
file that explain how to add other shares and set new exclusions.  It also
comes with a copy of fsync to be complete.</p>

<p>Once you run the batch file, you can check the various log files to see
if it works.  Once it works, set it up as a daily job (or hourly, if needed)
and make sure the user it runs at has permission to everyone's shares and
files.  On a domain, you can just create a special admin account.  On a
workgroup, you need to create an account on every machine.</p>

<?PHP Section('<a href="patcher.zip">Patcher</a>'); ?>

<p>Need to distribute very small changes in binary files?  This set of
DOS/Linux tools will help you out.  One program makes a special file
describing the changes to make, and the other applies the changes.</p>

<p>This is not good for large changes, or where you recompile a program.  It
is only good for tiny changes, like the ones you would make with a hex
editor, and you want to distribute the changes to people who don't have a
hex editor available.</p>

<?PHP Section('<a href="padxor.php">One Time Pad XOR</a>'); ?>

<p>Encrypt your files with the most secure method available.  This is also
known as the Vernam cipher method.  For more information or to download the
programs, check out the <a href="padxor.php">description page</a>.</p>

<?PHP Section('<a href="creates_own_code.tgz">Creates Itself?</a>'); ?>

<p>The challenge:  Create a program that will generate its own source
code.  Difficult, but certainly not impossible.</p>

<?PHP

StandardFooter();
