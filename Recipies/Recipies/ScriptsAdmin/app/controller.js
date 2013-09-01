/// <reference path="../_references.js" />

//define(["angular", "data"], function (angular, persister) {

    if (!String.prototype.htmlEscape) {
        String.prototype.htmlEscape = function () {
            var escapedStr = String(this).replace(/&/g, '&amp;');
            escapedStr = escapedStr.replace(/</g, '&lt;');
            escapedStr = escapedStr.replace(/>/g, '&gt;');
            escapedStr = escapedStr.replace(/"/g, '&quot;');
            escapedStr = escapedStr.replace(/'/g, "&#39");
            return escapedStr;
        }
    }
    function HomeController($scope, $http) {
        var self = this;
        this.persister = persister.get($http, "/api");
        if (this.persister.isUserLoggedIn()) {
            document.location = "#/";
        } else {
            document.location = "#/login";
        }

        $scope.logoutUser = function () {
            if (self.persister.isUserLoggedIn()) {
                self.persister.user.logout(function () {
                    document.location = "#/login";
                }, function () {
                    alert("Cannot logout");
                });
                
            }
        }
    };

    function LoginController($scope, $http) {
        var self = this;
        this.persister = persister.get($http, "/api");
        $scope.user = {
            username: "",
            password: ""
        }
        $scope.message = "";
        $scope.loginUser = function () {
            var user = $scope.user;

            self.persister.user.login(user, function () {
                document.location = "#/";
            }, function () {
                $scope.message = "Invalid username or password";
            });
        }

    };

//   return {
//       HomeController: HomeController,
//       LoginController: LoginController
//   }
//});