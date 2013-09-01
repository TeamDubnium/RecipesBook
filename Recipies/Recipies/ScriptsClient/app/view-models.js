/// <reference path="data.js" />

define(["jquery", "class", ], function ($) {
    var displayName = "";
    var ViewModels = Class.create({
        init: function (persister) {
            this.persister = persister;
            return this;
        },

        currentUser: function () {
            return displayName;
        },

        buildHomeViewModel: function () {

            var username = this.persister.getCurrentUsername();
            var greeting = "";
            if (!username) {

                greeting = "Hello stranger, have a nice time in our site.";

            }
            else {
                greeting = "Hello " + username + ", we are glad to see you again";
            }

            var viewModel = {
                greeting: greeting
            };

            var userViewModel = new kendo.observable(
                viewModel
            )
            return userViewModel;

        },


        buildCategoriesViewModel: function () {


            var promise = this.persister.categories.all()
                .then(function (categoriesAll) {
                    console.log(categoriesAll);

                    var viewModel = {
                        categories: categoriesAll
                    };

                    var categoriesViewModel = new kendo.observable(
                        viewModel
                    )
                    return categoriesViewModel;

                }, function (err) {
                    console.log(err)
                });

            return promise;
        },

        buildLoginFormVM: function (successCallback) {
            var self = this;
            var viewModel = new kendo.observable({
                username: "DonchoMinkov",
                password: "Minkov",
                message: "Common!",
                loginUser: function (e) {
                    return self.persister.users
						.login(this.get("username"), this.get("password"))
							.then(function (name) {
							    displayName = name;
							    successCallback();
							});
                },
                registerUser: function (e) {
                    return self.persister.users
						.register(this.get("username"), this.get("password"))
							.then(function (name) {
							    displayName = name;
							    successCallback();
							});
                }
            });
            return viewModel;
        },
        getRecipesByCategoryViewModel: function (id) {
            var promise = this.persister.categories.byId(id)
                .then(function (recipes) {
                    var viewModel = {
                        recipes: recipes
                    };

                    var categoriesViewModel = new kendo.observable(
                        viewModel
                    );
                    return categoriesViewModel;

                }, function (err) {
                    console.log(err)
                });

            return promise;
        },

        buildCreateRecipeFormVM: function (successCallback) {
            var self = this;
            var viewModel = new kendo.observable({
                title: "DonchoMinkov",
                password: "Minkov",
                message: "Common!",
                createRecipe: function (e) {
                    return self.persister.users
                        .login(this.get("username"), this.get("password"))
                            .then(function (name) {
                                displayName = name;
                                successCallback();
                            });
                },
                registerUser: function (e) {
                    return self.persister.users
                        .register(this.get("username"), this.get("password"))
                            .then(function (name) {
                                displayName = name;
                                successCallback();
                            });
                }
            });
            return viewModel;
        }
    });

    return {
        get: function (persister) {
            return new ViewModels(persister)
        }
    }
});