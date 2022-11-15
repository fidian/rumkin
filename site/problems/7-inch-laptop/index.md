---
title: 7 Inch Laptop
summary: Installing Linux and overcoming hardware issues with a cheap and small laptop.
---

I purchased a [7" laptop from Amazon](https://smile.amazon.com/gp/product/B09CQ22335/ref=ppx_yo_dt_b_asin_title_o04_s00?ie=UTF8&th=1) because I wanted a very portable device that would work when I needed to fix other people's computers. It is also handier to lug around when doing presentations. There's no brand on the box, just the words "Pocket Book" and the manual (if you can call a single, poorly copied piece of paper a manual) listed Shenzhen Firstdream Technology Co., Ltd. Amazon lists the laptop's brand as ZWYING, with the model number of P7. Booting it up, I see "American Megatrends" as the logo shown by the BIOS.

The specs are modest, but one doesn't expect a lot from something this small. It has a 7" touchscreen at 1024 x 600; a 4 core, 1.5 GHz (2.3 Ghz burst) Celeron J3455 processor; 8GB of 2.3GHZ DDR3L RAM; 512 GB SSD, most likely m.2 but not yet confirmed. It comes with WiFi, Bluetooth, 2 x USB 3 ports, 1 Micro SD port, a headphone jack, webcam, and a mini HDMI port. All of that fits in a package that is 185 x 141 x 20 mm, weighs 0.65 kg, including the internal 4500 mAh battery, which provides 4-6 hours of runtime.

My goal is to have a dual-boot system or one that runs VirtualBox in Linux, depending on the speed.


Step 0: Knowledge is Power
--------------------------

When booting, press `DEL` or `F2` to enter the BIOS.

To turn it on, hold the power button for 2 to 3 seconds.

My system's specs are uploaded to [Linux-Hardware.org](https://linux-hardware.org/?probe=a2a881793d).


Step 1: Backup
--------------

Before I do anything to a computer, I first boot a Linux OS and make an image of the original contents of the drive. This way I can restore it if necessary.

1. Download and install [Ventoy](https://www.ventoy.net/en/download.html) to a blank USB drive. This lets you drop on ISO files, then pick one to boot. It's fantastic. I have a single USB with almost a dozen different ISO files on it and can pick which one I want as the computer starts up. The only problem is that the ISO files must not be fragmented and apparently only Windows can defragment drives. Using Linux only, your best bet is to delete all files from the drive and then copy over ISO files one by one to ensure they get copied without fragmentation.
2. Download [Clonezilla](https://clonezilla.org/downloads.php) and drop the ISO on your Ventoy USB drive.
3. Find another USB drive and format it. USB3 would be good for this one.
4. Plug in the Ventoy drive to the computer and boot. Pick Clonezilla. Go through the menus to eventually pick "device-image" and plug in the second USB drive.
5. Keep following the menus and use Basic mode to image the drive to the USB you plugged in.

Wait a very long time while the backup happens. When done, shut down the laptop.


Step 2: Install Linux
---------------------

My chosen flavor is Ubuntu Mate for this little device. It boots much faster than Ubuntu. If you'd prefer another OS, just replace Ubuntu Mate with the one you desire, such as Lubuntu.

1. Download [Ubuntu Mate](https://ubuntu-mate.org/) and copy it to your Ventoy USB drive.
2. Plug in the Ventoy USB drive to the laptop and boot from it.
3. Pick the downloaded ISO and complete the install. If you want to dual-boot or use the whole drive, that choice is up to you. Use the touchscreen or plug in an external mouse.

This will work, but you won't have any network connectivity. Also, the left-click on the laptop doesn't work and right-click does something like the menu key. We'll have to get to those in a bit. Just do an offline installation for now.


Step 3: Fix Wireless
--------------------

For this step, you'll need a spare WiFi dongle or an Ethernet adapter. You'll have to get on the internet in order to fix the WiFi issues.

The wireless device, when seen using `lsusb`, appears something like this:

    Bus 002 Device 003: ID 0bda:c820 Realtek Semiconductor Corp.

These instructions are based on ones found on [StackExchange](https://askubuntu.com/questions/1303035/rtl8821cu-wifi-bluetooth-usb-0bdac820)

    sudo apt update
    sudo apt install build-essential git dkms
    git clone https://github.com/morrownr/8821cu-20210118
    cd 8821cu-20210118
    sudo ./install-driver.sh

Reboot and you're done. When you update the kernel, run these while you are connected to the internet.

    cd 8821cu-20210118
    git pull
    sudo ./remove-driver.sh
    sudo ./install-driver.sh


Step 4: Fix Mouse
-----------------

The future looks bleak for fixing the mouse buttons. Even in Windows, they don't work as expected. The left click button seems to do nothing and the right-click button is the same as pressing the Menu key. It would be really handy to have this work in case using a mouse is not practical, so I will still see if there's a way to map these keyboard events to mouse events.

First, let's look at `dmesg` output.

    input: ALPS0001:00 0911:5288 Mouse as /devices/....
    hid-generic 0018:0911:5288.0001: input,hidraw0: I2C HID v1.00 Mouse [ALSP0001:00 0911:5288] on i2c-ALPS0001:00

When running `xev`, the left click and right click generate `KeyPress` instead of `ButtonPress` events. `KP_Begin` is the same as the "5" key on a keypad with NumLock turned off.

    KeyPress event, serial 48, synthetic NO, window 0x2800001,
        root 0x77e, subw 0x0, time 788180, (129,130), root:(131,160),
        state 0x0, keycode 84 (keysym 0xff9d, KP_Begin), same_screen YES,
        XLookupString gives 0 bytes:
        XmbLookupString gives 0 bytes:
        XFilterEvent returns: False

    KeyRelease event, serial 48, synthetic NO, window 0x2800001,
        root 0x77e, subw 0x0, time 788394, (129,130), root:(131,160),
        state 0x0, keycode 84 (keysym 0xff9d, KP_Begin), same_screen YES,
        XLookupString gives 0 bytes:
        XFilterEvent returns: False

    KeyPress event, serial 48, synthetic NO, window 0x2800001,
        root 0x77e, subw 0x0, time 966162, (129,130), root:(131,160),
        state 0x0, keycode 135 (keysym 0xff67, Menu), same_screen YES,
        XLookupString gives 0 bytes:
        XmbLookupString gives 0 bytes:
        XFilterEvent returns: False

    KeyRelease event, serial 48, synthetic NO, window 0x2800001,
        root 0x77e, subw 0x0, time 966422, (129,130), root:(131,160),
        state 0x0, keycode 84 (keysym 0xff67, Menu), same_screen YES,
        XLookupString gives 0 bytes:
        XFilterEvent returns: False

So, how does one easily map these keys to mouse events? [Key Mapper](https://github.com/sezanzeb/key-mapper/) to the rescue! Download, install, then run the program. Set the device to "AT Translated Set 2 keyboard", then make two mappings.

    KP Begin -> h(BTN_LEFT)
    Menu -> h(BTN_RIGHT)

Apply when done. I'd suggest autoloading this configuration too, and possibly donating to the project if you find it useful.


Step 5: Sound (NOT FIXED)
-------------------------

Yeah, it looks like this doesn't have sound. Weird. Or does it maybe have sound and we didn't identify the sound card correctly? The kernel is using `snd_hda_intel` and trying `snd_soc_skl` or `snd_sof_pci_intel_apl` don't work out of the box either. Seems to be the same problem that [other people](https://askubuntu.com/questions/1351816/intel-j3455-dummy-sound-issue-snd-intel) [have](https://forum.mxlinux.org/viewtopic.php?t=66187).

The best solution might be to wait for SOF [to get updated](https://github.com/thesofproject/linux/pull/2962) in the Linux kernel. After that, a kernel option might need to be added in order to pick the right driver.


Step 6: The Fan (NOT POSSIBLE?)
-------------------------------

It's always on. How frustrating.

    echo coretemp | sudo tee -a /etc/modules

Now I can read the temperatures by using `cat /sys/class/thermal/thermal_zone*/temp` but it looks like the `fancontrol` package can not control the fan.

I'm starting to think that it's not possible to control the fan. I've played with the BIOS a bit and even booted Windows to see if it turned off the fan when idle for minutes. No luck.
