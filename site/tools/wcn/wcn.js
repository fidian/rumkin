/* global m, JSZipUtils, alert, JSZip, saveAs */

"use strict";

const Checkbox = require("../../js/mithril/checkbox");
const Dropdown = require('../../js/mithril/dropdown');
const TextInput = require("../../js/mithril/text-input");

module.exports = class Wcn {
    constructor() {
        this.connectionType = {
            label: 'Connection type',
            options: {
                ESS: "Infrastructure mode (ESS, uses access point)",
                IBSS: "Ad-Hoc (IBSS, peer to peer)"
            },
            value: 'ESS'
        };
        this.authentication = {
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
        this.encryption = {
            label: 'Encryption',
            options: {
                none: "No encryption",
                WEP: "WEP (Insecure)",
                TKIP: "TKIP",
                AES: "AES"
            },
            value: 'none'
        };
        this.ssid = {
            label: "SSID (required)",
            value: ""
        };
        this.networkKey = {
            label: "Network key (required if there is encryption)",
            value: ""
        };
        this.automatically = {
            label: "Key is provided automatically",
            value: false
        };
        this.ieee802dot1x = {
            label: "IEEE 802.1x enabled",
            value: false
        };
        this.autorun = {
            label: "Include an Autorun file",
            value: false
        };
        this.batch = {
            label: "Include batch file that runs the setup program",
            value: false
        };
    }

    view() {
        return [
            m("p", m(TextInput, this.ssid)),
            m("p", m(Dropdown, this.connectionType)),
            m("p", m(Dropdown, this.authentication)),
            m("p", m(Dropdown, this.encryption)),
            m("p", m(TextInput, this.networkKey)),
            m("p", m(Checkbox, this.automatically)),
            m("p", m(Checkbox, this.ieee802dot1x)),
            m("p", m(Checkbox, this.autorun)),
            m("p", m(Checkbox, this.batch)),
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
                this.automaticallyNumber = {
                    value: this.automatically ? 1 : 0
                };
                this.ieee802dot1xNumber = {
                    value: this.ieee802dot1x ? 1 : 0
                };

                const bits = content.split("{{");
                let result = bits.shift();

                while (bits.length) {
                    const b = bits.shift().split("}}");
                    const b0 = b.shift();

                    if (b0 in this) {
                        result += this[b0].value.toString();
                    }

                    result += b.join("}}");
                }

                zipFile.file(filename, result);
            });
    }

    generate() {
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
                        if (!this.autorun.value) {
                            zip.remove("AUTORUN.INF");
                            zip.remove("SMRTNTKY/fcw.ico");
                        }

                        if (!this.batch.value) {
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
