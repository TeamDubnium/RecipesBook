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
        kendoWeb: "libs/kendo.web.min",
        persisters: "app/data"

    }
});

require(["jquery", "app/view-models", "app/views", "persisters", "kendoWeb"], function ($, viewModels, views, persisters) {

    var layout = new kendo.Layout('<div id="content"></div>');
    var navLayout = new kendo.Layout('<nav id="main-nav"></nav>');
    var router = new kendo.Router();
    var viewModelFactory = viewModels.get();
    var viewFactory = views.get("ScriptsClient/partials/");
    router.route("/", function () {
          
        viewFactory.mainNavView()
		.then(function (viewHtml) {
			var vm = viewModelFactory.buildCategoriesViewModel();
			var view = new kendo.View(viewHtml, {model : vm});
			navLayout.showIn("#main-nav", view);
			console.log();
			$("#menu").kendoMenu();
		}, function (err) {
			console.log();
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
        layout.render($("#app"));
        navLayout.render($("#wrapper > header"));
        router.start("/");
    });
});