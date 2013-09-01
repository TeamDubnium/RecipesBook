/// <reference path="../libs/_references.js" />

define(["jquery", "httpRequester", "rsvp", "class", "cryptoJs"], function ($, httpRequester) {

    var username = localStorage.getItem("recipe-book-username");
    var sessionKey = localStorage.getItem("recipe-book-sessionKey");

    function saveSession(userData) {
        localStorage.setItem("recipe-book-username", userData.username);
        localStorage.setItem("recipe-book-sessionKey", userData.sessionKey);
        username = userData.username;
        sessionKey = userData.sessionKey;
    }

    function clearSession() {
        localStorage.removeItem("recipe-book-username");
        localStorage.removeItem("recipe-book-sessionKey");
        username = null;
        sessionKey = null;
    }

    var CategoriesPersister = Class.create({
        init: function (apiUrl) {
            this.apiUrl = apiUrl;
        },
        all: function () {
            return httpRequester.getJSON(this.apiUrl);
        },
        byId: function (id) {
            var url = this.apiUrl + "/" + id + "/recipes";
            return httpRequester.getJSON(url);
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
                    authCode: CryptoJS.SHA1(username + password).toString()
                };
                return httpRequester.postJSON(self.apiUrl + "/login", user)
					.then(function (data) {
					    saveSession(data);
					    resolve(data);
					});
            });
            return promise;
        },
        register: function (username, password) {
            var self = this;
            var promise = new RSVP.Promise(function (resolve, reject) {
                var user = {
                    username: username,
                    authCode: CryptoJS.SHA1(username + password).toString()
                };
                return httpRequester.postJSON(self.apiUrl + "/register", user)
					.then(function (data) {
					    saveSession(data);
					    resolve(data);
					});
            });
            return promise;
        },

        logout: function (username, password) {
            var self = this;
            var promise = new RSVP.Promise(function (resolve, reject) {
                var user = {
                };

                var header = { "X-sessionKey": sessionKey };

                return httpRequester.putJSON(self.apiUrl + "/logout", user, header)
					.then(function (data) {
					    clearSession();
					    resolve(data);
					});
            });
            return promise;
        }
    });

    var RecipesPersister = Class.create({
        init: function (apiUrl) {
            this.apiUrl = apiUrl;
        },
        add: function (username, password) {
            var self = this;
            var promise = new RSVP.Promise(function (resolve, reject) {
                var recipe = {
                    title: title,
                    content: content,
                    products: products
                };
                return httpRequester.postJSON(self.apiUrl + "/add", recipe)
					.then(function (data) {
					    saveSession(data);
					    resolve(data);
					});
            });
            return promise;
        },
        all: function () {
            return httpRequester.getJSON(this.apiUrl);
        },
        favourites: function () {
            var url = this.apiUrl + "/favourites";
            return httpRequester.getJSON(url);
        },
    });

    var DataPersister = Class.create({
        init: function (apiUrl) {
            this.apiUrl = apiUrl;
            this.categories = new CategoriesPersister(this.apiUrl + "/categories");
            this.users = new UsersPersister(this.apiUrl + "/users");
            this.recipes = new RecipesPersister(this.apiUrl + "/recipes");
        },

        isUserLoggedIn: function () {
            var isLoggedIn = username != null && sessionKey != null;
            return isLoggedIn;
        },
        getCurrentUsername: function () {
            return username;
        }
    });

    return {
        get: function (apiUrl) {
            return new DataPersister(apiUrl);
        }
    };
});