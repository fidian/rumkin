// Functions for just the custom.php page
//
// Thanks goes out to:
//   Zlatko Darabos - Noticed a problem in AdditionalPartOfLink()
//   Spyder BC Canada - Told me about my radio button value problems and
//      showed me places to improve ChangeAt()


// Use whatever escaping function is available
function esc(v) {
	if (typeof encodeURIComponent == "function") {
		return encodeURIComponent(v);
	}
	return escape(v);
}


// Do the encode
function RunEncode()
{
    Error = Check_InvalidEmail(document.MailtoForm.Email.value);
    if (Error != "")
    {
        alert("You didn't fill in a proper email address!\n" + Error);
        return;
    }
    Method = FindChecked(document.MailtoForm.Encode_Link);
    if (Method != -1)
    {
        document.MailtoForm.CodeText.value = "";
        eval("EncodeLink_" + document.MailtoForm.Encode_Link[Method].value + "()");
    }
}

function FindChecked(TheArray)
{
    TotalOptions = TheArray.length;
    for (i = 0; i < TotalOptions; i ++)
    {
        if (TheArray[i].checked)
        {
            return i;
        }
    }
    return -1;
}

function EncodeLink_None()
{
    Method = FindChecked(document.MailtoForm.Encode_Visible);
    if (document.MailtoForm.Encode_Visible[Method].value == "None")
    {
        alert("With no link and nothing visible, this produces ... nothing!\n" +
            "You may want to reconsider your options.");
        return;
    }
    document.MailtoForm.CodeText.value = 
        eval("EncodeVisible_" + document.MailtoForm.Encode_Visible[Method].value +
        "()");
    ChangeAt();
    JavascriptEncode();
}

function EncodeLink_Normal()
{
    Method = FindChecked(document.MailtoForm.Encode_Visible);
    document.MailtoForm.CodeText.value = "<a href=\"mailto:";
    document.MailtoForm.CodeText.value += document.MailtoForm.Email.value;
    document.MailtoForm.CodeText.value += AdditionalPartOfLink();
    document.MailtoForm.CodeText.value += "\">";
    document.MailtoForm.CodeText.value += 
        eval("EncodeVisible_" + document.MailtoForm.Encode_Visible[Method].value +
        "()");
    document.MailtoForm.CodeText.value += "</a>";
    ChangeAt();
    JavascriptEncode();
}

function EncodeLink_Hexer()
{
    Method = FindChecked(document.MailtoForm.Encode_Visible);
    if (document.MailtoForm.Hexer_Frequency.value > 100 ||
        document.MailtoForm.Hexer_Frequency.value < 0)
    {
        alert("Hexer frequency out of range\nMust be between 0 and 100");
        return;
    }
    if (document.MailtoForm.Hexer_Method.value > 100 ||
        document.MailtoForm.Hexer_Method.value < 0)
    {
        alert("Hexer method out of range\nMust be between 0 and 100");
        return;
    }
    document.MailtoForm.CodeText.value = "<a href=\"mailto:";
    document.MailtoForm.CodeText.value += Hexer(document.MailtoForm.Email.value,
        document.MailtoForm.Hexer_Frequency.value,
        document.MailtoForm.Hexer_Method.value, "");
    document.MailtoForm.CodeText.value += AdditionalPartOfLink();
    document.MailtoForm.CodeText.value += "\">";
    document.MailtoForm.CodeText.value += 
        eval("EncodeVisible_" + document.MailtoForm.Encode_Visible[Method].value +
        "()");
    document.MailtoForm.CodeText.value += "</a>";
    ChangeAt();
    JavascriptEncode();
}

function EncodeLink_Table()
{
    Method = FindChecked(document.MailtoForm.Encode_Visible);
    if (document.MailtoForm.Encode_Visible[Method].value == "Image")
    {
        alert("I can not break up an image into multiple table cells.");
        return;
    }
    if (document.MailtoForm.Encode_Visible[Method].value == "None")
    {
        alert("I can not break up nothing into multiple table cells.");
        return;
    }
    From = eval("EncodeVisible_" + document.MailtoForm.Encode_Visible[Method].value +
        "()");
    loc = From.length - 2;
    if (loc < 2)
    {
        alert("Your email address is too small.");
        return;
    }
    FirstSplit = Rand(loc) + 1;
    SecondSplit = Rand(loc) + 1;
    while (SecondSplit == FirstSplit)
        SecondSplit = Rand(loc) + 1;
    if (FirstSplit > SecondSplit)
    {
        Temp = SecondSplit;
        SecondSplit = FirstSplit;
        FirstSplit = Temp;
    }
    document.MailtoForm.CodeText.value = "<table cellpadding=0 cellspacing=0 border=0>";
    document.MailtoForm.CodeText.value += "<tr><td>" +
        From.slice(0, FirstSplit);
    if (From.slice(FirstSplit - 1, FirstSplit) == " " || 
        From.slice(FirstSplit, FirstSplit + 1) == " ")
        document.MailtoForm.CodeText.value += "&nbsp;"
    document.MailtoForm.CodeText.value += "</td><td>" +
        From.slice(FirstSplit, SecondSplit);
    if (From.slice(SecondSplit - 1, SecondSplit) == " " || 
        From.slice(SecondSplit, SecondSplit + 1) == " ")
        document.MailtoForm.CodeText.value += "&nbsp;"
    document.MailtoForm.CodeText.value += "</td><td>" +
        From.slice(SecondSplit);
    document.MailtoForm.CodeText.value += "</td></tr></table>";
    ChangeAt();
    JavascriptEncode();
}

function EncodeVisible_None()
{
    return "";
}

function EncodeVisible_Normal()
{
    return document.MailtoForm.Email.value;
}

function EncodeVisible_Text()
{
    return document.MailtoForm.Encode_Visible_Text.value;
}

function EncodeVisible_Image()
{
    str = "<img src=\"" + document.MailtoForm.Visible_ImageName.value + "\"";
    if (document.MailtoForm.Visible_ImageAlt.value != null &&
        document.MailtoForm.Visible_ImageAlt.value != "")
    {
        str += " alt=\"" + document.MailtoForm.Visible_ImageAlt.value + "\"";
    }
    if (document.MailtoForm.Visible_ImageTags.value != null &&
        document.MailtoForm.Visible_ImageTags.value != "")
    {
        str += " " + document.MailtoForm.Visible_ImageTags.value
    }
    str += ">";
    return str;
}

function EncodeVisible_SillySpeak()
{
    From = document.MailtoForm.Email.value;
    To = "";
    AtSymbols = new Array();
    Dots = new Array();
    Holders = new Array();

    Holders[0] = "()";
    Holders[1] = "[]";
    Holders[2] = "{}";
    Holders[3] = "<>";
    Holders[4] = "  ";
    Holders[5] = "**";
    Holders[6] = "\\\\";
    Holders[7] = "//";
    Holders[8] = "||";
    Holders[9] = "--";
    Holders[10] = "==";

    AtSymbols[0] = "at";
    AtSymbols[1] = "AT";
    AtSymbols[2] = "At";

    Dots[0] = "dot";
    Dots[1] = "DOT";
    Dots[2] = "Dot";

    for (i = 0; i < From.length; i ++)
    {
        if (From.charAt(i) == '@')
        {
            HolderVal = Rand(Holders.length);
            To += " ";
            To += Holders[HolderVal].charAt(0);
            To += AtSymbols[Rand(AtSymbols.length)];
            To += Holders[HolderVal].charAt(1);
            To += " ";
        }
        else if (From.charAt(i) == '.')
        {
            HolderVal = Rand(Holders.length);
            To += " ";
            To += Holders[HolderVal].charAt(0);
            To += Dots[Rand(Dots.length)];
            To += Holders[HolderVal].charAt(1);
            To += " ";
        }
        else
            To += From.charAt(i);
    }

    return To;
}

function EncodeVisible_DeleteMe()
{
    Index = document.MailtoForm.DeleteMeOpts.selectedIndex;
    Opt = document.MailtoForm.DeleteMeOpts.options[Index].value;
    From = document.MailtoForm.Email.value;
    To = "";
    DeleteMe = new Array();
    DeleteMe[0] = "DELETEME";
    DeleteMe[1] = "DELETETHIS";
    DeleteMe[2] = "NOSPAM";
    DeleteMe[3] = "TRASH";
    DeleteMe[4] = "TRASHME";
    DeleteMe[5] = "UPPERCASE";

    if (Opt == "Solid")
    {           
        loc = From.length - 2;
        if (loc < 0)
            return "TOO_SMALL";
        loc = Rand(loc) + 1;
        To = From.slice(0, loc);
        MessageNumber = Rand(DeleteMe.length);
        if (document.MailtoForm.DeleteMe_Lowercase.checked)
            DeleteMe[MessageNumber] = DeleteMe[MessageNumber].toLowerCase();
        To += DeleteMe[MessageNumber];
        To += From.slice(loc);
    }
    else if (Opt == "Split")
    {
        loc = From.length - 2;
        if (loc < 2)
          return "TOO_SMALL";
        FirstSplit = Rand(loc) + 1;
        SecondSplit = Rand(loc) + 1;
        while (SecondSplit == FirstSplit)
            SecondSplit = Rand(loc) + 1;
        if (FirstSplit > SecondSplit)
        {
            Temp = SecondSplit;
            SecondSplit = FirstSplit;
            FirstSplit = Temp;
        }
        Message = Rand(DeleteMe.length);
        if (document.MailtoForm.DeleteMe_Lowercase.checked)
            DeleteMe[Message] = DeleteMe[Message].toLowerCase();
        loc = Rand(DeleteMe[Message].length - 2) + 1;
        To = From.slice(0, FirstSplit);
        To += DeleteMe[Message].slice(0, loc);
        To += From.slice(FirstSplit, SecondSplit);
        To += DeleteMe[Message].slice(loc);
        To += From.slice(SecondSplit);
    }
    else
    {
        Message = Rand(DeleteMe.length);
        if (document.MailtoForm.DeleteMe_Lowercase.checked)
            DeleteMe[Message] = DeleteMe[Message].toLowerCase();
        MessageIndex = 0;
        To = From.slice(0, 1);
        for (i = 1; i < From.length; i ++)
        {
            To += DeleteMe[Message].slice(MessageIndex, MessageIndex + 1);
            MessageIndex ++;
            if (MessageIndex >= DeleteMe[Message].length)
                MessageIndex = 0;
            To += From.slice(i, i + 1);
        }
    }
    return To;
}

function EncodeVisible_Reverse()
{
    From = document.MailtoForm.Email.value;
    To = "";
    for (i = From.length - 1; i >= 0; i --)
    {
        To+= From.charAt(i);
    }
    return To;
}

function EncodeVisible_Hexer()
{
    return Hexer(document.MailtoForm.Email.value, 
        document.MailtoForm.HexerLink_Frequency.value, 100, ";");
}

function JavascriptEncode()
{
    Index = document.MailtoForm.JavascriptStrength.selectedIndex;
    Opt = document.MailtoForm.JavascriptStrength.options[Index].value;
    From = document.MailtoForm.CodeText.value;
    To = "";

    if (! document.MailtoForm.Option_Javascript.checked)
    {
        return;
    }

    if (Opt == "Normal")
    {
        To = "<script type=\"text/javascript\" language=\"javascript\">";
	To += "<!--\n";
        To += "document.write(unescape(\"" + escape(From) + "\"))";
	To += "\n// --></scr" + "ipt>";
    }
    else if (Opt == "Break")
    {
        To = "<script type=\"text/javascript\" language=\"javascript\">\n";
	To += "<!--\n";
        To += "MaIlMe=new Array();\n";
        Counter = 0;
        loc = 0;
        while (loc < From.length)
        {
            jump = Rand(4) + (4 + Math.floor(Math.sqrt(Math.sqrt(From.length))));
            To += "MaIlMe[" + Counter + "]=\"";
            To += escape(From.slice(loc, loc+jump));
            To += "\";\n";
            loc += jump;
            Counter ++;
        }
        To += "for (i = 0; i < MaIlMe.length; i ++)\n{\n    ";
        To += "document.write(unescape(MaIlMe[i]))\n}\n"
	To += "// -->\n</scr" + "ipt>";
    }
    else if (Opt == "Subst")
    {
        loc = 0;
	LetterList = "";
	while (loc < From.length)
	{
	    l = From.slice(loc, loc+1);
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
	
        To = "<script type=\"text/javascript\" language=\"javascript\">\n";
	To += "<!--\n";
	To += "ML=\"" + LetterListEscaped + "\";\n";
	To += "MI=\"";
	
	loc = 0;
	while (loc < From.length)
	{
	    p = LetterList.indexOf(From.slice(loc, loc+1));
	    p += 48;
	    To += String.fromCharCode(p);
	    loc ++;
	}
	
	To += "\";\n";
	To += "OT=\"\";\n";
	To += "for(j=0;j<MI.length;j++){\n";
	To += "OT+=ML.charAt(MI.charCodeAt(j)-48);\n";
	To += "}document.write(OT);\n";
	To += "// --></scr" + "ipt>\n";
    }
    else if (Opt == "Double")
    {
        VisibleMethod = FindChecked(document.MailtoForm.Encode_Visible);
        if (document.MailtoForm.Encode_Visible[VisibleMethod].value == "Hexer")
        {
            alert("Double-encoding doesn't work with the Visible option Hexer.");
            return;
        }
        From = escape(From);
        To = "<script type=\"text/javascript\" language=\"javascript\">\n";
	To += "<!--\n";
        To += "MaIlMe=new Array();\n";

        Counter = 0;
        loc = 0;
        while (loc < From.length)
        {
            To += "MaIlMe[" + Counter + "]=\"";
            for (jump = Rand(4) + (8 + Math.floor(Math.sqrt(Math.sqrt(From.length)))) + loc;
                loc < jump && loc < From.length; loc ++)
            {
                CharCode = GetCharCode(From.charAt(loc), 8);
                while (CharCode.length < 3)
                    CharCode = "0" + CharCode;
                To += CharCode;
            }
            To += "\";\n";
            Counter ++;
        }

        To += "OutString=\"\";for(i=0;i<MaIlMe.length;i++){\n";
        To += "for(j=0;j<MaIlMe[i].length;j+=3){\n";
        To += "OutString+=eval(\"\\\"\\\\\"+MaIlMe[i].slice(j,j+3)+\"\\\"\");\n";
        To += "}}document.write(unescape(OutString));\n";
	To += "// -->\n</scr" + "ipt>\n";
    }
    document.MailtoForm.CodeText.value = To;
}

function AdditionalPartOfLink()
{
    Str = "";
    chk = "?";
    if (document.MailtoForm.Subject.value != "")
    {
        Str += chk + "subject=" + esc(document.MailtoForm.Subject.value);
	chk = "&amp;";
    }
    if (document.MailtoForm.Cc.value != "")
    {
        Str += chk + "cc=" + esc(document.MailtoForm.Cc.value);
	chk = "&amp;";
    }
    if (document.MailtoForm.Bcc.value != "")
    {
        Str += chk + "bcc=" + esc(document.MailtoForm.Bcc.value);
	chk = "&amp;";
    }
    if (document.MailtoForm.Body.value != "")
        Str += chk + "body=" + esc(document.MailtoForm.Body.value);
    return Str;
}

function ChangeAt()
{
    if (! document.MailtoForm.Option_ImageAt.checked)
    {
        return;
    }
    loc = document.MailtoForm.CodeText.value.lastIndexOf("@");
    if (loc == -1)
    {
        alert("There was no @ symbol found.\nI didn't replace it with an image.");
    }
    newStr = document.MailtoForm.CodeText.value.slice(0, loc) +
        "<img src=\"" + document.MailtoForm.Options_ImageName.value;
    if (document.MailtoForm.Options_ImageAlt.value != null &&
	document.MailtoForm.Options_ImageAlt.value != "")
    {
        newStr += "\" alt=\"" + HTMLEscape(document.MailtoForm.Options_ImageAlt.value);
    }
    newStr += "\" border=0 align=\"absmiddle\">" + document.MailtoForm.CodeText.value.slice(loc + 1);
    document.MailtoForm.CodeText.value = newStr;
}

function HTMLEscape(s)
{
    o = "";
    for (i = 0; i < s.length; i ++)
    {
        c = s.charAt(i);
	if (c == '"')
	    o += "&quot;";
	else if (c == '&')
	    o += "&amp;";
	else if (c == '<')
	    o += "&lt;";
	else if (c == '>')
	    o += "&gt;";
	else
	    o += c;
    }
    return o;
}
