#!/usr/bin/perl

while ($line = <STDIN>)
{
    $line = $1 if ($line =~ /^([^ ]+) /);
    $line = lc($line);
    $line = ucfirst($line);
    print $line . "\n";
}