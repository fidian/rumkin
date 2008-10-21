<?PHP

/* Format of array:
 *
 * $dblist is an array of databases to generate.  The key of the array
 * is the database name.
 * $dblist = array('English' => $db1, 'Riddles' => $db2, ...);
 *
 * Each database is an array of elements that describe the database.
 * 'English' => array('key' => 'data', ...);
 *   Key          Description
 *   -----------  -----------------------------------------------------------
 *   category     What category this database falls into.  One of 'language',
 *                'misc', 'names'
 *   generate     Array that describes the various Palm databases to generate
 *   multiple     Whether or not to generate multiple entries at once.  Used
 *                for wordlists and names.  Defaults to false.
 *   source       The web site I got the data from
 *   desc         The description of the data
 *
 * The Generate data is one array for each type of generation method.  Only
 * one method is requried, but you can define all three if you like.
 *   Key          Description
 *   -----------  -----------------------------------------------------------
 *   letter pair  Builds words by selecting a pair of letters, then adds
 *                more letters on until the word is complete
 *   pick one     Selects one item from a list
 *   psr          Phrase structure rule
 *
 * Letter pair
 *   Key          Description
 *   -----------  -----------------------------------------------------------
 *   pdb          The name of the PDB file to write that does not contain
 *                chance data.  (not suggested unless you get a very small
 *                wordlist or one that is very skewed)
 *   pdb name     The name of the database, if it shouldn't be named what the
 *                database definition was named (e.g. 'English', 'Riddles')
 *                [optional]
 *   pdb_c        As per 'pdb', but with chance data
 *   pdb_c name   As per 'pdb name', but for the database with chance data
 *   data         The wordlist to use.
 *   cache        Where to write the cached data for other web-based tools.
 *                This is because parsing the file takes so VERY long.
 *   lowercase    Should the words be first turned into lowercase letters?
 *                Defaults to false.  [Optional]
 *
 * Letter pair data
 *   The 'data' file should be only a list of words.  Duplicates should
 *   have been removed prior to loading the file.  Comments are not allowed.
 *
 * Pick one
 *   Key          Description
 *   -----------  -----------------------------------------------------------
 *   pdb          The name of the file to save the database as
 *   pdb name     The name of the database if it should not be named the
 *                same as the database definition (e.g. 'English', 'Riddles')
 *                [optional]
 *   data         The filename to get the data from.
 *   include      Should the 'data' file be included from PHP?  Defaults
 *                to 'false'.  If so, 'data' is a relative path from the
 *                raw_data media directory.
 *
 * Pick one data
 *   The data file can be in one of two formats.  The easiest format is
 *   a simple text file, where each line is a different item.  If you want
 *   multiple lines or some paragraphs, you will need to make an include
 *   file, like how Riddles does it.
 *
 * PSR
 *   Key          Description
 *   -----------  -----------------------------------------------------------
 *   pdb          The name of the file to save the database as
 *   pdb name     The name of the database if it should not be named the
 *                same as the database definition (e.g. 'English', 'Riddles')
 *                [optional]
 *   data	  The filename to get the data from
 *
 * PSR data
 *   This is a text file, with each line being a different entry.  For a
 *   full description of the format, see the Elvish Names database.
 */
 

$dblist = array(
   'American English' => array(
      'category' => 'language',
      'generate' => array(
         'letter pair' => array(
	    'pdb_c' => 'english.pdb',
	    'data' => '/usr/share/dict/american-english',
	    'cache' => 'english.inc',
	    'lowercase' => true,
	 ),
      ),
      'multiple' => true,
      'source' => 'http://packages.debian.org/stable/text/wenglish.html',
      'desc' => 'From the Debian package "wenglish"'
   ),
   'British English' => array(
      'category' => 'language',
      'generate' => array(
         'letter pair' => array(
	    'pdb_c' => 'british.pdb',
	    'data' => '/usr/share/dict/british-english',
	    'cache' => 'british.inc',
	    'lowercase' => true,
	 ),
      ),
      'multiple' => true,
      'source' => 'http://packages.debian.org/stable/text/wbritish.html',
      'desc' => 'From the Debian package "wbritish"'
   ),
   'Business Names' => array(
      'category' => 'misc',
      'generate' => array(
         'pick one' => array(
	    'pdb' => 'business.pdb',
	    'data' => 'business.txt',
	 ),
      ),
      'source' => '',
      'desc' => 'From the Net Book of Names, List of Businesses'
   ),
   'Catalan' => array(
      'category' => 'language',
      'generate' => array(
         'letter pair' => array(
	    'pdb_c' => 'catalan.pdb',
	    'data' => '/usr/share/dict/catala',
	    'cache' => 'catalan.inc',
	    'lowercase' => true,
	 ),
      ),
      'multiple' => true,
      'source' => 'http://packages.debian.org/stable/text/wcatalan.html',
      'desc' => 'From the Debian package "wcatalan"'
   ),
   'Critical Hit' => array(
      'category' => 'misc',
      'generate' => array(
         'psr' => array(
	    'pdb' => 'crit_hit.pdb',
	    'data' => 'crit_hit.psr',
	 ),
      ),
      'multiple' => false,
      'source' => 'http://dndadventure.com/dnda_optional_rules.html',
      'desc' => 'Used with permission from D&D Adventures'
   ),
   'Danish' => array(
      'category' => 'language',
      'generate' => array(
         'letter pair' => array(
	    'pdb_c' => 'danish.pdb',
	    'data' => '/usr/share/dict/danish',
	    'cache' => 'danish.inc',
	    'lowercase' => true,
	 ),
      ),
      'multiple' => true,
      'source' => 'http://packages.debian.org/stable/text/wdanish.html',
      'desc' => 'From the Debian package "wdanish"'
   ),
   'Dutch' => array(
      'category' => 'language',
      'generate' => array(
         'letter pair' => array(
	    'pdb_c' => 'dutch.pdb',
	    'data' => '/usr/share/dict/dutch',
	    'cache' => 'dutch.inc',
	    'lowercase' => true,
	 ),
      ),
      'multiple' => true,
      'source' => 'http://packages.debian.org/stable/text/wdutch.html',
      'desc' => 'From the Debian package "wdutch"'
   ),
   'Elvish Names' => array(
      'category' => 'names',
      'generate' => array(
         'psr' => array(
	    'pdb' => 'elf_names.pdb',
	    'data' => 'elvish_names.psr',
	 ),
      ),
      'multiple' => true,
      'source' => 'http://www.kanga.nu/archives/MUD-Dev-L/1997Q2/msg01379.php',
      'desc' => 'From Martin Keegan, posted to the MUD-Devel mailing list'
   ),
   'Fantasy Names' => array(
      'category' => 'names',
      'generate' => array(
         'pick one' => array(
	    'pdb' => 'fantnames.pdb',
	    'data' => 'names.txt',
	 ),
         'letter pair' => array(
	    'pdb_c' => 'fantna_c.pdb',
	    'pdb_c name' => 'Fantasy Names [gen]',
	    'data' => 'names.txt',
	    'cache' => 'fantna_c.inc',
	    'lowercase' => true,
	 ),
      ),
      'multiple' => true,
      'source' => 'http://www.miniworld.com/adnd/',
      'desc' => 'Used with permission from Joseph DuBois (Scooby)'
   ),
   'Faroese' => array(
      'category' => 'language',
      'generate' => array(
         'letter pair' => array(
	    'pdb_c' => 'faroese.pdb',
	    'data' => '/usr/share/dict/faroese',
	    'cache' => 'faroese.inc',
	    'lowercase' => true,
	 ),
      ),
      'multiple' => true,
      'source' => 'http://packages.debian.org/stable/text/wfaroese.html',
      'desc' => 'From the Debian package "wfaroese"'
   ),
   'Finnish' => array(
      'category' => 'language',
      'generate' => array(
         'letter pair' => array(
	    'pdb_c' => 'finnish.pdb',
	    'data' => '/usr/share/dict/finnish',
	    'cache' => 'finnish.inc',
	    'lowercase' => true,
	 ),
      ),
      'multiple' => true,
      'source' => 'http://packages.debian.org/stable/text/wfinnish.html',
      'desc' => 'From the Debian package "wfinnish"'
   ),
   'French' => array(
      'category' => 'language',
      'generate' => array(
         'letter pair' => array(
	    'pdb_c' => 'french.pdb',
	    'data' => '/usr/share/dict/french',
	    'cache' => 'french.inc',
	    'lowercase' => true,
	 ),
      ),
      'multiple' => true,
      'source' => 'http://packages.debian.org/stable/text/wfrench.html',
      'desc' => 'From the Debian package "wfrench"'
   ),
   'Fumble' => array(
      'category' => 'misc',
      'generate' => array(
         'psr' => array(
	    'pdb' => 'crit_miss.pdb',
	    'data' => 'crit_miss.psr',
	 ),
      ),
      'multiple' => false,
      'source' => 'http://dndadventure.com/dnda_optional_rules.html',
      'desc' => 'Used with permission from D&D Adventures'
   ),
   'Gems' => array(
      'category' => 'misc',
      'generate' => array(
         'psr' => array(
	    'pdb' => 'gems.pdb',
	    'data' => 'gems.psr',
	 ),
      ),
      'multiple' => false,
      'source' => 'http://www.systemreferencedocuments.org/index.htm?35/wotc.htm',
      'desc' => 'One random gem description per gem type.'
   ),
   'German (New)' => array(
      'category' => 'language',
      'generate' => array(
         'letter pair' => array(
	    'pdb_c' => 'ngerman.pdb',
	    'data' => '/usr/share/dict/ngerman',
	    'cache' => 'ngerman.inc',
	    'lowercase' => true,
	 ),
      ),
      'multiple' => true,
      'source' => 'http://packages.debian.org/stable/text/wngerman.html',
      'desc' => 'From the Debian package "wngerman"'
   ),
   'German (Old)' => array(
      'category' => 'language',
      'generate' => array(
         'letter pair' => array(
	    'pdb_c' => 'german.pdb',
	    'data' => '/usr/share/dict/ogerman',
	    'cache' => 'german.inc',
	    'lowercase' => true,
	 ),
      ),
      'multiple' => true,
      'source' => 'http://packages.debian.org/stable/text/wgerman.html',
      'desc' => 'From the Debian package "wogerman"'
   ),
   'Hawaiian' => array(
      'category' => 'language',
      'generate' => array(
         'letter pair' => array(
	    'pdb_c' => 'hawaiian.pdb',
	    'data' => 'hawaiian',
	    'cache' => 'hawaiian.inc',
	    'lowercase' => true,
	 ),
      ),
      'multiple' => true,
      'source' => 'http://www.hawaii-nation.org/kahale-leka.html',
      'desc' => 'Created from a text by Laiana Wong'
   ),
   'Italian' => array(
      'category' => 'language',
      'generate' => array(
         'letter pair' => array(
	    'pdb_c' => 'italian.pdb',
	    'data' => '/usr/share/dict/italian',
	    'cache' => 'italian.inc',
	    'lowercase' => true,
	 ),
      ),
      'multiple' => true,
      'source' => 'http://packages.debian.org/stable/text/witalian.html',
      'desc' => 'From the Debian package "witalian"'
   ),
   'Magic Items' => array(
      'category' => 'misc',
      'generate' => array(
         'psr' => array(
	    'pdb' => 'magic_items.pdb',
	    'data' => 'magic_items.psr',
	 ),
      ),
      'multiple' => false,
      'source' => 'http://www.d20srd.org/indexes/magicItems.htm',
      'desc' => 'A fairly decent magic item generator.  Results should ' .
         'still be checked for mismatched attributes, such as a dancing ' .
	 'bow or a sap of wounding.',
   ),
   'Mundane Items' => array(
      'category' => 'misc',
      'generate' => array(
         'psr' => array(
	    'pdb' => 'mundane.pdb',
	    'data' => 'mundane.psr',
	 ),
      ),
      'multiple' => true,
      'source' => 'http://www.d20srd.org/srd/treasure.htm',
      'desc' => 'Generates several mundane items for treasure.'
   ),
   'Norwegian (bokm' . chr(0xE5) . 'l)' => array(
      'category' => 'language',
      'generate' => array(
         'letter pair' => array(
	    'pdb_c' => 'bokmal.pdb',
	    'data' => '/usr/share/dict/bokm' . chr(0xE5) . 'l',
	    'cache' => 'bokmal.inc',
	    'lowercase' => true,
	 ),
      ),
      'multiple' => true,
      'source' => 'http://packages.debian.org/stable/text/wnorwegian.html',
      'desc' => 'From the Debian package "wnorwegian"'
   ),
   'Norwegian (nynorsk)' => array(
      'category' => 'language',
      'generate' => array(
         'letter pair' => array(
	    'pdb_c' => 'nynorsk.pdb',
	    'data' => '/usr/share/dict/nynorsk',
	    'cache' => 'nynorsk.inc',
	    'lowercase' => true,
	 ),
      ),
      'multiple' => true,
      'source' => 'http://packages.debian.org/stable/text/wnorwegian.html',
      'desc' => 'From the Debian package "wnorwegian"'
   ),
   'Polish' => array(
      'category' => 'language',
      'generate' => array(
         'letter pair' => array(
	    'pdb_c' => 'polish.pdb',
	    'data' => 'polish.txt',
	    'cache' => 'polish.inc',
	    'lowercase' => true,
	 ),
      ),
      'multiple' => true,
      'source' => 'http://wordlists.cjb.net/',
      'desc' => 'From the Polish wordlist'
   ),
   'Riddles' => array(
      'category' => 'misc',
      'generate' => array(
         'pick one' => array(
	    'pdb' => 'riddles.pdb',
	    'data' => 'riddles.inc',
	    'include' => true,
	 ),
      ),
      'source' => '',
      'desc' => 'From the net.book.riddles'
   ),
   'Spanish' => array(
      'category' => 'language',
      'generate' => array(
         'letter pair' => array(
	    'pdb_c' => 'spanish.pdb',
	    'data' => '/usr/share/dict/spanish',
	    'cache' => 'spanish.inc',
	    'lowercase' => true,
	 ),
      ),
      'multiple' => true,
      'source' => 'http://packages.debian.org/stable/text/wspanish.html',
      'desc' => 'From the Debian package "wspanish"'
   ),
   'Swedish' => array(
      'category' => 'language',
      'generate' => array(
         'letter pair' => array(
	    'pdb_c' => 'swedish.pdb',
	    'data' => '/usr/share/dict/swedish',
	    'cache' => 'swedish.inc',
	    'lowercase' => true,
	 ),
      ),
      'multiple' => true,
      'source' => 'http://packages.debian.org/stable/text/wswedish.html',
      'desc' => 'From the Debian package "wswedish"'
   ),
   'US Female First Names' => array(
      'category' => 'names',
      'generate' => array(
         'pick one' => array(
	    'pdb' => 'us_female.pdb',
	    'data' => 'census.female.first',
         ),
	 'letter pair' => array(
	    'pdb_c' => 'us_female_g.pdb',
	    'pdb_c name' => 'US Female First Names [gen]',
	    'data' => 'census.female.first',
	    'cache' => 'us_female_g.inc',
	    'lowercase' => true,
	 ),
      ),
      'multiple' => true,
      'source' => 'http://www.census.gov/genealogy/names/',
      'desc' => 'Names are from the 1990 U.S. Census'
   ),
   'US Male First Names' => array(
      'category' => 'names',
      'generate' => array(
         'pick one' => array(
	    'pdb' => 'us_male.pdb',
	    'data' => 'census.male.first',
	 ),
	 'letter pair' => array(
	    'pdb_c' => 'us_male_g.pdb',
	    'pdb_c name' => 'US Male First Names [gen]',
	    'data' => 'census.male.first',
	    'cache' => 'us_male_g.inc',
	    'lowercase' => true,
	 ),
      ),
      'multiple' => true,
      'source' => 'http://www.census.gov/genealogy/names/',
      'desc' => 'Names are from the 1990 U.S. Census'
   ),
   'US Last Names' => array(
      'category' => 'names',
      'generate' => array(
         'letter pair' => array(
	    'pdb_c' => 'us_last.pdb',
	    'data' => 'census.all.last',
	    'cache' => 'us_last.inc',
	    'lowercase' => true,
	 ),
      ),
      'multiple' => true,
      'source' => 'http://www.census.gov/genealogy/names/',
      'desc' => 'Names are from the 1990 U.S. Census'
   ),
   'Wild Surge' => array(
      'category' => 'misc',
      'generate' => array(
         'pick one' => array(
	    'pdb' => 'wildsurge.pdb',
	    'data' => 'wildsurge.txt',
	 ),
      ),
      'source' => 'http://www.miniworld.com/adnd/surge.html',
      'desc' => 'Used with permission from Joseph DuBois (Scooby)'
   ),
   'Wild Surge Fumble' => array(
      'category' => 'misc',
      'generate' => array(
         'pick one' => array(
	    'pdb' => 'wildsurgefumble.pdb',
	    'data' => 'wildsurgefumble.txt',
	 ),
      ),
      'source' => 'http://www.miniworld.com/adnd/surge.html',
      'desc' => 'Used with permission from Joseph DuBois (Scooby)'
   ),
);
