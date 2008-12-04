<?php

require '../../functions.inc';

if (isset($_POST) && get_magic_quotes_gpc()) {
	foreach ($_POST as $k => $v) {
		$_POST[$k] = stripslashes($v);
	}
}

StandardHeader(array(
		'title' => 'Rumkin Trivia',
		'topic' => 'trivia'
	));
$dbconn = OpenDBConnection('Trivia');

if (isset($category)) {
	echo "<p>Back to the <a href=index.php>Category List</a></p>\n";
	TriviaCategory($category, $dbconn);
} else {
	TriviaIntro();
	TriviaIndex($dbconn);
	TriviaRecent($dbconn);
}

StandardFooter();


function TriviaIntro() {
	
	?>

<p>This trivia was found out on the ever-inaccurate internet.  I have tried
to verify questionable facts and update old ones, but sometimes incorrect
facts still sneak through.  If you have corrections or other interesting
trivia that you want to see here, just email me (link at the bottom of the
page).  The whole reason I'm putting the trivia up on my web page is to keep
an archive of the trivia that goes on the whiteboard at my work.</p>

<?php
}


function TriviaIndex($dbconn) {
	$sql = 'select category.id as id, category.category as category ' . 'from category order by category asc';
	$result = mysql_query($sql, $dbconn);
	
	if (! $result) {
		echo mysql_error();
		return;
	}
	
	$Categories = array();
	$Categories[0] = array();
	$Categories[0]['name'] = 'Unfiled Trivia';
	$res2 = mysql_query('select count(*) from trivia', $dbconn);
	$line2 = mysql_fetch_array($res2);
	$Categories[0]['count'] = $line2[0];
	mysql_free_result($res2);
	
	while ($line = mysql_fetch_assoc($result)) {
		$Categories[$line['id']] = array();
		$Categories[$line['id']]['name'] = $line['category'];
		$res2 = mysql_query('select count(*) from trivia where category = ' . $line['id'], $dbconn);
		$line2 = mysql_fetch_array($res2);
		$Categories[$line['id']]['count'] = $line2[0];
		$Categories[0]['count'] -= $line2[0];
		mysql_free_result($res2);
	}
	
	mysql_free_result($result);
	Section('Categories');
	echo "<ul>\n";
	$CatByName = array();
	
	foreach ($Categories as $k => $v) {
		if ($k != 0)$CatByName[$v['name']] = $k;
	}
	
	ksort($CatByName);
	
	foreach ($CatByName as $name => $catid) {
		echo '<li><a href="index.php?category=' . $catid . '">' . $name . '</a> (' . $Categories[$catid]['count'] . ")\n";
	}
	
	echo '<li><a href="index.php?category=0">' . $Categories[0]['name'] . '</a> (' . $Categories[0]['count'] . ")</li>\n";
	echo "</ul>\n";
}


function TriviaRecent($dbconn) {
	$sql = 'select date, info, quote from trivia order by date desc limit 25';
	$result = mysql_query($sql, $dbconn);
	
	if (! $result) {
		echo mysql_error();
		return;
	}
	
	Section('Recent Trivia');
	DumpTriviaList($result);
}


function TriviaCategory($category, $dbconn) {
	if ($category == 0) {
		$catname = 'Unfiled';
	} else {
		$result = mysql_query('select category from category where id = ' . $category, $dbconn);
		
		if (! $result) {
			echo mysql_error();
			return;
		}
		
		if (! ($line = mysql_fetch_assoc($result))) {
			$catname = 'Unfiled';
			$category = 0;
		} else {
			$catname = $line['category'];
		}
		
		mysql_free_result($result);
	}
	
	$sql = 'select date, info, quote from trivia ';
	
	if ($category == 0) {
		$sql .= 'left join category on trivia.category = category.id ' . 'where category.id is null';
	} else {
		$sql .= 'where category = ' . $category;
	}
	
	$sql .= ' order by date desc';
	$result = mysql_query($sql, $dbconn);
	
	if (! $result) {
		echo mysql_error();
		return;
	}
	
	Section(htmlspecialchars($catname));
	DumpTriviaList($result);
}


function DumpTriviaList($result) {
	echo "<ul>\n";
	$cats = false;
	
	while ($line = mysql_fetch_assoc($result)) {
		$cats = true;
		echo '<li><b>' . $line['date'] . '</b>:  ' . $line['info'];
		
		if ($line['quote'] != '') {
			echo '<br><i>-- ' . $line['quote'] . '</i>';
		}
		
		echo "\n";
	}
	
	mysql_free_result($result);
	
	if ($cats == false) {
		echo "<li>There is no trivia in this category.</li>\n";
	}
	
	echo "</ul>\n";
}


function AddCategory($dbconn) {
	echo '<form method=post action=edit.php>';
	echo '<input type=hidden name=action value="add_category2">';
	echo 'Category Name:  <input type=text name=category><br>';
	echo '<input type=submit value="Create Category">';
	echo "</form>\n";
}


function AddCategory2($dbconn) {
	if (! isset($_POST['category']) || $_POST['category'] == '') {
		echo 'Category name invalid';
		return;
	}
	
	$sql = 'insert into category (category) values (\'' . addslashes($_POST['category']) . '\')';
	$result = mysql_query($sql, $dbconn);
	
	if ($result) {
		echo 'Category created';
	} else {
		echo 'Problem creating category.';
	}
}


function EditTrivia($category, $dbconn, $id) {
	if ($id != 0) {
		$result = mysql_query('select date, category, info, quote ' . 'from trivia where id = ' . $id, $dbconn);
		
		if (! $result) {
			echo mysql_error();
			return;
		}
		
		if (! ($line = mysql_fetch_assoc($result))) {
			$id = 0;
		} else {
			$category = $line['category'];
			$date = $line['date'];
			$info = $line['info'];
			$quote = $line['quote'];
			Section('Edit Trivia');
		}
		
		mysql_free_result($result);
	}
	
	if ($id == 0) {
		$date = date('Y-m-d');
		$info = '';
		$quote = '';
		Section('Add Trivia');
	}
	
	echo "<form method=post action=edit.php>\n";
	echo "<input type=hidden name=action value=\"save_trivia\">\n";
	echo "<input type=hidden name=id value=\"$id\">\n";
	echo "Date:  <input type=text name=date value=\"$date\" size=12><br>\n";
	echo "Category:  <select name=category>\n";
	echo "<option value=0>Unfiled</option>\n";
	$sql = 'select id, category from category order by category asc';
	$result = mysql_query($sql, $dbconn);
	
	while ($line = mysql_fetch_assoc($result)) {
		echo '<option value=' . $line['id'];
		
		if ($category == $line['id'])echo ' SELECTED';
		echo '>' . $line['category'] . "\n";
	}
	
	mysql_free_result($result);
	echo "</select><br>\n";
	echo "<br>\n";
	echo 'Trivia:<br><textarea name=trivia rows=5 cols=80 wrap=virtual>';
	echo htmlspecialchars($info);
	echo '</textarea><br>';
	echo "Quote:  <input type=text name=quote value=\"$quote\" size=55>\n";
	echo "<br>\n";
	
	if ($id == 0) {
		echo "<input type=submit value=\"Add Trivia\">\n";
	} else {
		echo "<input type=submit value=\"Save Changes\">\n";
	}
	
	echo "</form>\n";
}


function SaveTrivia($dbconn) {
	if (! isset($_POST['id']) || ! isset($_POST['date']) || ! isset($_POST['category']) || ! isset($_POST['trivia']) || ! isset($_POST['quote'])) {
		echo 'Bad submission.';
		return;
	}
	
	if ($_POST['id'] == 0) {
		// Add
		$sql = 'insert into trivia (date, category, info, quote) ' . 'values (\'' . $_POST['date'] . '\', ' . $_POST['category'] . ', \'' . addslashes($_POST['trivia']) . '\', \'' . addslashes($_POST['quote']) . '\')';
		
		if (! mysql_query($sql, $dbconn)) {
			echo mysql_error();
			return;
		}
		
		echo 'Trivia added.';
		return;
	}
	
	// Update
	$sql = 'update trivia set date = \'' . $_POST['date'] . '\', category = ' . $_POST['category'] . ', info = \'' . addslashes($_POST['trivia']) . '\', quote = \'' . addslashes($_POST['quote']) . '\' where id = ' . $_POST['id'];
	
	if (! mysql_query($sql, $dbconn)) {
		echo mysql_error();
		return;
	}
	
	echo 'Trivia updated.';
	return;
}

