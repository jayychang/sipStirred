var app = angular.module("sipStirredLaunch", ["ngRoute", "controllers", "ngAnimate", "ui.bootstrap"]);

app.config(function($routeProvider) {
    $routeProvider
    	.when("/", {
    		templateUrl: "views/home.template.html",
        // cssUrl: "app.css",
        controller: "homeController",
    	})
    	.when("/selectLocation", {
    		templateUrl: "views/selectLocation.template.html",
        // cssUrl: "app.css",
        controller: "locationController",
    	});
});
