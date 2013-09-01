/// <reference path="data.js" />

define(["jquery", "persisters", "class", ], function ($, persisters) {
    var displayName = "";
    var ViewModels = Class.create({
        init: function (persister) {
            this.persister = persister;
            return this;
        },

        currentUser: function () {
            return displayName;
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
        }
    });

    return {
        get: function () {
            return new ViewModels(persisters.get("api/"))
        }
    }
});