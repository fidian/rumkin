---
title: WCN Config Generator
summary: Creates a Zip file for transferring WiFi info using "Windows Connect Now"
js:
    - ../../js/file-saver.min.js
    - ../../js/mustache.min.js
    - ../../js/jszip.min.js
    - ../../js/jszip-utils.min.js
    - wcn.js
module: wcn
controller: wcnController
---

Windows Connect Now (WCN), or Windows Rally, is a way to make network setup easier.  This standard was created by Microsoft and it basically is just a set of files that are put onto a USB drive.  You share this jump drive with others so they can quickly get on networks without typing in huge passwords.  It also works for some networked devices, like a printer I own.

This is fine and good, but what if you currently don't have a Windows computer available?  What about when your house is filled with Linux or Apple computers?  What if you have some family coming over with their laptops and your randomly generated 64 character key is insanely long to type?  (Yes, I'm describing my house.)  Then you need to email everyone the password or try to tell them your network key and hope they can type it in.  Oh the hassle!  On my printer, even this is not an option; it is WCN or nothing.

Worry no more.  Use this form and a zip file will be created that contains the files you want.  Also, in case you are paranoid like the author, rest assured that your network keys will never touch a hard drive on this side. When you press the button, you will be prompted to download a zip file. The easiest thing to do at this point is to just unzip it on a USB jump drive. If you already had an `autorun.inf` file on there, rename it first so it will not get overwritten by accident.

Inside the zip file that you will download, there is the `setupSNK.exe` program to ease installation for Windows XP and Vista (perhaps Windows 7?) computers. Custom `WSETTING.TXT` and `WSETTING.WFC` files will have your networking configuration.  Plus, you have the option of an easy batch file, `Install_Wireless.bat` to help set up your network.  If you include the `AUTORUN.INI`, you'll also get a logo file to make your jump drive have a cool icon.

The best bit is that this generates the file inside your browser using the magic of JavaScript.  Your network settings never leave your computer.

<div>
    <p>
        SSID: <input type="text" ng-model="ssid" /> (required)
    </p>

    <p>
        Connection Type: <select ng-value="connection">
            <option value="ESS">Infrastructure mode (ESS, uses access point)</option>
            <option value="IBSS">Ad-Hoc (IBSS, peer to peer)</option>
        </select>
    </p>

    <p>
        Authentication: <select ng-value="authentication">
            <option value="open">Open network</option>
            <option value="shared">Shared</option>
            <option value="WPA-NONE">WPA-NONE</option>
            <option value="WPA">WPA</option>
            <option value="WPA-PSK">WPA-PSK</option>
            <option value="WPA2">WPA2</option>
            <option value="WPA2-PSK">WPA2-PSK</option>
        </select>
    </p>

    <p>
        Encryption: <select ng-value="encryption">
            <option value="none">No encryption</option>
            <option value="WEP">WEP (Insecure)</option>
            <option value="TKIP">TKIP</option>
            <option value="AES">AES</option>
        </select>
    </p>

    <p>
        Network key: <input type="text" ng-model="networkkey" /> (required if there is encryption)
    </p>

    <p>
        <label><input type="checkbox" ng-model="automatically" /> Key is provided automatically</label>
    </p>

    <p>
        <label><input type="checkbox" ng-model="ieee802dot1x" /> IEEE 802.1x enabled</label>
    </p>

    <p>
        <label><input type="checkbox" ng-model="autorun" /> Include an Autorun file.</label>
    </p>

    <p>
        <label><input type="checkbox" ng-model="batch" /> Include batch file that runs the setup program.</label>
    </p>

    <p>
        <button ng-click="generateWcn()">Generate WCN Zip File</button>
    </p>
</div>
