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
							}, function (err) {
							    this.set("message", err);
							});
                },
                registerUser: function (e) {
                    return self.persister.users
						.register(this.get("username"), this.get("password"))
							.then(function (name) {
							    displayName = name;
							    successCallback();
							}, function (err) {
							    this.set("message", err);
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

        getAllRecipesViewModel: function (id) {
            var promise = this.persister.recipes.all()
                .then(function (recipes) {
                    var viewModel = {
                        recipes: recipes
                    };

                    var categoriesViewModel = new kendo.observable(
                        viewModel
                    );
                    return categoriesViewModel;

                }, function (err) {
                    console.log(err);
                });

            return promise;
        },

        buildCreateRecipeFormVM: function (successCallback) {
            var self = this;

            var promise = new RSVP.Promise(function (resolve, reject) {

                self.persister.products.all()
                   .then(function (products) {

                       self.persister.products.measurements()
                        .then(function (measurements) {

                            self.persister.categories.all()
                                .then(function (categories) {

                                    var viewModel = {
                                        title: "Recipe title",
                                        content: "Recipe content goes here",
                                        product: "",
                                        measurement: "",
                                        quantity: "",
                                        category: "",
                                        message: "Common!",
                                        products: products,
                                        measurements: measurements,
                                        categories: categories,
                                        slectedProducts: [],

                                        createRecipe: function (e) {

                                            
                                            var promiseCreateRecipe =
                                            self.persister.recipes
                                                .add({ title: this.get("title"), content: this.get("content"), "category-name": this.get("category"), products: this.get("slectedProducts") })
                                                    .then(function (addedRecipe) {
                                                        console.log(addedRecipe);
                                                        successCallback(addedRecipe.Id);
                                                    }, function (err) {
                                                        this.set("message", err);
                                                    });

                                            this.set("title", "");
                                            this.set("content", "");
                                            this.set("measurement", "");

                                            return promiseCreateRecipe;
                                        },

                                        addProduct: function (e) {

                                            var prod = this.get("slectedProducts");
                                            prod.push({ "name": this.get("product"), "quantity": this.get("quantity"), measurement: this.get("measurement") });
                                           
                                            this.set("slectedProducts", prod);

                                            this.set("product", "");
                                            this.set("quantity", "");
                                            this.set("measurement", "");

                                        }

                                    };
                                    var createRecipeViewModel = new kendo.observable(viewModel);

                                    resolve(createRecipeViewModel);

                                }, function (err) {
                                    console.log(err);
                                })

                        }, function (err) {
                            console.log(err);
                        })

                   }, function (err) {
                       console.log(err);
                   });
            });
            return promise;

        }
    });

    return {
        get: function (persister) {
            return new ViewModels(persister)
        }
    }
});