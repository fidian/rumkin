----
title: Miscellaneous Tools
template: index.jade
----

When I come across problems and I write something useful, I like to share
with the world, just in case someone else has this problem.


relay.c
=======

The DSL router for my computer needs to be reset every now and then.  It is a pain to do that manually, so I soldered a little circuit and connected it to the parallel port on my computer.  This is the program that I wrote that just trips the circuit and turns off the router when it can not connect to my upstream provider.  It also logs information with syslog so you can see how often the router needs to be rebooted.  Information on the circuit is in the file.

Download: [relay.c](relay.c)


hosts_make
==========

On my network, I like to run Linux.  Many other people favor Windows.  I
run samba and can share files with them easily.  However, it is not as easy
to find their computers, since they are given different IP addresses often
with DHCP.  I could manually use `nmblookup` to find the IP addresses, but
that gets old fast.

I wrote this script to automatically generate the `/etc/hosts` file every half hour or so.  Just add a line in your `crontab` file (or `/etc/cron.d` or wherever your system has it) and have root run this script.  Pipe the results to `/etc/hosts` and your worries should basically be over.

I understand that there are going to be modules for resolving names in the future, and there will be a samba module.  However, until Debian ships with that in 'stable,' I will just use this simple script.

Download: [hosts_make](hosts_make)


Automated Client Backups
========================

Windows (we used 2000, but others will work fine) batch file and program to copy files from a remote computer to the local one.

We needed our workstations to synchronize their files to the main server on a daily basis.  That way, if a workstation died, the server had a backup of their files.  We tried setting up jobs on everyone's computer, but that was tedious, broke often, and just "felt wrong" to do it that way.  Instead, now the server will go out to everyone's machine and copy files to a local folder.  That way, if the client computer is off or at a different location (e.g. laptops), it just skips that one for the day.

Only the changes are copied so that the amount of network bandwidth used is minimal.  The backups are performed serially, because parallel backups are much harder to write and they consume more bandwidth.

You edit the batch file, which calls itself numerous times, once per directory (and all subdirectories) that you want to backup.  Avoid backing up the main directory, since you can usually just say to backup the My Documents and other specific folders as needed.  Comments are in the batch file that explain how to add other shares and set new exclusions.  It also comes with a copy of `fsync` to be complete.

Once you run the batch file, you can check the various log files to see if it works.  Once it works, set it up as a daily job (or hourly, if needed) and make sure the user it runs at has permission to everyone's shares and files.  On a domain, you can just create a special admin account.  On a workgroup, you need to create an account on every machine.

Download: [backups.zip](backups.zip)


Patcher
=======

Need to distribute very small changes in binary files?  This set of DOS/Linux tools will help you out.  One program makes a special file describing the changes to make, and the other applies the changes.

This is not good for large changes, or where you recompile a program.  It is only good for tiny changes, like the ones you would make with a hex editor, and you want to distribute the changes to people who don't have a hex editor available.

Download: [patcher.zip](patcher.zip)


Creates Itself?
===============

The challenge:  Create a program that will generate its own source code.  Difficult, but certainly not impossible.  I wrote this one in C.

Download: [creates_own_code.tgz](creates_own_code.tgz)
