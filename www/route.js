// create the module and name it app
var app = angular.module('app', ['ngRoute']);

// configure our routes
app.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl : 'app/home/home.html',
			controller  : 'homeController'
		})
		.when('/about', {
			templateUrl : 'app/about/about.html',
			controller  : 'aboutController'
		})
		.when('/contact', {
			templateUrl : 'app/contact/contact.html',
			controller  : 'contactController'
		})
		.when('/cyd_test', {
			templateUrl : 'app/cyd_test/cyd_test.html',
			controller  : 'cydTestController'
		});
});