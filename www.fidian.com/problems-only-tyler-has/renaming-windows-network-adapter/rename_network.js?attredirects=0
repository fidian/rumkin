/* JavaScript to rename a network adapter
 * Execute this with "cscript rename_network.js" from the command line
 *
 * Requires PsExec from Microsoft or SysInternals to escalate privileges.
 * PsExec must be in the same directory as this script.
 * If that doesn't work, you may need to run "cmd" as administrator.
 */


// shell is used for reading and writing registry values
var shell = WScript.CreateObject("WScript.Shell");


/**
 * Get a value from the registry.  If the value is not there, return null.
 *
 * @param string path Registry key path
 * @return mixed
 */
function registryValue(path) {
	try {
		// This throws if the key is not there
		return shell.RegRead(path);
	} catch (err) {
		return null;
	}
}


/**
 * Enumerate over all child keys for a given key
 *
 * @param long rootKeyNumber 0x80000002 = HKLM
 * @param string subKeyName Subkey off of the root
 * @return Array Key names
 */
function enumerateKeys(rootKeyNumber, subKeyName) {
    var reg = GetObject("winmgmts:{impersonationLevel=impersonate}!root/default:StdRegProv");
    method = reg.Methods_.Item("EnumKey");
    var enumParms = method.InParameters.SpawnInstance_();
    enumParms.hDefKey = rootKeyNumber;
    enumParms.sSubKeyName = subKeyName;
    var enumResult = reg.ExecMethod_(method.Name, enumParms);
    return enumResult.sNames.toArray();
}


/**
 * Run this script again using cscript and PsExec to escalate.
 *
 * Avoid shell.Run because it may prompt to run psexec and when the
 * administrator invocation tries to prompt it is never shown to the user.
 *
 * ShellExecute spawns a new process and doesn't wait until that program
 * terminates, thus we add a little delay here in the hopes that the
 * command we are running successfully renames the adapter.
 * 
 * @param string psexecFlag -h = Administrator, -s = SYSTEM
 * @param delay
 */
function psexec(psexecFlag, delay) {
	var scriptName = WScript.ScriptFullName;
	var fso = WScript.CreateObject('Scripting.FileSystemObject');
	var scriptDir = fso.GetParentFolderName(scriptName);
	var binary = '"' + scriptDir + '\\psexec"';
	var cmdline = psexecFlag + ' cscript //nologo "' + scriptName + '" ' + psexecFlag;
	var shellApp = WScript.CreateObject("Shell.Application");
	shellApp.ShellExecute(psexec, cmdline, "", "runas", 1);
	WScript.Sleep(delay);  // ShellExecute is asynchronous
}


// Diagnostic display
var network = WScript.CreateObject("WScript.Network");
WScript.Echo("Currently running as " + network.UserDomain + "\\" + network.UserName);


// Find if we have a vboxnet0 adapter already
WScript.Echo("Scanning for existing vboxnet0 adapter");

var candidateToChange = null;
var foundVbox = false;
var rootKeyNumber = 0x80000002;  // HKLM
var rootKeyName = "HKLM";

// Change this if you need to work on a specific ControlSet
var subKeyName = "SYSTEM\\CurrentControlSet\\Enum\\Root\\NET";
var keysArray = enumerateKeys(0x80000002, subKeyName);

// For each network adapter found, see if it's vboxnet0 or a candidate
for (var i in keysArray) {
	var netKey = rootKeyName + "\\" + subKeyName + "\\" + keysArray[i];

	if (registryValue(netKey + "\\Service") == "VBoxNetAdp") {
		var friendlyName = registryValue(netKey + "\\FriendlyName");

		if (friendlyName == 'vboxnet0') {
			// No need to rename anything - we have a vboxnet0
			foundVbox = true;
		} else if (! friendlyName || friendlyName.match(/^VirtualBox Host-Only Ethernet Adapter/)) {
			// Here's a candidate for renaming
			// May need to change pattern for different languages
			WScript.Echo("Found candidate for changing");
			WScript.Echo("  Friendly name:  " + friendlyName);
			WScript.Echo("  Device Description:  " + registryValue(netKey + "\\DeviceDesc"));
			candidateToChange = netKey;
		}
	}
}

// And now we know if we need to take any action
if (foundVbox) {
	WScript.Echo("An adapter is already named vboxnet0");
} else if (candidateToChange === null) {
	WScript.Echo("Did not find a network adapter to rename");
	WScript.Echo("Is there a VirtualBox Host-Only Ethernet Adapter on the system?");
} else {
	WScript.Echo("Attempting to rename " + candidateToChange);

	try {
		// Throws on failure
		shell.RegWrite(candidateToChange + "\\FriendlyName", "vboxnet0", "REG_SZ");
	} catch (err) {
		// Chain the calls this way so we only attempt to use the SYSTEM
		// account while we are an Administrator
		if (WScript.Arguments.length === 0) {
			WScript.Echo("Failure.  Attempting to escalate to Administrator.");
			psexec('-h', 10000);
		} else if (WScript.Arguments(0) == '-h') {
			WScript.Echo("Failure.  Attempting to change to SYSTEM.");
			psexec('-s', 5000);
		} else {
			// This message is likely to be lost
			WScript.echo("Failure - could not update the friendly name of the adapter and there");
			WScript.echo("are no other accounts I can try.");
			WScript.Sleep(60000);  // Keep the window open for a minute
		}
	}

	if (registryValue(netKey + "\\FriendlyName") == 'vboxnet0') {
		WScript.echo("Adapter renamed successfully");
	} else {
		WScript.echo("ERROR!  Could not rename the adapter!");
	}
}
