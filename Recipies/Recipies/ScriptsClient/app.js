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

        controllerFactory.loadAuthPage()
            .then(function (data) {
                router.navigate("/");
            }, function (err) {
                console.log(err);

            });
           
    });

    router.route("/categories:id", function (id) {
        alert(id);

    });

    router.route("/addrecipe", function () {
        alert("create recipe");

    });


    $(function () {
        controllerFactory.renderLayouts();
        router.start();
        router.navigate("/");
    });
});