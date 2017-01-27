"use strict";

/* global alert, angular, JSZip, JSZipUtils, location, MouseEvent, Mustache, saveAs */
/* eslint no-alert:off, no-new:off */
angular.module("wcn", []);

angular.module("wcn").controller("wcnController", [
    "$scope",
    ($scope) => {
        /**
         * Retrieve content from a zip file, parse it as a Mustache template,
         * then replace the content in the zip file.
         *
         * @param {JSZip} zipFile
         * @param {string} filename
         * @return {Promise.<*>}
         */
        function parseTemplate(zipFile, filename) {
            return zipFile.file(filename).async("string").then((content) => {
                content = Mustache.render(content, $scope);
                zipFile.file(filename, content);
            });
        }


        /**
         * Creates WCN zip file based on one retrieved from the server.
         *
         * All variables are stored in $scope.
         */
        function generateWcn() {
            JSZipUtils.getBinaryContent("./wireless-settings.zip", (errGettingZip, content) => {
                var zip;

                if (errGettingZip) {
                    alert(errGettingZip.toString());

                    return;
                }

                zip = new JSZip();
                zip.loadAsync(content).then(() => {
                    if (!$scope.autorun) {
                        zip.remove("AUTORUN.INF");
                        zip.remove("SMRTNTKY/fcw.ico");
                    }

                    if (!$scope.batch) {
                        zip.remove("Install_Wireless.bat");
                    }

                    return parseTemplate(zip, "SMRTNTKY/WSETTING.TXT");
                }).then(() => {
                    return parseTemplate(zip, "SMRTNTKY/WSETTING.WFC");
                }).then(() => {
                    return zip.generateAsync({
                        compression: "DEFLATE",
                        type: "binarystring"
                    });
                }).then((finalContent) => {
                    try {
                        // saveAs uses the MouseEvent constructor, but that
                        // may not be a constructor.  Try it here.  If it
                        // works, use the function.
                        new MouseEvent("click");
                        saveAs(finalContent, "wireless-settings.zip", true);

                        return null;
                    } catch (e) {
                        // On error, fallback to a data uri
                        return zip.generateAsync({
                            compression: "DEFLATE",
                            type: "base64"
                        }).then((base64Content) => {
                            location.href = `data:application/zip;base64,${base64Content}`;
                        });
                    }
                }).then(null, (err) => {
                    console.log(err);
                    console.log(err.toString());
                    alert(err.toString());
                });
            });
        }

        $scope.ssid = "";
        $scope.connection = "ESS";
        $scope.authentication = "open";
        $scope.encryption = "none";
        $scope.networkkey = "";
        $scope.automatically = false;
        $scope.automaticallyNumber = 0;
        $scope.ieee802dot1x = false;
        $scope.ieee802dot1xNumber = 0;
        $scope.autorun = true;
        $scope.batch = true;

        $scope.generateWcn = generateWcn;

        $scope.$watch("automatically", (newVal) => {
            $scope.automaticallyNumber = +newVal;
        });
        $scope.$watch("ieee802dot1x", (newVal) => {
            $scope.ieee802dot1xNumber = +newVal;
        });
    }
]);
