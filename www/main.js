app.controller('mainController', function($scope,$location) {
	$scope.localSettings = false;
	$scope.localSettings = function() {
		$scope.localsettingsActive = !$scope.localsettingsActive;
	};

	$scope.$on('$routeChangeStart', function(next, current) { 
		if($location.url() == '/login' || $location.url() == '/single-view'|| $location.url() == '/categoriesadmin' || $location.url() == '/cms-home' || $location.url() == '/add-categories-admin' || $location.url() == '/locale-admin'){
			$scope.hideNav = 1;
		}else{
			$scope.hideNav = 0;
		}
	});
});