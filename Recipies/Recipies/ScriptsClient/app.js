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

require(["jquery", "app/controller", "kendoWeb"], function ($, controller) {

   
    var router = new kendo.Router();
   
    var controllerFactory = controller.get();

    router.route("/", function () {
          
        controllerFactory.loadNav();
      
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
        controllerFactory.renderLayouts();
        router.start("/");
    });
});