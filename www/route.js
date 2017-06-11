// create the module and name it app
var app = angular.module('app', ['ngRoute','ngCookies']);

// configure our routes
app.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl : 'app/home/home.html',
			controller  : 'homeController',
		})
		.when('/categories', {
			templateUrl : 'app/categories/categories.html',
			controller  : 'categoriesController'
		})
		.when('/contact', {
			templateUrl : 'app/contact/contact.html',
			controller  : 'contactController'
		})
		.when('/login', {
			templateUrl : 'app/login/login.html',
			controller  : 'apploginController',
		})
		.when('/signup', {
			templateUrl : 'app/signup/signup.html',
			controller  : 'appsignupController',
		})
		.when('/single-view', {
			templateUrl : 'app/single-view/single-view.html',
			controller  : 'appsignupController',
		})
		.when('/settings', {
			templateUrl : 'app/locale-settings/locale-settings.html',
			controller  : 'appsettingsController'
		})
		.when('/cms-home', {
			templateUrl : 'app/cms/cmshome/cmshome.html',
			controller  : 'cmshomeController'
		})
		.when('/categoriesadmin', {
			templateUrl : 'app/cms/categories-admin/categories-admin.html',
			controller  : 'categoriesadminController'
		})
		.when('/add-categories-admin', {
			templateUrl : 'app/cms/add-categories-admin/add-categories-admin.html',
			controller  : 'addcategoriesadminController'
		})
		.when('/cyd_test', {
			templateUrl : 'app/cyd_test/cyd_test.html',
			controller  : 'cydTestController'
		});
});