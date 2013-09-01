/// <reference path="../libs/_references.js" />
define(["jquery", "app/view-models", "app/views", "persisters", "kendoWeb", "class", "rsvp"], function ($, viewModels, views, persisters) {
    var Controller = Class.create({
        init: function () {
            this.layout = new kendo.Layout('<div id="content"></div>');
            this.navLayout = new kendo.Layout('<nav id="main-nav"></nav>');

            this.viewModelFactory = viewModels.get();
            this.viewFactory = views.get("ScriptsClient/partials/");
        },

        renderLayouts: function () {
            this.layout.render($("#app"));
            this.navLayout.render($("#wrapper > header"));
        },

        loadNav: function onLoadNav() {
            var that = this;
            //login check

            if (true) {
               
                this.viewFactory.mainNavView()
                .then(function (viewHtml) {
                    that.viewModelFactory.buildCategoriesViewModel()
                        .then(function (vm) {
                            var view = new kendo.View(viewHtml, { model: vm });
                            that.navLayout.showIn("#main-nav", view);
                            console.log();
                            $("#menu").kendoMenu();
                        }, function (err) {
                            console.log(err)
                        });
                   
                }, function (err) {
                    console.log();
                });
            }
            else {
               // 
            }
        },

        loadHomePage: function () {

        },

        loadAuthPage: function () {

            var that = this;
            
           
            var promise = new RSVP.Promise(function (resolve, reject) {
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
            });
            return promise;
        },
      

    });

    return {
        get: function () {
            return new Controller();
        }
    };
});