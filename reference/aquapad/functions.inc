<?PHP

include '../../functions.inc';


function AquaStart($Title = '')
{
   $Header = $Title;
   if ($Title == '')
   {
      $Title = 'AquaPad';
      $Header = 'AquaPad';
   }
   else
      $Title = 'AquaPad:  ' . $Title;
      
   StandardHeader(array('title' => $Title,
                        'header' => $Header,
			'topic' => 'aquapad'));
}

function AquaStop()
{
   StandardFooter();
}

function l($URL, $Desc = '')
{
   if ($Desc == '')
      $Desc = $URL;
   return '<a href="' . $URL . '">' . htmlspecialchars($Desc) . '</a>';
}



function Title($Title)
{
   echo '<h3><u>' . htmlspecialchars($Title) . "</u></h3>\n";
}