<?php

require '../../functions.inc';
require 'movies.php';
StandardHeader(array(
		'title' => 'DVD List',
		'header' => 'DVDs that Sarah and Tyler Own',
		'topic' => 'dvd',
		'callback' => 'insert_js'
	));

?>

<p>Welcome to our movie list.  It is placed here so that people know what we
own if they want to borrow a movie.  We also have a "wanted" category in case
you want to add to our collection.</p>

<div id='movielist'><?php


// This is shown for browsers without any cool javascript
echo "<ul>\n";

foreach ($GLOBALS['Movies'] as $k => $v) {
	echo "<li>$k</li>\n";
}

echo "</ul>\n";

?></div>

<?php

StandardFooter();


function insert_js() {
	echo '<scr';  // Gotta break it up ?>ipt language="JavaScript">
var Movies = [
<?php
	
	$tagMap = array(
		'scifi' => 'Sci-Fi',
	);
	$addComma = false;
	
	foreach ($GLOBALS['Movies'] as $Title => $Info) {
		if ($addComma) {
			echo ",\n";
		} else {
			$addComma = true;
		}
		
		// title and tags are mandatory
		echo '{\'title\': \'' . addslashes($Title) . '\', \'tags\': [';
		$tags = explode(' ', $Info['tags']);
		
		foreach ($tags as $k => $tag) {
			if (isset($tagMap[$tag])) {
				$tag = $tagMap[$tag];
			} else {
				$tag = str_replace('_', ' ', $tag);
				$tag = ucwords($tag);
			}
			
			$tag = '\'' . addslashes($tag) . '\'';
			$tags[$k] = $tag;
		}
		
		echo implode(', ', $tags) . ']';
		
		if (isset($Info['image'])) {
			echo ', \'image\': \'' . addslashes($Info['image']) . '\'';
		}
		
		if (isset($Info['imdb'])) {
			echo ', \'imdb\': \'' . addslashes($Info['imdb']) . '\'';
		}
		
		if (isset($Info['attrs'])) {
			echo ', \'attrs\': [';
			$attrs = explode(' ', $Info['attrs']);
			
			foreach ($attrs as $k => $attr) {
				$attrs[$k] = '\'' . addslashes($attr) . '\'';
			}
			
			echo implode(', ', $attrs) . ']';
		}
		
		if (isset($Info['notes'])) {
			echo ', \'notes\': \'' . addslashes($Info['notes']) . '\'';
		}
		
		echo '}';
	}
	
	echo "\n];\n";
	
	?>
var MovieTags = new Array();
MovieTags['All'] = new Array();

for (var m in Movies) {
	for (var t in Movies[m].tags) {
		if (Movies[m].tags[t] == 'Wanted') {
			Movies[m].wanted = 1;
		}
	}
	if (! Movies[m].wanted) {
		MovieTags['All'].push(Movies[m]);
	}
}

for (var m in Movies) {
	for (var t in Movies[m].tags) {
		var tag = Movies[m].tags[t];
		if (! Movies[m].wanted || tag == 'Wanted') {
			if (! MovieTags[tag]) {
				MovieTags[tag] = new Array();
			}
			MovieTags[tag].push(Movies[m])
		}
	}
}

function SetTagSelector(t) {
	var e = document.getElementById('tag_name');
	if (! e || e.value == t) {
		return;
	}

	for (idx in e.options) {
		if (e.options[idx].value == t) {
			e.selectedIndex = idx;
			return;
		}
	}
}

function ShowMovie(movie) {
	var html = '<li><div class="title">';
	if (movie.imdb) {
		html += '<a href="http://imdb.com/title/' + movie.imdb + '/">' + movie.title + '</a>';
	} else {
		html += movie.title;
	}
	html += '</div><div>';
	if (movie.image) {
		html += '<img src="media/' + movie.image + '">';
	} else {
		html += '(No<br>Image<br>Available)';
	}
	html += '</div>';
	if (movie.attrs) {
		html += '<div class="attrs">';
		var isFirst = 1;
		for (a in movie.attrs) {
			if (isFirst) {
				isFirst = 0;
			} else {
				html += ' - ';
			}
			if (movie.attrs[a] == 'directors_cut') {
				html += "Director's cut";
			} else if (movie.attrs[a] == 'multi_pack') {
				html += "Part of a multi-pack";
			} else if (movie.attrs[a] == 'unrated') {
				html += 'Unrated';
			} else if (movie.attrs[a] == 'special_edition') {
				html += 'Special Edition';
			}
		}
		html += '</div>';
	}
	html += '<div class="tags">';
	var tags = movie.tags.sort();
	var needComma = 0;
	for (ti in tags) {
		if (needComma ++) {
			html += ', ';
		}
		html += '<a href="#" onclick="ShowMovieTag(';
		html += "'" + tags[ti] + "'";
		html += '); return false">' + tags[ti] + '</a>';
	}
	html += '</div>';
	if (movie.notes) {
		html += '<div class="notes">' + movie.notes + '</div>';
	}
	html += '</li>';
	return html;
}

function ShowMovieTag(t) {
	if (! MovieTags[t]) {
		alert("Bad movie tag:\n" + t);
	}

	SetTagSelector(t);

	var html = '<ul class="movieList">';
	for (m in MovieTags[t]) {
		html += ShowMovie(MovieTags[t][m]);
	}
	html += '</ul>';
	var e = document.getElementById('movielist_list');
	if (e) {
		e.innerHTML = html;
	}
}

function ShowMovieList() {
	var e = document.getElementById('movielist');
	if (! e) {
		window.setTimeout(ShowMovieList, 100);
		return;
	}
	var opt = new Array();
	for (var t in MovieTags) {
		opt.push(t);
	}
	opt = opt.sort();
	var html = '<b>Select a category:</b> <select id="tag_name" name="tag_name" onchange="ShowMovieTag(this.value)">';
	html += '<option value="All" SELECTED>All Movies ('
			html += MovieTags['All'].length + ')</option>';
	for (var o in opt) {
		if (opt[o] != 'All') {
			html += '<option value="' + opt[o] + '">' + opt[o] + ' (';
					html += MovieTags[opt[o]].length + ')</option>';
		}
	}
	html += '</select>';
	html += '<div id="movielist_list"></div>';
	e.innerHTML = html;

	ShowMovieTag('All');
}

ShowMovieList();

</script>
<style type="text/css">
.movieList {
	display: inline-block;
	background: #f8f8f8;
	border: 1px solid #999;
	padding: 15px 0px 0 0px;
	margin: 0;
	text-align: center;
}
.movieList li {
	display: -moz-inline-box;  /* Firefox 2.x */
	-moz-box-orient: vertical;  /* Firefox 2.x */
	display: inline-block;  /* Op, Saf, IE */
	vertical-align: top;  /* Avoids creating whitespace above box in IE on Mac */
	margin: 0 7px 15px 7px;
	padding: 0;
	width: 160px;
}
.movieList div {
	text-align: center;
}
.movieList .title {
	font-weight: bold;
	font-variant: small-caps;
	font-size: 0.8em;
}
.movieList .title a {
	text-decoration: none;
}
.movieList .tags {
	font-size: 0.6em;
}
.movieList .attrs {
	font-size: 0.75em;
}
.movieList .notes {
	font-size: 0.75em;
}
</style>
<!--[if lt IE 8]><style>
.thumbwrap li, .thumbwrap {
display: inline;
_height: 0;
}
</style><![endif]-->
<?php
}

