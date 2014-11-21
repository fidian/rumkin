#!/usr/bin/perl

$ShowLasts = 0;
$ShowFirsts = 0;

while (! eof(STDIN))
{
    $Line = <STDIN>;
    chomp($Line);
    foreach $w (split(/ /, $Line))
    {
	$w = $1 while ($w =~ /^(.*)[\)\.,\-\?\!]$/);
	$w = $1 while ($w =~ /^[\(](.*)$/);
	print $w . "\n";
	if ($ShowLasts)
	{
	    $w =~ /(.)$/;
	    $Lasts{$1} ++;
	}
	if ($ShowFirsts)
	{
	    $w =~ /^(.)/;
	    $Firsts{$1} ++;
	}
    }
}



if ($ShowLasts)
{
    print "lasts:\n";
    foreach $l (keys(%Lasts))
    {
	print $l . "\n";
    }
}

if ($ShowFirsts)
{
    print "firsts:\n";
    foreach $l (keys(%Firsts))
    {
	print $l . "\n";
    }
}