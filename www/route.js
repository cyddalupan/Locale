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
		.when('/categories-filter/:category_id', {
			templateUrl : 'app/categories-filter/categories-filter.html',
			controller  : 'categoriesFilterController'
		})
		.when('/trend', {
			templateUrl : 'app/trend/trend.html',
			controller  : 'trendController'
		})
		.when('/login', {
			templateUrl : 'app/login/login.html',
			controller  : 'apploginController',
		})
		.when('/sign-up', {
			templateUrl : 'app/sign-up/sign-up.html',
			controller  : 'appsignUpController',
		})
		.when('/single-view/:event_id', {
			templateUrl : 'app/single-view/single-view.html',
			controller  : 'appsingleViewController',
		})
		.when('/map-view/:host_id', {
			templateUrl : 'app/map-view/map-view.html',
			controller  : 'appmapViewController',
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
		.when('/edit-categories-admin/:category_id', {
			templateUrl : 'app/cms/edit-categories-admin/edit-categories-admin.html',
			controller  : 'editcategoriesadminController'
		})
		.when('/locale-admin', {
			templateUrl : 'app/cms/locale-admin/locale-admin.html',
			controller  : 'localeadminController'
		})
		.when('/host-admin', {
			templateUrl : 'app/cms/host-admin/host-admin.html',
			controller  : 'hostadminController'
		})
		.when('/add-locale-admin', {
			templateUrl : 'app/cms/add-locale-admin/add-locale-admin.html',
			controller  : 'addLocaleadminController'
		})
		.when('/add-locale-user', {
			templateUrl : 'app/cms/add-locale-user/add-locale-user.html',
			controller  : 'addLocaleuserController'
		})
		.when('/add-host-admin', {
			templateUrl : 'app/cms/add-host-admin/add-host-admin.html',
			controller  : 'addHostadminController'
		})
		.when('/edit-host-admin/:host_id', {
			templateUrl : 'app/cms/edit-host-admin/edit-host-admin.html',
			controller  : 'editHostadminController'
		})
		.when('/event-list-admin', {
			templateUrl : 'app/cms/event-list-admin/event-list-admin.html',
			controller  : 'eventListadminController'
		})
		.when('/edit-locale-admin/:locale_admin', {
			templateUrl : 'app/cms/edit-locale-admin/edit-locale-admin.html',
			controller  : 'editLocaleadminController'
		})
		.when('/edit-locale-user/:locale_user', {
			templateUrl : 'app/cms/edit-locale-user/edit-locale-user.html',
			controller  : 'editLocaleuserController'
		})
		.when('/add-event-admin', {
			templateUrl : 'app/cms/add-event-admin/add-event-admin.html',
			controller  : 'addEventadminController'
		})
		.when('/edit-event-admin/:event_id', {
			templateUrl : 'app/cms/edit-event-admin/edit-event-admin.html',
			controller  : 'editEventadminController'
		})
		.when('/locale-user', {
			templateUrl : 'app/cms/locale-user/locale-user.html',
			controller  : 'localeUserController'
		})
		.when('/event-host', {
			templateUrl : 'app/cms/event-host/event-host.html',
			controller  : 'eventHostController'
		})
		.when('/add-event-host', {
			templateUrl : 'app/cms/add-event-host/add-event-host.html',
			controller  : 'addEventHostController'
		})
		.when('/edit-event-host/:host_id', {
			templateUrl : 'app/cms/edit-event-host/edit-event-host.html',
			controller  : 'editEventHostController'
		})
		.when('/cyd_test', {
			templateUrl : 'app/cyd_test/cyd_test.html',
			controller  : 'cydTestController'
		})
		.when('/cyd_map', {
			templateUrl : 'app/cyd_map/cyd_map.html',
			controller  : 'cydMapController'
		});
});