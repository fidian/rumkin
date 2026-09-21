---
title: Perl Mirror Script
summary: Perl program to mirror a set of directories with a list of exclusions.
---

Yes, I know that there are other tools out there, and I am especially aware of `rsync`, but there was a need for a PERL-based mirror tool.  I wrote one that only copies the file if the size is different or the source timestamp is newer than the destination timestamp.  It works extra-well if it is copying to/from the same filesystem or when the filesystems have the same time.

Download it as [mirror.pl.txt](mirror.pl.txt) and you'll likely want to save it as `mirror.pl`.  It requires the PERL module `File::Copy`.  Open up `mirror.pl` and make sure that the `$Source` and `$Dest` parameters are set up.
