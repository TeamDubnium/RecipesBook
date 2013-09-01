/// <reference path="libs/angular.js" />
/// <reference path="_references.js" />

    //require.config({
    //    paths: {
    //        jquery: "libs/jquery-2.0.3",
    //        "Class": "libs/class",
    //        underscore: "libs/underscore",
    //        //cryptoJS: "libs/sha1",
    //        "angular": "libs/angular",
    //        controller: "app/controller",
    //        data: "app/data"
    //    },
    //    shim: {
    //        "angular": {
    //            exports: "angular"
    //        }
    //    }
    //});

    //require(["angular", "controller"], function (angular, controller) {

    angular.module("recipe-book", [])
            .config(["$routeProvider", function ($routeProvider) {
                $routeProvider
                    .when("/", {
                        templateUrl: "ScriptsAdmin/partials/main-nav-view.html",
                        controller: HomeController
                    })
                    .when("/login", {
                        templateUrl: "ScriptsAdmin/partials/login-form.html",
                        controller: LoginController
                    })
                    .when("/users", {
                        templateUrl: "ScriptsAdmin/partials/all-users-view.html",
                        controller: UserController
                    })
                    .otherwise({ redirectTo: "/" });
            }]);

    //});