/// <reference path="../libs/_references.js" />

define(["jquery", "httpRequester", "rsvp", "class"], function ($, httpRequester) {

    var CategoriesPersister = Class.create({
        init: function (apiUrl) {
            this.apiUrl = apiUrl;
        },
        all: function () {
            return httpRequester.getJSON(this.apiUrl);
        }
    });

    var UsersPersister = Class.create({
        init: function (apiUrl) {
            this.apiUrl = apiUrl;
        },
        login: function (username, password) {
            var self = this;
            var promise = new RSVP.Promise(function (resolve, reject) {
                var user = {
                    username: username,
                    authCode: CryptoJS.SHA1(password).toString()
                };
                return postJSON(self.apiUrl + "login", user)
					.then(function (data) {
					    this.sessionKey = data.sessionKey;
					    debugger;
					    resolve(data.displayName);
					});
            });
            return promise;
        },
        register: function (username, password) {
            var self = this;
            var promise = new RSVP.Promise(function (resolve, reject) {
                var user = {
                    username: username,
                    authCode: CryptoJS.SHA1(password).toString()
                };
                return postJSON(self.apiUrl + "register", user)
					.then(function (data) {
					    this.sessionKey = data.sessionKey;
					    resolve(data.nickname);
					});
            });
            return promise;
        }
    });

    var DataPersister = Class.create({
        init: function (apiUrl) {
            this.apiUrl = apiUrl;
            this.categories = new CategoriesPersister(this.apiUrl + "categories");
            this.users = new UsersPersister(this.apiUrl + "users");
        }
    });

    return {
        get: function (apiUrl) {
            return new DataPersister(apiUrl);
        }
    };
});