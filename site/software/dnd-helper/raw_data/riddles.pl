#!/usr/bin/perl

open(IN, "riddles.txt"); # ASCII version of the netbook
open(OUT, "riddles.inc"); # PHP code

print OUT "<?PHP
  
// This file was created with the riddles.pl script
// To generate it again (to update it or whatnot), just download the newest
// riddles netbook in text format and save it as riddles.txt.  Then change
// to the riddles.pl directory and run the script.

";

$phase = 0;
$Entry = '';
while (! eof(IN)) {
    $Line = <IN>;
    chomp($Line);
    
    # Phase 0 = look for beginning of data
    if ($phase == 0) {
	if ($Line =~ /^=+/) {
	    $phase = 1;
	}
    }
    # Phase 1 = Find beginning of riddle
    elsif ($phase == 1) {
	if ($Line =~ /^Entry: +([0-9]+\.[0-9]+)$/) {
	    $Entry = $1;
	    $phase = 2;
	}
    }
    # Phase 2 = Riddle data
    elsif ($phase == 2) {
	if ($Line =~ /^Riddle:/) {
	    $phase = 3;
	} elsif ($Line =~ /^([^:]+): +([^ ].*[^ ]) *$/) {
	    $RawData{$Entry}{$1} = $2;
	}
    }
    # The riddle
    elsif ($phase == 3) {
	if ($Line =~ /^Entry: +([0-9]+\.[0-9]+)$/) {
	    $Entry = $1;
	    $phase = 2;
	} elsif ($Line =~ /^=+[\w]*/) {
	    $phase = 4;
	    $Entry = '';
	} else {
	    $RawData{$Entry}{'Riddle'} .= $Line . "\n";
	}
    }
    # Answers section
    elsif ($phase == 4) {
	if ($Line =~ /^ *([0-9]+\.[0-9]+) +(.*)$/) {
	    $Entry = $1;
	    if (exists($RawData{$Entry})) {
		$RawData{$Entry}{'Answer'} .= $2 . "\n";
	    }
	} else {
	    if (exists($RawData{$Entry})) {
		$RawData{$Entry}{'Answer'} .= $Line . "\n";
	    }
	}
    }
}

# Reformat
foreach $k (keys(%RawData)) {
    $Riddle = "";
    $RawData{$k}{'Riddle'} = ReformatString($RawData{$k}{'Riddle'}, "\n");
    if ($k eq '18.42') {
	$RawData{$k}{'Answer'} = ReformatString($RawData{$k}{'Answer'}, "\n");
	$RawData{$k}{'Answer'} =~ s/\n/ \/ /g;
    } elsif ($k eq '1.10') {
	$RawData{$k}{'Answer'} = ReformatString($RawData{$k}{'Answer'}, " ");
	$RawData{$k}{'Answer'} =~ s/^(.*) +Solved by .*$/$1/g;
    } else {
	$RawData{$k}{'Answer'} = ReformatString($RawData{$k}{'Answer'}, " ");
    }
}

# save
foreach $k (keys(%RawData)) {
    $riddle = $RawData{$k}{'Riddle'} . "\n\n" . "ANSWER:  " .
      $RawData{$k}{'Answer'} . "\n\n(Entry $k)";
    $riddle =~ s/([\\\"])/\\$1/g;
    $riddle =~ s/\n/\\n/mg;
    print OUT "\$R->AddEntry(\"$riddle\");\n";
}


sub ReformatString {
    local ($StrIn, $BetweenLines) = @_;
    local ($StrOut);
    
    $StrOut = '';
    foreach $l (split(/\n/, $StrIn)) {
	chomp($l);
	if ($l =~ /^[ \t]*([^ \t].*)$/) {
	    $l = $1;
	}
	if ($l =~ /^(.*[^ \t])[ \t]*$/) {
	    $l = $1;
	}
        if ($l ne "" || $StrOut ne "") {
	    $StrOut .= $l . $BetweenLines;
	}
    }
    chomp($StrOut);
    
    return $StrOut;
}