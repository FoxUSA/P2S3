/**
 * @author - Jake Liscom
 * @project - p2s3
 */

//Module Declaration
var p2s3 = angular.module("p2s3", ["ngRoute"]);

p2s3.run(function (){});

//Router
p2s3.config(function($routeProvider,$locationProvider){
	$locationProvider.hashPrefix("");
	$routeProvider
        .when("/home",{
                templateUrl: "app/views/home.html",
            })
		.when("/sign/",{
                //controller: "tagController",
                templateUrl: "app/views/sign.html",
            })
        .when("/upload/:url?",{
                //controller: "noteController",
                templateUrl: "app/views/upload.html"
            })
		.otherwise({ redirectTo: "/home" });
});