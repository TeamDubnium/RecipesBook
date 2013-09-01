﻿/// <reference path="../libs/_references.js" />
define(["jquery", "class", "rsvp"], function ($) {
    var Views = Class.create({
        init: function (rootPath) {
            this.root = rootPath;
            this.templates = {};
        },
        loadPartialHtml: function (name) {
            var self = this;
            var promise = new RSVP.Promise(function (resolve, reject) {
                if (self.templates[name]) {
                    resolve(self.templates[name]);
                }
                else {
                    $.ajax({
                        url: self.root + name + ".html",
                        type: "GET",
                        success: function (templateHtml) {
                            self.templates[name] = templateHtml;
                            resolve(self.templates[name]);
                        },
                        error: function (err) {
                            reject(err);
                        }
                    });
                }
            });
            return promise;
        },
        mainNavView: function () {
            return this.loadPartialHtml("main-nav-view");
        },
        loginForm: function () {
            return this.loadPartialHtml("login-form");
        },
        homePageView: function () {
            return this.loadPartialHtml("home-page");
        },

        recipesByCategoryView: function () {
            return this.loadPartialHtml("recipes-by-category");
        }
    });

    return {
        get: function (rootPath) {
            return new Views(rootPath);
        }
    }

});