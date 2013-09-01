﻿/// <reference path="../libs/_references.js" />
define(["jquery", "app/view-models", "app/views", "persisters", "kendoWeb", "class", "rsvp"], function ($, viewModels, views, persisters) {
    var Controller = Class.create({
        init: function () {
            this.layout = new kendo.Layout('<div id="content"></div>');
            this.navLayout = new kendo.Layout('<nav id="main-nav"></nav>');
            this.persister = persisters.get("api");
            this.viewModelFactory = viewModels.get(this.persister);
            this.viewFactory = views.get("ScriptsClient/partials/");
        },

        renderLayouts: function () {
            this.layout.render($("#app"));
            this.navLayout.render($("#wrapper > header"));
        },

        loadNav: function onLoadNav() {
            var that = this;
            this.viewFactory.mainNavView()
                .then(function (viewHtml) {
                    that.viewModelFactory.buildCategoriesViewModel()
                        .then(function (vm) {
                            var view = new kendo.View(viewHtml, { model: vm });
                            that.navLayout.showIn("#main-nav", view);
                            console.log();

                            if (that.persister.isUserLoggedIn()) {

                                $("#menu").append($('<li><a href="#/logout">Logout</a></li>'));
                            }
                            else {
                                $("#menu").append($('<li><a href="#/auth">Login/Register</a></li>'));
                            }

                            $('#categories-sub-menu').append($('<li><a href="#/allRecipes">All</a></li>'));

                            // add li <a #/allRecipes>
                            $("#menu").kendoMenu();


                        }, function (err) {
                            console.log(err)
                        });

                }, function (err) {
                    console.log();
                });




        },

        loadHomePage: function () {

            var that = this;

            this.viewFactory.homePageView()
               .then(function (viewHtml) {
                   var vm = that.viewModelFactory.buildHomeViewModel()

                   var view = new kendo.View(viewHtml, { model: vm });
                   that.layout.showIn("#content", view);

               }, function (err) {
                   console.log();
               });
        },

        loadAuthPage: function () {

            var that = this;

            var promise = new RSVP.Promise(function (resolve, reject) {

                if (that.persister.isUserLoggedIn()) {
                    reject("user is already logedin");
                }
                else {

                    that.viewFactory.loginForm()
                    .then(function (loginFormHtml) {

                        var vm = that.viewModelFactory.buildLoginFormVM(function () {
                            console.log("callback");
                            resolve("loged");
                        })
                        var view = new kendo.View(loginFormHtml, { model: vm });
                        that.layout.showIn("#content", view);

                    }, function (err) {
                        console.log(err);
                    });
                }
            });
            return promise;
        },

        processLogout: function () {

            return this.persister.users.logout();
        },

        loadCreateRecipePage: function () {

            
        },


        loadRecipesByCategoryPage: function (categoryId) {
            var self = this;

            this.viewFactory.recipesByCategoryView()
                .then(function (viewHtml) {
                    var vm = self.viewModelFactory.getRecipesByCategoryViewModel(categoryId);
                    var view = new kendo.View(viewHtml, { model: vm });

                    self.layout.showIn("#content", view);

                    console.log(res);

                }, function (err) {
                    console.log();
                });
        },


    });

    return {
        get: function () {
            return new Controller();
        }
    };
});