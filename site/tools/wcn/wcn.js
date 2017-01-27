/*global angular*/

angular.module('wcn', []);

angular.module('wcn').controller('wcnController', [
    '$scope',
    '$location',
    '$http',
    '$q',
    function ($scope, $location, $http, $q) {
        function parseTemplate(zipFile, filename) {
            return zipFile.file(filename).async("string").then(function (content) {
                content = Mustache.render(content, $scope);
                zipFile.file(filename, content);
            });
        }

        function generateWcn() {
            JSZipUtils.getBinaryContent("./wireless-settings.zip", function (err, content) {
                var zip;

                if (err) {
                    alert(err.toString());

                    return;
                }

                zip = new JSZip();
                zip.loadAsync(content).then(function () {
                    if (! $scope.autorun) {
                        zip.remove("AUTORUN.INF");
                        zip.remove("SMRTNTKY/fcw.ico");
                    }

                    if (! $scope.batch) {
                        zip.remove("Install_Wireless.bat");
                    }

                    return parseTemplate(zip, "SMRTNTKY/WSETTING.TXT");
                }).then(function () {
                    return parseTemplate(zip, "SMRTNTKY/WSETTING.WFC");
                }).then(function () {
                    return zip.generateAsync({
                        compression: "DEFLATE",
                        type: "binarystring"
                    });
                }).then(function (finalContent) {
                    try {
                        // saveAs uses the MouseEvent constructor, but that
                        // may not be a constructor.  Try it here.  If it
                        // works, use the function.
                        new MouseEvent("click");
                        saveAs(finalContent, "wireless-settings.zip", true);
                    } catch (e) {
                        // On error, fallback to a data uri
                        return zip.generateAsync({
                            compression: "DEFLATE",
                            type: "base64"
                        }).then(function (base64Content) {
                            location.href = "data:application/zip;base64," + base64Content;
                        });
                    }
                }).then(null, function (err) {
                    console.log(err);
                    console.log(err.toString());
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

        $scope.$watch("automatically", function (newVal) {
            $scope.automaticallyNumber = +newVal;
        });
        $scope.$watch("ieee802dot1x", function (newVal) {
            $scope.ieee802dot1xNumber = +newVal;
        });
    }
]);
