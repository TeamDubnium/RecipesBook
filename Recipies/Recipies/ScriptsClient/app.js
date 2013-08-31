/// <reference path="_references.js" />


require.config({
    paths: {
        jquery: "libs/jquery-2.0.3",
        rsvp: "libs/rsvp.min",
        httpRequester: "libs/http-requester",
        dataProvider: "app/dataProvider",
        "class": "libs/class",
        cryptoJs: "libs/sha1",
        underscore: "libs/underscore",
        kendoWeb: "libs/kendo.web.min"

    }
});

require(["jquery", "kendoWeb", "app/view-models", "app/views"], function ($) {

    var layout = new kendo.Layout('#content');
    var router = new kendo.Router();
    var viewModelFactory = viewModels.get();
    var viewFactory = views.get("ScriptsClient/partials/");
    router.route("/", function () {
            var homeViewHtml = "";
            viewFactory.mainNavView()
				.then(function (viewHtml) {
				    homeViewHtml = viewHtml;
				    return viewModelFactory.buildCategoriesViewModel();
				})
				.then(function (vm) {
				    $("#main-nav").append(homeViewHtml);
				    var view = new kendo.View("main-nav-view-template", { model: vm });
				    layout.showIn("#main-nav", view);
				});
    });

    router.route("/auth", function () {
        viewFactory.loginForm()
			.then(function (loginFormHtml) {
			    var vm = viewModelFactory.buildLoginFormVM(function () {
			        //debugger;
			        router.navigate("/");
			    });
			    var view = new kendo.View(loginFormHtml, { model: vm });
			    layout.showIn("#content", view);
			});
    });

    $(function () {
        layout.render($("#wrapper"));
        router.start("/");
    });
});