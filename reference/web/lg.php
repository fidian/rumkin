<?PHP

include '../../functions.inc';

StandardHeader(array('title' => 'LifeGenesis',
		     'callback' => 'lg_javascript',
		     'topic' => 'web'));

?>

<p>This is a display based on Conway's game of life / cellular automata.  
It has very simple
rules.  Start with a board.  Then check each area.  If the area has no
current cell and there are three or more adjacent cells, a new cell is
created.  If the area has a cell and less than two or more than three
adjacent living cells, it dies (starvation / overpopulation).</p>

<p>This page starts with a smilie face and starts the process.  You can see
where new cells are created, when they die, etc.  Every few seconds a blob
of some sort is splattered onto the game board.  This should shake things up
by knocking around living stable structures and creating more nodes for
living clusters.</p>

<p>It also demonstrates how to use JavaScript to swap out images and create
animation of some sort.</p>

<table width=100%>
<tr><td width=25%>
<img src=media/lg-0.jpg> &lt;-- Empty
</td><td width=25%>
<img src=media/lg-1.jpg> &lt;-- New Cell
</td><td width=25%>
<img src=media/lg-2.jpg> &lt;-- Living Cell
</td><td width=25%>
<img src=media/lg-3.jpg> &lt;-- Dying Cell
</td></tr></table>
<br><br>

<table align=center>
<?PHP

for ($row = 0; $row < 10; $row ++)
{
   echo "<tr height=20>";
   for ($col = 0; $col < 10; $col ++)
   {
      echo "<td width=20><img src=\"media/lg-0.jpg\" name=\"i" . $row . "j" .
      	   $col . "\"></td>";
   }
   echo "</tr>\n";
}

?>
</table>
<script language="JavaScript"><!--
LG_StartUp();
// --></script>
<?PHP

StandardFooter();


function lg_javascript()
{
?>
<script language="JavaScript">
Cells = new Array(4);

Cells[0] = new Image();
Cells[1] = new Image();
Cells[2] = new Image();
Cells[3] = new Image();

Cells[0].src = "media/lg-0.jpg";  // empty
Cells[1].src = "media/lg-1.jpg";  // Just starting out
Cells[2].src = "media/lg-2.jpg";  // Living
Cells[3].src = "media/lg-3.jpg";  // Dying

LifeCycle = new Array(10);
LifeCycleNew = new Array(10);

for (i = 0; i < 10; i ++)
{
	LifeCycle[i] = new Array(10);
	LifeCycleNew[i] = new Array(10);
	for (j = 0; j < 10; j ++)
	{
		LifeCycle[i][j] = 0;
		LifeCycleNew[i][j] = 0;
	}
}

function LookUpCell(i, j)
{
	if (i < 0)
		return 0;
	if (j < 0)
		return 0;
	if (i > 9)
		return 0;
	if (j > 9)
		return 0;

	if (LifeCycle[i][j] >= 1 && LifeCycle[i][j] <= 2)
		return 1;
	return 0;
}

function Status (i, j)
{
	CellNum = LookUpCell(i-1, j-1);
	CellNum += LookUpCell(i-1, j);
	CellNum += LookUpCell(i-1, j+1);
	CellNum += LookUpCell(i, j-1);
	CellNum += LookUpCell(i, j+1);
	CellNum += LookUpCell(i+1, j-1);
	CellNum += LookUpCell(i+1, j);
	CellNum += LookUpCell(i+1, j+1);

	if (LookUpCell(i, j))
	{
		if (CellNum == 2 || CellNum == 3)
			return 2;  // Lasting
		else
			return 3;  // Dying
	}
	else
	{
		if (CellNum == 3)
			return 1;  // New
		else
			return 0;  // Empty
	}
}

// Eyes
LifeCycle[0][3] = 1;
LifeCycle[0][6] = 1;
LifeCycle[1][3] = 1;
LifeCycle[1][6] = 1;
LifeCycle[2][3] = 1;
LifeCycle[2][6] = 1;

// Smile
LifeCycle[5][1] = 1;
LifeCycle[5][8] = 1;
LifeCycle[6][1] = 1;
LifeCycle[6][8] = 1;
LifeCycle[7][1] = 1;
LifeCycle[7][2] = 1;
LifeCycle[7][7] = 1;
LifeCycle[7][8] = 1;
LifeCycle[8][2] = 1;
LifeCycle[8][3] = 1;
LifeCycle[8][4] = 1;
LifeCycle[8][5] = 1;
LifeCycle[8][6] = 1;
LifeCycle[8][7] = 1;

function DisplayBoard()
{
	for (i = 0; i < 10; i ++)
	{
		for (j = 0; j < 10; j ++)
		{
			name = "i" + i + "j" + j;
			lc = LifeCycle[i][j];

			if (lc < 0 || lc > 3)
			{
				LifeCycle[i][j] = 0;
				lc = 0;
			}

			document.images[name].src = Cells[lc].src;
		}
	}
}

function RandomSplat()
{
	i = Math.floor(Math.random() * 10);
	j = Math.floor(Math.random() * 10);
	LifeCycle[i][j] = 1;
	for (loop = 0; loop < 3; loop ++)
	{
		inew = i + Math.floor(Math.random() * 5) - 3;
		jnew = j + Math.floor(Math.random() * 5) - 3;
		if (inew > 0 && inew < 10 && jnew > 0 && jnew < 10)
		{
			LifeCycle[inew][jnew] = 1;
		}
	}
}

function LG_StartUp()
{
	DisplayBoard();
	Cycle = 0;
	setTimeout('DoWork()', 2000);
}

function DoWork()
{
	if (Cycle < 5)
	{
		Cycle ++;
	}
	else
	{
		Cycle = 0;
		RandomSplat();
	}
	for (i = 0; i < 10; i ++)
	{
		for (j = 0; j < 10; j++)
		{
			LifeCycleNew[i][j] = Status(i, j);
		}
	}

	for (i = 0; i < 10; i ++)
	{
		for (j = 0; j < 10; j++)
		{
			LifeCycle[i][j] = LifeCycleNew[i][j];
		}
	}

	DisplayBoard();

	setTimeout('DoWork()', 1000);
}

</script>
<?PHP
}
