---
title: File Transfer Through Terminal
summary: Sometimes one connects to a terminal through SSH and using SCP / rsync isn't an available option.
---

I use `ssh` a lot to connect to remote computers.  Sometimes I have to connect to a computer that's hidden, so I `ssh` into a jump host and `ssh` again into the destination.  While poking around, I may have the urge to download a file to my computer, but that's not usually easy to do.


Symptoms
--------

* Unable to copy a file directly from one machine to another even though you are connected through an interactive session, probably through `ssh` or another terminal.
* User may copy a file to the intermediate host and then separately copy the file to the destination host, but that means the file temporarily is on the intermediate computer.  It also is more work.


Causes
------

* Most terminal emulators do not have file transfer abilities built-in through a side data stream.


Solution
--------

The easiest thing to do is to employ additional software on one side or the other.  Slightly harder solutions are also presented.  All of these work.

With luck, problem solved.


### ZModem

This software was used to transfer files over modems, yet is still readily available in package managers.  Plus, `screen` has ZModem support built in.

1. Run `screen`.
2. SSH to any remote server.
3. Type Control-a and `:`, then you will get the `screen` command prompt.
4. Type `zmodem capture`.
5. Install `lrzsz` on the remote server.

Now you can use `sz` to send a file to your local computer or `rz` to receive one.  `screen` will prompt you with a command when it detects the remote computer is using ZModem.

You should use `ssh -e none` to disable sequences like `~.`, which ZModem does not encode.

If you prefer to avoid `screen`, you could use `zssh` to initiate the SSH connection and it will trigger the zmodem commands automatically, just like how `screen` works.


### Base64 Encoding

The `coreutils` package includes `base64`, which encodes any file.  The opposite is `base64 --decode`.

1. SSH to any remote server.
2. Capture traffic to a log file.  This must be supported by your terminal emulator.
3. Run `base64 my-file` to get the encoded file.

There are alternate encoding methods available, such as `uuencode` and `xxencode` as well.  Each has their own advantages.


### Port Forwarding

This exposes the SSH port through the intermediate computer.

1. Use `ssh -L 8022:real-destination-computer:22 user@intermediate-computer` to kick off your SSH session.  This also opens port `8022` on your computer.  When you connect to that port, it would be a direct connection to the destination.
2. Copy files by specifying the port using `scp -P 8022 my-file localhost:`.

This solution can still work through multiple relays by exposing a port and repeatedly forwarding it.
