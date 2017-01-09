/**
 * @author - Jake Liscom
 * @project - p2s3
 */

//Module Declaration
var p2s3 = angular.module("p2s3", ["ngRoute","ngFileUpload","angular-clipboard"]);

p2s3.run(function (){});

//Router
p2s3.config(function($routeProvider,$locationProvider){
	$locationProvider.hashPrefix("");
	$routeProvider
        .when("/home/",{
                templateUrl: "app/views/home.html",
            })
		.when("/sign/",{
                controller: "SignController",
                templateUrl: "app/views/sign.html",
            })
        .when("/upload/",{
                controller: "UploadController",
                templateUrl: "app/views/upload.html"
            })
		.otherwise({ redirectTo: "/home/" });
});
