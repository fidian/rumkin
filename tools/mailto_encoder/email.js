// PLEASE do not steal this script and say you wrote it.
// It took me forever to make this little bugger.
// You can copy it and use it on your web site or whatever.  Just please
// give me credit by mentioning my name and having a link to my site
//    Tyler Akins
//    http://rumkin.com/tools/mailto_encoder/

function Rand(maxPlusOne)
{
    return Math.floor(Math.random() * maxPlusOne);
}

// Check for an empty email address, and one that doesn't have an @ symbol.
function Check_InvalidEmail(str)
{
    if (str == "" || str == null)
        return "Email address field was empty.";
    if (str.indexOf("@") == -1)
        return "No @ symbol found, which is necessary for email address";
    return "";
}

StupidString = "";
for (i = 1; i < 256; i ++)
{
    StupidString += "\\" + ((i<64)?((i<8)?"00":"0"):"") + i.toString(8);
}
StupidString = eval("\"" + StupidString + "\"");

function GetCharCode(Char, Base)
{
    num = StupidString.indexOf(Char);
    num ++;
    return num.toString(Base);
}

function Hexer(From, Frequency, Selection, Append)
{
    To = "";
    for (ii = 0; ii < From.length; ii ++)
    {
        if (Rand(100) < Frequency)
        {
            if (Rand(100) < Selection)
            {
                Code = GetCharCode(From.charAt(ii), 10);
                while (Code.length < 3)
                    Code = "0" + Code;
                To += "&#" + Code + ";" + Append;
            }
            else
            {
                Code = GetCharCode(From.charAt(ii), 16);
                while (Code.length < 2)
                    Code = "0" + Code;
                To += "%" + Code + Append;
            }
        }
        else
        {
            To += From.slice(ii, ii + 1);
        }
    }
    return To;
}

function CreatePopup(str)
{
    ShowMeWindow = window.open("", "", "location=no,directories=no,menubar=no," +
        "resizable=yes,scrollbars=yes,status=yes,toolbar=no,width=300,height=240");
    ShowMeWindow.document.write("<html><head><title>Example</title></head>\n");
    ShowMeWindow.document.write("<body bgcolor=\"#FFFFFF\">\n");
    ShowMeWindow.document.write("<p>" + str + "</p>\n");
    ShowMeWindow.document.write("</body></html>\n");
    ShowMeWindow.document.close();
}

