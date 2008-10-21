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
}

function EncodeEmail(str, ltstr)
{
    doneStr = "<a href=\"mailto:" + str + "\">" + ltstr + "</a>";

    loc = 0;
    LetterList = "";
    while (loc < doneStr.length)
    {
	l = doneStr.slice(loc, loc+1);
	if (LetterList.indexOf(l) == -1)
	{
	    p = Rand(LetterList.length + 1);
	    LetterList = LetterList.slice(0, p) + l +
		LetterList.slice(p, LetterList.length + 1);
	}
	loc ++;
    }
	
    LetterListEscaped = LetterList;
	
    // At this point there should only be at most one \ and "
    // in LetterList and LetterListEscaped
    p = LetterListEscaped.indexOf("\\");
    if (p != -1)
    {
	LetterListEscaped = LetterListEscaped.slice(0, p) + "\\" +
	    LetterListEscaped.slice(p, LetterListEscaped.length);
    }
    p = LetterListEscaped.indexOf("\"");
    if (p != -1)
    {
	LetterListEscaped = LetterListEscaped.slice(0, p) + "\\" +
	    LetterListEscaped.slice(p, LetterListEscaped.length);
    }
	
    doneStr2 = "<script type=\"text/javascript\" language=\"javascript\">\n";
    doneStr2 += "<!--\n";
    doneStr2 += "ML=\"" + LetterListEscaped + "\";\n";
    doneStr2 += "MI=\"";
	
    loc = 0;
    while (loc < doneStr.length)
    {
	p = LetterList.indexOf(doneStr.slice(loc, loc+1));
	p += 48;
	doneStr2 += String.fromCharCode(p);
	loc ++;
    }
	
    doneStr2 += "\";\n";
    doneStr2 += "OT=\"\";\n";
    doneStr2 += "for(j=0;j<MI.length;j++){\n";
    doneStr2 += "OT+=ML.charAt(MI.charCodeAt(j)-48);\n";
    doneStr2 += "}document.write(OT);\n";
    doneStr2 += "// --></scr" + "ipt>\n";
    doneStr2 += "<nosc" + 
        "ript>You need JavaScript to see my email address</nosc" + "ript>";
    
    return doneStr2;
}
