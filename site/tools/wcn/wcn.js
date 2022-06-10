/* global m, JSZipUtils, alert, JSZip, saveAs */

"use strict";

const Dropdown = require('../../js/mithril/dropdown.js');

module.exports = class Wcn {
    constructor() {
        this.connectionTypes = {
            label: 'Connection type',
            options: {
                ESS: "Infrastructure mode (ESS, uses access point)",
                IBSS: "Ad-Hoc (IBSS, peer to peer)"
            },
            value: 'ESS'
        };
        this.authentications = {
            label: 'Authentication',
            options: {
                open: "Open network",
                shared: "Shared",
                "WPA-NONE": "WPA-NONE",
                WPA: "WPA",
                "WPA-PSK": "WPA-PSK",
                WPA2: "WPA2",
                "WPA2-PSK": "WPA2-PSK"
            },
            value: 'open'
        };
        this.encryptions = {
            label: 'Encryption',
            options: {
                none: "No encryption",
                WEP: "WEP (Insecure)",
                TKIP: "TKIP",
                AES: "AES"
            },
            value: 'none'
        };
    }

    makeInput(property, label, note) {
        return m("p", [
            label,
            m("input", {
                type: "text",
                oninput: (e) => {
                    this[property] = e.target.value;
                }
            }),
            note
        ]);
    }

    makeCheckbox(property, label) {
        return m("p", [
            m("label", [
                m("input", {
                    type: "checkbox",
                    value: this[property],
                    onclick: () => (this[property] = !!this[property])
                }),
                label
            ])
        ]);
    }

    view() {
        return [
            this.makeInput("ssid", "SSID: ", " (required)"),
            m(Dropdown, this.connectionTypes),
            m(Dropdown, this.authentications),
            m(Dropdown, this.encryptions),
            this.makeInput(
                "networkkey",
                "Network Key: ",
                " (required if there is encryption)"
            ),
            this.makeCheckbox(
                "automatically",
                " Key is provided automatically"
            ),
            this.makeCheckbox("ieee802dot1x", " IEEE 802.1x enabled"),
            this.makeCheckbox("autorun", " Include an Autorun file"),
            this.makeCheckbox(
                "batch",
                " Include batch file that runs the setup program"
            ),
            m("p", [
                m(
                    "button",
                    {
                        onclick: () => {
                            this.generate();
                        }
                    },
                    "Generate WCN Zip File"
                )
            ])
        ];
    }

    parseTemplate(zipFile, filename) {
        return zipFile
            .file(filename)
            .async("string")
            .then((content) => {
                this.automaticallyNumber = this.automatically ? 1 : 0;
                this.ieee802dot1xNumber = this.ieee802dot1x ? 1 : 0;

                const bits = content.split("{{");
                let result = bits.shift();

                while (bits.length) {
                    const b = bits.shift().split("}}");
                    const b0 = b.shift();

                    if (b0 in this) {
                        result += this[b0].toString();
                    }

                    result += b.join("}}");
                }
                zipFile.file(filename, result);
            });
    }

    generate() {
        // Copy properties to "this" for much easier templates
        this.authentication = this.authentications.value;
        this.encryption = this.encryptions.value;
        this.connectionType = this.connectionTypes.value;

        JSZipUtils.getBinaryContent(
            "wireless-settings.zip",
            (errGettingZip, content) => {
                var zip;

                if (errGettingZip) {
                    alert(errGettingZip.toString());

                    return;
                }

                zip = new JSZip();
                zip.loadAsync(content)
                    .then(() => {
                        if (!this.autorun) {
                            zip.remove("AUTORUN.INF");
                            zip.remove("SMRTNTKY/fcw.ico");
                        }

                        if (!this.batch) {
                            zip.remove("Install_Wireless.bat");
                        }

                        return this.parseTemplate(zip, "SMRTNTKY/WSETTING.TXT");
                    })
                    .then(() => {
                        return this.parseTemplate(zip, "SMRTNTKY/WSETTING.WFC");
                    })
                    .then(() => {
                        return zip.generateAsync({
                            compression: "DEFLATE",
                            type: "blob"
                        });
                    })
                    .then((finalContent) => {
                        saveAs(finalContent, "wireless-settings.zip", true);
                    })
                    .then(null, (err) => {
                        console.log(err);
                        console.log(err.toString());
                        alert(err.toString());
                    });
            }
        );
    }
};
