<?php
/*
  Weeble File Manager (c) Christopher Michaels & Jonathan Manna
  This software is released under the BSD License.  For a copy of
  the complete licensing agreement see the LICENSE file.
*/

  require_once ("settings.php");
  require_once ("tools/compat.php");
  require_once ("functions-ftp.php");
  require_once ("header.php");

  // check to see if someone is trying to access the preferences when allow_custom 
  // is turned off by the administrator
  if ( !($allow_custom) )
  {
    $sess_Data["warn"] = "Permission denied: Administrator has \$allow_cutom off";
    $sess_Data["level"] = "major";
    header( "Location: ftp.php?SID=$SID\n\n" );
    exit;
  }
?><HTML>
 <HEAD>
  <TITLE>Weeble FM Preferences v<?php echo $weeblefm_Version ?></TITLE>
  <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
    <style type="text/css">
      <?php 
        echo $style . "\n";
      ?>
    </style>
 </HEAD>
 <BODY>
  <table border=0 cellspacing=0 cellpadding=2 width="100%">
   <tr>
    <td>
     <table border=0 cellpadding=10 cellspacing=0 width="99%">
      <tr>
       <td align="left"><img src="<?php echo $logo ?>"></td>
       <td align="right" valign="top"><A HREF="crossover.php?SID=<?php echo $SID ?>&submit=LOGOUT"><b>Logout</b></A><BR>
        <span style="font-size: smaller">Help [<A href="docs/manual.html" target="_blank">html</a><b>/</b><A href="docs/PDF/manual.pdf" target="_blank">pdf</a>]</span>
       </td>
      </tr>
     </table>
    </td>
   </tr>
   <tr>
    <td class="border">
    <table cellspacing=2 cellpadding=1 border=0 width="100%" class="manager">
      <form name="form_listing" method="post" action="prefcrossover.php" enctype="multipart/form-data">
        <input type=hidden name="SID" value="<?php echo $SID ?>">
        <tr>
          <td class="fixed"><?php echo $sess_Data["user"] ." @ ".$sess_Data["Server Name"] ?></td>
          <td align="right"><input type="submit" name="submit" value="Cancel"></td>
        </tr>
      </form>
    </table>
    </td>
   </tr>
   <tr>
    <td class="border">
    <form name="form_listing" method="post" action="prefcrossover.php" enctype="multipart/form-data">
    <table cellspacing=2 cellpadding=1 border=1 width="100%" class="manager">
      <?php 
        if ( $sess_Data["warn"] != "" )
        {
          echo "<tr><th colspan=4>";
          echo "<b><font align=\"center\" color=". $warn_color[$sess_Data["level"]] . ">";
          echo $sess_Data["warn"];
          echo "</font></b>";
          echo "</th></tr>";

          $sess_Data["warn"] = "";
        }

        $list = get_theme_list();
        $list = explode( ";", $list );
        sort ($list, SORT_STRING);
        reset ($list);

        echo "<tr>";
        echo "<td>Select a preset theme:</td>";
         echo "<td><SELECT NAME=theme_select>";
        echo "<OPTION";
        if ( "personal" == $personal["theme"] )
          echo " SELECTED"; 
        echo ">personal</OPTION>\n";
        for ($index = 0; $index < count($list); $index++ )
        {
          echo "<OPTION";
          if ( $list[$index] == $personal["theme"] )
            echo " SELECTED"; 
          echo ">$list[$index]</OPTION>\n";
        }          
        echo "</SELECT></td>";
        echo "<td>&nbsp</td>";
        echo "<td><input type=\"submit\" name=\"submit\" value=\"Load Theme\"></td>";
        echo "</tr>";
        
       ?>
      <tr>
        <td colspan=4><br><h2>Display Settings</h2></td>
      </tr>
      <tr>
        <td colspan=4 class="buttonBar"><br><h3>Page</h3></td>
      </tr>
      <tr>
        <td width="225" NOWRAP>Background Color:</td>
        <td width="200" NOWRAP><input type="text" name="pref[THM_PG_BG_CLR]" value=<?php echo "\"$theme[thm_pg_bg_clr]\""?>></td>
        <td width="50" NOWRAP bgcolor=<?php echo "\"$theme[thm_pg_bg_clr]\""?>>&nbsp</td>
        <td width="300">Current: <?php echo "\"$theme[thm_pg_bg_clr]\""?></td>
      </tr>
      <tr>
        <td>Background Image:</td>
        <td><input type="text" name="pref[THM_PG_BG_IMG]" value=<?php echo "\"$theme[thm_pg_bg_img]\""?>></td>
        <td background=<?php echo "\"$theme[thm_pg_bg_img]\""?>>&nbsp</td>
        <td>Current: <?php echo "\"$theme[thm_pg_bg_img]\""?></td>
      </tr>
      <tr>
        <td>Text Color:</td>
        <td><input type="text" name="pref[THM_PG_TXT_CLR]" value=<?php echo "\"$theme[thm_pg_txt_clr]\""?>></td>
        <td bgcolor=<?php echo "\"$theme[thm_pg_txt_clr]\""?>>&nbsp</td>
        <td>Current: <?php echo "\"$theme[thm_pg_txt_clr]\""?></td>
      </tr>
      <tr>
        <td>Text Font:</td>
        <td><input type="text" name="pref[THM_PG_TXT_FNT]" value=<?php echo "\"$theme[thm_pg_txt_fnt]\""?>></td>
        <td><font face=<?php echo "\"$theme[thm_pg_txt_fnt]\""?>>Font</font></td>
        <td>Current: <?php echo "\"$theme[thm_pg_txt_fnt]\""?></td>
      </tr>
      <tr>
        <td>Text Font Size:</td>
        <td>
          <input type="radio" name="pref[THM_PG_TXT_SZ]" value="xx-small" <?php if ("xx-small" == $theme["thm_pg_txt_sz"]) echo "CHECKED";?>>xx-small 
          <input type="radio" name="pref[THM_PG_TXT_SZ]" value="x-small" <?php if ("x-small" == $theme["thm_pg_txt_sz"]) echo "CHECKED";?>>x-small 
          <input type="radio" name="pref[THM_PG_TXT_SZ]" value="small" <?php if ("small" == $theme["thm_pg_txt_sz"]) echo "CHECKED";?>>small 
          <input type="radio" name="pref[THM_PG_TXT_SZ]" value="medium" <?php if ("medium" == $theme["thm_pg_txt_sz"]) echo "CHECKED";?>>medium 
          <input type="radio" name="pref[THM_PG_TXT_SZ]" value="large" <?php if ("large" == $theme["thm_pg_txt_sz"]) echo "CHECKED";?>>large 
          <input type="radio" name="pref[THM_PG_TXT_SZ]" value="x-large" <?php if ("x-large" == $theme["thm_pg_txt_sz"]) echo "CHECKED";?>>x-large 
          <input type="radio" name="pref[THM_PG_TXT_SZ]" value="xx-large" <?php if ("xx-large" == $theme["thm_pg_txt_sz"]) echo "CHECKED";?>>xx-large 
        </td>
        <?php echo "<td style=\"font-size: $theme[thm_pg_txt_sz]\">"?>Size</td>
        <td>Current: <?php echo "\"$theme[thm_pg_txt_sz]\""?></td>
      </tr>
      <tr>
        <td>Fixed Font:</td>
        <td><input type="text" name="pref[THM_PG_FXD_FNT]" value=<?php echo "\"$theme[thm_pg_fxd_fnt]\""?>></td>
        <td class="fixed">Font</td>
        <td>Current: <?php echo "\"$theme[thm_pg_fxd_fnt]\""?></td>
      </tr>
      <tr>
        <td>Link Color:</td>
        <td><input type="text" name="pref[THM_PG_LNK_CLR]" value=<?php echo "\"$theme[thm_pg_lnk_clr]\""?>></td>
        <td bgcolor=<?php echo "\"$theme[thm_pg_lnk_clr]\""?>>&nbsp</td>
        <td>Current: <?php echo "\"$theme[thm_pg_lnk_clr]\""?></td>
      </tr>
      <tr>
        <td>Link Hover Color:</td>
        <td><input type="text" name="pref[THM_PG_LNK_HVR]" value=<?php echo "\"$theme[thm_pg_lnk_hvr]\""?>></td>
        <td bgcolor=<?php echo "\"$theme[thm_pg_lnk_hvr]\""?>>&nbsp</td>
        <td>Current: <?php echo "\"$theme[thm_pg_lnk_hvr]\""?></td>
      </tr>

      <tr>
        <td colspan=4 class="buttonBar"><br><h3>File Manager</h3></td>
      </tr>
      <tr>
        <td>Background Color:</td>
        <td><input type="text" name="pref[THM_TBL_BG_CLR]" value=<?php echo "\"$theme[thm_tbl_bg_clr]\""?>></td>
        <td bgcolor=<?php echo "\"$theme[thm_tbl_bg_clr]\""?>>&nbsp</td>
        <td>Current: <?php echo "\"$theme[thm_tbl_bg_clr]\""?></td>
      </tr>
      <tr>
        <td>Alternating Background Color:</td>
        <td><input type="text" name="pref[THM_TBL_BG_ALT_CLR]" value=<?php echo "\"$theme[thm_tbl_bg_alt_clr]\""?>></td>
        <td bgcolor=<?php echo "\"$theme[thm_tbl_bg_alt_clr]\""?>>&nbsp</td>
        <td>Current: <?php echo "\"$theme[thm_tbl_bg_alt_clr]\""?></td>
      </tr>
      <tr>
        <td>Background Image:</td>
        <td><input type="text" name="pref[THM_TBL_BG_IMG]" value=<?php echo "\"$theme[thm_tbl_bg_img]\""?>></td>
        <td background=<?php echo "\"$theme[thm_tbl_bg_img]\""?>>&nbsp</td>
        <td>Current: <?php echo "\"$theme[thm_tbl_bg_img]\""?></td>
      </tr>
      <tr>
        <td>Text Color:</td>
        <td><input type="text" name="pref[THM_TBL_TXT_CLR]" value=<?php echo "\"$theme[thm_tbl_txt_clr]\""?>></td>
        <td bgcolor=<?php echo "\"$theme[thm_tbl_txt_clr]\""?>>&nbsp</td>
        <td>Current: <?php echo "\"$theme[thm_tbl_txt_clr]\""?></td>
      </tr>
      <tr>
        <td>Border Color:</td>
        <td><input type="text" name="pref[THM_TBL_BDR_CLR]" value=<?php echo "\"$theme[thm_tbl_bdr_clr]\""?>></td>
        <td bgcolor=<?php echo "\"$theme[thm_tbl_bdr_clr]\""?>>&nbsp</td>
        <td>Current: <?php echo "\"$theme[thm_tbl_bdr_clr]\""?></td>
      </tr>

      <tr>
        <td colspan=4 class="buttonBar"><br><h3>Misc.</h3></td>
      </tr>
      <tr>
        <td>Button Background Color:</td>
        <td><input type="text" name="pref[THM_BTN_BG_CLR]" value=<?php echo "\"$theme[thm_btn_bg_clr]\""?>></td>
        <td bgcolor=<?php echo "\"$theme[thm_btn_bg_clr]\""?>>&nbsp</td>
        <td>Current: <?php echo "\"$theme[thm_btn_bg_clr]\""?></td>
      </tr>

      <tr>
        <td colspan=4><br><h2>Miscellaneous</h2></td>
      </tr>
      <tr>
        <td>Starting Directory:</td>
        <td><input type="text" name="pref[START_DIR]" value=<?php if ( isset($personal["start_dir"])) echo "\"$personal[start_dir]\""?>></td>
        <td>&nbsp</td>
        <td>Current: "<?php if ( isset($personal["start_dir"])) echo "$personal[start_dir]"?>"</td>
      </tr>      
      <tr>
        <td>Hidden Files:</td>
        <td>
        	<input type="radio" name="pref[SHOW_HIDDEN]" value="hide" <?php if ($personal["show_hidden"] == FALSE) echo "CHECKED" ?>> Hide
        	<input type="radio" name="pref[SHOW_HIDDEN]" value="show" <?php if ($personal["show_hidden"]) echo "CHECKED" ?>> Show
        </td>
        <td>&nbsp</td>
        <td>Current:
        	<?php 
        		if ($personal["show_hidden"])
            	echo "\"Show\"";
						else
            	echo "\"Hide\"";
          ?>
        </td>
      </tr>      
      
      <tr>
        <td>Edit Box Size:</td>
        <td>
        	<input type="text" name="pref[EDIT_COL]" value="<?php echo $personal["edit_col"]?>" size=4> ( Width )<br>
        	<input type="text" name="pref[EDIT_ROW]" value="<?php echo $personal["edit_row"]?>" size=4> ( Height )
        </td>
        <td>&nbsp</td>
        <td>
        	<p style="float: left">Current:</p>
        	<?php 
          		echo "<p style=\"float: left\">";
            	echo "Width: $personal[edit_col]<br>";
            	echo "Height: $personal[edit_row]";
              echo "</p>";
          ?>
        </td>
      </tr>      
      <tr>
        <td>Preview Size ( pixels or % ):</td>
        <td>
        	<?php 
						$temp = $personal["prev_size"];
            $type = "pix";
            if ( substr( $temp, strlen($temp) - 1 ) == "%" )
						{
            	$temp = substr( $temp, 0, strlen($temp) - 1 );
							$type = "%";
            }            
        		echo "<P style=\"float: left\"><input type=\"text\" name=\"pref[PREV_SIZE]\" value=\"" . $temp . "\" size=4></P>";
						echo "<p style=\"float: left\"><input type=\"radio\" name=\"PREV_TYPE\" value=\"\"";
            if ( $type == "pix" ) echo " CHECKED";
            echo "> Pixels<br>";
        		echo "<input type=\"radio\" name=\"PREV_TYPE\" value=\"%\"";
            if ( $type == "%" ) echo " CHECKED";
            echo "> Percent</p>";
          ?>
        </td>
        <td>&nbsp</td>
        <td>Current:
        	<?php 
            	echo "Size: $personal[prev_size]";
          ?>
        </td>
      </tr>      
    </table>
    </td>
   </tr>
   <tr class="buttonBar">
    <td align="center" class="buttonBorder"><input type="submit" name="submit" value="Save"> | | <input type="submit" name="submit" value="Preview"> | | <input type="reset" value="Reset"></td>
   </tr>
   <input type=hidden name="SID" value="<?php echo $SID ?>">
   </form>
  </table>
<p class="sig"><a href="http://weeblefm.sourceforge.net/">Weeble File Manager</a> 
  by Jon Manna &amp; Chris Michaels</p> </BODY>
</HTML>
