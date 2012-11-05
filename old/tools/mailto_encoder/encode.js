// Functions for just the custom.php page
//
// Thanks goes out to:
//   Zlatko Darabos - Noticed a problem in AdditionalPartOfLink()
//   Spyder BC Canada - Told me about my radio button value problems and
//      showed me places to improve ChangeAt()


function escapeToJs(s) {
	return '"' + s.replace(/\\/g, "\\\\").replace(/\n/mg, "\\n").replace(/\r/mg, "\\r").replace(/\t/g, "\\t").replace(/"/g, "\\\"").replace(/<(.)/g, "<\"+\"$1") + '"';
}


// Do the encode
function RunEncode()
{
    Index = document.EncodeForm.JavascriptStrength.selectedIndex;
    Opt = document.EncodeForm.JavascriptStrength.options[Index].value;
    From = document.EncodeForm.PlainText.value;
    To = "";

    if (Opt == "Normal")
    {
        To = "<script type=\"text/javascript\" language=\"javascript\">";
	To += "<!--\n";
        To += "document.write(" + escapeToJs(From) + ")";
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
            To += "MaIlMe[" + Counter + "]=";
			To += escapeToJs(From.slice(loc, loc+jump));
            To += ";\n";
            loc += jump;
            Counter ++;
        }
        To += "for (i = 0; i < MaIlMe.length; i ++)\n{\n    ";
        To += "document.write(MaIlMe[i])\n}\n";
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
	
	LetterListEscaped = escapeToJs(LetterList);
	
        To = "<script type=\"text/javascript\" language=\"javascript\">\n";
	To += "<!--\n";
	To += "ML=" + LetterListEscaped + ";\n";
	Mi = "";
	
	loc = 0;
	while (loc < From.length)
	{
	    p = LetterList.indexOf(From.slice(loc, loc+1));
	    p += 48;
	    Mi += String.fromCharCode(p);
	    loc ++;
	}
	
	To += "MI=" + escapeToJs(Mi) + ";\n";
	To += "OT=\"\";\n";
	To += "for(j=0;j<MI.length;j++){\n";
	To += "OT+=ML.charAt(MI.charCodeAt(j)-48);\n";
	To += "}document.write(OT);\n";
	To += "// --></scr" + "ipt>\n";
    }
    else if (Opt == "Double")
    {
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
    document.EncodeForm.CodeText.value = To;
}
