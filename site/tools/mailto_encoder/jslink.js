// Functions for just the simple.php page


// Do the encode
function RunEncode()
{
    Error = Check_InvalidEmail(document.MailtoForm.Email.value);
    if (Error != "")
    {
        alert("You didn't fill in a proper email address!\n" + Error);
        return;
    }

    LinkText = document.MailtoForm.Email.value;
    if (document.MailtoForm.TheLink.value != null &&
        document.MailtoForm.TheLink.value != "")
    {
        LinkText = document.MailtoForm.TheLink.value;
    }
    
    document.MailtoForm.CodeText.value = 
        EncodeEmail(document.MailtoForm.Email.value, LinkText);
    document.MailtoForm.LinkText.value = 
        "Insert the link here"
}

function EncodeEmail(str, ltstr)
{
    doneStr = "<a href=\"mailto:" + str + "\">" + ltstr + "</a>";
    doneStr = Hexer(doneStr, 100, 0, ";");
    
    doneStr2 = "<script type=\"text/javascript\" language=\"javascript\">\n";
    doneStr2 += "MaIlMe=new Array();\n";
    Counter = 0;
    loc = 0;
    while (loc < doneStr.length)
    {
        doneStr2 += "MaIlMe[" + Counter + "]=\"";
        jump = Rand(4) + 12;
	jumpLeft = 48 - jump;
	doneStr2 += doneStr.slice(loc, loc+jump) + "\"";
	loc += jump;
	jump = Rand(4) + 12;
	jumpLeft -= jump;
	if (doneStr.length > loc)
	{
	    doneStr2 += "+\"" + doneStr.slice(loc, loc+jump) + "\"";
   	    loc += jump;
	    jump = jumpLeft;
	    if (doneStr.length > loc)
	    {
	        doneStr2 += "+\"" + doneStr.slice(loc, loc+jump) + "\"";
                loc += jump;
	    }
	}
	doneStr2 += ";\n";
        Counter ++;
    }
    doneStr2 += "for(i=0;i<MaIlMe.length;i++){";
    doneStr2 += "document.write(unescape(MaIlMe[i]))}\n</scr" + "ipt>";
    doneStr2 += "<nosc" + 
        "ript>You need JavaScript to see my email address</nosc" + "ript>";
    
    return doneStr2;
}
